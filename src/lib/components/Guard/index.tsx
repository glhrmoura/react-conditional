import React, { ReactNode } from 'react';
import { resolveChildren } from '../../utils/resolve-children';

export interface GuardProps {
  when: unknown;
  children: ReactNode | (() => ReactNode);
  fallback?: ReactNode | (() => ReactNode);
}

const Guard: React.FC<GuardProps> = ({ when, children, fallback }) => {
  if (when) {
    return <>{resolveChildren(children)}</>;
  }
  if (fallback !== undefined) {
    return <>{resolveChildren(fallback)}</>;
  }
  return null;
};

const When = Guard;

export type WhenProps = GuardProps;

export { Guard, When };
