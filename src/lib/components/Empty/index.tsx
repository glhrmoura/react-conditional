import React, { ReactNode } from 'react';
import { resolveChildren } from '../../utils/resolve-children';
import { isEmpty } from '../../utils/is-empty';

export interface EmptyProps {
  value: unknown;
  children: ReactNode | (() => ReactNode);
  fallback?: ReactNode | (() => ReactNode);
}

const Empty: React.FC<EmptyProps> = ({ value, children, fallback }) => {
  if (isEmpty(value)) {
    return <>{resolveChildren(children)}</>;
  }
  if (fallback !== undefined) {
    return <>{resolveChildren(fallback)}</>;
  }
  return null;
};

export { Empty };
