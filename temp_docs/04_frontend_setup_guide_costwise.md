# Frontend Setup Guide — CostWise

> **Purpose**: Step-by-step instructions for setting up the **CostWise** project.  
> Based on agency standard template. Customized for CostWise's guest-first architecture, no-OTP auth flow, and "Modern Local" design system.  
> Validated against `CostWise_Documentation.md` v1.0.0 (2026-04-12).

---

## Technology Stack (Mandatory)

| Layer | Technology | Version |
|---|---|---|
| Framework | **Next.js** (App Router) | 16.x |
| Language | **TypeScript** | 5.7+ |
| Styling | **Tailwind CSS v4** | 4.x |
| UI Components | **shadcn/ui** | latest |
| Data Fetching | **TanStack React Query** | 5.x |
| Forms | **React Hook Form** | 7.x |
| Validation | **Zod** | 3.x |
| Notifications | **sonner** | 1.x |
| Icons | **lucide-react** | latest |
| Testing | **Playwright** | 1.x |
| Package Manager | **pnpm** | 8.x |

> **Mandatory Stack Rule**: All client-facing projects must use this stack. Backend-for-frontend logic that cannot be achieved within Next.js API routes requires a separate service and must be discussed with the tech lead.

---

## Phase 1: Project Initialization

### Step 1.1 — Scaffold Next.js App

```bash
# See all options first
npx -y create-next-app@latest --help

# Initialize in current directory (non-interactive)
npx -y create-next-app@latest ./ \
  --typescript \
  --tailwind \
  --eslint \
  --app \
  --src-dir=false \
  --import-alias="@/*"
```

> **Rule**: Always use the App Router (`--app`). Pages Router is not supported by this standard.

### Step 1.2 — Install Core Dependencies

```bash
pnpm add @tanstack/react-query @tanstack/react-query-devtools
pnpm add react-hook-form @hookform/resolvers zod
pnpm add sonner lucide-react
pnpm add class-variance-authority clsx tailwind-merge
pnpm add date-fns
```

### Step 1.3 — Install shadcn/ui

```bash
# Initialize shadcn/ui
npx shadcn@latest init

# Install required components (minimum set for CostWise)
npx shadcn@latest add button card table badge tabs input label
npx shadcn@latest add dialog alert-dialog select
npx shadcn@latest add toast separator skeleton
npx shadcn@latest add tooltip popover dropdown-menu
npx shadcn@latest add radio-group checkbox
npx shadcn@latest add avatar progress
```

> **Rule**: Only install shadcn components you will actually use. Do not bulk-install all components.  
> `progress` is required for quiz progress indicators. `switch` is **not** needed (no settings toggles in CostWise v1).

### Step 1.4 — Install Dev Dependencies

```bash
pnpm add -D @playwright/test
npx playwright install chromium
```

---

## Phase 2: Project Configuration

### Step 2.1 — TypeScript Config (`tsconfig.json`)

```json
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "paths": {
      "@/*": ["./*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

### Step 2.2 — Environment Variable Files

Create `.env.local` (never commit this file):
```env
NEXT_PUBLIC_API_URL=http://localhost:3001/api
NEXT_PUBLIC_USE_MOCK_DATA=true
NEXT_PUBLIC_USE_MOCK_AUTH=true
```

Create `.env.example` (commit this file as reference):
```env
NEXT_PUBLIC_API_URL=
NEXT_PUBLIC_USE_MOCK_DATA=true
NEXT_PUBLIC_USE_MOCK_AUTH=true
```

Update `.gitignore` to ensure:
```
.env.local
.env.*.local
```

> **Note**: CostWise does **not** use OTP. There is no `NEXT_PUBLIC_OTP_*` variable. Auth is email + password only.

### Step 2.3 — Next.js Config (`next.config.mjs`)

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  // Add project-specific config here
};

export default nextConfig;
```

### Step 2.4 — Playwright Config

```typescript
// playwright.config.ts
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 300_000,
  use: {
    baseURL: 'http://localhost:3000',
    headless: true,
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
  ],
});
```

---

## Phase 3: Directory Structure Setup

### Step 3.1 — Create Required Directories

```bash
mkdir -p app/home
mkdir -p app/learn/\[moduleSlug\]
mkdir -p app/simulator
mkdir -p app/quizzes/\[moduleSlug\]
mkdir -p app/tips
mkdir -p app/profile
mkdir -p app/login
mkdir -p app/register
mkdir -p components/{auth,home,learn,simulator,quizzes,tips,profile,nav,common,ui}
mkdir -p contexts hooks providers
mkdir -p lib/api/{mock-data,repositories}
mkdir -p tests
mkdir -p styles
mkdir -p public
```

**Full project structure** (from `CostWise_Documentation.md` §3):

```
app/
├── layout.tsx                          # Root layout: ErrorBoundary + ReactQueryProvider + AuthProvider + Toaster
├── page.tsx                            # Root redirect → /home
├── not-found.tsx                       # 404 page
├── home/
│   └── page.tsx                        # Home Page (guest & logged-in states)
├── learn/
│   ├── page.tsx                        # Educational Hub index
│   └── [moduleSlug]/
│       └── page.tsx                    # Module detail page
├── simulator/
│   └── page.tsx                        # Interactive Price Simulator
├── quizzes/
│   ├── page.tsx                        # Quiz list page
│   └── [moduleSlug]/
│       └── page.tsx                    # Active quiz session
├── tips/
│   └── page.tsx                        # Practical Tips & Localized Budgeting
├── profile/
│   └── page.tsx                        # User Profile Management (auth-only)
├── login/
│   └── page.tsx                        # Sign In page
└── register/
    └── page.tsx                        # Sign Up page

components/
├── auth/                               # Login, Register, ForgotPassword, ResetPassword
├── home/                               # GuestHomePage, LoggedInHomePage, TipOfDayCard, ContinueLearningCard
├── learn/                              # ModuleCard, ReadMoreToggle, VisualAid
├── simulator/                          # SimulatorForm, AdjustedValueOutput, HouseholdItemSelector
├── quizzes/                            # QuizCard, QuizSession, QuestionBlock, ScoreSummary
├── tips/                               # TipCard, CategoryFilter, BookmarkToggle, ShareButton
├── profile/                            # ProfileForm
├── nav/
│   ├── global-header.tsx               # Sticky nav header (desktop + mobile)
│   └── mobile-drawer.tsx               # Hamburger slide-in drawer
├── common/                             # PageFooter, ToastContainer
├── error-boundary.tsx
├── error-fallback.tsx
└── ui/                                 # shadcn/ui primitives only

contexts/
├── auth-context.tsx                    # AuthProvider + useAuth hook
└── browser-storage-context.tsx         # Quiz progress, scores, bookmarks sync

hooks/
├── use-api.ts                          # TanStack Query hooks
├── use-quiz-storage.ts                 # Browser storage for quiz progress/scores
├── use-bookmarks.ts                    # Bookmark read/write + account sync
├── use-tip-of-day.ts                   # Date-based deterministic tip selection
└── use-mobile.ts                       # Responsive detection

lib/
├── api/
│   ├── config.ts                       # API_CONFIG: toggles, endpoints, types
│   ├── index.ts
│   ├── mock-data/                      # inflation-data.json, quiz-questions.json, tips.json
│   └── repositories/
│       ├── base-repository.ts
│       ├── auth-repository.ts
│       ├── quiz-repository.ts
│       ├── tips-repository.ts
│       ├── simulator-repository.ts
│       └── index.ts
├── constants.ts                        # STORAGE_KEYS, CATEGORIES, QUIZ_CONFIG
├── react-query-client.ts
├── types.ts                            # All TypeScript interfaces
├── utils.ts                            # cn(), formatPeso(), calcInflationAdjusted()
└── validation-schemas.ts               # All Zod schemas
```

### Step 3.2 — Core Library Files to Create

Create these files **before writing any feature code**.

#### `lib/constants.ts`
```typescript
export const STORAGE_KEYS = {
  QUIZ_PROGRESS:  'costwise_quiz_progress',   // Record<moduleSlug, QuizProgress>
  QUIZ_SCORES:    'costwise_quiz_scores',     // Record<moduleSlug, QuizScore>
  TIP_BOOKMARKS:  'costwise_tip_bookmarks',   // string[] (tip IDs)
  AUTH_TOKEN:     'costwise_auth_token',
  AUTH_USER:      'costwise_auth_user',
} as const;

export const QUIZ_CONFIG = {
  MIN_QUESTIONS:           5,
  MIN_OPTIONS_PER_QUESTION: 3,
} as const;

export const TIP_CATEGORIES = [
  { value: 'all',             label: 'All Tips' },
  { value: 'palengke',        label: 'Palengke Tips' },
  { value: 'energy-saving',   label: 'Energy Saving' },
  { value: 'commuter-hacks',  label: 'Commuter Hacks' },
] as const;

export const SIMULATOR_CONFIG = {
  MIN_YEAR:   2000,
  TIMEOUT_MS: 2000,
} as const;

export const LEARN_MODULES = [
  { slug: 'what-is-inflation',  title: 'What is Inflation?' },
  { slug: 'purchasing-power',   title: 'Purchasing Power' },
  { slug: 'cpi-explained',      title: 'The Consumer Price Index (CPI) Explained' },
] as const;

export const HOUSEHOLD_ITEMS = [
  { id: 'nfa-rice-1kg',       label: '1 kg NFA Rice' },
  { id: 'diesel-1l',          label: '1 L Diesel Fuel' },
  { id: 'eggs-1dozen',        label: '1 Dozen Eggs' },
  { id: 'jeepney-fare',       label: 'Single Jeepney Fare' },
  { id: 'cooking-oil-1l',     label: '1 L Cooking Oil' },
] as const;

export const HEADER_HEIGHT = '64px';

// Password reset link expiry (hours)
export const PASSWORD_RESET_EXPIRY_HOURS = 1;
```

#### `lib/utils.ts`
```typescript
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Format a number as Philippine Peso (e.g. ₱6,847.00) */
export function formatPeso(value: number): string {
  return new Intl.NumberFormat('en-PH', {
    style: 'currency',
    currency: 'PHP',
    minimumFractionDigits: 2,
  }).format(value);
}

/**
 * Calculate inflation-adjusted value using compound annual rates.
 * rates: array of { year: number; annual_rate: number } from inflation-data.json
 */
export function calcInflationAdjusted(
  amount: number,
  baseYear: number,
  targetYear: number,
  rates: Array<{ year: number; annual_rate: number }>
): number {
  let adjusted = amount;
  const start = Math.min(baseYear, targetYear);
  const end   = Math.max(baseYear, targetYear);
  const forward = baseYear <= targetYear;

  for (let y = start; y < end; y++) {
    const rate = rates.find(r => r.year === y)?.annual_rate ?? 0;
    if (forward) {
      adjusted *= 1 + rate / 100;
    } else {
      adjusted /= 1 + rate / 100;
    }
  }
  return adjusted;
}
```

#### `lib/types.ts`
```typescript
// ── Auth ──────────────────────────────────────────────────────────────────────
export interface User {
  id:          string;
  displayName: string;
  email:       string;
  createdAt:   string;
}

export interface Session {
  userId:    string;
  token:     string;
  expiresAt: string;
}

// ── Quiz ──────────────────────────────────────────────────────────────────────
export interface QuizModule {
  slug:            string;
  title:           string;
  linkedLearnSlug: string;
  questions:       Question[];
}

export interface Question {
  id:           string;
  text:         string;
  options:      string[];
  correctIndex: number;
  explanation:  string;
}

export interface QuizProgress {
  moduleSlug:           string;
  currentQuestionIndex: number;
  answers:              (number | null)[];
}

export interface QuizScore {
  moduleSlug:  string;
  score:       number;
  total:       number;
  completedAt: string;
}

// ── Tips ──────────────────────────────────────────────────────────────────────
export interface Tip {
  id:       string;
  category: 'palengke' | 'energy-saving' | 'commuter-hacks' | string;
  title:    string;
  body:     string;
  url:      string;
}

// ── Simulator ─────────────────────────────────────────────────────────────────
export interface SimulatorInput {
  amount:          number;
  baseYear:        number;
  householdItemId?: string;
}

export interface SimulatorResult {
  adjustedValue: number;
  baseYear:      number;
  targetYear:    number;
  itemLabel?:    string;
}

export interface InflationRate {
  year:        number;
  annual_rate: number;
}

export interface HouseholdItem {
  id:          string;
  label:       string;
  base_prices: Record<string, number>;
}
```

#### `lib/validation-schemas.ts`
```typescript
import { z } from 'zod';
import { SIMULATOR_CONFIG } from './constants';

// Registration
export const registerSchema = z.object({
  email: z.string().email('Please enter a valid email address.'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters.')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter.')
    .regex(/[0-9]/, 'Password must contain at least one number.')
    .regex(/[^a-zA-Z0-9]/, 'Password must contain at least one special character.'),
});
export type RegisterInput = z.infer<typeof registerSchema>;

// Login — email + password only, no OTP
export const loginSchema = z.object({
  email:    z.string().email('Please enter a valid email address.'),
  password: z.string().min(1, 'Password is required.'),
});
export type LoginInput = z.infer<typeof loginSchema>;

// Forgot Password
export const forgotPasswordSchema = z.object({
  email: z.string().email('Please enter a valid email address.'),
});
export type ForgotPasswordInput = z.infer<typeof forgotPasswordSchema>;

// Reset Password
export const resetPasswordSchema = z.object({
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters.')
    .regex(/[A-Z]/, 'Must contain at least one uppercase letter.')
    .regex(/[0-9]/, 'Must contain at least one number.')
    .regex(/[^a-zA-Z0-9]/, 'Must contain at least one special character.'),
});
export type ResetPasswordInput = z.infer<typeof resetPasswordSchema>;

// Profile Update
export const profileUpdateSchema = z.object({
  displayName: z.string().min(1, 'Display name is required.'),
  email:       z.string().email('Please enter a valid email address.'),
  password: z
    .string()
    .optional()
    .refine(
      val => !val || (val.length >= 8 && /[A-Z]/.test(val) && /[0-9]/.test(val) && /[^a-zA-Z0-9]/.test(val)),
      { message: 'Password must be at least 8 characters with uppercase, number, and special character.' }
    ),
});
export type ProfileUpdateInput = z.infer<typeof profileUpdateSchema>;

// Simulator
export const simulatorSchema = z.object({
  amount: z
    .number({ invalid_type_error: 'Please enter a valid number.' })
    .positive('Amount must be greater than zero.'),
  baseYear: z
    .number()
    .min(SIMULATOR_CONFIG.MIN_YEAR)
    .max(new Date().getFullYear()),
  householdItemId: z.string().optional(),
});
export type SimulatorInput = z.infer<typeof simulatorSchema>;
```

#### `lib/react-query-client.ts`
```typescript
import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime:            5 * 60 * 1000,
      gcTime:               10 * 60 * 1000,
      retry:                1,
      refetchOnWindowFocus: false,
      refetchOnReconnect:   true,
    },
  },
});

export const queryKeys = {
  tips:           ['tips'] as const,
  tipsList:       (category?: string) => ['tips', 'list', category] as const,
  quizzes:        ['quizzes'] as const,
  quizzesList:    () => ['quizzes', 'list'] as const,
  quiz:           (slug: string) => ['quizzes', 'detail', slug] as const,
  inflationData:  ['simulator', 'inflation-data'] as const,
  currentUser:    ['auth', 'me'] as const,
};
```

#### `lib/session-manager.ts`
```typescript
import { Session } from './types';
import { STORAGE_KEYS } from './constants';

const SESSION_KEY = STORAGE_KEYS.AUTH_TOKEN;

export const sessionManager = {
  save(session: Session): void {
    localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  },
  load(): Session | null {
    const raw = localStorage.getItem(SESSION_KEY);
    return raw ? JSON.parse(raw) : null;
  },
  clear(): void {
    localStorage.removeItem(SESSION_KEY);
    localStorage.removeItem(STORAGE_KEYS.AUTH_USER);
  },
};
```

### Step 3.3 — API Layer Files

#### `lib/api/config.ts`
```typescript
export const API_CONFIG = {
  USE_MOCK_DATA: process.env.NEXT_PUBLIC_USE_MOCK_DATA === 'true',
  USE_MOCK_AUTH: process.env.NEXT_PUBLIC_USE_MOCK_AUTH === 'true',
  BASE_URL:      process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api',
  TIMEOUT:       30_000,
  MOCK_DELAY:    300,
  VERSION:       'v1',
  ENDPOINTS: {
    AUTH: {
      REGISTER:        '/auth/register',
      LOGIN:           '/auth/login',
      LOGOUT:          '/auth/logout',
      FORGOT_PASSWORD: '/auth/forgot-password',
      RESET_PASSWORD:  '/auth/reset-password',
      ME:              '/auth/me',
    },
    PROFILE: {
      UPDATE: '/profile',
    },
    QUIZZES: {
      LIST:       '/quizzes',
      GET:        (slug: string) => `/quizzes/${slug}`,
      SYNC_SCORE: '/quizzes/scores',
    },
    TIPS: {
      LIST:           '/tips',
      SYNC_BOOKMARKS: '/tips/bookmarks',
    },
    SIMULATOR: {
      CALCULATE:      '/simulator/calculate',
      INFLATION_DATA: '/simulator/inflation-data',
    },
  },
} as const;

export interface ApiResponse<T> {
  success:  boolean;
  data:     T;
  message?: string;
  errors?:  Record<string, string[]>;
  meta?:    { page?: number; limit?: number; total?: number; totalPages?: number };
}

export function getEndpointUrl(endpoint: string): string {
  return `${API_CONFIG.BASE_URL}${endpoint}`;
}
```

#### `lib/api/repositories/base-repository.ts`
```typescript
import { API_CONFIG } from '../config';
import { STORAGE_KEYS } from '@/lib/constants';

export abstract class BaseRepository {
  protected useMockData: boolean;

  constructor() {
    this.useMockData = API_CONFIG.USE_MOCK_DATA;
  }

  protected buildUrl(endpoint: string): string {
    return `${API_CONFIG.BASE_URL}${endpoint}`;
  }

  protected async simulateDelay(): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, API_CONFIG.MOCK_DELAY));
  }

  protected async fetchApi<T>(url: string, options: RequestInit = {}): Promise<T> {
    const token   = localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...(options.headers as Record<string, string>),
    };
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(url, { ...options, headers });

    if (response.status === 401 || response.status === 403) {
      window.dispatchEvent(new Event('costwise_unauthorized_intercept'));
    }

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `HTTP error ${response.status}`);
    }

    return response.json();
  }
}
```

---

## Phase 4: Core Component Setup

### Step 4.1 — Root Layout (`app/layout.tsx`)

```tsx
import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { Toaster } from 'sonner';
import { ReactQueryProvider } from '@/providers/react-query-provider';
import { AuthProvider } from '@/contexts/auth-context';
import { ErrorBoundary } from '@/components/error-boundary';
import './globals.css';

const geistSans = Geist({ variable: '--font-sans', subsets: ['latin'] });
const geistMono = Geist_Mono({ variable: '--font-mono', subsets: ['latin'] });

export const metadata: Metadata = {
  title:       'CostWise',
  description: 'Understand inflation, purchasing power, and manage your budget — tailored for Filipinos.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased`}>
        <ErrorBoundary>
          <ReactQueryProvider>
            <AuthProvider>
              {children}
              <Toaster richColors position="top-right" />
            </AuthProvider>
          </ReactQueryProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}
```

> **Note**: CostWise does **not** use `SessionTimeoutProvider` — there is no session inactivity timeout. All features are accessible to guests without a session.

### Step 4.2 — Public Layout (Guest + Auth pages)

CostWise has **no** authenticated sidebar layout. All pages share the same public shell:

```tsx
// components/nav/global-header.tsx
'use client';
import Link from 'next/link';
import { useAuth } from '@/contexts/auth-context';
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';
import { MobileDrawer } from './mobile-drawer';
import { useState } from 'react';

export function GlobalHeader() {
  const { user, logout } = useAuth();
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-primary text-primary-foreground">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        {/* Logo */}
        <Link href="/home" className="text-xl font-bold tracking-tight">
          CostWise
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden gap-6 lg:flex">
          <Link href="/learn">Learn</Link>
          <Link href="/simulator">Simulator</Link>
          <Link href="/quizzes">Quizzes</Link>
          <Link href="/tips">Tips</Link>
        </nav>

        {/* Desktop Auth */}
        <div className="hidden items-center gap-3 lg:flex">
          {user ? (
            /* logged-in: avatar dropdown */
            <span>{user.displayName}</span>
          ) : (
            <>
              <Link href="/login">Sign In</Link>
              <Button asChild className="bg-secondary text-secondary-foreground hover:bg-secondary/90">
                <Link href="/register">Sign Up</Link>
              </Button>
            </>
          )}
        </div>

        {/* Mobile hamburger */}
        <button
          className="lg:hidden"
          aria-label="Open navigation"
          onClick={() => setDrawerOpen(true)}
        >
          <Menu className="h-6 w-6" />
        </button>
      </div>

      <MobileDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} user={user} onLogout={logout} />
    </header>
  );
}
```

### Step 4.3 — Providers

```tsx
// providers/react-query-provider.tsx
'use client';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { queryClient } from '@/lib/react-query-client';

export function ReactQueryProvider({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
```

### Step 4.4 — Auth Context (`contexts/auth-context.tsx`)

```tsx
'use client';
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '@/lib/types';
import { STORAGE_KEYS } from '@/lib/constants';
import { sessionManager } from '@/lib/session-manager';

interface AuthContextValue {
  user:    User | null;
  isLoading: boolean;
  login:   (token: string, user: User) => void;
  logout:  () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser]         = useState<User | null>(null);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEYS.AUTH_USER);
    if (raw) setUser(JSON.parse(raw));
    setLoading(false);
  }, []);

  function login(token: string, user: User) {
    localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, token);
    localStorage.setItem(STORAGE_KEYS.AUTH_USER, JSON.stringify(user));
    setUser(user);
  }

  function logout() {
    sessionManager.clear();
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
```

> **Rule**: No OTP step. The login flow is: POST `/auth/login` → receive JWT → store token → redirect to `/home`.

### Step 4.5 — Page File Template

```tsx
// NEVER add 'use client' to page files
import type { Metadata } from 'next';
import { [Module]Page as [Module]PageComponent } from '@/components/[module]/[module]-page';

export const metadata: Metadata = {
  title: '[Page Name] | CostWise',
  description: '[Page description]',
};

export default function [Module]Page() {
  return <[Module]PageComponent />;
}
```

### Step 4.6 — Feature Component Template

```tsx
'use client';
import { GlobalHeader } from '@/components/nav/global-header';
import { PageFooter } from '@/components/common/page-footer';

export function [Module]Page() {
  return (
    <>
      <GlobalHeader />
      <main className="mx-auto max-w-7xl px-4 py-8 space-y-8">
        {/* page content */}
      </main>
      <PageFooter />
    </>
  );
}
```

---

## Phase 5: Design System Setup

### Step 5.1 — `app/globals.css`

Uses the **"Modern Local"** palette — Deep Sky Blue (trust), Warm Amber (warmth), Jade Green (growth):

```css
@import "tailwindcss";
@import "tw-animate-css";

@custom-variant dark (&:is(.dark *));

@theme inline {
  --color-background:            var(--background);
  --color-foreground:            var(--foreground);
  --color-primary:               var(--primary);
  --color-primary-foreground:    var(--primary-foreground);
  --color-secondary:             var(--secondary);
  --color-secondary-foreground:  var(--secondary-foreground);
  --color-accent:                var(--accent);
  --color-accent-foreground:     var(--accent-foreground);
  --color-success:               var(--success);
  --color-success-foreground:    var(--success-foreground);
  --color-warning:               var(--warning);
  --color-warning-foreground:    var(--warning-foreground);
  --color-destructive:           var(--destructive);
  --color-destructive-foreground: var(--destructive-foreground);
  --color-info:                  var(--info);
  --color-info-foreground:       var(--info-foreground);
  --color-muted:                 var(--muted);
  --color-muted-foreground:      var(--muted-foreground);
  --color-card:                  var(--card);
  --color-card-foreground:       var(--card-foreground);
  --color-border:                var(--border);
  --color-input:                 var(--input);
  --color-ring:                  var(--ring);

  --radius-sm: calc(var(--radius) - 4px);
  --radius-md: calc(var(--radius) - 2px);
  --radius-lg: var(--radius);
  --radius-xl: calc(var(--radius) + 4px);

  --font-sans: var(--font-sans);
  --font-mono: var(--font-mono);
}

@layer base {
  :root {
    /* === CostWise "Modern Local" Brand Colors === */
    --primary:             #005691;   /* Deep Sky Blue — trust, intelligence, calm */
    --primary-foreground:  #ffffff;
    --secondary:           #FFB74D;   /* Warm Amber — energy, approachability */
    --secondary-foreground: #1a1a1a;
    --accent:              #00A86B;   /* Jade Green — growth, prosperity */
    --accent-foreground:   #ffffff;

    /* === Semantic Colors === */
    --success:             #16a34a;
    --success-foreground:  #ffffff;
    --warning:             #f59e0b;
    --warning-foreground:  #ffffff;
    --destructive:         #dc2626;
    --destructive-foreground: #ffffff;
    --info:                #0369a1;
    --info-foreground:     #ffffff;

    /* === Neutrals === */
    --background:          #F8F9FA;   /* Off-White — clean, highly legible */
    --foreground:          #111827;
    --card:                #ffffff;
    --card-foreground:     #111827;
    --muted:               #f3f4f6;
    --muted-foreground:    #6b7280;
    --border:              #d1d5db;
    --input:               #d1d5db;
    --ring:                var(--primary);

    /* === Radius === */
    --radius: 0.625rem;
  }
}
```

### Step 5.2 — Color Token Reference

| Role | Token | Hex | Usage |
|---|---|---|---|
| Primary | `bg-primary` | `#005691` | Header, primary buttons, active nav links |
| Secondary | `bg-secondary` | `#FFB74D` | Sign Up button, highlight CTAs, badges |
| Accent | `bg-accent` | `#00A86B` | Correct answer indicator, growth stats, bookmark active state |
| Background | `bg-background` | `#F8F9FA` | Page background |
| Destructive | `bg-destructive` | `#dc2626` | Incorrect answer indicator, error states |

> **Rule**: Never use raw Tailwind color classes (e.g., `bg-blue-700`). Always use design tokens.

### Step 5.3 — Create `DESIGN_SYSTEM.md`

Copy the agency `02_DESIGN_SYSTEM_GUIDE.md` template and fill in:
- Brand palette above
- Badge/status color maps for quiz results (correct / incorrect / unanswered) and tip categories
- Any CostWise-specific component patterns (TipCard, QuizProgressBar, TipOfDayCard)

---

## Phase 6: Documentation Setup

### Step 6.1 — Required Documentation Files

```
README.md              # Quick-reference: commands, login, links to docs
DOCUMENTATION.md       # CostWise_Documentation.md (rename/copy here)
DESIGN_SYSTEM.md       # Modern Local design system
DIAGRAMS.md            # Architecture diagrams
CHANGELOG.md           # Version history
```

### Step 6.2 — README.md

```markdown
# CostWise

A web-based educational platform helping Filipinos understand inflation, purchasing power,
and practical budgeting — with interactive tools, gamified quizzes, and localized tips.

## Documentation
- [DOCUMENTATION.md](./DOCUMENTATION.md) — Complete reference guide
- [DESIGN_SYSTEM.md](./DESIGN_SYSTEM.md) — Modern Local UI design system
- [DIAGRAMS.md](./DIAGRAMS.md) — Architecture diagrams

## Quick Start
\```bash
pnpm install
pnpm dev
\```

## Login Credentials (Dev)
\```
Email:    demo@costwise.ph
Password: DemoPass1!
\```
> Guest access is available without any credentials — simply visit the app.

## Environment Variables
See `.env.example`

## Tech Stack
- Framework: Next.js (App Router)
- Language: TypeScript
- Styling: Tailwind CSS v4 + shadcn/ui
- Design: "Modern Local" (#005691 / #FFB74D / #00A86B)
```

---

## Phase 7: Auth Setup

> ⚠️ **CostWise has no OTP.** The original template's OTP phase is **removed**. Auth is email + password only.

### Step 7.1 — Authentication Flow

```
Guest (full access, no account required)
    ↓ [optional]
Register → POST /auth/register → JWT issued → store in localStorage → redirect /home
    OR
Login → POST /auth/login → JWT issued → store in localStorage → merge browser storage into account → redirect /home
    ↓
Forgot Password → POST /auth/forgot-password → email link (expires 1hr)
    → POST /auth/reset-password → redirect /login with confirmation
    ↓
Logout → clear localStorage → return to guest state (full access retained)
```

### Step 7.2 — Guest-First Rules

- **No feature is ever blocked** behind authentication.
- Profile Management (`/profile`) is the only page hidden from guests — redirect to `/login` if accessed unauthenticated.
- All other pages (`/home`, `/learn`, `/simulator`, `/quizzes`, `/tips`) must render fully for guests.
- Browser storage (localStorage) is the primary data layer for guests: quiz progress, quiz scores, and tip bookmarks.
- On login, merge browser storage data into the user's account (most recent entry wins on conflict).

### Step 7.3 — `components/auth/` Files to Create

| File | Purpose |
|---|---|
| `login-page.tsx` | Email + password form. On success → call `login(token, user)` from `useAuth` |
| `register-page.tsx` | Email + password form. On success → call `login(token, user)` |
| `forgot-password-page.tsx` | Email form → POST `/auth/forgot-password` |
| `reset-password-page.tsx` | New password form → POST `/auth/reset-password` |

No OTP form, no OTP verification step, no OTP-related components.

### Step 7.4 — Profile Guard (Only Route Requiring Auth)

```tsx
// components/profile/profile-guard.tsx
'use client';
import { useAuth } from '@/contexts/auth-context';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export function ProfileGuard({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !user) router.replace('/login');
  }, [user, isLoading, router]);

  if (isLoading || !user) return null;
  return <>{children}</>;
}
```

---

## Phase 8: Testing Setup

### Step 8.1 — Smoke Test (`tests/smoke.test.ts`)

```typescript
import { test, expect } from '@playwright/test';

const BASE_URL      = 'http://localhost:3000';
const DEMO_EMAIL    = 'demo@costwise.ph';
const DEMO_PASSWORD = 'DemoPass1!';

test.describe('CostWise Smoke Tests', () => {

  test('Guest: Home Page loads with hero and Tip of the Day', async ({ page }) => {
    await page.goto(`${BASE_URL}/home`);
    await expect(page.locator('h1')).toBeVisible();
    await expect(page.getByText('Tip of the Day', { exact: false })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Start Learning' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Try the Simulator' })).toBeVisible();
  });

  test('Guest: All primary nav links accessible', async ({ page }) => {
    await page.goto(`${BASE_URL}/home`);
    for (const href of ['/learn', '/simulator', '/quizzes', '/tips']) {
      const response = await page.goto(`${BASE_URL}${href}`);
      expect(response?.status()).toBe(200);
    }
  });

  test('Simulator: Valid input returns adjusted value', async ({ page }) => {
    await page.goto(`${BASE_URL}/simulator`);
    await page.fill('[id="amount"]', '1000');
    await page.selectOption('[id="baseYear"]', '2010');
    await page.click('[id="calculate-submit"]');
    await expect(page.locator('[data-testid="adjusted-value"]')).toBeVisible({ timeout: 2000 });
    await expect(page.locator('[data-testid="adjusted-value"]')).toContainText('₱');
  });

  test('Simulator: Invalid input shows inline error', async ({ page }) => {
    await page.goto(`${BASE_URL}/simulator`);
    await page.click('[id="calculate-submit"]');
    await expect(page.locator('[role="alert"]')).toBeVisible();
  });

  test('Quiz: Start, answer, see score summary', async ({ page }) => {
    await page.goto(`${BASE_URL}/quizzes`);
    await page.getByRole('link', { name: /Start Quiz/i }).first().click();
    await page.getByRole('button').first().click(); // select first answer option
    // Continue through remaining questions
    await expect(page.locator('[data-testid="score-summary"]')).toBeVisible({ timeout: 30_000 });
  });

  test('Tips: Bookmarking persists on reload', async ({ page }) => {
    await page.goto(`${BASE_URL}/tips`);
    await page.getByRole('button', { name: /bookmark/i }).first().click();
    await page.reload();
    // Bookmark state should be restored from localStorage
    const bookmarkBtn = page.getByRole('button', { name: /bookmarked/i }).first();
    await expect(bookmarkBtn).toBeVisible();
  });

  test('Auth: Register flow (no OTP step)', async ({ page }) => {
    const email = `test+${Date.now()}@costwise.ph`;
    await page.goto(`${BASE_URL}/register`);
    await page.fill('[id="email"]', email);
    await page.fill('[id="password"]', 'TestPass1!');
    await page.click('[id="register-submit"]');
    // Should land directly on /home (no OTP page)
    await page.waitForURL(`${BASE_URL}/home`);
    await expect(page).toHaveURL(/\/home/);
  });

  test('Auth: Login flow (no OTP step)', async ({ page }) => {
    await page.goto(`${BASE_URL}/login`);
    await page.fill('[id="email"]', DEMO_EMAIL);
    await page.fill('[id="password"]', DEMO_PASSWORD);
    await page.click('[id="login-submit"]');
    // Should land directly on /home (no OTP page)
    await page.waitForURL(`${BASE_URL}/home`);
    await expect(page).toHaveURL(/\/home/);
  });

  test('Tip of the Day: Same tip on Home and Tips page', async ({ page }) => {
    await page.goto(`${BASE_URL}/home`);
    const homeTip = await page.locator('[data-testid="tip-of-day-title"]').textContent();
    await page.goto(`${BASE_URL}/tips`);
    const tipsTip = await page.locator('[data-testid="tip-of-day-title"]').textContent();
    expect(homeTip).toBe(tipsTip);
  });

  test('404: Custom not-found page renders with nav', async ({ page }) => {
    await page.goto(`${BASE_URL}/this-does-not-exist`);
    await expect(page.getByText(/page doesn't exist/i)).toBeVisible();
    await expect(page.locator('header')).toBeVisible(); // nav intact
    await expect(page.locator('footer')).toBeVisible(); // footer intact
  });

});
```

---

## Phase 9: Pre-Launch Checklist

### Code Quality
- [ ] `pnpm tsc --noEmit` — no TypeScript errors
- [ ] `pnpm lint` — no ESLint errors
- [ ] `pnpm build` — production build succeeds
- [ ] All `[placeholder]` text removed from documentation

### Architecture
- [ ] All routes follow Server Page + Client Component pattern
- [ ] No `'use client'` on `page.tsx` files
- [ ] All page files export `metadata` or `generateMetadata()`
- [ ] Provider hierarchy matches the standard (`ErrorBoundary → ReactQueryProvider → AuthProvider`)
- [ ] All feature components are under `components/[module]/`

### Design System
- [ ] All colors use design tokens (no raw Tailwind color classes like `bg-blue-700`)
- [ ] All icons are from `lucide-react`
- [ ] Fonts loaded via `next/font` (not CSS `@import`)
- [ ] Page root wrapper uses `mx-auto max-w-7xl px-4 py-8 space-y-8`
- [ ] Null/empty values show `—` (em dash) in read-only views

### Data Layer
- [ ] `lib/api/config.ts` has all CostWise endpoints mapped
- [ ] All repositories extend `BaseRepository`
- [ ] `USE_MOCK_DATA` toggle works correctly
- [ ] React Query `staleTime`, `gcTime`, `retry` configured
- [ ] `queryKeys` factory used consistently
- [ ] `inflation-data.json` is present and correctly structured
- [ ] `tips.json` is present with all required categories
- [ ] `quiz-questions.json` has ≥ 5 questions with ≥ 3 options each per module

### Auth & Guest-First
- [ ] No feature is blocked for guest users (except `/profile`)
- [ ] `/profile` route redirects unauthenticated users to `/login`
- [ ] Login flow does **not** include an OTP step
- [ ] Register flow does **not** include an OTP step
- [ ] Password reset link expires after 1 hour
- [ ] Browser storage data merges into account on login (no conflicts dropped silently)
- [ ] Logout clears session and returns user to full guest access

### CostWise-Specific Features
- [ ] Tip of the Day: same tip on `/home` and `/tips`; does not change on refresh within same calendar day
- [ ] Simulator: result displayed within 2 seconds; loading indicator shown during processing
- [ ] Simulator: invalid/empty input shows inline error and blocks calculation
- [ ] Simulator: household item selection auto-populates amount field
- [ ] Quiz: progress bar shows "Question N of M" throughout
- [ ] Quiz: correct/incorrect feedback uses both color **and** text label (never color alone)
- [ ] Quiz: explanation shown for every incorrect answer before proceeding
- [ ] Quiz: progress is saved to localStorage; restores on return to quiz
- [ ] Quiz: score summary screen shown on completion with "Retake Quiz" option
- [ ] Tips: category filter works without full page reload
- [ ] Tips: bookmark toggle saves to localStorage; persists on page reload
- [ ] Tips: "Copy Link" copies URL to clipboard and shows toast "Link copied!"
- [ ] Account creation prompt appears after quiz completion / first bookmark (dismissible, non-intrusive)

### Navigation
- [ ] Desktop nav (≥ 1280px) shows full links
- [ ] Mobile nav (< 768px) shows hamburger → slide-in drawer
- [ ] Drawer is focus-trapped while open; dismissible via backdrop, close icon, or Escape
- [ ] Active nav link is visually highlighted
- [ ] Nav remains functional at 320px minimum viewport width

### Documentation
- [ ] `DOCUMENTATION.md` complete and current
- [ ] `DESIGN_SYSTEM.md` filled with CostWise-specific tokens
- [ ] `DIAGRAMS.md` has all required diagram types
- [ ] `README.md` has quick start instructions

### Testing
- [ ] Playwright smoke test covers all flows listed in Phase 8
- [ ] **No OTP step** in any Playwright test
- [ ] All tests pass with `npx playwright test`

### Accessibility
- [ ] All icon-only buttons have `aria-label`
- [ ] All form inputs have associated `<Label>` and `id`
- [ ] Error messages use `role="alert"`
- [ ] One `<h1>` per page
- [ ] Correct/incorrect quiz feedback never relies on color alone

---

## Phase 10: Handoff Standard

When handing off the CostWise project:

1. **Share** all 5 `AGENCY_STANDARDS/` documents + `CostWise_Documentation.md` + `DESIGN_SYSTEM.md`
2. **Confirm** `USE_MOCK_DATA=true` works standalone (without backend)
3. **Verify** all environment variables are documented in `.env.example`
4. **Provide** demo login credentials: `demo@costwise.ph` / `DemoPass1!`
5. **Note** that guest access requires no credentials — simply visit the app
6. **Run** `npx playwright test` and attach the test report
7. **Confirm** no OTP-related code, routes, components, or environment variables exist in the codebase
