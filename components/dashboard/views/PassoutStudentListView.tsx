import { mockStudents } from "@/lib/mock-students";
import { passoutStudentColumns, passoutStudentFilters } from "@/components/dashboard/table/columns/passout-student-columns";
import DataTable from "@/components/dashboard/table/DataTable";

export default function PassoutStudentListView() {
  const passoutStudents = mockStudents.filter((s) => s.status === "passout");
  return (
    <DataTable
      title="Passout Students"
      data={passoutStudents as unknown as Record<string, unknown>[]}
      columns={passoutStudentColumns as unknown as Parameters<typeof DataTable>[0]["columns"]}
      filters={passoutStudentFilters as unknown as Parameters<typeof DataTable>[0]["filters"]}
      rowIdKey="id"
    />
  );
}