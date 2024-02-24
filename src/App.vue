<script setup>
import HeaderComponent from "./components/HeaderComponent.vue";
import SearchComponent from "@/components/UI/SearchComponent.vue";
import {  RouterView } from 'vue-router'
import {useProductsStore} from "./stores/ProductsStore.js";
import {onMounted} from "vue";

const productsStore = useProductsStore();

onMounted(async() => {
  await productsStore.init();
  await productsStore.getTotalPages();
})
</script>

<template>
  <div class="container">
    <HeaderComponent>
      <SearchComponent :options="productsStore.optionsProduct"
                       @change="productsStore.filter"/>
    </HeaderComponent>
    <RouterView />
  </div>

</template>

<style scoped>
.container{
  width: 100%;
  padding: 0 30px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
header {
  line-height: 1.5;
  max-height: 100vh;
}
</style>
