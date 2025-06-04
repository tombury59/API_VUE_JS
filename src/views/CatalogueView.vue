<template>
  <main>

    <ProductsSection :limit="null" @add-to-cart="$emit('add-to-cart', $event)" />
  </main>
</template>

<script setup>
import ProductsSection from '../components/ProductsSection.vue'
</script>