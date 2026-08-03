import React, { useState, useEffect, useRef, type ComponentType } from 'react';
import ReactDOM from 'react-dom/client';
import { Condition, If, ElseIf, Else } from '@glhrmoura/react-conditional';
import { User, Star, Shield, LogOut, Copy, Check, ExternalLink, Mail } from 'lucide-react';
import Prism from 'prismjs';
import 'prismjs/themes/prism-okaidia.css';
import 'prismjs/components/prism-jsx';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-bash';

import './styles.css';

type UserType = 'basic' | 'vip' | 'admin' | '';

type UserOption = {
  label: string;
  value: UserType;
  description: string;
  icon: ComponentType<{ className?: string; strokeWidth?: number }>;
  accent: string;
  soft: string;
  border: string;
  dot: string;
};

const userTypes: UserOption[] = [
  {
    label: 'Basic',
    value: 'basic',
    description: 'Standard access',
    icon: User,
    accent: 'text-accent',
    soft: 'bg-accent-soft',
    border: 'border-accent/50',
    dot: 'bg-accent',
  },
  {
    label: 'VIP',
    value: 'vip',
    description: 'Priority privileges',
    icon: Star,
    accent: 'text-gold',
    soft: 'bg-gold-soft',
    border: 'border-gold/50',
    dot: 'bg-gold',
  },
  {
    label: 'Admin',
    value: 'admin',
    description: 'Full control',
    icon: Shield,
    accent: 'text-admin',
    soft: 'bg-admin-soft',
    border: 'border-admin/50',
    dot: 'bg-admin',
  },
  {
    label: 'Logout',
    value: '',
    description: 'No active session',
    icon: LogOut,
    accent: 'text-rose',
    soft: 'bg-rose-soft',
    border: 'border-rose/50',
    dot: 'bg-rose',
  },
];

type SnippetProps = {
  title: string;
  code: string;
  description: string;
  language?: string;
};

function Snippet({ title, code, description, language = 'jsx' }: SnippetProps) {
  const codeRef = useRef<HTMLElement>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (codeRef.current) {
      Prism.highlightElement(codeRef.current);
    }
  }, [code]);

  const onCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  };

  return (
    <article className="overflow-hidden rounded-2xl border border-line bg-surface transition duration-300 hover:border-line-strong">
      <div className="flex items-start justify-between gap-4 border-b border-line px-5 py-4 sm:px-6">
        <div>
          <h3 className="font-display text-lg font-semibold tracking-tight text-text">{title}</h3>
          <p className="mt-1 text-sm leading-relaxed text-muted">{description}</p>
        </div>
        <button
          type="button"
          onClick={onCopy}
          className="inline-flex shrink-0 items-center gap-1.5 rounded-lg border border-line bg-surface-raised px-2.5 py-1.5 text-xs font-medium text-muted transition hover:border-accent/40 hover:text-accent"
          aria-label="Copy code"
        >
          {copied ? <Check className="h-3.5 w-3.5" strokeWidth={2.25} /> : <Copy className="h-3.5 w-3.5" strokeWidth={2.25} />}
          {copied ? 'Copied' : 'Copy'}
        </button>
      </div>
      <div className="bg-canvas">
        <div className="flex items-center gap-1.5 border-b border-line px-5 py-3">
          <span className="h-2.5 w-2.5 rounded-full border border-rose/60 bg-rose/30" />
          <span className="h-2.5 w-2.5 rounded-full border border-gold/60 bg-gold/30" />
          <span className="h-2.5 w-2.5 rounded-full border border-accent/60 bg-accent/30" />
          <span className="ml-3 font-mono text-[11px] tracking-wide text-muted/70">{language}</span>
        </div>
        <pre>
          <code ref={codeRef} className={`language-${language}`}>
            {code}
          </code>
        </pre>
      </div>
    </article>
  );
}

function ResultPanel({ userType }: { userType: UserType }) {
  const active = userTypes.find((type) => type.value === userType) ?? userTypes[3];
  const Icon = active.icon;

  return (
    <div className={`relative overflow-hidden rounded-2xl border ${active.border} ${active.soft} px-6 py-8 text-center`}>
      <div className="pointer-events-none absolute inset-0 demo-grid opacity-30" />
      <div className="relative mx-auto flex max-w-md flex-col items-center gap-4">
        <div
          className={`flex h-14 w-14 items-center justify-center rounded-2xl border ${active.border} bg-surface ${active.accent} animate-border-pulse`}
        >
          <Icon className="h-6 w-6" strokeWidth={1.75} />
        </div>
        <Condition>
          <If case={userType === 'basic'}>
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted">Rendered branch</p>
              <h2 className="mt-2 font-display text-2xl font-semibold tracking-tight text-accent">The user is basic</h2>
            </div>
          </If>
          <ElseIf case={userType === 'vip'}>
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted">Rendered branch</p>
              <h2 className="mt-2 font-display text-2xl font-semibold tracking-tight text-gold">The user is VIP</h2>
            </div>
          </ElseIf>
          <ElseIf case={userType === 'admin'}>
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted">Rendered branch</p>
              <h2 className="mt-2 font-display text-2xl font-semibold tracking-tight text-admin">The user is admin</h2>
            </div>
          </ElseIf>
          <Else>
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted">Rendered branch</p>
              <h2 className="mt-2 font-display text-2xl font-semibold tracking-tight text-rose">There is no user</h2>
            </div>
          </Else>
        </Condition>
      </div>
    </div>
  );
}

function App() {
  const [userType, setUserType] = useState<UserType>('basic');

  return (
    <div className="flex min-h-screen w-full flex-col">
      <div className="mx-auto w-full max-w-3xl flex-1 px-4 py-10 sm:px-6 sm:py-16 lg:py-20">
      <header className="animate-rise mb-10 text-center sm:mb-14">
        <h1 className="font-display text-4xl font-bold tracking-tight text-text sm:text-5xl">
          React Conditional
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
          Declarative <code className="rounded-md border border-line bg-surface px-1.5 py-0.5 font-mono text-[0.85em] text-accent">If</code>,{' '}
          <code className="rounded-md border border-line bg-surface px-1.5 py-0.5 font-mono text-[0.85em] text-accent">ElseIf</code>, and{' '}
          <code className="rounded-md border border-line bg-surface px-1.5 py-0.5 font-mono text-[0.85em] text-accent">Else</code> components
          with clear precedence and readable JSX.
        </p>
        <a
          href="https://www.npmjs.com/package/@glhrmoura/react-conditional"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex items-center gap-2 rounded-xl border border-line bg-surface px-4 py-2.5 text-sm font-medium text-text transition hover:border-accent/50 hover:text-accent"
        >
          View on npm
          <ExternalLink className="h-3.5 w-3.5" strokeWidth={2.25} />
        </a>
      </header>

      <section className="animate-rise-delay-1 mb-12">
        <div className="mb-6">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">Getting started</p>
          <h2 className="mt-2 font-display text-2xl font-semibold tracking-tight text-text">Install</h2>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted sm:text-base">
            Add React Conditional to your project with yarn or npm.
          </p>
        </div>

        <div className="flex flex-col gap-5">
          <Snippet
            title="Yarn"
            description="Install the package using yarn."
            language="bash"
            code={`yarn add @glhrmoura/react-conditional`}
          />
          <Snippet
            title="npm"
            description="Install the package using npm."
            language="bash"
            code={`npm install @glhrmoura/react-conditional`}
          />
        </div>
      </section>

      <section className="animate-rise-delay-1 mb-12 overflow-hidden rounded-[1.75rem] border border-line bg-surface p-5 sm:p-8">
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">Live playground</p>
            <h2 className="mt-2 font-display text-2xl font-semibold tracking-tight text-text">Interactive Demo</h2>
          </div>
        </div>

        <div className="mb-3">
          <p className="mb-3 text-sm font-medium text-muted">Select a user type</p>
          <div className="grid gap-3 sm:grid-cols-2">
            {userTypes.map((type) => {
              const Icon = type.icon;
              const selected = type.value === userType;

              return (
                <label
                  key={type.label}
                  className={`group relative flex cursor-pointer items-center gap-3 rounded-2xl border px-4 py-3.5 transition duration-200 ${
                    selected
                      ? `${type.border} ${type.soft}`
                      : 'border-line bg-surface-raised hover:border-line-strong'
                  }`}
                >
                  <input
                    type="radio"
                    name="user-type"
                    value={type.value}
                    checked={selected}
                    onChange={() => setUserType(type.value)}
                    className="sr-only"
                  />
                  <span
                    className={`flex h-10 w-10 items-center justify-center rounded-xl border transition ${
                      selected
                        ? `${type.border} bg-surface ${type.accent}`
                        : 'border-line bg-canvas text-muted group-hover:text-text'
                    }`}
                  >
                    <Icon className="h-5 w-5" strokeWidth={1.75} />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className={`block text-sm font-semibold ${selected ? type.accent : 'text-text'}`}>
                      {type.label}
                    </span>
                    <span className="block text-xs text-muted">{type.description}</span>
                  </span>
                  <span
                    className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full border transition ${
                      selected ? `${type.border} bg-surface` : 'border-line-strong bg-canvas'
                    }`}
                  >
                    {selected ? <span className={`h-2 w-2 rounded-full ${type.dot}`} /> : null}
                  </span>
                </label>
              );
            })}
          </div>
        </div>

        <div className="my-6 h-px bg-line" />

        <ResultPanel userType={userType} />
      </section>

      <section className="animate-rise-delay-2">
        <div className="mb-6">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">Documentation</p>
          <h2 className="mt-2 font-display text-2xl font-semibold tracking-tight text-text">Usage Examples</h2>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted sm:text-base">
            Patterns you can drop into real apps — from simple toggles to loading, permission, and role branches.
          </p>
        </div>

        <div className="flex flex-col gap-5">
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
        </div>
      </section>
      </div>

      <footer className="mt-auto w-full border-t border-line">
        <div className="mx-auto flex w-full max-w-3xl flex-col items-center gap-3 px-4 py-6 text-xs text-muted sm:flex-row sm:justify-center sm:gap-6 sm:px-6">
          <a
            href="mailto:mouraggui@gmail.com"
            className="inline-flex items-center gap-1.5 transition hover:text-accent"
          >
            <Mail className="h-3.5 w-3.5" strokeWidth={2.25} />
            mouraggui@gmail.com
          </a>
          <a
            href="https://github.com/glhrmoura"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 transition hover:text-accent"
          >
            <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
            </svg>
            github.com/glhrmoura
          </a>
        </div>
      </footer>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
