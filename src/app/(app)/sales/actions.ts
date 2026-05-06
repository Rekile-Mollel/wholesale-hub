"use server";

import { revalidatePath } from "next/cache";

import { prisma } from "@/lib/prisma";

export async function createSale(formData: FormData) {
  const customerName =
    String(formData.get("customerName") ?? "").trim() || "Walk-in Customer";
  const productId = String(formData.get("productId") ?? "").trim();
  const quantity = Number(formData.get("quantity") ?? 0);
  const paymentMethod = String(formData.get("paymentMethod") ?? "").trim();
  const discountValue = formData.get("discount");
  const discount =
    discountValue === null || String(discountValue).trim() === ""
      ? 0
      : Number(discountValue);
  const notes = String(formData.get("notes") ?? "").trim();

  if (!productId) {
    throw new Error("Please select a product.");
  }

  if (!Number.isFinite(quantity) || quantity <= 0) {
    throw new Error("Quantity must be greater than 0.");
  }

  if (!paymentMethod) {
    throw new Error("Please select a payment method.");
  }

  if (!Number.isFinite(discount) || discount < 0) {
    throw new Error("Discount must be 0 or greater.");
  }

  const product = await prisma.product.findUnique({
    where: {
      id: productId,
    },
  });

  if (!product) {
    throw new Error("Selected product does not exist.");
  }

  if (quantity > product.stockQuantity) {
    throw new Error("Quantity is greater than available stock.");
  }

  const unitPrice = product.sellingPrice;
  const subtotal = unitPrice * quantity;
  const total = subtotal - discount;
  const lineTotal = subtotal;

  await prisma.$transaction(async (tx) => {
    await tx.sale.create({
      data: {
        customerName,
        paymentMethod,
        subtotal,
        discount,
        total,
        notes: notes || null,
        items: {
          create: {
            productId: product.id,
            productName: product.name,
            quantity,
            unitPrice,
            lineTotal,
          },
        },
      },
    });

    await tx.product.update({
      where: {
        id: product.id,
      },
      data: {
        stockQuantity: {
          decrement: quantity,
        },
      },
    });
  });

  revalidatePath("/sales");
  revalidatePath("/products");
}
