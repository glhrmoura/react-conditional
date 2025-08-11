import React, { ReactNode } from 'react';

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
      if (child.props.case) {
        renderedChild = typeof child.props.children === 'function' 
          ? child.props.children() 
          : child.props.children;
        break;
      }
    }
  }
  
  if (renderedChild === null) {
    for (const child of childrenArray) {
      if (React.isValidElement(child) && child.type === ElseIf) {
        if (child.props.case) {
          renderedChild = typeof child.props.children === 'function' 
            ? child.props.children() 
            : child.props.children;
          break;
        }
      }
    }
  }
  
  if (renderedChild === null) {
    for (const child of childrenArray) {
      if (React.isValidElement(child) && child.type === Else) {
        renderedChild = typeof child.props.children === 'function' 
          ? child.props.children() 
          : child.props.children;
        break;
      }
    }
  }
  
  return <>{renderedChild}</>;
};

const If: React.FC<IfProps> = ({ case: condition, children }) => {
  if (!condition) return null;
  return <>{typeof children === 'function' ? children() : children}</>;
};

const ElseIf: React.FC<ElseIfProps> = ({ case: condition, children }) => {
  if (!condition) return null;
  return <>{typeof children === 'function' ? children() : children}</>;
};

const Else: React.FC<ElseProps> = ({ children }) => {
  return <>{typeof children === 'function' ? children() : children}</>;
};

export { Condition, If, ElseIf, Else };