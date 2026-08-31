import type { ComponentType } from "react";
import type { DashboardViewProps } from "@/lib/view-types";
import DashboardHomeView from "./DashboardHomeView";
import AlumniListView from "./AlumniListView";
import StudentListView from "./StudentListView";
import LeftStudentListView from "./LeftStudentListView";
import PassoutStudentListView from "./PassoutStudentListView";
import StudentAddView from "./StudentAddView";
import CampaignListView from "./CampaignListView";
import CampaignAddView from "./CampaignAddView";
import CampaignHighlightView from "./CampaignHighlightView";
import CampaignPastView from "./CampaignPastView";
import ContactListView from "./ContactListView";
import ContactAddView from "./ContactAddView";
import CampusAdminListView from "./CampusAdminListView";
// registry.tsx imports it as a default export:
import CampusAdminAddView from "./CampusAdminAddView";
import NotificationListView from "./NotificationListView";

// Add one line here per view. The key must match a `key` in lib/nav-config.ts.
export const viewRegistry: Record<string, ComponentType<Partial<DashboardViewProps>>> = {
  dashboard: DashboardHomeView,
  "alumni-list": AlumniListView,
  "student-list": StudentListView,
  "student-add": StudentAddView,
  "student-left": LeftStudentListView,
  "passout-student-list": PassoutStudentListView,
  "campaign-list": CampaignListView,
"campaign-add": CampaignAddView,
"campaign-highlight": CampaignHighlightView,
"campaign-past": CampaignPastView,
 "contact-list": ContactListView,
  "contact-add": ContactAddView,
  "campus-admin-list": CampusAdminListView,
  "campus-admin-add": CampusAdminAddView,
    "notification": NotificationListView,

};