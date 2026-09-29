import React, { ReactNode } from 'react';
import { useDelay } from '@/lib/hooks/timing';
import { renderResolved } from '@/lib/utils/render-resolved';

export interface DelayProps {
  case: boolean;
  ms: number;
  msOut?: number;
  children: ReactNode | (() => ReactNode);
  fallback?: ReactNode | (() => ReactNode);
  asChild?: boolean;
}

const Delay: React.FC<DelayProps> = ({
  case: condition,
  ms,
  msOut = 0,
  children,
  fallback,
  asChild,
}) => {
  const ready = useDelay(condition, ms, msOut);
  if (ready) {
    return <>{renderResolved(children, asChild)}</>;
  }
  if (fallback !== undefined) {
    return <>{renderResolved(fallback, asChild)}</>;
  }
  return null;
};

export { Delay };
