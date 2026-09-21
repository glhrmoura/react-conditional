import React, { ReactNode } from 'react';
import { renderResolved } from '@/lib/utils/render-resolved';

export interface GuardProps {
  when: unknown;
  children: ReactNode | (() => ReactNode);
  fallback?: ReactNode | (() => ReactNode);
  asChild?: boolean;
}

const Guard: React.FC<GuardProps> = ({ when, children, fallback, asChild }) => {
  if (when) {
    return <>{renderResolved(children, asChild)}</>;
  }
  if (fallback !== undefined) {
    return <>{renderResolved(fallback, asChild)}</>;
  }
  return null;
};

const When = Guard;

export type WhenProps = GuardProps;

export { Guard, When };
