import React, { useState, ChangeEvent, useEffect, useRef } from 'react';

import ReactDOM from 'react-dom/client';
import { Condition, If, ElseIf, Else } from '@glhrmoura/react-conditional';
import Prism from 'prismjs';
import 'prismjs/themes/prism-tomorrow.css';
import 'prismjs/components/prism-jsx';
import 'prismjs/components/prism-typescript';

import './styles.css';

const userTypes = [
  { label: '👤 Basic', value: 'basic' },
  { label: '⭐ VIP', value: 'vip' },
  { label: '👑 Admin', value: 'admin' },
  { label: '🚪 Logout', value: '' }
];

interface SnippetProps {
  title: string;
  code: string;
  description: string;
  language?: string;
}

export function Snippet({ title, code, description, language = 'jsx' }: SnippetProps) {
  const codeRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (codeRef.current) {
      Prism.highlightElement(codeRef.current);
    }
  }, [code]);

  return (
    <div className="code-example">
      <h3>{title}</h3>
      <p>{description}</p>
      <pre>
        <code ref={codeRef} className={`language-${language}`}>
          {code}
        </code>
      </pre>
    </div>
  );
}

export default function App() {
  const [userType, setUserType] = useState('basic');

  const onSelectUserType = ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
    setUserType(value);
  };

  return (
    <React.StrictMode>
      <div className="container">
        <h1>React Conditional Library</h1>
        
        <section className="demo-section">
          <h2>Interactive Demo</h2>
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
              <If case={userType === 'basic'}>
                <h2>👤 The user is a basic</h2>
              </If>
              <ElseIf case={userType === 'vip'}>
                <h2>⭐ The user is a vip</h2>
              </ElseIf>
              <ElseIf case={userType === 'admin'}>
                <h2>👑 The user is an admin</h2>
              </ElseIf>
              <Else>
                <h2>🚪 There is no user</h2>
              </Else>
            </Condition>
          </div>
        </section>

        <section className="usage-section">
          <h2>Usage Examples</h2>
          
          <Snippet
            title="Basic Usage"
            description="Simple conditional rendering with If and Else components."
            code={`import { Condition, If, Else } from '@glhrmoura/react-conditional';

const App = ({ isLogged }) => (
  <Condition>
    <If case={isLogged}>
      <h1>Welcome back!</h1>
    </If>
    <Else>
      <h1>Please log in</h1>
    </Else>
  </Condition>
);`}
          />

          <Snippet
            title="Multiple Conditions"
            description="Using ElseIf for additional conditional branches."
            code={`import { Condition, If, ElseIf, Else } from '@glhrmoura/react-conditional';

const App = ({ userRole }) => (
  <Condition>
    <If case={userRole === 'admin'}>
      <AdminDashboard />
    </If>
    <ElseIf case={userRole === 'moderator'}>
      <ModeratorPanel />
    </ElseIf>
    <ElseIf case={userRole === 'user'}>
      <UserProfile />
    </ElseIf>
    <Else>
      <LoginForm />
    </Else>
  </Condition>
);`}
          />

          <Snippet
            title="Loading States"
            description="Common pattern for handling loading and error states."
            code={`import { Condition, If, ElseIf, Else } from '@glhrmoura/react-conditional';

const App = ({ data, isLoading, error }) => (
  <Condition>
    <If case={isLoading}>
      <LoadingSpinner />
    </If>
    <ElseIf case={error}>
      <ErrorMessage error={error} />
    </ElseIf>
    <Else>
      <DataDisplay data={data} />
    </Else>
  </Condition>
);`}
          />

          <Snippet
            title="Order Independence"
            description="Components work regardless of their order in JSX. Precedence is always maintained."
            code={`import { Condition, If, ElseIf, Else } from '@glhrmoura/react-conditional';

const App = ({ isLogged }) => (
  <Condition>
    <Else>Fallback content</Else>
    <If case={isLogged}>
      User is logged in
    </If>
    <ElseIf case={false}>
      This won't render
    </ElseIf>
  </Condition>
);

// Precedence: If → ElseIf → Else`}
          />

          <Snippet
            title="Complex User Interface"
            description="Real-world example with multiple conditions and complex UI."
            code={`import { Condition, If, ElseIf, Else } from '@glhrmoura/react-conditional';

const UserDashboard = ({ user, isLoading, hasPermission }) => (
  <div className="dashboard">
    <Condition>
      <If case={isLoading}>
        <div className="loading">
          <Spinner />
          <p>Loading user data...</p>
        </div>
      </If>
      <ElseIf case={!user}>
        <div className="error">
          <h2>User not found</h2>
          <button onClick={handleLogin}>Login</button>
        </div>
      </ElseIf>
      <ElseIf case={!hasPermission}>
        <div className="unauthorized">
          <h2>Access Denied</h2>
          <p>You don't have permission to view this content.</p>
        </div>
      </ElseIf>
      <Else>
        <div className="user-content">
          <h1>Welcome, {user.name}!</h1>
          <UserProfile user={user} />
          <UserActions user={user} />
        </div>
      </Else>
    </Condition>
  </div>
);`}
          />
        </section>
      </div>
    </React.StrictMode>
  );
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(<App />);
