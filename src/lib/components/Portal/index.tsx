import React, { ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { resolveChildren } from '@/lib/utils/resolve-children';

export interface PortalProps {
  case: boolean;
  container?: Element | DocumentFragment | null;
  children: ReactNode | (() => ReactNode);
  fallback?: ReactNode | (() => ReactNode);
}

const Portal: React.FC<PortalProps> = ({
  case: condition,
  container,
  children,
  fallback,
}) => {
  if (!condition) {
    if (fallback !== undefined) {
      return <>{resolveChildren(fallback)}</>;
    }
    return null;
  }

  const content = resolveChildren(children);
  const target = container ?? (typeof document !== 'undefined' ? document.body : null);
  if (!target) {
    return <>{content}</>;
  }
  return <>{createPortal(content, target)}</>;
};

export { Portal };
