import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': 'http://localhost:5000',
    },
  },
  rollupOptions: {
      input: './frontend/src/main.jsx', 
    },
  build: {
    outDir: './dist',
    emptyOutDir: true,
    
  },
});
