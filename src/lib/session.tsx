// src/lib/session.tsx
import { auth } from '../firebase/firebaseConfig'
import { browserLocalPersistence, signInWithCustomToken } from 'firebase/auth'
import { adminAuth } from '../firebase/admin-config'
import { cookies } from 'next/headers'

interface SessionData {
  userId: string;
  createdAt: string;
  expiresAt: string;
}

export class SessionManager {
  private static instance: SessionManager;
  
  private constructor() {}
  
  static getInstance(): SessionManager {
    if (!SessionManager.instance) {
      SessionManager.instance = new SessionManager();
    }
    return SessionManager.instance;
  }

  async createSession(idToken: string): Promise<void> {
    try {
      // Set session to expire in 14 days to match Firebase default
      const expiresIn = 14 * 24 * 60 * 60 * 1000; // 14 days in milliseconds
      
      // Create session cookie on server side
      const sessionCookie = await adminAuth.createSessionCookie(idToken, { expiresIn });
      
      // Use Firebase client SDK to persist session
      await auth.setPersistence(browserLocalPersistence);
      
      // Get custom token from session cookie
      const customToken = await adminAuth.createCustomToken(idToken);
      await signInWithCustomToken(auth, customToken);

    } catch (error) {
      console.error('Session creation error:', error);
      throw new Error('Failed to create session');
    }
  }
/*
  async getSession(): Promise<SessionData | null> {
    try {
      const currentUser = auth.currentUser;
      if (!currentUser){console.log("getSession failed: No current user");return null;} 

      const token = await currentUser.getIdTokenResult(true);
      if (!token) {console.log("getSession failed: No token retrieved");;return null};
      
      const sessionData: SessionData = {
        userId: currentUser.uid,
        createdAt: new Date(Number(token.issuedAtTime)).toISOString(),
        expiresAt: new Date(Number(token.expirationTime)).toISOString()
      };
      return sessionData;

    } catch (error) {
      console.error('Error getting session:', error);
      await this.destroySession();
      return null;
    }
  }
    */
  async getSession(): Promise<SessionData | null> {
    try {
      const sessionCookie = (await cookies()).get('session')?.value;
      if (!sessionCookie) {
        console.log("getSession failed: No session cookie");
        return null;
      }
  
      // Verify the session cookie
      const decodedClaims = await adminAuth.verifySessionCookie(sessionCookie, true);
      
      const sessionData: SessionData = {
        userId: decodedClaims.uid,
        createdAt: new Date(decodedClaims.iat * 1000).toISOString(),
        expiresAt: new Date(decodedClaims.exp * 1000).toISOString()
      };
      
      return sessionData;
  
    } catch (error) {
      console.error('Error getting session:', error);
      await this.destroySession();
      return null;
    }
  }



  async destroySession(): Promise<void> {
    try {
      const currentUser = auth.currentUser;
      if (currentUser) {
/*
        if (streamClient) {
          await streamClient.disconnectUser();
        }*/
        // Revoke refresh tokens on server side
        await adminAuth.revokeRefreshTokens(currentUser.uid);
      }
      // Sign out the current user
      await auth.signOut();
    } catch (error) {
      console.error('Error destroying session:', error);
/*
      if (streamClient) {
        await streamClient.disconnectUser();
      }*/
      // Try sign out again even if error
      try {
        await auth.signOut();
      } catch (e) {
        console.error('Final sign out attempt failed:', e);
      }
    }
  }
}

// Export a singleton instance
export const sessionManager = SessionManager.getInstance();