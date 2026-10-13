import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Construit le héros 3D dans ../assets/hero/ (fichiers servis tels quels par Netlify).
export default defineConfig({
  plugins: [react()],
  base: './',
  build: {
    outDir: '../assets/hero',
    emptyOutDir: true,
    target: 'es2019',
    rollupOptions: {
      input: 'src/main.js',
      output: {
        entryFileNames: 'hero.js',
        chunkFileNames: 'fx-[hash].js',
        assetFileNames: '[name]-[hash][extname]',
      },
    },
  },
});
