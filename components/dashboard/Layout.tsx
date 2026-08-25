import type { ReactNode } from "react";
import { redirect } from "next/navigation";
import DashboardShell from "@/components/dashboard/DashboardShell";
import { getCurrentUser } from "@/lib/auth";
import { getVisibleNavItems } from "@/lib/nav-config";

export default async function DashboardLayout({ children }: { children: ReactNode }) {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const navItems = await getVisibleNavItems(user.role.id);

  return (
    <DashboardShell user={user} navItems={navItems} title="Dashboard Overview">
      {children}
    </DashboardShell>
  );
}