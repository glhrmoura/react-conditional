import React, { ReactElement, ReactNode, useEffect } from 'react';
import { resolveChildren } from '../../utils/resolve-children';
import { warnDev } from '../../utils/warn-dev';

export interface SwitchProps<T = unknown> {
  value: T;
  children: ReactNode;
}

export type MatchWhen<T> = T | readonly T[] | ((value: T) => boolean);

export interface MatchProps<T = unknown> {
  when: MatchWhen<T>;
  or?: T | readonly T[];
  children?: ReactNode | (() => ReactNode);
}

export interface DefaultProps {
  children: ReactNode | (() => ReactNode);
}

function asList<T>(value: T | readonly T[] | undefined): T[] {
  if (value === undefined) return [];
  return Array.isArray(value) ? [...value] : [value as T];
}

function matchesWhen<T>(value: T, when: MatchWhen<T>, or?: MatchProps<T>['or']): boolean {
  if (typeof when === 'function') {
    if ((when as (value: T) => boolean)(value)) return true;
  } else if (Array.isArray(when)) {
    if (when.some((item) => Object.is(value, item))) return true;
  } else if (Object.is(value, when)) {
    return true;
  }
  return asList(or).some((item) => Object.is(value, item));
}

function hasMatchChildren(children: MatchProps['children']): boolean {
  if (children === undefined || children === null) return false;
  if (typeof children === 'function') return true;
  if (Array.isArray(children)) return children.length > 0;
  return true;
}

function Switch<T = unknown>({ value, children }: SwitchProps<T>): ReactElement {
  const childrenArray = React.Children.toArray(children);
  let renderedChild: ReactNode = null;
  let fallingThrough = false;

  for (const child of childrenArray) {
    if (!(React.isValidElement(child) && child.type === Match)) continue;
    const props = child.props as MatchProps<T>;
    const matched = fallingThrough || matchesWhen(value, props.when, props.or);
    if (!matched) continue;
    if (hasMatchChildren(props.children)) {
      renderedChild = resolveChildren(props.children as ReactNode | (() => ReactNode));
      break;
    }
    fallingThrough = true;
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
  useEffect(() => {
    warnDev('Match must be used inside Switch. It does not render on its own.');
  }, []);
  return null;
}

const Default: React.FC<DefaultProps> = ({ children }) => {
  useEffect(() => {
    warnDev('Default must be used inside Switch. Prefer Switch + Match for value matching.');
  }, []);
  return <>{resolveChildren(children)}</>;
};

export { Switch, Match, Default };
