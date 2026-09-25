import React, { ErrorInfo, ReactNode } from 'react';
import { resolveChildren } from '@/lib/utils/resolve-children';
import { renderResolved } from '@/lib/utils/render-resolved';

export type ErrorFallback = ReactNode | ((error: Error, info?: ErrorInfo) => ReactNode);

export interface ErrorBoundaryProps {
  case?: boolean;
  children: ReactNode | (() => ReactNode);
  fallback?: ErrorFallback;
  resetKey?: unknown;
  onError?: (error: Error, info: ErrorInfo) => void;
  asChild?: boolean;
}

interface ErrorBoundaryState {
  error: Error | null;
  info: ErrorInfo | null;
}

class ErrorBoundaryInner extends React.Component<
  Omit<ErrorBoundaryProps, 'case'> & { children: ReactNode },
  ErrorBoundaryState
> {
  state: ErrorBoundaryState = {
    error: null,
    info: null,
  };

  static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
    return { error };
  }

  componentDidCatch(error: Error, info: ErrorInfo): void {
    this.setState({ info });
    this.props.onError?.(error, info);
  }

  componentDidUpdate(prevProps: Omit<ErrorBoundaryProps, 'case'> & { children: ReactNode }): void {
    if (this.props.resetKey !== prevProps.resetKey && this.state.error) {
      this.setState({ error: null, info: null });
    }
  }

  render(): ReactNode {
    const { error, info } = this.state;
    if (error) {
      const fallback = this.props.fallback;
      if (typeof fallback === 'function') {
        return renderResolved(() => fallback(error, info ?? undefined), this.props.asChild);
      }
      if (fallback !== undefined) {
        return renderResolved(fallback, this.props.asChild);
      }
      return null;
    }
    return this.props.children;
  }
}

const ErrorBoundary: React.FC<ErrorBoundaryProps> = ({
  case: enabled = true,
  children,
  fallback,
  resetKey,
  onError,
  asChild,
}) => {
  const content = resolveChildren(children);
  if (!enabled) {
    return <>{content}</>;
  }
  return (
    <ErrorBoundaryInner
      fallback={fallback}
      resetKey={resetKey}
      onError={onError}
      asChild={asChild}
    >
      {content}
    </ErrorBoundaryInner>
  );
};

export { ErrorBoundary };
