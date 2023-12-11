import { createRouter, createWebHistory } from 'vue-router';
import { routes } from './routes';

const router = createRouter({ history: createWebHistory(), routes });
function setDocTitle({ title = '', titleSuffix = '' }: any) {
  const conf = window.__CONFIG__;
  title = title || conf.title || '';
  titleSuffix = titleSuffix || conf.titleSuffix || '';
  const newTitle = `${title}${titleSuffix ? ' - ' + titleSuffix : ''}`;
  if (newTitle) document.title = newTitle;
}

router.beforeEach(async function (to, from, next) {
  setDocTitle(to.meta);
  next();
});

export default router;
