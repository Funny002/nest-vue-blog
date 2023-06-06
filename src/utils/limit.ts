export function document(func: any, timeout = 300) {
  let state: NodeJS.Timeout;
  return function (...args: any[]) {
    if (state) return;
    state = setTimeout(() => {
      // ...
    }, timeout);
    func(...args);
  };
}

export function throttle(func: any, timeout = 300, before?: (...args: any[]) => any) {
  let state: NodeJS.Timeout;
  return function (...args: any[]) {
    if (state) clearTimeout(state);
    args = before && (before(...args) || args); // 特殊调用方法
    state = setTimeout(() => func(args), timeout);
  };
}
