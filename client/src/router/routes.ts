import { RouteRecordRaw } from 'vue-router';

export const routes: RouteRecordRaw[] = [{
  path: '/',
  redirect: '/home',
  component: () => import(/* webpackChunkName: "layout" */ '@layout/index.vue'),
  children: [{
    path: 'home',
    component: () => import(/* webpackChunkName: "home" */ '@page/Home/index.vue'),
  }, {
    path: 'article/:id',
    component: () => import(/* webpackChunkName: "article"*/ '@page/Article/index.vue'),
  }],
}, {
  path: '/admin',
  redirect: '/admin/home',
  component: () => import(/* webpackChunkName: "layout" */ '@layout/admin/index.vue'),
  children: [{
    path: 'home',
    component: () => import(/* webpackChunkName: "admin" */ '@admin/Home/index.vue'),
  }],
}, {
  path: '/login',
  component: () => import(/* webpackChunkName: "layout" */ '@page/Login/index.vue'),
}, {
  path: '/:pathMatch(.*)',
  component: () => import(/* webpackChunkName: "error" */ '@page/Error/404.vue'),
}];
