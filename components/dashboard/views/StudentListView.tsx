"use client";

import { useState } from "react";
import { mockStudents, setStudentStatus } from "@/lib/mock-students";
import { studentColumns, studentFilters } from "@/components/dashboard/table/columns/student-columns";
import DataTable from "@/components/dashboard/table/DataTable";
import type { Student } from "@/lib/mock-students";
import type { RowAction, BulkAction } from "@/components/dashboard/table/types";
import type { DashboardViewProps } from "@/lib/view-types";
import { useDashboardUser } from "@/lib/dashboard-user-context";
import { isContactPerson } from "@/lib/permissions-helpers";
import { sortByName } from "@/lib/sort-utils";


export default function StudentListView({ onEditStudent, page, onPageChange }: Partial<DashboardViewProps>) {
  const [, forceRefresh] = useState(0);
  const user = useDashboardUser();
  const restricted = isContactPerson(user);

  const activeStudents = mockStudents.filter((s) => {
    if (s.status !== "active") return false;
    if (restricted) return s.faculty === user.assignedFaculty;
    return true;
  });

  function handleStatusChange(student: Student, status: "left" | "passout") {
    setStudentStatus(student.id, status);
    forceRefresh((n) => n + 1);
  }

   const rowActions: RowAction<Student>[] = restricted
    ? []
    : [
    { label: "Edit", onSelect: (r) => onEditStudent?.(r.id), variant: "default" },
        { label: "Mark as Left", onSelect: (r) => handleStatusChange(r, "left") },
        { label: "Mark as Passout", onSelect: (r) => handleStatusChange(r, "passout") },
      ];

  const bulkActions: BulkAction<Student>[] = restricted
    ? []
    : [
        {
          label: "Mark as Passout",
          onSelect: (rows) => { rows.forEach((r) => setStudentStatus(r.id, "passout")); forceRefresh((n) => n + 1); },
        },
        {
          label: "Mark as Left",
          onSelect: (rows) => { rows.forEach((r) => setStudentStatus(r.id, "left")); forceRefresh((n) => n + 1); },
        },
      ];

  return (
    <DataTable<Student & Record<string, unknown>>
      title={restricted ? `Student List — ${user.assignedFaculty}` : "Student List"}
      data={sortByName(activeStudents).map((student) => ({ ...student }))}
  columns={studentColumns}
      filters={studentFilters}
      rowIdKey="id"
      rowActions={rowActions}
      bulkActions={bulkActions}
      page={page}
      onPageChange={onPageChange}
    />
  );
}