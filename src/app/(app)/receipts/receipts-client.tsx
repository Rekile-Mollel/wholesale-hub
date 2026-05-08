"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { generateReceipt } from "./actions";

type SaleItem = {
  id: string;
  productName: string;
  quantity: number;
  unitPrice: number;
  lineTotal: number;
};

type Sale = {
  id: string;
  customerName: string;
  paymentMethod: string;
  subtotal: number;
  discount: number;
  total: number;
  createdAt: string;
  items: SaleItem[];
  receipt: {
    id: string;
    receiptNumber: string;
  } | null;
};

type Receipt = {
  id: string;
  receiptNumber: string;
  customerName: string;
  paymentMethod: string;
  subtotal: number;
  discount: number;
  total: number;
  createdAt: string;
  sale: {
    id: string;
    items: SaleItem[];
  };
};

type ReceiptsClientProps = {
  sales: Sale[];
  receipts: Receipt[];
};

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

function isToday(value: string) {
  const receiptDate = new Date(value);
  const today = new Date();

  return (
    receiptDate.getFullYear() === today.getFullYear() &&
    receiptDate.getMonth() === today.getMonth() &&
    receiptDate.getDate() === today.getDate()
  );
}

export function ReceiptsClient({ sales, receipts }: ReceiptsClientProps) {
  const latestReceipt = receipts[0];
  const todaysReceipts = receipts.filter((receipt) =>
    isToday(receipt.createdAt)
  );
  const todaysTotal = todaysReceipts.reduce(
    (sum, receipt) => sum + receipt.total,
    0
  );

  const summaryCards = [
    { label: "Receipts Today", value: String(todaysReceipts.length) },
    { label: "Total Collected Today", value: formatMoney(todaysTotal) },
    { label: "Total Receipts", value: String(receipts.length) },
  ];

  function handlePrint() {
    window.print();
  }

  return (
    <div className="px-3 py-4 print:bg-white print:p-0 sm:px-6 lg:px-8">
      <style>
        {`
          @media print {
            aside,
            header {
              display: none !important;
            }

            main {
              min-height: auto !important;
              background: white !important;
            }

            body {
              background: white !important;
            }
          }
        `}
      </style>

      <div className="mx-auto flex max-w-6xl flex-col gap-4 print:max-w-none print:gap-0 sm:gap-6">
        <div className="print:hidden">
          <h1 className="text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">
            Receipts
          </h1>
          <p className="mt-1 text-sm text-slate-600 sm:mt-2">
            Generate and view customer receipts.
          </p>
        </div>

        <section className="grid grid-cols-1 gap-3 print:hidden md:grid-cols-3 lg:gap-4">
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

        <section className="grid grid-cols-1 gap-4 print:block lg:grid-cols-[minmax(0,0.9fr)_minmax(360px,1.1fr)]">
          <Card size="sm" className="rounded-xl border-slate-200 print:hidden">
            <CardHeader className="px-4 sm:px-5">
              <CardTitle className="text-sm text-slate-900">
                Generate Receipt
              </CardTitle>
            </CardHeader>
            <CardContent className="px-4 sm:px-5">
              <form action={generateReceipt} className="flex flex-col gap-4">
                <label className="flex flex-col gap-2 text-sm font-medium text-slate-700">
                  Sale
                  <select
                    name="saleId"
                    required
                    className="min-h-12 w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
                    defaultValue=""
                  >
                    <option value="" disabled>
                      Select sale
                    </option>
                    {sales.map((sale) => (
                      <option
                        key={sale.id}
                        value={sale.id}
                        disabled={sale.receipt !== null}
                      >
                        {sale.customerName} - {formatMoney(sale.total)} -{" "}
                        {dateFormatter.format(new Date(sale.createdAt))}
                        {sale.receipt
                          ? ` - Receipt ${sale.receipt.receiptNumber}`
                          : ""}
                      </option>
                    ))}
                  </select>
                </label>

                <div className="rounded-lg bg-slate-50 p-4 text-sm text-slate-500">
                  Select a saved sale to generate a receipt. Sales that already
                  have receipts are shown for context and cannot be selected.
                </div>

                <Button
                  type="submit"
                  className="h-12 w-full rounded-lg sm:w-auto"
                  disabled={sales.every((sale) => sale.receipt !== null)}
                >
                  Generate Receipt
                </Button>
              </form>
            </CardContent>
          </Card>

          <Card
            size="sm"
            className="rounded-xl border-slate-200 print:border-0 print:bg-white print:shadow-none"
          >
            <CardHeader className="px-4 print:hidden sm:px-5">
              <CardTitle className="text-sm text-slate-900">
                Receipt Preview
              </CardTitle>
              <Button
                type="button"
                variant="outline"
                className="mt-3 h-11 w-full rounded-lg sm:w-auto"
                onClick={handlePrint}
                disabled={!latestReceipt}
              >
                Print Receipt
              </Button>
            </CardHeader>
            <CardContent className="px-4 print:p-0 sm:px-5">
              <div className="mx-auto w-full max-w-md rounded-lg border border-slate-200 bg-white p-4 shadow-sm print:max-w-[360px] print:rounded-none print:border-0 print:p-0 print:shadow-none sm:p-5">
                <div className="border-b border-slate-200 pb-4 text-center">
                  <p className="text-xl font-bold tracking-tight text-slate-950 print:text-2xl">
                    Wholesale Hub
                  </p>
                  <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-slate-500 print:text-slate-700">
                    Inventory &amp; Sales Receipt
                  </p>
                </div>

                {latestReceipt ? (
                  <>
                    <div className="grid grid-cols-1 gap-3 border-b border-slate-200 py-4 text-sm print:text-[12px]">
                      <div className="flex items-center justify-between gap-4">
                        <span className="text-slate-500">Receipt No</span>
                        <span className="font-semibold text-slate-900">
                          {latestReceipt.receiptNumber}
                        </span>
                      </div>
                      <div className="flex items-center justify-between gap-4">
                        <span className="text-slate-500">Customer</span>
                        <span className="font-semibold text-slate-900">
                          {latestReceipt.customerName}
                        </span>
                      </div>
                      <div className="flex items-center justify-between gap-4">
                        <span className="text-slate-500">Date</span>
                        <span className="font-semibold text-slate-900">
                          {dateFormatter.format(
                            new Date(latestReceipt.createdAt)
                          )}
                        </span>
                      </div>
                      <div className="flex items-center justify-between gap-4">
                        <span className="text-slate-500">Payment Method</span>
                        <span className="font-semibold text-slate-900">
                          {latestReceipt.paymentMethod}
                        </span>
                      </div>
                    </div>

                    <div className="border-b border-slate-200 py-4">
                      <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                        Items
                      </p>
                      <div className="mt-3 flex flex-col gap-2 print:gap-0">
                        {latestReceipt.sale.items.map((item) => (
                          <div
                            key={item.id}
                            className="flex items-start justify-between gap-3 rounded-lg bg-slate-50 p-3 text-sm print:rounded-none print:border-b print:border-slate-100 print:bg-white print:px-0 print:py-2 print:text-[12px]"
                          >
                            <div>
                              <p className="font-medium text-slate-900">
                                {item.productName}
                              </p>
                              <p className="mt-1 text-xs text-slate-500">
                                {item.quantity} x {formatMoney(item.unitPrice)}
                              </p>
                            </div>
                            <span className="font-semibold text-slate-900">
                              {formatMoney(item.lineTotal)}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex flex-col gap-3 pt-4 text-sm print:text-[12px]">
                      <div className="flex items-center justify-between gap-4">
                        <span className="text-slate-500">Subtotal</span>
                        <span className="font-semibold text-slate-900">
                          {formatMoney(latestReceipt.subtotal)}
                        </span>
                      </div>
                      <div className="flex items-center justify-between gap-4">
                        <span className="text-slate-500">Discount</span>
                        <span className="font-semibold text-slate-900">
                          {formatMoney(latestReceipt.discount)}
                        </span>
                      </div>
                      <div className="flex items-center justify-between gap-4">
                        <span className="text-slate-500">Total</span>
                        <span className="text-base font-bold text-slate-950 print:text-lg">
                          {formatMoney(latestReceipt.total)}
                        </span>
                      </div>
                    </div>

                    <div className="mt-5 border-t border-slate-200 pt-4 text-center">
                      <p className="text-xs font-medium text-slate-500 print:text-slate-700">
                        Thank you for your business.
                      </p>
                    </div>
                  </>
                ) : (
                  <div className="py-8 text-center print:hidden">
                    <p className="text-sm font-medium text-slate-700">
                      No receipt generated yet.
                    </p>
                    <p className="mt-1 text-sm text-slate-500">
                      Generate a receipt from a saved sale to preview it here.
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </section>

        <Card size="sm" className="rounded-xl border-slate-200 print:hidden">
          <CardHeader className="px-4 sm:px-5">
            <CardTitle className="text-sm text-slate-900">
              Recent Receipts
            </CardTitle>
          </CardHeader>
          <CardContent className="px-4 sm:px-5">
            {receipts.length === 0 ? (
              <div className="rounded-lg border border-dashed border-slate-200 bg-slate-50 px-4 py-8 text-center sm:py-10">
                <p className="text-sm font-medium text-slate-700">
                  No receipts generated yet.
                </p>
                <p className="mt-1 text-sm text-slate-500">
                  Generated receipts will appear here.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                {receipts.map((receipt) => (
                  <div
                    key={receipt.id}
                    className="rounded-lg border border-slate-200 bg-white p-4"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-sm font-semibold text-slate-900">
                          {receipt.receiptNumber}
                        </p>
                        <p className="mt-1 text-sm text-slate-600">
                          {receipt.customerName}
                        </p>
                      </div>
                      <p className="text-right text-sm font-bold text-slate-950">
                        {formatMoney(receipt.total)}
                      </p>
                    </div>
                    <div className="mt-3 flex flex-col gap-2 rounded-lg bg-slate-50 p-3 text-sm sm:flex-row sm:items-center sm:justify-between">
                      <span className="text-slate-600">
                        {receipt.paymentMethod}
                      </span>
                      <span className="text-slate-500">
                        {dateFormatter.format(new Date(receipt.createdAt))}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
