"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifyAlumniCredentials, ALUMNI_SESSION_COOKIE } from "@/lib/auth";

export async function loginAction(
  email: string,
  password: string
): Promise<{ error: string } | void> {
  console.log("LOGIN DEBUG:", JSON.stringify({ email, password }));

  const alumni = await verifyAlumniCredentials(email, password);

  if (!alumni) {
    return { error: "Invalid email or password." };
  }
  // ...rest stays the same

  const cookieStore = await cookies();
  cookieStore.set(ALUMNI_SESSION_COOKIE, alumni.id, {
    httpOnly: true,
    path: "/",
    sameSite: "lax",
  });

  redirect("/almuni/almuni-dashboard");
}