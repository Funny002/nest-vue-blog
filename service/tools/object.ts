export const getType = (target: any): string => Object.prototype.toString.call(target).slice(8, -1).toLocaleLowerCase();

export const hasType = (target: any, ...types: string[]): boolean => types.map(v => v.toLocaleLowerCase()).includes(getType(target));
