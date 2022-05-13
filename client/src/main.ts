import { createPinia } from 'pinia';
import { createApp } from 'vue';
import Router from './router';
import App from './App.vue';
import '@scss/__base.scss';

/**
 * =============================================================================
 * 样式一致性
 * =============================================================================
 */
import 'sanitize.css/forms.css';
import 'sanitize.css/sanitize.css';
import 'sanitize.css/typography.css';

createApp(App).use(Router).use(createPinia()).mount('#app');
