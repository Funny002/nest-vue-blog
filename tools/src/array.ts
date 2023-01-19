export function unique(...args: any[]): any[] {
  return [].concat(...args).reduce(function (val, item) {
    if (!val.includes(item)) {
      return [...val, item];
    }
    return val;
  }, []);
}

export function hasOverlap(target: any[], value: any[]) {
  let [start, end] = [unique(target), unique(value)];
  if (start.length < end.length) {
    [start, end] = [end, start];
  }
  return end.some(v => start.includes(v));
}

export function non_overlap(target: any[], value: any[]) {
  return unique(target).reduce(function (val, item) {
    if (!value.includes(item)) {
      return [...val, item];
    }
    return val;
  }, []);
}

export function overlap(target: any[], value: any[]) {
  return unique(target).reduce(function (val, item) {
    if (value.includes(item)) {
      return [...val, item];
    }
    return val;
  }, []);
}
