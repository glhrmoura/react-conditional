import React, { ReactNode } from 'react';
import { useDebounce } from '@/lib/hooks/timing';
import { renderResolved } from '@/lib/utils/render-resolved';

export interface DebounceProps {
  case: boolean;
  ms: number;
  children: ReactNode | (() => ReactNode);
  fallback?: ReactNode | (() => ReactNode);
  asChild?: boolean;
}

const Debounce: React.FC<DebounceProps> = ({
  case: condition,
  ms,
  children,
  fallback,
  asChild,
}) => {
  const ready = useDebounce(condition, ms);
  if (ready) {
    return <>{renderResolved(children, asChild)}</>;
  }
  if (fallback !== undefined) {
    return <>{renderResolved(fallback, asChild)}</>;
  }
  return null;
};

export { Debounce };
