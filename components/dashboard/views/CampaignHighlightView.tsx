"use client";

import { useEffect, useState } from "react";
import CampaignCardGrid from "@/components/dashboard/campaign/CampaignCardGrid";
import HighlightEditorModal from "@/components/dashboard/campaign/HighlightEditorModal";
import type { Campaign, CampaignHighlight } from "@/lib/campaigns/types";

export default function CampaignHighlightView() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [highlights, setHighlights] = useState<CampaignHighlight[]>([]);
  const [loading, setLoading] = useState(true);
  const [highlighting, setHighlighting] = useState<Campaign | null>(null);
  const [adding, setAdding] = useState(false);

  async function load() {
    setLoading(true);
    const [campaignsRes, highlightsRes] = await Promise.all([fetch("/api/campaigns"), fetch("/api/highlights")]);
    setCampaigns(await campaignsRes.json());
    setHighlights(await highlightsRes.json());
    setLoading(false);
  }

  useEffect(() => { load(); }, []);

  const highlightedIds = new Set(highlights.map((h) => h.campaignId));
  const activeCampaigns = campaigns.filter((c) => c.status === "ACTIVE");
  const pastCampaigns = campaigns.filter((c) => c.status === "COMPLETED");
  const availableForAdd = campaigns.filter((c) => c.status !== "UPCOMING" && !highlightedIds.has(c.id));

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-bold text-slate-800 dark:text-slate-100">Campaign Highlights</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">Mark a campaign as highlighted and add extra photos for the public story reel.</p>
        </div>
        <button type="button" onClick={() => setAdding(true)} className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white hover:bg-primary/90">+ Add Highlight</button>
      </div>

      {loading ? (
        <p className="text-sm text-slate-400">Loading...</p>
      ) : (
        <>
          <div>
            <h2 className="mb-3 text-sm font-semibold text-slate-600 dark:text-slate-300">Active Campaigns</h2>
            <CampaignCardGrid campaigns={activeCampaigns} variant="past" emptyLabel="No active campaigns." highlightedCampaignIds={highlightedIds} onHighlight={(c) => setHighlighting(c)} />
          </div>
          <div>
            <h2 className="mb-3 text-sm font-semibold text-slate-600 dark:text-slate-300">Past Campaigns</h2>
            <CampaignCardGrid campaigns={pastCampaigns} variant="past" emptyLabel="No completed campaigns." highlightedCampaignIds={highlightedIds} onHighlight={(c) => setHighlighting(c)} />
          </div>
        </>
      )}

      {highlighting && <HighlightEditorModal campaign={highlighting} onClose={() => setHighlighting(null)} onSaved={load} />}
      {adding && <HighlightEditorModal availableCampaigns={availableForAdd} onClose={() => setAdding(false)} onSaved={load} />}
    </div>
  );
}