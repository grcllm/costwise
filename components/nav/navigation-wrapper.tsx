'use client'

import { Navigation } from './navigation'
import { useAuth } from '@/contexts/auth-context'

interface NavigationWrapperProps {
  activeLink?: 'home' | 'learn' | 'simulator' | 'quizzes' | 'tips' | 'profile'
}

export function NavigationWrapper({ activeLink }: NavigationWrapperProps) {
  const { isAuthenticated, isLoading } = useAuth()

  // During loading, show the logged-out state to prevent layout shift
  // NextAuth's SessionProvider handles the session on the client
  const showAuthButtons = !isAuthenticated

  return (
    <Navigation 
      activeLink={activeLink} 
      isLoggedIn={isAuthenticated} 
      showAuthButtons={showAuthButtons}
      isLoading={isLoading}
    />
  )
}
