<script setup>
import HomeSection from '../components/HomeSection.vue'
import CommentaireSection from '../components/CommentaireSection.vue'
</script>

<template>
  <main>

      <HomeSection @add-to-cart="$emit('add-to-cart', $event)" />

    <CommentaireSection />
  </main>
</template>