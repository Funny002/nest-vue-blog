import { getType, hasType } from '@utils/verify';

type ObjectTypes = { [key: string | number]: any }

export const deepCopy = (value: ObjectTypes) => {
  const target: { [key: string]: any } = hasType(value, 'array') ? [] : {};
  Object.keys(value).forEach((keys): void => {
    const item = value[keys];
    if (['array', 'object'].includes(getType(item))) {
      target[keys] = deepCopy(item);
    } else {
      target[keys] = item;
    }
  });
  return target;
};

export const merge = (target: ObjectTypes, ...args: ObjectTypes[]) => {
  for (const item of args) {
    for (const keys of Object.keys(item)) {
      const [p1, p2] = [getType(target[keys]), getType(item[keys])];
      if (['array', 'object'].includes(p1) && p1 === p2) {
        target[keys] = merge(target[keys], item[keys]);
      } else {
        target[keys] = item[keys];
      }
    }
  }
  return target;
};

// target[key] not exist or item[__empty__] to true will set item to `{}`
// it will perform strangely, please make sure all types are the same
export const mergeConfig = (target: ObjectTypes, ...args: ObjectTypes[]) => {
  for (const item of args) {
    for (const key of Object.keys(item)) {
      if (!Object.prototype.hasOwnProperty.call(target, key)) {
        target[key] = item[key];
      } else if (item[key].__empty__) {
        target[key] = {};
      } else {
        const [p1, p2] = [getType(target[key]), getType(item[key])];
        if (p1 === p2 && p1 === 'object') {
          target[key] = mergeConfig(target[key], item[key]);
        } else {
          target[key] = item[key];
        }
      }
    }
  }
  return target;
};