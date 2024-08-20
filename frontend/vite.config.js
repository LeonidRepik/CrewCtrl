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
// import { defineConfig } from 'vite';
// import react from '@vitejs/plugin-react';

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
//   server: {
//     proxy: {
//       '/api': {
//         target: 'http://localhost:3000/api',
//         changeOrigin: true,
//         rewrite: (path) => path.replace(/^\/api/, ''),
//       },
//     },
//   },
// });
