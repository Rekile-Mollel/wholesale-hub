import { prisma } from "@/lib/prisma";

import { ProductsClient } from "./products-client";

export default async function ProductsPage() {
  const products = await prisma.product.findMany({
    orderBy: {
      createdAt: "desc",
    },
    select: {
      id: true,
      name: true,
      category: true,
      buyingPrice: true,
      sellingPrice: true,
      stockQuantity: true,
      lowStockAlert: true,
    },
  });

  return <ProductsClient products={products} />;
}
