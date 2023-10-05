// 防抖
export function document(func: any, timeout = 300) {
  let state: NodeJS.Timeout;
  return function (...args: any[]) {
    state && clearTimeout(state);
    state = setTimeout(() => func(...args), timeout);
  };
}

// 节流
export function throttle(func: any, timeout = 300, before?: (...args: any[]) => any[]) {
  let state: boolean = false;
  return function (...args: any[]) {
    if (state) return;
    state = true;
    setTimeout(() => state = false, timeout);
    args = (before && before(...args)) || args;
    func(...args);
  };
}
