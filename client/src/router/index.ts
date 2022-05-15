import { createRouter, createWebHistory } from 'vue-router';
// import { useUserStore } from '@store/userStore';
import { routes } from './routes';


const router = createRouter({
  history: createWebHistory(),
  scrollBehavior: (to, from, savedPosition) => {
    if (to.hash) {
      return {el: to.hash, behavior: 'smooth'};
    } else if (savedPosition) {
      return savedPosition;
    } else {
      return {top: 0};
    }
  },
  routes,
});

router.beforeEach((to, from, next) => {
  // const userStore = useUserStore();
  // console.log(userStore);
  next();
});

export default router;