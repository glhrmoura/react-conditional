import React, { useState, useEffect, useRef, type ComponentType, type ReactNode } from 'react';
import ReactDOM from 'react-dom/client';
import {
  Condition,
  If,
  ElseIf,
  Else,
  Switch,
  Match,
  Default,
  Unless,
  Show,
  Guard,
  Exists,
  Empty,
  Every,
  Some,
  Fallback,
} from '@glhrmoura/react-conditional';
import { User, Star, Shield, LogOut, Copy, Check, ExternalLink, Mail, Menu, X } from 'lucide-react';
import Prism from 'prismjs';
import 'prismjs/themes/prism-okaidia.css';
import 'prismjs/components/prism-jsx';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-bash';

import './styles.css';

type UserType = 'basic' | 'vip' | 'admin' | '';
type TopicId =
  | 'overview'
  | 'install'
  | 'playground'
  | 'condition'
  | 'switch'
  | 'unless'
  | 'show'
  | 'guard'
  | 'exists'
  | 'empty'
  | 'compose'
  | 'fallback';

type NavItem = {
  id: TopicId;
  label: string;
  description: string;
};

type NavGroup = {
  title: string;
  items: NavItem[];
};

const navGroups: NavGroup[] = [
  {
    title: 'Start',
    items: [
      { id: 'overview', label: 'Overview', description: 'What this library does' },
      { id: 'install', label: 'Install', description: 'Add it to your project' },
    ],
  },
  {
    title: 'Try it',
    items: [
      { id: 'playground', label: 'Playground', description: 'Compare both APIs live' },
    ],
  },
  {
    title: 'API',
    items: [
      { id: 'condition', label: 'Condition', description: 'If, ElseIf, Else' },
      { id: 'switch', label: 'Switch', description: 'Match, Default' },
      { id: 'unless', label: 'Unless', description: 'Render when false' },
      { id: 'show', label: 'Show', description: 'Standalone boolean' },
      { id: 'guard', label: 'Guard', description: 'Truthy when / When' },
      { id: 'exists', label: 'Exists', description: 'Not nullish' },
      { id: 'empty', label: 'Empty', description: 'Empty values' },
      { id: 'compose', label: 'Every / Some', description: 'Combine booleans' },
      { id: 'fallback', label: 'Fallback', description: 'Required else branch' },
    ],
  },
];

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
          className="inline-flex shrink-0 cursor-pointer items-center gap-1.5 rounded-lg border border-line bg-surface-raised px-2.5 py-1.5 text-xs font-medium text-muted transition hover:border-accent/40 hover:text-accent"
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

function TopicHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div className="mb-8">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">{eyebrow}</p>
      <h2 className="mt-2 font-display text-3xl font-semibold tracking-tight text-text">{title}</h2>
      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted sm:text-base">{description}</p>
    </div>
  );
}

function ApiResultCard({
  apiLabel,
  apiHint,
  userType,
  children,
}: {
  apiLabel: string;
  apiHint: string;
  userType: UserType;
  children: ReactNode;
}) {
  const active = userTypes.find((type) => type.value === userType) ?? userTypes[3];
  const Icon = active.icon;

  return (
    <article className="overflow-hidden rounded-2xl border border-line bg-canvas">
      <header className="border-b border-line px-5 py-4">
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-accent">{apiLabel}</p>
        <p className="mt-1 font-mono text-xs text-muted">{apiHint}</p>
      </header>
      <div className={`relative px-5 py-7 text-center ${active.soft}`}>
        <div className="pointer-events-none absolute inset-0 demo-grid opacity-30" />
        <div className="relative mx-auto flex max-w-sm flex-col items-center gap-4">
          <div
            className={`flex h-12 w-12 items-center justify-center rounded-2xl border ${active.border} bg-surface ${active.accent} animate-border-pulse`}
          >
            <Icon className="h-5 w-5" strokeWidth={1.75} />
          </div>
          {children}
        </div>
      </div>
    </article>
  );
}

function UserTypePicker({
  userType,
  onChange,
}: {
  userType: UserType;
  onChange: (value: UserType) => void;
}) {
  return (
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
              onChange={() => onChange(type.value)}
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
  );
}

function OverviewTopic() {
  return (
    <div>
      <TopicHeader
        eyebrow="Start"
        title="Overview"
        description="Declarative conditional rendering for React with a slots API. Use Condition, Switch, Unless, Show, Guard, Exists, Empty, Every, Some, and Fallback."
      />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <article className="rounded-2xl border border-line bg-surface p-5">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-accent">Condition</p>
          <h3 className="mt-3 font-display text-xl font-semibold text-text">Boolean branches</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted">
            Compose <code className="font-mono text-accent">If</code>,{' '}
            <code className="font-mono text-accent">ElseIf</code>, and{' '}
            <code className="font-mono text-accent">Else</code> with clear precedence.
          </p>
        </article>
        <article className="rounded-2xl border border-line bg-surface p-5">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-accent">Switch</p>
          <h3 className="mt-3 font-display text-xl font-semibold text-text">Value matching</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted">
            Match a value, array of values, or predicate with{' '}
            <code className="font-mono text-accent">Match</code> and{' '}
            <code className="font-mono text-accent">Default</code>.
          </p>
        </article>
        <article className="rounded-2xl border border-line bg-surface p-5">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-accent">Helpers</p>
          <h3 className="mt-3 font-display text-xl font-semibold text-text">Standalone checks</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted">
            <code className="font-mono text-accent">Show</code>,{' '}
            <code className="font-mono text-accent">Guard</code>,{' '}
            <code className="font-mono text-accent">Exists</code>,{' '}
            <code className="font-mono text-accent">Empty</code>, and more without wrappers.
          </p>
        </article>
      </div>
      <a
        href="https://www.npmjs.com/package/@glhrmoura/react-conditional"
        target="_blank"
        rel="noopener noreferrer"
        className="group mt-8 inline-flex max-w-full cursor-pointer items-center gap-3 rounded-2xl border border-line bg-surface-raised px-3 py-2.5 transition duration-200 hover:border-accent/45 hover:bg-accent-soft"
      >
        <span className="shrink-0 rounded-md border border-[#9b2c2c] bg-[#cb3837] px-2 py-1 font-mono text-[11px] font-bold leading-none tracking-wide text-white">
          npm
        </span>
        <span className="min-w-0 truncate font-mono text-sm text-text transition group-hover:text-accent">
          @glhrmoura/react-conditional
        </span>
        <ExternalLink className="h-3.5 w-3.5 shrink-0 text-muted transition group-hover:text-accent" strokeWidth={2.25} />
      </a>
    </div>
  );
}

function InstallTopic() {
  return (
    <div>
      <TopicHeader
        eyebrow="Start"
        title="Install"
        description="Add React Conditional to your project with yarn or npm."
      />
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
    </div>
  );
}

function PlaygroundTopic({
  userType,
  onChange,
}: {
  userType: UserType;
  onChange: (value: UserType) => void;
}) {
  return (
    <div>
      <TopicHeader
        eyebrow="Try it"
        title="Playground"
        description="One shared input drives Condition and Switch side by side so you can compare both APIs."
      />
      <div className="overflow-hidden rounded-[1.75rem] border border-line bg-surface">
        <div className="border-b border-line p-5 sm:p-8">
          <p className="mb-3 text-sm font-medium text-muted">Shared input</p>
          <UserTypePicker userType={userType} onChange={onChange} />
        </div>
        <div className="p-5 sm:p-8">
          <p className="mb-4 text-sm font-medium text-muted">API output</p>
          <div className="grid gap-4 lg:grid-cols-2">
            <ApiResultCard apiLabel="Condition" apiHint="If → ElseIf → Else" userType={userType}>
              <Condition>
                <If case={userType === 'basic'}>
                  <div>
                    <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted">Rendered branch</p>
                    <h3 className="mt-2 font-display text-xl font-semibold tracking-tight text-accent">The user is basic</h3>
                  </div>
                </If>
                <ElseIf case={userType === 'vip'}>
                  <div>
                    <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted">Rendered branch</p>
                    <h3 className="mt-2 font-display text-xl font-semibold tracking-tight text-gold">The user is VIP</h3>
                  </div>
                </ElseIf>
                <ElseIf case={userType === 'admin'}>
                  <div>
                    <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted">Rendered branch</p>
                    <h3 className="mt-2 font-display text-xl font-semibold tracking-tight text-admin">The user is admin</h3>
                  </div>
                </ElseIf>
                <Else>
                  <div>
                    <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted">Rendered branch</p>
                    <h3 className="mt-2 font-display text-xl font-semibold tracking-tight text-rose">There is no user</h3>
                  </div>
                </Else>
              </Condition>
            </ApiResultCard>

            <ApiResultCard apiLabel="Switch" apiHint="Match → Default" userType={userType}>
              <Switch value={userType}>
                <Match when="basic">
                  <div>
                    <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted">Matched value</p>
                    <h3 className="mt-2 font-display text-xl font-semibold tracking-tight text-accent">Matched basic</h3>
                  </div>
                </Match>
                <Match when="vip">
                  <div>
                    <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted">Matched value</p>
                    <h3 className="mt-2 font-display text-xl font-semibold tracking-tight text-gold">Matched VIP</h3>
                  </div>
                </Match>
                <Match when={(value: unknown) => value === 'admin'}>
                  <div>
                    <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted">Matched value</p>
                    <h3 className="mt-2 font-display text-xl font-semibold tracking-tight text-admin">Matched admin</h3>
                  </div>
                </Match>
                <Default>
                  <div>
                    <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted">Matched value</p>
                    <h3 className="mt-2 font-display text-xl font-semibold tracking-tight text-rose">Default branch</h3>
                  </div>
                </Default>
              </Switch>
            </ApiResultCard>
          </div>
        </div>
      </div>
    </div>
  );
}

function ConditionTopic() {
  return (
    <div>
      <TopicHeader
        eyebrow="API"
        title="Condition"
        description="Boolean conditional rendering. Precedence is always If → ElseIf → Else, regardless of children order."
      />
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
);`}
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
    </div>
  );
}

function SwitchTopic() {
  return (
    <div>
      <TopicHeader
        eyebrow="API"
        title="Switch"
        description="Value-based matching. The first matching Match wins; otherwise Default is rendered. when accepts an exact value, an array of values, or a predicate."
      />
      <div className="flex flex-col gap-5">
        <Snippet
          title="Switch Matching"
          description="Match against a value with Switch, Match, and Default."
          code={`import { Switch, Match, Default } from '@glhrmoura/react-conditional';

const App = ({ status }) => (
  <Switch value={status}>
    <Match when='loading'>Loading...</Match>
    <Match when={['error', 'failed']}>Something went wrong</Match>
    <Match when={(value) => value === 'success'}>Done</Match>
    <Default>Unknown status</Default>
  </Switch>
);`}
        />
        <Snippet
          title="Order Independence"
          description="Match and Default can appear in any order. The first matching Match still wins."
          code={`import { Switch, Match, Default } from '@glhrmoura/react-conditional';

const App = ({ role }) => (
  <Switch value={role}>
    <Default>Guest</Default>
    <Match when='admin'>Administrator</Match>
    <Match when={(value) => value === 'editor'}>Editor</Match>
  </Switch>
);`}
        />
      </div>
    </div>
  );
}

function UnlessTopic() {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div>
      <TopicHeader
        eyebrow="API"
        title="Unless"
        description="Render children only when case is false. Useful for guard clauses without wrapping in Condition."
      />

      <div className="mb-8 overflow-hidden rounded-[1.75rem] border border-line bg-surface">
        <div className="border-b border-line p-5 sm:p-8">
          <p className="mb-3 text-sm font-medium text-muted">Toggle loading</p>
          <button
            type="button"
            onClick={() => setIsLoading((value) => !value)}
            className="cursor-pointer rounded-xl border border-line bg-surface-raised px-4 py-2.5 text-sm font-medium text-text transition hover:border-accent/40 hover:text-accent"
          >
            isLoading = {String(isLoading)}
          </button>
        </div>
        <div className="p-5 sm:p-8">
          <p className="mb-4 text-sm font-medium text-muted">Output</p>
          <div className="rounded-2xl border border-line bg-canvas px-5 py-6 text-center">
            <Unless case={isLoading}>
              <p className="font-display text-xl font-semibold text-accent">Content is visible</p>
            </Unless>
            <Unless case={!isLoading}>
              <p className="font-display text-xl font-semibold text-gold">Hidden while loading is false</p>
            </Unless>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-5">
        <Snippet
          title="Basic Unless"
          description="Render content only when the case is false."
          code={`import { Unless } from '@glhrmoura/react-conditional';

const App = ({ isLoading }) => (
  <Unless case={isLoading}>
    <Content />
  </Unless>
);`}
        />
        <Snippet
          title="With Function Children"
          description="Lazy-evaluate children when the inverted case matches."
          code={`import { Unless } from '@glhrmoura/react-conditional';

const App = ({ error }) => (
  <Unless case={!error}>
    {() => <ErrorBanner message={error.message} />}
  </Unless>
);`}
        />
      </div>
    </div>
  );
}

function ShowTopic() {
  const [isLogged, setIsLogged] = useState(true);

  return (
    <div>
      <TopicHeader
        eyebrow="API"
        title="Show"
        description="Standalone boolean render with an optional fallback. No Condition wrapper required."
      />
      <div className="mb-8 overflow-hidden rounded-[1.75rem] border border-line bg-surface">
        <div className="border-b border-line p-5 sm:p-8">
          <button
            type="button"
            onClick={() => setIsLogged((value) => !value)}
            className="cursor-pointer rounded-xl border border-line bg-surface-raised px-4 py-2.5 text-sm font-medium text-text transition hover:border-accent/40 hover:text-accent"
          >
            isLogged = {String(isLogged)}
          </button>
        </div>
        <div className="p-5 sm:p-8">
          <div className="rounded-2xl border border-line bg-canvas px-5 py-6 text-center">
            <Show case={isLogged} fallback={<p className="font-display text-xl font-semibold text-rose">Login prompt</p>}>
              <p className="font-display text-xl font-semibold text-accent">Dashboard</p>
            </Show>
          </div>
        </div>
      </div>
      <Snippet
        title="Show with fallback"
        description="Render children when case is true, otherwise fallback."
        code={`import { Show } from '@glhrmoura/react-conditional';

const App = ({ isLogged }) => (
  <Show case={isLogged} fallback={<LoginPrompt />}>
    <Dashboard />
  </Show>
);`}
      />
    </div>
  );
}

function GuardTopic() {
  const [user, setUser] = useState<{ name: string } | null>({ name: 'Ada' });

  return (
    <div>
      <TopicHeader
        eyebrow="API"
        title="Guard / When"
        description="Render when when is truthy. When is an alias of Guard."
      />
      <div className="mb-8 overflow-hidden rounded-[1.75rem] border border-line bg-surface">
        <div className="border-b border-line p-5 sm:p-8">
          <button
            type="button"
            onClick={() => setUser((value) => (value ? null : { name: 'Ada' }))}
            className="cursor-pointer rounded-xl border border-line bg-surface-raised px-4 py-2.5 text-sm font-medium text-text transition hover:border-accent/40 hover:text-accent"
          >
            user = {user ? user.name : 'null'}
          </button>
        </div>
        <div className="p-5 sm:p-8">
          <div className="rounded-2xl border border-line bg-canvas px-5 py-6 text-center">
            <Guard when={user} fallback={<p className="font-display text-xl font-semibold text-rose">Guest</p>}>
              {() => <p className="font-display text-xl font-semibold text-accent">Hello, {user!.name}</p>}
            </Guard>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-5">
        <Snippet
          title="Guard"
          description="Truthy check with optional fallback."
          code={`import { Guard } from '@glhrmoura/react-conditional';

const App = ({ user }) => (
  <Guard when={user} fallback={<Guest />}>
    {() => <Profile name={user.name} />}
  </Guard>
);`}
        />
        <Snippet
          title="When alias"
          description="When is the same component as Guard."
          code={`import { When } from '@glhrmoura/react-conditional';

const App = ({ user }) => (
  <When when={user?.isAdmin}>
    <AdminPanel />
  </When>
);`}
        />
      </div>
    </div>
  );
}

function ExistsTopic() {
  const [user, setUser] = useState<{ name: string } | null>({ name: 'Ada' });

  return (
    <div>
      <TopicHeader
        eyebrow="API"
        title="Exists"
        description="Render when value is not null or undefined. Unlike Guard, 0 and empty string still count as existing."
      />
      <div className="mb-8 overflow-hidden rounded-[1.75rem] border border-line bg-surface">
        <div className="border-b border-line p-5 sm:p-8">
          <button
            type="button"
            onClick={() => setUser((value) => (value ? null : { name: 'Ada' }))}
            className="cursor-pointer rounded-xl border border-line bg-surface-raised px-4 py-2.5 text-sm font-medium text-text transition hover:border-accent/40 hover:text-accent"
          >
            user = {user ? 'object' : 'null'}
          </button>
        </div>
        <div className="p-5 sm:p-8">
          <div className="rounded-2xl border border-line bg-canvas px-5 py-6 text-center">
            <Exists value={user} fallback={<p className="font-display text-xl font-semibold text-rose">Missing</p>}>
              {() => <p className="font-display text-xl font-semibold text-accent">{user!.name}</p>}
            </Exists>
          </div>
        </div>
      </div>
      <Snippet
        title="Exists"
        description="Nullish check with optional fallback."
        code={`import { Exists } from '@glhrmoura/react-conditional';

const App = ({ user }) => (
  <Exists value={user} fallback={<Guest />}>
    {() => <Profile name={user.name} />}
  </Exists>
);`}
      />
    </div>
  );
}

function EmptyTopic() {
  const [items, setItems] = useState<string[]>([]);

  return (
    <div>
      <TopicHeader
        eyebrow="API"
        title="Empty"
        description="Render when value is empty: null, undefined, '', [], or {}."
      />
      <div className="mb-8 overflow-hidden rounded-[1.75rem] border border-line bg-surface">
        <div className="border-b border-line p-5 sm:p-8">
          <button
            type="button"
            onClick={() => setItems((value) => (value.length ? [] : ['one', 'two']))}
            className="cursor-pointer rounded-xl border border-line bg-surface-raised px-4 py-2.5 text-sm font-medium text-text transition hover:border-accent/40 hover:text-accent"
          >
            items.length = {items.length}
          </button>
        </div>
        <div className="p-5 sm:p-8">
          <div className="rounded-2xl border border-line bg-canvas px-5 py-6 text-center">
            <Empty value={items} fallback={<p className="font-display text-xl font-semibold text-accent">{items.join(', ')}</p>}>
              <p className="font-display text-xl font-semibold text-gold">Empty state</p>
            </Empty>
          </div>
        </div>
      </div>
      <Snippet
        title="Empty"
        description="Show empty UI when the value has no content."
        code={`import { Empty } from '@glhrmoura/react-conditional';

const App = ({ items }) => (
  <Empty value={items} fallback={<ItemList items={items} />}>
    <EmptyState />
  </Empty>
);`}
      />
    </div>
  );
}

function ComposeTopic() {
  const [isLogged, setIsLogged] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  return (
    <div>
      <TopicHeader
        eyebrow="API"
        title="Every / Some"
        description="Combine multiple boolean cases with AND (Every) or OR (Some)."
      />
      <div className="mb-8 overflow-hidden rounded-[1.75rem] border border-line bg-surface">
        <div className="flex flex-wrap gap-3 border-b border-line p-5 sm:p-8">
          <button
            type="button"
            onClick={() => setIsLogged((value) => !value)}
            className="cursor-pointer rounded-xl border border-line bg-surface-raised px-4 py-2.5 text-sm font-medium text-text transition hover:border-accent/40 hover:text-accent"
          >
            isLogged = {String(isLogged)}
          </button>
          <button
            type="button"
            onClick={() => setIsAdmin((value) => !value)}
            className="cursor-pointer rounded-xl border border-line bg-surface-raised px-4 py-2.5 text-sm font-medium text-text transition hover:border-accent/40 hover:text-accent"
          >
            isAdmin = {String(isAdmin)}
          </button>
        </div>
        <div className="grid gap-4 p-5 sm:grid-cols-2 sm:p-8">
          <div className="rounded-2xl border border-line bg-canvas px-5 py-6 text-center">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-muted">Every</p>
            <Every cases={[isLogged, isAdmin]} fallback={<p className="font-display text-lg font-semibold text-rose">Forbidden</p>}>
              <p className="font-display text-lg font-semibold text-accent">Admin panel</p>
            </Every>
          </div>
          <div className="rounded-2xl border border-line bg-canvas px-5 py-6 text-center">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-muted">Some</p>
            <Some cases={[isLogged, isAdmin]} fallback={<p className="font-display text-lg font-semibold text-rose">No access</p>}>
              <p className="font-display text-lg font-semibold text-accent">Feature banner</p>
            </Some>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-5">
        <Snippet
          title="Every"
          description="All cases must be true."
          code={`import { Every } from '@glhrmoura/react-conditional';

const App = ({ isLogged, isAdmin }) => (
  <Every cases={[isLogged, isAdmin]} fallback={<Forbidden />}>
    <AdminPanel />
  </Every>
);`}
        />
        <Snippet
          title="Some"
          description="At least one case must be true."
          code={`import { Some } from '@glhrmoura/react-conditional';

const App = ({ isLogged, hasFlag }) => (
  <Some cases={[isLogged, hasFlag]}>
    <FeatureBanner />
  </Some>
);`}
        />
      </div>
    </div>
  );
}

function FallbackTopic() {
  const [ready, setReady] = useState(false);

  return (
    <div>
      <TopicHeader
        eyebrow="API"
        title="Fallback"
        description="Always provide a fallback branch when case is false."
      />
      <div className="mb-8 overflow-hidden rounded-[1.75rem] border border-line bg-surface">
        <div className="border-b border-line p-5 sm:p-8">
          <button
            type="button"
            onClick={() => setReady((value) => !value)}
            className="cursor-pointer rounded-xl border border-line bg-surface-raised px-4 py-2.5 text-sm font-medium text-text transition hover:border-accent/40 hover:text-accent"
          >
            ready = {String(ready)}
          </button>
        </div>
        <div className="p-5 sm:p-8">
          <div className="rounded-2xl border border-line bg-canvas px-5 py-6 text-center">
            <Fallback case={ready} fallback={<p className="font-display text-xl font-semibold text-gold">Spinner</p>}>
              <p className="font-display text-xl font-semibold text-accent">Ready view</p>
            </Fallback>
          </div>
        </div>
      </div>
      <Snippet
        title="Fallback"
        description="Required fallback when case is false."
        code={`import { Fallback } from '@glhrmoura/react-conditional';

const App = ({ data }) => (
  <Fallback case={Boolean(data)} fallback={<Spinner />}>
    {() => <View data={data} />}
  </Fallback>
);`}
      />
    </div>
  );
}

function SidebarNav({
  topic,
  onSelect,
}: {
  topic: TopicId;
  onSelect: (id: TopicId) => void;
}) {
  return (
    <nav className="flex flex-col gap-7" aria-label="Topics">
      {navGroups.map((group) => (
        <div key={group.title}>
          <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.24em] text-muted/55">
            {group.title}
          </p>
          <ul className="flex flex-col">
            {group.items.map((item) => {
              const active = topic === item.id;
              return (
                <li key={item.id}>
                  <button
                    type="button"
                    onClick={() => onSelect(item.id)}
                    className={`w-full cursor-pointer border-l-2 py-2.5 pl-3 text-left transition ${
                      active
                        ? 'border-accent bg-accent-soft/60 text-accent'
                        : 'border-transparent text-text hover:border-line-strong hover:bg-surface-raised'
                    }`}
                  >
                    <span className="block text-sm font-semibold tracking-tight">{item.label}</span>
                    <span className={`mt-0.5 block text-xs leading-snug ${active ? 'text-accent/75' : 'text-muted'}`}>
                      {item.description}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </nav>
  );
}

function App() {
  const [topic, setTopic] = useState<TopicId>('overview');
  const [userType, setUserType] = useState<UserType>('basic');
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const onSelectTopic = (id: TopicId) => {
    setTopic(id);
    setMobileNavOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="flex min-h-screen w-full flex-col">
      <div className="mx-auto flex w-full max-w-6xl flex-1 gap-0 px-4 py-6 sm:px-6 lg:gap-10 lg:py-10">
        <aside className="hidden w-60 shrink-0 lg:block">
          <div className="sticky top-8">
            <div className="mb-8">
              <p className="font-display text-lg font-bold tracking-tight text-text">React Conditional</p>
              <p className="mt-1 text-xs text-muted">Docs & playground</p>
            </div>
            <SidebarNav topic={topic} onSelect={onSelectTopic} />
          </div>
        </aside>

        <div className="min-w-0 flex-1">
          <div className="mb-6 flex items-center justify-between gap-3 lg:hidden">
            <div>
              <p className="font-display text-lg font-bold tracking-tight text-text">React Conditional</p>
              <p className="text-xs text-muted">Docs & playground</p>
            </div>
            <button
              type="button"
              onClick={() => setMobileNavOpen((open) => !open)}
              className="inline-flex cursor-pointer items-center gap-2 rounded-xl border border-line bg-surface px-3 py-2 text-sm text-muted"
              aria-expanded={mobileNavOpen}
              aria-label="Toggle topics"
            >
              {mobileNavOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
              Topics
            </button>
          </div>

          {mobileNavOpen ? (
            <div className="mb-6 rounded-2xl border border-line bg-surface p-4 lg:hidden">
              <SidebarNav topic={topic} onSelect={onSelectTopic} />
            </div>
          ) : null}

          <main>
            <Condition>
              <If case={topic === 'overview'}>
                <OverviewTopic />
              </If>
              <ElseIf case={topic === 'install'}>
                <InstallTopic />
              </ElseIf>
              <ElseIf case={topic === 'playground'}>
                <PlaygroundTopic userType={userType} onChange={setUserType} />
              </ElseIf>
              <ElseIf case={topic === 'condition'}>
                <ConditionTopic />
              </ElseIf>
              <ElseIf case={topic === 'switch'}>
                <SwitchTopic />
              </ElseIf>
              <ElseIf case={topic === 'unless'}>
                <UnlessTopic />
              </ElseIf>
              <ElseIf case={topic === 'show'}>
                <ShowTopic />
              </ElseIf>
              <ElseIf case={topic === 'guard'}>
                <GuardTopic />
              </ElseIf>
              <ElseIf case={topic === 'exists'}>
                <ExistsTopic />
              </ElseIf>
              <ElseIf case={topic === 'empty'}>
                <EmptyTopic />
              </ElseIf>
              <ElseIf case={topic === 'compose'}>
                <ComposeTopic />
              </ElseIf>
              <Else>
                <FallbackTopic />
              </Else>
            </Condition>
          </main>
        </div>
      </div>

      <footer className="mt-auto w-full border-t border-line">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-3 px-4 py-6 text-xs text-muted sm:flex-row sm:justify-center sm:gap-6 sm:px-6">
          <a
            href="mailto:mouraggui@gmail.com"
            className="inline-flex cursor-pointer items-center gap-1.5 transition hover:text-accent"
          >
            <Mail className="h-3.5 w-3.5" strokeWidth={2.25} />
            mouraggui@gmail.com
          </a>
          <a
            href="https://github.com/glhrmoura"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex cursor-pointer items-center gap-1.5 transition hover:text-accent"
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
