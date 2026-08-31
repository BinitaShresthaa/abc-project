import type { ReactNode } from "react";

export interface TableColumn<T> {
  key: string;
  header: string;
  render: (row: T) => ReactNode;
  exportValue?: (row: T) => string;
  searchable?: boolean;
  searchValue?: (row: T) => string;
}

export interface TableFilter<T> {
  key: string;
  label: string;
  getValue: (row: T) => string;
  options?: string[];
  isYearFilter?: boolean;
}

// One entry in a row's "···" menu.
export interface RowAction<T> {
  label: string;
  onSelect: (row: T) => void;
  variant?: "default" | "danger";
}

// One entry in the toolbar's bulk-action button, shown only when rows are selected.
export interface BulkAction<T> {
  label: string;
  onSelect: (rows: T[]) => void;
  variant?: "default" | "primary";
}

// --- Detail panel (the "Student Profile"-style card shown when a row is selected) ---
// Same idea as TableColumn<T>: a config object of getters, so one <DetailCard />
// component works for any row shape (Student, Alumni, Campus Admin, Contact, ...).

export type DetailSectionIcon = "mail" | "phone" | "location" | "academic" | "note" | "id";

export interface DetailField {
  label: string;
  value: string;
  fullWidth?: boolean; // spans both grid columns — use for longer values (addresses, notes)
}

export interface DetailBadge {
  label: string;
  tone?: "primary" | "neutral"; // primary = brand-tinted pill (e.g. faculty); neutral = plain gray pill (e.g. status)
}

export interface DetailSection {
  icon: DetailSectionIcon;
  heading: string; // e.g. "Contact Information", "Academic Status"
  fields: DetailField[];
  actionLabel?: string; // optional link/button in the section's top-right, e.g. "Add Note"
  onAction?: () => void;
}

export interface DetailCardConfig<T> {
  getPhoto?: (row: T) => string | undefined;
  getName: (row: T) => string;
  idLabel?: string; // e.g. "Student ID"
  getId?: (row: T) => string;
  getBadges?: (row: T) => DetailBadge[];
  getSections?: (row: T) => DetailSection[]; // each renders as its own bordered box
}