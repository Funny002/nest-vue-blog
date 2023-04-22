import { createRouter, createWebHistory } from 'vue-router';
import { defineAsyncComponent } from 'vue';

interface RouteOptions {
  name: string;
  path: string;
  params?: any;
  value: string;
}

function handleRoute(route: RouteOptions, tag: string) {
  const { name, path, params, value } = route;
  return { name, path, params, component: defineAsyncComponent(() => import(`@${tag}/${value}`)) };
}


export function useRouter(list: RouteOptions[], tag: string) {
  const routers = list.map(v => handleRoute(v, tag));

  const target = createRouter({
    history: createWebHistory(),
    routes: [],
  });

  for (const router of routers) {
    target.addRoute(router);
  }

  target.beforeEach(async function (to, from, next) {
    next();
  });

  return target;
}
