<template>
  <main class="min-h-screen flex items-center justify-center px-4 py-12">
    <div class="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-8 w-full max-w-2xl border border-white/20">
      <!-- Header avec icône -->
      <div class="text-center mb-8">
        <div class="inline-block p-3 bg-emerald-100 rounded-full mb-4">
          <svg class="w-8 h-8 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
          </svg>
        </div>
        <h2 class="text-3xl font-bold text-[#1e3f29] mb-2">Créer un compte</h2>
        <p class="text-gray-600">Rejoignez Open Fashion pour une mode éthique et durable</p>
      </div>

      <!-- Indicateur de progression -->
      <div class="mb-8">
        <div class="flex justify-between items-center">
          <div v-for="(step, index) in steps" :key="index" class="flex flex-col items-center flex-1">
            <div class="w-10 h-10 rounded-full flex items-center justify-center mb-2"
                 :class="[
                  currentStep > index ? 'bg-emerald-600 text-white' :
                  currentStep === index ? 'bg-emerald-500 text-white' :
                  'bg-gray-200 text-gray-700'
                ]">
              {{ index + 1 }}
            </div>
            <div class="text-xs text-center font-medium"
                 :class="currentStep >= index ? 'text-emerald-600' : 'text-gray-500'">
              {{ step }}
            </div>
          </div>
        </div>
        <div class="relative mt-2">
          <div class="h-1 bg-gray-200 absolute left-0 right-0 top-0"></div>
          <div class="h-1 bg-emerald-500 absolute left-0 top-0 transition-all duration-300"
               :style="`width: ${(currentStep / (steps.length-1)) * 100}%`"></div>
        </div>
      </div>

      <form @submit.prevent="handleSubmit">
        <!-- Étape 1 : Informations personnelles -->
        <div v-if="currentStep === 0" class="space-y-6">
          <div class="bg-gray-50/70 rounded-xl p-6">
            <h3 class="text-lg font-semibold text-[#1e3f29] mb-4 flex items-center">
              <svg class="w-5 h-5 mr-2 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
              </svg>
              Informations personnelles
            </h3>
            <div class="grid md:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Prénom</label>
                <input v-model="form.firstname" type="text" placeholder="Votre prénom"
                       class="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all outline-none" required />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Nom</label>
                <input v-model="form.lastname" type="text" placeholder="Votre nom"
                       class="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all outline-none" required />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Nom d'utilisateur</label>
                <input v-model="form.username" type="text" placeholder="Nom d'utilisateur unique"
                       class="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all outline-none" required />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Téléphone</label>
                <input v-model="form.phone" type="tel" placeholder="+33 6 12 34 56 78"
                       class="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all outline-none" required />
              </div>
            </div>
          </div>
        </div>

        <!-- Étape 2 : Informations de connexion -->
        <div v-if="currentStep === 1" class="space-y-6">
          <div class="bg-gray-50/70 rounded-xl p-6">
            <h3 class="text-lg font-semibold text-[#1e3f29] mb-4 flex items-center">
              <svg class="w-5 h-5 mr-2 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 7a2 2 0 012 2m0 0a2 2 0 012 2m-2-2a2 2 0 00-2 2m2-2V5a2 2 0 00-2-2H9a2 2 0 00-2 2v2M7 7a2 2 0 012-2h6a2 2 0 012 2v6a2 2 0 01-2 2H9a2 2 0 01-2-2V7z"></path>
              </svg>
              Informations de connexion
            </h3>
            <div class="grid md:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input v-model="form.email" type="email" placeholder="votre@email.com"
                       class="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all outline-none" required />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Mot de passe</label>
                <input v-model="form.password" type="password" placeholder="••••••••"
                       class="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all outline-none" required />
              </div>
              <div class="md:col-span-2">
                <label class="block text-sm font-medium text-gray-700 mb-2">Confirmer le mot de passe</label>
                <input v-model="passwordConfirm" type="password" placeholder="••••••••"
                       class="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all outline-none" required />
              </div>
            </div>
          </div>
        </div>

        <!-- Étape 3 : Adresse de livraison -->
        <div v-if="currentStep === 2" class="space-y-6">
          <div class="bg-gray-50/70 rounded-xl p-6">
            <h3 class="text-lg font-semibold text-[#1e3f29] mb-4 flex items-center">
              <svg class="w-5 h-5 mr-2 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
              </svg>
              Adresse de livraison
            </h3>
            <div class="grid md:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Rue</label>
                <input v-model="form.address.street" type="text" placeholder="123 rue de la Mode"
                       class="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all outline-none" required />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Numéro</label>
                <input v-model="form.number" type="number" placeholder="12"
                       class="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all outline-none" required />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Ville</label>
                <input v-model="form.address.city" type="text" placeholder="Paris"
                       class="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all outline-none" required />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Code postal</label>
                <input v-model="form.zipcode" type="text" placeholder="75001"
                       class="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all outline-none" required />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Latitude</label>
                <input v-model="form.address.geolocation.lat" type="text" placeholder="48.8566"
                       class="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all outline-none" required />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Longitude</label>
                <input v-model="form.address.geolocation.long" type="text" placeholder="2.3522"
                       class="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all outline-none" required />
              </div>
            </div>
          </div>
        </div>

        <!-- Étape 4 : Confirmation -->
        <div v-if="currentStep === 3" class="space-y-6">
          <div class="bg-gray-50/70 rounded-xl p-6">
            <h3 class="text-lg font-semibold text-[#1e3f29] mb-4 flex items-center">
              <svg class="w-5 h-5 mr-2 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              Confirmation
            </h3>
            <div class="space-y-4">
              <div>
                <h4 class="font-medium text-sm text-gray-700">Informations personnelles</h4>
                <p class="text-gray-800">{{ form.firstname }} {{ form.lastname }}</p>
                <p class="text-gray-800">{{ form.username }}</p>
                <p class="text-gray-800">{{ form.phone }}</p>
              </div>
              <div>
                <h4 class="font-medium text-sm text-gray-700">Contact</h4>
                <p class="text-gray-800">{{ form.email }}</p>
              </div>
              <div>
                <h4 class="font-medium text-sm text-gray-700">Adresse</h4>
                <p class="text-gray-800">{{ form.address.street }}, {{ form.number }}</p>
                <p class="text-gray-800">{{ form.zipcode }} {{ form.address.city }}</p>
              </div>
              <div class="pt-4 border-t border-gray-200">
                <label class="flex items-center cursor-pointer">
                  <input type="checkbox" v-model="termsAccepted" class="mr-2 h-5 w-5 accent-emerald-600" required />
                  <span class="text-sm text-gray-700">J'accepte les conditions générales d'utilisation et la politique de confidentialité</span>
                </label>
              </div>
            </div>
          </div>
        </div>

        <!-- Navigation des étapes -->
        <div class="mt-8 flex justify-between items-center">
          <button
            v-if="currentStep > 0"
            type="button"
            @click="prevStep"
            class="px-6 py-3 border-2 border-[#1e3f29] text-[#1e3f29] rounded-lg hover:bg-gray-50 transition-colors">
            Précédent
          </button>
          <div v-else class="w-[100px]"></div> <!-- Espace réservé -->

          <div v-if="currentStep < steps.length - 1">
            <button
              type="button"
              @click="nextStep"
              :disabled="!isStepValid"
              class="px-6 py-3 bg-gradient-to-r from-[#1e3f29] to-emerald-600 text-white font-semibold rounded-lg hover:from-[#2d5a3d] hover:to-emerald-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed">
              Suivant
            </button>
          </div>
          <button
            v-else
            type="submit"
            :disabled="!termsAccepted"
            class="px-6 py-3 bg-gradient-to-r from-[#1e3f29] to-emerald-600 text-white font-semibold rounded-lg hover:from-[#2d5a3d] hover:to-emerald-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed">
            S'inscrire
          </button>
        </div>
      </form>

      <!-- Messages de statut -->
      <div v-if="success" class="mt-6 p-4 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-lg text-center shadow-lg">
        <div class="flex items-center justify-center mb-2">
          <svg class="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          <span class="font-semibold">Compte créé avec succès !</span>
        </div>
        <p class="text-sm opacity-90">Bienvenue dans la communauté Open Fashion</p>
      </div>

      <div v-if="error" class="mt-6 p-4 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg text-center shadow-lg">
        <div class="flex items-center justify-center mb-2">
          <svg class="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          <span class="font-semibold">Erreur lors de la création</span>
        </div>
        <p class="text-sm opacity-90">{{ error }}</p>
      </div>

      <!-- Lien de connexion -->
      <div class="text-center mt-8 pt-6 border-t border-gray-200">
        <p class="text-gray-600">
          Vous avez déjà un compte ?
          <router-link to="/" class="text-emerald-600 hover:text-emerald-700 font-semibold transition-colors">Connectez-vous ici</router-link>
        </p>
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// Définition des étapes
const steps = ['Informations personnelles', 'Connexion', 'Adresse', 'Confirmation']
const currentStep = ref(0)

const form = ref({
  email: '',
  username: '',
  password: '',
  firstname: '',
  lastname: '',
  address: {
    city: '',
    street: '',
    geolocation: {
      lat: '',
      long: ''
    }
  },
  number: '',
  zipcode: '',
  phone: ''
})

const passwordConfirm = ref('')
const termsAccepted = ref(false)
const error = ref('')
const success = ref(false)

// Navigation entre les étapes
const nextStep = () => {
  if (isStepValid.value && currentStep.value < steps.length - 1) {
    currentStep.value++
  }
}

const prevStep = () => {
  if (currentStep.value > 0) {
    currentStep.value--
  }
}

// Validation des étapes
const isStepValid = computed(() => {
  switch (currentStep.value) {
    case 0: // Informations personnelles
      return form.value.firstname &&
        form.value.lastname &&
        form.value.username &&
        form.value.phone
    case 1: // Connexion
      return form.value.email &&
        form.value.password &&
        passwordConfirm.value === form.value.password
    case 2: // Adresse
      return form.value.address.street &&
        form.value.number &&
        form.value.address.city &&
        form.value.zipcode &&
        form.value.address.geolocation.lat &&
        form.value.address.geolocation.long
    case 3: // Confirmation
      return termsAccepted.value
    default:
      return false
  }
})

// Soumission du formulaire complet
const handleSubmit = async () => {
  error.value = ''
  success.value = false

  if (!isStepValid.value) return

  try {
    const response = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form.value)
    })

    if (!response.ok) {
      const data = await response.json()
      throw new Error(data.message || 'Erreur lors de la création du compte')
    }

    success.value = true
    setTimeout(() => {
      router.push('/')
    }, 1500)
  } catch (e) {
    error.value = e.message
  }
}
</script>
