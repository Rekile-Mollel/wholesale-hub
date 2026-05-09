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
      variant: true,
      unit: true,
      category: true,
      buyingPrice: true,
      sellingPrice: true,
      stockQuantity: true,
      lowStockAlert: true,
      stockMovements: {
        orderBy: {
          createdAt: "desc",
        },
        select: {
          id: true,
          type: true,
          quantity: true,
          note: true,
          createdAt: true,
        },
      },
    },
  });

  const serializedProducts = products.map((product) => ({
    ...product,
    stockMovements: product.stockMovements.map((movement) => ({
      ...movement,
      createdAt: movement.createdAt.toISOString(),
    })),
  }));

  return <ProductsClient products={serializedProducts} />;
}
