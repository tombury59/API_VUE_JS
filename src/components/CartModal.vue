<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
    <div class="bg-white rounded-xl w-11/12 max-w-lg max-h-[80vh] overflow-y-auto shadow-2xl">
      <div class="flex justify-between items-center p-4 border-b sticky top-0 bg-white z-10">
        <h3 class="text-xl font-semibold text-[#1a3024]">Votre Panier ({{ cartItems.length }})</h3>
        <button
          class="w-9 h-9 flex items-center justify-center text-2xl text-[#1e3f29] rounded-full hover:bg-[rgba(30,63,41,0.1)] transition-colors"
          @click="$emit('close')"
        >
          &times;
        </button>
      </div>

      <div class="p-5">
        <template v-if="cartItems.length === 0">
          <div class="flex flex-col items-center justify-center py-8">
            <svg width="80" height="80" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="opacity-60 mb-5">
              <path d="M9 22C9.55228 22 10 21.5523 10 21C10 20.4477 9.55228 20 9 20C8.44772 20 8 20.4477 8 21C8 21.5523 8.44772 22 9 22Z" stroke="#1e3f29" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M20 22C20.5523 22 21 21.5523 21 21C21 20.4477 20.5523 20 20 20C19.4477 20 19 20.4477 19 21C19 21.5523 19.4477 22 20 22Z" stroke="#1e3f29" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M1 1H5L7.68 14.39C7.77144 14.8504 8.02191 15.264 8.38755 15.5583C8.75318 15.8526 9.2107 16.009 9.68 16H19.4C19.8693 16.009 20.3268 15.8526 20.6925 15.5583C21.0581 15.264 21.3086 14.8504 21.4 14.39L23 6H6" stroke="#1e3f29" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <p class="text-lg text-gray-600 mb-5">Votre panier est vide.</p>
            <button
              class="py-2.5 px-5 bg-[#1e3f29] text-white font-semibold border-none rounded-md cursor-pointer transition duration-300 hover:bg-[#0f5132] hover:-translate-y-0.5 hover:shadow-md"
              @click="$emit('close')"
            >
              Commencer vos achats
            </button>
          </div>
        </template>

        <template v-else>
          <div class="mb-5">
            <div v-for="(item, index) in cartItems" :key="index" class="flex py-4 border-b relative">
              <div class="w-20 h-20 overflow-hidden rounded-md mr-4">
                <img
                  :src="item.image || getDefaultImage(item.id)"
                  :alt="item.title"
                  class="w-full h-full object-cover"
                >
              </div>

              <div class="flex-1">
                <h4 class="font-semibold text-[#1a3024] mb-1">{{ item.title }}</h4>
                <p class="font-semibold text-[#1e3f29] mb-2">{{ formatPrice(item.price) }}</p>
                <div class="flex items-center">
                  <button
                    class="w-7 h-7 flex items-center justify-center bg-gray-100 rounded text-[#1e3f29] font-bold border-none cursor-pointer hover:bg-gray-200"
                    @click="decreaseQuantity(index)"
                  >-</button>
                  <span class="mx-2.5 font-semibold min-w-5 text-center">{{ item.quantity }}</span>
                  <button
                    class="w-7 h-7 flex items-center justify-center bg-gray-100 rounded text-[#1e3f29] font-bold border-none cursor-pointer hover:bg-gray-200"
                    @click="increaseQuantity(index)"
                  >+</button>
                </div>
              </div>

              <button
                class="absolute top-4 right-0 w-7 h-7 flex items-center justify-center text-gray-500 bg-transparent border-none rounded-full cursor-pointer hover:bg-red-50 hover:text-red-500 transition-colors"
                @click="removeItem(index)"
              >&times;</button>
            </div>
          </div>

          <div class="bg-gray-50 p-4 rounded-lg mb-5">
            <div class="flex justify-between py-2 text-gray-700">
              <span>Sous-total:</span>
              <span>{{ formatPrice(calculateSubtotal()) }}</span>
            </div>
            <div class="flex justify-between py-2 text-gray-700">
              <span>Livraison:</span>
              <span>{{ formatPrice(shippingCost) }}</span>
            </div>
            <div class="flex justify-between py-2 text-xl font-bold text-[#1a3024] border-t border-gray-200 mt-1 pt-2">
              <span>Total:</span>
              <span>{{ formatPrice(calculateSubtotal() + shippingCost) }}</span>
            </div>
          </div>

          <div class="flex gap-3 mt-5 sm:flex-row flex-col">
            <button
              class="flex-1 py-3 border border-[#1e3f29] bg-white text-[#1e3f29] font-semibold rounded-md cursor-pointer transition duration-200 hover:bg-gray-50"
              @click="$emit('close')"
            >
              Continuer les achats
            </button>
            <button
              class="flex-1 py-3 bg-[#1e3f29] text-white font-semibold border-none rounded-md cursor-pointer shadow-md transition duration-300 hover:bg-[#0f5132] hover:-translate-y-0.5 hover:shadow-lg"
              @click="checkout"
            >
              Passer la commande
            </button>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  cartItems: {
    type: Array,
    default: () => []
  }
});

const emit = defineEmits(['close', 'update-cart']);
const shippingCost = 5.99;

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

// Calcul du sous-total
const calculateSubtotal = () => {
  return props.cartItems.reduce((total, item) => {
    return total + (item.price * item.quantity);
  }, 0);
};

// Augmenter la quantité d'un article
const increaseQuantity = (index) => {
  const updatedCart = [...props.cartItems];
  updatedCart[index].quantity += 1;
  emit('update-cart', updatedCart);
};

// Diminuer la quantité d'un article
const decreaseQuantity = (index) => {
  const updatedCart = [...props.cartItems];
  if (updatedCart[index].quantity > 1) {
    updatedCart[index].quantity -= 1;
    emit('update-cart', updatedCart);
  } else {
    removeItem(index);
  }
};

// Supprimer un article
const removeItem = (index) => {
  const updatedCart = [...props.cartItems];
  updatedCart.splice(index, 1);
  emit('update-cart', updatedCart);
};

// Passer à la commande
const checkout = () => {
  alert('Redirection vers la page de paiement...');
  // Logique de redirection vers la page de paiement
};
</script>
