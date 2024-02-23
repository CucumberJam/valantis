<script setup>
import ProductsComponent from "../components/ProductsComponent.vue";
import {useProductsStore} from "../stores/ProductsStore.js";
import FilterPanelComponent from "../components/UI/FilterPanelComponent.vue";
import LoaderComponent from "../components/UI/LoaderComponent.vue";
import Message from "primevue/message";
import PaginateComponent from "../components/UI/PaginateComponent.vue";

const productsStore = useProductsStore();

</script>

<template>
  <main class="container">
    <Message v-if="productsStore.config.error" severity="error">{{productsStore.config.error}}</Message>
    <LoaderComponent v-if="productsStore.config.showLoader"/>
    <div v-else>
      <FilterPanelComponent :options-for-brand="productsStore.optionsBrand"
                            :options-for-name="productsStore.optionsProduct"
                            :options-for-price="productsStore.optionsPrice"
                            @change="productsStore.filter"
                            @erase="productsStore.erase"/>

      <ProductsComponent :products="productsStore.filtered"/>
    </div>
    <PaginateComponent :total-pages="productsStore.config.totalPages"
                       :chosenPage="productsStore.config.chosenPage"
                       @change-page="productsStore.changePage"
                       @change-limit="productsStore.changeLimit"/>
  </main>

</template>

<style scoped>
.container{
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

</style>