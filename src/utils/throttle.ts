type Callback<X extends unknown[], Y> = (...args: X) => Y;
type ThrottledFunction<X extends unknown[]> = (...args: X) => void;

export function throttle<T extends unknown[], U>(
  callback: Callback<T, U>,
  interval: number
): ThrottledFunction<T> {
  let timerId: ReturnType<typeof setTimeout>;
  let isThrottlingInProgress: boolean = false;
  return function (this: unknown, ...args: T) {
    if (!isThrottlingInProgress) {
      callback.apply(this, args);
      isThrottlingInProgress = true;

      clearInterval(timerId);
      timerId = setTimeout(() => {
        isThrottlingInProgress = false;
      }, interval);
    }
  };
}
