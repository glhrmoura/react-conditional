import React, { ReactNode } from 'react';

export interface SwitchProps {
  value: unknown;
  children: ReactNode;
}

export interface MatchProps {
  when: unknown | ((value: unknown) => boolean);
  children: ReactNode | (() => ReactNode);
}

export interface DefaultProps {
  children: ReactNode | (() => ReactNode);
}

function resolveChildren(children: ReactNode | (() => ReactNode)): ReactNode {
  return typeof children === 'function' ? children() : children;
}

function matchesWhen(value: unknown, when: MatchProps['when']): boolean {
  if (typeof when === 'function') {
    return Boolean((when as (value: unknown) => boolean)(value));
  }
  return Object.is(value, when);
}

const Switch: React.FC<SwitchProps> = ({ value, children }) => {
  const childrenArray = React.Children.toArray(children);
  let renderedChild: ReactNode = null;

  for (const child of childrenArray) {
    if (React.isValidElement(child) && child.type === Match) {
      if (matchesWhen(value, child.props.when)) {
        renderedChild = resolveChildren(child.props.children);
        break;
      }
    }
  }

  if (renderedChild === null) {
    for (const child of childrenArray) {
      if (React.isValidElement(child) && child.type === Default) {
        renderedChild = resolveChildren(child.props.children);
        break;
      }
    }
  }

  return <>{renderedChild}</>;
};

const Match: React.FC<MatchProps> = () => {
  return null;
};

const Default: React.FC<DefaultProps> = ({ children }) => {
  return <>{resolveChildren(children)}</>;
};

export { Switch, Match, Default };
