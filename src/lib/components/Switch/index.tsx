import React, { ReactElement, ReactNode } from 'react';
import { resolveChildren } from '../../utils/resolve-children';

export interface SwitchProps<T = unknown> {
  value: T;
  children: ReactNode;
}

export interface MatchProps<T = unknown> {
  when: T | readonly T[] | ((value: T) => boolean);
  children: ReactNode | (() => ReactNode);
}

export interface DefaultProps {
  children: ReactNode | (() => ReactNode);
}

function matchesWhen<T>(value: T, when: MatchProps<T>['when']): boolean {
  if (typeof when === 'function') {
    return Boolean((when as (value: T) => boolean)(value));
  }
  if (Array.isArray(when)) {
    return when.some((item) => Object.is(value, item));
  }
  return Object.is(value, when);
}

function Switch<T = unknown>({ value, children }: SwitchProps<T>): ReactElement {
  const childrenArray = React.Children.toArray(children);
  let renderedChild: ReactNode = null;

  for (const child of childrenArray) {
    if (React.isValidElement(child) && child.type === Match) {
      if (matchesWhen(value, (child.props as MatchProps<T>).when)) {
        renderedChild = resolveChildren((child.props as MatchProps<T>).children);
        break;
      }
    }
  }

  if (renderedChild === null) {
    for (const child of childrenArray) {
      if (React.isValidElement(child) && child.type === Default) {
        renderedChild = resolveChildren((child.props as DefaultProps).children);
        break;
      }
    }
  }

  return <>{renderedChild}</>;
}

function Match<T = unknown>(_props: MatchProps<T>): null {
  return null;
}

const Default: React.FC<DefaultProps> = ({ children }) => {
  return <>{resolveChildren(children)}</>;
};

export { Switch, Match, Default };
