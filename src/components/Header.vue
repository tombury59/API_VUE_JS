<template>
  <header class="py-5 flex items-center justify-between">
    <div class="text-2xl font-bold italic">Open Fashion</div>

    <div class="flex gap-8">
      <a
        href="#"
        :class="[
          'no-underline text-[#1e3f29] font-medium hover:text-[#0f5132] transition-colors',
          { 'font-bold text-[#0f5132]': activeLink === 'home' }
        ]"
        @click="setActiveLink('home')"
      >
        HOME
      </a>
      <a
        href="#"
        :class="[
          'no-underline text-[#1e3f29] font-medium hover:text-[#0f5132] transition-colors',
          { 'font-bold text-[#0f5132]': activeLink === 'shop' }
        ]"
        @click="setActiveLink('shop')"
      >
        SHOP
      </a>
      <a
        href="#"
        :class="[
          'no-underline text-[#1e3f29] font-medium hover:text-[#0f5132] transition-colors',
          { 'font-bold text-[#0f5132]': activeLink === 'contact' }
        ]"
        @click="setActiveLink('contact')"
      >
        CONTACT
      </a>
    </div>

    <div class="flex gap-4 items-center">
      <div class="relative cursor-pointer" @click="$emit('toggle-cart')">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M9 20a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"></path>
          <path d="M20 20a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"></path>
          <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
        </svg>
        <span class="absolute -top-2 -right-2 bg-[#0f5132] text-white w-[18px] h-[18px] rounded-full flex items-center justify-center text-xs">
          {{ cartCount }}
        </span>
      </div>

      <button
        class="px-5 py-2 border border-[#1e3f29] bg-transparent text-[#1e3f29] cursor-pointer transition-all duration-300 hover:bg-[#1e3f29] hover:text-white"
        @click="$emit('open-login')"
      >
        LOGIN
      </button>
    </div>
  </header>
</template>

<script setup>
defineProps({
  activeLink: {
    type: String,
    required: true
  },
  cartCount: {
    type: Number,
    default: 0
  }
});

const emit = defineEmits(['set-active', 'toggle-cart', 'open-login']);

const setActiveLink = (link) => {
  emit('set-active', link);
};
</script>
