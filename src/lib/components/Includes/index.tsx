import React, { ReactNode } from 'react';
import { includesValue } from '@/lib/utils/includes-value';
import { renderResolved } from '@/lib/utils/render-resolved';

export interface IncludesProps<T = unknown> {
  value: T;
  list: readonly T[];
  children: ReactNode | (() => ReactNode);
  fallback?: ReactNode | (() => ReactNode);
  asChild?: boolean;
}

function Includes<T = unknown>({
  value,
  list,
  children,
  fallback,
  asChild,
}: IncludesProps<T>): React.ReactElement | null {
  if (includesValue(value, list)) {
    return <>{renderResolved(children, asChild)}</>;
  }
  if (fallback !== undefined) {
    return <>{renderResolved(fallback, asChild)}</>;
  }
  return null;
}

export { Includes };
