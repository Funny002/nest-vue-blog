import { MenuItem } from '@api/menu';
import { defineStore } from 'pinia';

function useSort(target: MenuItem[]) {
  for (const item of target) {
    if (item.children && item.children.length) {
      item.children = useSort(item.children);
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
  state: (): { list: MenuItem[]; hasRouter: boolean; } => ({ list: [], hasRouter: false }),
  getters: {
    has: ({ hasRouter }) => hasRouter,
    tree: ({ list }) => handlerTree(list),
    router: ({ list }) => {
      function handlerRouter(list: any[]) {
        const data: any[] = [];
        for (const item of list) {
          const { keys, name, values: component, children } = item;
          const target = { path: keys.toLowerCase(), name: keys, mate: { name }, component, children };
          if (children && children.length) {
            target.children = handlerRouter(children);
          }
          data.push(target);
        }
        return data;
      }

      return handlerRouter(handlerTree(list));
    },
  },
  actions: {
    setHas(state: boolean) {
      this.hasRouter = state;
    },
    setRouter(router: MenuItem[]) {
      this.list = router;
    },
  },
});
