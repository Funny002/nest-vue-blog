import { RouteRecordRaw } from 'vue-router';


export const routes: RouteRecordRaw [] = [
  {
    name: 'App',
    path: '/',
    redirect: '/home',
    component: () => import('@sso/layout/index.vue'),
    children: [
      { name: 'Home', path: 'home', component: () => import('@sso/views/Menu/index.vue') },
    ],
  },
  {
    name: 'Sign',
    path: '/sign',
    redirect: '/sign/login',
    component: () => import('@sso/sign/index.vue'),
    children: [
      { name: '登录', path: 'login', component: () => import('@sso/sign/login.vue') },
      { name: '注册', path: 'register', component: () => import('@sso/sign/register.vue') },
    ],
  },
  { name: 'Error', path: '/:pathMatch(.*)*', component: () => import('@sso/error/index.vue') },
];
