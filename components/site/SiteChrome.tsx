"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";

const APP_SHELL_EXCLUSIONS = [
  "/login",
  "/dashboard",
  "/dashboard/",
  "/almuni/",
];

export default function SiteChrome({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isDashboardOrAuth = APP_SHELL_EXCLUSIONS.some((prefix) =>
    prefix.endsWith("/") ? pathname.startsWith(prefix) : pathname === prefix
  );

  if (isDashboardOrAuth) return <>{children}</>;

  return (
    <div className="aadikavi-shell min-h-full w-full">
      <Header activeHref={pathname === "/" ? "/" : pathname} />
      {children}
      <Footer />
    </div>
  );
}
