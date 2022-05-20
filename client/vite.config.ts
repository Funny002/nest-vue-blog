import { resolve } from 'path';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
import { parse } from 'path';
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    Components({
      dirs: ['src/components'],
      resolvers: [ElementPlusResolver({
        importStyle: 'sass',
        version: '2.2.0',
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
      '@router': resolve(__dirname + '/src/router'),
      '@scss': resolve(__dirname + '/src/assets/scss'),
      '@image': resolve(__dirname + '/src/assets/image'),
      '@components': resolve(__dirname + '/src/components'),
    },
  },
  build: {
    minify: false,
    sourcemap: 'hidden',
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            const name = id.toString().split('node_modules/')[1].split('/')[0];
            if (['@vue', 'vue', 'vue-demi'].includes(name)) return 'vue';
            if ('sanitize.css' === name) return 'sanitize';
            return name;
          } else if (id.includes('scss')) {
            const pathList = id.toString().split('scss/')[1].split('/');
            const name = pathList[pathList.length - 1].split('?')[0];
            if (name === 'bootstrap-icons.css') return 'bootstrap-icons';
            console.log('manualChunks ->> [%s]', pathList.join(', '));
          } else if (id.includes('src/utils/')) {
            return 'utils';
          }
        },
        entryFileNames: '[name].[hash].js',
        chunkFileNames({facadeModuleId}) {
          console.log('chunkFileNames ->>', facadeModuleId);
          if (facadeModuleId !== null) {
            const [_, model, name] = facadeModuleId.substring(facadeModuleId.indexOf('src') + 4).match(/^(\w+)\/(\w+)/);
            return `view/${model.toLocaleLowerCase()}/${name.toLocaleLowerCase()}.[hash].js`;
          } else {
            return 'modules/[name].[hash].js';
          }
        },
        assetFileNames({name}) {
          const info = parse(name);
          const fonts = ['.woff', '.woff2'];
          if (fonts.includes(info.ext)) {
            return 'assets/fonts/[name].[hash].[ext]';
          }
          const image = ['.jpg', '.png', '.webm', '.gif'];
          if (image.includes(info.ext)) {
            return 'assets/image/[name].[hash].[ext]';
          }
          return 'assets/[name].[hash].[ext]';
        },
      },
    },
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
  },
});
