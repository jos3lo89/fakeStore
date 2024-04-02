<script setup lang="ts">
import NavBar from "../components/NavBar.vue";
</script>

<template>
  <NavBar></NavBar>

  <main>
    <section>
      <slot name="mainSlot"> </slot>
    </section>
    <section>
      <slot name="slideSlot"></slot>
    </section>
  </main>
</template>

<style scoped></style>
