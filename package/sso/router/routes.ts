import { RouteRecordRaw } from 'vue-router';

export const routes: RouteRecordRaw [] = [
  // { name: 'App', path: '/', component: () => import('') },
  {
    name: 'Sign',
    path: '/sign',
    redirect: '/sign/login',
    component: () => import('@sso/Sign/index.vue'),
    children: [
      { name: 'Login', path: 'login', component: () => import('@sso/Sign/login.vue') },
      { name: 'Register', path: 'register', component: () => import('@sso/Sign/register.vue') },
    ],
  },
];
