"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function login(formData: FormData) {
  const password = String(formData.get("password") ?? "");
  const appPassword = process.env.APP_PASSWORD;

  if (appPassword && password === appPassword) {
    const cookieStore = await cookies();

    cookieStore.set("wholesale_hub_session", "authenticated", {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
    });

    redirect("/dashboard");
  }

  redirect("/login?error=1");
}
