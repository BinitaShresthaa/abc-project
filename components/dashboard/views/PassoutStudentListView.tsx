"use client";

import { mockStudents } from "@/lib/mock-students";
import { passoutStudentColumns, passoutStudentFilters } from "@/components/dashboard/table/columns/passout-student-columns";
import DataTable from "@/components/dashboard/table/DataTable";
import type { Student } from "@/lib/mock-students";
import { useDashboardUser } from "@/lib/dashboard-user-context";
import { isContactPerson } from "@/lib/permissions-helpers";

export default function PassoutStudentListView() {
  const user = useDashboardUser();
  const restricted = isContactPerson(user);

  const passoutStudents = mockStudents.filter((s: Student) => {
    if (s.status !== "passout") return false;
    if (restricted) return s.faculty === user.assignedFaculty;
    return true;
  });

  return (
    <DataTable<Student & Record<string, unknown>>
      title={restricted ? `Passout Students — ${user.assignedFaculty}` : "Passout Students"}
      data={passoutStudents as Array<Student & Record<string, unknown>>}
      columns={passoutStudentColumns}
      filters={passoutStudentFilters}
      rowIdKey="id"
    />
  );
}