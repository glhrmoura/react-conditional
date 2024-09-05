<p align="center">
  <img
    style="object: contain; height: 150px"
    src="https://raw.githubusercontent.com/glhrmoura/react-conditional/main/src/lib/static/images/logo.png"
  />
</p>

## React Conditional

[![NPM Version](https://img.shields.io/npm/v/@glhrmoura/react-conditional.svg?style=for-the-badge)](https://www.npmjs.com/package/@glhrmoura/react-conditional)
[![License](https://img.shields.io/npm/l/@glhrmoura/react-conditional.svg?style=for-the-badge)](https://github.com/glhrmoura/react-conditional/blob/main/LICENSE)

The React Conditional library is a powerful tool that assists in conditional rendering of components in React applications. With this library, developers can easily define conditions for displaying certain components in their applications.

### Demo

[**React Conditional**](https://snazzy-duckanoo-1674ec.netlify.app)

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

The basic use of the library is very simple. Just wrap your conditional components with a <Condition> component, which will be responsible for managing which component will be rendered.

```jsx
import { Condition } from '@glhrmoura/react-conditional';

const App = ({ isLogged }) => (
  <Condition>
    <div rc-if={isLogged}>The user is logged in</div>
    <div rc-else>The user is not logged in</div>
  </Condition>
);
```

You can use the `rc-else-if` attribute to specify additional conditions that will be checked if the condition provided to the `rc-if` attribute is not met.

```jsx
import { Condition } from '@glhrmoura/react-conditional';

const App = ({ isLogged, isLoading }) => (
  <Condition>
    <div rc-if={isLogged}>The user is logged in</div>
    <div rc-else-if={isLoading}>Loading...</div>
    <div rc-else>The user is not logged in</div>
  </Condition>
);
```

You can pass multiple `rc-else-if` components that obey the rendering order defined in the template.

```jsx
import { Condition } from '@glhrmoura/react-conditional';

const App = ({ isBasicUser, isVIPUser, isAdminUser }) => (
  <Condition>
    <div rc-if={isBasicUser}>The user is a basic user</div>
    <div rc-else-if={isVIPUser}>The user is a VIP user</div>
    <div rc-else-if={isAdminUser}>The user is an admin user</div>
    <div rc-else>The user does not exist</div>
  </Condition>
);
```

### License

[MIT](https://github.com/glhrmoura/react-conditional/blob/main/LICENSE)

Copyright (c) Guilherme Moura
