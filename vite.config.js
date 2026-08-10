import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// ─────────────────────────────────────────────────────────────
//  HOSTINGER BUILD CONFIGURATION
//  The site is hosted on Hostinger (custom domain at the root),
//  so we use absolute paths (base: '/') and clean URLs
//  (BrowserRouter + .htaccess rewrite — see public/.htaccess).
//
//  NOTE: this branch is NOT for GitHub Pages — for GitHub Pages
//  use the arena branch (base './' + HashRouter).
// ─────────────────────────────────────────────────────────────
export default defineConfig({
  plugins: [react()],
  base: '/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          motion: ['framer-motion'],
        },
      },
    },
  },
  server: {
    host: '0.0.0.0',
    port: 5173,
    allowedHosts: true,
  },
  preview: {
    host: '0.0.0.0',
    port: 4173,
  },
});
