import Link from "next/link";

const navigation = [
  { name: "Dashboard", href: "/dashboard" },
  { name: "Products", href: "/products" },
  { name: "Sales", href: "/sales" },
  { name: "Receipts", href: "/receipts" },
];

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      <aside className="fixed inset-y-0 left-0 hidden w-64 flex-col bg-slate-950 px-6 py-6 text-white lg:flex">
        <div>
          <Link href="/dashboard" className="block">
            <p className="text-xl font-bold">Wholesale Hub</p>
            <p className="mt-1 text-sm text-slate-400">Inventory System</p>
          </Link>
        </div>

        <nav className="mt-10 flex flex-col gap-2">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-md px-3 py-2 text-sm font-medium text-slate-300 transition hover:bg-slate-800 hover:text-white"
            >
              {item.name}
            </Link>
          ))}
        </nav>
      </aside>

      <div className="lg:pl-64">
        <header className="sticky top-0 z-10 border-b border-slate-200 bg-white px-4 py-4 sm:px-6 lg:px-8">
          <div className="mx-auto flex max-w-6xl flex-col gap-4 lg:max-w-none">
            <div className="flex items-center justify-between gap-4 lg:hidden">
              <Link href="/dashboard">
                <p className="text-lg font-bold text-slate-950">
                  Wholesale Hub
                </p>
                <p className="text-xs text-slate-500">Inventory System</p>
              </Link>
              <p className="text-sm font-medium text-slate-700">Admin</p>
            </div>

            <nav className="flex gap-2 overflow-x-auto lg:hidden">
              {navigation.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="whitespace-nowrap rounded-md bg-slate-100 px-3 py-2 text-sm font-medium text-slate-700"
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-4">
              <input
                type="search"
                placeholder="Search products, sales, receipts..."
                className="h-10 min-w-0 flex-1 rounded-md border border-slate-200 bg-slate-50 px-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:bg-white"
              />
              <p className="hidden text-sm font-medium text-slate-700 lg:block">
                Admin
              </p>
            </div>
          </div>
        </header>

        <main className="min-h-[calc(100vh-73px)] bg-slate-50">{children}</main>
      </div>
    </div>
  );
}
