
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'
import { SWRConfig, mutate } from 'swr'
import { Suspense, useEffect } from 'react'
import fetchFromApi from '@/lib/swr'
import { auth } from '@/firebase/firebaseConfig'
import { onAuthStateChanged, getIdToken } from 'firebase/auth'
import { adminAuth } from '@/firebase/admin-config'

// Protected routes that require authentication
const protectedRoutes = [
  '/cohort',
  '/admin', 
  '/spaces',
]

// SQL injection prevention regex
const sqlInjectionRegex = /('|"|;|--|\/\*|\*\/|=|\|\||&&)/i

// Enhanced SWR configuration with revalidation
const swrConfig = {
  revalidateOnFocus: true,
  revalidateOnReconnect: true,
  refreshInterval: 30000, // Refresh every 30 seconds
  suspense: true,
  shouldRetryOnError: true,
  dedupingInterval: 2000,
  fetcher: async (url: string) => {
    const res = await fetch(url, {
      next: { revalidate: 60 }, // Revalidate cache every minute
    })
    if (!res.ok) {
      throw new Error('Failed to fetch data')
    }
    return res.json()
  }
}

// Middleware function with enhanced caching and auth
export async function middleware(request: NextRequest) {
  // Get the pathname
  const path = request.nextUrl.pathname

  // Check for SQL injection attempts in query params and body
  const hasInjection = Object.values(request.nextUrl.searchParams).some(param => 
    sqlInjectionRegex.test(param)
  )
  
  if (hasInjection) {
    return new NextResponse(
      JSON.stringify({ error: 'Invalid request parameters' }),
      { status: 400 }
    )
  }

  // Get session tokens from both Firebase and NextAuth
  const nextAuthToken = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET
  })

  // Check Firebase auth state and get ID token
  let firebaseUser = null
  let firebaseIdToken = null
  try {
    await new Promise((resolve) => {
      const unsubscribe = onAuthStateChanged(auth, async (user) => {
        if (user) {
          firebaseUser = user
          // Get fresh ID token
          firebaseIdToken = await getIdToken(user, true)
          // Verify token with admin SDK
          try {
            await adminAuth.verifyIdToken(firebaseIdToken)
          } catch (error) {
            console.error('Invalid Firebase token:', error)
            firebaseUser = null
            firebaseIdToken = null
          }
        }
        unsubscribe()
        resolve(user)
      })
    })
  } catch (error) {
    console.error('Firebase auth check failed:', error)
  }

  // Check if route requires authentication
  const isProtectedRoute = protectedRoutes.some(route => 
    path.startsWith(route)
  )

  // Redirect to login if accessing protected route without valid auth
  if (isProtectedRoute && (!nextAuthToken || !firebaseUser || !firebaseIdToken)) {
    const loginUrl = new URL('/login', request.url)
    loginUrl.searchParams.set('callbackUrl', path)
    return NextResponse.redirect(loginUrl)
  }

  // Add security headers
  const response = NextResponse.next()
  response.headers.set('X-Frame-Options', 'DENY')
  response.headers.set('X-Content-Type-Options', 'nosniff') 
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')
  response.headers.set(
    'Content-Security-Policy',
    "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline';"
  )

  // Add auth tokens to response headers
  if (firebaseIdToken) {
    response.headers.set('X-Firebase-Token', firebaseIdToken)
  }

  // Add caching headers
  response.headers.set('Cache-Control', 'public, s-maxage=60, stale-while-revalidate=300')

  return response
}

// Configure paths to match with enhanced patterns
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|public).*)',
  ],
}

// Enhanced Root layout wrapper with preloading and auth check
export function RootLayout({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Check Firebase auth state on mount
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        window.location.href = '/login'
        return
      }
    })

    preloadRoutes()
    
    return () => unsubscribe()
  }, [])

  return (
    <SWRConfig value={swrConfig}>
      <Suspense fallback={<div>Loading...</div>}>
        {children}
      </Suspense>
    </SWRConfig>
  )
}

// Enhanced optimistic updates with type safety
export function optimisticUpdate<T>(key: string, updateFn: (data: T) => T) {
  return mutate<T>(
    key,
    async (currentData: T | undefined) => {
      // Optimistically update the UI
      const optimisticData = updateFn(currentData as T)
      
      try {
        // Attempt the actual update
        await fetch(key, {
          method: 'POST',
          body: JSON.stringify(optimisticData)
        })
        return optimisticData
      } catch (error) {
        // On error, rollback to original data
        console.error('Update failed:', error)
        return currentData
      }
    },
    { revalidate: false } // Don't revalidate immediately
  )
}

// Enhanced preloading with progressive enhancement
export async function preloadRoutes() {
  const routes = ['/dashboard', '/schedule', '/files', '/feedback', '/inbox', 'admin', 'spaces', 'connect', 'resources', 'overview', 'members', 'campaigns', 'campaign', 'engagement']
  
  // Create a shared cache instance
  const cache = new Map<string, any>()
  
  // Preload data in parallel
  const preloadPromises = routes.map(async (route) => {
    try {
      // Check cache first
      if (!cache.has(route)) {
        const data = await fetchFromApi({ 
          params: { route }, 
          cache: true 
        })
        cache.set(route, data)
        
        // Warm up SWR cache
        mutate(route, data, false)
        
        // Prefetch API routes
        const prefetchController = new AbortController()
        await fetch(`/api${route}`, {
          signal: prefetchController.signal,
          headers: { 'Purpose': 'prefetch' }
        })
        
        // Add link prefetch tags
        const link = document.createElement('link')
        link.rel = 'prefetch'
        link.href = route
        document.head.appendChild(link)
      }
      return cache.get(route)
    } catch (error) {
      console.error(`Failed to preload ${route}:`, error)
      return null
    }
  })

  // Wait for all preloads to complete
  const results = await Promise.allSettled(preloadPromises)
  
  // Update components with preloaded data
  const routeComponents = Array.from(document.querySelectorAll('*[class*="page"]'))
  
  routeComponents.forEach((component, index) => {
    if (results[index].status === 'fulfilled' && results[index].value) {
      // Hydrate component with preloaded data
      const data = results[index].value
      const route = routes[index]
      
      // Update SWR cache
      mutate(route, data, false)
      
      // Setup optimistic updates for this route
      optimisticUpdate(route, (currentData) => ({
        ...(currentData as object),
        ...(data as object)
      }))
    }
  })

  return cache
}
