import { getCampaignBySlug } from "@/lib/campaigns/campaigns-db";
import DonateForm from "@/components/DonateForm";

export default async function DonatePage({ params }: { params: { slug: string } }) {
  const campaign = await getCampaignBySlug(params.slug);
  return <DonateForm campaign={campaign} />;
}