export function runTime(func: () => void | Promise<void>, label = '运行时间'): void {
  console.time(label);
  const res = func();
  if (res && res.finally) {
    res.finally(() => console.timeEnd(label));
  } else {
    console.timeEnd(label);
  }
}
