"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifyDashboardCredentials, DASHBOARD_SESSION_COOKIE } from "@/lib/auth";

export async function loginAction(
  email: string,
  password: string
): Promise<{ error: string } | void> {
  const user = await verifyDashboardCredentials(email, password);

  if (!user) {
    return { error: "Invalid email or password." };
  }

  const cookieStore = await cookies();
  cookieStore.set(DASHBOARD_SESSION_COOKIE, user.id, {
    httpOnly: true,
    path: "/",
    sameSite: "lax",
    // No maxAge -> cleared when the browser closes. Add e.g.
    // maxAge: 60 * 60 * 24 * 7 for a 7-day "remember me" style session.
  });

  redirect("/dashboard");
}