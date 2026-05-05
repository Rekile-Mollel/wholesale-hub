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
    <div className="px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-6xl flex-col gap-6">
        <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-950">
              Dashboard
            </h1>
            <p className="mt-2 text-sm text-slate-600">
              Overview of sales, products, and stock value.
            </p>
          </div>
          <p className="text-sm font-medium text-slate-500">
            Today&apos;s summary
          </p>
        </div>

        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {metrics.map((metric) => (
            <Card key={metric.label} className="rounded-xl border-slate-200">
              <CardHeader className="gap-1 pb-0">
                <CardTitle className="text-xs text-slate-500">
                  {metric.label}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold tracking-tight text-slate-950">
                  {metric.value}
                </p>
                <p className="mt-2 text-sm text-slate-500">{metric.note}</p>
              </CardContent>
            </Card>
          ))}
        </section>

        <section className="grid gap-4 lg:grid-cols-2">
          <Card className="rounded-xl border-slate-200">
            <CardHeader>
              <CardTitle className="text-sm text-slate-900">
                Recent Sales
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="rounded-lg border border-dashed border-slate-200 bg-slate-50 px-4 py-8 text-center">
                <p className="text-sm font-medium text-slate-700">
                  No recent sales yet
                </p>
                <p className="mt-1 text-sm text-slate-500">
                  New customer purchases will appear here.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-xl border-slate-200">
            <CardHeader>
              <CardTitle className="text-sm text-slate-900">
                Low Stock Products
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="rounded-lg border border-dashed border-slate-200 bg-slate-50 px-4 py-8 text-center">
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

        <Card className="rounded-xl border-slate-200">
          <CardHeader>
            <CardTitle className="text-sm text-slate-900">
              Quick Actions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-3 sm:flex-row">
              {quickActions.map((action, index) => (
                <Button
                  key={action}
                  variant={index === 0 ? "default" : "outline"}
                  className="rounded-lg"
                >
                  {action}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
