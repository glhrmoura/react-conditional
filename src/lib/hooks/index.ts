import { MatchWhen } from '@/lib/components/Switch';
import { isEmpty } from '@/lib/utils/is-empty';
import { includesValue } from '@/lib/utils/includes-value';
import { Comparable, compareValues } from '@/lib/utils/compare-values';

export function useShow(condition: boolean): boolean {
  return Boolean(condition);
}

export function useMatch<T>(
  value: T,
  when: MatchWhen<T>,
  or?: T | readonly T[]
): boolean {
  if (typeof when === 'function') {
    if ((when as (value: T) => boolean)(value)) return true;
  } else if (Array.isArray(when)) {
    if (when.some((item) => Object.is(value, item))) return true;
  } else if (Object.is(value, when)) {
    return true;
  }
  if (or === undefined) return false;
  const list = Array.isArray(or) ? or : [or];
  return list.some((item) => Object.is(value, item));
}

export function useExists(value: unknown): boolean {
  return value != null;
}

export function useEmpty(value: unknown): boolean {
  return isEmpty(value);
}

export function useIncludes<T>(value: T, list: readonly T[]): boolean {
  return includesValue(value, list);
}

export function useCompare(
  value: Comparable,
  options: {
    eq?: Comparable;
    ne?: Comparable;
    lt?: Comparable;
    lte?: Comparable;
    gt?: Comparable;
    gte?: Comparable;
  }
): boolean {
  const { eq, ne, lt, lte, gt, gte } = options;
  if (eq !== undefined && compareValues(value, eq) !== 0) return false;
  if (ne !== undefined && compareValues(value, ne) === 0) return false;
  if (lt !== undefined && compareValues(value, lt) >= 0) return false;
  if (lte !== undefined && compareValues(value, lte) > 0) return false;
  if (gt !== undefined && compareValues(value, gt) <= 0) return false;
  if (gte !== undefined && compareValues(value, gte) < 0) return false;
  return eq !== undefined || ne !== undefined || lt !== undefined || lte !== undefined || gt !== undefined || gte !== undefined;
}
