import { getType, hasNull } from '@utils/verify';
import { emailReg } from '@utils/regexp';

interface RuleOptions {
  max?: number;
  min?: number;
  title?: string;
  regexp?: RegExp;
  pattern?: RegExp;
  required?: boolean;
}

type Callback = (error?: Error) => void

type  VerifyFunc = (rule: RuleOptions, value: any, callback: Callback) => void

type VerifyQueue = (...args: VerifyFunc[]) => VerifyFunc

export const verifyQueue: VerifyQueue = (...args) => {
  if (args.length) {
    return (rule, value, callback) => {
      args[0](rule, value, (error) => {
        if (error) return callback(error);
        verifyQueue(...args.slice(1))(rule, value, callback);
      });
    };
  }
  return verifyDefault;
};

export const verifyDefault: VerifyFunc = (rule, value, callback) => {
  const required = rule.required || false;
  if (required && hasNull(value)) return callback(new Error(`${rule.title || ''}不能为空`));
  //
  const reg = rule.regexp || rule.pattern;
  if (reg && !reg.test(value)) return callback(new Error(`${rule.title || ''}格式错误, ${reg.toString()}`));
  //
  const types = getType(value);
  if (['string', 'number'].includes(types)) {
    const state = types == 'string';
    const long = state ? value.length : value;
    if (rule.min && long < rule.min) return callback(new Error(`${rule.title || ''}小于${rule.min}${state ? '位' : ''}`));
    if (rule.max && long > rule.max) return callback(new Error(`${rule.title || ''}大于${rule.min}${state ? '位' : ''}`));
  }
  callback();
};
export const verifyEmail: VerifyFunc = (rule, value, callback) => {
  if (!emailReg.test(value)) return callback(new Error(`邮箱格式错误`));
  callback();
};

export default (...args: VerifyFunc[]) => verifyQueue(verifyDefault, ...args)