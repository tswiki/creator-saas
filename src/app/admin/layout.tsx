import { redirect } from 'next/navigation'
import React from 'react'
import Header from '@/components/v0/ui/header'

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // redirect('/admin')

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {children}
      </main>
    </div>
  )
}
