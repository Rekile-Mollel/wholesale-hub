import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const metrics = [
  {
    label: "Today's Sales",
    value: "KSh 0",
  },
  {
    label: "Total Products",
    value: "0",
  },
  {
    label: "Low Stock Items",
    value: "0",
  },
  {
    label: "Total Stock Value",
    value: "KSh 0",
  },
];

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-slate-50 px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-6xl flex-col gap-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Dashboard</h1>
          <p className="mt-2 text-slate-600">
            Overview of sales, products, and stock value.
          </p>
        </div>

        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {metrics.map((metric) => (
            <Card key={metric.label} className="rounded-lg">
              <CardHeader>
                <CardTitle className="text-sm text-slate-600">
                  {metric.label}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-slate-900">
                  {metric.value}
                </p>
              </CardContent>
            </Card>
          ))}
        </section>
      </div>
    </main>
  );
}
