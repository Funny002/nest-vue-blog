import { createRouter, createWebHistory } from 'vue-router';
import { routes } from './routes';
import { useUsers } from '@stores/user';

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async function (to, from, next) {
  if (to.path.indexOf('/sign') !== 0) {
    const user = useUsers();
    if (!user.token) return next({ path: '/sign' });
  }
  next();
});

export default router;