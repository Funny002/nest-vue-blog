// import { FindOperator } from 'typeorm/find-options/FindOperator';
// import { getType, hasType } from './object';
// import { Between } from 'typeorm';
//
// export function dateFormat(format = 'y-m-d', value: Date | string | number = new Date()) {
//   const date = (getType(value) === 'Date' ? value : new Date(value)) as Date;
//   return format.replace(/\w/g, function(val) {
//     if (['y', 'Y'].includes(val)) {
//       return date.getFullYear().toString().slice(val === 'y' ? 2 : 0);
//     } else if (['m', 'M'].includes(val)) {
//       return (date.getMonth() + 1).toString().padStart(val === 'M' ? 2 : 1, '0');
//     } else if (['d', 'D'].includes(val)) {
//       return date.getDate().toString().padStart(val === 'D' ? 2 : 1, '0');
//     } else if (['h', 'H'].includes(val)) {
//       return date.getHours().toString().padStart(val === 'H' ? 2 : 1, '0');
//     } else if (['i', 'I'].includes(val)) {
//       return date.getMinutes().toString().padStart(val === 'I' ? 2 : 1, '0');
//     } else if (['s', 'S'].includes(val)) {
//       return date.getSeconds().toString().padStart(val === 'S' ? 2 : 1, '0');
//     } else if (val === 't') {
//       return date.getMilliseconds().toString();
//     }
//     return val;
//   });
// }
//
// export const handleParamsDate = (params: string | string[], format = 'Y-M-D H:I'): FindOperator<any> => {
//   const date: any = { start: params, end: params };
//
//   if (hasType(params, 'array')) {
//     [date.start, date.end] = params;
//   }
//
//   const a = new Date(date.end);
//
//   return Between(dateFormat(format, date.start), dateFormat(format, a.setDate(a.getDate() + 1)));
// };

export default {};
