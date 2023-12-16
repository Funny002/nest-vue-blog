import { emailReg, phoneReg } from './reg';

/* 数字 */
export function handlerNumber(value: string) {
  return isNaN(Number(value)) ? undefined : Number(value);
}

/* 邮箱 */
export function handlerEmail(value: string) {
  return emailReg.test(value) ? value : undefined;
}

/* 手机 */
function isPhone(value: string) {
  return phoneReg.test(value) ? value : undefined;
}

export * from './reg';