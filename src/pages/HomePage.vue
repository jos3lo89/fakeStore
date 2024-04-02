<script setup lang="ts">
import { onMounted, ref } from "vue";
import { getAllProducts } from "../api/service";
import { productsI } from "../types/types";
import { useCartStore } from "../context/cartStore";
import { useRouter } from "vue-router";

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
    <div
      v-for="(p, i) in products"
      :key="i"
      class="bg-slate-800 p-4 rounded-md m-3"
    >
      <div>
        <img :src="p.image" alt="" class="h-32 w-auto mx-auto rounded-sm" />
      </div>
      <div class="mt-2">
        <p class="line-clamp-1 mb-1">{{ p.title }}</p>
        <span class="bg-gray-700 p-1 rounded-md">S/ {{ p.price }}</span>
      </div>
      <div class="mt-2 flex justify-center items-center gap-3">
        <button
          @click="cartStore.addToCart({ ...p, quantity: 1 })"
          class="bg-blue-600 py-1 px-2 rounded-md"
        >
          Añadir al Carrito
        </button>
        <button
          @click="
            router.push({
              name: 'detail',
              params: {
                id: p.id,
              },
            })
          "
          class="bg-yellow-600 py-1 px-2 rounded-md"
        >
          Detalles
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
