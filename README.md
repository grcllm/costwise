# CostWise

A web-based educational platform helping Filipinos understand inflation, purchasing power, and practical budgeting — with interactive tools, gamified quizzes, and localized tips.

## Documentation
- [CostWise_Documentation.md](./CostWise_Documentation.md) — Complete reference guide
- [DESIGN_SYSTEM.md](./DESIGN_SYSTEM.md) — Modern Local UI design system
- [04_frontend_setup_guide_costwise.md](./04_frontend_setup_guide_costwise.md) — Setup guide

## Quick Start

### Prerequisites
- Node.js >= 18.x
- pnpm >= 8.x

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

### Testing
```bash
# Run all Playwright tests
pnpm test

# Run in headed mode
npx playwright test --headed
```

## Login Credentials (Dev)
```
Email:    demo@costwise.ph
Password: DemoPass1!
```
> Guest access is available without any credentials — simply visit the app.

## Environment Variables

Create `.env.local`:
```env
NEXT_PUBLIC_API_URL=http://localhost:3001/api
NEXT_PUBLIC_USE_MOCK_DATA=true
NEXT_PUBLIC_USE_MOCK_AUTH=true

# NextAuth Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key-here

# Google OAuth (optional)
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
```

See `.env.example` for reference.

### Google OAuth Setup

To enable Google Sign-In, follow the detailed setup guide in [GOOGLE_OAUTH_SETUP.md](./GOOGLE_OAUTH_SETUP.md).

## Tech Stack

| Layer | Technology | Version |
|---|---|---|
| Framework | Next.js (App Router) | 16.x |
| Language | TypeScript | 5.7+ |
| Styling | Tailwind CSS v4 | 4.x |
| UI Components | shadcn/ui | latest |
| Data Fetching | TanStack React Query | 5.x |
| Forms | React Hook Form | 7.x |
| Validation | Zod | 3.x |
| Notifications | sonner | 1.x |
| Icons | lucide-react | latest |
| Testing | Playwright | 1.x |
| Package Manager | pnpm | 8.x |

## Design System — "Modern Local"

| Role | Hex | Description |
|---|---|---|
| Primary (Trust) | `#005691` | Deep Sky Blue — trust, intelligence, calm |
| Secondary (Warmth) | `#FFB74D` | Warm Amber — energy, approachability |
| Accent (Growth) | `#00A86B` | Jade Green — growth, prosperity |
| Background | `#F8F9FA` | Off-White — clean, highly legible |

## Project Structure

```
app/                    # Next.js App Router pages
  api/                  # API routes (auth endpoints)
  auth/                 # Authentication pages
  home/                 # Home page
  learn/                # Learning modules
  profile/              # User profile
  quizzes/              # Quiz pages
  simulator/            # Inflation simulator
  tips/                 # Tips and advice
components/             # React components
  auth/                 # Authentication components
  common/               # Shared components
  nav/                  # Navigation components
  quizzes/              # Quiz-related components
  ui/                   # UI component library (shadcn/ui)
contexts/               # React contexts (Auth, etc.)
hooks/                  # Custom React hooks
lib/                    # Utilities, types, API layer
  api/                  # API configuration and repositories
    mock-data/          # JSON mock data files
    repositories/       # Data access layer
  auth.ts               # NextAuth configuration
  auth-utils.ts         # Auth utility functions
  constants.ts          # App constants
  jwt.ts                # JWT utilities
  mock-users.ts         # Mock user data
  session-manager.ts    # Session management
  types.ts              # TypeScript interfaces
  utils.ts              # Utility functions
  validation-schemas.ts # Zod schemas
providers/              # React providers
public/                 # Static assets
styles/                 # Global styles
tests/                  # Playwright tests
types/                  # TypeScript type definitions
```

## Key Features

- Inflation awareness education via localized modules
- Interactive Inflation Calculator using PSA/BSP data
- Gamified Inflation Awareness Quizzes
- Practical Tips & Localized Budgeting
- Guest-first architecture (no login required)
- Optional account creation for cross-device sync
- Mobile-first, responsive design
- Taglish content support

## License

ISC
