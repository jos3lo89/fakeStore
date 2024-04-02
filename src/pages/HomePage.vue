<script setup lang="ts">
import { onMounted, ref } from "vue";
import { getAllProducts } from "../api/service";
import { productsI } from "../types/types";
import { useCartStore } from "../context/cartStore";
import { useRouter } from "vue-router";

import Card from "../components/Card.vue";

const router = useRouter();
const cartStore = useCartStore();

const products = ref<productsI[]>([]);

const loadProducts = async () => {
  try {
    const res = await getAllProducts();
    products.value = res.data;
  } catch (error) {
    console.log(error);
  }
};

onMounted(() => {
  loadProducts();
});
</script>

<template>
  <div
    class="grid grid-cols-1 place-content-center sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6"
  >
    <Card
      v-for="(p, i) in products"
      :key="i"
      :productos="p"
      @add="cartStore.addToCart({ ...p, quantity: 1 })"
      @detalles="router.push({ name: 'detail', params: { id: p.id } })"
      @remove="cartStore.deleteProduct(p.id)"
    ></Card>
  </div>
</template>

<style scoped></style>
