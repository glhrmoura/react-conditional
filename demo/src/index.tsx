import React, { useState } from 'react';

import ReactDOM from 'react-dom/client';
import { If, ElseIf, Else, Condition } from '../../dist/cjs';

const App = () => {
  const [isLogged] = useState();
  const [isLoading] = useState();

  return (
    <React.StrictMode>
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
    </React.StrictMode>
  );
};

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(<App />);