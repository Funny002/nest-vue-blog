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
  }, {
    path: 'article',
    component: () => import(/* webpackChunkName: "admin" */ '@admin/Article/index.vue'),
  }, {
    path: 'users',
    component: () => import(/* webpackChunkName: "admin" */ '@admin/Users/index.vue'),
  }, {
    path: 'discuss',
    component: () => import(/* webpackChunkName: "admin" */ '@admin/Discuss/index.vue'),
  }, {
    path: 'image',
    component: () => import(/* webpackChunkName: "admin" */ '@admin/Image/index.vue'),
  }, {
    path: 'files',
    component: () => import(/* webpackChunkName: "admin" */ '@admin/Files/index.vue'),
  }, {
    path: 'types',
    component: () => import(/* webpackChunkName: "admin" */ '@admin/Types/index.vue'),
  }, {
    path: 'tage',
    component: () => import(/* webpackChunkName: "admin" */ '@admin/Tage/index.vue'),
  }, {
    path: 'setting',
    component: () => import(/* webpackChunkName: "admin" */ '@admin/Setting/index.vue'),
  }, {
    path: 'userInfo',
    component: () => import(/* webpackChunkName: "admin" */ '@admin/UserInfo/index.vue'),
  }],
}, {
  path: '/login',
  component: () => import(/* webpackChunkName: "layout" */ '@page/Login/index.vue'),
}, {
  path: '/:pathMatch(.*)',
  component: () => import(/* webpackChunkName: "error" */ '@layout/Error/index.vue'),
}];
