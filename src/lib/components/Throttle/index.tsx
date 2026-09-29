import React, { ReactNode } from 'react';
import { useThrottle } from '@/lib/hooks/timing';
import { renderResolved } from '@/lib/utils/render-resolved';

export interface ThrottleProps {
  case: boolean;
  ms: number;
  children: ReactNode | (() => ReactNode);
  fallback?: ReactNode | (() => ReactNode);
  asChild?: boolean;
}

const Throttle: React.FC<ThrottleProps> = ({
  case: condition,
  ms,
  children,
  fallback,
  asChild,
}) => {
  const ready = useThrottle(condition, ms);
  if (ready) {
    return <>{renderResolved(children, asChild)}</>;
  }
  if (fallback !== undefined) {
    return <>{renderResolved(fallback, asChild)}</>;
  }
  return null;
};

export { Throttle };
