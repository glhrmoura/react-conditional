import { Condition, If, ElseIf, Else } from '@/lib/components/Condition';
import type { ConditionProps, IfProps, ElseIfProps, ElseProps } from '@/lib/components/Condition';
import { Switch, Match, Default } from '@/lib/components/Switch';
import type { SwitchProps, MatchProps, DefaultProps, MatchWhen } from '@/lib/components/Switch';
import { Unless } from '@/lib/components/Unless';
import type { UnlessProps } from '@/lib/components/Unless';
import { Show } from '@/lib/components/Show';
import type { ShowProps } from '@/lib/components/Show';
import { Guard, When } from '@/lib/components/Guard';
import type { GuardProps, WhenProps } from '@/lib/components/Guard';
import { Exists } from '@/lib/components/Exists';
import type { ExistsProps } from '@/lib/components/Exists';
import { Empty } from '@/lib/components/Empty';
import type { EmptyProps } from '@/lib/components/Empty';
import { Every } from '@/lib/components/Every';
import type { EveryProps } from '@/lib/components/Every';
import { Some } from '@/lib/components/Some';
import type { SomeProps } from '@/lib/components/Some';
import { Fallback } from '@/lib/components/Fallback';
import type { FallbackProps } from '@/lib/components/Fallback';
import { Either, Then, Otherwise } from '@/lib/components/Either';
import type { EitherProps, ThenProps, OtherwiseProps } from '@/lib/components/Either';
import { Toggle } from '@/lib/components/Toggle';
import type { ToggleProps } from '@/lib/components/Toggle';
import { Compare } from '@/lib/components/Compare';
import type { CompareProps } from '@/lib/components/Compare';
import { Includes } from '@/lib/components/Includes';
import type { IncludesProps } from '@/lib/components/Includes';
import { Once } from '@/lib/components/Once';
import type { OnceProps } from '@/lib/components/Once';
import { Lazy } from '@/lib/components/Lazy';
import type { LazyProps } from '@/lib/components/Lazy';
import { Portal } from '@/lib/components/Portal';
import type { PortalProps } from '@/lib/components/Portal';
import { ErrorBoundary } from '@/lib/components/ErrorBoundary';
import type { ErrorBoundaryProps, ErrorFallback } from '@/lib/components/ErrorBoundary';
import { Async, Await, Pending, Resolved, Rejected } from '@/lib/components/Async';
import type {
  AsyncProps,
  AsyncSource,
  PendingProps,
  ResolvedProps,
  RejectedProps,
} from '@/lib/components/Async';
import { Permission, PermissionProvider } from '@/lib/components/Permission';
import type {
  PermissionProps,
  PermissionProviderProps,
  PermissionContextValue,
} from '@/lib/components/Permission';
import { Media } from '@/lib/components/Media';
import type { MediaProps } from '@/lib/components/Media';
import { Feature, FeatureProvider } from '@/lib/components/Feature';
import type { FeatureProps, FeatureProviderProps, FeatureFlags } from '@/lib/components/Feature';
import type { AccessMode } from '@/lib/utils/has-access';
import type { MediaBound } from '@/lib/utils/media-query';
import {
  useShow,
  useMatch,
  useExists,
  useEmpty,
  useIncludes,
  useCompare,
  useMedia,
  usePermission,
  useFeature,
} from '@/lib/hooks';

export {
  Condition,
  If,
  ElseIf,
  Else,
  Switch,
  Match,
  Default,
  Unless,
  Show,
  Guard,
  When,
  Exists,
  Empty,
  Every,
  Some,
  Fallback,
  Either,
  Then,
  Otherwise,
  Toggle,
  Compare,
  Includes,
  Once,
  Lazy,
  Portal,
  ErrorBoundary,
  Async,
  Await,
  Pending,
  Resolved,
  Rejected,
  Permission,
  PermissionProvider,
  Media,
  Feature,
  FeatureProvider,
  useShow,
  useMatch,
  useExists,
  useEmpty,
  useIncludes,
  useCompare,
  useMedia,
  usePermission,
  useFeature,
};

export type {
  ConditionProps,
  IfProps,
  ElseIfProps,
  ElseProps,
  SwitchProps,
  MatchProps,
  MatchWhen,
  DefaultProps,
  UnlessProps,
  ShowProps,
  GuardProps,
  WhenProps,
  ExistsProps,
  EmptyProps,
  EveryProps,
  SomeProps,
  FallbackProps,
  EitherProps,
  ThenProps,
  OtherwiseProps,
  ToggleProps,
  CompareProps,
  IncludesProps,
  OnceProps,
  LazyProps,
  PortalProps,
  ErrorBoundaryProps,
  ErrorFallback,
  AsyncProps,
  AsyncSource,
  PendingProps,
  ResolvedProps,
  RejectedProps,
  PermissionProps,
  PermissionProviderProps,
  PermissionContextValue,
  AccessMode,
  MediaProps,
  MediaBound,
  FeatureProps,
  FeatureProviderProps,
  FeatureFlags,
};
