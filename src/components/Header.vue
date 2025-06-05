<template >

  <header class="py-5 flex items-center justify-between flex-wrap">
    <div class="text-2xl font-bold italic">Open Fashion</div>
    <!-- Burger menu button (mobile) -->
    <button
      class="md:hidden flex items-center px-3 py-2 border rounded text-[#1e3f29] border-[#1e3f29]"
      @click="menuOpen = !menuOpen"
      aria-label="Toggle navigation"
    >
      <svg class="fill-current h-5 w-5" viewBox="0 0 20 20">
        <path
          d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"
        />
      </svg>
    </button>
    <!-- Navigation links -->
    <nav
      :class="[
        'w-full md:w-auto md:flex gap-8 items-center',
        menuOpen ? 'block' : 'hidden',
        'md:block'
      ]"
    >
      <router-link
        to="/"
        :class="[
          'block md:inline no-underline text-[#1e3f29] font-medium hover:text-[#0f5132] transition-colors px-2 py-2',
          { 
            'font-bold text-[#0f5132] border-b-2 border-[#0f5132]': activeLink === 'home'
          }
        ]"
        @click.native="setActiveLink('home'); menuOpen = false"
      >
        HOME
      </router-link>
      <router-link
        to="/catalogue"
        :class="[
          'block md:inline no-underline text-[#1e3f29] font-medium hover:text-[#0f5132] transition-colors px-2 py-2',
          { 
            'font-bold text-[#0f5132] border-b-2 border-[#0f5132]': activeLink === 'catalogue'
          }
        ]"
        @click.native="setActiveLink('catalogue'); menuOpen = false"
      >
        CATALOGUE
      </router-link>

    </nav>
    <!-- Cart & Login/Logout -->
    <div class="flex gap-4 items-center mt-4 md:mt-0">
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
      <template v-if="isLoggedIn">
          <span class="text-[#1e3f29] font-semibold">{{ username }}</span>
          <button
            class="px-5 py-2 border border-[#1e3f29] bg-transparent text-[#1e3f29] cursor-pointer transition-all duration-300 hover:bg-[#1e3f29] hover:text-white"
            @click="logout"
          >
            LOGOUT
          </button>
        </template>
        <button
          v-else
          class="px-5 py-2 border border-[#1e3f29] bg-transparent text-[#1e3f29] cursor-pointer transition-all duration-300 hover:bg-[#1e3f29] hover:text-white"
          @click="$emit('open-login')"
        >
          LOGIN
        </button>
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted } from 'vue';

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

const menuOpen = ref(false);

// Auth logic
const username = ref('');
const isLoggedIn = ref(false);

const checkAuth = () => {
  username.value = localStorage.getItem('username') || '';
  isLoggedIn.value = !!localStorage.getItem('token');
};

const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('username');
  localStorage.removeItem('cart'); // <-- Ajoute cette ligne
  username.value = '';
  isLoggedIn.value = false;
  window.dispatchEvent(new Event('storage'));
};

onMounted(checkAuth);
window.addEventListener('storage', checkAuth);
</script>