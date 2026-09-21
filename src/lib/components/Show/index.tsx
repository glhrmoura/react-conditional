import React, { ReactNode } from 'react';
import { renderResolved } from '../../utils/render-resolved';

export interface ShowProps {
  case: boolean;
  children: ReactNode | (() => ReactNode);
  fallback?: ReactNode | (() => ReactNode);
  asChild?: boolean;
}

const Show: React.FC<ShowProps> = ({ case: condition, children, fallback, asChild }) => {
  if (condition) {
    return <>{renderResolved(children, asChild)}</>;
  }
  if (fallback !== undefined) {
    return <>{renderResolved(fallback, asChild)}</>;
  }
  return null;
};

export { Show };
