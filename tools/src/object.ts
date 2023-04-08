export const getType = (target: any): string => Object.prototype.toString.call(target).slice(8, -1).toLocaleLowerCase();

export const hasType = (target: any, ...types: string[]): boolean => types.map(v => v.toLocaleLowerCase()).includes(getType(target));

export function reWriteObj(target: { [key: string]: any }, array: string[]) {
  return array.reduce<{ [K in typeof array[number]]: any }>(function (value, keys: string) {
    if (keys in target) {
      value[keys] = target[keys];
    }
    return value;
  }, {});
}

export function mergeOptions<T = any>(option: T, ...options: any[]) {
  const result: any = option || {};
  for (const option of options) {
    if (typeof option === 'object' && option !== null) {
      for (const key of Object.keys(option)) {
        if (Array.isArray(option[key])) {
          result[key] = (result[key] || []).concat(option[key]);
        } else if (typeof option[key] === 'object' && option[key] !== null) {
          result[key] = mergeOptions(result[key] || {}, option[key]);
        } else {
          result[key] = option[key];
        }
      }
    }
  }
  return result;
}
