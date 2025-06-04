<template>
 <main class="min-h-screen flex items-center justify-center px-4 py-12 ">
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

     <form @submit.prevent="register" class="space-y-6">
       <!-- Section Informations personnelles -->
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

       <!-- Section Connexion -->
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
         </div>
       </div>

       <!-- Section Adresse -->
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

       <!-- Bouton de soumission -->
       <button type="submit" 
         class="w-full py-4 bg-gradient-to-r from-[#1e3f29] to-emerald-600 text-white font-semibold text-lg rounded-lg hover:from-[#2d5a3d] hover:to-emerald-700 transform hover:-translate-y-1 transition-all duration-300 shadow-lg hover:shadow-xl">
         S'enregistrer
       </button>
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
         <a href="#" class="text-emerald-600 hover:text-emerald-700 font-semibold transition-colors">Connectez-vous ici</a>
       </p>
     </div>
   </div>
 </main>
</template>

<script setup>
import { ref } from 'vue'

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

const error = ref('')
const success = ref(false)

const register = async () => {
  error.value = ''
  success.value = false
  try {
    const response = await fetch('http://185.98.138.168:8080/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form.value)
    })
    if (!response.ok) {
      throw new Error('Erreur lors de la création du compte')
    }
    success.value = true
    setTimeout(() => {
      router.push('/')
    }, 1500) // Redirige après 1,5 seconde
  } catch (e) {
    error.value = e.message
  }
}
</script>