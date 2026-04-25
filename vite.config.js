import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // Use the light version of lottie-web for better security and smaller bundle size
      'lottie-web': 'lottie-web/build/player/lottie_light.js'
    }
  },
  build: {
    // Standard stable build settings
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom', '@mui/material', '@emotion/react', '@emotion/styled']
        }
      }
    }
  },
  optimizeDeps: {
    include: [
      '@mui/material',
      '@mui/icons-material',
      '@emotion/react',
      '@emotion/styled',
      '@mui/x-data-grid',
      '@mui/x-date-pickers'
    ]
  }
})
