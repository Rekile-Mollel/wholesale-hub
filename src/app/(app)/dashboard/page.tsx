import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const metrics = [
  {
    label: "Today's Sales",
    value: "KSh 0",
    note: "No sales recorded today",
  },
  {
    label: "Total Products",
    value: "0",
    note: "Products will appear here",
  },
  {
    label: "Low Stock Items",
    value: "0",
    note: "Stock alerts are clear",
  },
  {
    label: "Total Stock Value",
    value: "KSh 0",
    note: "Add inventory to calculate value",
  },
];

const quickActions = ["Add Product", "New Sale", "Generate Receipt"];

export default function DashboardPage() {
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
                  key={action}
                  variant={index === 0 ? "default" : "outline"}
                  className="h-12 w-full rounded-lg text-[11px] sm:h-11"
                >
                  {action}
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
              <div className="rounded-lg border border-dashed border-slate-200 bg-slate-50 px-4 py-6 text-center sm:py-8">
                <p className="text-sm font-medium text-slate-700">
                  No recent sales yet
                </p>
                <p className="mt-1 text-sm text-slate-500">
                  New customer purchases will appear here.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card size="sm" className="rounded-xl border-slate-200">
            <CardHeader className="px-4 sm:px-5">
              <CardTitle className="text-sm text-slate-900">
                Low Stock Products
              </CardTitle>
            </CardHeader>
            <CardContent className="px-4 sm:px-5">
              <div className="rounded-lg border border-dashed border-slate-200 bg-slate-50 px-4 py-6 text-center sm:py-8">
                <p className="text-sm font-medium text-slate-700">
                  No low stock products
                </p>
                <p className="mt-1 text-sm text-slate-500">
                  Items needing restock will appear here.
                </p>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
}
