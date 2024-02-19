import { RouteRecordRaw } from 'vue-router';

export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'App',
    redirect: '/home',
    children: [
      { name: 'Home', path: 'home', component: () => import('@home/views/Home/index.vue') },
      { name: 'Article', path: 'article', component: () => import('@home/views/Article/index.vue') },
    ],
  },
];
