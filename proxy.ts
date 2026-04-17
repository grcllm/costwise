import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

// Proxy to protect routes that require authentication
// Note: In Next.js 16+, middleware.ts has been renamed to proxy.ts
export default withAuth(
  function proxy(req) {
    // Allow the request to proceed
    return NextResponse.next()
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const { pathname } = req.nextUrl
        
        // Public routes that don't require authentication
        const publicRoutes = ['/', '/auth', '/learn', '/simulator', '/quizzes', '/tips']
        const isPublicRoute = publicRoutes.some(route => 
          pathname === route || 
          pathname.startsWith(route + '/') || 
          pathname.startsWith('/api/auth')
        )
        
        // Allow public routes without token
        if (isPublicRoute) {
          return true
        }
        
        // Protected routes require a valid token
        return !!token
      },
    },
    pages: {
      signIn: '/auth',
    },
  }
)

// Configure which routes to run proxy on
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
