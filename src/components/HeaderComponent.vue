<script setup>

</script>

<template>
  <header>
    <div class="logo">Интернет-магазин</div>
    <slot></slot>
  </header>
</template>

<style scoped>
header{
  display: flex;
  background-color: #2f2a2d;
  justify-content: space-between;
  color: #fafafa;
  padding: 30px 80px;
}
</style>