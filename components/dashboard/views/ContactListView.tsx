"use client";

import { mockContacts } from "@/lib/mock-contacts";
import { contactColumns, contactFilters } from "@/components/dashboard/table/columns/contact-columns";
import DataTable from "@/components/dashboard/table/DataTable";
import type { ContactPerson } from "@/lib/mock-contacts";
import type { RowAction } from "@/components/dashboard/table/types";
import type { DashboardViewProps } from "@/lib/view-types";

export default function ContactListView({ onEditContact }: Partial<DashboardViewProps>) {
  type ContactRow = ContactPerson & Record<string, unknown>;

  const rowActions: RowAction<ContactRow>[] = [
    { label: "Edit", onSelect: (r) => onEditContact?.(r.id) },
  ];

  return (
    <DataTable<ContactRow>
      title="Contact List"
      data={mockContacts as ContactRow[]}
      columns={contactColumns as any}
      filters={contactFilters}
      rowIdKey="id"
      rowActions={rowActions}
    />
  );
}