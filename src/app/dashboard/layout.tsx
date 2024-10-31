
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="pt-16">
      <div className="flex min-h-screen">
        {/* Sidebar */}
        <aside className="w-64 bg-white shadow-md">
          <nav className="p-4 space-y-2">
            <div className="px-4 py-2 text-sm font-medium text-gray-600">Main Menu</div>
            <a href="/dashboard" className="flex items-center px-4 py-2 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 rounded-md">
              Overview
            </a>
            <a href="/dashboard/analytics" className="flex items-center px-4 py-2 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 rounded-md">
              Analytics
            </a>
            <a href="/dashboard/projects" className="flex items-center px-4 py-2 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 rounded-md">
              Projects
            </a>
            <a href="/dashboard/tasks" className="flex items-center px-4 py-2 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 rounded-md">
              Tasks
            </a>
            
            <div className="px-4 py-2 mt-6 text-sm font-medium text-gray-600">Settings</div>
            <a href="/dashboard/profile" className="flex items-center px-4 py-2 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 rounded-md">
              Profile Settings
            </a>
            <a href="/dashboard/preferences" className="flex items-center px-4 py-2 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 rounded-md">
              Preferences
            </a>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 bg-gray-50">
          <div className="p-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
