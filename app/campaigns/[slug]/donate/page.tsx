import { getCampaignBySlug } from "@/lib/campaigns/campaigns-db";
import DonateForm from "@/components/DonateForm";

export default async function DonatePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const campaign = await getCampaignBySlug(slug);
  return <DonateForm campaign={campaign} />;
}