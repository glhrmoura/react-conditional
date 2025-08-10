import React, { useState, ChangeEvent } from 'react';

import { Condition, If, ElseIf, Else } from '@/lib';

const App = () => {
  const [userType, setUserType] = useState('basic');

  const onSelectUserType = ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
    console.log('User type changed to:', value);
    setUserType(value);
  };

  console.log('Current user type:', userType);

  return (
    <React.StrictMode>
      <h1>React Conditional Test</h1>
      
      <div>
        <label>
          <input
            type="radio"
            name="user-type"
            value="basic"
            onChange={onSelectUserType}
            checked={userType === 'basic'}
          />
          Basic
        </label>
        <label>
          <input
            type="radio"
            name="user-type"
            value="vip"
            onChange={onSelectUserType}
            checked={userType === 'vip'}
          />
          VIP
        </label>
        <label>
          <input
            type="radio"
            name="user-type"
            value="admin"
            onChange={onSelectUserType}
            checked={userType === 'admin'}
          />
          Admin
        </label>
        <label>
          <input
            type="radio"
            name="user-type"
            value=""
            onChange={onSelectUserType}
            checked={userType === ''}
          />
          Logged out
        </label>
      </div>

      <hr />
      
      <div>
        <Condition>
          <If condition={userType === 'basic'}>
            <div style={{ color: 'green' }}>✅ The user is a basic user</div>
          </If>
          <ElseIf condition={userType === 'vip'}>
            <div style={{ color: 'blue' }}>💎 The user is a vip user</div>
          </ElseIf>
          <ElseIf condition={userType === 'admin'}>
            <div style={{ color: 'red' }}>👑 The user is an admin user</div>
          </ElseIf>
          <Else>
            <div style={{ color: 'gray' }}>❌ The user is not logged in</div>
          </Else>
        </Condition>
      </div>
    </React.StrictMode>
  );
};

export default App;