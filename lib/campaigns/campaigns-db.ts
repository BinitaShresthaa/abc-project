import { mockCampaigns } from "./mock-campaigns-db";
import type { Campaign, CampaignInput, CampaignStatus } from "./types";

export async function getAllCampaigns(): Promise<Campaign[]> {
  return [...mockCampaigns].sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export async function getCampaignsByStatus(status: CampaignStatus): Promise<Campaign[]> {
  return (await getAllCampaigns()).filter((c) => c.status === status);
}

export async function getCampaignBySlug(slug: string): Promise<Campaign | null> {
  return mockCampaigns.find((c) => c.slug === slug) ?? null;
}

export async function getCampaignById(id: string): Promise<Campaign | null> {
  return mockCampaigns.find((c) => c.id === id) ?? null;
}

function slugify(title: string) {
  return title.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

export async function createCampaign(input: CampaignInput): Promise<Campaign> {
  const slug = input.slug?.trim() || slugify(input.title);
  if (mockCampaigns.some((c) => c.slug === slug)) throw new Error("A campaign with this slug already exists.");
  const campaign: Campaign = {
    id: `campaign-${crypto.randomUUID()}`, slug, image: input.image, status: input.status,
    faculty: input.faculty, title: input.title, description: input.description,
    detailedDescription: input.detailedDescription, whyMatters: input.whyMatters,
    launchDate: input.launchDate, createdAt: new Date().toISOString(),
    isHighlight: false, category: "General", raised: 0, goal: 0,
  };
  mockCampaigns.unshift(campaign);
  return campaign;
}

export async function updateCampaign(id: string, input: Partial<CampaignInput>): Promise<Campaign> {
  const campaign = mockCampaigns.find((c) => c.id === id);
  if (!campaign) throw new Error("Campaign not found");
  Object.assign(campaign, input);
  return campaign;
}

export async function deleteCampaign(id: string): Promise<void> {
  const index = mockCampaigns.findIndex((c) => c.id === id);
  if (index !== -1) mockCampaigns.splice(index, 1);
}