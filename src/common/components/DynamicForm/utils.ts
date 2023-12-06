import { hasType } from '@utils/object';

export interface RuleOptions {
  gt?: number; // 数
  lt?: number; // 数
  eq?: number; // 位
  min?: number; // 位
  max?: number; // 位
  name?: string;
  required?: boolean;
}

export type HandleVerify = (rule: RuleOptions, value: any, callback: (args?: Error) => void) => void

export const BaseVerify = <HandleVerify>function (rule, value, callback) {
  if (rule.required && ['', null, undefined].includes(value)) return callback(new Error(`${ rule.name || '' }不能为空`));
  if (hasType(value, 'string', 'number')) {
    // 位
    const val_str = value.toString();
    const long = val_str.length;
    if (rule.max && long > rule.max) return callback(new Error(`${ rule.name || '' }不能大于${ rule.max }位`));
    if (rule.min && long < rule.min) return callback(new Error(`${ rule.name || '' }不能小于${ rule.min }位`));
    if (rule.eq && long !== rule.eq) return callback(new Error(`${ rule.name || '' }不能${ rule.eq < long ? '大' : '小' }于${ rule.eq }位`));
    // 数
    const val_num = parseFloat(val_str);
    if (rule.gt && val_num < rule.gt) return callback(new Error(`${ rule.name || '' }不能小于${ rule.gt }`));
    if (rule.lt && val_num > rule.lt) return callback(new Error(`${ rule.name || '' }不能大于${ rule.lt }`));
  }
  return callback();
};

export function useVerify(...args: HandleVerify[]) {
  return <HandleVerify>async function (rule, value, callback) {
    for (const key in args) {
      const handler = args[key];
      const err = await (new Promise<undefined | Error>(success => handler(rule, value, success)));
      if (err) return callback(err);
    }
    return callback();
  };
}

export default function verify(...args: HandleVerify[]) {
  return useVerify(BaseVerify, ...args);
}
