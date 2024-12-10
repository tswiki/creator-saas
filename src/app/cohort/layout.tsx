
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import React from 'react'

export default async function CohortLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const cookieStore = await cookies()
  const sessionCookie = cookieStore.get('session')?.value

  if (!sessionCookie) {
    redirect('/login')
  }

  return <>{children}</>
}
