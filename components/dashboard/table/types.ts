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
  variant?: "default" | "danger" | "primary";
}

// One entry in the toolbar's bulk-action button, shown only when rows are selected.
export interface BulkAction<T> {
  label: string;
  onSelect: (rows: T[]) => void;
  variant?: "default" | "primary";
}