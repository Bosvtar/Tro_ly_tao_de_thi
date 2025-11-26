import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    // This polyfill prevents "process is not defined" errors in the browser
    // allowing the shared service code to work seamlessly.
    'process.env': {} 
  },
  server: {
    port: 3000,
    open: true
  }
});