<script setup>
import HomeSection from '../components/HomeSection.vue'
</script>

<template>
  <main>
    <HomeSection @add-to-cart="$emit('add-to-cart', $event)" />
  </main>
</template>