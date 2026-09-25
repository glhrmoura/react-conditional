import React, { ReactNode, useEffect, useState } from 'react';
import { resolveChildren } from '@/lib/utils/resolve-children';

export type AsyncSource<T> = Promise<T> | (() => Promise<T>);

export interface PendingProps {
  children: ReactNode | (() => ReactNode);
}

export interface ResolvedProps<T = unknown> {
  children: ReactNode | ((value: T) => ReactNode);
}

export interface RejectedProps {
  children: ReactNode | ((error: unknown) => ReactNode);
}

export interface AsyncProps<T = unknown> {
  source: AsyncSource<T>;
  children: ReactNode;
}

type AsyncStatus<T> =
  | { status: 'pending' }
  | { status: 'resolved'; value: T }
  | { status: 'rejected'; error: unknown };

function isPromiseLike(value: unknown): value is Promise<unknown> {
  return Boolean(value) && typeof (value as Promise<unknown>).then === 'function';
}

const Pending: React.FC<PendingProps> = ({ children }) => {
  return <>{resolveChildren(children)}</>;
};

function Resolved<T = unknown>({ children }: ResolvedProps<T>): React.ReactElement {
  return <>{typeof children === 'function' ? null : resolveChildren(children)}</>;
}

const Rejected: React.FC<RejectedProps> = ({ children }) => {
  return <>{typeof children === 'function' ? null : resolveChildren(children)}</>;
};

function resolveSlot<T>(
  children: ReactNode | ((value: T) => ReactNode),
  value: T
): ReactNode {
  return typeof children === 'function'
    ? (children as (value: T) => ReactNode)(value)
    : children;
}

function Async<T = unknown>({ source, children }: AsyncProps<T>): React.ReactElement {
  const [state, setState] = useState<AsyncStatus<T>>({ status: 'pending' });

  useEffect(() => {
    let cancelled = false;
    setState({ status: 'pending' });
    const promise = typeof source === 'function' ? source() : source;
    if (!isPromiseLike(promise)) {
      setState({ status: 'rejected', error: new TypeError('Async source must be a Promise') });
      return;
    }
    promise.then(
      (value) => {
        if (!cancelled) setState({ status: 'resolved', value: value as T });
      },
      (error) => {
        if (!cancelled) setState({ status: 'rejected', error });
      }
    );
    return () => {
      cancelled = true;
    };
  }, [source]);

  const childrenArray = React.Children.toArray(children);
  let pendingNode: ReactNode = null;
  let resolvedNode: ReactNode = null;
  let rejectedNode: ReactNode = null;

  for (const child of childrenArray) {
    if (!React.isValidElement(child)) continue;
    if (child.type === Pending && pendingNode === null) {
      pendingNode = resolveChildren((child.props as PendingProps).children);
    }
    if (child.type === Resolved && resolvedNode === null) {
      const slot = (child.props as ResolvedProps<T>).children;
      resolvedNode =
        state.status === 'resolved' ? resolveSlot(slot, state.value) : null;
    }
    if (child.type === Rejected && rejectedNode === null) {
      const slot = (child.props as RejectedProps).children;
      rejectedNode =
        state.status === 'rejected' ? resolveSlot(slot, state.error) : null;
    }
  }

  if (state.status === 'pending') return <>{pendingNode}</>;
  if (state.status === 'resolved') return <>{resolvedNode}</>;
  return <>{rejectedNode}</>;
}

const Await = Async;

export { Async, Await, Pending, Resolved, Rejected };
