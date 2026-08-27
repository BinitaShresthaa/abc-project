import { redirect } from "next/navigation";
import { getCurrentUser, getCurrentAlumni } from "./auth";
import { getAllowedFeatureKeys } from "./permissions";
import type { DashboardUser } from "./roles";
import type { Alumni } from "./mock-alumni";

export async function requirePermission(featureKey: string): Promise<DashboardUser> {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const allowed = await getAllowedFeatureKeys(user.role.id);
  if (!allowed.has(featureKey)) redirect("/dashboard");

  return user;
}

// Guards alumni-only pages, e.g. app/almuni/almuni-dashboard/page.tsx:
//   const alumni = await requireAlumni();
export async function requireAlumni(): Promise<Alumni> {
  const alumni = await getCurrentAlumni();
  if (!alumni) redirect("/almuni/almuni-login");
  return alumni;
}