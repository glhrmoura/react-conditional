import React, { ReactNode, createContext, useContext } from 'react';
import { AccessMode, hasAccess, toAccessList } from '@/lib/utils/has-access';
import { renderResolved } from '@/lib/utils/render-resolved';

export interface PermissionContextValue {
  permissions: readonly string[];
  roles: readonly string[];
}

const PermissionContext = createContext<PermissionContextValue>({
  permissions: [],
  roles: [],
});

export interface PermissionProviderProps {
  permissions?: readonly string[];
  roles?: readonly string[];
  children: ReactNode;
}

const PermissionProvider: React.FC<PermissionProviderProps> = ({
  permissions = [],
  roles = [],
  children,
}) => {
  return (
    <PermissionContext.Provider value={{ permissions, roles }}>
      {children}
    </PermissionContext.Provider>
  );
};

export interface PermissionProps {
  can?: string | readonly string[];
  role?: string | readonly string[];
  permissions?: readonly string[];
  roles?: readonly string[];
  mode?: AccessMode;
  children: ReactNode | (() => ReactNode);
  fallback?: ReactNode | (() => ReactNode);
  asChild?: boolean;
}

function isAllowed(props: PermissionProps, ctx: PermissionContextValue): boolean {
  const neededCan = toAccessList(props.can);
  const neededRoles = toAccessList(props.role);
  if (neededCan.length === 0 && neededRoles.length === 0) return false;
  const availablePerms = props.permissions ?? ctx.permissions;
  const availableRoles = props.roles ?? ctx.roles;
  const mode = props.mode ?? 'every';
  return (
    hasAccess(neededCan, availablePerms, mode) &&
    hasAccess(neededRoles, availableRoles, mode)
  );
}

const Permission: React.FC<PermissionProps> = (props) => {
  const ctx = useContext(PermissionContext);
  const { children, fallback, asChild } = props;
  if (isAllowed(props, ctx)) {
    return <>{renderResolved(children, asChild)}</>;
  }
  if (fallback !== undefined) {
    return <>{renderResolved(fallback, asChild)}</>;
  }
  return null;
};

function usePermissionContext(): PermissionContextValue {
  return useContext(PermissionContext);
}

export { Permission, PermissionProvider, PermissionContext, usePermissionContext };
