// import { defineConfig } from 'vite';

// export default defineConfig({
//   root: './', // Set the root to the current directory (frontend)
//   build: {
//     outDir: '../dist', // Output directory relative to the root
//     rollupOptions: {
//       input: {
//         main: './index.html', // Entry file relative to the root directory
//       },
//     },
//   },
// });
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://crewctrl-29196d49230a.herokuapp.com/api',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
});
// import { defineConfig } from 'vite';
// import react from '@vitejs/plugin-react';

// export default defineConfig({
//   plugins: [react()],
// });
