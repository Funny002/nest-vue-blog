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
      '@': resolve(__dirname, './src'),
      '@utils': resolve(__dirname, './src/utils'),
      '@stores': resolve(__dirname, './src/stores'),
      '@plugin': resolve(__dirname, './src/plugin'),
      '@scss': resolve(__dirname, './src/assets/scss'),
      '@models': resolve(__dirname, './src/components'),
      '@directive': resolve(__dirname, './src/directive'),
      // client
      '@sso': resolve(__dirname, './package/sso'),
    },
  },
  server: { host: 'localhost', port: 6412, open: true },
  build: {
    target: 'esnext',
    sourcemap: false,
    minify: 'esbuild',
    reportCompressedSize: true,
    outDir: resolve(__dirname, './dist'),
    rollupOptions: {
      input: {
        sso: resolve(__dirname, './package/sso/index.html'),
      },
      output: {
        chunkFileNames: 'js/[name].[hash].js',
        entryFileNames: 'js/[name].[hash].js',
        assetFileNames: '[ext]/[name].[hash].[ext]',
      },
    },
  },
});
