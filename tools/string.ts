export function ranStr(long = 1, radix = 26) {
  if (long < 1) throw new Error('long lat 1');
  const getStr = (): string => Math.random().toString(radix).slice(2);
  let target = getStr();
  for (let i = target.length; i < long; i = target.length) {
    target += getStr();
  }
  return target.slice(0, long);
}
