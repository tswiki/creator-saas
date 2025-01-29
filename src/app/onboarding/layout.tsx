
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import React from 'react'
import { sessionManager } from '@/lib/session'

export default async function OnboardingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const cookieStore = await cookies()
  const sessionCookie = cookieStore.get('session')?.value

  // Check for session cookie
  if (!sessionCookie) {
    redirect('/login')
  }

  try {
    // Verify the session using SessionManager
    const session = await sessionManager.getSession()
    
    if (!session) {
      // Invalid session
      redirect('/login')
    }

    // Check if session is expired
    const expiresAt = new Date(session.expiresAt).getTime()
    if (Date.now() > expiresAt) {
      // Session expired
      await sessionManager.destroySession()
      redirect('/login')
    }

  } catch (error) {
    // Any verification error should redirect to login
    console.error('Auth error:', error)
    await sessionManager.destroySession()
    redirect('/login')
  }

  return <>{children}</>
}



