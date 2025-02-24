import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), VitePWA({
    registerType: 'autoUpdate',
    manifest: {
      name: 'Hospital Care',
      short_name: 'HCare',
      description: 'Aplicación PWA para la gestión de atenciones médicas en un hospital',
      theme_color: '#ffffff',
      background_color: '#ffffff',
      start_url: '/',
      display: 'standalone',
      icons: [
        {
          src: '/icons/logo-192x192.png',
          sizes: '192x192',
          type: 'image/png'
        },
        {
          src: '/icons/logo-500x500.png',
          sizes: '500x500',
          type: 'image/png'
        }
      ]
    },
    devOptions: {
      enabled: true
    }
  })],
})
