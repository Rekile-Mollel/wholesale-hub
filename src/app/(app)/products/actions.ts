"use server";

import { revalidatePath } from "next/cache";

import { prisma } from "@/lib/prisma";

export async function createProduct(formData: FormData) {
  const name = String(formData.get("name") ?? "").trim();
  const category = String(formData.get("category") ?? "").trim();
  const buyingPrice = Number(formData.get("buyingPrice") ?? 0);
  const sellingPrice = Number(formData.get("sellingPrice") ?? 0);
  const stockQuantity = Number(formData.get("stockQuantity") ?? 0);
  const lowStockAlert = Number(formData.get("lowStockAlert") ?? 0);

  await prisma.product.create({
    data: {
      name,
      category,
      buyingPrice,
      sellingPrice,
      stockQuantity,
      lowStockAlert,
    },
  });

  revalidatePath("/products");
}
