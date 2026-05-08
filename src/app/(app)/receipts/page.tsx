import { prisma } from "@/lib/prisma";

import { ReceiptsClient } from "./receipts-client";

export default async function ReceiptsPage() {
  const [sales, receipts] = await Promise.all([
    prisma.sale.findMany({
      orderBy: {
        createdAt: "desc",
      },
      include: {
        items: true,
        receipt: true,
      },
    }),
    prisma.receipt.findMany({
      orderBy: {
        createdAt: "desc",
      },
      include: {
        sale: {
          include: {
            items: true,
          },
        },
      },
    }),
  ]);

  return (
    <ReceiptsClient
      sales={sales.map((sale) => ({
        id: sale.id,
        customerName: sale.customerName,
        paymentMethod: sale.paymentMethod,
        subtotal: sale.subtotal,
        discount: sale.discount,
        total: sale.total,
        createdAt: sale.createdAt.toISOString(),
        items: sale.items.map((item) => ({
          id: item.id,
          productName: item.productName,
          quantity: item.quantity,
          unitPrice: item.unitPrice,
          lineTotal: item.lineTotal,
        })),
        receipt: sale.receipt
          ? {
              id: sale.receipt.id,
              receiptNumber: sale.receipt.receiptNumber,
            }
          : null,
      }))}
      receipts={receipts.map((receipt) => ({
        id: receipt.id,
        receiptNumber: receipt.receiptNumber,
        customerName: receipt.customerName,
        paymentMethod: receipt.paymentMethod,
        subtotal: receipt.subtotal,
        discount: receipt.discount,
        total: receipt.total,
        createdAt: receipt.createdAt.toISOString(),
        sale: {
          id: receipt.sale.id,
          items: receipt.sale.items.map((item) => ({
            id: item.id,
            productName: item.productName,
            quantity: item.quantity,
            unitPrice: item.unitPrice,
            lineTotal: item.lineTotal,
          })),
        },
      }))}
    />
  );
}
