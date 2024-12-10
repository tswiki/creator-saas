
// src/lib/session.tsx
import { cookies } from 'next/headers'
import { adminAuth } from '../firebase/admin-config'

if (!process.env.SESSION_SECRET) {
  // Provide a default secret in development
  process.env.SESSION_SECRET = 'development-secret-key'
  // Or throw an error if you want to enforce setting it
  // throw new Error('SESSION_SECRET environment variable is not set')
}

export async function createSession(userId: string) {
  try {
    // Get the current time
    const now = new Date()
    
    // Set expiration to 5 days from now
    const expiresIn = 5 * 24 * 60 * 60 * 1000 // 5 days in milliseconds
    const expiresAt = new Date(now.getTime() + expiresIn)

    // Create session data
    const sessionData = {
      userId,
      createdAt: now.toISOString(),
      expiresAt: expiresAt.toISOString()
    }

    // Set the session cookie
    ;(await
      // Set the session cookie
      cookies()).set('session_data', JSON.stringify(sessionData), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      expires: expiresAt,
      path: '/'
    })

    return true
  } catch (error) {
    console.error('Error creating session:', error)
    throw error
  }
}

export async function getSession() {
  try {
    const sessionCookie = (await cookies()).get('session')?.value

    if (!sessionCookie) {
      return null
    }

    // Verify the session with Firebase Admin
    const decodedToken = await adminAuth.verifySessionCookie(sessionCookie)
    return decodedToken
  } catch (error) {
    console.error('Error getting session:', error)
    return null
  }
}

export async function destroySession() {
  try {
    (await cookies()).delete('session')
    ;(await cookies()).delete('session_data')
    return true
  } catch (error) {
    console.error('Error destroying session:', error)
    throw error
  }
}