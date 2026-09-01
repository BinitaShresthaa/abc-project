import { mockAlumni } from "@/lib/mock-alumni";
import { alumniColumns, alumniFilters } from "@/components/dashboard/table/columns/alumni-columns";
import { sortByName } from "@/lib/sort-utils";
import DataTable from "@/components/dashboard/table/DataTable";
import type { Alumni } from "@/lib/mock-alumni";

export default function AlumniListView() {
  return (
    <DataTable<Alumni & Record<string, unknown>>
      title="Alumni List"
      data={sortByName(mockAlumni) as (Alumni & Record<string, unknown>)[]}
      columns={alumniColumns}
      filters={alumniFilters}
      rowIdKey="id"
    />
  );
}