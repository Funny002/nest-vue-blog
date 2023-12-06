import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
import Components from 'unplugin-vue-components/vite';
import AutoImport from 'unplugin-auto-import/vite';
import vue from '@vitejs/plugin-vue';
import { defineConfig } from 'vite';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],
  base: './',
  clearScreen: false,
  json: { stringify: true },
  css: { devSourcemap: true },
  cacheDir: resolve(__dirname, '.cache'),
  publicDir: resolve(__dirname, './public'),
  resolve: {
    alias: {
      // app
      '@admin': resolve(__dirname, 'src/admin'),
      // common
      '@utils': resolve(__dirname, 'src/common/utils'),
      '@stores': resolve(__dirname, 'src/common/stores'),
      '@plugins': resolve(__dirname, 'src/common/plugins'),
      '@layouts': resolve(__dirname, 'src/common/layouts'),
      '@models': resolve(__dirname, 'src/common/components'),
      '@directives': resolve(__dirname, 'src/common/directives'),
    },
  },
  build: {
    target: 'esnext',
    sourcemap: false,
    minify: 'esbuild',
    reportCompressedSize: true,
    outDir: resolve(__dirname, './dist'),
    rollupOptions: {
      input: {
        admin: resolve(__dirname, './src/admin/index.html'),
      },
      output: {
        chunkFileNames: 'js/[name].[hash].js',
        entryFileNames: 'js/[name].[hash].js',
        assetFileNames: '[ext]/[name].[hash].[ext]',
      },
    },
  },
});
