import React, { ReactNode } from 'react';
import { resolveChildren } from '../../utils/resolve-children';

export interface ExistsProps {
  value: unknown;
  children: ReactNode | (() => ReactNode);
  fallback?: ReactNode | (() => ReactNode);
}

const Exists: React.FC<ExistsProps> = ({ value, children, fallback }) => {
  if (value != null) {
    return <>{resolveChildren(children)}</>;
  }
  if (fallback !== undefined) {
    return <>{resolveChildren(fallback)}</>;
  }
  return null;
};

export { Exists };
