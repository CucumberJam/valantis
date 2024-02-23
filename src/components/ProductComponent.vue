<script setup>

defineProps({
  product: {
    id: {
      type: String,
      required: true
    },
    product: {
      type: String,
      required: false,
      default: null
    },
    price: Number,
    brand: {
      type: String,
      required: false,
      default: null
    }
  }
});
</script>

<template>
  <div class="product-item">
    <div class="desc">
      <h3 class="desc-item"> {{ product.product }}</h3>
      <span class="desc-item">id: {{ product.id }}</span>
      <p v-if="product.brand" class="desc-item">Brand: {{ product.brand }}</p>
      <p class="desc-item item_price">Price: {{ product.price }} ₽</p>

    </div>
  </div>

</template>

<style scoped>
p {
  margin: 0 0 5px 0;
}
.product-item{
  display: flex;
  flex-direction: column;
  width: 200px;
  border-radius: 5px;
  overflow: hidden;
  margin: 20px 0;
}
img {
  max-width: 100%;
  height: auto
}
.desc {
  height: 210px;
  border: 1px solid #c0c0c040;
  padding: 15px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;;
}
.desc-item{
  margin: 0 0 10px 0;
}
.desc span{
  font-size: 14px;
  font-style: italic;
}
.item_price{
  font-size: 18px;
  font-weight: 600;
}

</style>