import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // server: {
  //   proxy: {
  //     // Redirige todas las solicitudes al backend
  //     '/': {
  //       target: import.meta.env.VITE_API_URL,
  //       changeOrigin: true,
  //     },
  //   },
  // },
});
