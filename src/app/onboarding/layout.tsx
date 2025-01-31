
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import React from 'react'
import { sessionManager } from '@/lib/session'
import { auth } from '@/firebase/firebaseConfig';
/*
export default async function OnboardingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const cookieStore = await cookies()
  const sessionCookie = cookieStore.get('session')?.value

  // Check for session cookie
  if (!sessionCookie) {
    console.log("no session cooke")
    redirect('/login')
  }
/*
  try {
    // Verify the session using SessionManager
    await new Promise((resolve) => {
      const unsubscribe = auth.onAuthStateChanged((user) => {
        unsubscribe();
        resolve(user);
      });
    });

    const session = await sessionManager.getSession()
    
    if (!session) {
      console.log("invalid session")
      // Invalid session
      redirect('/login')
    }

    // Check if session is expired
    const expiresAt = new Date(session.expiresAt).getTime()
    if (Date.now() > expiresAt) {
      console.log("expired sesh")
      // Session expired
      await sessionManager.destroySession()
      redirect('/login')
    }

  } 
  /
  try {
    // Wait for auth state to be fully initialized
    const user = await new Promise<any>((resolve, reject) => {
      const unsubscribe = auth.onAuthStateChanged((user) => {
        unsubscribe();
        if (user) {
          resolve(user);
        } else {
          reject(new Error('No authenticated user'));
        }
      });

      // Add timeout to prevent hanging
      setTimeout(() => {
        unsubscribe();
        reject(new Error('Auth state timeout'));
      }, 10000); // 10 second timeout
    });

    // Only proceed if we have a user
    if (!user) {
      console.log("No authenticated user after auth state check");
      redirect('/login');
    }

    const session = await sessionManager.getSession();
    
    if (!session) {
      console.log("invalid session");
      await sessionManager.destroySession();
      redirect('/login');
    }

    // Check if session is expired
    const expiresAt = new Date(session.expiresAt).getTime();
    if (Date.now() > expiresAt) {
      console.log("expired session");
      await sessionManager.destroySession();
      redirect('/login');
    }

  }

  catch (error) {
    // Any verification error should redirect to login
    console.error('Auth error:', error)
    await sessionManager.destroySession()
    redirect('/login')
  }

  return <>{children}</>
}

*/
export default async function OnboardingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get('session')?.value;

  if (!sessionCookie) {
    console.log("no session cookie");
    redirect('/login');
  }

  try {
    // First verify the session cookie server-side
    const session = await sessionManager.getSession();
    
    if (!session) {
      console.log("invalid session");
      await sessionManager.destroySession();
      redirect('/login');
    }

    // Check if session is expired
    const expiresAt = new Date(session.expiresAt).getTime();
    if (Date.now() > expiresAt) {
      console.log("expired session");
      await sessionManager.destroySession();
      redirect('/login');
    }

    return <>{children}</>;

  } catch (error) {
    console.error('Auth error:', error);
    await sessionManager.destroySession();
    redirect('/login');
  }
}