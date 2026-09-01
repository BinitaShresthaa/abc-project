"use client";

import { mockContacts } from "@/lib/mock-contacts";
import { contactColumns, contactFilters } from "@/components/dashboard/table/columns/contact-columns";
import { sortByName } from "@/lib/sort-utils";
import DataTable from "@/components/dashboard/table/DataTable";
import type { ContactPerson } from "@/lib/mock-contacts";
import type { RowAction } from "@/components/dashboard/table/types";
import type { DashboardViewProps } from "@/lib/view-types";

type ContactTableRow = ContactPerson & Record<string, unknown>;

export default function ContactListView({ onEditContact }: Partial<DashboardViewProps>) {
  const rowActions: RowAction<ContactTableRow>[] = [
    { label: "Edit", onSelect: (r) => onEditContact?.(r.id) },
  ];

  return (
    <DataTable<ContactTableRow>
      title="Contact List"
      data={sortByName(mockContacts) as ContactTableRow[]}
      columns={contactColumns}
      filters={contactFilters}
      rowIdKey="id"
      rowActions={rowActions}
    />
  );
}