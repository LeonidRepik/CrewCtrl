import { defineConfig } from 'vite';

export default defineConfig({
  root: './', // Set the root to the current directory (frontend)
  build: {
    outDir: '../dist', // Output directory relative to the root
    rollupOptions: {
      input: {
        main: './index.html', // Entry file relative to the root directory
      },
    },
  },
});
