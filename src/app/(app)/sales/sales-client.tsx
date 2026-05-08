"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";

import { createSale } from "./actions";

type Product = {
  id: string;
  name: string;
  variant: string | null;
  unit: string;
  sellingPrice: number;
  stockQuantity: number;
};

type RecentSale = {
  id: string;
  customerName: string;
  paymentMethod: string;
  subtotal: number;
  discount: number;
  total: number;
  notes: string | null;
  createdAt: string;
  items: {
    id: string;
    productName: string;
    unit: string;
    quantity: number;
    unitPrice: number;
    lineTotal: number;
  }[];
};

type SalesClientProps = {
  products: Product[];
  recentSales: RecentSale[];
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

function formatQuantity(value: number, unit: string) {
  const displayUnit = value === 1 || unit.endsWith("s") ? unit : `${unit}s`;

  return `${value} ${displayUnit}`;
}

function isToday(value: string) {
  const saleDate = new Date(value);
  const today = new Date();

  return (
    saleDate.getFullYear() === today.getFullYear() &&
    saleDate.getMonth() === today.getMonth() &&
    saleDate.getDate() === today.getDate()
  );
}

export function SalesClient({ products, recentSales }: SalesClientProps) {
  const todaysSales = recentSales.filter((sale) => isToday(sale.createdAt));
  const todaysTotal = todaysSales.reduce((sum, sale) => sum + sale.total, 0);
  const averageSale =
    todaysSales.length > 0 ? Math.round(todaysTotal / todaysSales.length) : 0;

  const summaryCards = [
    { label: "Today's Sales", value: formatMoney(todaysTotal) },
    { label: "Transactions", value: String(todaysSales.length) },
    { label: "Average Sale", value: formatMoney(averageSale) },
  ];

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

        <section className="grid grid-cols-1 gap-4 lg:grid-cols-[minmax(0,1.2fr)_minmax(340px,0.8fr)]">
          <Card size="sm" className="rounded-xl border-slate-200">
            <CardHeader className="px-4 sm:px-5">
              <CardTitle className="text-sm text-slate-900">
                New Sale
              </CardTitle>
            </CardHeader>
            <CardContent className="px-4 sm:px-5">
              <form action={createSale} className="flex flex-col gap-4">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <label className="flex flex-col gap-2 text-sm font-medium text-slate-700">
                    Customer Name
                    <Input
                      name="customerName"
                      type="text"
                      placeholder="Walk-in Customer"
                      className="h-12 rounded-lg border-slate-200 bg-white px-4 text-sm focus-visible:border-slate-400 focus-visible:ring-4 focus-visible:ring-slate-100"
                    />
                  </label>

                  <label className="flex flex-col gap-2 text-sm font-medium text-slate-700">
                    Product
                    <select
                      name="productId"
                      required
                      className="h-12 w-full rounded-lg border border-slate-200 bg-white px-4 text-sm text-slate-900 shadow-sm outline-none focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
                      defaultValue=""
                    >
                      <option value="" disabled>
                        Select product
                      </option>
                      {products.map((product) => (
                        <option key={product.id} value={product.id}>
                          {product.name}
                          {product.variant ? ` - ${product.variant}` : ""} (
                          {formatQuantity(product.stockQuantity, product.unit)}{" "}
                          available)
                        </option>
                      ))}
                    </select>
                  </label>

                  <label className="flex flex-col gap-2 text-sm font-medium text-slate-700">
                    Quantity
                    <Input
                      name="quantity"
                      type="number"
                      required
                      min="1"
                      placeholder="1"
                      className="h-12 rounded-lg border-slate-200 bg-white px-4 text-sm focus-visible:border-slate-400 focus-visible:ring-4 focus-visible:ring-slate-100"
                    />
                  </label>

                  <label className="flex flex-col gap-2 text-sm font-medium text-slate-700">
                    Payment Method
                    <select
                      name="paymentMethod"
                      required
                      className="h-12 w-full rounded-lg border border-slate-200 bg-white px-4 text-sm text-slate-900 shadow-sm outline-none focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
                      defaultValue="Cash"
                    >
                      <option value="Cash">Cash</option>
                      <option value="M-Pesa">M-Pesa</option>
                      <option value="Bank">Bank</option>
                      <option value="Credit">Credit</option>
                    </select>
                  </label>

                  <label className="flex flex-col gap-2 text-sm font-medium text-slate-700">
                    Discount
                    <Input
                      name="discount"
                      type="number"
                      min="0"
                      placeholder="0"
                      className="h-12 rounded-lg border-slate-200 bg-white px-4 text-sm focus-visible:border-slate-400 focus-visible:ring-4 focus-visible:ring-slate-100"
                    />
                  </label>

                  <label className="flex flex-col gap-2 text-sm font-medium text-slate-700">
                    Notes
                    <Input
                      name="notes"
                      type="text"
                      placeholder="Optional sale notes"
                      className="h-12 rounded-lg border-slate-200 bg-white px-4 text-sm focus-visible:border-slate-400 focus-visible:ring-4 focus-visible:ring-slate-100"
                    />
                  </label>
                </div>

                <div className="rounded-lg bg-slate-50 p-4 text-sm text-slate-500">
                  Select a product and quantity to save a sale. The sale total
                  will use the product&apos;s current selling price.
                </div>

                <Button type="submit" className="h-12 w-full rounded-lg sm:w-auto">
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
              {recentSales.length === 0 ? (
                <div className="rounded-lg border border-dashed border-slate-200 bg-slate-50 px-4 py-8 text-center lg:py-10">
                  <p className="text-sm font-medium text-slate-700">
                    No sales recorded yet.
                  </p>
                  <p className="mt-1 text-sm text-slate-500">
                    New sales will appear here.
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
                            {dateFormatter.format(new Date(sale.createdAt))}
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

                      <div className="mt-3 flex flex-col gap-2 rounded-lg bg-slate-50 p-3">
                        {sale.items.map((item) => (
                          <div
                            key={item.id}
                            className="flex items-center justify-between gap-3 text-sm"
                          >
                            <span className="text-slate-600">
                              {item.productName} x{" "}
                              {formatQuantity(item.quantity, item.unit)}
                            </span>
                            <span className="font-semibold text-slate-900">
                              {formatMoney(item.lineTotal)}
                            </span>
                          </div>
                        ))}
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
