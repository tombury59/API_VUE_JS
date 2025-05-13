<template>
  <div class="modal-overlay">
    <div class="login-modal">
      <div class="modal-header">
        <h3>Connexion</h3>
        <button class="close-button" @click="$emit('close')">&times;</button>
      </div>
      <div class="modal-content">
        <form @submit.prevent="handleLogin">
          <div class="form-group">
            <label for="email">Email</label>
            <input type="email" id="email" v-model="email" required>
          </div>
          <div class="form-group">
            <label for="password">Mot de passe</label>
            <input type="password" id="password" v-model="password" required>
          </div>
          <button type="submit" class="login-submit">Se connecter</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const email = ref('');
const password = ref('');
const emit = defineEmits(['close']);

const handleLogin = () => {
  // Logique de connexion à implémenter
  console.log('Tentative de connexion avec:', email.value);
  emit('close');
};
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
}

.login-modal {
  background-color: white;
  border-radius: 10px;
  width: 90%;
  max-width: 400px;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  border-bottom: 1px solid #eee;
}

.close-button {
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #1e3f29;
}

.modal-content {
  padding: 20px;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  font-weight: 500;
}

.form-group input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.login-submit {
  width: 100%;
  padding: 12px;
  background-color: #1e3f29;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 10px;
}

.login-submit:hover {
  background-color: #0f5132;
}
</style>
