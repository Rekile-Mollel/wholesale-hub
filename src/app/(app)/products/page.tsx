"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const summaryCards = [
  { label: "Total Products", value: "0" },
  { label: "Low Stock", value: "0" },
  { label: "Stock Value", value: "KSh 0" },
];

const sampleProducts = [
  {
    name: "Menengai Soap",
    category: "Soaps",
    stock: "0",
    buyingPrice: "KSh 0",
    sellingPrice: "KSh 0",
    status: "Low Stock",
  },
  {
    name: "Nice Tissues",
    category: "Tissues",
    stock: "0",
    buyingPrice: "KSh 0",
    sellingPrice: "KSh 0",
    status: "Low Stock",
  },
];

export default function ProductsPage() {
  return (
    <Sheet>
      <div className="px-3 py-4 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 sm:gap-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">
                Products
              </h1>
              <p className="mt-1 text-sm text-slate-600 sm:mt-2">
                Manage wholesale products and stock levels.
              </p>
            </div>

            <SheetTrigger asChild>
              <Button className="h-12 w-full rounded-lg sm:w-auto lg:h-11">
                Add Product
              </Button>
            </SheetTrigger>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Input
              type="search"
              placeholder="Search products..."
              className="h-12 rounded-lg border-slate-200 bg-white px-4 text-sm shadow-sm focus-visible:border-slate-400 focus-visible:ring-4 focus-visible:ring-slate-100 sm:h-11"
            />
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

        <Card size="sm" className="rounded-xl border-slate-200">
          <CardContent className="px-4 py-5 text-center sm:px-5">
            <div className="mx-auto max-w-sm">
              <p className="text-base font-semibold text-slate-900">
                No products yet
              </p>
              <p className="mt-1 text-sm text-slate-500">
                Add your first product to start tracking inventory.
              </p>
              <SheetTrigger asChild>
                <Button className="mt-4 h-12 w-full rounded-lg sm:w-auto">
                  Add Product
                </Button>
              </SheetTrigger>
            </div>
          </CardContent>
        </Card>

        <section className="flex flex-col gap-3">
          <div>
            <h2 className="text-base font-semibold text-slate-950">
              Product Preview
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Sample cards for layout preview only.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
            {sampleProducts.map((product) => (
              <Card
                key={product.name}
                size="sm"
                className="rounded-xl border-slate-200"
              >
                <CardHeader className="gap-3 px-4 sm:px-5">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <CardTitle className="text-sm text-slate-950">
                        {product.name}
                      </CardTitle>
                      <p className="mt-1 text-sm text-slate-500">
                        Category: {product.category}
                      </p>
                    </div>
                    <Badge className="rounded-full bg-amber-100 px-2.5 py-1 text-amber-700">
                      {product.status}
                    </Badge>
                  </div>
                </CardHeader>

                <CardContent className="flex flex-col gap-4 px-4 sm:px-5">
                  <div className="grid grid-cols-1 gap-3 rounded-lg bg-slate-50 p-3 text-sm">
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-slate-500">Stock</span>
                      <span className="font-semibold text-slate-900">
                        {product.stock}
                      </span>
                    </div>
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-slate-500">Buying Price</span>
                      <span className="font-semibold text-slate-900">
                        {product.buyingPrice}
                      </span>
                    </div>
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-slate-500">Selling Price</span>
                      <span className="font-semibold text-slate-900">
                        {product.sellingPrice}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <Button
                      variant="outline"
                      className="h-11 rounded-lg text-[11px]"
                    >
                      Edit
                    </Button>
                    <Button
                      variant="destructive"
                      className="h-11 rounded-lg text-[11px]"
                    >
                      Delete
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </div>
      </div>

      <SheetContent
        side="right"
        className="w-full overflow-y-auto bg-white p-0 sm:max-w-md"
      >
        <SheetHeader className="border-b border-slate-200 p-5 sm:p-6">
          <SheetTitle className="text-left text-lg text-slate-950">
            Add Product
          </SheetTitle>
          <SheetDescription className="text-left text-slate-500">
            Add a new product to your wholesale inventory.
          </SheetDescription>
        </SheetHeader>

        <form className="flex flex-col gap-4 p-5 sm:p-6">
          <label className="flex flex-col gap-2 text-sm font-medium text-slate-700">
            Product Name
            <Input
              type="text"
              placeholder="e.g. Menengai Soap"
              className="h-12 rounded-lg border-slate-200 bg-white px-4 text-sm focus-visible:border-slate-400 focus-visible:ring-4 focus-visible:ring-slate-100"
            />
          </label>

          <label className="flex flex-col gap-2 text-sm font-medium text-slate-700">
            Category
            <Input
              type="text"
              placeholder="e.g. Soaps"
              className="h-12 rounded-lg border-slate-200 bg-white px-4 text-sm focus-visible:border-slate-400 focus-visible:ring-4 focus-visible:ring-slate-100"
            />
          </label>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <label className="flex flex-col gap-2 text-sm font-medium text-slate-700">
              Buying Price
              <Input
                type="number"
                placeholder="0"
                className="h-12 rounded-lg border-slate-200 bg-white px-4 text-sm focus-visible:border-slate-400 focus-visible:ring-4 focus-visible:ring-slate-100"
              />
            </label>

            <label className="flex flex-col gap-2 text-sm font-medium text-slate-700">
              Selling Price
              <Input
                type="number"
                placeholder="0"
                className="h-12 rounded-lg border-slate-200 bg-white px-4 text-sm focus-visible:border-slate-400 focus-visible:ring-4 focus-visible:ring-slate-100"
              />
            </label>

            <label className="flex flex-col gap-2 text-sm font-medium text-slate-700">
              Stock Quantity
              <Input
                type="number"
                placeholder="0"
                className="h-12 rounded-lg border-slate-200 bg-white px-4 text-sm focus-visible:border-slate-400 focus-visible:ring-4 focus-visible:ring-slate-100"
              />
            </label>

            <label className="flex flex-col gap-2 text-sm font-medium text-slate-700">
              Low Stock Alert
              <Input
                type="number"
                placeholder="0"
                className="h-12 rounded-lg border-slate-200 bg-white px-4 text-sm focus-visible:border-slate-400 focus-visible:ring-4 focus-visible:ring-slate-100"
              />
            </label>
          </div>

          <p className="rounded-lg bg-slate-50 p-3 text-sm text-slate-500">
            Product saving will be connected to the database later.
          </p>

          <Button type="button" className="h-12 w-full rounded-lg">
            Save Product
          </Button>
        </form>
      </SheetContent>
    </Sheet>
  );
}
