"use client"

import { createContext, useContext, useEffect, useState, ReactNode, Suspense } from 'react';
import { auth } from '@/firebase/firebaseConfig';
import { onAuthStateChanged, User, getIdToken } from 'firebase/auth';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  idToken: string | null;
  refreshIdToken: () => Promise<string | null>;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  idToken: null,
  refreshIdToken: async () => null,
  isAuthenticated: false
});

export function useAuth() {
  return useContext(AuthContext);
}

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [idToken, setIdToken] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authChecked, setAuthChecked] = useState(false);

  const refreshIdToken = async () => {
    if (!user) {
      setIsAuthenticated(false);
      return null;
    }
    try {
      const token = await getIdToken(user, true);
      setIdToken(token);
      setIsAuthenticated(true);
      return token;
    } catch (error) {
      console.error('Failed to refresh token:', error);
      setIsAuthenticated(false);
      return null;
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setLoading(true);
      
      if (!firebaseUser) {
        setUser(null);
        setIdToken(null);
        setIsAuthenticated(false);
        
        const protectedRoutes = ['/cohort', '/admin', '/spaces'];
        const currentPath = typeof window !== 'undefined' ? window.location.pathname : '';
        
        if (protectedRoutes.some(route => currentPath.startsWith(route))) {
          window.location.href = '/login';
        }
      } else {
        try {
          const token = await getIdToken(firebaseUser, true);
          setUser(firebaseUser);
          setIdToken(token);
          setIsAuthenticated(true);
          
          // If we're on the login page and authenticated, redirect to home
          if (typeof window !== 'undefined' && window.location.pathname === '/login') {
            window.location.href = '/cohort';
          }
        } catch (error) {
          console.error('Token verification failed:', error);
          setUser(null);
          setIdToken(null);
          setIsAuthenticated(false);
        }
      }
      
      setLoading(false);
      setAuthChecked(true);
    });

    return () => unsubscribe();
  }, []);

  const value = {
    user,
    loading,
    idToken,
    refreshIdToken,
    isAuthenticated
  };

  // Don't render anything until initial auth check is complete
  if (!authChecked) {
    return null;
  }

  // Only render children when authentication is complete
  const protectedRoutes = ['/cohort', '/admin', '/spaces'];
  const isProtectedRoute = typeof window !== 'undefined' && 
    protectedRoutes.some(route => window.location.pathname.startsWith(route));

  if (loading) {
    return null;
  }

  return (
    <AuthContext.Provider value={value}>
      {(!isProtectedRoute || (isProtectedRoute && isAuthenticated)) && children}
    </AuthContext.Provider>
  );
}
