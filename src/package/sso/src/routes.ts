import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import { useUserStores } from '@stores/sso/User';

const routes: RouteRecordRaw[] = [
  { path: '/', component: () => import('../Home/index.vue') },
  { path: '/login', component: () => import('../Login/index.vue') },
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
    next({ path: '/login', replace: true });
  }
});

export default router;
