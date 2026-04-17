# Authentication-Based Dynamic Routing

## Overview
The CostWise application has dynamic routing based on user authentication status. The **Home tab** in the navigation dynamically shows different content for logged-in and guest users.

## Route Structure

### Landing Page (`/`)
**File**: `app/page.tsx`

**Behavior**:
- Always shows the guest landing page for all users
- Features hero section, tip of the day, and essential lessons
- Accessible to everyone (guests and authenticated users)

**Features**:
- Hero section with "Start Learning" and "Try Simulator" CTAs
- Tip of the Day card
- Quiz and Simulator CTA cards
- Essential Lessons grid (4 lesson cards)
- Floating action button

### Logged-In Home Dashboard (`/home`)
**File**: `app/home/page.tsx`

**Behavior**:
- **Guest Users**: Shows login prompt with "Go to Login" button
- **Authenticated Users**: Shows personalized dashboard
- **Loading State**: Shows a loading spinner while checking authentication status

**Features** (for authenticated users):
- Personalized welcome message ("Welcome back, Juan!")
- Quick stats strip (4 stat cards: Quizzes Completed, Tips Bookmarked, Financial IQ, Ipon Badges)
- Continue Learning card with progress bar
- Recently Unlocked modules (2 cards)
- Tip of the Day sidebar card
- Core Navigation bento grid (4 links: Library, Simulator, Leaderboard, Settings)
- Community Growth card (Prosperity Hub)
- Footer with links
- Mobile bottom navigation

## Dynamic Navigation

### Home Tab Behavior
The **Home** tab in the navigation (`components/nav/navigation.tsx`) dynamically changes its destination:

- **Guest Users**: Home tab links to `/` (landing page)
- **Authenticated Users**: Home tab links to `/home` (personalized dashboard)

This is implemented with:
```typescript
<Link 
  href={isLoggedIn ? "/home" : "/"} 
  className="..."
>
  Home
</Link>
```

## User Flow

### Guest User Flow:
1. Visit any page → See guest navigation
2. Click **Home** tab → Go to `/` (landing page)
3. Click **Learn**, **Simulator**, **Quizzes**, **Tips** → Access public content
4. Try to visit `/home` directly → See login prompt
5. Click "Go to Login" → Redirect to `/auth?redirect=/home`
6. After login → Redirect to `/home` (personalized dashboard)

### Authenticated User Flow:
1. Visit any page → See authenticated navigation with profile avatar
2. Click **Home** tab → Go to `/home` (personalized dashboard)
3. Visit `/` directly → See landing page (still accessible)
4. Access all features and protected routes
5. Click profile → Access settings and logout

## Authentication Context

The authentication logic is handled by the `AuthContext` (`contexts/auth-context.tsx`), which provides:
- `isAuthenticated`: Boolean indicating if user is logged in
- `isLoading`: Boolean indicating if auth status is being checked
- `user`: User object with profile information
- `login()`: Function to log in
- `logout()`: Function to log out
- `refreshAuth()`: Function to refresh authentication state

## Protected Routes

### Fully Protected (Login Required):
- None currently - all routes show appropriate content based on auth status

### Auth-Aware Routes:
- `/home` - Shows login prompt for guests, dashboard for authenticated users
- `/profile` - Likely requires authentication (check implementation)

### Public Routes (Accessible to All):
- `/` - Landing page
- `/learn` - Educational hub
- `/simulator` - Inflation simulator
- `/quizzes` - Financial quizzes
- `/tips` - Practical tips
- `/auth` - Login/signup page

## Design System

### Landing Page (Tatak Pilipino)
- **Primary Color**: #1C3FA8 (Blue)
- **Accent Color**: #E53935 (Red)
- **Secondary Color**: #FDD835 (Yellow)
- **Background**: #F5F7FF (Light Blue)
- **Text**: #1A237E (Dark Blue)

### Logged-In Dashboard
- Uses CSS variables from the design system
- `hsl(var(--primary))`, `hsl(var(--secondary))`, etc.
- Maintains consistency with Tatak Pilipino colors

## Key Differences from Previous Implementation

**Before**: Landing page (`/`) redirected authenticated users to `/home`
**Now**: Landing page (`/`) is accessible to everyone; **Home tab** dynamically routes based on auth status

This approach:
- ✅ Keeps landing page accessible for marketing/SEO
- ✅ Provides clear separation between public and personalized content
- ✅ Makes navigation intuitive (Home tab goes to user's home)
- ✅ Allows authenticated users to still view landing page if needed
