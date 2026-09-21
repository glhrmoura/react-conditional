import React, { ReactNode, useRef } from 'react';
import { renderResolved } from '../../utils/render-resolved';

export interface OnceProps {
  case: boolean;
  children: ReactNode | (() => ReactNode);
  fallback?: ReactNode | (() => ReactNode);
  asChild?: boolean;
}

const Once: React.FC<OnceProps> = ({ case: condition, children, fallback, asChild }) => {
  const passedRef = useRef(false);
  if (condition) {
    passedRef.current = true;
  }
  if (passedRef.current) {
    return <>{renderResolved(children, asChild)}</>;
  }
  if (fallback !== undefined) {
    return <>{renderResolved(fallback, asChild)}</>;
  }
  return null;
};

export { Once };
