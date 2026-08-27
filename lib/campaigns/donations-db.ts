import type { Donation } from "./types";
import { mockDonations } from "./mock-campaigns-db";
import { getCampaignBySlug } from "./campaigns-db";

export async function createDonation(input: {
  campaignSlug: string; amount: number; paymentMethod: string; donorName?: string;
}): Promise<Donation> {
  const campaign = await getCampaignBySlug(input.campaignSlug);
  if (!campaign) throw new Error("Campaign not found");

  const donation: Donation = {
    id: `donation-${crypto.randomUUID()}`, campaignId: campaign.id, campaignSlug: campaign.slug,
    campaignTitle: campaign.title, amount: input.amount, paymentMethod: input.paymentMethod,
    donorName: input.donorName, createdAt: new Date().toISOString(),
  };
  mockDonations.unshift(donation);
  return donation;
}

export async function getAllDonations(): Promise<Donation[]> {
  return [...mockDonations].sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export async function getDonationsByCampaign(campaignId: string): Promise<Donation[]> {
  return (await getAllDonations()).filter((d) => d.campaignId === campaignId);
}