import React from 'react';

export interface ElseProps {
  children: React.ReactNode | (() => React.ReactNode);
}

const Else: React.FC<ElseProps> = ({ children }) => {
  if (typeof children === 'function') return <>{children()}</>;

  return <>{children}</>;
};

Else.displayName = 'Else';

export default Else;
