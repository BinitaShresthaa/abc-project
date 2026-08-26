"use client";

import { useState } from "react";
import { mockStudents, setStudentStatus } from "@/lib/mock-students";
import { studentColumns, studentFilters } from "@/components/dashboard/table/columns/student-columns";
import DataTable from "@/components/dashboard/table/DataTable";
import type { Student } from "@/lib/mock-students";
import type { RowAction, BulkAction } from "@/components/dashboard/table/types";
import type { DashboardViewProps } from "@/lib/view-types";

export default function StudentListView({ onEditStudent }: Partial<DashboardViewProps>) {
  const [, forceRefresh] = useState(0);
  const activeStudents = mockStudents.filter((s) => s.status === "active");
  type TableStudent = Student & Record<string, unknown>;

  function handleStatusChange(student: Student, status: "left" | "passout") {
    setStudentStatus(student.id, status);
    forceRefresh((n) => n + 1); // re-render since mockStudents mutated in place
  }

  const rowActions: RowAction<TableStudent>[] = [
    { label: "Edit", onSelect: (r) => onEditStudent?.(r.id) },
    { label: "Mark as Left", onSelect: (r) => handleStatusChange(r, "left") },
    { label: "Mark as Passout", onSelect: (r) => handleStatusChange(r, "passout") },
  ];

  const bulkActions: BulkAction<TableStudent>[] = [
    {
      label: "Mark as Passout",
      onSelect: (rows) => {
        rows.forEach((r) => setStudentStatus(r.id, "passout"));
        forceRefresh((n) => n + 1);
      },
    },
    {
      label: "Mark as Left",
      onSelect: (rows) => {
        rows.forEach((r) => setStudentStatus(r.id, "left"));
        forceRefresh((n) => n + 1);
      },
    },
  ];

  return (
    <DataTable<TableStudent>
      title="Student List"
      data={activeStudents as TableStudent[]}
      columns={studentColumns as any}
      filters={studentFilters}
      rowIdKey="id"
      rowActions={rowActions}
      bulkActions={bulkActions}
    />
  );
}