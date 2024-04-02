<script setup lang="ts">
import { productsI } from "../types/types";
import { useCartStore } from "../context/cartStore";
import { ref, onMounted, watch } from "vue";

const cartStore = useCartStore();

const toggleBtn = ref(false);

const props = defineProps<{
  productos: productsI;
}>();

const reloadPAge = () => {
  const findProduct = cartStore.cartList.find(
    (p) => p.id === props.productos.id
  );
  toggleBtn.value = !!findProduct;
};

onMounted(() => {
  reloadPAge();
});

const emit = defineEmits(["add", "detalles", "remove"]);

const emitAdd = () => {
  emit("add");
  toggleBtn.value = true;
};

const emitRemove = () => {
  emit("remove");
  toggleBtn.value = false;
};

watch(cartStore, () => {
  reloadPAge();
});
</script>

<template>
  <div class="bg-slate-800 p-4 rounded-md m-3">
    <div>
      <img
        :src="props.productos.image"
        alt=""
        class="h-32 w-auto mx-auto rounded-sm"
      />
    </div>
    <div class="mt-2">
      <p class="line-clamp-1 mb-1">{{ props.productos.title }}</p>
      <span class="bg-gray-700 p-1 rounded-md"
        >S/ {{ props.productos.price }}</span
      >
    </div>
    <div class="mt-2 flex justify-center items-center gap-3">
      <button
        v-if="!toggleBtn"
        @click="emitAdd"
        class="bg-blue-600 py-1 px-2 rounded-md"
      >
        Añadir al Carrito
      </button>
      <button
        v-else
        @click="emitRemove"
        class="bg-red-600 py-1 px-2 rounded-md"
      >
        Quitar del Carrito
      </button>

      <button
        @click="emit('detalles')"
        class="bg-yellow-600 py-1 px-2 rounded-md"
      >
        Detalles
      </button>
    </div>
  </div>
</template>

<style scoped></style>
