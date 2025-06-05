<template>
  <div class="w-full max-w-5xl mx-auto py-16 px-2 sm:px-4">
    <h2 class="text-4xl font-bold mb-12 text-center text-[#1e3f29]">Espace commentaires</h2>
    <div class="flex items-center justify-center gap-2 sm:gap-4 flex-col lg:flex-row">
      <button 
        @click="prev" 
        :disabled="startIndex === 0"
        class="w-10 h-10 flex items-center justify-center rounded shadow text-[#1e3f29] font-bold disabled:opacity-50 transition hover:bg-[#e3efe7] mb-4 lg:mb-0"
      >
        <span class="text-2xl">&lt;</span>
      </button>
      <div class="flex gap-4 sm:gap-8 w-full justify-center flex-col lg:flex-row items-center">
        <div 
          v-for="(comment, idx) in visibleComments" 
          :key="comment.id" 
          :class="[
            'rounded-xl shadow-lg p-6 sm:p-8 w-full lg:w-80 flex flex-col items-start transition-all duration-300',
            idx === 1 ? 'bg-[#e3efe7] scale-105' : 'bg-white'
          ]"
        >
          <span class="text-3xl text-[#3e7e5a] mb-4">“</span>
          <div class="font-bold text-[#1e3f29] text-lg mb-2">{{ comment.author }}</div>
          <div class="text-[#3e7e5a] text-base mb-2">{{ comment.text }}</div>
        </div>
      </div>
      <button 
        @click="next" 
        :disabled="startIndex + 3 >= comments.length"
        class="w-10 h-10 flex items-center justify-center rounded shadow text-[#1e3f29] font-bold disabled:opacity-50 transition hover:bg-[#e3efe7] mt-4 lg:mt-0"
      >
        <span class="text-2xl">&gt;</span>
      </button>
    </div>
    <div class="flex justify-center mt-8 gap-2">
      <span 
        v-for="i in totalPages" 
        :key="i" 
        class="w-3 h-3 rounded-full transition-all duration-300"
        :class="i - 1 === currentPage ? 'bg-[#14301e]' : 'bg-[#b7cfc0]'"
      ></span>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const comments = [
  { id: 1, author: 'Emily Wilson', text: "The customer experience was exceptional from start to finish. The website is user-friendly, the checkout process was smooth, and the clothes I ordered fit perfectly. I'm beyond satisfied!" },
  { id: 2, author: 'Sarah Thompson', text: "I absolutely love the quality and style of the clothing I purchased from this website. customer service was outstanding, and I received my order quickly. Highly recommended!" },
  { id: 3, author: 'Olivia Martinez', text: "I had a great experience shopping on this website. The clothes I bought are fashionable and comfortable. Highly satisfied!" },
  { id: 4, author: 'David Lee', text: "Fast delivery and great packaging. The clothes are exactly as described. Will shop again!" },
  { id: 5, author: 'Emma Brown', text: "Excellent service and beautiful products. The support team was very helpful with my questions." }
]

const startIndex = ref(0)
const visibleComments = computed(() => comments.slice(startIndex.value, startIndex.value + 3))

const prev = () => {
  if (startIndex.value > 0) startIndex.value--
}
const next = () => {
  if (startIndex.value + 3 < comments.length) startIndex.value++
}

const totalPages = computed(() => comments.length - 2)
const currentPage = computed(() => startIndex.value)
</script>

<style scoped>
@media (max-width: 1024px) {
  .w-80 {
    width: 18rem !important;
  }
}
@media (max-width: 640px) {
  .w-80 {
    width: 100% !important;
  }
}
</style>