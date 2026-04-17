'use client'

import { useSession } from 'next-auth/react'

/**
 * Simplified auth hook that directly uses NextAuth's useSession
 * No need for a separate context wrapper
 */
export function useAuth() {
  const { data: session, status, update } = useSession()

  return {
    user: session?.user ? {
      id: session.user.id || '',
      email: session.user.email || '',
      displayName: session.user.name || '',
    } : null,
    isLoading: status === 'loading',
    isAuthenticated: !!session?.user,
    refreshAuth: update,
  }
}
