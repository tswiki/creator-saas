import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import React from 'react'
import Header from '@/components/v0/ui/header'

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

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {children}
      </main>
    </div>
  )
}
