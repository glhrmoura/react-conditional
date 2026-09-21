import React, { ReactNode } from 'react';
import { resolveChildren } from '@/lib/utils/resolve-children';

export interface SomeProps {
  cases: boolean[];
  children: ReactNode | (() => ReactNode);
  fallback?: ReactNode | (() => ReactNode);
}

const Some: React.FC<SomeProps> = ({ cases, children, fallback }) => {
  if (cases.some(Boolean)) {
    return <>{resolveChildren(children)}</>;
  }
  if (fallback !== undefined) {
    return <>{resolveChildren(fallback)}</>;
  }
  return null;
};

export { Some };
