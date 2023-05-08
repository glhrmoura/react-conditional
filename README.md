<p align="center">
  <img
		style="object: contain; height: 150px"
		src="https://raw.githubusercontent.com/glhrmoura/react-conditional/main/src/static/images/logo.png"
	/>
</p>

## React Conditional

[![npm version](https://img.shields.io/npm/v/@glhrm/react-conditional.svg?style=for-the-badge)](https://www.npmjs.com/package/@glhrm/react-conditional)
[![license](https://img.shields.io/npm/l/@glhrm/react-conditional.svg?style=for-the-badge)](https://github.com/glhrmoura/react-conditional/blob/main/LICENSE)

The React Conditional library is a powerful tool that assists in conditional rendering of components in React applications. With this library, developers can easily define conditions for displaying certain components in their applications.

### Install

```bash
$ npm install @glhrm/react-conditional --save
```

or

```bash
$ yarn add @glhrm/react-conditional
```

### Usage

#### Basic

The basic use of the library is very simple, we just need to wrap the flow control components with a `<Condition>` component, which will be responsible for managing which component will be rendered.

```jsx
import { Condition, If, Else } from '@glhrm/react-conditional';

const App = ({ isLogged }) => (
  <Condition>
    <If condition={isLogged}>
      <h2>The user is logged</h2>
    </If>
    <Else>
      <h2>The user is not logged</h2>
    </Else>
  </Condition>
);
```

#### The `<ElseIf>` component

We have the option of using the `<ElseIf>` flow control component, which will be rendered if the condition, provided to the `<If>` component, is not met.

```jsx
import { Condition, If, ElseIf, Else } from '@glhrm/react-conditional';

const App = ({ isLogged, isLoading }) => (
  <Condition>
    <If condition={isLogged}>
      <h2>The user is logged</h2>
    </If>
    <ElseIf condition={isLoading}>
      <h2>Carregando...</h2>
    </ElseIf>
    <Else>
      <h2>The user is not logged</h2>
    </Else>
  </Condition>
);
```

#### Passing multiple `<ElseIf>` components

We have the option of passing multiple `<ElseIf>` components that obey the rendering order defined in the template.

```jsx
import { Condition, If, ElseIf, Else } from '@glhrm/react-conditional';

const App = ({ isBasicUser, isVIPUser, isAdminUser }) => (
  <Condition>
    <If condition={isBasicUser}>
      <h2>The user is a basic user</h2>
    </If>
    <ElseIf condition={isVIPUser}>
      <h2>The user is a vip user</h2>
    </ElseIf>
    <ElseIf condition={isAdminUser}>
      <h2>The user is a admin user</h2>
    </ElseIf>
    <Else>
      <h2>The user does not exist</h2>
    </Else>
  </Condition>
);
```

#### Function as a child

We can pass a function as a child to the flow control components, this is useful when we need to render some property of a more complex structure, where we are not sure that it will exist at runtime.

```jsx
import { Condition, If, Else } from '@glhrm/react-conditional';

const App = ({ user }) => (
  <Condition>
    <If condition={user}>
      {() => <h2>Username: {user.name}</h2>}
    </If>
    <Else>
      <h2>User does not exist</h2>
    </Else>
  </Condition>
);
```

#### Just the `<If>` component

We have the option of using the `<If>` component alone, without having to wrap it in a `<Condition>` component, as a more convenient way of handling simpler conditionals.

```jsx
import { If } from '@glhrm/react-conditional';

const App = ({ title }) => (
  <If condition={title}>
    {title}
  </If>
);
```

### License

[MIT](https://github.com/glhrmoura/react-conditional/blob/main/LICENSE)

Copyright (c) Guilherme Moura
