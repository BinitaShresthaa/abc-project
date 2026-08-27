import { getAllCampaigns } from "@/lib/campaigns/campaigns-db";
import { getAllHighlights } from "@/lib/campaigns/highlights-db";
import CampaignsClient from "@/components/CampaignsClient";

export default async function CampaignsPage() {
  const [campaigns, highlights] = await Promise.all([getAllCampaigns(), getAllHighlights()]);
  return <CampaignsClient campaigns={campaigns} highlights={highlights} />;
}