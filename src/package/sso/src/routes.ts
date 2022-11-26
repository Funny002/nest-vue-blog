import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import { useUserStores } from '@stores/sso/User';

const routes: RouteRecordRaw[] = [
  { path: '/', component: () => import('@sso/Home/index.vue') },
  {
    path: '/sign',
    redirect: '/sign/login',
    component: () => import('@sso/Login/index.vue'),
    children: [
      { path: 'login', component: () => import('@sso/Login/login.vue') },
      { path: 'register', component: () => import('@sso/Login/register.vue') },
    ],
  },
];

const router = createRouter({
  routes,
  history: createWebHistory(),
  scrollBehavior: () => ({ top: 0 }),
});

const skipList: string[] = ['/login'];

router.beforeEach((to, from, next) => {
  if (skipList.includes(to.path) || useUserStores().userInfo) {
    next();
  } else {
    next({ path: '/sign', replace: true });
  }
});

export default router;
