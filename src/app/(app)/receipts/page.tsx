import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";

const summaryCards = [
  { label: "Receipts Today", value: "0" },
  { label: "Total Collected", value: "KSh 0" },
  { label: "Pending Receipts", value: "0" },
];

const receiptFields = [
  {
    label: "Customer Name",
    type: "text",
    placeholder: "e.g. Walk-in Customer",
  },
  {
    label: "Receipt Number",
    type: "text",
    placeholder: "INV-0001",
  },
  {
    label: "Sale Reference",
    type: "text",
    placeholder: "e.g. SALE-0001",
  },
  {
    label: "Payment Method",
    type: "text",
    placeholder: "e.g. Cash, M-Pesa, Bank",
  },
];

const receiptTotals = [
  { label: "Subtotal", value: "KSh 0" },
  { label: "Discount", value: "KSh 0" },
  { label: "Total", value: "KSh 0" },
];

export default function ReceiptsPage() {
  return (
    <div className="px-3 py-4 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 sm:gap-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">
            Receipts
          </h1>
          <p className="mt-1 text-sm text-slate-600 sm:mt-2">
            Generate and view customer receipts.
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

        <section className="grid grid-cols-1 gap-4 lg:grid-cols-[minmax(0,0.9fr)_minmax(360px,1.1fr)]">
          <Card size="sm" className="rounded-xl border-slate-200">
            <CardHeader className="px-4 sm:px-5">
              <CardTitle className="text-sm text-slate-900">
                Generate Receipt
              </CardTitle>
            </CardHeader>
            <CardContent className="px-4 sm:px-5">
              <form className="flex flex-col gap-4">
                <div className="grid grid-cols-1 gap-4">
                  {receiptFields.map((field) => (
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

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <Button type="button" className="h-12 w-full rounded-lg">
                    Generate Receipt
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    className="h-12 w-full rounded-lg"
                  >
                    Print Receipt
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          <Card size="sm" className="rounded-xl border-slate-200">
            <CardHeader className="px-4 sm:px-5">
              <CardTitle className="text-sm text-slate-900">
                Receipt Preview
              </CardTitle>
            </CardHeader>
            <CardContent className="px-4 sm:px-5">
              <div className="mx-auto w-full max-w-md rounded-lg border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
                <div className="border-b border-slate-200 pb-4 text-center">
                  <p className="text-lg font-bold tracking-tight text-slate-950">
                    Wholesale Hub
                  </p>
                  <p className="mt-1 text-xs font-medium uppercase tracking-wide text-slate-500">
                    Receipt preview
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-3 border-b border-slate-200 py-4 text-sm">
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-slate-500">Customer</span>
                    <span className="font-semibold text-slate-900">
                      Walk-in Customer
                    </span>
                  </div>
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-slate-500">Receipt No</span>
                    <span className="font-semibold text-slate-900">
                      INV-0001
                    </span>
                  </div>
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-slate-500">Date</span>
                    <span className="font-semibold text-slate-900">Today</span>
                  </div>
                </div>

                <div className="border-b border-slate-200 py-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Items
                  </p>
                  <div className="mt-3 rounded-lg border border-dashed border-slate-200 bg-slate-50 px-4 py-6 text-center">
                    <p className="text-sm font-medium text-slate-700">
                      No items added yet
                    </p>
                  </div>
                </div>

                <div className="flex flex-col gap-3 pt-4 text-sm">
                  {receiptTotals.map((item) => (
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
            </CardContent>
          </Card>
        </section>

        <Card size="sm" className="rounded-xl border-slate-200">
          <CardHeader className="px-4 sm:px-5">
            <CardTitle className="text-sm text-slate-900">
              Recent Receipts
            </CardTitle>
          </CardHeader>
          <CardContent className="px-4 sm:px-5">
            <div className="rounded-lg border border-dashed border-slate-200 bg-slate-50 px-4 py-8 text-center sm:py-10">
              <p className="text-sm font-medium text-slate-700">
                No receipts generated yet.
              </p>
              <p className="mt-1 text-sm text-slate-500">
                Generated receipts will appear here.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
