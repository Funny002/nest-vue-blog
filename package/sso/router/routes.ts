import { RouteRecordRaw } from 'vue-router';


export const routes: RouteRecordRaw [] = [
  {
    name: 'App',
    path: '/',
    redirect: '/home',
    component: () => import('@sso/layout/index.vue'),
    children: [
      { name: 'Home', path: 'home', component: () => import('@sso/views/Home/index.vue') },
    ],
  },
  {
    name: 'Sign',
    path: '/sign',
    redirect: '/sign/login',
    component: () => import('@sso/sign/index.vue'),
    children: [
      { name: 'Login', path: 'login', component: () => import('@sso/sign/login.vue') },
      { name: 'Register', path: 'register', component: () => import('@sso/sign/register.vue') },
    ],
  },
];
