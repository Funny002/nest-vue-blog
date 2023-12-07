import { RouteRecordRaw } from 'vue-router';


const Article: RouteRecordRaw [] = [
  { name: 'ArticleList', path: 'list', component: () => import('@admin/views/Article/index.vue') },
];

const Comments: RouteRecordRaw [] = [
  { name: 'CommentsList', path: 'list', component: () => import('@admin/views/Comments/index.vue') },
];

const Users: RouteRecordRaw [] = [
  { name: 'UsersList', path: 'list', component: () => import('@admin/views/Users/index.vue') },
];

const Files: RouteRecordRaw [] = [
  { name: 'FilesList', path: 'list', component: () => import('@admin/views/Files/index.vue') },
];

const Logger: RouteRecordRaw [] = [
  { name: 'LoggerList', path: 'list', component: () => import('@admin/views/Logger/index.vue') },
];

export const routes: RouteRecordRaw [] = [{
  name: 'App',
  path: '/',
  redirect: '/home',
  component: () => import('@admin/layout/index.vue'),
  children: [
    { name: 'Home', path: 'home', component: () => import('@admin/views/Home/index.vue') },
    { name: 'Article', path: 'article', redirect: '/article/list', children: Article },
    { name: 'Comments', path: 'comments', redirect: '/comments/list', children: Comments },
    { name: 'Users', path: 'users', redirect: '/users/list', children: Users },
    { name: 'Files', path: 'files', redirect: '/files/list', children: Files },
    { name: 'Logger', path: 'logger', redirect: '/logger/list', children: Logger },
    { name: 'Error', path: ':pathMatch(.*)*', component: () => import('@admin/error/index.vue') },
  ],
}, {
  name: 'Sign',
  path: '/sign',
  redirect: '/sign/login',
  component: () => import('@admin/sign/index.vue'),
  children: [
    { name: '/sign/login', path: 'login', meta: { name: '登录' }, component: () => import('@admin/sign/login.vue') },
    { name: '/sign/register', path: 'register', meta: { name: '注册' }, component: () => import('@admin/sign/register.vue') },
  ],
}];
