import bcrypt from 'bcryptjs'

export interface MockUser {
  id: string
  email: string
  displayName: string
  passwordHash: string
  createdAt: string
}

// Pre-hashed password for "DemoPass1!" 
// In a real app, this would be in a database
const DEMO_PASSWORD_HASH = bcrypt.hashSync('DemoPass1!', 10)

export const mockUsers: MockUser[] = [
  {
    id: 'user-001',
    email: 'demo@costwise.ph',
    displayName: 'Juan Dela Cruz',
    passwordHash: DEMO_PASSWORD_HASH,
    createdAt: new Date().toISOString(),
  },
]

export async function findUserByEmail(email: string): Promise<MockUser | null> {
  return mockUsers.find(user => user.email.toLowerCase() === email.toLowerCase()) || null
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash)
}
