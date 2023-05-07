import React from 'react';

import ReactDOM from 'react-dom/client';
import { If, ElseIf, Else, Condition } from '../../dist/cjs';

const App = ({ user = {} }: { user?: any }) => {
  return (
    <React.StrictMode>
      <Condition>
        <Else>
          <h2>This text is being rendered by the element {'<Else>'} 1</h2>
        </Else>
        <Else>
          <h2>This text is being rendered by the element {'<Else>'} 2</h2>
        </Else>
        <ElseIf condition={false}>
          <h2>This text is being rendered by the element {'<ElseIf>'} 1</h2>
        </ElseIf>
        <ElseIf condition={true}>
          <h2>This text is being rendered by the element {'<ElseIf>'} 2</h2>
        </ElseIf>
        <If condition={false}>
          <h2>This text is being rendered by the element {'<If>'} 1</h2>
        </If>
        <Else>
          <h2>This text is being rendered by the element {'<Else>'} 3</h2>
        </Else>
        <ElseIf condition={false}>
          <h2>This text is being rendered by the element {'<ElseIf>'} 3</h2>
        </ElseIf>
        <If condition={user.name}>
          {() => <h2>This text is being rendered by the element {'<If>'} nome: {user.name.first}</h2>}
        </If>
      </Condition>
    </React.StrictMode>
  );
};

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(<App />);