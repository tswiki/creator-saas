

export default function CRMLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-screen w-screen grid grid-rows-[auto_1fr]">
      {/* Header */}
      <header className="bg-gray-100 p-4">
        <h1 className="text-xl font-bold text-gray-700">CRM Dashboard</h1>
      </header>

      {/* Main Content */}
      <main className="bg-gray-50 p-8 overflow-x-auto">
        {children}
      </main>
    </div>
  );
}
