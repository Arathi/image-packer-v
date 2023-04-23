import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import monkey, { cdn } from 'vite-plugin-monkey';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 35423,
  },
  plugins: [
    vue(),
    monkey({
      entry: 'src/main.ts',
      userscript: {
        name: 'Image Packer V',
        icon: 'https://vitejs.dev/logo.svg',
        namespace: 'com.undsf.tmus.imgpk',
        author: "Arathi of Nebnizilla",
        match: [
          'https://telegra.ph/*'
        ],
      },
      build: {
        externalGlobals: {
          vue: cdn.jsdelivr('Vue', 'dist/vue.global.prod.js'),
          pinia: cdn.jsdelivr('Pinia', 'dist/pinia.iife.prod.js'),
        },
      },
    }),
  ],
});
