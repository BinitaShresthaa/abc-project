"use client";

import { useEffect, useState } from "react";
import CampaignCardGrid from "@/components/dashboard/campaign/CampaignCardGrid";
import Toast, { useToast } from "@/components/dashboard/campaign/Toast";
import type { Campaign, CampaignHighlight } from "@/lib/campaigns/types";

export default function CampaignPastView() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [highlights, setHighlights] = useState<CampaignHighlight[]>([]);
  const { message, showToast } = useToast();

  async function load() {
    const [campaignsRes, highlightsRes] = await Promise.all([fetch("/api/campaigns"), fetch("/api/highlights")]);
    const all: Campaign[] = await campaignsRes.json();
    setCampaigns(all.filter((c) => c.status === "COMPLETED"));
    setHighlights(await highlightsRes.json());
  }

  useEffect(() => { load(); }, []);

  const highlightedIds = new Set(highlights.map((h) => h.campaignId));

  async function handleToggleHighlight(campaign: Campaign) {
    if (highlightedIds.has(campaign.id)) {
      await fetch(`/api/highlights/${campaign.id}`, { method: "DELETE" });
      showToast(`Removed "${campaign.title}" from Highlights.`);
    } else {
      const res = await fetch("/api/highlights", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ campaignId: campaign.id }) });
      showToast(res.ok ? `Successfully added "${campaign.title}" to Highlights.` : "Failed to add to Highlights.");
    }
    load();
  }

  return (
    <div className="space-y-4">
      <h1 className="text-lg font-bold text-slate-800 dark:text-slate-100">Past Campaigns</h1>
      <CampaignCardGrid campaigns={campaigns} variant="past" emptyLabel="No completed campaigns yet." highlightedCampaignIds={highlightedIds} onHighlight={handleToggleHighlight} />
      <Toast message={message} />
    </div>
  );
}