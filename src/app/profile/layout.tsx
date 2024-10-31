
export default function ProfileLayout({
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
            <div className="px-4 py-2 text-sm font-medium text-gray-600">Profile</div>
            <a href="/profile" className="flex items-center px-4 py-2 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 rounded-md">
              My Profile
            </a>
            <a href="/profile/edit" className="flex items-center px-4 py-2 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 rounded-md">
              Edit Profile
            </a>
            <a href="/profile/settings" className="flex items-center px-4 py-2 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 rounded-md">
              Settings
            </a>

            <div className="px-4 py-2 mt-6 text-sm font-medium text-gray-600">Account</div>
            <a href="/profile/security" className="flex items-center px-4 py-2 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 rounded-md">
              Security
            </a>
            <a href="/profile/notifications" className="flex items-center px-4 py-2 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 rounded-md">
              Notifications
            </a>
            <a href="/profile/connected-accounts" className="flex items-center px-4 py-2 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 rounded-md">
              Connected Accounts
            </a>

            <div className="px-4 py-2 mt-6 text-sm font-medium text-gray-600">Content</div>
            <a href="/profile/posts" className="flex items-center px-4 py-2 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 rounded-md">
              My Posts
            </a>
            <a href="/profile/saved" className="flex items-center px-4 py-2 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 rounded-md">
              Saved Items
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
