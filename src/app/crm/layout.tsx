
export default function CRMLayout({
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
            <div className="px-4 py-2 text-sm font-medium text-gray-600">CRM</div>
            <a href="/crm" className="flex items-center px-4 py-2 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 rounded-md">
              Contacts
            </a>
            <a href="/crm/leads" className="flex items-center px-4 py-2 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 rounded-md">
              Leads
            </a>
            <a href="/crm/customers" className="flex items-center px-4 py-2 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 rounded-md">
              Customers
            </a>
            <a href="/crm/deals" className="flex items-center px-4 py-2 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 rounded-md">
              Deals
            </a>
            
            <div className="px-4 py-2 mt-6 text-sm font-medium text-gray-600">Management</div>
            <a href="/crm/tasks" className="flex items-center px-4 py-2 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 rounded-md">
              Tasks
            </a>
            <a href="/crm/reports" className="flex items-center px-4 py-2 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 rounded-md">
              Reports
            </a>
            <a href="/crm/settings" className="flex items-center px-4 py-2 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 rounded-md">
              Settings
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
