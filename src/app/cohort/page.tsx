

import MentorshipPortal from "@/components/v0/ui/MentorshipPortal"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

// In cohort/page.tsx
export default async function CohortPage() {
  try {
    const cookieStore = await cookies()
    const sessionCookie = cookieStore.get('session')?.value
    
    if (!sessionCookie) {
      console.log('No session cookie found, redirecting to login')
      redirect('/login')
    }

    return <MentorshipPortal />
  } catch (error) {
    console.error('Error in CohortPage:', error)
    throw error
  }
}