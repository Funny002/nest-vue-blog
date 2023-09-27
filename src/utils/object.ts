export const getType = (value: any, locale: boolean | 'upper' | 'lower' = false): string => {
  const type = Object.prototype.toString.call(value).slice(8, -1);
  if (locale) {
    if (locale === 'upper') {
      return type.toLocaleUpperCase();
    }
    return type.toLocaleLowerCase();
  }
  return type;
};

export const hasType = (value: any, ...args: string[]): boolean => {
  const type = getType(value, true);
  return args.map(v => v.toLocaleLowerCase()).includes(type);
};

export function rewriteObj(target: { [k: string]: any }, array: string[]) {
  return array.reduce(function (value: { [k: string]: any }, keys: string) {
    if (keys in target) value[keys] = target[keys];
    return value;
  }, {});
}

export function listToTree(target: any[], key = 'id', parent = 'parent') {
  const roots: any[] = [];
  const map = target.reduce(function (value: { [k: string]: any }, item: any) {
    value[item[key]] = item;
    return value;
  }, {});
  for (const item of target) {
    if (item[parent]) {
      const parentItem = map[item[parent]];
      if (!parentItem.children) parentItem.children = [];
      parentItem.children.push(item);
    } else {
      roots.push(item);
    }
  }
  return roots;
}
