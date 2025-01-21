
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { headers } from 'next/headers'; // Add this import
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { ThemeProvider } from '@/components/v0/ui/theme-provider'
import { ViewProvider } from "@/contexts/viewContext";
import { AdminProvider} from "@/contexts/adminContext";

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
  title: "dejitaru",
  description: "Powered by REVITALISE.IO",
};

// Key Japanese terms for creator economy concepts:
// クリエイター経済 (kurieitā keizai) - Creator economy
// 収益化 (shūekika) - Monetization
// 発信力 (hasshinryoku) - Influence/reach
// 価値創造 (kachi sōzō) - Value creation
// 展開 (tenkai) - Scale/expansion
// 共創 (kyōsō) - Co-creation
// 影響力 (eikyōryoku) - Impact
// 成長 (seichō) - Growth/scaling

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get('session')?.value;
  
  // Get pathname from headers instead of window.location
  const headersList = await headers();
  const pathname = headersList.get('x-pathname') || headersList.get('x-invoke-path') || '';

  // Only check auth for cohort routes
  if (pathname.startsWith('/cohort') && !sessionCookie) {
    redirect('/login');
  }

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AdminProvider>
            <ViewProvider>
              {children}
            </ViewProvider>
          </AdminProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}