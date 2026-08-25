import { redirect } from "next/navigation";
import { getCurrentUser } from "./auth";
import { getAllowedFeatureKeys } from "./permissions";
import type { DashboardUser } from "./roles";

export async function requirePermission(featureKey: string): Promise<DashboardUser> {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const allowed = await getAllowedFeatureKeys(user.role.id);
  if (!allowed.has(featureKey)) redirect("/dashboard");

  return user;
}