<script setup>
import { ref, onMounted } from 'vue'
import { deleteMyAccount } from '../../api/delAccount.js'
import { useRouter } from 'vue-router'

const router = useRouter()
const hasToken = ref(false)

const updateHasToken = () => {
  hasToken.value = !!localStorage.getItem('token')
}

onMounted(() => {
  updateHasToken()
  window.addEventListener('storage', updateHasToken)
})

// Appelle cette fonction lors de la déconnexion dans ton app principale aussi !
const handleDeleteAccount = async () => {
  if (confirm('Voulez-vous vraiment supprimer votre compte ? Cette action est irréversible.')) {
    try {
      await deleteMyAccount()
      updateHasToken() // MAJ immédiate après suppression
      router.push('/')
      // Pas besoin de window.location.reload()
    } catch (e) {
      // Affiche une notification design ici si besoin
    }
  }
}
</script>

<template>
  <footer class="bg-[#1e3f29] text-white pt-12 pb-6 px-4">
    <div class="max-w-7xl mx-auto flex flex-col md:flex-row md:justify-between gap-10">
      <!-- Logo & Social -->
      <div class="flex flex-col items-center md:items-start text-center md:text-left">
        <div class="text-3xl font-extrabold italic mb-2">Open Fashion</div>
        <div class="mb-4 text-emerald-200">Social Media</div>
        <div class="flex gap-3 justify-center md:justify-start">
          <a href="#" aria-label="Facebook" class="hover:text-emerald-300 transition">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M18 2h-3a5 5 0 00-5 5v3H6v4h4v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
            </svg>
          </a>
          <a href="#" aria-label="Twitter" class="hover:text-emerald-300 transition">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M23 3a10.9 10.9 0 01-3.14 1.53A4.48 4.48 0 0022.4 1s-4.18 1.64-6.29 2.34A4.48 4.48 0 003 7.48v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
            </svg>
          </a>
          <a href="#" aria-label="Instagram" class="hover:text-emerald-300 transition">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <rect width="20" height="20" x="2" y="2" rx="5" ry="5" stroke-width="2" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
              <circle cx="17.5" cy="6.5" r="1.5" />
            </svg>
          </a>
        </div>
      </div>
      <!-- Shop -->
      <div class="flex flex-col items-center md:items-start text-center md:text-left">
        <div class="font-bold mb-3 text-emerald-100">SHOP</div>
        <ul class="space-y-2">
          <li><router-link to="/" class="hover:text-emerald-300 transition">Accueil</router-link></li>
          <li><router-link to="/catalogue" class="hover:text-emerald-300 transition">Catalogue</router-link></li>
        </ul>
      </div>
      <!-- Company -->
      <div class="flex flex-col items-center md:items-start text-center md:text-left">
        <div class="font-bold mb-3 text-emerald-100">COMPAGNIE</div>
        <ul class="space-y-2">
          <li><router-link to="/register" class="hover:text-emerald-300 transition">S'enregister</router-link></li>
        </ul>
      </div>
      <!-- Newsletter -->
      <div class="flex flex-col items-center md:items-start text-center md:text-left w-full md:w-auto">
        <div class="mt-8 flex justify-center">
          <span class="text-xs text-emerald-200 opacity-70 flex items-center gap-1 select-none">
            <svg class="w-4 h-4 inline-block mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 2v2m0 0c0 1.104-.896 2-2 2s-2-.896-2-2 2-4 2-4 2 2.896 2 4zm0 0c0 1.104.896 2 2 2s2-.896 2-2-2-4-2-4-2 2.896-2 4zM4 10v6a8 4 0 0016 0v-6M4 10a8 4 0 0116 0M4 10a8 4 0 0016 0" />
              <line x1="4" y1="16" x2="20" y2="16" stroke-width="2" stroke-linecap="round" />
            </svg>
            ↑ ↑ ↓ ↓ ← → ← → B A
          </span>
        </div>
        
      </div>
    </div>
   <div class="border-t border-emerald-200 my-8"></div>
    <div class="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center text-sm text-emerald-100 gap-2">
      <div class="mb-2 md:mb-0">&copy; {{ new Date().getFullYear() }} Open Fashion</div>
      <div class="flex flex-col sm:flex-row gap-2 sm:gap-6 text-center">
        <a
          v-if="hasToken"
          href="#"
          class="text-red-600 hover:text-white"
          @click.prevent="handleDeleteAccount"
        >Supprimer le compte</a>
      </div>
    </div>
  </footer>
</template>