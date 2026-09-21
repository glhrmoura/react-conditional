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
import {
  useShow,
  useMatch,
  useExists,
  useEmpty,
  useIncludes,
  useCompare,
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
  useShow,
  useMatch,
  useExists,
  useEmpty,
  useIncludes,
  useCompare,
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
};
