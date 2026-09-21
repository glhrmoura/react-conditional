import React, { ReactNode } from 'react';
import { resolveChildren } from '@/lib/utils/resolve-children';

export interface EveryProps {
  cases: boolean[];
  children: ReactNode | (() => ReactNode);
  fallback?: ReactNode | (() => ReactNode);
}

const Every: React.FC<EveryProps> = ({ cases, children, fallback }) => {
  if (cases.every(Boolean)) {
    return <>{resolveChildren(children)}</>;
  }
  if (fallback !== undefined) {
    return <>{resolveChildren(fallback)}</>;
  }
  return null;
};

export { Every };
