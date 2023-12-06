import { MenuItem } from '@api/menu';
import { defineStore } from 'pinia';

function useSort(target: MenuItem[], route = '') {
  for (const item of target) {
    item['router'] = [route, item.keys].join('/').toLowerCase();
    if (item.children && item.children.length) {
      item.children = useSort(item.children, item['router']);
    }
  }
  return target.sort((a, b) => a.sort - b.sort);
}

function handlerTree(data: (MenuItem & { parent?: number })[]) {
  const target: any[] = [];
  const dataMap = data.reduce(function (value: { [k: string]: any }, item: any) {
    value[item.id] = item;
    return value;
  }, {});
  for (const item of data) {
    if (item.parent) {
      const parentItem = dataMap[item.parent];
      if (dataMap[item.parent]) {
        if (!parentItem.children) parentItem.children = [];
        parentItem.children.push(item);
      }
    } else {
      target.push(item);
    }
  }
  return useSort(target);
}

export const useMenuRouter = defineStore('menuRouter', {
  state: (): { list: MenuItem[]; hasRouter: boolean; tree: MenuItem[] } => ({ list: [], hasRouter: false, tree: [] }),
  getters: {
    has: ({ hasRouter }) => hasRouter,
    router: ({ tree }) => {
      function handlerRouter(list: any[]) {
        const data: any[] = [];
        for (const item of list) {
          const { keys, name, values: component, children, router } = item;
          const target = { path: keys.toLowerCase(), name: router, mate: { name }, component, children };
          if (children && children.length) {
            target.children = handlerRouter(children);
          }
          data.push(target);
        }
        return data;
      }

      return handlerRouter(tree);
    },
  },
  actions: {
    setHas(state: boolean) {
      this.hasRouter = state;
    },
    setRouter(router: MenuItem[]) {
      this.list = [...router.map(v => Object.assign({}, v))];
      this.tree = handlerTree(router);
    },
  },
});
