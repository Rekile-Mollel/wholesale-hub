import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { logout } from "./logout/actions";

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

        <div className="mt-auto flex flex-col gap-4">
          <div className="rounded-lg border border-white/10 bg-white/5 p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
              Store Mode
            </p>
            <p className="mt-2 text-sm font-medium text-slate-100">
              Ready for inventory setup
            </p>
          </div>

          <form action={logout}>
            <Button
              type="submit"
              variant="outline"
              className="h-11 w-full rounded-lg border-white/15 bg-transparent text-slate-100 hover:bg-white/10 hover:text-white"
            >
              Logout
            </Button>
          </form>
        </div>
      </aside>

      <div className="lg:pl-[260px]">
        <header className="sticky top-0 z-10 border-b border-slate-200 bg-white/95 px-4 py-4 backdrop-blur sm:px-6 lg:px-8">
          <div className="mx-auto flex max-w-6xl flex-col gap-3 lg:max-w-none">
            <div className="flex items-center justify-between gap-4 lg:hidden">
              <Link href="/dashboard">
                <p className="text-lg font-bold text-slate-950">
                  Wholesale Hub
                </p>
                <p className="text-xs text-slate-500">Inventory System</p>
              </Link>

              <Sheet>
                <SheetTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="rounded-lg px-4"
                  >
                    Menu
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-72 bg-slate-950 text-white">
                  <SheetHeader className="border-b border-white/10 p-6">
                    <SheetTitle className="text-left text-lg text-white">
                      Wholesale Hub
                    </SheetTitle>
                    <SheetDescription className="text-left text-slate-400">
                      Inventory System
                    </SheetDescription>
                  </SheetHeader>

                  <nav className="flex flex-col gap-2 p-6">
                    {navigation.map((item) => (
                      <SheetClose asChild key={item.href}>
                        <Link
                          href={item.href}
                          className="rounded-lg px-3 py-3 text-sm font-medium text-slate-200 transition hover:bg-white/10 hover:text-white"
                        >
                          {item.name}
                        </Link>
                      </SheetClose>
                    ))}

                    <form action={logout} className="mt-4">
                      <Button
                        type="submit"
                        variant="outline"
                        className="h-12 w-full rounded-lg border-white/15 bg-transparent text-slate-100 hover:bg-white/10 hover:text-white"
                      >
                        Logout
                      </Button>
                    </form>
                  </nav>
                </SheetContent>
              </Sheet>
            </div>

            <div className="flex items-center gap-4">
              <input
                type="search"
                placeholder="Search products, sales, receipts..."
                className="h-10 min-w-0 flex-1 rounded-lg border border-slate-200 bg-slate-50 px-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:bg-white focus:ring-4 focus:ring-slate-100 sm:h-11 sm:px-4"
              />
              <p className="hidden rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 lg:block">
                Admin
              </p>
              <form action={logout} className="hidden lg:block">
                <Button
                  type="submit"
                  variant="outline"
                  className="h-11 rounded-lg"
                >
                  Logout
                </Button>
              </form>
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
