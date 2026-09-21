import React, { ReactNode } from 'react';
import { renderResolved } from '@/lib/utils/render-resolved';

export interface ToggleProps {
  case: boolean;
  on: ReactNode | (() => ReactNode);
  off: ReactNode | (() => ReactNode);
  asChild?: boolean;
}

const Toggle: React.FC<ToggleProps> = ({ case: condition, on, off, asChild }) => {
  return <>{renderResolved(condition ? on : off, asChild)}</>;
};

export { Toggle };
