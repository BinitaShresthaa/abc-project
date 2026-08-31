"use client";

import { useEffect, useState } from "react";
import CampaignCardGrid from "@/components/dashboard/campaign/CampaignCardGrid";
import HighlightEditorModal from "@/components/dashboard/campaign/HighlightEditorModal";
import Toast, { useToast } from "@/components/dashboard/campaign/Toast";
import type { Campaign, CampaignHighlight } from "@/lib/campaigns/types";

export default function CampaignHighlightView() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [highlights, setHighlights] = useState<CampaignHighlight[]>([]);
  const [loading, setLoading] = useState(true);
  const [managing, setManaging] = useState<Campaign | null>(null);
  const [adding, setAdding] = useState(false);
  const { message, showToast } = useToast();

  async function load() {
    setLoading(true);
    const [campaignsRes, highlightsRes] = await Promise.all([fetch("/api/campaigns"), fetch("/api/highlights")]);
    setCampaigns(await campaignsRes.json());
    setHighlights(await highlightsRes.json());
    setLoading(false);
  }

  useEffect(() => { load(); }, []);

  const highlightedIds = new Set(highlights.map((h) => h.campaignId));

  // This page now ONLY shows campaigns already highlighted (yellow button) —
  // toggling a campaign INTO highlights happens on the List/Past pages.
  // Here you can only remove a highlight or manage its extra photos.
  const highlightedCampaigns = campaigns.filter((c) => highlightedIds.has(c.id));
  const highlightedActive = highlightedCampaigns.filter((c) => c.status === "ACTIVE");
  const highlightedPast = highlightedCampaigns.filter((c) => c.status === "COMPLETED");

  async function handleRemoveHighlight(campaign: Campaign) {
    await fetch(`/api/highlights/${campaign.id}`, { method: "DELETE" });
    showToast(`Removed "${campaign.title}" from Highlights.`);
    load();
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-bold text-slate-800 dark:text-slate-100">Campaign Highlights</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Manage campaigns already added to Highlights and their extra photos. To highlight a new campaign, use its "Highlight" button on the Campaign List or Past Campaigns page.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setAdding(true)}
          disabled={highlightedCampaigns.length === 0}
          className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
        >
          + Add Photos
        </button>
      </div>

      {loading ? (
        <p className="text-sm text-slate-400">Loading...</p>
      ) : highlightedCampaigns.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-10 text-center text-sm text-slate-400 dark:border-slate-700 dark:bg-slate-800/50">
          No campaigns are highlighted yet. Go to Campaign List or Past Campaigns and click "Highlight" on one.
        </div>
      ) : (
        <>
          {highlightedActive.length > 0 && (
            <div>
              <h2 className="mb-3 text-sm font-semibold text-slate-600 dark:text-slate-300">Active Campaigns</h2>
              <CampaignCardGrid campaigns={highlightedActive} variant="past" highlightedCampaignIds={highlightedIds} onHighlight={handleRemoveHighlight} onManagePhotos={(c) => setManaging(c)} />
            </div>
          )}
          {highlightedPast.length > 0 && (
            <div>
              <h2 className="mb-3 text-sm font-semibold text-slate-600 dark:text-slate-300">Past Campaigns</h2>
              <CampaignCardGrid campaigns={highlightedPast} variant="past" highlightedCampaignIds={highlightedIds} onHighlight={handleRemoveHighlight} onManagePhotos={(c) => setManaging(c)} />
            </div>
          )}
        </>
      )}

      {managing && <HighlightEditorModal campaign={managing} onClose={() => { setManaging(null); load(); }} onSaved={load} />}
      {adding && <HighlightEditorModal availableCampaigns={highlightedCampaigns} onClose={() => { setAdding(false); load(); }} onSaved={load} />}
      <Toast message={message} />
    </div>
  );
}