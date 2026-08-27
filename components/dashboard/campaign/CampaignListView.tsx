"use client";

import { useState } from "react";
import { mockCampaigns, deleteCampaign, setCampaignHighlight } from "@/lib/mock-campaigns";
import CampaignCardGrid from "@/components/dashboard/campaign/CampaignCardGrid";
import type { DashboardViewProps } from "@/lib/view-types";

export default function CampaignListView({ onNavigate, onEditCampaign }: Partial<DashboardViewProps> & {
  onEditCampaign?: (id: string) => void;
}) {
  const [, forceRefresh] = useState(0);
  const campaigns = mockCampaigns.filter((c) => c.status !== "COMPLETED");

  function handleDelete(id: string) {
    deleteCampaign(id);
    forceRefresh((n) => n + 1);
  }

  function handleToggleHighlight(id: string, next: boolean) {
    setCampaignHighlight(id, next);
    forceRefresh((n) => n + 1);
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-bold text-slate-800 dark:text-slate-100">Campaigns</h1>
        <button type="button" onClick={() => onNavigate?.("campaign-add")} className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white hover:bg-primary/90">
          + Add Campaign
        </button>
      </div>
      <CampaignCardGrid
        campaigns={campaigns.map((campaign) => ({
          ...campaign,
          slug: campaign.id,
          faculty: "",
          createdAt: new Date().toISOString(),
        }))}
        variant="list"
        emptyLabel="No campaigns yet — add your first one."
        onEdit={onEditCampaign}
        onDelete={handleDelete}
        onHighlight={(campaign) => handleToggleHighlight(campaign.id, !campaign.isHighlight)}
      />
    </div>
  );
}