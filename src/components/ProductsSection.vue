<template>
  <section class="py-20 relative">
    <div class="text-center mb-12">
      <h2 class="text-4xl font-bold text-[#1a3024] mb-4">Nos Articles Populaires</h2>
      <div class="flex items-center justify-center mb-4">
        <span class="h-px w-14 bg-[#1e3f29] opacity-50"></span>
        <span class="mx-4 text-[#1e3f29] text-xs">◆</span>
        <span class="h-px w-14 bg-[#1e3f29] opacity-50"></span>
      </div>
      <p class="text-base text-[#3a5a46] font-normal max-w-xl mx-auto">Découvrez notre sélection de produits tendance</p>
    </div>

    <!-- Indicateur de chargement -->
    <div v-if="loading" class="flex flex-col items-center justify-center min-h-[300px]">
      <div class="w-10 h-10 border-3 border-[rgba(30,63,41,0.2)] border-t-[#1e3f29] rounded-full animate-spin mb-4"></div>
      <p>Chargement des produits...</p>
    </div>

    <!-- Message d'erreur -->
    <div v-else-if="error" class="text-center p-10 bg-[rgba(255,0,0,0.05)] rounded-lg my-8 mx-auto max-w-xl">
      <p>{{ error }}</p>
      <button @click="fetchProducts" class="mt-4 px-5 py-2 bg-[#1e3f29] text-white border-none rounded cursor-pointer">
        Réessayer
      </button>
    </div>

    <!-- Grille de produits -->
    <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-10">
      <div v-for="product in displayedProducts" :key="product.id" class="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 relative">
        <div v-if="product.isNew" class="absolute top-4 left-4 bg-[#1e3f29] text-white py-1 px-2.5 rounded text-xs font-semibold z-10">
          Nouveau
        </div>
        <div class="relative overflow-hidden">
          <img
            :src="product.image || getDefaultImage(product.id)"
            :alt="product.title"
            class="w-full h-80 object-cover transition-transform duration-500 hover:scale-105"
          >
          <div class="absolute -bottom-12 left-0 right-0 bg-[rgba(255,255,255,0.9)] p-2.5 flex justify-center transition-all duration-300 group-hover:bottom-0">
            <button class="border border-[#1e3f29] text-[#1e3f29] px-3 py-1.5 text-sm cursor-pointer transition-all duration-200 hover:bg-[#1e3f29] hover:text-white">
              Aperçu rapide
            </button>
          </div>
        </div>
        <div class="p-5">
          <div class="text-xs text-gray-600 mb-2 uppercase tracking-wider">{{ product.category || 'Collection' }}</div>
          <h3 class="text-lg font-semibold mb-2.5 text-[#1a3024] leading-tight h-[2.6em] overflow-hidden line-clamp-2">
            {{ product.title }}
          </h3>
          <div class="flex items-center mb-2.5">
            <span
              v-for="star in 5"
              :key="star"
              class="text-base"
              :class="star <= (product.rating || 4) ? 'text-[#f0b800]' : 'text-gray-300'"
            >★</span>
            <span class="ml-1.5 text-xs text-gray-500">({{ product.reviewCount || '24' }})</span>
          </div>
          <div class="flex items-center gap-2 mb-4">
            <p class="font-bold text-xl text-[#1e3f29]">{{ formatPrice(product.price) }}</p>
            <p v-if="product.oldPrice" class="text-sm text-gray-500 line-through">{{ formatPrice(product.oldPrice) }}</p>
          </div>
          <button
            @click="$emit('add-to-cart', product)"
            class="w-full py-3 bg-[#1e3f29] text-white border-none rounded-md cursor-pointer transition-all duration-300 flex items-center justify-center gap-2 font-semibold shadow-md hover:bg-[#0f5132] hover:-translate-y-0.5 hover:shadow-lg"
          >
            <span class="flex items-center">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 22C9.55228 22 10 21.5523 10 21C10 20.4477 9.55228 20 9 20C8.44772 20 8 20.4477 8 21C8 21.5523 8.44772 22 9 22Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M20 22C20.5523 22 21 21.5523 21 21C21 20.4477 20.5523 20 20 20C19.4477 20 19 20.4477 19 21C19 21.5523 19.4477 22 20 22Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M1 1H5L7.68 14.39C7.77144 14.8504 8.02191 15.264 8.38755 15.5583C8.75318 15.8526 9.2107 16.009 9.68 16H19.4C19.8693 16.009 20.3268 15.8526 20.6925 15.5583C21.0581 15.264 21.3086 14.8504 21.4 14.39L23 6H6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </span>
            Ajouter au panier
          </button>
        </div>
      </div>
    </div>

    <div v-if="products.length > 4 && !loading" class="text-center mt-12">
      <button
        @click="navigateToShop"
        class="bg-transparent border-2 border-[#1e3f29] text-[#1e3f29] py-3 px-7 text-base font-semibold rounded-md cursor-pointer transition-all duration-300 relative overflow-hidden hover:bg-[#1e3f29] hover:text-white"
      >
        Voir plus d'articles
      </button>
    </div>

    <!-- Message quand aucun produit n'est disponible -->
    <div v-if="products.length === 0 && !loading && !error" class="text-center py-16 px-5 bg-[rgba(30,63,41,0.05)] rounded-lg my-8 mx-auto max-w-xl">
      <p class="text-lg text-[#3a5a46]">Aucun produit n'est disponible pour le moment.</p>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';

defineEmits(['add-to-cart']);
const router = useRouter();

const loading = ref(true);
const error = ref('');
const products = ref([]);

// Limiter à 4 produits pour la page d'accueil
const displayedProducts = computed(() => {
  return products.value.slice(0, 4);
});

// Fonction pour formater le prix
const formatPrice = (price) => {
  if (!price) return '0,00 €';
  return parseFloat(price).toFixed(2).replace('.', ',') + ' €';
};

// Fonction pour générer une image par défaut
const getDefaultImage = (id) => {
  const colors = ['1e3f29', '2a5a3d', '346c4c', '3e7e5a', '499169'];
  const colorIndex = id % colors.length;
  return `https://via.placeholder.com/300x400/${colors[colorIndex]}/FFFFFF?text=Mode+Verte`;
};

// Fonction pour naviguer vers la page Shop
const navigateToShop = () => {
  router.push('/shop');
};

// Fonction pour récupérer les produits depuis l'API
const fetchProducts = async () => {
  try {
    loading.value = true;
    error.value = '';

    const response = await fetch('http://185.98.138.168:8080/products');

    if (!response.ok) {
      throw new Error(`Erreur ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    products.value = data;

  } catch (err) {
    console.error('Erreur lors de la récupération des produits:', err);
    error.value = 'Impossible de charger les produits. Veuillez réessayer plus tard.';
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchProducts();
});
</script>
