import type { Metadata } from "next";
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import "./globals.css";
import { headers } from 'next/headers';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { ThemeProvider } from '@/components/ui/theme-provider'
import { ViewProvider } from "@/contexts/viewContext";
import { AdminProvider} from "@/contexts/adminContext";
import { CampaignProvider } from "@/contexts/campaignContext";
import { AuthProvider } from "@/contexts/authContext";

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

// Protected routes that require authentication
const protectedRoutes = [
  '/cohort',
  '/admin',
  '/spaces',
];

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

  // Check if current route requires authentication
  const isProtectedRoute = protectedRoutes.some(route => 
    pathname.startsWith(route)
  );

  // Redirect to login if accessing protected route without valid auth
  if (isProtectedRoute && !sessionCookie) {
    redirect('/login');
  }

  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider>
            <AdminProvider>
              <ViewProvider>
                <CampaignProvider>
                  {children}
                </CampaignProvider>
              </ViewProvider>
            </AdminProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}