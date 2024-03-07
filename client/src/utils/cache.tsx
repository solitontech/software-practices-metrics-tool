/* eslint-disable @typescript-eslint/no-explicit-any */

export function cacheWrapperForUnaryFunction<T>(
  func: (arg: any) => T,
): (arg: any) => T {
  const cache: Map<any, T> = new Map();

  return (arg: any): T => {
    if (cache.has(arg)) {
      return cache.get(arg)!;
    }

    const result = func(arg);
    cache.set(arg, result);

    return result;
  };
}
