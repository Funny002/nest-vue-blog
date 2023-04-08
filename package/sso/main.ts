import { createPinia } from 'pinia';
import router from '@sso/router';
import { createApp } from 'vue';
import App from '@/app.vue';

async function useRouter(app: App<Element>) {
  app.use(router);
  await router.isReady();
  return app;
}

useRouter(createApp(App).use(createPinia())).then(app => {
  app.mount('#app');
});
