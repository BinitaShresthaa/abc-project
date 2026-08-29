"use client";

import { Pencil, Trash2, Sparkles, Images } from "lucide-react";
import type { Campaign } from "@/lib/campaigns/types";

export default function CampaignAdminCard({
  campaign,
  variant = "list",
  isHighlighted = false,
  onEdit,
  onDelete,
  onHighlight,
  onManagePhotos,
}: {
  campaign: Campaign;
  variant?: "list" | "past";
  isHighlighted?: boolean;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  onHighlight?: (campaign: Campaign) => void;
  onManagePhotos?: (campaign: Campaign) => void;
}) {
  function handleDelete() {
    if (!confirm(`Delete "${campaign.title}"? This cannot be undone.`)) return;
    onDelete?.(campaign.id);
  }

  return (
    <div className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-shadow hover:shadow-md dark:border-slate-800 dark:bg-slate-900">
      <div className="relative h-40 w-full overflow-hidden">
        <img src={campaign.image} alt={campaign.title} className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
        <span className={`absolute left-3 top-3 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-white ${campaign.status === "ACTIVE" ? "bg-primary" : campaign.status === "UPCOMING" ? "bg-slate-700" : "bg-slate-500"}`}>
          {campaign.status}
        </span>
        {isHighlighted && (
          <span className="absolute right-3 top-3 flex h-7 w-7 items-center justify-center rounded-full bg-amber-400 text-white shadow">
            <Sparkles size={14} />
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-4">
        <span className="w-fit rounded-md bg-primary/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-primary">{campaign.faculty}</span>
        <h3 className="mt-2 line-clamp-1 text-sm font-bold text-slate-800 dark:text-slate-100">{campaign.title}</h3>
        <p className="mt-1 line-clamp-2 text-xs text-slate-500 dark:text-slate-400">{campaign.description}</p>

        <div className="mt-4 flex items-center gap-2 pt-1">
          {variant !== "past" && (
            <button type="button" onClick={() => onEdit?.(campaign.id)} className="flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800">
              <Pencil size={13} /> Edit
            </button>
          )}
          <button
            type="button"
            onClick={() => onHighlight?.(campaign)}
            className={`flex flex-1 items-center justify-center gap-1.5 rounded-lg px-3 py-2 text-xs font-semibold transition-colors ${isHighlighted ? "bg-amber-400 text-white hover:bg-amber-500" : "border border-slate-200 text-slate-600 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"}`}
          >
            <Sparkles size={13} /> {isHighlighted ? "Highlighted" : "Highlight"}
          </button>
          {isHighlighted && onManagePhotos && (
            <button type="button" onClick={() => onManagePhotos(campaign)} aria-label="Manage highlight photos" className="flex items-center justify-center rounded-lg border border-slate-200 px-3 py-2 text-slate-500 hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-800">
              <Images size={14} />
            </button>
          )}
          {variant === "list" && (
            <button type="button" onClick={handleDelete} aria-label="Delete campaign" className="flex items-center justify-center rounded-lg border border-red-100 px-3 py-2 text-red-500 hover:bg-red-50 dark:border-red-900/40 dark:hover:bg-red-950/30">
              <Trash2 size={14} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}