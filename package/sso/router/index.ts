import { createRouter, createWebHistory } from 'vue-router';
import { ElMessage } from 'element-plus';
import { useUsers } from '@stores/user';
import { ApiHasToken } from '@api/sign';
import { routes } from './routes';

const router = createRouter({ history: createWebHistory(), routes });

let hasLogin = false;

router.beforeEach(async function (to, from, next) {
  const tags = (to.query.tags as string | undefined) || 'sso';
  const token = useUsers().accessToken;
  const path = to.path;
  let res;

  if (!hasLogin && token) {
    res = (await ApiHasToken(tags, token)).data;
    hasLogin = res.data;
  }

  if (path.indexOf('/sign') !== 0) {
    if (!token) return next({ path: '/sign' });
    if (!res.data) {
      ElMessage.error(res.msg);
      return next({ path: '/sign' });
    }
  } else if (token) {
    const redirect = (to.query.redirect as undefined | string) || window.location.origin;
    if (redirect !== window.location.origin && hasLogin) {
      //
      const url = new URL(redirect);
      url.searchParams.append('token', token);
      window.location.href = url.toString();
    }
  }

  next();
});

export default router;
