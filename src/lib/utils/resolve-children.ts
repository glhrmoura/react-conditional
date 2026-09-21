import { ReactNode } from 'react';

export function resolveChildren(children: ReactNode | (() => ReactNode)): ReactNode {
  return typeof children === 'function' ? children() : children;
}
