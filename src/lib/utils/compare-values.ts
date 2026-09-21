export type Comparable = number | string | Date;

function normalize(value: Comparable): number | string {
  if (value instanceof Date) return value.getTime();
  return value;
}

export function compareValues(left: Comparable, right: Comparable): number {
  const a = normalize(left);
  const b = normalize(right);
  if (typeof a === 'string' || typeof b === 'string') {
    const as = String(a);
    const bs = String(b);
    return as < bs ? -1 : as > bs ? 1 : 0;
  }
  return a < b ? -1 : a > b ? 1 : 0;
}
