import { getServerSession } from "next-auth/next"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"

/**
 * Server-side utility to get the current session
 * Use this in Server Components, Server Actions, and API Routes
 */
export async function getSession() {
  return await getServerSession(authOptions)
}

/**
 * Server-side utility to check if user is authenticated
 */
export async function isAuthenticated() {
  const session = await getSession()
  return !!session?.user
}

/**
 * Server-side utility to get current user
 */
export async function getCurrentUser() {
  const session = await getSession()
  return session?.user || null
}
