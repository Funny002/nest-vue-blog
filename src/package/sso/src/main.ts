import { createPinia } from 'pinia';
import { createApp } from 'vue';
import router from './routes';
import App from './App.vue';

createApp(App).use(router).use(createPinia()).mount(document.body);
