import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CatalogueView from '../views/CatalogueView.vue'
import ProductDetailView from '../views/ProductDetailView.vue' // <-- Ajoute cette ligne
import RegisterView from '../views/RegisterView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'home', component: HomeView },
    { path: '/catalogue', name: 'catalogue', component: CatalogueView },
    { path: '/produit/:id', name: 'product-detail', component: ProductDetailView, props: true }, // <-- Ajoute cette ligne
    { path: '/about', name: 'about', component: () => import('../views/AboutView.vue') },
    { path: '/register', name: 'register', component: RegisterView },

  ],
})

export default router