<p align="center">
  <img
		style="object: contain; height: 150px"
		src="https://raw.githubusercontent.com/glhrmoura/react-conditional/main/src/static/images/logo.png"
	/>
</p>

# React Conditional

The React Conditional library is a powerful tool that assists in conditional rendering of components in React applications. With this library, developers can easily define conditions for displaying certain components in their applications.

## Usage

### Basic usage

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

### The `<ElseIf>` component

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

### Function as a child

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

### Just the `<If>` component

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
