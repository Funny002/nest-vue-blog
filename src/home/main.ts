import AppView from '../common/app.vue';
import { createPinia } from 'pinia';
import { BaseConfig } from '@utils';
import { createApp } from 'vue';
import router from './router';

async function bootstrap() {
  const app = createApp(AppView);
  app.use(createPinia());
  app.use(router);
  await router.isReady();
  app.mount('#app');
}

window.__CONFIG__ = new BaseConfig('后台管理', 'localhost', 8080);

bootstrap().then(async () => {
  console.log('bootstrap');
});
