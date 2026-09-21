export function includesValue<T>(value: T, list: readonly T[]): boolean {
  return list.some((item) => Object.is(value, item));
}
