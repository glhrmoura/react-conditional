import React, { ReactNode } from 'react';

export interface ConditionProps {
  children: ReactNode;
}

export interface IfProps {
  case: boolean;
  children: ReactNode;
}

export interface ElseIfProps {
  case: boolean;
  children: ReactNode;
}

export interface ElseProps {
  children: ReactNode;
}

const Condition: React.FC<ConditionProps> = ({ children }) => {
  const childrenArray = React.Children.toArray(children);
  let renderedChild: ReactNode = null;
  
  for (const child of childrenArray) {
    if (React.isValidElement(child)) {
      if (child.type === If || child.type === ElseIf) {
        if (child.props.case) {
          renderedChild = child.props.children;
          break;
        }
      } else if (child.type === Else) {
        if (renderedChild === null) {
          renderedChild = child.props.children;
        }
        break;
      }
    }
  }
  
  return <>{renderedChild}</>;
};

const If: React.FC<IfProps> = ({ case: condition, children }) => {
  return condition ? <>{children}</> : null;
};

const ElseIf: React.FC<ElseIfProps> = ({ case: condition, children }) => {
  return condition ? <>{children}</> : null;
};

const Else: React.FC<ElseProps> = ({ children }) => {
  return <>{children}</>;
};

export { Condition, If, ElseIf, Else };