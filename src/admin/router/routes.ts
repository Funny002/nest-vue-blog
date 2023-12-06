import { RouteRecordRaw } from 'vue-router';

export const routes: RouteRecordRaw [] = [{
  name: 'App',
  path: '/',
  redirect: '/home',
  component: () => import('@admin/layout/index.vue'),
  children: [
    { name: 'Home', path: 'home', component: () => import('@admin/views/Home/index.vue') },
  ],
}, {
  name: 'Sign',
  path: '/sign',
  redirect: '/sign/login',
  component: () => import('@admin/views/Sign/index.vue'),
  children: [
    { name: '/sign/login', path: 'login', meta: { name: '登录' }, component: () => import('@admin/views/sign/login.vue') },
    { name: '/sign/register', path: 'register', meta: { name: '注册' }, component: () => import('@admin/views/sign/register.vue') },
  ],
}, { name: 'Error', path: '/:pathMatch(.*)*', component: () => import('@admin/views/Error/index.vue') }];
