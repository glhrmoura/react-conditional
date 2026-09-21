import React, { ReactNode } from 'react';
import { resolveChildren } from '@/lib/utils/resolve-children';

export interface ThenProps {
  children: ReactNode | (() => ReactNode);
}

export interface OtherwiseProps {
  children: ReactNode | (() => ReactNode);
}

export interface EitherProps {
  case: boolean;
  children: ReactNode;
}

const Then: React.FC<ThenProps> = ({ children }) => {
  return <>{resolveChildren(children)}</>;
};

const Otherwise: React.FC<OtherwiseProps> = ({ children }) => {
  return <>{resolveChildren(children)}</>;
};

const Either: React.FC<EitherProps> = ({ case: condition, children }) => {
  const childrenArray = React.Children.toArray(children);
  let thenNode: ReactNode = null;
  let otherwiseNode: ReactNode = null;

  for (const child of childrenArray) {
    if (!React.isValidElement(child)) continue;
    if (child.type === Then && thenNode === null) {
      thenNode = resolveChildren((child.props as ThenProps).children);
    }
    if (child.type === Otherwise && otherwiseNode === null) {
      otherwiseNode = resolveChildren((child.props as OtherwiseProps).children);
    }
  }

  return <>{condition ? thenNode : otherwiseNode}</>;
};

export { Either, Then, Otherwise };
