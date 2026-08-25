import type { ComponentType } from "react";
import DashboardHomeView from "./DashboardHomeView";
import AlumniListView from "./AlumniListView";

// Add one line here per view. The key must match a `key` in lib/nav-config.ts.
export const viewRegistry: Record<string, ComponentType> = {
  dashboard: DashboardHomeView,
  "alumni-list": AlumniListView,
};