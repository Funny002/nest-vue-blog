import { hashCode, hasType } from '@app/tools';
import { randomUUID } from 'crypto';

export function ranStr(long: number, radix?: number)
export function ranStr(long: number, replace?: () => string)
export function ranStr(long: number, options: any) {
  options = options || 26;
  let getStr: () => string = hasType(options, 'number') ? (): string => Math.random().toString(options).slice(2) : options;
  let target = getStr();
  for (let i = target.length; i < long; i = target.length) {
    target += getStr();
  }
  return target.slice(0, long);
}

export function ranString(c: 'x' | 'y' = 'x') {
  const time = Date.now() || performance.now();
  const random = (time + Math.random() * 16) % 16 | 0;
  return (c === 'x' ? random : (random & 0x3) | 0x8).toString(16);
}

export function UuidToNumber(uuid: string) {
  const target = hashCode(uuid.replace('-', ''));
  return target > 0 ? target : -target;
}

export function getUUID(parseInt?: boolean) {
  const uuid = randomUUID ? randomUUID() : 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, ranString);
  return parseInt ? UuidToNumber(uuid) : uuid;
}
