import { mockHighlights } from "./mock-campaigns-db";
import type { CampaignHighlight } from "./types";

export async function getAllHighlights(): Promise<CampaignHighlight[]> {
  return [...mockHighlights].sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export async function getHighlightByCampaignId(campaignId: string): Promise<CampaignHighlight | null> {
  return mockHighlights.find((h) => h.campaignId === campaignId) ?? null;
}

export async function createHighlight(campaignId: string): Promise<CampaignHighlight> {
  const existing = mockHighlights.find((h) => h.campaignId === campaignId);
  if (existing) return existing;
  const highlight: CampaignHighlight = {
    id: `highlight-${crypto.randomUUID()}`, campaignId, photos: [], createdAt: new Date().toISOString(),
  };
  mockHighlights.unshift(highlight);
  return highlight;
}

export async function addPhotoToHighlight(campaignId: string, photo: string): Promise<CampaignHighlight | null> {
  const h = mockHighlights.find((h) => h.campaignId === campaignId);
  if (!h) return null;
  h.photos.push(photo);
  return h;
}

export async function removePhotoFromHighlight(campaignId: string, index: number): Promise<CampaignHighlight | null> {
  const h = mockHighlights.find((h) => h.campaignId === campaignId);
  if (!h) return null;
  h.photos.splice(index, 1);
  return h;
}

export async function deleteHighlight(campaignId: string): Promise<void> {
  const index = mockHighlights.findIndex((h) => h.campaignId === campaignId);
  if (index !== -1) mockHighlights.splice(index, 1);
}