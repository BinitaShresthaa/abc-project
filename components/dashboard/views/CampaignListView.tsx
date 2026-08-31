"use client";

import { useEffect, useState } from "react";
import CampaignCardGrid from "@/components/dashboard/campaign/CampaignCardGrid";
import { useToast } from "@/lib/toast-context";
import type { Campaign, CampaignHighlight } from "@/lib/campaigns/types";
import type { DashboardViewProps } from "@/lib/view-types";

export default function CampaignListView({ onNavigate, onEditCampaign }: Partial<DashboardViewProps>) {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [highlights, setHighlights] = useState<CampaignHighlight[]>([]);
  const [loading, setLoading] = useState(true);
  const { showToast } = useToast();

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

  async function handleToggleHighlight(campaign: Campaign) {
    if (highlightedIds.has(campaign.id)) {
      await fetch(`/api/highlights/${campaign.id}`, { method: "DELETE" });
      showToast(`Removed "${campaign.title}" from Highlights.`);
    } else {
      const res = await fetch("/api/highlights", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ campaignId: campaign.id }) });
      showToast(res.ok ? `Successfully added "${campaign.title}" to Highlights.` : "Failed to add to Highlights.", res.ok ? "success" : "error");
    }
    load();
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-bold text-slate-800 dark:text-slate-100">Campaigns</h1>
        <button type="button" onClick={() => onNavigate?.("campaign-add")} className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white hover:bg-primary/90">+ Add Campaign</button>
      </div>
      {loading ? (
        <p className="text-sm text-slate-400">Loading...</p>
      ) : (
        <CampaignCardGrid campaigns={campaigns} variant="list" emptyLabel="No campaigns yet — add your first one." highlightedCampaignIds={highlightedIds} onEdit={onEditCampaign} onDelete={handleDelete} onHighlight={handleToggleHighlight} />
      )}
    </div>
  );
}