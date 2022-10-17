import { createRouter, createWebHistory, RouteRecordRaw, NavigationGuardWithThis } from 'vue-router';

export function useRouter(routes: RouteRecordRaw[], beforeEach?: NavigationGuardWithThis<undefined>) {
  const router = createRouter({ routes, history: createWebHistory(), scrollBehavior: () => ({ top: 0 }) });
  // 是否添加路由守卫
  if (beforeEach) router.beforeEach(beforeEach);
  return router;
}
