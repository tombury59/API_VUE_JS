<template>
  <section class="hero">
    <div class="hero-content">
      <span class="hero-subtitle">COLLECTION PRINTEMPS-ÉTÉ 2023</span>
      <h1 class="hero-title">Cherchez et trouvez <span class="highlight">votre propre style !</span></h1>
      <p class="hero-description">Explorez nos sélections d'articles PREMIUM mis en avant rien que pour vous. Une mode éthique et durable pour tous les jours.</p>
      <button class="cta-button" @click="$emit('scroll-to-products')">
        NOS ARTICLES
        <span class="arrow">→</span>
      </button>
    </div>
    <div class="hero-image-container">
      <div class="hero-image">
        <img src="../assets/Mask%20group.png" alt="Fashion model" class="hero-img">
        <div class="bg-dots"></div>
      </div>
    </div>
  </section>
</template>

<script setup>
defineEmits(['scroll-to-products']);
</script>

<style scoped>
.hero {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 80px 0;
  position: relative;
  overflow: hidden;
}

.hero::before {
  content: '';
  position: absolute;
  top: -150px;
  right: -150px;
  width: 300px;
  height: 300px;
  border-radius: 50%;
  background-color: rgba(30, 63, 41, 0.05);
  z-index: -1;
}

.hero-content {
  max-width: 530px;
  padding-right: 40px;
  position: relative;
  z-index: 2;
}

.hero-subtitle {
  display: inline-block;
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 2px;
  color: #0f5132;
  background-color: rgba(15, 81, 50, 0.1);
  padding: 6px 12px;
  border-radius: 4px;
  margin-bottom: 24px;
}

.hero-title {
  font-size: 52px;
  line-height: 1.1;
  margin-bottom: 24px;
  font-weight: 800;
  color: #1a3024;
  position: relative;
}

.highlight {
  color: #0f5132;
  position: relative;
  display: inline-block;
}

.highlight::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 100%;
  height: 8px;
  background-color: rgba(15, 81, 50, 0.2);
  z-index: -1;
  border-radius: 4px;
}

.hero-description {
  font-size: 18px;
  line-height: 1.6;
  margin-bottom: 40px;
  color: #3a5a46;
}

.cta-button {
  display: inline-flex;
  align-items: center;
  padding: 16px 32px;
  background-color: #1e3f29;
  color: white;
  text-decoration: none;
  font-weight: 600;
  border-radius: 6px;
  transition: all 0.3s ease;
  cursor: pointer;
  border: none;
  box-shadow: 0 4px 12px rgba(15, 81, 50, 0.2);
  font-size: 16px;
  letter-spacing: 0.5px;
}

.arrow {
  margin-left: 10px;
  font-size: 20px;
  transition: transform 0.3s ease;
}

.cta-button:hover {
  background-color: #0f5132;
  transform: translateY(-3px);
  box-shadow: 0 6px 16px rgba(15, 81, 50, 0.3);
}

.cta-button:hover .arrow {
  transform: translateX(4px);
}

.hero-image-container {
  position: relative;
  z-index: 1;
}

.hero-image {
  position: relative;
  margin-right: -20px;
}

.image-tag {
  position: absolute;
  top: 20px;
  right: 20px;
  background-color: #1e3f29;
  color: white;
  padding: 6px 12px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 1px;
  z-index: 3;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
}

.hero-img {
  width: 100%;
  max-width: 420px;
  border-radius: 20px;
  z-index: 1;
  position: relative;
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
  transition: transform 0.5s ease;
}

.hero-img:hover {
  transform: scale(1.02);
}

.bg-dots {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 20px;
  left: 20px;
  right: 0;
  bottom: 0;
  background-image: radial-gradient(#1e3f29 2px, transparent 2px);
  background-size: 15px 15px;
  z-index: 0;
  border-radius: 20px;
  opacity: 0.6;
  transition: all 0.3s ease;
}

.hero-image:hover .bg-dots {
  transform: translate(5px, 5px);
  opacity: 0.8;
}

@media (max-width: 1024px) {
  .hero-title {
    font-size: 42px;
  }

  .hero-img {
    max-width: 380px;
  }
}

@media (max-width: 768px) {
  .hero {
    flex-direction: column;
    text-align: center;
    padding: 60px 0;
  }

  .hero-content {
    margin-bottom: 50px;
    max-width: 100%;
    padding-right: 0;
  }

  .hero-subtitle {
    margin-bottom: 20px;
  }

  .hero-title {
    font-size: 36px;
  }

  .hero-description {
    font-size: 16px;
  }

  .hero-image {
    margin-top: 20px;
    margin-right: 0;
  }

  .hero-img {
    max-width: 320px;
  }

  .highlight::after {
    height: 6px;
  }
}

@media (max-width: 480px) {
  .hero {
    padding: 40px 0;
  }

  .hero-title {
    font-size: 32px;
  }

  .hero-subtitle {
    font-size: 12px;
    padding: 4px 10px;
  }

  .cta-button {
    padding: 14px 28px;
    font-size: 14px;
  }
}
</style>
