import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";

const summaryCards = [
  { label: "Today's Sales", value: "KSh 0" },
  { label: "Transactions", value: "0" },
  { label: "Average Sale", value: "KSh 0" },
];

const saleFields = [
  {
    label: "Customer Name",
    type: "text",
    placeholder: "e.g. Jane Wanjiku",
  },
  {
    label: "Product",
    type: "text",
    placeholder: "e.g. Menengai Soap",
  },
  {
    label: "Quantity",
    type: "number",
    placeholder: "0",
  },
  {
    label: "Unit Price",
    type: "number",
    placeholder: "0",
  },
  {
    label: "Payment Method",
    type: "text",
    placeholder: "e.g. Cash, M-Pesa, Bank",
  },
  {
    label: "Notes",
    type: "text",
    placeholder: "Optional sale notes",
  },
];

const saleTotals = [
  { label: "Subtotal", value: "KSh 0" },
  { label: "Discount", value: "KSh 0" },
  { label: "Total", value: "KSh 0" },
];

export default function SalesPage() {
  return (
    <div className="px-3 py-4 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 sm:gap-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">
            Sales
          </h1>
          <p className="mt-1 text-sm text-slate-600 sm:mt-2">
            Record customer purchases and track revenue.
          </p>
        </div>

        <section className="grid grid-cols-1 gap-3 md:grid-cols-3 lg:gap-4">
          {summaryCards.map((item) => (
            <Card
              key={item.label}
              size="sm"
              className="rounded-xl border-slate-200"
            >
              <CardHeader className="px-4 pb-0 sm:px-5">
                <CardTitle className="text-xs text-slate-500">
                  {item.label}
                </CardTitle>
              </CardHeader>
              <CardContent className="px-4 sm:px-5">
                <p className="text-2xl font-bold tracking-tight text-slate-950">
                  {item.value}
                </p>
              </CardContent>
            </Card>
          ))}
        </section>

        <section className="grid grid-cols-1 gap-4 lg:grid-cols-[minmax(0,1.35fr)_minmax(320px,0.65fr)]">
          <Card size="sm" className="rounded-xl border-slate-200">
            <CardHeader className="px-4 sm:px-5">
              <CardTitle className="text-sm text-slate-900">
                New Sale
              </CardTitle>
            </CardHeader>
            <CardContent className="px-4 sm:px-5">
              <form className="flex flex-col gap-4">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {saleFields.map((field) => (
                    <label
                      key={field.label}
                      className="flex flex-col gap-2 text-sm font-medium text-slate-700"
                    >
                      {field.label}
                      <Input
                        type={field.type}
                        placeholder={field.placeholder}
                        className="h-12 rounded-lg border-slate-200 bg-white px-4 text-sm focus-visible:border-slate-400 focus-visible:ring-4 focus-visible:ring-slate-100"
                      />
                    </label>
                  ))}
                </div>

                <div className="rounded-lg bg-slate-50 p-4">
                  <div className="flex flex-col gap-3 text-sm">
                    {saleTotals.map((item) => (
                      <div
                        key={item.label}
                        className="flex items-center justify-between gap-4"
                      >
                        <span className="text-slate-500">{item.label}</span>
                        <span
                          className={
                            item.label === "Total"
                              ? "text-base font-bold text-slate-950"
                              : "font-semibold text-slate-900"
                          }
                        >
                          {item.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <Button type="button" className="h-12 w-full rounded-lg sm:w-auto">
                  Save Sale
                </Button>
              </form>
            </CardContent>
          </Card>

          <Card size="sm" className="rounded-xl border-slate-200">
            <CardHeader className="px-4 sm:px-5">
              <CardTitle className="text-sm text-slate-900">
                Recent Sales
              </CardTitle>
            </CardHeader>
            <CardContent className="px-4 sm:px-5">
              <div className="rounded-lg border border-dashed border-slate-200 bg-slate-50 px-4 py-8 text-center lg:py-10">
                <p className="text-sm font-medium text-slate-700">
                  No sales recorded yet.
                </p>
                <p className="mt-1 text-sm text-slate-500">
                  New sales will appear here.
                </p>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
}
