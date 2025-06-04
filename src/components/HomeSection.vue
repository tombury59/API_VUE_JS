<template>
  <div>
    <HeroSection @scroll-to-products="scrollToProducts" />
    <div ref="productsRef">
      <ProductsSection @add-to-cart="onAddToCart" />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import HeroSection from './HeroSection.vue'
import ProductsSection from './ProductsSection.vue'

const productsRef = ref(null)
const emit = defineEmits(['add-to-cart'])

const onAddToCart = (product) => {
  emit('add-to-cart', product)
}
const scrollToProducts = () => {
  productsRef.value?.scrollIntoView({ behavior: 'smooth' })
}
</script> 