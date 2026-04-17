// Client-side auth utilities for JWT-based authentication

export async function login(email: string, password: string) {
  const response = await fetch('/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  })

  const data = await response.json()
  
  if (!response.ok) {
    throw new Error(data.message || 'Login failed')
  }

  // Dispatch event to notify components
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new Event('auth-state-changed'))
  }

  return data.data.user
}

export async function logout() {
  await fetch('/api/auth/logout', {
    method: 'POST',
  })

  // Dispatch event to notify components
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new Event('auth-state-changed'))
  }
}

export async function getCurrentUser() {
  try {
    const response = await fetch('/api/auth/me', {
      credentials: 'include',
    })

    if (!response.ok) {
      return null
    }

    const data = await response.json()
    return data.data.user
  } catch (error) {
    return null
  }
}

export async function isLoggedIn(): Promise<boolean> {
  const user = await getCurrentUser()
  return user !== null
}
