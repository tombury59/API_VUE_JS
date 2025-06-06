# Open Fashion - Boutique en ligne Vue.js

Une application e-commerce moderne développée avec Vue.js 3, Vite et Tailwind CSS, proposant une mode éthique et durable.

## 🚀 Fonctionnalités

### 🛍️ E-commerce
- **Catalogue de produits** avec filtrage et recherche
- **Panier d'achat** persistant avec localStorage
- **Détails produits** avec évaluations et commentaires
- **Système d'authentification** (connexion/inscription)
- **Gestion de compte** utilisateur

### 🎨 Interface utilisateur
- **Design responsive** optimisé mobile/desktop
- **Interface moderne** avec Tailwind CSS
- **Animations fluides** et transitions
- **Navigation intuitive** avec Vue Router
- **Composants réutilisables** bien structurés

### 🎉 Fonctionnalités bonus
- **Easter Egg Konami Code** 🎂 (↑↑↓↓←→←→BQ)
- **Notifications** interactives
- **Commentaires clients** avec carrousel
- **Effets visuels** (confettis, feux d'artifice)

## 🛠️ Technologies utilisées

- **Vue.js 3** - Framework JavaScript progressif
- **Vite** - Build tool moderne et rapide
- **Vue Router** - Routage SPA
- **Tailwind CSS** - Framework CSS utility-first
- **Vitest** - Framework de test unitaire
- **Vue Test Utils** - Utilitaires de test pour Vue
- **jsdom** - Environnement DOM pour les tests

## 📁 Structure du projet

```
src/
├── components/          # Composants réutilisables
│   ├── Header.vue      # En-tête avec navigation
│   ├── Footer.vue      # Pied de page
│   ├── CartModal.vue   # Modal panier
│   ├── LoginModal.vue  # Modal de connexion
│   ├── ProductsSection.vue # Section produits
│   └── ...
├── views/              # Pages principales
│   ├── HomeView.vue    # Page d'accueil
│   ├── CatalogueView.vue # Page catalogue
│   ├── ProductDetailView.vue # Détail produit
│   └── RegisterView.vue # Inscription
├── router/             # Configuration du routeur
├── assets/             # Ressources statiques
└── test/               # Tests unitaires
```

## ⚙️ Installation et configuration

### Prérequis
- Node.js (version 16+)
- npm ou yarn

### Installation

```sh
# Cloner le repository
git clone [url-du-repo]
cd vue-projet-api

# Installer les dépendances
npm install
```

### Variables d'environnement

Le projet utilise un proxy Vite pour l'API. Configuration dans `vite.config.js` :

```javascript
server: {
  proxy: {
    '/api/products': {
      target: 'http://185.98.138.168:8080',
      changeOrigin: true,
      rewrite: (path) => path.replace(/^\/api\/products/, '/products'),
    },
    '/api/auth/connection': {
      target: 'http://185.98.138.168:8080',
      changeOrigin: true,
      rewrite: (path) => path.replace(/^\/api\/auth\/connection/, '/auth/login'),
    },
    // ...
  }
}
```

## 🚀 Scripts disponibles

### Développement
```sh
# Démarrer le serveur de développement
npm run dev
```

### Production
```sh
# Construire pour la production
npm run build

# Prévisualiser le build de production
npm run preview
```

### Tests
```sh
# Lancer les tests unitaires
npx vitest

```

## 🧪 Tests

Le projet inclut des tests unitaires pour les composants principaux :

- **Header.vue** - Tests de navigation, authentification, menu mobile
- **Panier** - Tests d'ajout/suppression d'articles

```sh
# Lancer tous les tests
npm run test

# Tests avec coverage
npm run test:coverage
```


## 🔧 Configuration avancée

### Vitest configuration
```javascript
// vite.config.js
export default defineConfig({
  test: {
    environment: 'jsdom',
    globals: true,
    include: [
      '**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}',
      '**/tests/**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}',
      '**/test/**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'
    ]
  }
})
```


## 🌟 Fonctionnalités spéciales

### Konami Code Easter Egg
Tapez la séquence : `↑ ↑ ↓ ↓ ← → ← → B Q` pour déclencher une surprise d'anniversaire ! 🎂

### Persistance des données
- **Panier** sauvegardé dans localStorage
- **Authentification** avec tokens JWT
- **Synchronisation** multi-onglets

### Notifications
- **Toast notifications** pour les actions utilisateur
- **Feedback visuel** pour l'ajout au panier
- **Messages d'erreur** contextuels


## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

## 👥 Équipe

- **Développeur principal** : Tom Bury
- **Design** : Open Fashion Team
- **Tests** : Équipe TB



**Open Fashion** - Mode éthique et durable pour tous 🌱


---

---

# 🚀 Déploiement VPS - Open Fashion

Guide rapide pour déployer l'application Vue.js sur un VPS.

## 📋 Prérequis

- VPS Ubuntu 20.04+
- Accès SSH root/sudo
- Git installé localement

## 🖥️ Configuration VPS

### 1. Connexion et mise à jour

```bash
ssh root@votre-ip-vps
sudo apt update && sudo apt upgrade -y
sudo apt install -y curl wget git nginx
```

### 2. Installation Node.js

```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs
```

### 3. Configuration pare-feu

```bash
sudo ufw allow 'Nginx Full'
sudo ufw allow ssh
sudo ufw enable
```

## 📦 Déploiement

### 1. Cloner et installer

```bash
cd /var/www
sudo git clone https://github.com/votre-repo/vue-projet-api.git open-fashion
sudo chown -R $USER:$USER /var/www/open-fashion
cd open-fashion
npm install
npm run build
```

### 2. Configuration Nginx

```bash
sudo nano /etc/nginx/sites-available/open-fashion
```

```nginx
server {
    listen 80;
    server_name votre-ip-ou-domaine;
    root /var/www/open-fashion/dist;
    index index.html;
    
    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

### 3. Activation

```bash
sudo ln -s /etc/nginx/sites-available/open-fashion /etc/nginx/sites-enabled/
sudo rm /etc/nginx/sites-enabled/default
sudo nginx -t
sudo systemctl restart nginx
```

## 🔄 Script de mise à jour

```bash
sudo nano /usr/local/bin/deploy.sh
```

```bash
#!/bin/bash
cd /var/www/open-fashion
git pull origin main
npm install
npm run build
sudo systemctl restart nginx
echo "✅ Déployé !"
```

```bash
sudo chmod +x /usr/local/bin/deploy.sh
```

## 🔧 Commandes utiles

```bash
# Mise à jour
/usr/local/bin/deploy.sh

# Logs Nginx
sudo tail -f /var/log/nginx/error.log

# Redémarrer Nginx
sudo systemctl restart nginx

# Tester config
sudo nginx -t
```

---
