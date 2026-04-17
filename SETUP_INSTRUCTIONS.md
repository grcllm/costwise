# CostWise Setup Instructions

## Quick Start

### 1. Install Dependencies
```bash
pnpm install
```

### 2. Configure Environment Variables

Copy the example environment file:
```bash
cp .env.example .env.local
```

Edit `.env.local` with the following minimum configuration:

```env
NEXT_PUBLIC_API_URL=http://localhost:3001/api
NEXT_PUBLIC_USE_MOCK_DATA=true
NEXT_PUBLIC_USE_MOCK_AUTH=true

# NextAuth Configuration (Required)
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key-here

# Google OAuth (Optional - for Google Sign-In)
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
```

### 3. Generate NextAuth Secret

Generate a secure secret for NextAuth:

```bash
openssl rand -base64 32
```

Copy the output and paste it as your `NEXTAUTH_SECRET` in `.env.local`.

### 4. Start Development Server

```bash
pnpm dev
```

The app will be available at `http://localhost:3000`

## Authentication

### Email/Password Login (Works Immediately)

The app comes with a demo account that works out of the box:

```
Email: demo@costwise.ph
Password: DemoPass1!
```

No additional setup required!

### Google Sign-In (Optional Setup)

To enable Google OAuth:

1. Follow the detailed guide in [GOOGLE_OAUTH_SETUP.md](./GOOGLE_OAUTH_SETUP.md)
2. Add your Google OAuth credentials to `.env.local`
3. Restart the development server

## Testing the App

### 1. Visit the Landing Page
Navigate to `http://localhost:3000` to see the public landing page.

### 2. Sign In
- Click "Get Started" or "Sign In"
- Use the demo credentials above
- Or click "Sign in with Google" (if configured)

### 3. Explore Features
After signing in, you'll have access to:
- **Dashboard** (`/home`) - Overview of your progress
- **Learn** (`/learn`) - Educational modules about inflation
- **Simulator** (`/simulator`) - Interactive inflation calculator
- **Quizzes** (`/quizzes`) - Test your knowledge
- **Tips** (`/tips`) - Practical financial advice
- **Profile** (`/profile`) - Manage your account

## Building for Production

```bash
pnpm build
pnpm start
```

## Running Tests

```bash
pnpm test
```

## Project Structure

```
costwise/
├── app/                      # Next.js App Router pages
│   ├── api/auth/            # NextAuth API routes
│   ├── auth/                # Authentication page
│   ├── home/                # Dashboard (logged in)
│   ├── learn/               # Learning modules
│   ├── simulator/           # Inflation calculator
│   ├── quizzes/             # Quiz pages
│   ├── tips/                # Financial tips
│   └── profile/             # User profile
├── components/              # React components
│   ├── auth/               # Auth-related components
│   ├── nav/                # Navigation components
│   └── ui/                 # UI components (shadcn)
├── contexts/               # React contexts
│   └── auth-context.tsx    # Authentication context
├── lib/                    # Utilities and helpers
│   ├── api/               # API configuration
│   ├── mock-users.ts      # Demo user data
│   └── validation-schemas.ts # Form validation
├── providers/             # React providers
│   └── session-provider.tsx # NextAuth session provider
├── types/                 # TypeScript type definitions
│   └── next-auth.d.ts    # NextAuth type extensions
└── public/               # Static assets
```

## Key Features

✅ **Email/Password Authentication** - Works immediately with demo account  
✅ **Google OAuth** - Optional, requires setup  
✅ **Session Management** - Secure JWT-based sessions  
✅ **Protected Routes** - Automatic redirect for unauthenticated users  
✅ **Profile Management** - Photo upload, password change  
✅ **Responsive Design** - Mobile-first, works on all devices  
✅ **Mock Data** - No backend required for development  

## Troubleshooting

### "Invalid email or password" error
- Make sure you're using the correct demo credentials
- Email: `demo@costwise.ph`
- Password: `DemoPass1!` (case-sensitive, includes exclamation mark)

### Google Sign-In not working
- Verify `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` are set in `.env.local`
- Check that redirect URIs are configured correctly in Google Cloud Console
- See [GOOGLE_OAUTH_SETUP.md](./GOOGLE_OAUTH_SETUP.md) for detailed setup

### Session not persisting
- Ensure `NEXTAUTH_SECRET` is set in `.env.local`
- Clear browser cookies and try again
- Restart the development server

### Build errors
- Run `pnpm install` to ensure all dependencies are installed
- Check that all environment variables are set
- Clear `.next` folder: `rm -rf .next` and rebuild

## Environment Variables Reference

| Variable | Required | Description |
|----------|----------|-------------|
| `NEXTAUTH_URL` | Yes | Your app URL (e.g., `http://localhost:3000`) |
| `NEXTAUTH_SECRET` | Yes | Secret key for JWT encryption (generate with `openssl rand -base64 32`) |
| `GOOGLE_CLIENT_ID` | No | Google OAuth client ID (for Google Sign-In) |
| `GOOGLE_CLIENT_SECRET` | No | Google OAuth client secret (for Google Sign-In) |
| `NEXT_PUBLIC_API_URL` | No | Backend API URL (not used with mock data) |
| `NEXT_PUBLIC_USE_MOCK_DATA` | No | Use mock data instead of real API (default: `true`) |
| `NEXT_PUBLIC_USE_MOCK_AUTH` | No | Use mock authentication (default: `true`) |

## Additional Documentation

- [GOOGLE_OAUTH_SETUP.md](./GOOGLE_OAUTH_SETUP.md) - Google OAuth setup guide
- [NEXTAUTH_INTEGRATION.md](./NEXTAUTH_INTEGRATION.md) - NextAuth integration details
- [DESIGN_SYSTEM.md](./DESIGN_SYSTEM.md) - Design system documentation
- [AUTHENTICATION_ROUTING.md](./AUTHENTICATION_ROUTING.md) - Authentication flow

## Support

For issues or questions:
1. Check the troubleshooting section above
2. Review the documentation files
3. Check the browser console for error messages
4. Verify all environment variables are set correctly

## License

ISC
