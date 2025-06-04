<template>
    <main class="flex flex-col items-center justify-center min-h-[70vh] px-4 py-12 ">
        <div
            v-if="product"
            class="w-full max-w-4xl bg-white rounded-3xl shadow-2xl flex flex-col md:flex-row gap-10 p-10 transition-all duration-300"
        >
            <div class="flex-1 flex flex-col items-center justify-center">
                <img
                    :src="product.image || getDefaultImage(product.id)"
                    alt=""
                    class="w-80 h-96 object-cover rounded-2xl shadow-lg border border-[#e3efe7] bg-[#f6faf7] hover:scale-105 hover:shadow-2xl transition-all duration-300"
                />
            </div>
            <div class="flex-1 flex flex-col justify-between">
                <div>
                    <h1 class="text-4xl font-extrabold text-[#1e3f29] mb-4 tracking-tight">{{ product.title }}</h1>
                    <p class="text-[#3e7e5a] text-lg mb-8 leading-relaxed">{{ product.description }}</p>
                </div>
                <div class="flex flex-col gap-6 mt-8">
                    <div class="flex items-center gap-4">
                        <span class="text-3xl font-bold text-[#0f5132]">{{ formatPrice(product.price) }}</span>
                        <span class="bg-[#e3efe7] text-[#1e3f29] px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider shadow">
                            {{ product.category || 'Mode' }}
                        </span>
                    </div>
                    <button
                        class="mt-4 px-10 py-4 rounded-xl bg-gradient-to-r from-[#1e3f29] to-[#3e7e5a] text-white font-bold text-lg shadow-lg hover:scale-105 hover:from-[#3e7e5a] hover:to-[#1e3f29] transition-all duration-300"
                        @click="addToCart"
                    >
                        Ajouter au panier
                    </button>
                </div>
            </div>
        </div>
        <div v-else-if="loading" class="text-[#1e3f29] text-xl font-semibold mt-12">Chargement...</div>
        <div v-else class="text-red-700 text-xl font-semibold mt-12">Produit introuvable.</div>
    </main>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const emit = defineEmits(['add-to-cart'])
const route = useRoute()
const product = ref(null)
const loading = ref(true)

const getDefaultImage = (id) => {
    const colors = ['1e3f29', '2a5a3d', '346c4c', '3e7e5a', '499169']
    const colorIndex = id % colors.length
    return `https://via.placeholder.com/300x400/${colors[colorIndex]}/FFFFFF?text=Mode+Verte`
}

const formatPrice = (price) => {
    if (!price) return '0,00 €'
    return parseFloat(price).toFixed(2).replace('.', ',') + ' €'
}

const addToCart = () => {
    if (product.value) {
        emit('add-to-cart', product.value)
    }
}

onMounted(async () => {
    loading.value = true
    try {
        const response = await fetch(`/api/products/${route.params.id}`)
        if (response.ok) {
            product.value = await response.json()
        }
    } catch (e) {
        product.value = null
    }
    loading.value = false
})
</script>