export function hasOverlap(target: any[], value: any[]) {
  let [start, end] = [target, value];
  if (start.length < end.length) {
    [start, end] = [end, start];
  }
  return end.some(v => start.includes(v));
}
