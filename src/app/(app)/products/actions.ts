"use server";

import { revalidatePath } from "next/cache";

import { prisma } from "@/lib/prisma";

export async function createProduct(formData: FormData) {
  const name = String(formData.get("name") ?? "").trim();
  const variant = String(formData.get("variant") ?? "").trim();
  const unit = String(formData.get("unit") ?? "").trim() || "piece";
  const category = String(formData.get("category") ?? "").trim();
  const buyingPrice = Number(formData.get("buyingPrice") ?? 0);
  const sellingPrice = Number(formData.get("sellingPrice") ?? 0);
  const stockQuantity = Number(formData.get("stockQuantity") ?? 0);
  const lowStockAlert = Number(formData.get("lowStockAlert") ?? 0);

  await prisma.product.create({
    data: {
      name,
      variant: variant || null,
      unit,
      category,
      buyingPrice,
      sellingPrice,
      stockQuantity,
      lowStockAlert,
    },
  });

  revalidatePath("/products");
}

export async function updateProduct(formData: FormData) {
  const id = String(formData.get("id") ?? "");
  const name = String(formData.get("name") ?? "").trim();
  const variant = String(formData.get("variant") ?? "").trim();
  const unit = String(formData.get("unit") ?? "").trim() || "piece";
  const category = String(formData.get("category") ?? "").trim();
  const buyingPrice = Number(formData.get("buyingPrice") ?? 0);
  const sellingPrice = Number(formData.get("sellingPrice") ?? 0);
  const stockQuantity = Number(formData.get("stockQuantity") ?? 0);
  const lowStockAlert = Number(formData.get("lowStockAlert") ?? 0);

  await prisma.product.update({
    where: {
      id,
    },
    data: {
      name,
      variant: variant || null,
      unit,
      category,
      buyingPrice,
      sellingPrice,
      stockQuantity,
      lowStockAlert,
    },
  });

  revalidatePath("/products");
}

export async function deleteProduct(formData: FormData) {
  const id = String(formData.get("id") ?? "");

  await prisma.product.delete({
    where: {
      id,
    },
  });

  revalidatePath("/products");
}

export async function restockProduct(formData: FormData) {
  const id = String(formData.get("id") ?? "");
  const quantity = Number(formData.get("quantity") ?? 0);

  if (!Number.isFinite(quantity) || quantity <= 0) {
    throw new Error("Restock quantity must be greater than 0.");
  }

  await prisma.product.update({
    where: {
      id,
    },
    data: {
      stockQuantity: {
        increment: quantity,
      },
    },
  });

  revalidatePath("/products");
  revalidatePath("/dashboard");
}
