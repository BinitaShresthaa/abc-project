import type { ReactNode } from "react";

export type CampaignStatus = "ACTIVE" | "UPCOMING" | "COMPLETED";

export interface Campaign {
  id: string;
  slug: string;
  image: string;
  status: CampaignStatus;
  faculty: string;
  title: string;
  description: string;
  detailedDescription?: string;
  whyMatters?: string;
  launchDate?: string;
  createdAt: string;
}

export interface CampaignInput {
  title: string;
  slug?: string;
  image: string;
  status: CampaignStatus;
  faculty: string;
  description: string;
  detailedDescription?: string;
  whyMatters?: string;
  launchDate?: string;
}

export interface Donation {
  id: string;
  campaignId: string;
  campaignSlug: string;
  campaignTitle: string;
  amount: number;
  paymentMethod: string;
  donorName?: string;
  createdAt: string;
}

export interface CampaignHighlight {
  id: string;
  campaignId: string; // one highlight per campaign
  photos: string[]; // EXTRA photos beyond campaign.image — full sequence is [campaign.image, ...photos]
  createdAt: string;
}

export interface HighlightInput {
  name: string;
}