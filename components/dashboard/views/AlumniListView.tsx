import { mockAlumni } from "@/lib/mock-alumni";
import { alumniColumns, alumniFilters } from "@/components/dashboard/table/columns/alumni-columns";
import DataTable from "@/components/dashboard/table/DataTable";
import type { ComponentProps } from "react";

export default function AlumniListView() {
  return (
    <DataTable
      title="Alumni List"
      data={mockAlumni as unknown as Record<string, unknown>[]}
      columns={alumniColumns as unknown as ComponentProps<typeof DataTable>["columns"]}
      filters={alumniFilters as unknown as ComponentProps<typeof DataTable>["filters"]}
      rowIdKey="id"
    />
  );
}