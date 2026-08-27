"use client";

import { createContext, useContext, type ReactNode } from "react";
import type { DashboardUser } from "./roles";

const DashboardUserContext = createContext<DashboardUser | null>(null);

export function DashboardUserProvider({ user, children }: { user: DashboardUser; children: ReactNode }) {
  return <DashboardUserContext.Provider value={user}>{children}</DashboardUserContext.Provider>;
}

export function useDashboardUser(): DashboardUser {
  const ctx = useContext(DashboardUserContext);
  if (!ctx) throw new Error("useDashboardUser must be used inside DashboardUserProvider");
  return ctx;
}