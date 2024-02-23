<script setup>
import InputText from 'primevue/inputtext';
import 'primeicons/primeicons.css'
import {ref} from "vue";

const value = ref('');

defineProps({
  options: {
    type: Array,
    default: []
  }
})

</script>


<template>
  <div class="search-box">
    <InputText class="input-search" type="text"
               placeholder="Search..."
               v-model="value"/>
    <div class="search-icon">
      <i class="pi pi-search" style="color: #708090"
         @click="$emit('change', 'product', value)"
      ></i>
    </div>
  </div>
</template>

<style scoped>
.search-box{
  max-width: 300px;
  width: 100%;

  display: flex;
  justify-content: space-between;;
  align-items: center;

  background: #ffffff;
  border: 1px solid #cbd5e1;
  border-radius: 6px;
  outline-color: transparent;
  box-shadow: 0 0 #0000, 0 0 #0000, 0 1px 2px 0 rgba(18, 18, 23, 0.05);
}

.search-box input{
  padding-left: 10px;
  width: 100%;
  min-height: 30px;
  height: 100%;
  min-width: 80px;

  box-shadow: none;
  color: #334155;
}
.input-search::placeholder{
  color: #334155;
}
.p-inputtext{
  outline: none;
  border: none;
  box-shadow: none;
}
.search-icon{
  display: flex;
  justify-content: center;
  align-items: center;
  padding-right: 10px;
}


</style>