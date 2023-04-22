import { getType } from '@utils/object';

export function dateFormat(format = 'y-m-d', value: Date | string | number = new Date()) {
  const date = (getType(value) === 'Date' ? value : new Date(value)) as Date;
  return format.replace(/\w/g, function (val) {
    if (['y', 'Y'].includes(val)) {
      return date.getFullYear().toString().slice(val === 'y' ? 2 : 0);
    } else if (['m', 'M'].includes(val)) {
      return (date.getMonth() + 1).toString().padStart(val === 'M' ? 2 : 1, '0');
    } else if (['d', 'D'].includes(val)) {
      return date.getDate().toString().padStart(val === 'D' ? 2 : 1, '0');
    } else if (['h', 'H'].includes(val)) {
      return date.getHours().toString().padStart(val === 'H' ? 2 : 1, '0');
    } else if (['i', 'I'].includes(val)) {
      return date.getMinutes().toString().padStart(val === 'I' ? 2 : 1, '0');
    } else if (['s', 'S'].includes(val)) {
      return date.getSeconds().toString().padStart(val === 'S' ? 2 : 1, '0');
    } else if (val === 't') {
      return date.getMilliseconds().toString();
    }
    return val;
  });
}
