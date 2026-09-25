<p align="center">
  <img
    style="object: contain; height: 150px"
    src="https://raw.githubusercontent.com/glhrmoura/glhrmoura/refs/heads/main/public/assets/projects/react-conditional.png"
  />
</p>

## React Conditional

[![NPM Version](https://img.shields.io/npm/v/@glhrmoura/react-conditional.svg?style=for-the-badge)](https://www.npmjs.com/package/@glhrmoura/react-conditional)
[![License](https://img.shields.io/npm/l/@glhrmoura/react-conditional.svg?style=for-the-badge)](https://github.com/glhrmoura/react-conditional/blob/main/LICENSE)

Declarative conditional rendering for React with a slots API, helpers, portals, async states, permissions, media queries, feature flags, and hooks.

### Documentation

[**React Conditional**](https://glhrmoura-react-conditional.netlify.app)

### Install

```bash
yarn add @glhrmoura/react-conditional
```

```bash
npm install @glhrmoura/react-conditional
```

`Portal` needs `react-dom` (peer dependency, optional if you do not use portals). `ErrorBoundary` uses the React error boundary API. `Media` reads `window.matchMedia` on the client.

### Usage

#### Condition

The precedence order is always `If` → `ElseIf` → `Else`, regardless of the children order.

```jsx
import { Condition, If, Else } from '@glhrmoura/react-conditional';

const App = ({ isLogged }) => (
  <Condition>
    <If case={isLogged}>The user is logged in</If>
    <Else>The user is not logged in</Else>
  </Condition>
);
```

#### Switch Matching

`when` accepts an exact value, an array, a predicate, or extra values via `or`. An empty `Match` falls through to the next `Match` with children. Prefer a generic `Switch` for typed unions.

```jsx
import { Switch, Match, Default } from '@glhrmoura/react-conditional';

const App = ({ status }: { status: 'loading' | 'error' | 'failed' | 'success' | 'idle' }) => (
  <Switch value={status}>
    <Match when='loading'>Loading...</Match>
    <Match when='error' or='failed'>Something went wrong</Match>
    <Match when={1} />
    <Match when={2}>Shared branch for fall-through</Match>
    <Match when={(value) => value === 'success'}>Done</Match>
    <Default>Unknown status</Default>
  </Switch>
);
```

#### Unless / Show / Guard

```jsx
import { Unless, Show, Guard, When } from '@glhrmoura/react-conditional';

const App = ({ isLoading, isLogged, user }) => (
  <>
    <Unless case={isLoading}>
      <Content />
    </Unless>
    <Show case={isLogged} fallback={<LoginPrompt />}>
      <Dashboard />
    </Show>
    <Guard when={user} fallback={<Guest />}>
      {() => <Profile name={user.name} />}
    </Guard>
    <When when={user?.isAdmin}>
      <AdminPanel />
    </When>
  </>
);
```

#### Either / Toggle

```jsx
import { Either, Then, Otherwise, Toggle } from '@glhrmoura/react-conditional';

const App = ({ isOn }) => (
  <>
    <Either case={isOn}>
      <Then>On</Then>
      <Otherwise>Off</Otherwise>
    </Either>
    <Toggle case={isOn} on={<OnIcon />} off={<OffIcon />} />
  </>
);
```

#### Compare / Includes

```jsx
import { Compare, Includes } from '@glhrmoura/react-conditional';

const App = ({ age, role }) => (
  <>
    <Compare value={age} gte={18} fallback={<MinorNotice />}>
      <AdultContent />
    </Compare>
    <Includes value={role} list={['admin', 'editor']} fallback={<Forbidden />}>
      <EditorPanel />
    </Includes>
  </>
);
```

#### Exists / Empty / Every / Some / Fallback

```jsx
import { Exists, Empty, Every, Some, Fallback } from '@glhrmoura/react-conditional';

const App = ({ user, items, isLogged, isAdmin, data }) => (
  <>
    <Exists value={user} fallback={<Guest />}>
      {() => <Profile name={user.name} />}
    </Exists>
    <Empty value={items} fallback={<ItemList items={items} />}>
      <EmptyState />
    </Empty>
    <Every cases={[isLogged, isAdmin]} fallback={<Forbidden />}>
      <AdminPanel />
    </Every>
    <Some cases={[isLogged, items.length > 0]}>
      <FeatureBanner />
    </Some>
    <Fallback case={Boolean(data)} fallback={<Spinner />}>
      {() => <View data={data} />}
    </Fallback>
  </>
);
```

#### Once / Lazy

`Once` keeps rendering after the first true `case`. `Lazy` mounts children once when `case` becomes true and only shows them while `case` stays true.

```jsx
import { Once, Lazy } from '@glhrmoura/react-conditional';

const App = ({ ready, open }) => (
  <>
    <Once case={ready}>
      {() => <ExpensiveWidget />}
    </Once>
    <Lazy case={open} fallback={null}>
      {() => <HeavyPanel />}
    </Lazy>
  </>
);
```

#### Portal

```jsx
import { Portal } from '@glhrmoura/react-conditional';

const App = ({ open }) => (
  <Portal case={open} container={document.body}>
    <Modal />
  </Portal>
);
```

#### ErrorBoundary

Catch render errors only when `case` is true. Pass `resetKey` to clear the error after a retry.

```jsx
import { ErrorBoundary } from '@glhrmoura/react-conditional';

const App = ({ enabled }) => (
  <ErrorBoundary
    case={enabled}
    resetKey={enabled}
    fallback={(error) => <ErrorView message={error.message} />}
  >
    <RiskyWidget />
  </ErrorBoundary>
);
```

#### Async / Await

`source` accepts a `Promise` or a function that returns one. Slots are `Pending`, `Resolved`, and `Rejected`. `Await` is an alias of `Async`.

```jsx
import { Async, Await, Pending, Resolved, Rejected } from '@glhrmoura/react-conditional';

const App = ({ loadUser }) => (
  <Async source={loadUser}>
    <Pending>Loading...</Pending>
    <Resolved>{(user) => <Profile name={user.name} />}</Resolved>
    <Rejected>{(error) => <ErrorView message={error.message} />}</Rejected>
  </Async>
);
```

#### Permission

Render by capability (`can`) and/or `role`. Use `PermissionProvider` to share lists, or pass `permissions` / `roles` on the component. `mode` is `every` (default) or `some`.

```jsx
import { Permission, PermissionProvider } from '@glhrmoura/react-conditional';

const App = ({ user }) => (
  <PermissionProvider permissions={user.permissions} roles={user.roles}>
    <Permission can="edit" fallback={<ReadOnly />}>
      <Editor />
    </Permission>
    <Permission can={['publish', 'delete']} mode="some" role="admin">
      <Moderation />
    </Permission>
  </PermissionProvider>
);
```

#### Media

Match a viewport with `min` and/or `max` (number as px, or a CSS length). On the server the query does not match.

```jsx
import { Media } from '@glhrmoura/react-conditional';

const App = () => (
  <Media min={768} fallback={<MobileNav />}>
    <DesktopNav />
  </Media>
);
```

#### Feature

Gate UI with `when` or with a flag `name` from `FeatureProvider`.

```jsx
import { Feature, FeatureProvider } from '@glhrmoura/react-conditional';

const App = ({ flags }) => (
  <FeatureProvider flags={flags}>
    <Feature when={flags.beta} fallback={<StablePanel />}>
      <BetaPanel />
    </Feature>
    <Feature name="checkout-v2">
      <CheckoutV2 />
    </Feature>
  </FeatureProvider>
);
```

#### Hooks

```jsx
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
} from '@glhrmoura/react-conditional';

function usePanelFlags(user, role) {
  const visible = useShow(Boolean(user));
  const isAdmin = useMatch(role, 'admin', ['owner']);
  const hasUser = useExists(user);
  const noItems = useEmpty(user?.items);
  const allowed = useIncludes(role, ['admin', 'editor']);
  const adult = useCompare(user?.age ?? 0, { gte: 18 });
  const desktop = useMedia(768);
  const canEdit = usePermission({ can: 'edit' });
  const beta = useFeature('beta');
  return { visible, isAdmin, hasUser, noItems, allowed, adult, desktop, canEdit, beta };
}
```

#### asChild

`Show`, `Guard`, `Toggle`, `Compare`, `Includes`, `Once`, `Lazy`, `ErrorBoundary`, `Permission`, `Media`, and `Feature` accept `asChild` to return a single element without an extra fragment wrapper when possible.

#### Function Children

Pass a function as children for lazy evaluation. Prefer this for heavy trees and to avoid evaluating branches that do not render.

#### SSR and streaming

Function children help with SSR and React streaming: unevaluated branches stay cold until selected. `Portal` falls back to inline render when `document` is unavailable. `Once` and `Lazy` use client state (`useRef`) and should only gate client-only UI. `Media` and `Async` also use client effects; `Media` treats the query as unmatched during SSR.

### API Reference

| Export | Role |
| --- | --- |
| `Condition`, `If`, `ElseIf`, `Else` | Boolean slot branches |
| `Switch`, `Match`, `Default` | Value match, `or`, fall-through |
| `Unless`, `Show`, `Guard`, `When` | Standalone boolean / truthy checks |
| `Either`, `Then`, `Otherwise`, `Toggle` | Binary branches |
| `Compare`, `Includes` | Relational / membership checks |
| `Exists`, `Empty`, `Every`, `Some`, `Fallback` | Nullish, empty, combined cases |
| `Once`, `Lazy`, `Portal` | Sticky, cached, and portal render |
| `ErrorBoundary` | Catch child errors when `case` is true |
| `Async`, `Await`, `Pending`, `Resolved`, `Rejected` | Promise pending / success / error |
| `Permission`, `PermissionProvider` | Capability and role gates |
| `Media` | Viewport `min` / `max` |
| `Feature`, `FeatureProvider` | Feature flags |
| `useShow`, `useMatch`, `useExists`, `useEmpty`, `useIncludes`, `useCompare`, `useMedia`, `usePermission`, `useFeature` | Hook mirrors |

Development builds warn when `Else` / `ElseIf` render outside `Condition`, or `Match` / `Default` render outside `Switch`.

### License

[MIT](https://github.com/glhrmoura/react-conditional/blob/main/LICENSE)

Copyright (c) Guilherme Moura
