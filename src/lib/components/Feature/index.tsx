import React, { ReactNode, createContext, useContext } from 'react';
import { renderResolved } from '@/lib/utils/render-resolved';

export type FeatureFlags = Record<string, boolean>;

const FeatureContext = createContext<FeatureFlags>({});

export interface FeatureProviderProps {
  flags: FeatureFlags;
  children: ReactNode;
}

const FeatureProvider: React.FC<FeatureProviderProps> = ({ flags, children }) => {
  return <FeatureContext.Provider value={flags}>{children}</FeatureContext.Provider>;
};

export interface FeatureProps {
  when?: unknown;
  name?: string;
  children: ReactNode | (() => ReactNode);
  fallback?: ReactNode | (() => ReactNode);
  asChild?: boolean;
}

function isFeatureEnabled(when: unknown, name: string | undefined, flags: FeatureFlags): boolean {
  if (when !== undefined) return Boolean(when);
  if (name) return Boolean(flags[name]);
  return false;
}

const Feature: React.FC<FeatureProps> = ({ when, name, children, fallback, asChild }) => {
  const flags = useContext(FeatureContext);
  if (isFeatureEnabled(when, name, flags)) {
    return <>{renderResolved(children, asChild)}</>;
  }
  if (fallback !== undefined) {
    return <>{renderResolved(fallback, asChild)}</>;
  }
  return null;
};

function useFeatureFlags(): FeatureFlags {
  return useContext(FeatureContext);
}

export { Feature, FeatureProvider, FeatureContext, useFeatureFlags };
