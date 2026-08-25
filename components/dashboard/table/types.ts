import type { ReactNode } from "react";

export interface TableColumn<T> {
  key: string;
  header: string;                      // <-- swap "Alumni Name" to "Student Name" here, nowhere else
  render: (row: T) => ReactNode;       // what's shown in the cell (can be a photo, a pill, plain text...)
  exportValue?: (row: T) => string;    // plain-text value for CSV/print. Omit for columns like Photo — they're auto-skipped in export/print.
  searchable?: boolean;                // include this column when the search box filters rows
  searchValue?: (row: T) => string;    // text to match against; defaults to exportValue if omitted
}

export interface TableFilter<T> {
  key: string;
  label: string;
  getValue: (row: T) => string;
  options?: string[];
  isYearFilter?: boolean;   // renders as YearScrollSelect instead of a plain <select>
}
