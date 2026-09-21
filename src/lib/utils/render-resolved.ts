import React, { ReactNode } from 'react';
import { resolveChildren } from '@/lib/utils/resolve-children';

export function renderResolved(
  children: ReactNode | (() => ReactNode),
  asChild?: boolean
): ReactNode {
  const content = resolveChildren(children);
  if (asChild && React.isValidElement(content)) {
    return content;
  }
  return content;
}
