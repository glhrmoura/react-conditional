import React, { ReactNode } from 'react';
import { resolveChildren } from '@/lib/utils/resolve-children';

export interface UnlessProps {
  case: boolean;
  children: ReactNode | (() => ReactNode);
}

const Unless: React.FC<UnlessProps> = ({ case: condition, children }) => {
  if (condition) return null;
  return <>{resolveChildren(children)}</>;
};

export { Unless };
