import React, { useState, ChangeEvent } from 'react';

import { Condition, If, ElseIf, Else, Switch, Match, Default } from '@/lib';

const App = () => {
  const [userType, setUserType] = useState('basic');

  const onSelectUserType = ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
    setUserType(value);
  };

  return (
    <React.StrictMode>
      <h1>React Conditional Test</h1>
      <div>
        <label>
          <input
            type='radio'
            name='user-type'
            value='basic'
            onChange={onSelectUserType}
            checked={userType === 'basic'}
          />
          Basic
        </label>
        <label>
          <input
            type='radio'
            name='user-type'
            value='vip'
            onChange={onSelectUserType}
            checked={userType === 'vip'}
          />
          VIP
        </label>
        <label>
          <input
            type='radio'
            name='user-type'
            value='admin'
            onChange={onSelectUserType}
            checked={userType === 'admin'}
          />
          Admin
        </label>
        <label>
          <input
            type='radio'
            name='user-type'
            value=''
            onChange={onSelectUserType}
            checked={userType === ''}
          />
          Logged out
        </label>
      </div>

      <hr />
      
      <div>
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
            {() => <div style={{ color: 'gray' }}>❌ The user is not logged in</div>}
          </Else>
        </Condition>
      </div>

      <hr />

      <div>
        <Switch value={userType}>
          <Match when='basic'>
            <div style={{ color: 'green' }}>Switch: basic user</div>
          </Match>
          <Match when='vip'>
            <div style={{ color: 'blue' }}>Switch: vip user</div>
          </Match>
          <Match when={(value: unknown) => value === 'admin'}>
            <div style={{ color: 'red' }}>Switch: admin user</div>
          </Match>
          <Default>
            {() => <div style={{ color: 'gray' }}>Switch: logged out</div>}
          </Default>
        </Switch>
      </div>
    </React.StrictMode>
  );
};

export default App;
