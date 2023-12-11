import { RouteRecordRaw } from 'vue-router';

export const routes: RouteRecordRaw[] = [
  { name: 'Home', path: '/', component: () => import('@home/views/Home/index.vue') },
];
