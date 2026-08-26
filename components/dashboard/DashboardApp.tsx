"use client";

import { useMemo, useState } from "react";
import type { DashboardUser } from "@/lib/roles";
import type { NavItem } from "@/lib/nav-config";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import { viewRegistry } from "./views/registry";
import DashboardHomeView from "./views/DashboardHomeView";
import StudentEditView from "./views/StudentEditView";

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

export default function DashboardApp({
  user,
  navItems,
}: {
  user: DashboardUser;
  navItems: NavItem[];
}) {
  const [activeKey, setActiveKey] = useState("dashboard");
  const allowedKeys = useMemo(() => flattenKeys(navItems), [navItems]);

  const safeKey = allowedKeys.has(activeKey) ? activeKey : "dashboard";
  const ActiveView = viewRegistry[safeKey] ?? DashboardHomeView;
  const title = findLabel(navItems, safeKey);

  const EDIT_STUDENT_KEY = "student-edit";
  const [editingStudentId, setEditingStudentId] = useState<string | null>(null);

  function openEditStudent(studentId: string) {
    setEditingStudentId(studentId);
    setActiveKey(EDIT_STUDENT_KEY);
  }

  const isEditingStudent = activeKey === EDIT_STUDENT_KEY && editingStudentId;

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50 dark:bg-slate-950">
      <Sidebar items={navItems} activeKey={safeKey} onSelect={setActiveKey} />
      <div className="flex flex-1 flex-col overflow-hidden">
        <Topbar title={isEditingStudent ? "Edit Student" : title} user={user} />
        <main className="flex-1 overflow-y-auto p-6">
          {isEditingStudent ? (
            <StudentEditView studentId={editingStudentId} />
          ) : (
            <ActiveView onNavigate={setActiveKey} onEditStudent={openEditStudent} />
          )}
        </main>
      </div>
    </div>
  );
}