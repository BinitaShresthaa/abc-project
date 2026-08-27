"use client";

import { Plus } from "lucide-react";
import type { CampaignHighlight } from "@/lib/campaigns/types";

export function HighlightBubble({ highlight, onClick }: { highlight: CampaignHighlight; onClick: () => void }) {
  const cover = highlight.photos[0];
  return (
    <button type="button" onClick={onClick} className="flex w-20 shrink-0 flex-col items-center gap-1.5">
      <div className="h-16 w-16 overflow-hidden rounded-full border-2 border-primary/60 p-0.5">
        <div className="h-full w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
          {cover ? <img src={cover} alt={highlight.name} className="h-full w-full object-cover" /> : <div className="flex h-full w-full items-center justify-center text-slate-400">—</div>}
        </div>
      </div>
      <span className="w-full truncate text-center text-xs text-slate-600 dark:text-slate-300">{highlight.name}</span>
    </button>
  );
}

export function AddHighlightBubble({ onClick }: { onClick: () => void }) {
  return (
    <button type="button" onClick={onClick} className="flex w-20 shrink-0 flex-col items-center gap-1.5">
      <div className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-dashed border-slate-300 text-slate-400 hover:border-primary hover:text-primary dark:border-slate-700">
        <Plus size={22} />
      </div>
      <span className="text-xs text-slate-500 dark:text-slate-400">Add</span>
    </button>
  );
}