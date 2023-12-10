// import { createHash } from 'crypto';
//
// export * from './date';
// export * from './array';
// export * from './object';
// export * from './string';
// export * from './verify';
//
// export function runTime(func: () => void | Promise<void>, label = '运行时间'): void {
//   console.time(label);
//   const res = func();
//   if (res && res.finally) {
//     res.finally(() => console.timeEnd(label));
//   } else {
//     console.timeEnd(label);
//   }
// }
//
// export function md5(value) {
//   const md5 = createHash('md5');
//   md5.update(value);
//   return md5.digest('hex');
// }
//
// export function hashCode(str: string) {
//   if (str.length === 0) return 0;
//   let hash = 0;
//   for (let i = 0; i < str.length; i++) {
//     hash = (31 * hash + str.charCodeAt(i)) << 0;
//   }
//   return hash;
// }

export default {};
