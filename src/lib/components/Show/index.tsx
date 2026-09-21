import React, { ReactNode } from 'react';
import { resolveChildren } from '../../utils/resolve-children';

export interface ShowProps {
  case: boolean;
  children: ReactNode | (() => ReactNode);
  fallback?: ReactNode | (() => ReactNode);
}

const Show: React.FC<ShowProps> = ({ case: condition, children, fallback }) => {
  if (condition) {
    return <>{resolveChildren(children)}</>;
  }
  if (fallback !== undefined) {
    return <>{resolveChildren(fallback)}</>;
  }
  return null;
};

export { Show };
