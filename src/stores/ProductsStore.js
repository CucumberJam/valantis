import {defineStore} from "pinia";
import {computed, ref} from "vue";
import ProductsService from "../../service/products.service.js";
import productsService from "../../service/products.service.js";

export const useProductsStore = defineStore('products', () => {
    const products = ref([]);
    const filtered = ref([]);
    const config = ref({
        error: '',
        showLoader: false,
        offset: 0,
        limit: 49,
        chosenPage: 1,
        paginateAmount: 10,
        totalPages: 0,
    });

    const optionsProduct = ref([]);
    const optionsPrice = ref([]);
    const optionsBrand = ref([]);

    const getAll = async function () {
        config.value.error = '';
        let params = {
            offset: config.value.offset,
            limit: config.value.limit
        }
        try{
            products.value = [...await ProductsService.getALL(params)];
            filtered.value = [...products.value];
        } catch (error) {
            errorHandler(error);
        }

    }
    const errorHandler = (error) => {
        if(error.message === 'Request failed with status code 500') config.value.error = 'Error on server side, try again';
        else config.value.error = error.message;
    }
    const getFields = async (name) => {
        let res;
        try{
            res =  [...await ProductsService.getFields({
                field: `${name}`,
                offset: config.value.offset,
                limit: config.value.limit
            })];
        }catch (error) {
            errorHandler(error);
        }
       return res;
    }
    const changeLimit = async (num) => {
        config.value.showLoader = true;

        config.value.offset = config.value.limit - num;
        if(config.value.offset > 0){       //уменьшили лимит карточек на странице
            products.value = [...products.value.slice(0, num)];
        } else{                 //увеличили лимит карточек на странице
            let params = {
                offset: config.value.limit, // // 50 -> 80 = 50
                limit: Math.abs(config.value.offset)-1 // 50 -> 80 = Math.abs(-30) = 30
            }
            try{
                products.value = [...products.value, ...await ProductsService.getALL(params)]; // добираем не достающих продуктов
            }catch (error) {
                errorHandler(error);
            }
        }
        filtered.value = [...products.value];
        config.value.offset = 0;
        config.value.limit = num;

        config.value.showLoader = false;
    };
    const getTotalPages = async() => {
        try{
            let arr = await productsService.getIds();
            config.value.totalPages = arr.length;
        }catch (error) {
            errorHandler(error);
        }
    };
    const changePage = async (num) => {
        config.value.offset = (num-1) * (config.value.limit + 1);
        config.value.chosenPage = num;

        await init();
    }
    const filter = async(filterName, value) =>{
        config.value.showLoader = true;

        if(!value || value === '')  {
            filtered.value = [...products.value];
        }
        else if(filterName === 'price'){
            filtered.value = products.value.filter(elem => {
                if(elem.price >= value[0] &&  elem.price <= value[1]) return elem;
            });
        } else{
            let params = {
                action: 'filter',
                params: {
                    [`${filterName}`]: value
                }
            }
            try{
                products.value = [...await ProductsService.getALL(params, true)];
                filtered.value = [...products.value.slice(start, end)];
            } catch (error) {
                errorHandler(error);
            }
        }
        config.value.showLoader = false;
    }
    const erase = () => {
        filtered.value = [...products.value];
    }
    const init = async () => {
        config.value.showLoader = true;
        await getAll();

        optionsProduct.value = [...await getFields('product')];
        optionsPrice.value = [...await getFields('price')];
        optionsBrand.value = [...await getFields('brand')];

        config.value.showLoader = false;
    }


    return {filtered, init, config, getFields, getTotalPages,
        optionsProduct, optionsPrice, optionsBrand, changeLimit,
        changePage,filter, erase}
});
