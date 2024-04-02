import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { cartProductI } from "../types/types";

export const useCartStore = defineStore(
  "cartStore",
  () => {
    const toggleCart = ref(false);
    const toggleWatch = ref(false);
    const cartList = ref<cartProductI[]>([]);

    function findIndex(id: number) {
      return cartList.value.findIndex((p) => p.id === id);
    }

    function addToCart(product: cartProductI) {
      const findProduct = cartList.value.find((p) => p.id === product.id);
      if (!findProduct) {
        cartList.value.push(product);
      }
    }

    function deleteProduct(id: number) {
      cartList.value = cartList.value.filter((p) => p.id !== id);
      toggleWatch.value = !toggleWatch.value;
    }

    function aumentarCantidad(id: number) {
      const index = findIndex(id);
      cartList.value[index].quantity += 1;
    }

    function quitarCantidad(id: number) {
      const index = findIndex(id);
      if (cartList.value[index].quantity > 1) {
        cartList.value[index].quantity -= 1;
      }
    }

    return {
      toggleCart,
      cartList,
      toggleWatch,
      addToCart,
      deleteProduct,
      aumentarCantidad,
      quitarCantidad,
      totalPrice: computed(() => {
        return cartList.value.reduce((total, product) => {
          return total + product.price * product.quantity;
        }, 0);
      }),
    };
  },
  { persist: true }
);
