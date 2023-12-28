/* 随机字符 */
export function ranStr(c: 'x' | 'y' = 'x', radix = 16) {
  const time = Date.now() || performance.now();
  const random = (time + Math.random() * radix) % radix | 0;
  return (c === 'x' ? random : (random & 0x3) | 0x8).toString(radix);
}

/* 随机字符串 */
export function ranString(long: number, options: any = 26) {
  let getStr: () => string = typeof options === 'number' ? (): string => Math.random().toString(options).slice(2) : options;
  let target = getStr();
  for (let i = target.length; i < long; i = target.length) {
    target += getStr();
  }
  return target.slice(0, long);
}
