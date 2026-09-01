"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { TableColumn, TableFilter, RowAction, BulkAction } from "./types";
import RowMenu from "./RowMenu";
import YearScrollSelect from "./YearScrollSelect";
import { downloadCsv, downloadExcel, downloadPdf, downloadWord, printRows } from "./export-utils";

type ExportFormat = "csv" | "excel" | "pdf" | "word";
const PAGE_SIZE = 10;

export default function DataTable<T extends object>({
  title,
  data,
  columns,
  filters = [],
  rowIdKey,
  rowActions,
  bulkActions,
  onRowClick,
  activeRowId,
  showSelectionBadge = false,
}: {
  title: string;
  data: T[];
  columns: TableColumn<T>[];
  filters?: TableFilter<T>[];
  rowIdKey: keyof T;
  rowActions?: RowAction<T>[];
  bulkActions?: BulkAction<T>[];
  onRowClick?: (row: T) => void;
  activeRowId?: string | null;
  showSelectionBadge?: boolean;
}) {
  const getRowId = (row: T) => String(row[rowIdKey]);

  const [search, setSearch] = useState("");
  const [filterValues, setFilterValues] = useState<Record<string, string>>({});
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [exportMenuOpen, setExportMenuOpen] = useState(false);
  const [printMenuOpen, setPrintMenuOpen] = useState(false);
  const [exportFormat, setExportFormat] = useState<ExportFormat>("csv");
  const [internalPage, setInternalPage] = useState(1);

  // Controlled if the parent supplies both `page` and `onPageChange`;
  // otherwise falls back to the table's own internal state.
  const page = controlledPage ?? internalPage;
  const setPage = onPageChange ?? setInternalPage;

  const filterOptions = useMemo(() => {
    const map: Record<string, string[]> = {};
    for (const f of filters) {
      map[f.key] = f.options ?? Array.from(new Set(data.map(f.getValue))).sort();
    }
    return map;
  }, [filters, data]);

  const searchableColumns = columns.filter((c) => c.searchable);

  const filteredData = useMemo(() => {
    return data.filter((row) => {
      for (const f of filters) {
        const active = filterValues[f.key];
        if (active && f.getValue(row) !== active) return false;
      }
      if (search.trim()) {
        const q = search.trim().toLowerCase();
        const hit = searchableColumns.some((c) =>
          (c.searchValue?.(row) ?? c.exportValue?.(row) ?? "").toLowerCase().includes(q)
        );
        if (!hit) return false;
      }
      return true;
    });
  }, [data, filters, filterValues, search, searchableColumns]);

  useEffect(() => {
    setPage(1);
  }, [search, filterValues]);

  const totalPages = Math.max(1, Math.ceil(filteredData.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const pageStart = (currentPage - 1) * PAGE_SIZE;
  const pagedData = filteredData.slice(pageStart, pageStart + PAGE_SIZE);

  const filteredIds = useMemo(() => filteredData.map(getRowId), [filteredData]);
  const allFilteredSelected = filteredIds.length > 0 && filteredIds.every((id) => selected.has(id));
  const someFilteredSelected = filteredIds.some((id) => selected.has(id)) && !allFilteredSelected;
  const selectedCount = filteredData.filter((r) => selected.has(getRowId(r))).length;

  const headerCheckboxRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (headerCheckboxRef.current) headerCheckboxRef.current.indeterminate = someFilteredSelected;
  }, [someFilteredSelected]);

  function toggleAll() {
    setSelected((prev) => {
      const next = new Set(prev);
      if (allFilteredSelected) filteredIds.forEach((id) => next.delete(id));
      else filteredIds.forEach((id) => next.add(id));
      return next;
    });
  }

  function toggleRow(id: string) {
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }

  const exportableColumns = columns.filter((c) => c.exportValue);

  function getExportSet(mode: "all" | "selected") {
    return mode === "selected" ? filteredData.filter((r) => selected.has(getRowId(r))) : filteredData;
  }

  async function handleExport(mode: "all" | "selected") {
    const rows = getExportSet(mode);
    const headers = exportableColumns.map((c) => c.header);
    const body = rows.map((r) => exportableColumns.map((c) => c.exportValue!(r)));
    const filename = `${title.toLowerCase().replace(/\s+/g, "-")}-${mode}`;

    if (exportFormat === "csv") downloadCsv(filename, headers, body);
    else if (exportFormat === "excel") await downloadExcel(filename, headers, body);
    else if (exportFormat === "pdf") await downloadPdf(title, headers, body);
    else if (exportFormat === "word") await downloadWord(title, headers, body);

    setExportMenuOpen(false);
  }

  function handlePrint(mode: "all" | "selected") {
    const rows = getExportSet(mode);
    const headers = exportableColumns.map((c) => c.header);
    const body = rows.map((r) => exportableColumns.map((c) => c.exportValue!(r)));
    printRows(title, headers, body);
    setPrintMenuOpen(false);
  }

  return (
    <div className="rounded-2xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
      {/* toolbar */}
      <div className="flex flex-col gap-3 border-b border-slate-100 p-4 dark:border-slate-800 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-1 flex-wrap items-center gap-2">
          <div className="flex min-w-[200px] flex-1 items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 dark:border-slate-700 dark:bg-slate-800">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="shrink-0 text-slate-400">
              <circle cx="11" cy="11" r="7" />
              <path d="m21 21-4.3-4.3" />
            </svg>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search..."
              className="w-full bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400 dark:text-slate-200"
            />
          </div>

          {showSelectionBadge && selectedCount > 0 && (
            <div className="flex items-center gap-2 rounded-lg border border-primary/30 bg-primary/10 px-3 py-2 text-sm font-semibold text-primary">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 11l3 3L22 4" />
                <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
              </svg>
              {selectedCount} selected
            </div>
          )}

          {filters.map((f) =>
            f.isYearFilter ? (
              <div key={f.key} className="w-48">
                <YearScrollSelect
                  value={filterValues[f.key] ?? ""}
                  onChange={(year) => setFilterValues((prev) => ({ ...prev, [f.key]: year }))}
                  placeholder={`All ${f.label}`}
                />
              </div>
            ) : (
              <select
                key={f.key}
                value={filterValues[f.key] ?? ""}
                onChange={(e) => setFilterValues((prev) => ({ ...prev, [f.key]: e.target.value }))}
                className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-600 outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300"
              >
                <option value="">All {f.label}</option>
                {filterOptions[f.key]?.map((opt) => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            )
          )}
        </div>

        <div className="flex items-center gap-2">
          {bulkActions && bulkActions.length > 0 && selectedCount > 0 && (
            <BulkActionsMenu
              actions={bulkActions}
              selectedRows={filteredData.filter((r) => selected.has(getRowId(r)))}
            />
          )}

          <div className="relative">
            <button
              onClick={() => { setExportMenuOpen((v) => !v); setPrintMenuOpen(false); }}
              className="flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" />
              </svg>
              Export
            </button>
            {exportMenuOpen && (
              <div className="absolute right-0 top-full z-10 mt-2 w-56 rounded-lg border border-slate-200 bg-white p-3 shadow-lg dark:border-slate-700 dark:bg-slate-800">
                <div className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-400">Format</div>
                <div className="mb-3 grid grid-cols-4 gap-1.5">
                  {([
                    { value: "csv", label: "CSV" },
                    { value: "excel", label: "Excel" },
                    { value: "pdf", label: "PDF" },
                    { value: "word", label: "Word" },
                  ] as { value: ExportFormat; label: string }[]).map((f) => (
                    <button
                      key={f.value}
                      onClick={() => setExportFormat(f.value)}
                      className={`rounded-md py-1.5 text-xs font-semibold transition-colors ${
                        exportFormat === f.value
                          ? "bg-primary text-white"
                          : "bg-slate-100 text-slate-500 hover:bg-slate-200 dark:bg-slate-700 dark:text-slate-300"
                      }`}
                    >
                      {f.label}
                    </button>
                  ))}
                </div>

                <div className="border-t border-slate-100 pt-2 dark:border-slate-700">
                  <button
                    onClick={() => handleExport("all")}
                    className="block w-full rounded-md px-2 py-2 text-left text-sm text-slate-600 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-700"
                  >
                    All ({filteredData.length})
                  </button>
                  <button
                    onClick={() => handleExport("selected")}
                    disabled={selectedCount === 0}
                    className="block w-full rounded-md px-2 py-2 text-left text-sm text-slate-600 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40 dark:text-slate-300 dark:hover:bg-slate-700"
                  >
                    Selected ({selectedCount})
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="relative">
            <button
              onClick={() => { setPrintMenuOpen((v) => !v); setExportMenuOpen(false); }}
              className="flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M6 9V2h12v7M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2M6 14h12v8H6z" />
              </svg>
              Print
            </button>
            {printMenuOpen && (
              <div className="absolute right-0 top-full z-10 mt-2 w-44 rounded-lg border border-slate-200 bg-white py-1 shadow-lg dark:border-slate-700 dark:bg-slate-800">
                <button onClick={() => handlePrint("all")} className="block w-full px-4 py-2 text-left text-sm text-slate-600 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-700">
                  All ({filteredData.length})
                </button>
                <button
                  onClick={() => handlePrint("selected")}
                  disabled={selectedCount === 0}
                  className="block w-full px-4 py-2 text-left text-sm text-slate-600 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40 dark:text-slate-300 dark:hover:bg-slate-700"
                >
                  Selected ({selectedCount})
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="styled-scrollbar overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-100 dark:border-slate-800">
              <th className="w-10 p-4">
                <input
                  ref={headerCheckboxRef}
                  type="checkbox"
                  checked={allFilteredSelected}
                  onChange={toggleAll}
                  className="h-4 w-4 rounded border-slate-300 accent-primary"
                />
              </th>
              {columns.map((col) => (
                <th key={col.key} className="whitespace-nowrap p-4 text-left font-semibold text-slate-500 dark:text-slate-400">
                  {col.header}
                </th>
              ))}
              {rowActions && rowActions.length > 0 && <th className="w-10 p-4" />}
            </tr>
          </thead>
          <tbody>
            {pagedData.map((row) => {
              const id = getRowId(row);
              const isSelected = selected.has(id);
              const isActive = activeRowId != null && activeRowId === id;
              return (
                <tr
                  key={id}
                  onClick={() => onRowClick?.(row)}
                  className={`border-b border-slate-50 last:border-0 dark:border-slate-800/60 ${
                    onRowClick ? "cursor-pointer" : ""
                  } ${
                    isActive || isSelected ? "bg-primary/5" : "hover:bg-slate-50 dark:hover:bg-slate-800/40"
                  }`}
                >
                  <td className="p-4" onClick={(e) => e.stopPropagation()}>
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => toggleRow(id)}
                      className="h-4 w-4 rounded border-slate-300 accent-primary"
                    />
                  </td>
                  {columns.map((col) => (
                    <td key={col.key} className="whitespace-nowrap p-4 text-slate-600 dark:text-slate-300">
                      {col.render(row)}
                    </td>
                  ))}
                  {rowActions && rowActions.length > 0 && (
                    <td className="p-4 text-right" onClick={(e) => e.stopPropagation()}>
                      <RowMenu row={row} actions={rowActions} />
                    </td>
                  )}
                </tr>
              );
            })}
            {filteredData.length === 0 && (
              <tr>
                <td colSpan={columns.length + 2} className="p-10 text-center text-sm text-slate-400">
                  No results match your search or filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="flex flex-col gap-3 border-t border-slate-100 p-4 text-xs text-slate-400 dark:border-slate-800 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <span>
            Showing {filteredData.length === 0 ? 0 : pageStart + 1}–{Math.min(pageStart + PAGE_SIZE, filteredData.length)} of {filteredData.length}
          </span>
          {selectedCount > 0 && <span>{selectedCount} selected</span>}
        </div>

        {totalPages > 1 && (
          <div className="flex items-center gap-1">
            {/* NOTE: these pass an explicit target page number rather than a
                functional updater — `setPage` can be `onPageChange`, which only
                accepts a plain number, not a `(prev) => next` callback. */}
            <button
              onClick={() => setPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="flex h-7 w-7 items-center justify-center rounded-md border border-slate-200 text-slate-500 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40 dark:border-slate-700 dark:text-slate-400 dark:hover:bg-slate-800"
              aria-label="Previous page"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m15 18-6-6 6-6" /></svg>
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1)
              .filter((p) => p === 1 || p === totalPages || Math.abs(p - currentPage) <= 1)
              .map((p, idx, arr) => (
                <span key={p} className="flex items-center">
                  {idx > 0 && arr[idx - 1] !== p - 1 && <span className="px-1 text-slate-300">…</span>}
                  <button
                    onClick={() => setPage(p)}
                    className={`flex h-7 w-7 items-center justify-center rounded-md text-xs font-medium transition-colors ${
                      p === currentPage
                        ? "bg-primary text-white"
                        : "text-slate-500 hover:bg-slate-50 dark:text-slate-400 dark:hover:bg-slate-800"
                    }`}
                  >
                    {p}
                  </button>
                </span>
              ))}

            <button
              onClick={() => setPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="flex h-7 w-7 items-center justify-center rounded-md border border-slate-200 text-slate-500 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40 dark:border-slate-700 dark:text-slate-400 dark:hover:bg-slate-800"
              aria-label="Next page"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m9 18 6-6-6-6" /></svg>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function BulkActionsMenu<T>({ actions, selectedRows }: { actions: BulkAction<T>[]; selectedRows: T[] }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2 rounded-lg bg-primary px-3 py-2 text-sm font-medium text-white hover:bg-primary/90"
      >
        Actions ({selectedRows.length})
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m6 9 6 6 6-6" /></svg>
      </button>
      {open && (
        <div className="absolute right-0 top-full z-20 mt-1 w-48 rounded-lg border border-slate-200 bg-white py-1 shadow-lg dark:border-slate-700 dark:bg-slate-800">
          {actions.map((a) => (
            <button
              key={a.label}
              onClick={() => { a.onSelect(selectedRows); setOpen(false); }}
              className="block w-full px-4 py-2 text-left text-sm text-slate-600 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-700"
            >
              {a.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}