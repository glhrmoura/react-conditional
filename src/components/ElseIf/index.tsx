import React from 'react';

export interface ElseIfProps {
  condition?: boolean;
  children: React.ReactNode | (() => React.ReactNode);
}

const ElseIf: React.FC<ElseIfProps> = ({ children, condition }) => {
  if (!condition) return null;
  if (typeof children === 'function') return <>{children()}</>;

  return <>{children}</>;
};

ElseIf.displayName = 'ElseIf';

export default ElseIf;
