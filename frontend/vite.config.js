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
        target: 'https://crewctrl-29196d49230a.herokuapp.com',
        changeOrigin: true,
        secure: false,
        ws: true,
        configure: (proxy, _options) => {
          proxy.on('error', (err, _req, _res) => {
            console.log('proxy error', err);
          });
          proxy.on('proxyReq', (proxyReq, req, _res) => {
            console.log('Sending Request to the Target:', req.method, req.url);
          });
          proxy.on('proxyRes', (proxyRes, req, _res) => {
            console.log(
              'Received Response from the Target:',
              proxyRes.statusCode,
              req.url
            );
          });
        },
      },
    },
  },
});

// '/api': {
//           target: 'https://localhost:44305',
//           changeOrigin: true,
//           secure: false,
//           ws: true,
//           configure: (proxy, _options) => {
//             proxy.on('error', (err, _req, _res) => {
//               console.log('proxy error', err);
//             });
//             proxy.on('proxyReq', (proxyReq, req, _res) => {
//               console.log('Sending Request to the Target:', req.method, req.url);
//             });
//             proxy.on('proxyRes', (proxyRes, req, _res) => {
//               console.log('Received Response from the Target:', proxyRes.statusCode, req.url);
//             });
//           },
//         }

// 1)

// import { defineConfig } from 'vite';
// import react from '@vitejs/plugin-react';

// export default defineConfig({
//   plugins: [react()],
// });
