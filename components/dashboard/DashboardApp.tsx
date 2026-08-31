"use client";

import { useMemo, useState } from "react";
import type { DashboardUser } from "@/lib/roles";
import type { NavItem } from "@/lib/nav-config";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import { viewRegistry } from "./views/registry";
import DashboardHomeView from "./views/DashboardHomeView";
import StudentEditView from "./views/StudentEditView";
import CampaignEditView from "./views/CampaignEditView";
import ContactEditView from "./views/ContactEditView";
import CampusAdminEditView from "./views/CampusAdminEditView";
import { DashboardUserProvider } from "@/lib/dashboard-user-context";
import { ToastProvider } from "@/lib/toast-context";

function flattenKeys(items: NavItem[]): Set<string> {
  const keys = new Set<string>();
  for (const item of items) {
    keys.add(item.key);
    item.children?.forEach((c) => keys.add(c.key));
  }
  return keys;
}

function findLabel(items: NavItem[], key: string): string {
  for (const item of items) {
    if (item.key === key) return item.label;
    const child = item.children?.find((c) => c.key === key);
    if (child) return child.label;
  }
  return "Dashboard";
}

type EditingState =
  | { type: "student"; id: string; returnKey: string }
  | { type: "campaign"; id: string; returnKey: string }
  | { type: "contact"; id: string; returnKey: string }
  | { type: "campusAdmin"; id: string; returnKey: string }
  | null;

export default function DashboardApp({ user, navItems }: { user: DashboardUser; navItems: NavItem[] }) {
  const [activeKey, setActiveKey] = useState("dashboard");
  const [editing, setEditing] = useState<EditingState>(null);
  const [pageByView, setPageByView] = useState<Record<string, number>>({});
  const allowedKeys = useMemo(() => flattenKeys(navItems), [navItems]);

  function navigate(key: string) {
    setEditing(null);
    setActiveKey(key);
  }

  function openEditStudent(studentId: string) {
    setEditing({ type: "student", id: studentId, returnKey: activeKey });
  }

  function openEditCampaign(campaignId: string) {
    setEditing({ type: "campaign", id: campaignId, returnKey: activeKey });
  }

  function openEditContact(contactId: string) {
    setEditing({ type: "contact", id: contactId, returnKey: activeKey });
  }

  function openEditCampusAdmin(id: string) {
    setEditing({ type: "campusAdmin", id, returnKey: activeKey });
  }

  // THIS is the function that must be passed as `onDone` to every edit view.
  function closeEditing() {
    if (editing) setActiveKey(editing.returnKey);
    setEditing(null);
  }

  const safeKey = allowedKeys.has(activeKey) ? activeKey : "dashboard";
  const ActiveView = viewRegistry[safeKey] ?? DashboardHomeView;

  const title = editing
    ? editing.type === "student"
      ? "Edit Student"
      : editing.type === "campaign"
      ? "Edit Campaign"
      : editing.type === "contact"
      ? "Edit Contact Person"
      : "Edit Campus Administrator"
    : findLabel(navItems, safeKey);

  return (
    <DashboardUserProvider user={user}>
      <ToastProvider>
        <div className="flex h-screen overflow-hidden bg-slate-50 dark:bg-slate-950">
          <Sidebar items={navItems} activeKey={safeKey} onSelect={navigate} />
          <div className="flex flex-1 flex-col overflow-hidden">
<Topbar title={title} user={user} onNavigate={navigate} />
            <main className="flex-1 overflow-y-auto p-6">
              {editing?.type === "student" ? (
                <StudentEditView studentId={editing.id} onDone={closeEditing} />
              ) : editing?.type === "campaign" ? (
  <CampaignEditView campaignId={editing.id} onDone={closeEditing} />
) : editing?.type === "contact" ? (
                <ContactEditView contactId={editing.id} onDone={closeEditing} />
              ) : editing?.type === "campusAdmin" ? (
                <CampusAdminEditView campusAdminId={editing.id} onDone={closeEditing} />
              ) : (
                <ActiveView
                  onNavigate={navigate}
                  onEditStudent={openEditStudent}
                  onEditCampaign={openEditCampaign}
                  onEditContact={openEditContact}
                  onEditCampusAdmin={openEditCampusAdmin}
                  page={pageByView[safeKey] ?? 1}
                  onPageChange={(p: number) => setPageByView((prev) => ({ ...prev, [safeKey]: p }))}
                />
              )}
            </main>
          </div>
        </div>
      </ToastProvider>
    </DashboardUserProvider>
  );
}