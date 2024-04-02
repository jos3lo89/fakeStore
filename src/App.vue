<script setup lang="ts">
import MainLaout from "./layout/MainLayout.vue";
import { RouterView } from "vue-router";
import SlideCart from "./components/SlideCart.vue";
</script>

<template>
  <MainLaout>
    <template v-slot:mainSlot>
      <RouterView></RouterView>
    </template>
    <template v-slot:slideSlot>
      <SlideCart></SlideCart>
    </template>
  </MainLaout>
</template>

<style scoped></style>
