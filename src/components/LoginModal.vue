<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
    <div class="bg-white rounded-lg w-11/12 max-w-md">
      <div class="flex justify-between items-center p-4 border-b border-gray-100">
        <h3 class="text-lg font-medium">Connexion</h3>
        <button class="text-2xl text-green-900 hover:text-green-800" @click="$emit('close')">&times;</button>
      </div>
      <div class="p-5">
        <form @submit.prevent="handleLogin">
          <div class="mb-4">
            <label for="email" class="block mb-1 font-medium">Email</label>
            <input type="email" id="email" v-model="email" required
                   class="w-full p-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600">
          </div>
          <div class="mb-4">
            <label for="password" class="block mb-1 font-medium">Mot de passe</label>
            <input type="password" id="password" v-model="password" required
                   class="w-full p-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600">
          </div>
          <button type="submit"
                  class="w-full py-3 mt-2.5 bg-[#1e3f29] hover:bg-[#0f5132] text-white rounded-md transition-colors">
            Se connecter
          </button>
        </form>
        <div class="flex justify-between mt-6">
          <button @click="$emit('close')" class="text-[#1e3f29] underline">Annuler</button>
          <button @click="goToRegister" class="text-[#3e7e5a] underline font-semibold">S'enregistrer</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const email = ref('')
const password = ref('')
const emit = defineEmits(['close'])

const router = useRouter()

const handleLogin = () => {
  // Logique de connexion à implémenter
  console.log('Tentative de connexion avec:', email.value)
  emit('close')
}

const goToRegister = () => {
  emit('close')
  router.push('/register')
}
</script>