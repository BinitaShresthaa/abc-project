import { mockStudents } from "@/lib/mock-students";
import { leftStudentColumns, leftStudentFilters } from "@/components/dashboard/table/columns/left-student-columns";
import DataTable from "@/components/dashboard/table/DataTable";

export default function LeftStudentListView() {
  const leftStudents = mockStudents.filter((s) => s.status === "left");
  return (
    <DataTable
      title="Left Students"
      data={leftStudents as unknown as Record<string, unknown>[]}
      columns={leftStudentColumns as unknown as Parameters<typeof DataTable>[0]["columns"]}
      filters={leftStudentFilters as unknown as Parameters<typeof DataTable>[0]["filters"]}
      rowIdKey="id"
    />
  );
}