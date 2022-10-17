import { useRouter } from '@plugin/router';
import { createApp } from 'vue';
import routes from './routes';
import App from './App.vue';

createApp(App).use(useRouter(routes)).mount('#app');
