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
        <h3>Current user type: {userType || 'none'}</h3>
        
        <h4>Simple test:</h4>
        {userType === 'basic' && <div style={{ color: 'green' }}>✅ Basic user</div>}
        {userType === 'vip' && <div style={{ color: 'blue' }}>💎 VIP user</div>}
        {userType === 'admin' && <div style={{ color: 'red' }}>👑 Admin user</div>}
        {!userType && <div style={{ color: 'gray' }}>❌ Not logged in</div>}
        
        <h4>Conditional rendering test:</h4>
        <Condition>
          <If case={true}>
            <div style={{ color: 'purple' }}>🔧 Always show this (test)</div>
          </If>
        </Condition>
        
        <h4>Full conditional rendering:</h4>
        <Condition>
          <If case={userType === 'basic'}>
            <div style={{ color: 'green' }}>✅ The user is a basic user</div>
          </If>
          <ElseIf case={userType === 'vip'}>
            <div style={{ color: 'blue' }}>💎 The user is a vip user</div>
          </ElseIf>
          <ElseIf case={userType === 'admin'}>
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