
// firebase-admin-config.ts
import { initializeApp, getApps, cert } from 'firebase-admin/app'
import { getAuth } from 'firebase-admin/auth'

// Import the service account file directly
import serviceAccount from '../firebase/service-account-key.json'

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

export const adminAuth = getAuth()