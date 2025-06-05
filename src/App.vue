<template>
  <div class="max-w-7xl mx-auto px-4">
    <Header
      :active-link="activeLink"
      :cart-count="cartCount"
      @set-active="setActiveLink"
      @toggle-cart="toggleCart"
      @open-login="showLoginModal = true"
    />

    <transition name="fade" mode="out-in">
      <router-view
        :cart-items="cartItems"
        @add-to-cart="addToCart"
        @update-cart="updateCart"
        @scroll-to-products="scrollToProducts"
      />
    </transition>

    <!-- Easter Egg Konami Amélioré -->
    <transition name="konami-celebration">
      <div
        v-if="showKonami"
        class="fixed inset-0 z-[9999] pointer-events-none overflow-hidden"
      >
        <!-- Fond avec effet de pulsation -->
        <div class="konami-background"></div>
        
        <!-- Feux d'artifice -->
        <div class="fireworks-container">
          <div class="firework" v-for="n in 8" :key="n" :style="{ '--delay': n * 0.3 + 's' }"></div>
        </div>
        
        <!-- Confettis améliorés -->
        <div class="enhanced-confetti">
          <div class="confetti-piece" v-for="n in 50" :key="n" 
               :style="{ 
                 '--delay': Math.random() * 3 + 's',
                 '--duration': (Math.random() * 3 + 2) + 's',
                 '--x': Math.random() * 100 + '%',
                 '--color': ['#ff0080', '#ffcc33', '#00ffea', '#ff6b6b', '#4ecdc4', '#45b7d1'][Math.floor(Math.random() * 6)]
               }"></div>
        </div>
        
        <!-- Bannière principale -->
        <div class="konami-main-banner">
          <!-- Chien avec effets -->
          <div class="dog-container">
            <div class="dog-glow"></div>
            <img
              src="@/assets/swan.png"
              alt="Chien avec une bougie sur le nez"
              class="konami-dog"
              onerror="this.src='https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=200&h=200&fit=crop&crop=faces'"
            />
            <div class="sparkles">
              <div class="sparkle" v-for="n in 12" :key="n"></div>
            </div>
          </div>
          
          <!-- Texte principal avec effets 3D -->
          <div class="birthday-text-container">
            <div class="text-background-glow"></div>
            <h1 class="explosive-text">
              🎉🎂 
              <span class="rainbow-text-3d">BON ANNIVERSAIRE</span>
              <br>
              <span class="name-highlight">SWANN</span>
              🎂🎉
            </h1>
            <div class="floating-emojis">
              <span class="floating-emoji" v-for="(emoji, i) in ['🎈', '🎁', '🍰', '🎊', '🌟', '💖']" 
                    :key="i" :style="{ '--delay': i * 0.5 + 's' }">{{ emoji }}</span>
            </div>
          </div>
        </div>
        
        <!-- Particules magiques -->
        <div class="magic-particles">
          <div class="particle" v-for="n in 30" :key="n"
               :style="{ 
                 '--delay': Math.random() * 4 + 's',
                 '--x': Math.random() * 100 + '%',
                 '--y': Math.random() * 100 + '%'
               }"></div>
        </div>
        
        <!-- Rayons de lumière -->
        <div class="light-rays">
          <div class="ray" v-for="n in 6" :key="n" :style="{ '--rotation': n * 60 + 'deg' }"></div>
        </div>
      </div>
    </transition>

    <CartModal
      v-if="showCart"
      :cart-items="cartItems"
      @close="showCart = false"
      @update-cart="updateCart"
    />
    <LoginModal v-if="showLoginModal" @close="showLoginModal = false" />

    <Notification
      :show="showNotification"
      :title="notificationTitle"
      :message="notificationMessage"
      @close="showNotification.value = false"
    />

  </div>
  <Footer />
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import Header from './components/Header.vue';
import HeroSection from './components/HeroSection.vue';
import ProductsSection from './components/ProductsSection.vue';
import CartModal from './components/CartModal.vue';
import LoginModal from './components/LoginModal.vue';
import Notification from './components/Notification.vue';
import Footer from './components/Footer.vue'

const activeLink = ref('home');
const showCart = ref(false);
const showLoginModal = ref(false);
const productsSection = ref(null);
const cartItems = ref([]);
let notificationTimeout = null;

// Konami code amélioré avec debug
const showKonami = ref(false);
const konamiProgress = ref(0);
const konamiCode = [
  'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
  'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
  'KeyB', 'KeyQ'
];
let konamiIndex = 0;

const handleKonami = (e) => {
  const key = e.code || e.key;

  // Vérifier si c'est la bonne touche
  let isCorrectKey = false;
  
  if (key === konamiCode[konamiIndex]) {
    isCorrectKey = true;
  } else if (konamiCode[konamiIndex] === 'KeyB' && (key === 'KeyB' || key === 'b' || key === 'B')) {
    isCorrectKey = true;
  } else if (konamiCode[konamiIndex] === 'KeyA' && (key === 'KeyA' || key === 'a' || key === 'A')) {
    isCorrectKey = true;
  }
  
  if (isCorrectKey) {
    konamiIndex++;
    konamiProgress.value = konamiIndex;

    if (konamiIndex === konamiCode.length) {
      showKonami.value = true;
      konamiIndex = 0;
      konamiProgress.value = 0;
      // Effet sonore (optionnel)
      playBirthdaySound();
      setTimeout(() => {
        showKonami.value = false;
      }, 12000);
    }
  } else {
    if (konamiIndex > 0) {
    }
    konamiIndex = 0;
    konamiProgress.value = 0;
  }
};

// Son d'anniversaire (optionnel)
const playBirthdaySound = () => {
  try {
    // Créer un beep simple
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.setValueAtTime(523.25, audioContext.currentTime); // Do
    oscillator.frequency.setValueAtTime(659.25, audioContext.currentTime + 0.2); // Mi
    oscillator.frequency.setValueAtTime(783.99, audioContext.currentTime + 0.4); // Sol
    
    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.6);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.6);
    
  } catch (e) {
  }
};

// Notification
const showNotification = ref(false);
const notificationTitle = ref('Produit ajouté');
const notificationMessage = ref('');

// Calculer le nombre total d'articles dans le panier
const cartCount = computed(() => {
  return cartItems.value.reduce((total, item) => total + item.quantity, 0);
});

const setActiveLink = (link) => {
  activeLink.value = link;
};

const saveCart = () => {
  if (localStorage.getItem('token')) {
    localStorage.setItem('cart', JSON.stringify(cartItems.value));
  }
};

const toggleCart = () => {
  showCart.value = !showCart.value;
};

const updateCart = (newCart) => {
  cartItems.value = newCart;
  saveCart();
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
  saveCart();
  notificationMessage.value = `${product.title} ajouté au panier !`;
    showNotification.value = true;
    // Ajoute ce bloc pour auto-hide
    if (notificationTimeout) clearTimeout(notificationTimeout);
    notificationTimeout = setTimeout(() => {
      showNotification.value = false;
    }, 3000); // 3 secondes
  };

const scrollToProducts = () => {
  productsSection.value?.$el.scrollIntoView({ behavior: 'smooth' });
};

onMounted(() => {
  console.log('🚀 Application montée, listeners ajoutés');
  
  // Konami code listener
  window.addEventListener('keydown', handleKonami);
  
  // Test immédiat du code Konami

  // Charger le panier depuis le localStorage à la connexion
  if (localStorage.getItem('token')) {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      cartItems.value = JSON.parse(storedCart);
    }
  }
  window.addEventListener('open-login', () => {
    showLoginModal.value = true;
  });
  // Synchroniser le panier si déconnexion dans un autre onglet
  window.addEventListener('storage', (e) => {
    if (e.key === 'cart' && localStorage.getItem('token')) {
      cartItems.value = JSON.parse(localStorage.getItem('cart') || '[]');
    }
    if (e.key === 'token' && !localStorage.getItem('token')) {
      cartItems.value = [];
    }
  });
});
</script>

<style>
/* Fond de célébration */
.konami-background {
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at 30% 30%, rgba(255, 0, 128, 0.3) 0%, transparent 50%),
              radial-gradient(circle at 70% 70%, rgba(0, 255, 234, 0.3) 0%, transparent 50%),
              radial-gradient(circle at 50% 50%, rgba(255, 204, 51, 0.2) 0%, transparent 70%);
  animation: backgroundPulse 3s ease-in-out infinite alternate;
}

@keyframes backgroundPulse {
  0% { opacity: 0.3; transform: scale(1); }
  100% { opacity: 0.6; transform: scale(1.05); }
}

/* Bannière principale */
.konami-main-banner {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  z-index: 10;
}

/* Container du chien avec effets */
.dog-container {
  position: relative;
  animation: dogBounce 2s ease-in-out infinite;
}

.dog-glow {
  position: absolute;
  inset: -20px;
  background: radial-gradient(circle, rgba(255, 204, 51, 0.8) 0%, transparent 70%);
  border-radius: 50%;
  animation: glowPulse 2s ease-in-out infinite alternate;
  z-index: -1;
}

.konami-dog {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  object-fit: cover;
  border: 5px solid #fff;
  box-shadow: 0 0 30px rgba(255, 204, 51, 0.8);
  animation: dogFloat 3s ease-in-out infinite;
}

.sparkles {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.sparkle {
  position: absolute;
  width: 8px;
  height: 8px;
  background: radial-gradient(circle, #fff 0%, transparent 70%);
  border-radius: 50%;
  animation: sparkleFloat 2s ease-in-out infinite;
}

.sparkle:nth-child(1) { top: 10%; left: 20%; animation-delay: 0s; }
.sparkle:nth-child(2) { top: 20%; right: 15%; animation-delay: 0.3s; }
.sparkle:nth-child(3) { bottom: 30%; left: 10%; animation-delay: 0.6s; }
.sparkle:nth-child(4) { bottom: 20%; right: 20%; animation-delay: 0.9s; }
.sparkle:nth-child(5) { top: 50%; left: 5%; animation-delay: 1.2s; }
.sparkle:nth-child(6) { top: 40%; right: 5%; animation-delay: 1.5s; }

/* Texte principal avec effets 3D */
.birthday-text-container {
  position: relative;
  text-align: center;
}

.text-background-glow {
  position: absolute;
  inset: -30px;
  background: radial-gradient(ellipse, rgba(255, 0, 128, 0.4) 0%, transparent 70%);
  border-radius: 20px;
  animation: textGlowPulse 2s ease-in-out infinite alternate;
  z-index: -1;
}

.explosive-text {
  font-family: 'Pacifico', 'Comic Sans MS', cursive;
  font-size: clamp(2rem, 5vw, 4rem);
  margin: 0;
  text-align: center;
  filter: drop-shadow(0 0 10px rgba(255, 255, 255, 0.8));
  animation: explosiveScale 1.5s cubic-bezier(0.68, -0.55, 0.265, 1.55) infinite;
}

.rainbow-text-3d {
  background: linear-gradient(45deg, 
    #ff0080 0%, #ff4040 14%, #ffcc33 28%, #40ff40 42%, 
    #40ccff 57%, #8040ff 71%, #ff0080 85%, #ff4040 100%
  );
  background-size: 300% 300%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: rainbowFlow 3s linear infinite;
  text-shadow: 
    2px 2px 0px rgba(0,0,0,0.3),
    4px 4px 0px rgba(0,0,0,0.2),
    6px 6px 0px rgba(0,0,0,0.1);
  transform: perspective(500px) rotateX(15deg);
}

.name-highlight {
  display: inline-block;
  background: linear-gradient(135deg, #ff6b6b, #4ecdc4, #45b7d1, #96ceb4);
  background-size: 400% 400%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: nameGradient 2s ease-in-out infinite, nameScale 1s ease-in-out infinite alternate;
  text-shadow: 0 0 20px rgba(255, 255, 255, 0.5);
  font-size: 1.2em;
  font-weight: bold;
}

/* Emojis flottants */
.floating-emojis {
  position: absolute;
  top: -50px;
  left: 50%;
  transform: translateX(-50%);
  width: 200px;
  height: 100px;
}

.floating-emoji {
  position: absolute;
  font-size: 2rem;
  animation: emojiFloat 4s ease-in-out infinite;
  animation-delay: var(--delay);
}

.floating-emoji:nth-child(1) { left: 0%; top: 0%; }
.floating-emoji:nth-child(2) { left: 20%; top: 20%; }
.floating-emoji:nth-child(3) { left: 40%; top: -10%; }
.floating-emoji:nth-child(4) { left: 60%; top: 15%; }
.floating-emoji:nth-child(5) { left: 80%; top: -5%; }
.floating-emoji:nth-child(6) { left: 100%; top: 10%; }

/* Feux d'artifice */
.fireworks-container {
  position: absolute;
  inset: 0;
  overflow: hidden;
}

.firework {
  position: absolute;
  width: 6px;
  height: 6px;
  background: radial-gradient(circle, #fff 0%, #ff0080 100%);
  border-radius: 50%;
  animation: fireworkExplode 3s ease-out infinite;
  animation-delay: var(--delay);
}

.firework:nth-child(1) { top: 20%; left: 20%; }
.firework:nth-child(2) { top: 30%; right: 20%; }
.firework:nth-child(3) { top: 60%; left: 15%; }
.firework:nth-child(4) { top: 70%; right: 25%; }
.firework:nth-child(5) { top: 40%; left: 50%; }
.firework:nth-child(6) { top: 80%; left: 60%; }
.firework:nth-child(7) { top: 25%; left: 70%; }
.firework:nth-child(8) { top: 55%; right: 40%; }

/* Confettis améliorés */
.enhanced-confetti {
  position: absolute;
  inset: 0;
  overflow: hidden;
}

.confetti-piece {
  position: absolute;
  width: 10px;
  height: 10px;
  background: var(--color);
  left: var(--x);
  top: -10px;
  border-radius: 50%;
  animation: confettiFall var(--duration) linear infinite;
  animation-delay: var(--delay);
}

.confetti-piece:nth-child(odd) {
  border-radius: 0;
  transform: rotate(45deg);
}

/* Particules magiques */
.magic-particles {
  position: absolute;
  inset: 0;
}

.particle {
  position: absolute;
  width: 4px;
  height: 4px;
  background: radial-gradient(circle, #fff 0%, transparent 70%);
  border-radius: 50%;
  left: var(--x);
  top: var(--y);
  animation: particleFloat 6s ease-in-out infinite;
  animation-delay: var(--delay);
}

/* Rayons de lumière */
.light-rays {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 200px;
  height: 200px;
}

.ray {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 2px;
  height: 100px;
  background: linear-gradient(to bottom, rgba(255, 255, 255, 0.8) 0%, transparent 100%);
  transform-origin: bottom center;
  transform: translateX(-50%) rotate(var(--rotation));
  animation: rayRotate 4s linear infinite;
}

/* Animations */
@keyframes dogBounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-20px); }
}

@keyframes glowPulse {
  0% { opacity: 0.5; transform: scale(1); }
  100% { opacity: 1; transform: scale(1.1); }
}

@keyframes dogFloat {
  0%, 100% { transform: rotate(-5deg) scale(1); }
  25% { transform: rotate(5deg) scale(1.05); }
  50% { transform: rotate(-2deg) scale(1.1); }
  75% { transform: rotate(3deg) scale(1.05); }
}

@keyframes sparkleFloat {
  0%, 100% { opacity: 0; transform: translateY(0) scale(0); }
  50% { opacity: 1; transform: translateY(-20px) scale(1); }
}

@keyframes textGlowPulse {
  0% { opacity: 0.3; transform: scale(1); }
  100% { opacity: 0.7; transform: scale(1.05); }
}

@keyframes explosiveScale {
  0%, 100% { transform: scale(1) rotate(0deg); }
  25% { transform: scale(1.05) rotate(-1deg); }
  50% { transform: scale(1.1) rotate(1deg); }
  75% { transform: scale(1.05) rotate(-0.5deg); }
}

@keyframes rainbowFlow {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

@keyframes nameGradient {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}

@keyframes nameScale {
  0% { transform: scale(1); }
  100% { transform: scale(1.1); }
}

@keyframes emojiFloat {
  0%, 100% { transform: translateY(0) rotate(0deg); opacity: 0.7; }
  25% { transform: translateY(-30px) rotate(90deg); opacity: 1; }
  50% { transform: translateY(-60px) rotate(180deg); opacity: 0.8; }
  75% { transform: translateY(-30px) rotate(270deg); opacity: 1; }
}

@keyframes fireworkExplode {
  0% { 
    transform: scale(0); 
    opacity: 1; 
    box-shadow: 0 0 0 0 rgba(255, 0, 128, 0.7); 
  }
  50% { 
    transform: scale(1); 
    opacity: 1; 
    box-shadow: 0 0 0 20px rgba(255, 0, 128, 0); 
  }
  100% { 
    transform: scale(0); 
    opacity: 0; 
    box-shadow: 0 0 0 40px rgba(255, 0, 128, 0); 
  }
}

@keyframes confettiFall {
  0% { transform: translateY(-10px) rotateZ(0deg); opacity: 1; }
  100% { transform: translateY(100vh) rotateZ(720deg); opacity: 0; }
}

@keyframes particleFloat {
  0%, 100% { transform: translateY(0) scale(0); opacity: 0; }
  25% { transform: translateY(-100px) scale(1); opacity: 1; }
  50% { transform: translateY(-200px) scale(1.5); opacity: 0.8; }
  75% { transform: translateY(-300px) scale(1); opacity: 0.5; }
}

@keyframes rayRotate {
  0% { transform: translateX(-50%) rotate(var(--rotation)) scaleY(0); }
  50% { transform: translateX(-50%) rotate(calc(var(--rotation) + 180deg)) scaleY(1); }
  100% { transform: translateX(-50%) rotate(calc(var(--rotation) + 360deg)) scaleY(0); }
}

/* Transition pour l'easter egg */
.konami-celebration-enter-active {
  transition: all 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

.konami-celebration-leave-active {
  transition: all 0.6s ease-out;
}

.konami-celebration-enter-from {
  opacity: 0;
  transform: scale(0.3);
}

.konami-celebration-leave-to {
  opacity: 0;
  transform: scale(1.2);
}

/* Fade transition for router-view */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.4s;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
.fade-enter-to, .fade-leave-from {
  opacity: 1;
}

/* Responsive */
@media (max-width: 768px) {
  .konami-dog {
    width: 100px;
    height: 100px;
  }
  
  .explosive-text {
    font-size: clamp(1.5rem, 4vw, 2.5rem);
  }
  
  .floating-emoji {
    font-size: 1.5rem;
  }
  
  .floating-emojis {
    width: 150px;
  }
}
</style>