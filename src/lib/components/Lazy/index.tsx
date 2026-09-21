import React, { ReactNode, useRef } from 'react';
import { resolveChildren } from '../../utils/resolve-children';
import { renderResolved } from '../../utils/render-resolved';

export interface LazyProps {
  case: boolean;
  children: ReactNode | (() => ReactNode);
  fallback?: ReactNode | (() => ReactNode);
  asChild?: boolean;
}

const Lazy: React.FC<LazyProps> = ({ case: condition, children, fallback, asChild }) => {
  const cacheRef = useRef<ReactNode>(null);
  const mountedRef = useRef(false);

  if (condition && !mountedRef.current) {
    cacheRef.current = resolveChildren(children);
    mountedRef.current = true;
  }

  if (condition && mountedRef.current) {
    if (asChild && React.isValidElement(cacheRef.current)) {
      return cacheRef.current;
    }
    return <>{cacheRef.current}</>;
  }

  if (fallback !== undefined) {
    return <>{renderResolved(fallback, asChild)}</>;
  }

  return null;
};

export { Lazy };
