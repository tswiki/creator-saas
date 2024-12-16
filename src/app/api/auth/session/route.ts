
// app/api/auth/session/route.ts
import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { adminAuth } from '@/firebase/admin-config'

export async function POST(request: Request) {
  try {
    const { idToken } = await request.json()
        
    // Create session cookie with 6 hour expiration
    const expiresIn = 60 * 60 * 6 * 1000 // 6 hours
    const sessionCookie = await adminAuth.createSessionCookie(idToken, { expiresIn })
    
    // Set the cookie
    ;(await
          // Set the cookie
          cookies()).set('session', sessionCookie, {
      maxAge: expiresIn,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      sameSite: 'lax'
    })

    return NextResponse.json({ 
      status: 'success',
      message: 'Session created successfully'
    })
  } catch (error) {
    console.error('Session creation error:', error)
    return NextResponse.json(
      { error: 'Failed to create session' }, 
      { status: 500 }
    )
  }
}