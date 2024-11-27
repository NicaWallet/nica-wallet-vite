import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'axios'], // Divide librerías comunes en un archivo aparte
        },
      },
    },
  },
});
