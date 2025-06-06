import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
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
      '/api/auth/register': {
        target: 'http://185.98.138.168:8080',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/auth\/register/, '/users'),
      },
    },
  },
  // Configuration pour Vitest
  test: {
    environment: 'jsdom',
    globals: true,
    include: [
      '**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}',
      '**/tests/**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}',
      '**/test/**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'
    ],
    // setupFiles: ['./src/test/setup.js'], // optionnel, si vous avez un fichier de setup
  }
})