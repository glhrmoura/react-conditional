import React, { useState, ChangeEvent } from 'react';

import ReactDOM from 'react-dom/client';
import { Condition } from '@glhrmoura/react-conditional';

import './styles.css';

const userTypes = [
  { label: 'Basic', value: 'basic' },
  { label: 'VIP', value: 'vip' },
  { label: 'Admin', value: 'admin' },
  { label: 'Logout', value: '' }
];

const App = () => {
  const [userType, setUserType] = useState('basic');

  const onSelectUserType = ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
    setUserType(value);
  };

  return (
    <React.StrictMode>
      <div className="container">
        <h3>User types:</h3>
        <div className="user-type-container">
          {userTypes.map((type) => (
            <div className="user-type" key={type.value}>
              <input
                type="radio"
                id={`user-role-${type.value}`}
                name="user-type"
                value={type.value}
                onChange={onSelectUserType}
                checked={type.value === userType}
              />
              <label htmlFor={`user-role-${type.value}`}>{type.label}</label>
            </div>
          ))}
        </div>
        <hr />
        <div className="result-container">
          <Condition>
            <h2 rc-if={userType === 'basic'}>The user is a basic</h2>
            <h2 rc-else-if={userType === 'vip'}>The user is a vip</h2>
            <h2 rc-else-if={userType === 'admin'}>The user is an admin</h2>
            <h2 rc-else>There is no user</h2>
          </Condition>
        </div>
      </div>
    </React.StrictMode>
  );
};

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(<App />);
