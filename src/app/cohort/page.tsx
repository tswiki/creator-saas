
// app/cohort/page.tsx
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { createSession } from '@/lib/session'
import MentorshipPortal from '@/components/ui/MentorshipPortal'

export default async function CohortPage() {
  
  const cookieStore = await cookies()
  const sessionCookie = cookieStore.get('session')?.value
  
  if (!sessionCookie) {
    console.log('No session cookie found, redirecting to login')
    redirect('/login')
  }

  return <MentorshipPortal />
}