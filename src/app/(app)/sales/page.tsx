import { prisma } from "@/lib/prisma";

import { SalesClient } from "./sales-client";

export default async function SalesPage() {
  const products = await prisma.product.findMany({
    orderBy: {
      name: "asc",
    },
    select: {
      id: true,
      name: true,
      variant: true,
      unit: true,
      sellingPrice: true,
      stockQuantity: true,
    },
  });

  const recentSales = await prisma.sale.findMany({
    orderBy: {
      createdAt: "desc",
    },
    take: 5,
    include: {
      items: {
        include: {
          product: true,
        },
      },
    },
  });

  return (
    <SalesClient
      products={products}
      recentSales={recentSales.map((sale) => ({
        id: sale.id,
        customerName: sale.customerName,
        paymentMethod: sale.paymentMethod,
        subtotal: sale.subtotal,
        discount: sale.discount,
        total: sale.total,
        notes: sale.notes,
        createdAt: sale.createdAt.toISOString(),
        items: sale.items.map((item) => ({
          id: item.id,
          productName: item.product.variant
            ? `${item.product.name} - ${item.product.variant}`
            : item.productName,
          unit: item.product.unit,
          quantity: item.quantity,
          unitPrice: item.unitPrice,
          lineTotal: item.lineTotal,
        })),
      }))}
    />
  );
}
