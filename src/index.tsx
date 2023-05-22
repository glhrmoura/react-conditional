import React, { useState, ChangeEvent } from 'react';

import ReactDOM from 'react-dom/client';
import { If, ElseIf, Else, Condition } from '@glhrmoura/react-conditional';

const userTypes = [
  {
    label: 'Basic',
    value: 'basic',
  },
  {
    label: 'VIP',
    value: 'vip',
  },
  {
    label: 'Admin',
    value: 'admin',
  },
  {
    label: 'Logged out',
    value: '',
  }
];

const App = () => {
  const [userType, setUserType] = useState('basic');

  const onSelectUserType = ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
    setUserType(value);
  };

  return (
    <React.StrictMode>
      <h3>
        User types:
      </h3>

      {userTypes.map((type) => (
        <div key={type.value}>
          <label htmlFor={`user-role-${type.value}`}>
            {type.label}:
          </label>

          <input
            type="radio"
            id={`user-role-${type.value}`}
            name="user-type"
            value={type.value}
            onChange={onSelectUserType}
            checked={type.value === userType}
          /> 
        </div>
      ))}

      <hr />

      <Condition>
        <If condition={userType === 'basic'}>
          <h2>The user is a basic user</h2>
        </If>
        <ElseIf condition={userType === 'vip'}>
          <h2>The user is a vip user</h2>
        </ElseIf>
        <ElseIf condition={userType === 'admin'}>
          <h2>The user is a admin user</h2>
        </ElseIf>
        <Else>
          <h2>The user is not logged</h2>
        </Else>
      </Condition>
    </React.StrictMode>
  );
};

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(<App />);