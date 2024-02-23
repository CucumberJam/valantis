import asyncHandler from 'express-async-handler';
import {computed, ref} from "vue";
import md5 from "md5";
import axios from "axios";

const API= 'http://api.valantis.store:40000/';
const PASSWORD= 'Valantis';
class ProductsService{
    getTimestamp = computed(()=> {
        let date = new Date();

        let month = date.getMonth()+1;
        if(month < 9) month = '0' + month;
        let day = date.getDate();
        if(day < 9) day = '0' + day;

        return `${date.getFullYear()}${month}${day}`;
    });
    getHashKey = computed(() => {
        let message = `${PASSWORD}_${this.getTimestamp.value}`;
        return md5(message);
    });

    axiosConfig =  {
            headers: {
                "Content-Type": "application/json",
                "X-Auth": this.getHashKey.value
            }
    }

    get = asyncHandler(async (queryObject) => {
        const res = await axios.post(API, JSON.stringify(queryObject), this.axiosConfig);
        return res.data.result;
    });

    getIds = asyncHandler(async (params = null, isFiltered = false) => {
        if(isFiltered) {
            return await this.get(params);
        }
        let object = {};
        object.action = 'get_ids';
        if(params) object.params = params

        return await this.get(object);
    })

    getALL = async(params, isFiltered = false)=> {
        let ids = [...new Set(await this.getIds(params, isFiltered))];

        let object = {
            action: 'get_items',
            params: {ids}
        }
        try{
            return this.get(object);
        }catch (err) {
            console.log('Error with getting items via API: ' + err);
        }
    }

    getFields= asyncHandler(async(params) => {
        const object = {
            action: 'get_fields',
            params: params
        }
        let options = await this.get(object);

        options = options.filter(elem => elem);

        if(params.field === 'price'){
            let min = Math.min(...options);
            let max = Math.max(...options);

            return [min, max];

        }
        return [...new Set(options)];
    })

}


export default new ProductsService();

/*    limit = ref(50);
    offset = ref(0);
    requestDictionary = {
        filter: {
            price: 0,
            brand: '',
            product: ''
        },
        get_ids: {
            offset: this.offset.value,
            limit: this.limit.value
        },
        get_items: {
            ids: []
        },
        get_fields: {
            field: '',
            offset: this.offset.value,
            limit: this.limit.value
        }
    }*/