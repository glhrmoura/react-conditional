import React, { ReactNode, useEffect } from 'react';
import { resolveChildren } from '../../utils/resolve-children';
import { warnDev } from '../../utils/warn-dev';

export interface ConditionProps {
  children: ReactNode;
}

export interface IfProps {
  case: boolean;
  children: ReactNode | (() => ReactNode);
}

export interface ElseIfProps {
  case: boolean;
  children: ReactNode | (() => ReactNode);
}

export interface ElseProps {
  children: ReactNode | (() => ReactNode);
}

const Condition: React.FC<ConditionProps> = ({ children }) => {
  const childrenArray = React.Children.toArray(children);
  let renderedChild: ReactNode = null;

  for (const child of childrenArray) {
    if (React.isValidElement(child) && child.type === If) {
      if ((child.props as IfProps).case) {
        renderedChild = resolveChildren((child.props as IfProps).children);
        break;
      }
    }
  }

  if (renderedChild === null) {
    for (const child of childrenArray) {
      if (React.isValidElement(child) && child.type === ElseIf) {
        if ((child.props as ElseIfProps).case) {
          renderedChild = resolveChildren((child.props as ElseIfProps).children);
          break;
        }
      }
    }
  }

  if (renderedChild === null) {
    for (const child of childrenArray) {
      if (React.isValidElement(child) && child.type === Else) {
        renderedChild = resolveChildren((child.props as ElseProps).children);
        break;
      }
    }
  }

  return <>{renderedChild}</>;
};

const If: React.FC<IfProps> = ({ case: condition, children }) => {
  if (!condition) return null;
  return <>{resolveChildren(children)}</>;
};

const ElseIf: React.FC<ElseIfProps> = ({ case: condition, children }) => {
  useEffect(() => {
    warnDev('ElseIf must be used inside Condition.');
  }, []);
  if (!condition) return null;
  return <>{resolveChildren(children)}</>;
};

const Else: React.FC<ElseProps> = ({ children }) => {
  useEffect(() => {
    warnDev('Else must be used inside Condition.');
  }, []);
  return <>{resolveChildren(children)}</>;
};

export { Condition, If, ElseIf, Else };
