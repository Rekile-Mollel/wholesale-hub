import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { prisma } from "@/lib/prisma";

const moneyFormatter = new Intl.NumberFormat("en-KE", {
  maximumFractionDigits: 0,
});

const dateFormatter = new Intl.DateTimeFormat("en-KE", {
  dateStyle: "medium",
  timeStyle: "short",
});

function formatMoney(value: number) {
  return `KSh ${moneyFormatter.format(value)}`;
}

const quickActions = [
  { label: "Add Product", href: "/products" },
  { label: "New Sale", href: "/sales" },
  { label: "Generate Receipt", href: "/receipts" },
];

export default async function DashboardPage() {
  const today = new Date();
  const startOfToday = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate()
  );
  const startOfTomorrow = new Date(startOfToday);
  startOfTomorrow.setDate(startOfTomorrow.getDate() + 1);

  const [products, todaysSales, recentSales] = await Promise.all([
    prisma.product.findMany({
      orderBy: {
        createdAt: "desc",
      },
    }),
    prisma.sale.findMany({
      where: {
        createdAt: {
          gte: startOfToday,
          lt: startOfTomorrow,
        },
      },
    }),
    prisma.sale.findMany({
      orderBy: {
        createdAt: "desc",
      },
      take: 5,
      include: {
        items: true,
      },
    }),
  ]);

  const todaysSalesTotal = todaysSales.reduce(
    (sum, sale) => sum + sale.total,
    0
  );
  const lowStockProducts = products.filter(
    (product) => product.stockQuantity <= product.lowStockAlert
  );
  const stockValue = products.reduce(
    (sum, product) => sum + product.buyingPrice * product.stockQuantity,
    0
  );

  const metrics = [
    {
      label: "Today's Sales",
      value: formatMoney(todaysSalesTotal),
      note:
        todaysSales.length === 0
          ? "No sales recorded today"
          : `${todaysSales.length} sale${todaysSales.length === 1 ? "" : "s"} today`,
    },
    {
      label: "Total Products",
      value: String(products.length),
      note:
        products.length === 0
          ? "Products will appear here"
          : "Products in inventory",
    },
    {
      label: "Low Stock Items",
      value: String(lowStockProducts.length),
      note:
        lowStockProducts.length === 0
          ? "Stock alerts are clear"
          : "Products need attention",
    },
    {
      label: "Total Stock Value",
      value: formatMoney(stockValue),
      note:
        products.length === 0
          ? "Add inventory to calculate value"
          : "Based on buying price",
    },
  ];

  return (
    <div className="px-3 py-4 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 sm:gap-6">
        <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">
              Dashboard
            </h1>
            <p className="mt-1 text-sm text-slate-600 sm:mt-2">
              Overview of sales, products, and stock value.
            </p>
          </div>
          <p className="text-xs font-medium uppercase tracking-wide text-slate-500 sm:text-sm sm:normal-case sm:tracking-normal">
            Today&apos;s summary
          </p>
        </div>

        <section className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-4 lg:gap-4">
          {metrics.map((metric) => (
            <Card
              key={metric.label}
              size="sm"
              className="rounded-xl border-slate-200"
            >
              <CardHeader className="gap-1 px-4 pb-0 sm:px-5">
                <CardTitle className="text-xs text-slate-500">
                  {metric.label}
                </CardTitle>
              </CardHeader>
              <CardContent className="px-4 sm:px-5">
                <p className="text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">
                  {metric.value}
                </p>
                <p className="mt-1 text-xs text-slate-500 sm:mt-2 sm:text-sm">
                  {metric.note}
                </p>
              </CardContent>
            </Card>
          ))}
        </section>

        <Card size="sm" className="rounded-xl border-slate-200">
          <CardHeader className="px-4 sm:px-5">
            <CardTitle className="text-sm text-slate-900">
              Quick Actions
            </CardTitle>
          </CardHeader>
          <CardContent className="px-4 sm:px-5">
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              {quickActions.map((action, index) => (
                <Button
                  key={action.label}
                  asChild
                  variant={index === 0 ? "default" : "outline"}
                  className="h-12 w-full rounded-lg text-[11px] sm:h-11"
                >
                  <Link href={action.href}>{action.label}</Link>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        <section className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <Card size="sm" className="rounded-xl border-slate-200">
            <CardHeader className="px-4 sm:px-5">
              <CardTitle className="text-sm text-slate-900">
                Recent Sales
              </CardTitle>
            </CardHeader>
            <CardContent className="px-4 sm:px-5">
              {recentSales.length === 0 ? (
                <div className="rounded-lg border border-dashed border-slate-200 bg-slate-50 px-4 py-6 text-center sm:py-8">
                  <p className="text-sm font-medium text-slate-700">
                    No recent sales yet
                  </p>
                  <p className="mt-1 text-sm text-slate-500">
                    New customer purchases will appear here.
                  </p>
                </div>
              ) : (
                <div className="flex flex-col gap-3">
                  {recentSales.map((sale) => (
                    <div
                      key={sale.id}
                      className="rounded-lg border border-slate-200 bg-white p-4"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="text-sm font-semibold text-slate-900">
                            {sale.customerName}
                          </p>
                          <p className="mt-1 text-xs text-slate-500">
                            {dateFormatter.format(sale.createdAt)}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-bold text-slate-950">
                            {formatMoney(sale.total)}
                          </p>
                          <p className="mt-1 text-xs text-slate-500">
                            {sale.paymentMethod}
                          </p>
                        </div>
                      </div>

                      <div className="mt-3 rounded-lg bg-slate-50 p-3">
                        <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                          Items
                        </p>
                        <p className="mt-1 text-sm text-slate-700">
                          {sale.items
                            .map((item) => item.productName)
                            .join(", ")}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          <Card size="sm" className="rounded-xl border-slate-200">
            <CardHeader className="px-4 sm:px-5">
              <CardTitle className="text-sm text-slate-900">
                Low Stock Products
              </CardTitle>
            </CardHeader>
            <CardContent className="px-4 sm:px-5">
              {lowStockProducts.length === 0 ? (
                <div className="rounded-lg border border-dashed border-slate-200 bg-slate-50 px-4 py-6 text-center sm:py-8">
                  <p className="text-sm font-medium text-slate-700">
                    Stock levels look good
                  </p>
                  <p className="mt-1 text-sm text-slate-500">
                    No products are currently below their alert threshold.
                  </p>
                </div>
              ) : (
                <div className="flex flex-col gap-3">
                  {lowStockProducts.map((product) => (
                    <div
                      key={product.id}
                      className="rounded-lg border border-slate-200 bg-white p-4"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="text-sm font-semibold text-slate-900">
                            {product.name}
                          </p>
                          <p className="mt-1 text-xs text-slate-500">
                            Alert at {product.lowStockAlert}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-bold text-slate-950">
                            {product.stockQuantity}
                          </p>
                          <p className="mt-1 text-xs text-slate-500">
                            in stock
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
}
