export interface CampaignHighlight {
  id: string;
  name: string;
  photos: string[]; // first photo is used as the bubble cover
  campaignId?: string; // optional link back to a campaign
}

export const mockHighlights: CampaignHighlight[] = [
  {
    id: "h1",
    name: "Library Fund",
    photos: [
      "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=600",
      "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=600",
    ],
    campaignId: "1",
  },
];

export type NewHighlightInput = { name: string; photos: string[]; campaignId?: string };

export function getHighlightById(id: string): CampaignHighlight | undefined {
  return mockHighlights.find((h) => h.id === id);
}

export function createHighlight(input: NewHighlightInput): CampaignHighlight {
  const highlight: CampaignHighlight = { id: crypto.randomUUID(), ...input };
  mockHighlights.push(highlight);
  return highlight;
}

export function updateHighlight(id: string, input: NewHighlightInput): CampaignHighlight | undefined {
  const highlight = mockHighlights.find((h) => h.id === id);
  if (!highlight) return undefined;
  Object.assign(highlight, input);
  return highlight;
}

export function deleteHighlight(id: string) {
  const idx = mockHighlights.findIndex((h) => h.id === id);
  if (idx !== -1) mockHighlights.splice(idx, 1);
}