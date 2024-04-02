<script setup lang="ts">
import { useCartStore } from "../context/cartStore";

const cartStore = useCartStore();
</script>

<template>
  <aside
    :style="{ display: cartStore.toggleCart ? '' : 'none' }"
    class="fixed bg-none top-16 right-0 bottom-0 left-0 flex justify-between"
  >
    <div
      @click="cartStore.toggleCart = !cartStore.toggleCart"
      class="bg-black opacity-50 hidden md:block md:w-full"
    ></div>

    <div class="bg-slate-900 w-full md:w-96 flex flex-col">
      <div class="text-center mb-3">
        <h2 class="text-xl">Lista del carrito</h2>
      </div>

      <div class="cart-box p-4 md:w-96">
        <div
          v-if="cartStore.cartList.length >= 1"
          v-for="(p, i) in cartStore.cartList"
          :key="i"
          class=" bg-gray-700 p-2 rounded-md flex justify-between items-center my-2"
        >
          <div>
            <img
              :src="p.image"
              alt=""
              class="h-10 w-auto min-w-10 rounded-sm"
            />
          </div>
          <div class="px-4">
            <p class="line-clamp-1 text-sm max-w-40 mb-2">{{ p.title }}</p>
            <span class="bg-gray-800 p-1 rounded-md">$/ {{ p.price }}</span>
          </div>
          <div class="flex gap-3 bg-slate-800 p-2 rounded-md">
            <div class="flex gap-2">
              <button @click="cartStore.aumentarCantidad(p.id)">➕</button>
              <span>{{ p.quantity }}</span>
              <button @click="cartStore.quitarCantidad(p.id)">➖</button>
            </div>

            <button @click="cartStore.deleteProduct(p.id)">❌</button>
          </div>
        </div>

        <div v-else class="text-center mt-10 text-yellow-600">
          <p>Carro vacio</p>
        </div>
      </div>

      <div
        v-if="cartStore.cartList.length >= 1"
        class="space-y-3 text-center bg-gray-700 p-2"
      >
        <p>
          Precio total:
          <span class="bg-gray-700 p-1 rounded-md"
            >$/ {{ cartStore.totalPrice.toFixed(2) }}</span
          >
        </p>

        <button class="bg-green-600 px-2 py-1 rounded-md" disabled>
          Pagar
        </button>

        <p class="bg-red-500 rounded-md">
          <span class="text-lg text-black">!</span>Pagar Proximamente
        </p>
      </div>
    </div>
  </aside>
</template>

<style scoped></style>
