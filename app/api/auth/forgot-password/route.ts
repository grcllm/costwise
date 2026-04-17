import { NextRequest, NextResponse } from 'next/server'
import { findUserByEmail } from '@/lib/mock-users'
import { forgotPasswordSchema } from '@/lib/validation-schemas'
import crypto from 'crypto'

// In-memory storage for reset tokens (in production, use a database)
export const resetTokens = new Map<string, { email: string; expiresAt: number }>()

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validate input
    const validation = forgotPasswordSchema.safeParse(body)
    if (!validation.success) {
      return NextResponse.json(
        { error: validation.error.issues[0].message },
        { status: 400 }
      )
    }

    const { email } = validation.data

    // Check if user exists
    const user = await findUserByEmail(email)

    let resetLink = null

    // Always return success to prevent email enumeration attacks
    // But only generate token if user exists
    if (user) {
      // Generate reset token
      const token = crypto.randomBytes(32).toString('hex')
      
      // Token expires in 1 hour
      const expiresAt = Date.now() + 60 * 60 * 1000
      
      // Store token
      resetTokens.set(token, { email: user.email, expiresAt })

      // Generate reset link
      const baseUrl = process.env.NEXTAUTH_URL || 'http://localhost:3000'
      resetLink = `${baseUrl}/reset-password?token=${token}`

      // Log to server console
      console.log(`[Forgot Password] Reset token for ${email}: ${token}`)
      console.log(`[Forgot Password] Reset link: ${resetLink}`)
    }

    // In development mode, return the reset link
    const isDevelopment = process.env.NODE_ENV === 'development'

    return NextResponse.json(
      { 
        message: 'If an account exists with this email, a reset link has been sent.',
        ...(isDevelopment && resetLink ? { resetLink } : {})
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('[Forgot Password API] Error:', error)
    return NextResponse.json(
      { error: 'Failed to process request. Please try again.' },
      { status: 500 }
    )
  }
}
