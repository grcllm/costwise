import NextAuth, { NextAuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"
import { findUserByEmail, verifyPassword } from "@/lib/mock-users"

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        console.log('[NextAuth] Authorize called with:', { email: credentials?.email, hasPassword: !!credentials?.password })
        
        if (!credentials?.email || !credentials?.password) {
          console.log('[NextAuth] Missing credentials')
          return null
        }

        // Find user by email
        const user = await findUserByEmail(credentials.email)
        console.log('[NextAuth] User found:', !!user)
        
        if (!user) {
          console.log('[NextAuth] User not found for email:', credentials.email)
          return null
        }

        // Verify password
        const isValidPassword = await verifyPassword(credentials.password, user.passwordHash)
        console.log('[NextAuth] Password valid:', isValidPassword)
        
        if (!isValidPassword) {
          console.log('[NextAuth] Invalid password')
          return null
        }

        console.log('[NextAuth] Login successful for:', user.email)
        return {
          id: user.id,
          email: user.email,
          name: user.displayName,
        }
      }
    })
  ],
  pages: {
    signIn: '/auth',
  },
  callbacks: {
    async jwt({ token, user, account }) {
      console.log('[NextAuth] JWT callback:', { hasUser: !!user, hasAccount: !!account, tokenId: token.id })
      if (user) {
        token.id = user.id
        token.email = user.email
        token.name = user.name
        console.log('[NextAuth] JWT: Added user to token:', { id: user.id, email: user.email })
      }
      if (account?.provider === "google") {
        token.provider = "google"
      }
      return token
    },
    async session({ session, token }) {
      console.log('[NextAuth] Session callback:', { hasSession: !!session, tokenId: token.id })
      if (session.user) {
        session.user.id = token.id as string
        session.user.email = token.email as string
        session.user.name = token.name as string
        console.log('[NextAuth] Session: Added token to session:', { id: token.id, email: token.email })
      }
      return session
    },
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: true,
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
