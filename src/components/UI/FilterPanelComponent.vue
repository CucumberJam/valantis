<script setup>
import Slider from 'primevue/slider';
import {computed, ref} from "vue";
import Dropdown from 'primevue/dropdown';
import Button from 'primevue/button';
import InputSwitch from 'primevue/inputswitch';

const selectedFilter = ref({
  product: '',
  brand: '',
  price: [35000, 250000]
});
const checked = ref(false);

const emit = defineEmits(['erase', 'change']);

const erase = async() => {
    await emit('erase');

    selectedFilter.value.product = '';
    selectedFilter.value.brand = '';
    selectedFilter.value.price = [...[35000, 250000]];

    checked.value = false;
}
const filter = async (name, value) => {
  await emit('change', name, value);
}

defineProps({
  optionsForName: {
    type: Array,
    default: []
  },
  optionsForBrand: {
    type: Array,
    default: []
  },
  optionsForPrice: {
    type: Array,
    default: []
  },
})
</script>

<template>
 <div class="panel">
    <div  class="p-toolbar p-component">
      <div class="panel-item">
        <span>Reset filter: </span>
        <InputSwitch v-model="checked" @click="erase"/>
      </div>
      <div class="panel-item">
        <Dropdown v-model="selectedFilter.product"
                  :options="optionsForName"
                  placeholder="Select product"
                  class="w-full md:w-14rem panel-item"
                  @change="filter('product', selectedFilter.product)"/>
      </div>

      <div class="panel-item">
        <Dropdown v-model="selectedFilter.brand"
                  :options="optionsForBrand"
                  placeholder="Select brand"
                  class="w-full md:w-14rem panel-item"
                  @change="filter('brand', selectedFilter.brand)"/>
      </div>

      <div class="panel-item">
        <div class="col">
          <span>Price: </span>
          <Slider v-model="selectedFilter.price"
                  :range="optionsForPrice"
                  :min="optionsForPrice[0]"
                  :max="optionsForPrice[1]"
                  class="w-14rem" />
            <div  class="panel-item__sub">
            <p>{{selectedFilter.price[0]}} ₽</p>
            <p>{{selectedFilter.price[1]}} ₽</p>
          </div>
        </div>
        <Button label="Apply filter" class="btn"
                @click="filter('price', selectedFilter.price)"/>
      </div>
    </div>
 </div>
</template>

<style scoped>
.panel{
  border-radius: 10px;
  margin: 20px 0 1rem 0;
  padding: 2rem;

  gap: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
}
.p-toolbar{
  max-width: 1600px;
  width: 100%;
  padding: 0.75rem;
  background: #ffffff;
  border-radius: 6px;
}
.p-component{
  font-family: "Inter var", sans-serif;
  font-size: 1rem;
  font-weight: normal;
}
.panel-item{
  max-width: 200px;
  margin-right: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.panel-item:last-child{
  max-width: 350px;
}
.panel-item span{
  margin-right: 20px;
}
.col{
  flex-direction: column;
}
.panel-item__sub{
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 7px 0 0 0;

}

.panel-item p {
  margin: 10px;
}
.btn{
  padding: 10px;
}
</style>