
export default function MarketplaceLayout({
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
            <div className="px-4 py-2 text-sm font-medium text-gray-600">Marketplace</div>
            <a href="/marketplace" className="flex items-center px-4 py-2 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 rounded-md">
              Browse Products
            </a>
            <a href="/marketplace/featured" className="flex items-center px-4 py-2 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 rounded-md">
              Featured
            </a>
            <a href="/marketplace/categories" className="flex items-center px-4 py-2 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 rounded-md">
              Categories
            </a>
            
            <div className="px-4 py-2 mt-6 text-sm font-medium text-gray-600">Creator Tools</div>
            <a href="/marketplace/dashboard" className="flex items-center px-4 py-2 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 rounded-md">
              Creator Dashboard
            </a>
            <a href="/marketplace/products/new" className="flex items-center px-4 py-2 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 rounded-md">
              Create Product
            </a>
            <a href="/marketplace/analytics" className="flex items-center px-4 py-2 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 rounded-md">
              Analytics
            </a>

            <div className="px-4 py-2 mt-6 text-sm font-medium text-gray-600">Account</div>
            <a href="/marketplace/purchases" className="flex items-center px-4 py-2 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 rounded-md">
              My Purchases
            </a>
            <a href="/marketplace/wishlist" className="flex items-center px-4 py-2 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 rounded-md">
              Wishlist
            </a>
            <a href="/marketplace/settings" className="flex items-center px-4 py-2 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 rounded-md">
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
