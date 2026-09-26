import React, {
  useState,
  useEffect,
  useRef,
  type ComponentType,
  type ReactNode,
} from "react";
import ReactDOM from "react-dom/client";
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
  Either,
  Then,
  Otherwise,
  Toggle,
  Compare,
  Includes,
  Once,
  Lazy,
  Portal,
  ErrorBoundary,
  Async,
  Pending,
  Resolved,
  Rejected,
  Permission,
  PermissionProvider,
  Media,
  Feature,
  FeatureProvider,
  useMatch,
  useCompare,
  useMedia,
  usePermission,
  useFeature,
} from "@glhrmoura/react-conditional";
import {
  User,
  Star,
  Shield,
  LogOut,
  Copy,
  Check,
  ExternalLink,
  Mail,
  Menu,
  X,
  ArrowRight,
} from "lucide-react";
import Prism from "prismjs";
import "prismjs/themes/prism-okaidia.css";
import "prismjs/components/prism-jsx";
import "prismjs/components/prism-typescript";
import "prismjs/components/prism-bash";

import "./styles.css";

type UserType = "basic" | "vip" | "admin" | "";
type TopicId =
  | "overview"
  | "install"
  | "playground"
  | "condition"
  | "switch"
  | "unless"
  | "show"
  | "guard"
  | "exists"
  | "empty"
  | "compose"
  | "fallback"
  | "either"
  | "compare"
  | "once"
  | "portal"
  | "error-boundary"
  | "async"
  | "permission"
  | "media"
  | "feature"
  | "hooks";

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
    title: "Start",
    items: [
      {
        id: "overview",
        label: "Overview",
        description: "What this library does",
      },
      {
        id: "install",
        label: "Install",
        description: "Add it to your project",
      },
    ],
  },
  {
    title: "Try it",
    items: [
      {
        id: "playground",
        label: "Playground",
        description: "Compare both APIs live",
      },
    ],
  },
  {
    title: "Condition",
    items: [
      { id: "condition", label: "Condition", description: "If, ElseIf, Else" },
    ],
  },
  {
    title: "Switch",
    items: [{ id: "switch", label: "Switch", description: "Match, Default" }],
  },
  {
    title: "Helpers",
    items: [
      {
        id: "compare",
        label: "Compare / Includes",
        description: "Relations & lists",
      },
      {
        id: "either",
        label: "Either / Toggle",
        description: "Binary branches",
      },
      { id: "empty", label: "Empty", description: "Empty values" },
      {
        id: "error-boundary",
        label: "ErrorBoundary",
        description: "Catch child errors",
      },
      { id: "compose", label: "Every / Some", description: "Combine booleans" },
      { id: "exists", label: "Exists", description: "Not nullish" },
      {
        id: "fallback",
        label: "Fallback",
        description: "Required else branch",
      },
      { id: "guard", label: "Guard", description: "Truthy when / When" },
      { id: "hooks", label: "Hooks", description: "Logic outside JSX" },
      { id: "once", label: "Once / Lazy", description: "Sticky and cached" },
      { id: "portal", label: "Portal", description: "Conditional portal" },
      { id: "show", label: "Show", description: "Standalone boolean" },
      { id: "unless", label: "Unless", description: "Render when false" },
    ],
  },
  {
    title: "Async",
    items: [
      { id: "async", label: "Async / Await", description: "Promise slots" },
    ],
  },
  {
    title: "Access",
    items: [
      { id: "feature", label: "Feature", description: "Feature flags" },
      { id: "media", label: "Media", description: "Viewport min / max" },
      {
        id: "permission",
        label: "Permission",
        description: "can, role, and mode",
      },
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
    label: "Basic",
    value: "basic",
    description: "Standard access",
    icon: User,
    accent: "text-accent",
    soft: "bg-accent-soft",
    border: "border-accent/50",
    dot: "bg-accent",
  },
  {
    label: "VIP",
    value: "vip",
    description: "Priority privileges",
    icon: Star,
    accent: "text-gold",
    soft: "bg-gold-soft",
    border: "border-gold/50",
    dot: "bg-gold",
  },
  {
    label: "Admin",
    value: "admin",
    description: "Full control",
    icon: Shield,
    accent: "text-admin",
    soft: "bg-admin-soft",
    border: "border-admin/50",
    dot: "bg-admin",
  },
  {
    label: "Logout",
    value: "",
    description: "No active session",
    icon: LogOut,
    accent: "text-rose",
    soft: "bg-rose-soft",
    border: "border-rose/50",
    dot: "bg-rose",
  },
];

type SnippetProps = {
  title: string;
  code: string;
  description?: string;
  language?: string;
};

function Snippet({ title, code, description, language = "jsx" }: SnippetProps) {
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
          <h3 className="font-display text-lg font-semibold tracking-tight text-text">
            {title}
          </h3>
          <p className="mt-1 text-sm leading-relaxed text-muted">
            {description}
          </p>
        </div>
        <button
          type="button"
          onClick={onCopy}
          className="inline-flex shrink-0 cursor-pointer items-center gap-1.5 rounded-lg border border-line bg-surface-raised px-2.5 py-1.5 text-xs font-medium text-muted transition hover:border-accent/40 hover:text-accent"
          aria-label="Copy code"
        >
          {copied ? (
            <Check className="h-3.5 w-3.5" strokeWidth={2.25} />
          ) : (
            <Copy className="h-3.5 w-3.5" strokeWidth={2.25} />
          )}
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      <div className="bg-canvas">
        <div className="flex items-center gap-1.5 border-b border-line px-5 py-3">
          <span className="h-2.5 w-2.5 rounded-full border border-rose/60 bg-rose/30" />
          <span className="h-2.5 w-2.5 rounded-full border border-gold/60 bg-gold/30" />
          <span className="h-2.5 w-2.5 rounded-full border border-accent/60 bg-accent/30" />
          <span className="ml-3 font-mono text-[11px] tracking-wide text-muted/70">
            {language}
          </span>
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
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
        {eyebrow}
      </p>
      <h2 className="mt-2 font-display text-3xl font-semibold tracking-tight text-text">
        {title}
      </h2>
      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted sm:text-base">
        {description}
      </p>
    </div>
  );
}

function Purpose({ items }: { items: { name: string; text: string }[] }) {
  return (
    <section className="mb-8" aria-label="What it is for">
      <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-muted">
        What it is for
      </p>
      <div className="grid gap-3">
        {items.map((item) => (
          <div
            key={item.name}
            className="rounded-2xl border border-line bg-surface px-5 py-4"
          >
            <p className="font-mono text-sm font-semibold text-accent">
              {item.name}
            </p>
            <p className="mt-1.5 text-sm leading-relaxed text-muted">
              {item.text}
            </p>
          </div>
        ))}
      </div>
    </section>
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
  const active =
    userTypes.find((type) => type.value === userType) ?? userTypes[3];
  const Icon = active.icon;

  return (
    <article className="overflow-hidden rounded-2xl border border-line bg-canvas">
      <header className="border-b border-line px-5 py-4">
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-accent">
          {apiLabel}
        </p>
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
                : "border-line bg-surface-raised hover:border-line-strong"
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
                  : "border-line bg-canvas text-muted group-hover:text-text"
              }`}
            >
              <Icon className="h-5 w-5" strokeWidth={1.75} />
            </span>
            <span className="min-w-0 flex-1">
              <span
                className={`block text-sm font-semibold ${selected ? type.accent : "text-text"}`}
              >
                {type.label}
              </span>
              <span className="block text-xs text-muted">
                {type.description}
              </span>
            </span>
            <span
              className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full border transition ${
                selected
                  ? `${type.border} bg-surface`
                  : "border-line-strong bg-canvas"
              }`}
            >
              {selected ? (
                <span className={`h-2 w-2 rounded-full ${type.dot}`} />
              ) : null}
            </span>
          </label>
        );
      })}
    </div>
  );
}

const overviewCards: { group: string; headline: string; text: string }[] = [
  {
    group: "Condition",
    headline: "Boolean branches",
    text: "Use it when the question is yes or no and only one branch should render, such as loading, an error, or the page.",
  },
  {
    group: "Switch",
    headline: "Value matching",
    text: "Use it when you already have a status, role, or code and each value should render its own UI.",
  },
  {
    group: "Async",
    headline: "Promise slots",
    text: "Use it to show a spinner, the data, or the error from one promise.",
  },
  {
    group: "Helpers",
    headline: "Standalone checks",
    text: "Use Show, Guard, Exists, and Empty for one check that stands on its own.",
  },
  {
    group: "Access",
    headline: "Flags and roles",
    text: "Use Permission, Feature, and Media to show UI for a role, a flag, or a viewport.",
  },
];

function OverviewTopic({ onSelect }: { onSelect: (id: TopicId) => void }) {
  return (
    <div>
      <TopicHeader
        eyebrow="Start"
        title="Overview"
        description="Pick a component by the question you already have: a boolean, a value, a promise, or who is allowed to see the UI."
      />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {overviewCards.map((card) => {
          const topics =
            navGroups.find((group) => group.title === card.group)?.items ?? [];
          const single = topics.length === 1;

          return (
            <article
              key={card.group}
              className={`flex flex-col rounded-2xl border border-line bg-surface p-5 ${
                topics.length > 1 ? "sm:col-span-2 lg:col-span-3" : ""
              }`}
            >
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-accent">
                {card.group}
              </p>
              <h3 className="mt-3 font-display text-xl font-semibold text-text">
                {card.headline}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {card.text}
              </p>
              <div className="mt-auto flex flex-wrap gap-2 pt-4">
                {topics.map((topic) => (
                  <button
                    key={topic.id}
                    type="button"
                    onClick={() => onSelect(topic.id)}
                    className={`inline-flex cursor-pointer items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium transition hover:border-accent/40 hover:text-accent ${
                      single
                        ? "border-accent/40 bg-accent-soft text-accent"
                        : "border-line bg-surface-raised text-text"
                    }`}
                  >
                    {topic.label}
                    <ArrowRight className="h-3 w-3" strokeWidth={2.25} />
                  </button>
                ))}
              </div>
            </article>
          );
        })}
      </div>
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
      <Purpose
        items={[
          {
            name: "Package",
            text: "This installs the components and hooks. React stays a peer dependency you already have in the app.",
          },
          {
            name: "react-dom",
            text: "Portal renders into another DOM node, so that component needs react-dom as well.",
          },
        ]}
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
      <Purpose
        items={[
          {
            name: "Condition",
            text: "Asks a boolean about the same user. The first true If or ElseIf renders, and Else covers the rest.",
          },
          {
            name: "Switch",
            text: "Matches that user as a value. Each Match is one case, and Default covers anything left over.",
          },
        ]}
      />
      <div className="overflow-hidden rounded-[1.75rem] border border-line bg-surface">
        <div className="border-b border-line p-5 sm:p-8">
          <p className="mb-3 text-sm font-medium text-muted">Shared input</p>
          <UserTypePicker userType={userType} onChange={onChange} />
        </div>
        <div className="p-5 sm:p-8">
          <p className="mb-4 text-sm font-medium text-muted">API output</p>
          <div className="grid gap-4 lg:grid-cols-2">
            <ApiResultCard
              apiLabel="Condition"
              apiHint="If → ElseIf → Else"
              userType={userType}
            >
              <Condition>
                <If case={userType === "basic"}>
                  <div>
                    <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted">
                      Rendered branch
                    </p>
                    <h3 className="mt-2 font-display text-xl font-semibold tracking-tight text-accent">
                      The user is basic
                    </h3>
                  </div>
                </If>
                <ElseIf case={userType === "vip"}>
                  <div>
                    <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted">
                      Rendered branch
                    </p>
                    <h3 className="mt-2 font-display text-xl font-semibold tracking-tight text-gold">
                      The user is VIP
                    </h3>
                  </div>
                </ElseIf>
                <ElseIf case={userType === "admin"}>
                  <div>
                    <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted">
                      Rendered branch
                    </p>
                    <h3 className="mt-2 font-display text-xl font-semibold tracking-tight text-admin">
                      The user is admin
                    </h3>
                  </div>
                </ElseIf>
                <Else>
                  <div>
                    <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted">
                      Rendered branch
                    </p>
                    <h3 className="mt-2 font-display text-xl font-semibold tracking-tight text-rose">
                      There is no user
                    </h3>
                  </div>
                </Else>
              </Condition>
            </ApiResultCard>

            <ApiResultCard
              apiLabel="Switch"
              apiHint="Match → Default"
              userType={userType}
            >
              <Switch value={userType}>
                <Match when="basic">
                  <div>
                    <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted">
                      Matched value
                    </p>
                    <h3 className="mt-2 font-display text-xl font-semibold tracking-tight text-accent">
                      Matched basic
                    </h3>
                  </div>
                </Match>
                <Match when="vip">
                  <div>
                    <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted">
                      Matched value
                    </p>
                    <h3 className="mt-2 font-display text-xl font-semibold tracking-tight text-gold">
                      Matched VIP
                    </h3>
                  </div>
                </Match>
                <Match when={(value: unknown) => value === "admin"}>
                  <div>
                    <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted">
                      Matched value
                    </p>
                    <h3 className="mt-2 font-display text-xl font-semibold tracking-tight text-admin">
                      Matched admin
                    </h3>
                  </div>
                </Match>
                <Default>
                  <div>
                    <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted">
                      Matched value
                    </p>
                    <h3 className="mt-2 font-display text-xl font-semibold tracking-tight text-rose">
                      Default branch
                    </h3>
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
      <Purpose
        items={[
          {
            name: "Condition",
            text: "Groups the branches so only one of them renders. Use it for a flow with a few mutually exclusive screens.",
          },
          {
            name: "If",
            text: "The first true case. Later branches are skipped once this one matches.",
          },
          {
            name: "ElseIf",
            text: "The next boolean, checked only after every earlier If and ElseIf was false.",
          },
          {
            name: "Else",
            text: "The leftover UI when every case is false, such as a logged-out or empty screen.",
          },
        ]}
      />
      <div className="flex flex-col gap-5">
        <Snippet
          title="Basic Usage"
          description="One boolean, two screens: the welcome when the user is logged in, and the login when they are not."
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
          description="ElseIf adds the roles that sit between admin and the logged-out Else."
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
          description="Loading is checked first, then the error, and the data renders only when both are clear."
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
          description="Else can be written first in the JSX. If still wins whenever its case is true."
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
          description="One Condition walks through loading, a missing user, denied access, and the dashboard."
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
        description="Value-based matching. Supports arrays, or, predicates, and empty Match fall-through."
      />
      <Purpose
        items={[
          {
            name: "Switch",
            text: "Matches one value, such as a status, role, or HTTP code, instead of a chain of booleans.",
          },
          {
            name: "when",
            text: 'An exact value. Match when="loading" renders only while the switch value is that status.',
          },
          {
            name: "when list",
            text: 'Any item in the array. Match when={["error", "failed"]} renders when the value is one of those statuses.',
          },
          {
            name: "when function",
            text: 'A check you write. Match when={(value) => value === "success"} renders when the function returns true.',
          },
          {
            name: "or",
            text: "More values for the same branch. Match when={401} or={403} treats both codes as this Match.",
          },
          {
            name: "Empty Match",
            text: "A Match with no children falls through, so several values can share the next branch that has UI.",
          },
          {
            name: "Default",
            text: "Renders when no Match hits. It can sit anywhere among the branches.",
          },
        ]}
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
          title="or and fall-through"
          description="Use or for extra values, or leave Match children empty to fall through."
          code={`import { Switch, Match, Default } from '@glhrmoura/react-conditional';

const App = ({ code }) => (
  <Switch value={code}>
    <Match when={401} or={403} />
    <Match when={404}>
      Shared unauthorized / not found UI
    </Match>
    <Default>Other status</Default>
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
      <Purpose
        items={[
          {
            name: "Unless",
            text: "Keeps children off the screen while a flag is true. A loading flag uses it so the page appears only after loading finishes.",
          },
        ]}
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
              <p className="font-display text-xl font-semibold text-accent">
                Content is visible
              </p>
            </Unless>
            <Unless case={!isLoading}>
              <p className="font-display text-xl font-semibold text-gold">
                Hidden while loading is false
              </p>
            </Unless>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-5">
        <Snippet
          title="Basic Unless"
          description="Content stays hidden while isLoading is true and appears when loading finishes."
          code={`import { Unless } from '@glhrmoura/react-conditional';

const App = ({ isLoading }) => (
  <Unless case={isLoading}>
    <Content />
  </Unless>
);`}
        />
        <Snippet
          title="With Function Children"
          description="A function child waits to run until Unless decides to render it."
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
      <Purpose
        items={[
          {
            name: "Show",
            text: "Renders children when one boolean is true, and fallback when it is false. Use it for a single gate, such as a dashboard that becomes a login prompt.",
          },
        ]}
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
            <Show
              case={isLogged}
              fallback={
                <p className="font-display text-xl font-semibold text-rose">
                  Login prompt
                </p>
              }
            >
              <p className="font-display text-xl font-semibold text-accent">
                Dashboard
              </p>
            </Show>
          </div>
        </div>
      </div>
      <Snippet
        title="Show with fallback"
        description="The dashboard renders for a logged-in user. The login prompt is the fallback."
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
  const [user, setUser] = useState<{ name: string } | null>({ name: "Ada" });

  return (
    <div>
      <TopicHeader
        eyebrow="API"
        title="Guard / When"
        description="Render when when is truthy. When is an alias of Guard."
      />
      <Purpose
        items={[
          {
            name: "Guard",
            text: "Renders when a value is truthy. Use it before reading fields on an object. null, undefined, false, 0, and an empty string show the fallback.",
          },
          {
            name: "When",
            text: "The same component as Guard. The shorter name fits a boolean flag such as isAdmin.",
          },
        ]}
      />
      <div className="mb-8 overflow-hidden rounded-[1.75rem] border border-line bg-surface">
        <div className="border-b border-line p-5 sm:p-8">
          <button
            type="button"
            onClick={() => setUser((value) => (value ? null : { name: "Ada" }))}
            className="cursor-pointer rounded-xl border border-line bg-surface-raised px-4 py-2.5 text-sm font-medium text-text transition hover:border-accent/40 hover:text-accent"
          >
            user = {user ? user.name : "null"}
          </button>
        </div>
        <div className="p-5 sm:p-8">
          <div className="rounded-2xl border border-line bg-canvas px-5 py-6 text-center">
            <Guard
              when={user}
              fallback={
                <p className="font-display text-xl font-semibold text-rose">
                  Guest
                </p>
              }
            >
              {() => (
                <p className="font-display text-xl font-semibold text-accent">
                  Hello, {user!.name}
                </p>
              )}
            </Guard>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-5">
        <Snippet
          title="Guard"
          description="Profile renders only when user is an object. Guest covers null."
          code={`import { Guard } from '@glhrmoura/react-conditional';

const App = ({ user }) => (
  <Guard when={user} fallback={<Guest />}>
    {() => <Profile name={user.name} />}
  </Guard>
);`}
        />
        <Snippet
          title="When alias"
          description="When reads a boolean flag and renders the admin panel only while that flag is truthy."
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
  const [user, setUser] = useState<{ name: string } | null>({ name: "Ada" });

  return (
    <div>
      <TopicHeader
        eyebrow="API"
        title="Exists"
        description="Render when value is not null or undefined. 0, false, and an empty string still count as present."
      />
      <Purpose
        items={[
          {
            name: "Exists",
            text: "Renders when the value is present. 0, false, and an empty string still count. null and undefined show the fallback. Use it when those falsy values are real data.",
          },
        ]}
      />
      <div className="mb-8 overflow-hidden rounded-[1.75rem] border border-line bg-surface">
        <div className="border-b border-line p-5 sm:p-8">
          <button
            type="button"
            onClick={() => setUser((value) => (value ? null : { name: "Ada" }))}
            className="cursor-pointer rounded-xl border border-line bg-surface-raised px-4 py-2.5 text-sm font-medium text-text transition hover:border-accent/40 hover:text-accent"
          >
            user = {user ? "object" : "null"}
          </button>
        </div>
        <div className="p-5 sm:p-8">
          <div className="rounded-2xl border border-line bg-canvas px-5 py-6 text-center">
            <Exists
              value={user}
              fallback={
                <p className="font-display text-xl font-semibold text-rose">
                  Missing
                </p>
              }
            >
              {() => (
                <p className="font-display text-xl font-semibold text-accent">
                  {user!.name}
                </p>
              )}
            </Exists>
          </div>
        </div>
      </div>
      <Snippet
        title="Exists"
        description="The profile renders for a present user. A missing user renders Guest, while 0 and '' would still count as present."
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
      <Purpose
        items={[
          {
            name: "Empty",
            text: "Renders children for an empty value: null, undefined, an empty string, an empty array, or an empty object. Put the filled list in fallback. Use it for empty states.",
          },
        ]}
      />
      <div className="mb-8 overflow-hidden rounded-[1.75rem] border border-line bg-surface">
        <div className="border-b border-line p-5 sm:p-8">
          <button
            type="button"
            onClick={() =>
              setItems((value) => (value.length ? [] : ["one", "two"]))
            }
            className="cursor-pointer rounded-xl border border-line bg-surface-raised px-4 py-2.5 text-sm font-medium text-text transition hover:border-accent/40 hover:text-accent"
          >
            items.length = {items.length}
          </button>
        </div>
        <div className="p-5 sm:p-8">
          <div className="rounded-2xl border border-line bg-canvas px-5 py-6 text-center">
            <Empty
              value={items}
              fallback={
                <p className="font-display text-xl font-semibold text-accent">
                  {items.join(", ")}
                </p>
              }
            >
              <p className="font-display text-xl font-semibold text-gold">
                Empty state
              </p>
            </Empty>
          </div>
        </div>
      </div>
      <Snippet
        title="Empty"
        description="EmptyState is the children, shown for an empty list. The filled list goes in fallback."
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
      <Purpose
        items={[
          {
            name: "Every",
            text: "Renders when every boolean is true. Use it when several gates must pass together, such as logged in and admin.",
          },
          {
            name: "Some",
            text: "Renders when at least one boolean is true. Use it when any one reason is enough to show the UI.",
          },
        ]}
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
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-muted">
              Every
            </p>
            <Every
              cases={[isLogged, isAdmin]}
              fallback={
                <p className="font-display text-lg font-semibold text-rose">
                  Forbidden
                </p>
              }
            >
              <p className="font-display text-lg font-semibold text-accent">
                Admin panel
              </p>
            </Every>
          </div>
          <div className="rounded-2xl border border-line bg-canvas px-5 py-6 text-center">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-muted">
              Some
            </p>
            <Some
              cases={[isLogged, isAdmin]}
              fallback={
                <p className="font-display text-lg font-semibold text-rose">
                  No access
                </p>
              }
            >
              <p className="font-display text-lg font-semibold text-accent">
                Feature banner
              </p>
            </Some>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-5">
        <Snippet
          title="Every"
          description="The admin panel appears only when the user is logged in and is an admin."
          code={`import { Every } from '@glhrmoura/react-conditional';

const App = ({ isLogged, isAdmin }) => (
  <Every cases={[isLogged, isAdmin]} fallback={<Forbidden />}>
    <AdminPanel />
  </Every>
);`}
        />
        <Snippet
          title="Some"
          description="The banner appears when the user is logged in or the flag is on."
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
      <Purpose
        items={[
          {
            name: "Fallback",
            text: "Renders children when case is true and the fallback prop when it is false. The else branch is required, so a loading placeholder cannot be forgotten.",
          },
        ]}
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
            <Fallback
              case={ready}
              fallback={
                <p className="font-display text-xl font-semibold text-gold">
                  Spinner
                </p>
              }
            >
              <p className="font-display text-xl font-semibold text-accent">
                Ready view
              </p>
            </Fallback>
          </div>
        </div>
      </div>
      <Snippet
        title="Fallback"
        description="The view renders when data exists. The spinner is required for the moment before that."
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

function EitherTopic() {
  const [isOn, setIsOn] = useState(true);

  return (
    <div>
      <TopicHeader
        eyebrow="API"
        title="Either / Toggle"
        description="Binary branches with slots (Either) or on/off props (Toggle)."
      />
      <Purpose
        items={[
          {
            name: "Either",
            text: "Picks Then or Otherwise from a boolean. Use the slots when each side is a block of UI.",
          },
          {
            name: "Toggle",
            text: "The same choice as on and off props. Use it when the two sides are small nodes, such as icons.",
          },
        ]}
      />
      <div className="mb-8 overflow-hidden rounded-[1.75rem] border border-line bg-surface">
        <div className="border-b border-line p-5 sm:p-8">
          <button
            type="button"
            onClick={() => setIsOn((value) => !value)}
            className="cursor-pointer rounded-xl border border-line bg-surface-raised px-4 py-2.5 text-sm font-medium text-text transition hover:border-accent/40 hover:text-accent"
          >
            isOn = {String(isOn)}
          </button>
        </div>
        <div className="grid gap-4 p-5 sm:grid-cols-2 sm:p-8">
          <div className="rounded-2xl border border-line bg-canvas px-5 py-6 text-center">
            <Either case={isOn}>
              <Then>
                <p className="font-display text-xl font-semibold text-accent">
                  On
                </p>
              </Then>
              <Otherwise>
                <p className="font-display text-xl font-semibold text-rose">
                  Off
                </p>
              </Otherwise>
            </Either>
          </div>
          <div className="rounded-2xl border border-line bg-canvas px-5 py-6 text-center">
            <Toggle
              case={isOn}
              on={
                <p className="font-display text-xl font-semibold text-accent">
                  Enabled
                </p>
              }
              off={
                <p className="font-display text-xl font-semibold text-rose">
                  Disabled
                </p>
              }
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-5">
        <Snippet
          title="Either"
          description="Then renders when case is true. Otherwise renders when it is false."
          code={`import { Either, Then, Otherwise } from '@glhrmoura/react-conditional';

const App = ({ isOn }) => (
  <Either case={isOn}>
    <Then>On</Then>
    <Otherwise>Off</Otherwise>
  </Either>
);`}
        />
        <Snippet
          title="Toggle"
          description="on and off are the two sides when the branches are small elements."
          code={`import { Toggle } from '@glhrmoura/react-conditional';

const App = ({ isOn }) => (
  <Toggle case={isOn} on={<OnIcon />} off={<OffIcon />} />
);`}
        />
      </div>
    </div>
  );
}

function CompareTopic() {
  const [age, setAge] = useState(16);
  const [role, setRole] = useState("viewer");

  return (
    <div>
      <TopicHeader
        eyebrow="API"
        title="Compare / Includes"
        description="Relational checks and membership against a list."
      />
      <Purpose
        items={[
          {
            name: "Compare",
            text: "Checks a number, string, or date. Every operator you set on the same Compare has to pass, so gte and lt together describe a range such as an age or a price. Strings compare in character order, and dates compare by time. With no operator set, children do not render.",
          },
          {
            name: "eq",
            text: "Equal. age with eq={18} renders only when the age is exactly 18.",
          },
          {
            name: "ne",
            text: 'Not equal. status with ne="draft" renders for every status except draft.',
          },
          {
            name: "lt",
            text: "Less than. price with lt={100} renders when the price is under 100.",
          },
          {
            name: "lte",
            text: "Less than or equal. score with lte={10} renders when the score is 10 or lower.",
          },
          {
            name: "gt",
            text: "Greater than. stock with gt={0} renders when there is at least one item left.",
          },
          {
            name: "gte",
            text: "Greater than or equal. age with gte={18} renders when the age is 18 or older.",
          },
          {
            name: "Includes",
            text: "Renders when value is one of the items in list. Use it for a role or status that belongs to a set, such as admin or editor.",
          },
        ]}
      />
      <div className="mb-8 overflow-hidden rounded-[1.75rem] border border-line bg-surface">
        <div className="flex flex-wrap gap-3 border-b border-line p-5 sm:p-8">
          <button
            type="button"
            onClick={() => setAge((value) => (value >= 18 ? 16 : 21))}
            className="cursor-pointer rounded-xl border border-line bg-surface-raised px-4 py-2.5 text-sm font-medium text-text transition hover:border-accent/40 hover:text-accent"
          >
            age = {age}
          </button>
          <button
            type="button"
            onClick={() =>
              setRole((value) => (value === "admin" ? "viewer" : "admin"))
            }
            className="cursor-pointer rounded-xl border border-line bg-surface-raised px-4 py-2.5 text-sm font-medium text-text transition hover:border-accent/40 hover:text-accent"
          >
            role = {role}
          </button>
        </div>
        <div className="grid gap-4 p-5 sm:grid-cols-2 sm:p-8">
          <div className="rounded-2xl border border-line bg-canvas px-5 py-6 text-center">
            <Compare
              value={age}
              gte={18}
              fallback={
                <p className="font-display text-lg font-semibold text-rose">
                  Minor
                </p>
              }
            >
              <p className="font-display text-lg font-semibold text-accent">
                Adult
              </p>
            </Compare>
          </div>
          <div className="rounded-2xl border border-line bg-canvas px-5 py-6 text-center">
            <Includes
              value={role}
              list={["admin", "editor"]}
              fallback={
                <p className="font-display text-lg font-semibold text-rose">
                  Forbidden
                </p>
              }
            >
              <p className="font-display text-lg font-semibold text-accent">
                Editor panel
              </p>
            </Includes>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-5">
        <Snippet
          title="Compare"
          description="gte={18} keeps adult content for ages of 18 and above. fallback covers everyone younger."
          code={`import { Compare } from '@glhrmoura/react-conditional';

const App = ({ age }) => (
  <Compare value={age} gte={18} fallback={<MinorNotice />}>
    <AdultContent />
  </Compare>
);`}
        />
        <Snippet
          title="Includes"
          description="The panel renders when role is one of the listed values."
          code={`import { Includes } from '@glhrmoura/react-conditional';

const App = ({ role }) => (
  <Includes value={role} list={['admin', 'editor']} fallback={<Forbidden />}>
    <EditorPanel />
  </Includes>
);`}
        />
      </div>
    </div>
  );
}

function OnceTopic() {
  const [ready, setReady] = useState(false);
  const [open, setOpen] = useState(false);

  return (
    <div>
      <TopicHeader
        eyebrow="API"
        title="Once / Lazy"
        description="Once stays mounted after the first true case. Lazy caches children and only shows them while case is true."
      />
      <Purpose
        items={[
          {
            name: "Once",
            text: "After case becomes true, children stay mounted even if case turns false again. Use it for a widget that should be created a single time.",
          },
          {
            name: "Lazy",
            text: "Builds children the first time case is true and reuses that result. It hides them again while case is false. Use it for a heavy panel that opens and closes.",
          },
        ]}
      />
      <div className="mb-8 overflow-hidden rounded-[1.75rem] border border-line bg-surface">
        <div className="flex flex-wrap gap-3 border-b border-line p-5 sm:p-8">
          <button
            type="button"
            onClick={() => setReady((value) => !value)}
            className="cursor-pointer rounded-xl border border-line bg-surface-raised px-4 py-2.5 text-sm font-medium text-text transition hover:border-accent/40 hover:text-accent"
          >
            ready = {String(ready)}
          </button>
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            className="cursor-pointer rounded-xl border border-line bg-surface-raised px-4 py-2.5 text-sm font-medium text-text transition hover:border-accent/40 hover:text-accent"
          >
            open = {String(open)}
          </button>
        </div>
        <div className="grid gap-4 p-5 sm:grid-cols-2 sm:p-8">
          <div className="rounded-2xl border border-line bg-canvas px-5 py-6 text-center">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-muted">
              Once
            </p>
            <Once
              case={ready}
              fallback={<p className="text-muted">Waiting…</p>}
            >
              <p className="font-display text-lg font-semibold text-accent">
                Mounted and sticky
              </p>
            </Once>
          </div>
          <div className="rounded-2xl border border-line bg-canvas px-5 py-6 text-center">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-muted">
              Lazy
            </p>
            <Lazy case={open} fallback={<p className="text-muted">Closed</p>}>
              {() => (
                <p className="font-display text-lg font-semibold text-accent">
                  Cached panel
                </p>
              )}
            </Lazy>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-5">
        <Snippet
          title="Once"
          description="The widget mounts the first time ready is true and stays mounted after that."
          code={`import { Once } from '@glhrmoura/react-conditional';

const App = ({ ready }) => (
  <Once case={ready}>
    {() => <ExpensiveWidget />}
  </Once>
);`}
        />
        <Snippet
          title="Lazy"
          description="The panel is built once, shown while open is true, and hidden again when open is false."
          code={`import { Lazy } from '@glhrmoura/react-conditional';

const App = ({ open }) => (
  <Lazy case={open} fallback={null}>
    {() => <HeavyPanel />}
  </Lazy>
);`}
        />
      </div>
    </div>
  );
}

function PortalTopic() {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <TopicHeader
        eyebrow="API"
        title="Portal"
        description="Render children into a DOM container only when case is true."
      />
      <Purpose
        items={[
          {
            name: "Portal",
            text: "Moves children into another DOM node, usually document.body, only while case is true. Use it for a modal or toast that must sit above the page.",
          },
        ]}
      />
      <div className="mb-8 overflow-hidden rounded-[1.75rem] border border-line bg-surface">
        <div className="border-b border-line p-5 sm:p-8">
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            className="cursor-pointer rounded-xl border border-line bg-surface-raised px-4 py-2.5 text-sm font-medium text-text transition hover:border-accent/40 hover:text-accent"
          >
            open = {String(open)}
          </button>
        </div>
        <div className="p-5 sm:p-8">
          <p className="mb-4 text-sm text-muted">
            Portal content mounts on document.body when open.
          </p>
          <Portal case={open}>
            <div className="fixed bottom-6 right-6 z-50 rounded-2xl border border-line bg-surface-raised px-5 py-4 shadow-lg">
              <p className="font-display text-lg font-semibold text-accent">
                Portal active
              </p>
            </div>
          </Portal>
        </div>
      </div>
      <Snippet
        title="Portal"
        description="The modal is attached to document.body only while open is true."
        code={`import { Portal } from '@glhrmoura/react-conditional';

const App = ({ open }) => (
  <Portal case={open} container={document.body}>
    <Modal />
  </Portal>
);`}
      />
    </div>
  );
}

function HooksReadout() {
  const role = "admin";
  const age = 21;
  const matched = useMatch(role, "admin", ["owner"]);
  const adult = useCompare(age, { gte: 18 });
  const desktop = useMedia(768);
  const canEdit = usePermission({ can: "edit", permissions: ["edit"] });
  const beta = useFeature("beta");

  return (
    <div className="mb-8 rounded-2xl border border-line bg-canvas px-5 py-6">
      <p className="font-mono text-sm text-muted">
        useMatch(role, 'admin', ['owner']) → {String(matched)}
      </p>
      <p className="mt-2 font-mono text-sm text-muted">
        useCompare(age, {"{ gte: 18 }"}) → {String(adult)}
      </p>
      <p className="mt-2 font-mono text-sm text-muted">
        useMedia(768) → {String(desktop)}
      </p>
      <p className="mt-2 font-mono text-sm text-muted">
        usePermission({"{ can: 'edit' }"}) → {String(canEdit)}
      </p>
      <p className="mt-2 font-mono text-sm text-muted">
        useFeature('beta') → {String(beta)}
      </p>
    </div>
  );
}

function HooksTopic() {
  return (
    <div>
      <TopicHeader
        eyebrow="API"
        title="Hooks"
        description="Mirror helpers for logic outside JSX."
      />
      <Purpose
        items={[
          {
            name: "Hooks",
            text: "Return the same answers as the components, as booleans. Use them for className, disabled, or a request that should not live inside JSX.",
          },
          {
            name: "Names",
            text: "Each hook follows the component with the same idea: useShow, useMatch, useExists, useEmpty, useIncludes, useCompare, useMedia, usePermission, and useFeature. useCompare takes the operators as an object, such as { gte: 18 }.",
          },
        ]}
      />
      <FeatureProvider flags={{ beta: true }}>
        <HooksReadout />
      </FeatureProvider>
      <Snippet
        title="Hooks"
        description="Each hook returns a boolean you can use outside JSX, for a class, a disabled button, or another condition."
        code={`import { useMatch, useCompare, useMedia, usePermission, useFeature } from '@glhrmoura/react-conditional';

function useFlags(role, age) {
  const isAdmin = useMatch(role, 'admin', ['owner']);
  const adult = useCompare(age, { gte: 18 });
  const desktop = useMedia(768);
  const canEdit = usePermission({ can: 'edit' });
  const beta = useFeature('beta');
  return { isAdmin, adult, desktop, canEdit, beta };
}`}
      />
    </div>
  );
}

function Boom(): React.ReactElement {
  throw new Error("Widget crashed");
}

function ErrorBoundaryTopic() {
  const [enabled, setEnabled] = useState(true);
  const [boom, setBoom] = useState(false);

  return (
    <div>
      <TopicHeader
        eyebrow="API"
        title="ErrorBoundary"
        description="Catch render errors only when case is true. Use resetKey to recover after a retry."
      />
      <Purpose
        items={[
          {
            name: "ErrorBoundary",
            text: "Catches a render error from children while case is true and shows fallback. Change resetKey to mount a fresh boundary after a retry.",
          },
        ]}
      />
      <div className="mb-8 overflow-hidden rounded-[1.75rem] border border-line bg-surface">
        <div className="flex flex-wrap gap-3 border-b border-line p-5 sm:p-8">
          <button
            type="button"
            onClick={() => setEnabled((value) => !value)}
            className="cursor-pointer rounded-xl border border-line bg-surface-raised px-4 py-2.5 text-sm font-medium text-text transition hover:border-accent/40 hover:text-accent"
          >
            case = {String(enabled)}
          </button>
          <button
            type="button"
            onClick={() => setBoom((value) => !value)}
            className="cursor-pointer rounded-xl border border-line bg-surface-raised px-4 py-2.5 text-sm font-medium text-text transition hover:border-accent/40 hover:text-accent"
          >
            throw = {String(boom)}
          </button>
        </div>
        <div className="p-5 sm:p-8">
          <div className="rounded-2xl border border-line bg-canvas px-5 py-6 text-center">
            <ErrorBoundary
              case={enabled}
              resetKey={`${enabled}-${boom}`}
              fallback={(error) => (
                <p className="font-display text-xl font-semibold text-rose">
                  {error.message}
                </p>
              )}
            >
              {boom && enabled ? (
                <Boom />
              ) : (
                <p className="font-display text-xl font-semibold text-accent">
                  Stable widget
                </p>
              )}
            </ErrorBoundary>
          </div>
        </div>
      </div>
      <Snippet
        title="ErrorBoundary"
        description="While case is true, a crash in RiskyWidget renders the fallback instead of breaking the page."
        code={`import { ErrorBoundary } from '@glhrmoura/react-conditional';

const App = ({ enabled }) => (
  <ErrorBoundary
    case={enabled}
    fallback={(error) => <ErrorView message={error.message} />}
  >
    <RiskyWidget />
  </ErrorBoundary>
);`}
      />
    </div>
  );
}

function AsyncTopic() {
  const [ok, setOk] = useState(true);
  const source = React.useCallback(
    () =>
      new Promise<{ name: string }>((resolve, reject) => {
        window.setTimeout(() => {
          if (ok) resolve({ name: "Ada" });
          else reject(new Error("Failed to load"));
        }, 600);
      }),
    [ok],
  );

  return (
    <div>
      <TopicHeader
        eyebrow="API"
        title="Async / Await"
        description="source accepts a Promise or a loader. Slots are Pending, Resolved, and Rejected."
      />
      <Purpose
        items={[
          {
            name: "Async",
            text: "Runs a promise or a function that returns one, then renders a single slot. Await is the same component.",
          },
          {
            name: "Pending",
            text: "Shown while the promise is still running. Use it for a spinner.",
          },
          {
            name: "Resolved",
            text: "Receives the value when the promise succeeds. Use the function child to render that data.",
          },
          {
            name: "Rejected",
            text: "Receives the error when the promise fails. Use it for the error message.",
          },
        ]}
      />
      <div className="mb-8 overflow-hidden rounded-[1.75rem] border border-line bg-surface">
        <div className="border-b border-line p-5 sm:p-8">
          <button
            type="button"
            onClick={() => setOk((value) => !value)}
            className="cursor-pointer rounded-xl border border-line bg-surface-raised px-4 py-2.5 text-sm font-medium text-text transition hover:border-accent/40 hover:text-accent"
          >
            succeed = {String(ok)}
          </button>
        </div>
        <div className="p-5 sm:p-8">
          <div className="rounded-2xl border border-line bg-canvas px-5 py-6 text-center">
            <Async source={source}>
              <Pending>
                <p className="font-display text-xl font-semibold text-gold">
                  Loading...
                </p>
              </Pending>
              <Resolved>
                {(user) => (
                  <p className="font-display text-xl font-semibold text-accent">
                    Hello, {user.name}
                  </p>
                )}
              </Resolved>
              <Rejected>
                {(error) => (
                  <p className="font-display text-xl font-semibold text-rose">
                    {error instanceof Error ? error.message : "Error"}
                  </p>
                )}
              </Rejected>
            </Async>
          </div>
        </div>
      </div>
      <Snippet
        title="Async"
        description="Pending, Resolved, and Rejected are the three screens of one request."
        code={`import { Async, Pending, Resolved, Rejected } from '@glhrmoura/react-conditional';

const App = ({ loadUser }) => (
  <Async source={loadUser}>
    <Pending>Loading...</Pending>
    <Resolved>{(user) => <Profile name={user.name} />}</Resolved>
    <Rejected>{(error) => <ErrorView message={error.message} />}</Rejected>
  </Async>
);`}
      />
    </div>
  );
}

function PermissionTopic() {
  const [permissions, setPermissions] = useState(["view", "edit"]);
  const [roles, setRoles] = useState(["editor"]);

  const toggle = (current: string[], item: string) =>
    current.includes(item)
      ? current.filter((value) => value !== item)
      : [...current, item];

  const formatList = (items: string[]) =>
    `[${items.map((item) => JSON.stringify(item)).join(", ")}]`;

  const checks: {
    label: string;
    hint: string;
    can?: string | string[];
    role?: string;
    mode?: "every" | "some";
    allowed: string;
    denied: string;
  }[] = [
    {
      label: 'can="edit"',
      hint: "Shown when permissions includes edit.",
      can: "edit",
      allowed: "Editor",
      denied: "Read only",
    },
    {
      label: 'role="admin"',
      hint: "Shown when roles includes admin.",
      role: "admin",
      allowed: "Admin tools",
      denied: "Not an admin",
    },
    {
      label: 'can={["publish", "delete"]} mode="some"',
      hint: "Shown when permissions includes publish or delete.",
      can: ["publish", "delete"],
      mode: "some",
      allowed: "Moderation",
      denied: "No moderation access",
    },
    {
      label: 'can="edit" role="admin"',
      hint: "Shown when permissions includes edit and roles includes admin.",
      can: "edit",
      role: "admin",
      allowed: "Admin editor",
      denied: "Needs edit and admin",
    },
  ];

  return (
    <div>
      <TopicHeader
        eyebrow="API"
        title="Permission"
        description="PermissionProvider stores the user's permissions and roles. can checks permissions and role checks roles."
      />
      <Purpose
        items={[
          {
            name: "PermissionProvider",
            text: "Holds permissions and roles once, so every Permission inside can read them.",
          },
          {
            name: "can",
            text: "Checks the permissions list. A string needs that capability. A list uses mode.",
          },
          {
            name: "role",
            text: "Checks the roles list the same way. Set can and role together when both must pass.",
          },
          {
            name: "mode",
            text: "every, the default, needs every listed value. some needs any one of them.",
          },
        ]}
      />
      <div className="mb-8 overflow-hidden rounded-[1.75rem] border border-line bg-surface">
        <div className="border-b border-line p-5 sm:p-8">
          <p className="text-sm font-medium text-text">What this user has</p>
          <p className="mt-1 text-sm text-muted">
            These arrays are the props of PermissionProvider.
          </p>
          <p className="mt-4 text-xs font-semibold uppercase tracking-[0.16em] text-muted">
            permissions
          </p>
          <div className="mt-2 flex flex-wrap gap-2">
            {["view", "edit", "publish", "delete"].map((item) => {
              const on = permissions.includes(item);
              return (
                <button
                  key={item}
                  type="button"
                  onClick={() =>
                    setPermissions((current) => toggle(current, item))
                  }
                  className={`cursor-pointer rounded-full border px-3 py-1.5 text-sm font-medium transition ${
                    on
                      ? "border-accent/50 bg-accent-soft text-accent"
                      : "border-line bg-surface-raised text-muted hover:border-line-strong hover:text-text"
                  }`}
                >
                  {item}
                </button>
              );
            })}
          </div>
          <p className="mt-4 text-xs font-semibold uppercase tracking-[0.16em] text-muted">
            roles
          </p>
          <div className="mt-2 flex flex-wrap gap-2">
            {["viewer", "editor", "admin"].map((item) => {
              const on = roles.includes(item);
              return (
                <button
                  key={item}
                  type="button"
                  onClick={() => setRoles((current) => toggle(current, item))}
                  className={`cursor-pointer rounded-full border px-3 py-1.5 text-sm font-medium transition ${
                    on
                      ? "border-accent/50 bg-accent-soft text-accent"
                      : "border-line bg-surface-raised text-muted hover:border-line-strong hover:text-text"
                  }`}
                >
                  {item}
                </button>
              );
            })}
          </div>
          <pre className="mt-5 overflow-x-auto rounded-xl border border-line bg-canvas px-4 py-3 font-mono text-[13px] leading-7">
            <code>
              <span className="block whitespace-nowrap">
                <span className="text-accent">permissions</span>
                <span className="text-muted">=</span>
                <span className="text-text">{`{${formatList(permissions)}}`}</span>
              </span>
              <span className="block whitespace-nowrap">
                <span className="text-accent">roles</span>
                <span className="text-muted">=</span>
                <span className="text-text">{`{${formatList(roles)}}`}</span>
              </span>
            </code>
          </pre>
        </div>
        <div className="p-5 sm:p-8">
          <PermissionProvider permissions={permissions} roles={roles}>
            <div className="flex flex-col gap-3">
              {checks.map((check) => (
                <div
                  key={check.label}
                  className="flex flex-col gap-3 rounded-2xl border border-line bg-canvas px-5 py-4 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div>
                    <p className="font-mono text-sm text-text">{check.label}</p>
                    <p className="mt-1 text-xs leading-relaxed text-muted">
                      {check.hint}
                    </p>
                  </div>
                  <Permission
                    can={check.can}
                    role={check.role}
                    mode={check.mode}
                    fallback={
                      <p className="font-display text-lg font-semibold text-rose">
                        {check.denied}
                      </p>
                    }
                  >
                    <p className="font-display text-lg font-semibold text-accent">
                      {check.allowed}
                    </p>
                  </Permission>
                </div>
              ))}
            </div>
          </PermissionProvider>
        </div>
      </div>
      <div className="flex flex-col gap-5">
        <Snippet
          title="Share the user once"
          description="PermissionProvider passes permissions and roles to every Permission inside it."
          code={`import { Permission, PermissionProvider } from '@glhrmoura/react-conditional';

const App = ({ user }) => (
  <PermissionProvider permissions={user.permissions} roles={user.roles}>
    <Permission can="edit" fallback={<ReadOnly />}>
      <Editor />
    </Permission>
  </PermissionProvider>
);`}
        />
        <Snippet
          title="can, role, and mode"
          description="can checks permissions. role checks roles. When both are set, both must pass. mode some matches any value in that list. The default mode is every."
          code={`<PermissionProvider permissions={['view', 'edit']} roles={['editor']}>
  <Permission can="edit" fallback={<ReadOnly />}>
    <Editor />
  </Permission>
  <Permission role="admin" fallback={<NotAdmin />}>
    <AdminTools />
  </Permission>
  <Permission can={['publish', 'delete']} mode="some" fallback={<Locked />}>
    <Moderation />
  </Permission>
  <Permission can="edit" role="admin" fallback={<Denied />}>
    <AdminEditor />
  </Permission>
</PermissionProvider>`}
        />
        <Snippet
          title="Without a provider"
          description="Pass permissions and roles on Permission when the lists are local to that gate."
          code={`<Permission
  can="edit"
  permissions={user.permissions}
  roles={user.roles}
  fallback={<ReadOnly />}
>
  <Editor />
</Permission>`}
        />
      </div>
    </div>
  );
}

function MediaTopic() {
  const desktop = useMedia(768);

  return (
    <div>
      <TopicHeader
        eyebrow="API"
        title="Media"
        description="Match a viewport with min and/or max. Numbers are pixels. Unmatched during SSR."
      />
      <Purpose
        items={[
          {
            name: "Media",
            text: "Renders children when the viewport width matches the bounds you set. On the server the query does not match, so fallback is what SSR sends.",
          },
          {
            name: "min",
            text: 'The narrowest width that still shows children. min={768} is 768px and wider. A string is used as written, such as min="48rem".',
          },
          {
            name: "max",
            text: "The widest width that still shows children. max={767} is 767px and narrower. Set min and max together when the width must sit between them.",
          },
        ]}
      />
      <div className="mb-8 overflow-hidden rounded-[1.75rem] border border-line bg-surface">
        <div className="p-5 sm:p-8">
          <div className="rounded-2xl border border-line bg-canvas px-5 py-6 text-center">
            <Media
              min={768}
              fallback={
                <p className="font-display text-xl font-semibold text-gold">
                  Mobile nav
                </p>
              }
            >
              <p className="font-display text-xl font-semibold text-accent">
                Desktop nav
              </p>
            </Media>
            <p className="mt-3 font-mono text-xs text-muted">
              useMedia(768) → {String(desktop)}
            </p>
          </div>
        </div>
      </div>
      <Snippet
        title="Media"
        description="Desktop nav renders from 768px up. Narrower viewports get the fallback."
        code={`import { Media } from '@glhrmoura/react-conditional';

const App = () => (
  <Media min={768} fallback={<MobileNav />}>
    <DesktopNav />
  </Media>
);`}
      />
    </div>
  );
}

function FeatureTopic() {
  const [beta, setBeta] = useState(true);

  return (
    <div>
      <TopicHeader
        eyebrow="API"
        title="Feature"
        description="Gate UI with when, or with a flag name from FeatureProvider."
      />
      <Purpose
        items={[
          {
            name: "FeatureProvider",
            text: "Stores named flags for the tree, such as beta or checkout-v2.",
          },
          {
            name: "Feature",
            text: "Renders children when name is on in the provider, or when the when prop is truthy. Use fallback for the stable UI.",
          },
        ]}
      />
      <div className="mb-8 overflow-hidden rounded-[1.75rem] border border-line bg-surface">
        <div className="border-b border-line p-5 sm:p-8">
          <button
            type="button"
            onClick={() => setBeta((value) => !value)}
            className="cursor-pointer rounded-xl border border-line bg-surface-raised px-4 py-2.5 text-sm font-medium text-text transition hover:border-accent/40 hover:text-accent"
          >
            beta = {String(beta)}
          </button>
        </div>
        <div className="p-5 sm:p-8">
          <FeatureProvider flags={{ beta }}>
            <div className="rounded-2xl border border-line bg-canvas px-5 py-6 text-center">
              <Feature
                name="beta"
                fallback={
                  <p className="font-display text-xl font-semibold text-gold">
                    Stable panel
                  </p>
                }
              >
                <p className="font-display text-xl font-semibold text-accent">
                  Beta panel
                </p>
              </Feature>
            </div>
          </FeatureProvider>
        </div>
      </div>
      <Snippet
        title="Feature"
        description="when uses a boolean you already have. name reads a flag stored on FeatureProvider."
        code={`import { Feature, FeatureProvider } from '@glhrmoura/react-conditional';

const App = ({ flags }) => (
  <FeatureProvider flags={flags}>
    <Feature when={flags.beta} fallback={<StablePanel />}>
      <BetaPanel />
    </Feature>
    <Feature name="checkout-v2">
      <CheckoutV2 />
    </Feature>
  </FeatureProvider>
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
                        ? "border-accent bg-accent-soft/60 text-accent"
                        : "border-transparent text-text hover:border-line-strong hover:bg-surface-raised"
                    }`}
                  >
                    <span className="block text-sm font-semibold tracking-tight">
                      {item.label}
                    </span>
                    <span
                      className={`mt-0.5 block text-xs leading-snug ${active ? "text-accent/75" : "text-muted"}`}
                    >
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

function NpmLink() {
  return (
    <a
      href="https://www.npmjs.com/package/@glhrmoura/react-conditional"
      target="_blank"
      rel="noopener noreferrer"
      className="group inline-flex min-w-0 max-w-full cursor-pointer items-center gap-3 rounded-2xl border border-line bg-surface-raised px-3 py-2.5 transition duration-200 hover:border-accent/45 hover:bg-accent-soft"
    >
      <span className="shrink-0 rounded-md border border-[#9b2c2c] bg-[#cb3837] px-2 py-1 font-mono text-[11px] font-bold leading-none tracking-wide text-white">
        npm
      </span>
      <span className="min-w-0 truncate font-mono text-sm text-text transition group-hover:text-accent">
        @glhrmoura/react-conditional
      </span>
      <ExternalLink
        className="h-3.5 w-3.5 shrink-0 text-muted transition group-hover:text-accent"
        strokeWidth={2.25}
      />
    </a>
  );
}

function SiteHeader({
  onHome,
  mobileNavOpen,
  onToggleNav,
}: {
  onHome: () => void;
  mobileNavOpen: boolean;
  onToggleNav: () => void;
}) {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-canvas/95 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-x-4 gap-y-3 px-4 py-4 sm:px-6">
        <button
          type="button"
          onClick={onHome}
          className="flex min-w-0 cursor-pointer items-center gap-3 text-left"
        >
          <img
            src="/logo.png"
            alt=""
            className="h-10 w-10 shrink-0 rounded-full"
          />
          <span className="min-w-0">
            <span className="block truncate font-display text-lg font-bold tracking-tight text-text">
              React Conditional
            </span>
            <span className="mt-0.5 block text-xs text-muted">
              Declarative branches for React
            </span>
          </span>
        </button>
        <button
          type="button"
          onClick={onToggleNav}
          className="inline-flex shrink-0 cursor-pointer items-center gap-2 rounded-xl border border-line bg-surface px-3 py-2 text-sm text-muted lg:hidden"
          aria-expanded={mobileNavOpen}
          aria-label="Toggle topics"
        >
          {mobileNavOpen ? (
            <X className="h-4 w-4" />
          ) : (
            <Menu className="h-4 w-4" />
          )}
          Topics
        </button>
        <div className="flex w-full min-w-0 justify-end sm:ml-auto sm:w-auto">
          <NpmLink />
        </div>
      </div>
    </header>
  );
}

function MobileDrawer({
  open,
  topic,
  onClose,
  onSelect,
}: {
  open: boolean;
  topic: TopicId;
  onClose: () => void;
  onSelect: (id: TopicId) => void;
}) {
  return (
    <div
      inert={open ? undefined : true}
      className={`fixed inset-0 z-50 lg:hidden ${open ? "" : "pointer-events-none"}`}
    >
      <button
        type="button"
        aria-label="Close topics"
        onClick={onClose}
        className={`absolute inset-0 bg-black/60 transition-opacity duration-300 ${open ? "opacity-100" : "opacity-0"}`}
      />
      <aside
        className={`absolute inset-y-0 right-0 flex w-[min(20rem,88vw)] flex-col border-l border-line bg-canvas shadow-2xl transition-transform duration-300 ease-out ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between gap-3 border-b border-line px-4 py-4">
          <div className="flex items-center gap-3">
            <img src="/logo.png" alt="" className="h-9 w-9 rounded-full" />
            <p className="font-display text-base font-bold tracking-tight text-text">
              Topics
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex cursor-pointer items-center justify-center rounded-xl border border-line bg-surface p-2 text-muted"
            aria-label="Close topics"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        <div className="overflow-y-auto overscroll-contain px-3 py-5">
          <SidebarNav topic={topic} onSelect={onSelect} />
        </div>
      </aside>
    </div>
  );
}

function App() {
  const [topic, setTopic] = useState<TopicId>("overview");
  const [userType, setUserType] = useState<UserType>("basic");
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  useEffect(() => {
    if (!mobileNavOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMobileNavOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [mobileNavOpen]);

  const onSelectTopic = (id: TopicId) => {
    setTopic(id);
    setMobileNavOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="flex min-h-screen w-full flex-col">
      <SiteHeader
        onHome={() => onSelectTopic("overview")}
        mobileNavOpen={mobileNavOpen}
        onToggleNav={() => setMobileNavOpen((open) => !open)}
      />
      <MobileDrawer
        open={mobileNavOpen}
        topic={topic}
        onClose={() => setMobileNavOpen(false)}
        onSelect={onSelectTopic}
      />
      <div className="mx-auto flex w-full max-w-6xl flex-1 gap-0 px-4 py-6 sm:px-6 lg:gap-10 lg:py-10">
        <aside className="hidden w-60 shrink-0 lg:block">
          <div className="sticky top-28">
            <SidebarNav topic={topic} onSelect={onSelectTopic} />
          </div>
        </aside>

        <div className="min-w-0 flex-1">
          <main>
            <Condition>
              <If case={topic === "overview"}>
                <OverviewTopic onSelect={onSelectTopic} />
              </If>
              <ElseIf case={topic === "install"}>
                <InstallTopic />
              </ElseIf>
              <ElseIf case={topic === "playground"}>
                <PlaygroundTopic userType={userType} onChange={setUserType} />
              </ElseIf>
              <ElseIf case={topic === "condition"}>
                <ConditionTopic />
              </ElseIf>
              <ElseIf case={topic === "switch"}>
                <SwitchTopic />
              </ElseIf>
              <ElseIf case={topic === "unless"}>
                <UnlessTopic />
              </ElseIf>
              <ElseIf case={topic === "show"}>
                <ShowTopic />
              </ElseIf>
              <ElseIf case={topic === "guard"}>
                <GuardTopic />
              </ElseIf>
              <ElseIf case={topic === "exists"}>
                <ExistsTopic />
              </ElseIf>
              <ElseIf case={topic === "empty"}>
                <EmptyTopic />
              </ElseIf>
              <ElseIf case={topic === "compose"}>
                <ComposeTopic />
              </ElseIf>
              <ElseIf case={topic === "fallback"}>
                <FallbackTopic />
              </ElseIf>
              <ElseIf case={topic === "either"}>
                <EitherTopic />
              </ElseIf>
              <ElseIf case={topic === "compare"}>
                <CompareTopic />
              </ElseIf>
              <ElseIf case={topic === "once"}>
                <OnceTopic />
              </ElseIf>
              <ElseIf case={topic === "portal"}>
                <PortalTopic />
              </ElseIf>
              <ElseIf case={topic === "error-boundary"}>
                <ErrorBoundaryTopic />
              </ElseIf>
              <ElseIf case={topic === "async"}>
                <AsyncTopic />
              </ElseIf>
              <ElseIf case={topic === "permission"}>
                <PermissionTopic />
              </ElseIf>
              <ElseIf case={topic === "media"}>
                <MediaTopic />
              </ElseIf>
              <ElseIf case={topic === "feature"}>
                <FeatureTopic />
              </ElseIf>
              <Else>
                <HooksTopic />
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
            <svg
              className="h-3.5 w-3.5"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
            </svg>
            github.com/glhrmoura
          </a>
        </div>
      </footer>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
