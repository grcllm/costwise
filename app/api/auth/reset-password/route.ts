import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { mockUsers } from '@/lib/mock-users'
import { resetPasswordSchema } from '@/lib/validation-schemas'
import { resetTokens } from '../forgot-password/route'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { token, password } = body

    if (!token) {
      return NextResponse.json(
        { error: 'Reset token is required.' },
        { status: 400 }
      )
    }

    // Validate password
    const validation = resetPasswordSchema.safeParse({ password })
    if (!validation.success) {
      return NextResponse.json(
        { error: validation.error.issues[0].message },
        { status: 400 }
      )
    }

    // Check if token exists and is valid
    const tokenData = resetTokens.get(token)
    
    if (!tokenData) {
      return NextResponse.json(
        { error: 'Invalid or expired reset token.' },
        { status: 400 }
      )
    }

    // Check if token is expired
    if (Date.now() > tokenData.expiresAt) {
      resetTokens.delete(token)
      return NextResponse.json(
        { error: 'Reset token has expired. Please request a new one.' },
        { status: 400 }
      )
    }

    // Find user
    const user = mockUsers.find(u => u.email.toLowerCase() === tokenData.email.toLowerCase())
    
    if (!user) {
      return NextResponse.json(
        { error: 'User not found.' },
        { status: 404 }
      )
    }

    // Hash new password
    const passwordHash = await bcrypt.hash(password, 10)

    // Update user password
    user.passwordHash = passwordHash

    // Delete used token
    resetTokens.delete(token)

    console.log(`[Reset Password] Password updated for ${user.email}`)

    return NextResponse.json(
      { message: 'Password has been reset successfully!' },
      { status: 200 }
    )
  } catch (error) {
    console.error('[Reset Password API] Error:', error)
    return NextResponse.json(
      { error: 'Failed to reset password. Please try again.' },
      { status: 500 }
    )
  }
}
