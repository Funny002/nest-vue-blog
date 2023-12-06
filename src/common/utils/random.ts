export function randomStr(long: number, radix = 26): string {
  let str = Math.random().toString(radix).slice(2);
  for (let i = str.length; i < long; i = str.length) {
    str += Math.random().toString(radix).slice(2);
  }
  return str.slice(0, long);
}
