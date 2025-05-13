<template>
  <transition name="notification">
    <div v-if="show" class="fixed top-5 right-5 max-w-sm bg-white rounded-lg shadow-lg overflow-hidden z-50 flex items-center">
      <div class="w-2 h-full bg-[#1e3f29] self-stretch"></div>
      <div class="p-4 flex items-center">
        <div class="mr-3 bg-[#eaf4ef] p-2 rounded-full">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-[#1e3f29]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <div>
          <p class="font-medium text-gray-800">{{ title }}</p>
          <p class="text-sm text-gray-600">{{ message }}</p>
        </div>
        <button @click="$emit('close')" class="ml-4 text-gray-400 hover:text-gray-600">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
          </svg>
        </button>
      </div>
    </div>
  </transition>
</template>

<script setup>
import { watch, onMounted } from 'vue';

const props = defineProps({
  title: {
    type: String,
    default: 'Succès'
  },
  message: {
    type: String,
    required: true
  },
  duration: {
    type: Number,
    default: 3000 // 3 secondes par défaut
  },
  show: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(['close']);

let timer = null;

watch(() => props.show, (newValue) => {
  if (newValue) {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      emit('close');
    }, props.duration);
  }
});

onMounted(() => {
  if (props.show) {
    timer = setTimeout(() => {
      emit('close');
    }, props.duration);
  }
});
</script>

<style scoped>
.notification-enter-active,
.notification-leave-active {
  transition: all 0.3s ease;
}

.notification-enter-from {
  transform: translateX(100%);
  opacity: 0;
}

.notification-leave-to {
  transform: translateX(100%);
  opacity: 0;
}
</style>
