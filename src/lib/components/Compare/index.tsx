import React, { ReactNode } from 'react';
import { Comparable, compareValues } from '@/lib/utils/compare-values';
import { renderResolved } from '@/lib/utils/render-resolved';

export interface CompareProps {
  value: Comparable;
  eq?: Comparable;
  ne?: Comparable;
  lt?: Comparable;
  lte?: Comparable;
  gt?: Comparable;
  gte?: Comparable;
  children: ReactNode | (() => ReactNode);
  fallback?: ReactNode | (() => ReactNode);
  asChild?: boolean;
}

function matchesCompare(props: CompareProps): boolean {
  const { value, eq, ne, lt, lte, gt, gte } = props;
  if (eq !== undefined && compareValues(value, eq) !== 0) return false;
  if (ne !== undefined && compareValues(value, ne) === 0) return false;
  if (lt !== undefined && compareValues(value, lt) >= 0) return false;
  if (lte !== undefined && compareValues(value, lte) > 0) return false;
  if (gt !== undefined && compareValues(value, gt) <= 0) return false;
  if (gte !== undefined && compareValues(value, gte) < 0) return false;
  return eq !== undefined || ne !== undefined || lt !== undefined || lte !== undefined || gt !== undefined || gte !== undefined;
}

const Compare: React.FC<CompareProps> = (props) => {
  const { children, fallback, asChild } = props;
  if (matchesCompare(props)) {
    return <>{renderResolved(children, asChild)}</>;
  }
  if (fallback !== undefined) {
    return <>{renderResolved(fallback, asChild)}</>;
  }
  return null;
};

export { Compare };
