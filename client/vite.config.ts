import { resolve } from 'path';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    Components({
      dirs: ['src/components'],
      resolvers: [ElementPlusResolver({
        importStyle: 'sass',
        version: '2.1.11',
      })],
    }),
  ],
  resolve: {
    alias: {
      '@api': resolve(__dirname + '/src/api'),
      '@page': resolve(__dirname + '/src/page'),
      '@store': resolve(__dirname + '/src/store'),
      '@admin': resolve(__dirname + '/src/admin'),
      '@utils': resolve(__dirname + '/src/utils'),
      '@layout': resolve(__dirname + '/src/Layout'),
      '@scss': resolve(__dirname + '/src/assets/scss'),
      '@image': resolve(__dirname + '/src/assets/image'),
    },
  },
});
