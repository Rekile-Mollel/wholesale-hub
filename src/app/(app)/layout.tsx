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
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <aside className="fixed inset-y-0 left-0 hidden w-[260px] flex-col border-r border-white/10 bg-slate-950 px-5 py-6 text-white lg:flex">
        <div className="border-b border-white/10 pb-6">
          <Link href="/dashboard" className="block rounded-md px-2 py-1">
            <p className="text-xl font-bold tracking-tight">Wholesale Hub</p>
            <p className="mt-1 text-sm font-medium text-slate-400">
              Inventory System
            </p>
          </Link>
        </div>

        <nav className="mt-8 flex flex-col gap-1.5">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-lg px-3 py-2.5 text-sm font-medium text-slate-300 transition hover:bg-white/10 hover:text-white hover:shadow-sm"
            >
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="mt-auto rounded-lg border border-white/10 bg-white/5 p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
            Store Mode
          </p>
          <p className="mt-2 text-sm font-medium text-slate-100">
            Ready for inventory setup
          </p>
        </div>
      </aside>

      <div className="lg:pl-[260px]">
        <header className="sticky top-0 z-10 border-b border-slate-200 bg-white/95 px-4 py-4 backdrop-blur sm:px-6 lg:px-8">
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
                  className="whitespace-nowrap rounded-lg bg-slate-100 px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-200 hover:text-slate-950"
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-4">
              <input
                type="search"
                placeholder="Search products, sales, receipts..."
                className="h-11 min-w-0 flex-1 rounded-lg border border-slate-200 bg-slate-50 px-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:bg-white focus:ring-4 focus:ring-slate-100"
              />
              <p className="hidden rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 lg:block">
                Admin
              </p>
            </div>
          </div>
        </header>

        <main className="min-h-[calc(100vh-77px)] bg-slate-50">
          {children}
        </main>
      </div>
    </div>
  );
}
