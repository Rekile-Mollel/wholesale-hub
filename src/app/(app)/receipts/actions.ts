"use server";

import { revalidatePath } from "next/cache";

import { prisma } from "@/lib/prisma";

export async function generateReceipt(formData: FormData) {
  const saleId = String(formData.get("saleId") ?? "").trim();

  if (!saleId) {
    throw new Error("Please select a sale.");
  }

  const sale = await prisma.sale.findUnique({
    where: {
      id: saleId,
    },
    include: {
      items: true,
      receipt: true,
    },
  });

  if (!sale) {
    throw new Error("Selected sale does not exist.");
  }

  if (sale.receipt) {
    revalidatePath("/receipts");
    return;
  }

  const receiptCount = await prisma.receipt.count();
  const receiptNumber = `INV-${String(receiptCount + 1).padStart(4, "0")}`;

  await prisma.receipt.create({
    data: {
      receiptNumber,
      saleId: sale.id,
      customerName: sale.customerName,
      paymentMethod: sale.paymentMethod,
      subtotal: sale.subtotal,
      discount: sale.discount,
      total: sale.total,
    },
  });

  revalidatePath("/receipts");
}
