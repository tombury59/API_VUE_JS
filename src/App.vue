<template>
  <div class="max-w-7xl mx-auto px-4">
    <Header
      :active-link="activeLink"
      :cart-count="cartCount"
      @set-active="setActiveLink"
      @toggle-cart="toggleCart"
      @open-login="showLoginModal = true"
    />

    <main>
      <HeroSection @scroll-to-products="scrollToProducts" />

      <ProductsSection
        ref="productsSection"
        @add-to-cart="addToCart"
      />
    </main>

    <CartModal
      v-if="showCart"
      :cart-items="cartItems"
      @close="showCart = false"
      @update-cart="updateCart"
    />
    <LoginModal v-if="showLoginModal" @close="showLoginModal = false" />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import Header from './components/Header.vue';
import HeroSection from './components/HeroSection.vue';
import ProductsSection from './components/ProductsSection.vue';
import CartModal from './components/CartModal.vue';
import LoginModal from './components/LoginModal.vue';

const activeLink = ref('home');
const showCart = ref(false);
const showLoginModal = ref(false);
const productsSection = ref(null);
const cartItems = ref([]);

// Calculer le nombre total d'articles dans le panier
const cartCount = computed(() => {
  return cartItems.value.reduce((total, item) => total + item.quantity, 0);
});

const setActiveLink = (link) => {
  activeLink.value = link;
};

const toggleCart = () => {
  showCart.value = !showCart.value;
};

const updateCart = (newCart) => {
  cartItems.value = newCart;
};

const addToCart = (product) => {
  // Vérifier si le produit est déjà dans le panier
  const existingItemIndex = cartItems.value.findIndex(item => item.id === product.id);

  if (existingItemIndex !== -1) {
    // Le produit existe déjà, augmenter la quantité
    cartItems.value[existingItemIndex].quantity += 1;
  } else {
    // Ajouter le nouveau produit avec quantité 1
    cartItems.value.push({
      ...product,
      quantity: 1
    });
  }

  // Notification
  alert(`${product.title} ajouté au panier !`);
};

const scrollToProducts = () => {
  productsSection.value.$el.scrollIntoView({ behavior: 'smooth' });
};
</script>
