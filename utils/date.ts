import { getType } from './object';
import { Between } from 'typeorm';

// 获取一个月的天数
export function getDates(date: Date | string | number) {
  date = (getType(date) === 'Date' ? date : new Date(date)) as Date;
  return (new Date(date.getFullYear(), date.getMonth() + 1, -1)).getDate();
}

// 格式化日期
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

// 日期查询
export function BetweenDate(start?: Date | string | number, end?: Date | string | number) {
  return Between(dateFormat('Y-M-D 00:00:00', start), dateFormat('Y-M-D 23:59:59', end || start));
}

// 月份查询
export function BetweenMonth(start?: Date | string | number, end?: Date | string | number) {
  const startTime = dateFormat('Y-M-01 00:00:00', start);
  end = end ? dateFormat('Y-M-01 00:00:00', end) : startTime;
  return Between(startTime, dateFormat(`Y-M-${getDates(end)} 23:59:59`, end));
}

// 年份查询
export function BetweenYear(start?: Date | string | number, end?: Date | string | number) {
  const startTime = parseInt(dateFormat('Y', start));
  end = end ? parseInt(dateFormat('Y', end)) : startTime;
  return Between(new Date(startTime, 0, 1, 0, 0, 0), new Date(end + 1, 0, -1, 23, 59, 59));
}
