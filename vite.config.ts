import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { visualizer } from 'rollup-plugin-visualizer';
import { apiPlugin } from './plugins/apiPlugin';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    apiPlugin(),
    // 只在本地开发时启用 visualizer
    ...(process.env.NODE_ENV !== 'production' ? [
      visualizer({
        open: false,
        gzipSize: true,
        brotliSize: true,
        filename: 'stats.html',
      }),
    ] : []),
  ],
  base: '/pick-bot-name/', // GitHub Pages 路径
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
    chunkSizeWarningLimit: 1000,
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'ui-vendor': ['framer-motion'],
          'avatar': [
            '@dicebear/core',
            '@dicebear/bottts',
            '@dicebear/bottts-neutral',
            '@dicebear/fun-emoji',
            '@dicebear/avataaars',
            '@dicebear/identicon',
            '@dicebear/toon-head',
            '@dicebear/lorelei',
            '@dicebear/notionists'
          ],
          'i18n': ['i18next', 'react-i18next'],
          'state': ['zustand'],
        },
      },
    },
  },
  server: {
    port: 3000,
    open: true,
  },
});
