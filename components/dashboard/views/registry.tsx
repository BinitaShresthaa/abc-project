import type { ComponentType } from "react";
import type { DashboardViewProps } from "@/lib/view-types";
import DashboardHomeView from "./DashboardHomeView";
import AlumniListView from "./AlumniListView";
import StudentListView from "./StudentListView";
import LeftStudentListView from "./LeftStudentListView";
import PassoutStudentListView from "./PassoutStudentListView";
import StudentAddView from "./StudentAddView";

// Add one line here per view. The key must match a `key` in lib/nav-config.ts.
export const viewRegistry: Record<string, ComponentType<Partial<DashboardViewProps>>> = {
  dashboard: DashboardHomeView,
  "alumni-list": AlumniListView,
  "student-list": StudentListView,
  "student-add": StudentAddView,
  "student-left": LeftStudentListView,
  "passout-student-list": PassoutStudentListView,
};