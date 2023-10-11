import { createRouter, createWebHistory } from 'vue-router';
import { useMenuRouter } from '@stores/router';
import { ApiMenuRouter } from '@sso/api/menu';
import { ApiHasToken } from '@sso/api/sign';
import { ElMessage } from 'element-plus';
import { useUsers } from '@stores/user';
import { routes } from './routes';

const modules = import.meta.glob('../views/**/**.*');
const loadView = (path: string) => modules[`../views${ path }`];
const router = createRouter({ history: createWebHistory(), routes });

function handlerRouter(target: any[]) {
  for (const item of target) {
    if (item.component) item.component = loadView(item.component);
    if (item.children && item.children.length) handlerRouter(item.children);
  }
  return target;
}

async function useMenuRouterFunc(to: any, next: any) {
  const menuRouter = useMenuRouter();
  if (!menuRouter.has) {
    const { data: res } = await ApiMenuRouter();
    if (res.code !== 0) {
      ElMessage.error(res.message);
      next({ path: '/error' });
      return true;
    }
    menuRouter.setRouter(res.data);
    // ==========================================================
    if (menuRouter.router.length) {
      router.addRoute({
        path: '/',
        name: 'App',
        component: () => import('@sso/layout/index.vue'),
        children: handlerRouter(menuRouter.router).concat(routes[2]),
      });
      next({ path: to.path, replace: true });
      menuRouter.setHas(true);
      return true;
    }
  }
  return false;
}

router.beforeEach(async function (to, from, next) {
  const tags = (to.query.tags as string | undefined) || 'sso';
  const users = useUsers();

  if (to.path.indexOf('/sign') !== 0) {
    // 令牌不存在
    if (!users.accessToken) return next({ path: '/sign' });
    // 令牌为验证
    if (!users.has()) {
      const { data: res } = (await ApiHasToken(tags, users.accessToken));
      users.setHas(res.data);
      if (!res.data) {
        ElMessage.warning('请重新登录。');
        return next({ path: '/sign' });
      }
    }
    // 添加路由
    if (await useMenuRouterFunc(to, next)) return;
  }

  // 重定向
  if (users.accessToken && users.has()) {
    const redirect = (to.query.redirect as undefined | string) || window.location.origin;
    if (redirect !== window.location.origin) {
      const url = new URL(redirect);
      url.searchParams.append('token', users.accessToken);
      window.location.href = url.toString();
    }
  }

  next();
});

export default router;
