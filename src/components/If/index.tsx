import React from 'react';

export interface IfProps {
  condition: any;
  children: React.ReactNode | (() => React.ReactNode);
}

const If: React.FC<IfProps> = ({ children, condition }) => {
  if (!condition) return null;
  if (typeof children === 'function') return <>{children()}</>;

  return <>{children}</>;
};

If.displayName = 'If';

export default If;
