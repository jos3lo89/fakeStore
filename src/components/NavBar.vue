<script setup lang="ts">
import { RouterLink } from "vue-router";
import { useCartStore } from "../context/cartStore";
const cartStore = useCartStore();
</script>

<template>
  <header
    class="bg-gray-900 sticky top-0 left-0 right-0 flex justify-around items-center h-16"
  >
    <div>
      <h1 class="capitalize text-2xl font-semibold cursor-default">fake <span class="text-sky-500">store</span></h1>
    </div>
    <nav>
      <RouterLink class="text-xl font-semibold" :to="{ name: 'home' }"
        >Inicio</RouterLink
      >
    </nav>
    <div>
      <button
        @click="cartStore.toggleCart = !cartStore.toggleCart"
        class="text-2xl"
      >
        🛒
      </button>
      <span class="text-xl">{{ cartStore.cartList.length }}</span>
    </div>
  </header>
</template>

<style scoped></style>
