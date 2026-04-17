import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { mockUsers } from '@/lib/mock-users'
import { registerSchema } from '@/lib/validation-schemas'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validate input
    const validation = registerSchema.safeParse(body)
    if (!validation.success) {
      return NextResponse.json(
        { error: validation.error.issues[0].message },
        { status: 400 }
      )
    }

    const { email, password } = validation.data

    // Check if user already exists
    const existingUser = mockUsers.find(
      user => user.email.toLowerCase() === email.toLowerCase()
    )

    if (existingUser) {
      return NextResponse.json(
        { error: 'An account with this email already exists.' },
        { status: 409 }
      )
    }

    // Hash password
    const passwordHash = await bcrypt.hash(password, 10)

    // Create new user
    const newUser = {
      id: `user-${Date.now()}`,
      email: email.toLowerCase(),
      displayName: email.split('@')[0], // Use email prefix as default display name
      passwordHash,
      createdAt: new Date().toISOString(),
    }

    // Add to mock users array
    mockUsers.push(newUser)

    return NextResponse.json(
      { 
        message: 'Account created successfully!',
        user: {
          id: newUser.id,
          email: newUser.email,
          displayName: newUser.displayName,
        }
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('[Signup API] Error:', error)
    return NextResponse.json(
      { error: 'Failed to create account. Please try again.' },
      { status: 500 }
    )
  }
}
