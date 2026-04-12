# CostWise — Complete Documentation

**Version**: 1.0.0  
**Last Updated**: 2026-04-12  
**Status**: Draft  
**Client**: CostWise  
**Project Lead**: TBD

---

> For design conventions, colors, component patterns, and badge usage, see `DESIGN_SYSTEM.md`.

## Table of Contents

1. [Overview](#1-overview)
2. [Quick Start](#2-quick-start)
3. [Project Structure](#3-project-structure)
4. [Application Shell & Navigation](#4-application-shell--navigation)
5. [Modules & Pages](#5-modules--pages)
6. [Authentication & Session Management](#6-authentication--session-management)
7. [Role-Based Access Control (RBAC)](#7-role-based-access-control-rbac)
8. [Data Layer](#8-data-layer)
9. [Type System](#9-type-system)
10. [Validation Schemas](#10-validation-schemas)
11. [API Integration](#11-api-integration)
12. [Error Handling](#12-error-handling)
13. [Constants & Configuration](#13-constants--configuration)
14. [Testing Guide](#14-testing-guide)
15. [Backend Migration Guide](#15-backend-migration-guide)
16. [Troubleshooting](#16-troubleshooting)
17. [Version History](#17-version-history)

---

## 1. Overview

CostWise is a web-based educational platform tailored for the Philippine market. Its primary goal is to demystify economic concepts — specifically the rising cost of living and inflation — through localized content, interactive simulations, and actionable financial advice. It targets Filipino students, young professionals, and general households seeking to understand purchasing power and manage budget constraints amidst inflation.

The platform is fully accessible without an account. Quiz scores, quiz progress, and bookmarked tips are automatically saved to the user's browser by default. Users may optionally create an account to sync this data across devices and browsers.

### Design System — "Modern Local" (Trusted & Vibrant)

This palette combines the trust of traditional finance with the warmth of tropical Philippines, making it ideal for encouraging financial literacy.

| Role | Hex | Description |
|---|---|---|
| Primary (Trust) | `#005691` | Deep Sky Blue — communicates intelligence, security, and calm |
| Secondary (Filipino warmth) | `#FFB74D` | Warm Amber/Orange — adds energy, approachability, and sparks interest in learning |
| Accent (Growth) | `#00A86B` | Jade Green — associated with prosperity, growth, and sustainable financial health |
| Background | `#F8F9FA` | Off-White — keeps the site clean and highly legible |

### Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 14+ (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 + shadcn/ui |
| Data Fetching | TanStack React Query v5 |
| Forms & Validation | React Hook Form + Zod |
| State Persistence | Browser Storage (localStorage) |
| Auth | Optional — email/password with JWT |

### Key Capabilities

- Financial literacy education via localized modules (Inflation 101, Purchasing Power, CPI)
- Interactive Inflation Calculator using official PSA/BSP historical data
- Gamified Financial Literacy Quizzes with progress tracking
- Practical Tips & Localized Budgeting (Palengke Tips, Energy Saving, Commuter Hacks)
- Tip of the Day — date-based, deterministic, consistent across all users
- Guest-first architecture: full feature access without an account
- Optional account creation to sync data across devices
- Mobile-first, responsive design (320px → 768px → 1280px)
- Taglish (Tagalog-English) content support for Filipino relatability

---

## 2. Quick Start

### Prerequisites
```
Node.js >= 18.x
pnpm >= 8.x (preferred) or npm
```

### Installation
```bash
pnpm install
```

### Development
```bash
pnpm dev
# App runs at http://localhost:3000
```

### Production Build
```bash
pnpm build
pnpm start
```

### Automated UI Testing
```bash
# Run all Playwright tests
npx playwright test

# Run in headed mode (visible browser)
npx playwright test --headed

# View test report
npx playwright show-report
```

### Login Credentials (Demo / Dev Seed)
```
Email:    demo@costwise.ph
Password: DemoPass1!
```
> Guest access is available without any credentials — simply visit the app.

### Environment Variables
Create `.env.local`:
```env
NEXT_PUBLIC_API_URL=http://localhost:3001/api
NEXT_PUBLIC_USE_MOCK_DATA=true
NEXT_PUBLIC_USE_MOCK_AUTH=true
```

| Variable | Description | Default |
|---|---|---|
| `NEXT_PUBLIC_API_URL` | Backend API base URL | `http://localhost:3001/api` |
| `NEXT_PUBLIC_USE_MOCK_DATA` | Use mock data instead of real API | `true` |
| `NEXT_PUBLIC_USE_MOCK_AUTH` | Use localStorage auth instead of real backend | `true` |

### Switching Between Mock and Real API
Open `lib/api/config.ts` and set:
```typescript
USE_MOCK_DATA: false  // true = mock, false = real backend
```

---

## 3. Project Structure

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
├── auth/                               # Login, Register, Forgot/Reset Password
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

### Provider Hierarchy (`app/layout.tsx`)
```
<ErrorBoundary>
  <ReactQueryProvider>
    <AuthProvider>
      {children}
      <Toaster />
    </AuthProvider>
  </ReactQueryProvider>
</ErrorBoundary>
```

### Component Architecture Pattern

The application follows a strict **Server Page + Client Container** pattern:

1. **Route Pages (`app/` directory):** Thin Server Components that handle `metadata`, data fetching (SSR), and dynamic route params. Must **NOT** use `'use client'`.
2. **Feature Components (`components/` directory):** Robust Client Components (`'use client'`) handling business logic, hooks, and user interaction.

> **Rule**: Never add business logic directly to `app/*/page.tsx`. The page file should only export metadata and render the feature component.

---

## 4. Application Shell & Navigation

### Global Navigation Header (`components/nav/global-header.tsx`)

The navigation is persistent and sticky across all pages, adapting to the user's authentication state.

#### Desktop (1280px and above)
```
+------------------+-------------------------------------------+--------------------+
| CostWise Logo    | Learn | Simulator | Quizzes | Tips        | Sign In  [Sign Up] |
+------------------+-------------------------------------------+--------------------+
```
- **Left**: CostWise logo/wordmark, links to `/home`
- **Center**: Primary nav links — Educational Hub (`/learn`), Price Simulator (`/simulator`), Quizzes (`/quizzes`), Practical Tips (`/tips`)
- **Right (guest)**: "Sign In" link + "Sign Up" button (styled in Secondary `#FFB74D`)
- **Right (logged-in)**: Bookmarks icon → `/tips?filter=bookmarks`, avatar/username dropdown → My Scores, My Bookmarks, Log Out

#### Mobile (below 768px)
```
+---------------------------+--+
| CostWise Logo             |☰ |
+---------------------------+--+
```
- Hamburger icon opens a slide-in drawer from the right
- Drawer contains: nav links, divider, auth controls
- Drawer is dismissible via backdrop tap, close icon, or Escape key
- Drawer must be focus-trapped while open

#### Behavior & State
- Active nav link is visually highlighted (underline + color `#005691`)
- Navigation remains functional and unclipped at minimum 320px viewport width
- All touch targets in the drawer meet minimum thumb-friendly size requirements

### Footer (`components/common/page-footer.tsx`)

Persistent across all pages.

- Displays the CostWise app name and support email
- Links to: Privacy Policy, Terms & Conditions, Cookie Information
- Policy links open the corresponding page or modal
- Fully keyboard-navigable; accessible without a mouse
- Responsive across mobile, tablet, and desktop

---

## 5. Modules & Pages

### 5.1 Home Page (`/home`)

**Purpose**: Entry point for all users. Adapts layout based on authentication state.

#### Guest State
- Hero section with tagline and description of CostWise's purpose
- Two primary CTAs: "Start Learning" → `/learn`, "Try the Simulator" → `/simulator`
- "Tip of the Day" card displayed prominently below the hero
- Feature highlights section: Educational Hub, Simulator, Quizzes, Tips — each with a short description and link
- Soft, non-intrusive account creation CTA (e.g., "Save your progress across devices — create a free account")
- No feature is blocked or gated behind account creation

#### Logged-In State
- Personalized welcome message: "Welcome back, [First Name]"
- "Continue Learning" card (highest priority): shows the user's most recent in-progress quiz module, progress indicator, and "Continue" button. If no in-progress quiz, prompts to start their first quiz
- "Tip of the Day" card directly below "Continue Learning"
- Quick stats strip: number of quizzes completed, number of tips bookmarked
- Feature highlights section and account creation CTA do **not** appear for logged-in users
- Personalized data must load and display within 2 seconds of page rendering

#### User Stories

| # | As a... | I want to... | So that... |
|---|---|---|---|
| 1 | Guest user | See an overview of what CostWise offers | I can understand the platform and decide whether to explore further |
| 2 | Logged-in user | See a personalized home page surfacing my progress and today's tip | I can quickly continue where I left off |
| 3 | Any user | See the same Tip of the Day regardless of how many times I refresh | I get a consistent daily experience |

---

### 5.2 Educational Hub — Inflation 101 (`/learn`)

**Purpose**: Provide simplified, localized explanations of economic concepts using Philippine examples (e.g., "Noche Buena" index, Jeepney fare hikes). Content is organized into modules and minimizes information overload, particularly on mobile.

#### Core Modules (minimum required)
- "What is Inflation?"
- "Purchasing Power"
- "The Consumer Price Index (CPI) Explained"

#### Module Page Behavior
- Each module implements a "Read More" toggle that collapses long-form content by default
- On mobile viewports, long content sections are collapsed behind the toggle by default
- Toggle expands to reveal full content when activated, and collapses again when re-activated
- Each module includes at least one localized visual aid (e.g., chart showing what ₱100 could buy in 2010 vs. today)
- Visual aids are clearly labeled with the years and values being compared

#### User Stories

| # | As a... | I want to... | So that... |
|---|---|---|---|
| 1 | Student | Read simplified explanations of inflation | I can understand why prices of basic goods in the Philippines are increasing |
| 2 | User | See visual comparisons of purchasing power over time | I can visualize the impact of inflation on the Philippine Peso |

---

### 5.3 Interactive Price Simulator — Inflation Calculator (`/simulator`)

**Purpose**: Allow users to input a specific Philippine Peso (PHP) amount and a reference year to see its inflation-adjusted equivalent value, based on official historical inflation data from the PSA or BSP. Users may also select common Filipino household items to see how their specific prices have changed over time.

#### Form Fields
- **PHP Amount**: numeric input, positive integers and decimals only; validates on submission
- **Year Selection**: dropdown ranging from 2000 to the current year
- **Household Item Selector** (optional): pre-populated dropdown with at least five common Filipino items (1 kg NFA rice, 1 L diesel fuel, 1 dozen eggs, a single jeepney fare, 1 L cooking oil). Selecting an item auto-populates the amount field with that item's known historical price

#### Output
- "Adjusted Value" displayed and formatted in Philippine Peso (e.g., ₱6,847.00)
- If a household item is selected, its adjusted price is displayed alongside the "Adjusted Value"
- Result returned and displayed within 2 seconds of form submission
- Loading indicator displayed while processing

#### Validation Rules
- Non-numeric, zero, or negative values trigger an inline error and prevent calculation
- Empty amount field on submission triggers an inline error and prevents calculation
- All calculations are based on verified PSA or BSP historical inflation data

#### User Stories

| # | As a... | I want to... | So that... |
|---|---|---|---|
| 1 | Young professional | Input a specific PHP amount and a past year | I can see how much that money is worth in today's economy |
| 2 | User | Select common Filipino household items | I can see how their prices have changed over time |

---

### 5.4 Financial Literacy Quizzes (`/quizzes`)

**Purpose**: Gamified assessments that test understanding of content in the Educational Hub. Each quiz is linked to a learning module and provides immediate feedback on each answer, including explanations for incorrect responses. Progress and scores are saved to browser storage for all users, and synced to account when logged in.

#### Quiz List Page
- Each module card displays the user's most recent score if one exists
- If no scores exist for a registered user, a prompt encourages taking the first quiz

#### Quiz Session
- At least 5 multiple-choice questions per quiz
- At least 3 answer options per question
- Progress indicator displayed throughout (e.g., "Question 2 of 5")
- Immediate feedback on answer selection — no separate confirmation step required
- Correct/Incorrect indicated via both color and a text label or icon ("Correct!" / "Incorrect!") — color is never the sole indicator
- For every incorrect answer, a brief explanation (1–3 sentences) of the correct concept is shown before proceeding
- Score Summary screen on completion showing correct answers out of total
- "Retake Quiz" option resets all answers and restarts from question 1
- Users can retake any quiz an unlimited number of times

#### Progress Persistence
- Current quiz progress (question index + answers given) is automatically saved to browser storage
- Navigating away and returning to an in-progress quiz restores the session to the last question
- Most recent score per module is saved to browser storage (guest) or account (registered user)
- Logged-in users: quiz scores and completion status are synced to account, accessible across devices
- On conflict during merge (same module has a score in both browser storage and account), the more recent score takes precedence

#### User Stories

| # | As a... | I want to... | So that... |
|---|---|---|---|
| 1 | Learner | Take a quiz after reading a module | I can validate my understanding of the topic |
| 2 | User | Receive immediate feedback on my answers | I can learn from my mistakes |
| 3 | Returning user | Have my quiz progress saved automatically | I can continue where I left off without losing my place |
| 4 | Registered user | Have my quiz scores saved to my account | I can view my progress across devices |

---

### 5.5 Practical Tips & Localized Budgeting (`/tips`)

**Purpose**: A repository of actionable, Philippines-specific financial tips and "money hacks" organized by spending category. Users can filter tips by category, bookmark favorites, and share tips with others. A "Tip of the Day" is featured prominently on the landing page.

#### Categories (minimum required)
- Palengke Tips
- Energy Saving
- Commuter Hacks

#### Tip Card Features
- "Copy Link" button — copies the tip's direct URL to clipboard; displays toast notification "Link copied!"
- At least one social media sharing button (e.g., Facebook, X/Twitter)
- Bookmark toggle button to save or unsave the tip

#### Category Filter
- Filter narrows the tips list by category without a full page reload
- If no tips match the selected filter, a "No tips found" empty state message is shown

#### Bookmarks
- Bookmarked tips are saved to browser storage for all users (logged in or not)
- "Bookmarks" view/filter allows users to see only their saved tips in one place
- If no bookmarked tips, the Bookmarks view displays an empty state with a prompt to start browsing tips
- Logged-in users: bookmarked tips are synced to account and accessible across devices
- If a guest has bookmarks in browser storage and then logs in or creates an account, bookmarks are automatically merged into the account without manual action

#### Tip of the Day
- Displayed prominently on the tips landing page
- The same tip is shown to all users on the same calendar date — does not change on page refresh within the same day
- Selection is date-based and deterministic
- Identical to the "Tip of the Day" shown on the Home Page

#### User Stories

| # | As a... | I want to... | So that... |
|---|---|---|---|
| 1 | Household head | Browse tips on saving on electricity and grocery shopping in the Philippines | I can better manage my monthly budget |
| 2 | User | Filter tips by category (e.g., Food, Transport, Utilities) | I can find relevant advice quickly |
| 3 | Returning user | Bookmark tips I find useful | I can easily find them again later |
| 4 | Registered user | Have my bookmarked tips saved to my account | I can access them across devices |

---

### 5.6 User Profile Management (`/profile`)

**Purpose**: A dedicated settings area for registered users to view and update their account details. Only accessible to logged-in users. Guests are not shown a profile page.

#### Profile Fields
- Display name (pre-populated on load)
- Email address (pre-populated on load)
- Password (blank by default; only updated if a new value is entered and submitted)

#### Validation
- Email must follow a valid email address format; invalid format triggers an inline error and prevents saving
- New password must meet minimum security requirements: at least 8 characters, one uppercase letter, one number, one special character
- Empty email field on submission triggers an inline error and prevents saving

#### Save Updates
- "Save Changes" button submits all editable fields
- On success: toast notification "Profile updated successfully."
- Changes to display name are reflected immediately in global navigation (e.g., avatar dropdown) without a page reload
- If password field is left blank, other fields are saved without modifying the existing password

#### Error Handling
- Attempting to update email to one already associated with another account shows inline error: "An account with this email already exists."
- If save fails due to network or server error, a clear error message is shown and the user's unsaved input is preserved
- All error messages are associated with the specific field or action that caused them

#### User Stories

| # | As a... | I want to... | So that... |
|---|---|---|---|
| 1 | Registered user | Update my profile details | I can keep my account information current and secure |

---

### 5.7 404 Page (`/not-found`)

**Purpose**: Custom error page displayed whenever a user navigates to a route that does not exist.

- Displays a clear, user-friendly message (e.g., "Oops! This page doesn't exist.")
- Includes a prominent link or button directing the user back to `/home`
- Global navigation and footer remain visible so users can navigate without using the back button
- Responsive across mobile, tablet, and desktop viewports

---

## 6. Authentication & Session Management

### Overview

CostWise uses an **optional** account system. Account creation is never required to use the platform. Guest users retain full access to all features, with data saved locally in their browser. Users are prompted — but never forced — to create an account at relevant moments (e.g., after completing a quiz or bookmarking a tip for the first time).

### Authentication Flow

```
Guest → [optional] Register / Sign In
                          ↓
              On login: browser storage data
              is automatically merged into account
              (most recent entry wins on conflict)
                          ↓
              Logged-in: data synced to account
              across devices and browsers
```

### Sign Up

- Registration form requires: valid email address + password (min. 8 chars, 1 uppercase, 1 number, 1 special character)
- If email is already in use: inline error "An account with this email already exists."
- Empty required fields on submission trigger inline validation errors and prevent registration

### Sign In

- Login form accepts email and password
- Invalid credentials show a generic inline error without specifying whether the email or password is incorrect
- On successful login: synced quiz scores and bookmarks are loaded and reflected across the platform immediately

### Password Reset

- "Forgot Password" link on the login page
- User enters registered email to receive a password reset link
- Password reset link expires after 1 hour
- After successfully resetting, user is redirected to the login page with a confirmation message

### Data Merge on Login

- On login, if the user has quiz scores or bookmarks in browser storage, the system automatically merges that data into their account — no manual action required
- If a conflict exists (same quiz module has a score in both browser storage and account), the more recent score takes precedence

### Sign Out

- Logout option accessible from any page (navigation menu)
- On logout: session is cleared; user is returned to the platform as a guest with full feature access retained

### Account Prompt Behavior

- After completing a quiz or bookmarking a tip for the first time, a non-intrusive dismissible banner or modal suggests account creation
- The prompt includes a clear dismiss option and does not reappear for the remainder of the session once dismissed

---

## 7. Role-Based Access Control (RBAC)

### User Roles

| Role | Description | Data Persistence |
|---|---|---|
| **Guest User** (Public, No Account) | Full access to all features: Educational Hub, Simulator, Quizzes, and Tips | Quiz progress, quiz scores, and tip bookmarks saved to browser storage only. Data is lost if browser storage is cleared. |
| **Registered User** (Authenticated) | Full access to all features. Profile Management page accessible. | Quiz progress, quiz scores, and tip bookmarks synced to account and accessible across devices and browsers. Browser storage data is merged into account on login. |

### Access Rules

| Feature | Guest | Registered |
|---|---|---|
| Educational Hub | ✅ Full access | ✅ Full access |
| Price Simulator | ✅ Full access | ✅ Full access |
| Quizzes | ✅ Full access | ✅ Full access |
| Practical Tips | ✅ Full access | ✅ Full access |
| Profile Management | ❌ Not shown | ✅ Full access |
| Cross-device data sync | ❌ Browser only | ✅ Account-synced |

> **Rule**: No feature is ever blocked behind a login gate. The system must never prevent a guest user from accessing any feature.

---

## 8. Data Layer

### Storage Strategy

| Data Type | Guest | Registered User |
|---|---|---|
| Quiz progress (current question + answers) | Browser storage | Browser storage (synced to account on login) |
| Quiz scores (most recent per module) | Browser storage | Account (synced) |
| Tip bookmarks | Browser storage | Account (synced) |
| Tip of the Day selection | Date-based deterministic logic | Date-based deterministic logic |

### Inflation Data

- Stored as a structured JSON file or database table containing historical PSA/BSP inflation rates
- Updated annually or whenever new official reports are released by the PSA or BSP
- Used exclusively by the Inflation Calculator for inflation-adjusted value computations

### Tip of the Day Selection

- Selection is date-based and deterministic
- All users — guest and registered, any device — see the same tip on the same calendar date
- The tip does not change on page refresh within the same calendar day
- The identical tip is shown on both the Home Page and the Tips section

### Data Merge on Login

- On successful login, browser-stored quiz scores and bookmarks are automatically merged into the user's account
- Conflict resolution: if a conflict exists (same module/tip has data in both browser storage and account), the more recent entry takes precedence

### Structured Data Sources

```json
// inflation-data.json (example structure)
{
  "rates": [
    { "year": 2000, "annual_rate": 4.0 },
    { "year": 2001, "annual_rate": 6.1 },
    ...
  ],
  "household_items": [
    { "id": "nfa-rice-1kg", "label": "1 kg NFA Rice", "base_prices": { "2000": 18.00, ... } },
    ...
  ]
}

// tips.json (example structure)
{
  "tips": [
    { "id": "tip-001", "category": "palengke", "title": "...", "body": "...", "url": "/tips/tip-001" },
    ...
  ]
}
```

---

## 9. Type System

All types are defined in `lib/types.ts`.

```typescript
// User / Auth
interface User {
  id: string;
  displayName: string;
  email: string;
  createdAt: string;
}

// Quiz
interface QuizModule {
  slug: string;
  title: string;
  linkedLearnSlug: string;
  questions: Question[];
}

interface Question {
  id: string;
  text: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

interface QuizProgress {
  moduleSlug: string;
  currentQuestionIndex: number;
  answers: (number | null)[];
}

interface QuizScore {
  moduleSlug: string;
  score: number;
  total: number;
  completedAt: string;
}

// Tips
interface Tip {
  id: string;
  category: 'palengke' | 'energy-saving' | 'commuter-hacks' | string;
  title: string;
  body: string;
  url: string;
}

// Simulator
interface SimulatorInput {
  amount: number;
  baseYear: number;
  householdItemId?: string;
}

interface SimulatorResult {
  adjustedValue: number;
  baseYear: number;
  targetYear: number;
  itemLabel?: string;
}

// Inflation Data
interface InflationRate {
  year: number;
  annual_rate: number;
}

interface HouseholdItem {
  id: string;
  label: string;
  base_prices: Record<string, number>;
}
```

---

## 10. Validation Schemas

All schemas are defined in `lib/validation-schemas.ts` using Zod.

```typescript
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

// Login
export const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address.'),
  password: z.string().min(1, 'Password is required.'),
});

// Profile Update
export const profileUpdateSchema = z.object({
  displayName: z.string().min(1, 'Display name is required.'),
  email: z.string().email('Please enter a valid email address.'),
  password: z
    .string()
    .optional()
    .refine(
      (val) => !val || (val.length >= 8 && /[A-Z]/.test(val) && /[0-9]/.test(val) && /[^a-zA-Z0-9]/.test(val)),
      { message: 'Password must be at least 8 characters with uppercase, number, and special character.' }
    ),
});

// Simulator
export const simulatorSchema = z.object({
  amount: z
    .number({ invalid_type_error: 'Please enter a valid number.' })
    .positive('Amount must be greater than zero.'),
  baseYear: z.number().min(2000).max(new Date().getFullYear()),
  householdItemId: z.string().optional(),
});
```

### Standard Field Rules

| Field | Rule |
|---|---|
| Email | Valid email format (RFC 5322) |
| Password (new) | ≥ 8 chars, at least 1 uppercase letter, 1 number, 1 special character |
| PHP Amount | Positive integers and decimals only; must be greater than zero |
| Year | Integer between 2000 and the current year |
| Display Name | Non-empty string |

---

## 11. API Integration

### API Configuration (`lib/api/config.ts`)

```typescript
export const API_CONFIG = {
  USE_MOCK_DATA: process.env.NEXT_PUBLIC_USE_MOCK_DATA === "true",
  BASE_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api',
  TIMEOUT: 30000,
  MOCK_DELAY: 300,
  VERSION: 'v1',
  ENDPOINTS: {
    AUTH: {
      REGISTER: '/auth/register',
      LOGIN: '/auth/login',
      LOGOUT: '/auth/logout',
      FORGOT_PASSWORD: '/auth/forgot-password',
      RESET_PASSWORD: '/auth/reset-password',
      ME: '/auth/me',
    },
    PROFILE: {
      UPDATE: '/profile',
    },
    QUIZZES: {
      LIST: '/quizzes',
      GET: (slug: string) => `/quizzes/${slug}`,
      SYNC_SCORE: '/quizzes/scores',
    },
    TIPS: {
      LIST: '/tips',
      SYNC_BOOKMARKS: '/tips/bookmarks',
    },
    SIMULATOR: {
      CALCULATE: '/simulator/calculate',
      INFLATION_DATA: '/simulator/inflation-data',
    },
  }
};
```

### Standard API Response Shape

```json
{
  "success": true,
  "data": {},
  "message": "Success",
  "meta": { "page": 1, "limit": 50, "total": 100, "totalPages": 2 }
}
```

Error response:
```json
{
  "success": false,
  "error": "Validation failed",
  "details": ["field is required"]
}
```

### HTTP Status Codes

| Code | Meaning |
|---|---|
| 200 | Success |
| 201 | Created |
| 400 | Bad request / validation error |
| 401 | Unauthorized → triggers automatic logout |
| 403 | Forbidden |
| 404 | Not found |
| 422 | Unprocessable entity |
| 500 | Server error |

### Authentication Header

Every authenticated API call includes:
```
Authorization: Bearer <token>
```
Token is read from `localStorage.getItem('auth_token')`.

---

## 12. Error Handling

### Error Boundary

Wraps the entire app in `app/layout.tsx`. Catches unhandled render errors.

```tsx
import { withErrorBoundary } from '@/components/error-boundary';
export default withErrorBoundary(MyComponent);
```

### Inline Validation Errors

Displayed immediately upon invalid input or failed submission on all form fields (Simulator amount, registration email, login password, profile fields). Errors are clearly associated with the specific field or action that caused them.

### Timeout & Retry

- If the Simulator calculation exceeds 2 seconds, a timeout message is shown prompting the user to try again
- If content fails to load (tips list, quiz questions), a user-friendly error message with a retry option is shown

### Network Fallback

- If an account sync operation fails due to network loss, the system falls back to browser storage silently
- The sync is retried automatically when connectivity is restored

### Loading States

| Scenario | Loading Indicator |
|---|---|
| Simulator processing a calculation | Spinner / loading indicator |
| Quiz questions being fetched | Spinner / loading indicator |
| Tips list being retrieved or filtered | Spinner / loading indicator |
| Account data (scores, bookmarks) being synced on login | Spinner / loading indicator |
| Personalized Home Page data being fetched for logged-in users | Spinner / loading indicator |

### Empty States

| Scenario | Display |
|---|---|
| No tips match active category filter | "No tips found" message |
| User has no bookmarked tips | Empty state with prompt to start browsing tips |
| Quiz module has no questions available | "Quiz not yet available" message (not a broken/empty state) |
| Registered user has no quiz scores yet | Prompt encouraging them to take their first quiz |

---

## 13. Constants & Configuration

All constants in `lib/constants.ts`. **Never hard-code these in components.**

```typescript
// Storage keys
export const STORAGE_KEYS = {
  QUIZ_PROGRESS: 'costwise_quiz_progress',       // Record<moduleSlug, QuizProgress>
  QUIZ_SCORES: 'costwise_quiz_scores',           // Record<moduleSlug, QuizScore>
  TIP_BOOKMARKS: 'costwise_tip_bookmarks',       // string[] (tip IDs)
  AUTH_TOKEN: 'costwise_auth_token',
  AUTH_USER: 'costwise_auth_user',
};

// Quiz config
export const QUIZ_CONFIG = {
  MIN_QUESTIONS: 5,
  MIN_OPTIONS_PER_QUESTION: 3,
};

// Tip categories
export const TIP_CATEGORIES = [
  { value: 'all', label: 'All Tips' },
  { value: 'palengke', label: 'Palengke Tips' },
  { value: 'energy-saving', label: 'Energy Saving' },
  { value: 'commuter-hacks', label: 'Commuter Hacks' },
];

// Simulator
export const SIMULATOR_CONFIG = {
  MIN_YEAR: 2000,
  TIMEOUT_MS: 2000,
};

// Layout
export const HEADER_HEIGHT = '64px';
```

---

## 14. Testing Guide

### Manual Testing Checklist

#### Guest User Flow
- [ ] Visit `/home` without an account — hero, Tip of the Day, and feature highlights display correctly
- [ ] Navigate to all four primary modules: Learn, Simulator, Quizzes, Tips
- [ ] Complete a quiz — progress is saved; returning to the quiz restores position
- [ ] Bookmark a tip — bookmark persists on page reload
- [ ] Account creation prompt appears after completing a quiz (non-intrusive, dismissible)
- [ ] Confirm no feature is blocked or gated

#### Logged-In User Flow
- [ ] Register with a valid email and password
- [ ] Log in — browser storage data merges into account
- [ ] Personalized home page loads within 2 seconds
- [ ] Profile update: display name, email; changes reflected in nav immediately
- [ ] Password reset flow (forgot password → email link → reset → redirect to login)
- [ ] Log out — session cleared; returned to guest state with full feature access

#### Simulator
- [ ] Enter valid amount + year → result displayed within 2 seconds
- [ ] Enter invalid/empty amount → inline error shown, calculation blocked
- [ ] Select household item → amount auto-populated, adjusted price displayed

#### Tip of the Day
- [ ] Same tip appears on Home Page and Tips section
- [ ] Tip does not change on page refresh within the same calendar day

#### Responsive Layout
- [ ] Mobile (320px): hamburger drawer works, all content readable and functional
- [ ] Tablet (768px): layout adapts correctly
- [ ] Desktop (1280px): full nav bar visible

#### Error States
- [ ] Simulate network failure — sync falls back to browser storage silently
- [ ] Invalid route → custom 404 page shown with nav and footer intact

### Module-Specific Tests

#### Authentication
1. Navigate to `http://localhost:3000/register`
2. Register with a valid email + strong password
3. Verify redirect to `/home` with personalized welcome
4. Navigate to `/profile`, update display name, verify nav reflects change immediately
5. Log out, verify guest state

#### Simulator
1. Navigate to `/simulator`
2. Enter `₱1000` and select year `2010`
3. Verify inflation-adjusted value is displayed within 2 seconds
4. Select a household item from the dropdown
5. Verify amount field auto-populates and adjusted price appears

#### Quizzes
1. Navigate to `/quizzes`
2. Select a quiz module and begin
3. Answer one question, navigate away, return — verify progress is restored
4. Complete quiz — verify Score Summary is shown with correct/total count
5. Click "Retake Quiz" — verify session resets to question 1

### Automated Testing (Playwright)

```bash
npx playwright test tests/smoke.test.ts --headed
```

The smoke test covers:
1. Guest home page loads with all expected sections
2. Simulator form: valid input → result displayed
3. Quiz flow: start, answer, score summary
4. Tip bookmarking
5. Registration and login flow

---

## 15. Backend Migration Guide

### Step 1: Set Backend URL
```env
NEXT_PUBLIC_API_URL=https://your-api.costwise.ph/api
```

### Step 2: Disable Mock Data
```typescript
// lib/api/config.ts
USE_MOCK_DATA: false,
```

### Step 3: Required Endpoints

Backend must implement all routes listed in §11, including:
- `POST /auth/register`
- `POST /auth/login`
- `POST /auth/logout`
- `POST /auth/forgot-password`
- `POST /auth/reset-password`
- `GET  /auth/me`
- `PUT  /profile`
- `GET  /quizzes`
- `GET  /quizzes/:slug`
- `POST /quizzes/scores` (sync scores from browser storage)
- `GET  /tips`
- `POST /tips/bookmarks` (sync bookmarks from browser storage)
- `POST /simulator/calculate`
- `GET  /simulator/inflation-data`

### Step 4: Auth Integration

Frontend sends `Authorization: Bearer <token>` automatically. Backend must:
- Issue JWT on `POST /auth/login` and `POST /auth/register`
- Return `401` for expired/invalid tokens (triggers automatic logout)
- Implement `POST /auth/refresh` for token renewal (optional)

### Step 5: Response Format

All responses must match the standard shape (§11). If your backend uses a different envelope, adjust `BaseRepository.fetchApi()`.

### Step 6: What Does NOT Change on Migration

- `hooks/use-api.ts` — all query/mutation hooks stay the same
- All UI components (they consume hooks, not repositories)
- Zod validation schemas
- RBAC components and hooks
- `lib/constants.ts`, `lib/types.ts`, `lib/utils.ts`
- Browser storage fallback logic

---

## 16. Troubleshooting

### Login doesn't work
- Check demo credentials
- Clear `localStorage` and reload
- Verify `NEXT_PUBLIC_USE_MOCK_AUTH` is set correctly

### Data not loading
- Verify `USE_MOCK_DATA` flag in `lib/api/config.ts`
- Check `NEXT_PUBLIC_API_URL` in `.env.local`
- Verify `costwise_auth_token` in localStorage (DevTools → Application → Local Storage)

### Quiz progress not restoring
- Check `costwise_quiz_progress` key in localStorage
- Verify `use-quiz-storage.ts` hook is correctly writing progress on each question advance

### Tip of the Day is changing on refresh
- Verify deterministic date-based selection logic in `use-tip-of-day.ts`
- Ensure the tip index is derived from the calendar date, not `Math.random()`

### Simulator not returning results
- Verify `inflation-data.json` is correctly structured and the target year exists in the rates array
- Check for validation errors in the form — amount must be positive and year must be in range

### React Query not refetching
- Check `staleTime` settings in `react-query-client.ts`
- Call `queryClient.invalidateQueries({ queryKey: queryKeys.* })`

### Build fails
- Run `pnpm install`
- Check TypeScript: `pnpm tsc --noEmit`
- Verify all imports resolve

---

## 17. Version History

### v1.0.0 (2026-04-12)
- Initial documentation draft
- Defined full requirements for Home Page, Educational Hub, Simulator, Quizzes, Tips, Authentication, Profile Management, 404, and Global Navigation
- Established "Modern Local" design palette (#005691, #FFB74D, #00A86B, #F8F9FA)
- Defined guest-first architecture with optional account sync
- Specified mobile-first responsive breakpoints (320px / 768px / 1280px)
- Documented RBAC, data layer, type system, validation schemas, and API endpoint map

---

**End of Documentation**
