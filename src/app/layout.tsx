import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Concrete Manifest",
  description: "Powered by REVITALISE.IO",
};

import Header from '@/components/ui/header';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get('session')?.value;
  const pathname = new URL(window.location.href).pathname;

  // Only check auth for cohort routes
  if (pathname.startsWith('/cohort') && !sessionCookie) {
    redirect('/login');
  }

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {/* <Header /> */}
        {children}
      </body>
    </html>
  );
}
