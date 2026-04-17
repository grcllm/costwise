import { NextResponse } from 'next/server'

export async function POST() {
  try {
    const response = NextResponse.json({
      success: true,
      message: 'Logged out successfully',
    })
    
    // Clear the cookie
    response.cookies.delete('costwise_token')
    
    return response
  } catch (error) {
    console.error('Logout error:', error)
    return NextResponse.json(
      { success: false, message: 'An error occurred during logout' },
      { status: 500 }
    )
  }
}
