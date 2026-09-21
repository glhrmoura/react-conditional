<p align="center">
  <img
    style="object: contain; height: 150px"
    src="https://raw.githubusercontent.com/glhrmoura/glhrmoura/refs/heads/main/public/assets/projects/react-conditional.png"
  />
</p>

## React Conditional

[![NPM Version](https://img.shields.io/npm/v/@glhrmoura/react-conditional.svg?style=for-the-badge)](https://www.npmjs.com/package/@glhrmoura/react-conditional)
[![License](https://img.shields.io/npm/l/@glhrmoura/react-conditional.svg?style=for-the-badge)](https://github.com/glhrmoura/react-conditional/blob/main/LICENSE)

Declarative conditional rendering for React with a slots API.

Use `Condition`, `If`, `ElseIf`, and `Else` for boolean branches, or `Switch`, `Match`, and `Default` to match against a value.

### Documentation

[**React Conditional**](https://glhrmoura-react-conditional.netlify.app)

### Install

```bash
yarn add @glhrmoura/react-conditional
```

```bash
npm install @glhrmoura/react-conditional
```

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

#### Multiple Conditions

```jsx
import { Condition, If, ElseIf, Else } from '@glhrmoura/react-conditional';

const App = ({ isLogged, isLoading }) => (
  <Condition>
    <If case={isLogged}>The user is logged in</If>
    <ElseIf case={isLoading}>Loading...</ElseIf>
    <Else>The user is not logged in</Else>
  </Condition>
);
```

#### Complex Conditions

```jsx
import { Condition, If, ElseIf, Else } from '@glhrmoura/react-conditional';

const App = ({ isBasicUser, isVIPUser, isAdminUser }) => (
  <Condition>
    <If case={isBasicUser}>The user is a basic user</If>
    <ElseIf case={isVIPUser}>The user is a VIP user</ElseIf>
    <ElseIf case={isAdminUser}>The user is an admin user</ElseIf>
    <Else>The user does not exist</Else>
  </Condition>
);
```

#### Order Independence

```jsx
import { Condition, If, ElseIf, Else } from '@glhrmoura/react-conditional';

const App = ({ isLogged }) => (
  <Condition>
    <Else>Fallback content</Else>
    <If case={isLogged}>User is logged in</If>
    <ElseIf case={false}>This won't render</ElseIf>
  </Condition>
);
```

#### Function Children

Children can be a function for lazy evaluation:

```jsx
import { Condition, If, ElseIf, Else } from '@glhrmoura/react-conditional';

const App = ({ userType }) => (
  <Condition>
    <If case={userType === 'basic'}>
      {() => <div style={{ color: 'green' }}>The user is a basic user</div>}
    </If>
    <ElseIf case={userType === 'vip'}>
      {() => <div style={{ color: 'blue' }}>The user is a vip user</div>}
    </ElseIf>
    <ElseIf case={userType === 'admin'}>
      {() => <div style={{ color: 'red' }}>The user is an admin user</div>}
    </ElseIf>
    <Else>
      {() => <div style={{ color: 'gray' }}>The user is not logged in</div>}
    </Else>
  </Condition>
);
```

#### Switch Matching

Use `Switch`, `Match`, and `Default` to render based on a value. `when` accepts an exact value or a predicate. The first matching `Match` wins; otherwise `Default` is rendered.

```jsx
import { Switch, Match, Default } from '@glhrmoura/react-conditional';

const App = ({ status }) => (
  <Switch value={status}>
    <Match when='loading'>Loading...</Match>
    <Match when='error'>Something went wrong</Match>
    <Match when={(value) => value === 'success'}>Done</Match>
    <Default>Unknown status</Default>
  </Switch>
);
```

`Match` and `Default` can appear in any order; matching still prefers the first successful `Match`, then `Default`.

```jsx
import { Switch, Match, Default } from '@glhrmoura/react-conditional';

const App = ({ role }) => (
  <Switch value={role}>
    <Default>Guest</Default>
    <Match when='admin'>Administrator</Match>
    <Match when={(value) => value === 'editor'}>Editor</Match>
  </Switch>
);
```

### API Reference

#### `Condition`

Boolean conditional wrapper that renders the first matching branch.

**Props:**

- `children: ReactNode` - `If`, `ElseIf`, and `Else` slots

#### `If`

Renders children when `case` is true. Highest precedence inside `Condition`.

**Props:**

- `case: boolean`
- `children: ReactNode | (() => ReactNode)`

#### `ElseIf`

Renders children when `case` is true and no previous `If` or `ElseIf` matched.

**Props:**

- `case: boolean`
- `children: ReactNode | (() => ReactNode)`

#### `Else`

Fallback when no `If` or `ElseIf` matched.

**Props:**

- `children: ReactNode | (() => ReactNode)`

#### `Switch`

Value-based conditional wrapper that renders the first matching `Match`, or `Default`.

**Props:**

- `value: unknown`
- `children: ReactNode` - `Match` and `Default` slots

#### `Match`

Renders children when `when` matches the parent `Switch` value.

**Props:**

- `when: unknown | ((value: unknown) => boolean)` - exact match via `Object.is`, or predicate
- `children: ReactNode | (() => ReactNode)`

#### `Default`

Fallback when no `Match` matched inside `Switch`.

**Props:**

- `children: ReactNode | (() => ReactNode)`

### License

[MIT](https://github.com/glhrmoura/react-conditional/blob/main/LICENSE)

Copyright (c) Guilherme Moura
