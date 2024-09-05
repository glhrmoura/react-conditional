import React, { useState, ChangeEvent } from 'react';

import { Condition } from '@/lib';

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
        <div rc-if={userType === 'basic'}>
          <h2>The user is a basic user</h2>
        </div>
        <div rc-else-if={userType === 'vip'}>
          <h2>The user is a vip user</h2>
        </div>
        <div rc-else-if={userType === 'admin'}>
          <h2>The user is a admin user</h2>
        </div>
        <div rc-else>
          <h2>The user is not logged</h2>
        </div>
      </Condition>
    </React.StrictMode>
  );
};

export default App;