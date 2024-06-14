import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': 'http://localhost:5000',
    },
  },
  build: {
    outDir: './dist',
    emptyOutDir: true,
    rollupOptions: {
      input: './frontend/src/main.jsx',
      external: [
        'react',
        'react-dom',
        'react-router-dom',
        'axios',
        'react-markdown',
        'react-toastify',
      ],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          'react-router-dom': 'ReactRouterDOM',
          axios: 'axios',
          'react-markdown': 'ReactMarkdown',
          'react-toastify': 'ReactToastify',
        },
      },
    },
    chunkSizeWarningLimit: 1000,
  },
});
