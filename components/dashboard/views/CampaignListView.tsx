"use client";

import { useEffect, useState } from "react";
import CampaignCardGrid from "@/components/dashboard/campaign/CampaignCardGrid";
import HighlightEditorModal from "@/components/dashboard/campaign/HighlightEditorModal";
import type { Campaign, CampaignHighlight } from "@/lib/campaigns/types";
import type { DashboardViewProps } from "@/lib/view-types";

export default function CampaignListView({ onNavigate, onEditCampaign }: Partial<DashboardViewProps>) {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [highlights, setHighlights] = useState<CampaignHighlight[]>([]);
  const [loading, setLoading] = useState(true);
  const [highlighting, setHighlighting] = useState<Campaign | null>(null);

  async function load() {
    setLoading(true);
    const [campaignsRes, highlightsRes] = await Promise.all([fetch("/api/campaigns"), fetch("/api/highlights")]);
    const all: Campaign[] = await campaignsRes.json();
    setCampaigns(all.filter((c) => c.status !== "COMPLETED"));
    setHighlights(await highlightsRes.json());
    setLoading(false);
  }

  useEffect(() => { load(); }, []);

  async function handleDelete(id: string) {
    await fetch(`/api/campaigns/${id}`, { method: "DELETE" });
    load();
  }

  const highlightedIds = new Set(highlights.map((h) => h.campaignId));

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-bold text-slate-800 dark:text-slate-100">Campaigns</h1>
        <button type="button" onClick={() => onNavigate?.("campaign-add")} className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white hover:bg-primary/90">+ Add Campaign</button>
      </div>
      {loading ? (
        <p className="text-sm text-slate-400">Loading...</p>
      ) : (
        <CampaignCardGrid campaigns={campaigns} variant="list" emptyLabel="No campaigns yet — add your first one." highlightedCampaignIds={highlightedIds} onEdit={onEditCampaign} onDelete={handleDelete} onHighlight={(c) => setHighlighting(c)} />
      )}
      {highlighting && <HighlightEditorModal campaign={highlighting} onClose={() => setHighlighting(null)} onSaved={load} />}
    </div>
  );
}