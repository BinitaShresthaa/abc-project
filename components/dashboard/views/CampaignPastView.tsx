"use client";

import { useEffect, useState } from "react";
import CampaignCardGrid from "@/components/dashboard/campaign/CampaignCardGrid";
import HighlightEditorModal from "@/components/dashboard/campaign/HighlightEditorModal";
import type { Campaign, CampaignHighlight } from "@/lib/campaigns/types";

export default function CampaignPastView() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [highlights, setHighlights] = useState<CampaignHighlight[]>([]);
  const [highlighting, setHighlighting] = useState<Campaign | null>(null);

  async function load() {
    const [campaignsRes, highlightsRes] = await Promise.all([fetch("/api/campaigns"), fetch("/api/highlights")]);
    const all: Campaign[] = await campaignsRes.json();
    setCampaigns(all.filter((c) => c.status === "COMPLETED"));
    setHighlights(await highlightsRes.json());
  }

  useEffect(() => { load(); }, []);

  const highlightedIds = new Set(highlights.map((h) => h.campaignId));

  return (
    <div className="space-y-4">
      <h1 className="text-lg font-bold text-slate-800 dark:text-slate-100">Past Campaigns</h1>
      <CampaignCardGrid campaigns={campaigns} variant="past" emptyLabel="No completed campaigns yet." highlightedCampaignIds={highlightedIds} onHighlight={(c) => setHighlighting(c)} />
      {highlighting && <HighlightEditorModal campaign={highlighting} onClose={() => setHighlighting(null)} onSaved={load} />}
    </div>
  );
}