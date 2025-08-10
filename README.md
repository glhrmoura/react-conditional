<p align="center">
  <img
    style="object: contain; height: 150px"
    src="https://i.imgur.com/t2AeIFw.png"
  />
</p>

## React Conditional

[![NPM Version](https://img.shields.io/npm/v/@glhrmoura/react-conditional.svg?style=for-the-badge)](https://www.npmjs.com/package/@glhrmoura/react-conditional)
[![License](https://img.shields.io/npm/l/@glhrmoura/react-conditional.svg?style=for-the-badge)](https://github.com/glhrmoura/react-conditional/blob/main/LICENSE)

The React Conditional library is a powerful tool that assists in conditional rendering of components in React applications. With this library, developers can easily define conditions for displaying certain components in their applications using a clean and intuitive React Slots API.

### Demo

[**React Conditional**](https://glhrmoura-react-conditional.netlify.app)

### Install

To add React Conditional to your project, use one of the following commands:

```bash
yarn add @glhrmoura/react-conditional
```

or

```bash
npm install @glhrmoura/react-conditional
```

### Usage

The library provides a clean React Slots API with `Condition`, `If`, `ElseIf`, and `Else` components. The order of precedence is always: `If` → `ElseIf` → `Else`, regardless of the order in the children list.

#### Basic Usage

```jsx
import { Condition, If, Else } from '@glhrmoura/react-conditional';

const App = ({ isLogged }) => (
  <Condition>
    <If condition={isLogged}>
      The user is logged in
    </If>
    <Else>
      The user is not logged in
    </Else>
  </Condition>
);
```

#### Multiple Conditions

You can use the `ElseIf` component to specify additional conditions that will be checked if the previous conditions are not met.

```jsx
import { Condition, If, ElseIf, Else } from '@glhrmoura/react-conditional';

const App = ({ isLogged, isLoading }) => (
  <Condition>
    <If condition={isLogged}>
      The user is logged in
    </If>
    <ElseIf condition={isLoading}>
      Loading...
    </ElseIf>
    <Else>
      The user is not logged in
    </Else>
  </Condition>
);
```

#### Complex Conditions

You can pass multiple `ElseIf` components that follow the rendering order defined by the library's precedence rules.

```jsx
import { Condition, If, ElseIf, Else } from '@glhrmoura/react-conditional';

const App = ({ isBasicUser, isVIPUser, isAdminUser }) => (
  <Condition>
    <If condition={isBasicUser}>
      The user is a basic user
    </If>
    <ElseIf condition={isVIPUser}>
      The user is a VIP user
    </ElseIf>
    <ElseIf condition={isAdminUser}>
      The user is an admin user
    </ElseIf>
    <Else>
      The user does not exist
    </Else>
  </Condition>
);
```

#### Order Independence

The components work regardless of their order in the children list. The precedence is always maintained:

```jsx
import { Condition, If, ElseIf, Else } from '@glhrmoura/react-conditional';

const App = ({ isLogged }) => (
  <Condition>
    <Else>Fallback content</Else>
    <If condition={isLogged}>
      User is logged in
    </If>
    <ElseIf condition={false}>
      This won't render
    </ElseIf>
  </Condition>
);
```

### API Reference

#### `Condition`
The main wrapper component that manages conditional rendering.

#### `If`
Renders children when the condition is true. Has the highest precedence.

**Props:**
- `condition: boolean` - The condition to evaluate
- `children: ReactNode` - The content to render when condition is true

#### `ElseIf`
Renders children when the condition is true and no previous `If` or `ElseIf` has been rendered.

**Props:**
- `condition: boolean` - The condition to evaluate
- `children: ReactNode` - The content to render when condition is true

#### `Else`
Renders children when no `If` or `ElseIf` conditions have been met.

**Props:**
- `children: ReactNode` - The fallback content to render

### License

[MIT](https://github.com/glhrmoura/react-conditional/blob/main/LICENSE)

Copyright (c) Guilherme Moura
