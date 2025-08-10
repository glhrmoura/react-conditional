import React, { ReactNode } from 'react';

export interface ConditionProps {
  children: ReactNode;
}

export interface IfProps {
  condition: boolean;
  children: ReactNode;
}

export interface ElseIfProps {
  condition: boolean;
  children: ReactNode;
}

export interface ElseProps {
  children: ReactNode;
}

const Condition: React.FC<ConditionProps> = ({ children }) => {
  let renderedChild: ReactNode = null;
  const childrenArray = React.Children.toArray(children);
  
  for (const child of childrenArray) {
    if (React.isValidElement(child) && child.type === If) {
      if (child.props.condition) {
        renderedChild = child.props.children;
        break;
      }
    }
  }
  
  if (renderedChild === null) {
    for (const child of childrenArray) {
      if (React.isValidElement(child) && child.type === ElseIf) {
        if (child.props.condition) {
          renderedChild = child.props.children;
          break;
        }
      }
    }
  }
  
  if (renderedChild === null) {
    for (const child of childrenArray) {
      if (React.isValidElement(child) && child.type === Else) {
        renderedChild = child.props.children;
        break;
      }
    }
  }
  
  return <>{renderedChild}</>;
};

const If: React.FC<IfProps> = ({ condition, children }) => {
  return condition ? <>{children}</> : null;
};

const ElseIf: React.FC<ElseIfProps> = ({ condition, children }) => {
  return condition ? <>{children}</> : null;
};

const Else: React.FC<ElseProps> = ({ children }) => {
  return <>{children}</>;
};

export { Condition, If, ElseIf, Else };