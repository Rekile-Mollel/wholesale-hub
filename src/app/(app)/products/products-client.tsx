"use client";

import { useMemo, useState } from "react";

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

import { createProduct, deleteProduct, updateProduct } from "./actions";

type Product = {
  id: string;
  name: string;
  category: string;
  buyingPrice: number;
  sellingPrice: number;
  stockQuantity: number;
  lowStockAlert: number;
};

type ProductsClientProps = {
  products: Product[];
};

const moneyFormatter = new Intl.NumberFormat("en-KE", {
  maximumFractionDigits: 0,
});

function formatMoney(value: number) {
  return `KSh ${moneyFormatter.format(value)}`;
}

function ProductFormFields({ product }: { product?: Product }) {
  return (
    <>
      <label className="flex flex-col gap-2 text-sm font-medium text-slate-700">
        Product Name
        <Input
          name="name"
          type="text"
          required
          defaultValue={product?.name}
          placeholder="e.g. Menengai Soap"
          className="h-12 rounded-lg border-slate-200 bg-white px-4 text-sm focus-visible:border-slate-400 focus-visible:ring-4 focus-visible:ring-slate-100"
        />
      </label>

      <label className="flex flex-col gap-2 text-sm font-medium text-slate-700">
        Category
        <Input
          name="category"
          type="text"
          required
          defaultValue={product?.category}
          placeholder="e.g. Soaps"
          className="h-12 rounded-lg border-slate-200 bg-white px-4 text-sm focus-visible:border-slate-400 focus-visible:ring-4 focus-visible:ring-slate-100"
        />
      </label>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <label className="flex flex-col gap-2 text-sm font-medium text-slate-700">
          Buying Price
          <Input
            name="buyingPrice"
            type="number"
            required
            min="0"
            defaultValue={product?.buyingPrice}
            placeholder="0"
            className="h-12 rounded-lg border-slate-200 bg-white px-4 text-sm focus-visible:border-slate-400 focus-visible:ring-4 focus-visible:ring-slate-100"
          />
        </label>

        <label className="flex flex-col gap-2 text-sm font-medium text-slate-700">
          Selling Price
          <Input
            name="sellingPrice"
            type="number"
            required
            min="0"
            defaultValue={product?.sellingPrice}
            placeholder="0"
            className="h-12 rounded-lg border-slate-200 bg-white px-4 text-sm focus-visible:border-slate-400 focus-visible:ring-4 focus-visible:ring-slate-100"
          />
        </label>

        <label className="flex flex-col gap-2 text-sm font-medium text-slate-700">
          Stock Quantity
          <Input
            name="stockQuantity"
            type="number"
            required
            min="0"
            defaultValue={product?.stockQuantity}
            placeholder="0"
            className="h-12 rounded-lg border-slate-200 bg-white px-4 text-sm focus-visible:border-slate-400 focus-visible:ring-4 focus-visible:ring-slate-100"
          />
        </label>

        <label className="flex flex-col gap-2 text-sm font-medium text-slate-700">
          Low Stock Alert
          <Input
            name="lowStockAlert"
            type="number"
            required
            min="0"
            defaultValue={product?.lowStockAlert}
            placeholder="0"
            className="h-12 rounded-lg border-slate-200 bg-white px-4 text-sm focus-visible:border-slate-400 focus-visible:ring-4 focus-visible:ring-slate-100"
          />
        </label>
      </div>
    </>
  );
}

export function ProductsClient({ products }: ProductsClientProps) {
  const [search, setSearch] = useState("");
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const lowStockCount = products.filter(
    (product) => product.stockQuantity <= product.lowStockAlert
  ).length;

  const stockValue = products.reduce(
    (total, product) => total + product.buyingPrice * product.stockQuantity,
    0
  );

  const summaryCards = [
    { label: "Total Products", value: String(products.length) },
    { label: "Low Stock", value: String(lowStockCount) },
    { label: "Stock Value", value: formatMoney(stockValue) },
  ];

  const filteredProducts = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) {
      return products;
    }

    return products.filter((product) =>
      [product.name, product.category].some((value) =>
        value.toLowerCase().includes(query)
      )
    );
  }, [products, search]);

  return (
    <>
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
              value={search}
              onChange={(event) => setSearch(event.target.value)}
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

          {products.length === 0 ? (
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
          ) : (
            <section className="flex flex-col gap-3">
              <div>
                <h2 className="text-base font-semibold text-slate-950">
                  Product List
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  Real inventory products from the database.
                </p>
              </div>

              {filteredProducts.length === 0 ? (
                <Card size="sm" className="rounded-xl border-slate-200">
                  <CardContent className="px-4 py-6 text-center sm:px-5">
                    <p className="text-sm font-medium text-slate-700">
                      No matching products found.
                    </p>
                    <p className="mt-1 text-sm text-slate-500">
                      Try a different product name or category.
                    </p>
                  </CardContent>
                </Card>
              ) : (
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
                  {filteredProducts.map((product) => {
                    const isLowStock =
                      product.stockQuantity <= product.lowStockAlert;

                    return (
                      <Card
                        key={product.id}
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
                            <Badge
                              className={
                                isLowStock
                                  ? "rounded-full bg-amber-100 px-2.5 py-1 text-amber-700"
                                  : "rounded-full bg-emerald-100 px-2.5 py-1 text-emerald-700"
                              }
                            >
                              {isLowStock ? "Low Stock" : "In Stock"}
                            </Badge>
                          </div>
                        </CardHeader>

                        <CardContent className="flex flex-col gap-4 px-4 sm:px-5">
                          <div className="grid grid-cols-1 gap-3 rounded-lg bg-slate-50 p-3 text-sm">
                            <div className="flex items-center justify-between gap-3">
                              <span className="text-slate-500">Stock</span>
                              <span className="font-semibold text-slate-900">
                                {product.stockQuantity}
                              </span>
                            </div>
                            <div className="flex items-center justify-between gap-3">
                              <span className="text-slate-500">
                                Buying Price
                              </span>
                              <span className="font-semibold text-slate-900">
                                {formatMoney(product.buyingPrice)}
                              </span>
                            </div>
                            <div className="flex items-center justify-between gap-3">
                              <span className="text-slate-500">
                                Selling Price
                              </span>
                              <span className="font-semibold text-slate-900">
                                {formatMoney(product.sellingPrice)}
                              </span>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                            <Button
                              type="button"
                              variant="outline"
                              className="h-11 rounded-lg text-[11px]"
                              onClick={() => setEditingProduct(product)}
                            >
                              Edit
                            </Button>
                            <form action={deleteProduct}>
                              <input
                                type="hidden"
                                name="id"
                                value={product.id}
                              />
                              <Button
                                type="submit"
                                variant="destructive"
                                className="h-11 w-full rounded-lg text-[11px]"
                              >
                                Delete Product
                              </Button>
                            </form>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              )}
            </section>
          )}
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

        <form action={createProduct} className="flex flex-col gap-4 p-5 sm:p-6">
          <ProductFormFields />

          <Button type="submit" className="h-12 w-full rounded-lg">
            Save Product
          </Button>
        </form>
      </SheetContent>
      </Sheet>

      <Sheet
        open={editingProduct !== null}
        onOpenChange={(open) => {
          if (!open) {
            setEditingProduct(null);
          }
        }}
      >
        <SheetContent
          side="right"
          className="w-full overflow-y-auto bg-white p-0 sm:max-w-md"
        >
          <SheetHeader className="border-b border-slate-200 p-5 sm:p-6">
            <SheetTitle className="text-left text-lg text-slate-950">
              Edit Product
            </SheetTitle>
            <SheetDescription className="text-left text-slate-500">
              Update product details and stock settings.
            </SheetDescription>
          </SheetHeader>

          {editingProduct ? (
            <form
              key={editingProduct.id}
              action={updateProduct}
              className="flex flex-col gap-4 p-5 sm:p-6"
            >
              <input type="hidden" name="id" value={editingProduct.id} />
              <ProductFormFields product={editingProduct} />

              <Button type="submit" className="h-12 w-full rounded-lg">
                Update Product
              </Button>
            </form>
          ) : null}
        </SheetContent>
      </Sheet>
    </>
  );
}
