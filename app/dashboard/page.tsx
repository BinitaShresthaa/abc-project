import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { getVisibleNavItems } from "@/lib/nav-config";
import DashboardApp from "@/components/dashboard/DashboardApp";

export default async function DashboardPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const navItems = await getVisibleNavItems(user.role.id);

  return <DashboardApp user={user} navItems={navItems} />;
}