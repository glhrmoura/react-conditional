import React, { ReactNode } from 'react';

export interface UnlessProps {
  case: boolean;
  children: ReactNode | (() => ReactNode);
}

function resolveChildren(children: ReactNode | (() => ReactNode)): ReactNode {
  return typeof children === 'function' ? children() : children;
}

const Unless: React.FC<UnlessProps> = ({ case: condition, children }) => {
  if (condition) return null;
  return <>{resolveChildren(children)}</>;
};

export { Unless };
