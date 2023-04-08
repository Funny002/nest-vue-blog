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

export function throttle(func: any, timeout = 300) {
  let state: NodeJS.Timeout;
  return function (...args: any[]) {
    if (state) clearTimeout(state);
    state = setTimeout(() => func(...args), timeout);
  };
}
