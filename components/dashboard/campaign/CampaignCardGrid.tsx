"use client";

import { useEffect, useMemo, useState } from "react";
import type { Campaign } from "@/lib/campaigns/types";
import CampaignAdminCard from "./CampaignAdminCard";

const PAGE_SIZE = 10;

export default function CampaignCardGrid({
  campaigns,
  variant = "list",
  emptyLabel = "No campaigns found.",
  highlightedCampaignIds,
  onEdit,
  onDelete,
  onHighlight,
}: {
  campaigns: Campaign[];
  variant?: "list" | "past";
  emptyLabel?: string;
  highlightedCampaignIds?: Set<string>;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  onHighlight?: (campaign: Campaign) => void;
}) {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [page, setPage] = useState(1);

  const statuses = useMemo(() => Array.from(new Set(campaigns.map((c) => c.status))), [campaigns]);

  const filtered = useMemo(() => {
    return campaigns.filter((c) => {
      if (statusFilter && c.status !== statusFilter) return false;
      if (search.trim()) {
        const q = search.trim().toLowerCase();
        if (!c.title.toLowerCase().includes(q) && !c.faculty.toLowerCase().includes(q)) return false;
      }
      return true;
    });
  }, [campaigns, search, statusFilter]);

  useEffect(() => { setPage(1); }, [search, statusFilter]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const pageStart = (currentPage - 1) * PAGE_SIZE;
  const paged = filtered.slice(pageStart, pageStart + PAGE_SIZE);

  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="flex flex-1 items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 dark:border-slate-700 dark:bg-slate-800">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="shrink-0 text-slate-400">
            <circle cx="11" cy="11" r="7" />
            <path d="m21 21-4.3-4.3" />
          </svg>
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search campaigns..." className="w-full bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400 dark:text-slate-200" />
        </div>
        {statuses.length > 1 && (
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-600 outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300">
            <option value="">All Statuses</option>
            {statuses.map((s) => (<option key={s} value={s}>{s}</option>))}
          </select>
        )}
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-10 text-center text-sm text-slate-400 dark:border-slate-700 dark:bg-slate-800/50">{emptyLabel}</div>
      ) : (
        <>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {paged.map((campaign) => (
              <CampaignAdminCard
                key={campaign.id}
                campaign={campaign}
                variant={variant}
                isHighlighted={highlightedCampaignIds?.has(campaign.id) ?? false}
                onEdit={onEdit}
                onDelete={onDelete}
                onHighlight={onHighlight}
              />
            ))}
          </div>

          <div className="flex flex-col gap-3 border-t border-slate-100 pt-4 text-xs text-slate-400 dark:border-slate-800 sm:flex-row sm:items-center sm:justify-between">
            <span>Showing {pageStart + 1}–{Math.min(pageStart + PAGE_SIZE, filtered.length)} of {filtered.length}</span>
            {totalPages > 1 && (
              <div className="flex items-center gap-1">
                <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={currentPage === 1} className="flex h-7 w-7 items-center justify-center rounded-md border border-slate-200 text-slate-500 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40 dark:border-slate-700 dark:text-slate-400 dark:hover:bg-slate-800" aria-label="Previous page">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m15 18-6-6 6-6" /></svg>
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1)
                  .filter((p) => p === 1 || p === totalPages || Math.abs(p - currentPage) <= 1)
                  .map((p, idx, arr) => (
                    <span key={p} className="flex items-center">
                      {idx > 0 && arr[idx - 1] !== p - 1 && <span className="px-1 text-slate-300">…</span>}
                      <button onClick={() => setPage(p)} className={`flex h-7 w-7 items-center justify-center rounded-md text-xs font-medium transition-colors ${p === currentPage ? "bg-primary text-white" : "text-slate-500 hover:bg-slate-50 dark:text-slate-400 dark:hover:bg-slate-800"}`}>{p}</button>
                    </span>
                  ))}
                <button onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages} className="flex h-7 w-7 items-center justify-center rounded-md border border-slate-200 text-slate-500 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40 dark:border-slate-700 dark:text-slate-400 dark:hover:bg-slate-800" aria-label="Next page">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m9 18 6-6-6-6" /></svg>
                </button>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}