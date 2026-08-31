"use client";

import { mockCampusAdmins } from "@/lib/mock-campus-admins";
import { campusAdminColumns } from "@/components/dashboard/table/columns/campus-admin-columns";
import DataTable from "@/components/dashboard/table/DataTable";
import type { CampusAdmin } from "@/lib/mock-campus-admins";
import type { RowAction } from "@/components/dashboard/table/types";
import type { DashboardViewProps } from "@/lib/view-types";

export default function CampusAdminListView({ onEditCampusAdmin }: Partial<DashboardViewProps>) {
  const rowActions: RowAction<CampusAdmin>[] = [
    { label: "Edit", onSelect: (r) => onEditCampusAdmin?.(r.id), variant: "default" },
  ];

  return (
    <DataTable<CampusAdmin>
      title="Campus Administrator List"
      data={mockCampusAdmins}
      columns={campusAdminColumns}
      rowIdKey="id"
      rowActions={rowActions}
    />
  );
}