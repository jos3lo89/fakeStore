<script setup lang="ts">
import { useRoute } from "vue-router";
import { getProductById } from "../api/service";
import { onMounted, ref, watch } from "vue";
import { productsI } from "../types/types";
import { useCartStore } from "../context/cartStore";

const cartStore = useCartStore();

const route = useRoute();

const product = ref<productsI>({} as productsI);
const count = ref(1);
const toggleBtn = ref(false);

const loadProduct = async () => {
  try {
    const res = await getProductById(route.params.id);
    product.value = res.data;
  } catch (error) {
    console.log(error);
  }
};

const decrement = () => {
  if (count.value > 1) {
    count.value--;
  }
};

const reloadPAge = () => {
  const id = Array.isArray(route.params.id)
    ? route.params.id[0]
    : route.params.id;
  const productId = parseInt(id);

  const findProduct = cartStore.cartList.find((p) => p.id == productId);
  toggleBtn.value = !!findProduct;
};

onMounted(() => {
  loadProduct();

  reloadPAge();
});

watch(cartStore, () => {
  reloadPAge();
});
</script>

<template>
  <div>
    <div class="text-center my-6">
      <h3 class="text-2xl">Detalles de producto</h3>
    </div>
    <div class="bg-gray-800 max-w-96 mx-auto p-4 rounded-md">
      <div class="mb-3">
        <img
          :src="product.image"
          alt="product image"
          class="h-40 w-auto mx-auto"
        />
      </div>
      <div>
        <div class="flex justify-start items-center flex-col gap-4 mb-3">
          <p class="text-orange-600 text-lg">{{ product.title }}</p>
          <span class="bg-gray-700 p-1 rounded-md">S/ {{ product.price }}</span>
        </div>
        <div class="cart-box max-h-24 bg-zinc-900 p-1 rounded-md">
          <p>{{ product.description }}</p>
        </div>
      </div>
      <div class="my-3 flex gap-3">
        <div class="space-x-2">
          <button @click="count++" class="bg-gray-700 px-2 py-1 rounded-md">
            ➕
          </button>
          <span class="bg-gray-700 p-1 rounded-sm">{{ count }}</span>
          <button
            @click="decrement"
            :disabled="count == 1"
            class="bg-gray-700 px-2 py-1 rounded-md"
          >
            ➖
          </button>
        </div>
        <button
          v-if="!toggleBtn"
          @click="cartStore.addToCart({ ...product, quantity: count })"
          class="bg-blue-600 px-2 py-1 rounded-md"
        >
          Añadir al Carrito
        </button>
        <button
          v-else
          @click="cartStore.deleteProduct(product.id)"
          class="bg-red-600 px-2 py-1 rounded-md"
        >
          Quitar al Carrito
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
