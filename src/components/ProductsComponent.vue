<script setup>
import ProductComponent from "./ProductComponent.vue";

defineProps({
  products:{
    type: Array,
    default: () => [],
  }
})

</script>

<template>
      <div class="products">
        <ProductComponent v-for="item in products"
                          :key="item.id"
                          :product="item"
                          :data-id="item.id"/>
      </div>
</template>

<style scoped>
.products {
  column-gap: 10px;
  display: grid;
  grid-template-columns: repeat(auto-fit, 200px);
  grid-template-rows: 1fr;
  padding: 40px 25px;
  justify-content: space-between;
}
</style>