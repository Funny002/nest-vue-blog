export function getType(target: any) {
  return Object.prototype.toString.call(target).slice(8, -1).toLocaleLowerCase();
}

export function hasType(target: any, ...types: string[]) {
  return types.includes(getType(target));
}

export function hasNull(target: any) {
  const type = getType(target);
  if (type === 'number') return isNaN(target) || target === Infinity || target === -Infinity;
  if (type === 'object') return Object.keys(target).length === 0;
  if (type === 'array') return target.length === 0;
  if (type === 'boolean') return false;
  return !target;
}
