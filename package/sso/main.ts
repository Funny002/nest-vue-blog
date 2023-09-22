import { App, createApp } from 'vue';
import { createPinia } from 'pinia';
import router from '@sso/router';
import AppView from '@/app.vue';

async function useRouter(app: App<Element>) {
  app.use(router);
  await router.isReady();
  return app;
}

useRouter(createApp(AppView).use(createPinia())).then(app => {
  app.mount('#app');
});
