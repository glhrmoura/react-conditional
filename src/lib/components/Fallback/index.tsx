import React, { ReactNode } from 'react';
import { resolveChildren } from '../../utils/resolve-children';

export interface FallbackProps {
  case: boolean;
  children: ReactNode | (() => ReactNode);
  fallback: ReactNode | (() => ReactNode);
}

const Fallback: React.FC<FallbackProps> = ({ case: condition, children, fallback }) => {
  if (condition) {
    return <>{resolveChildren(children)}</>;
  }
  return <>{resolveChildren(fallback)}</>;
};

export { Fallback };
