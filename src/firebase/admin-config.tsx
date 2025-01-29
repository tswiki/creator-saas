
// firebase-admin-config.ts
import { initializeApp, getApps, cert } from 'firebase-admin/app'
import { getAuth } from 'firebase-admin/auth'
import { getFirestore } from 'firebase-admin/firestore'

// Import the service account file directly -> delete service account
const serviceAccount = {
  projectId: process.env.NEXT_PUBLIC_FIREBASE_ADMIN_PROJECT_ID!,
  clientEmail: process.env.NEXT_PUBLIC_FIREBASE_ADMIN_CLIENT_EMAIL!,
  privateKey: process.env.NEXT_PUBLIC_FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n')!
}

if (!getApps().length) {
  try {
    initializeApp({
      credential: cert(serviceAccount as any)
    })
  } catch (error) {
    console.error('Firebase admin initialization error:', error)
    throw error
  }
}

// Export both auth and firestore admin SDKs
export const adminAuth = getAuth()
export const adminDb = getFirestore()