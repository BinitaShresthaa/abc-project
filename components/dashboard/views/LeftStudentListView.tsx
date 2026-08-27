"use client";

import { mockStudents } from "@/lib/mock-students";
import { leftStudentColumns, leftStudentFilters } from "@/components/dashboard/table/columns/left-student-columns";
import DataTable from "@/components/dashboard/table/DataTable";
import type { Student } from "@/lib/mock-students";
import { useDashboardUser } from "@/lib/dashboard-user-context";
import { isContactPerson } from "@/lib/permissions-helpers";

export default function LeftStudentListView() {
  const user = useDashboardUser();
  const restricted = isContactPerson(user);

  const leftStudents = mockStudents.filter((s: Student) => {
    if (s.status !== "left") return false;
    if (restricted) return s.faculty === user.assignedFaculty;
    return true;
  });

  type TableStudent = Student & Record<string, unknown>;

  return (
    <DataTable<TableStudent>
      title={restricted ? `Left Students — ${user.assignedFaculty}` : "Left Students"}
      data={leftStudents as TableStudent[]}
      columns={leftStudentColumns as typeof leftStudentColumns & never}
      filters={leftStudentFilters}
      rowIdKey="id"
    />
  );
}