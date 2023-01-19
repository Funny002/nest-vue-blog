export const getType = (target: any): string => Object.prototype.toString.call(target).slice(8, -1).toLocaleLowerCase();

export const hasType = (target: any, ...types: string[]): boolean => types.map(v => v.toLocaleLowerCase()).includes(getType(target));

export function reWriteObj(target: { [key: string]: any }, array: string[]) {
  return array.reduce<{ [K in typeof array[number]]: any }>(function(value, keys: string) {
    if (keys in target) {
      value[keys] = target[keys];
    }
    return value;
  }, {});
}
