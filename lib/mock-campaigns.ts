export interface Campaign {
  id: string;
  title: string;
  description: string;
  image: string;
  category: string;
  status: "ACTIVE" | "UPCOMING" | "COMPLETED";
  goal: number;
  raised: number;
  isHighlight: boolean;
}

export const mockCampaigns: Campaign[] = [
  { id: "1", title: "Library Renovation Fund", description: "Modernize the central library with new reading spaces and digital resources.", image: "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=600", category: "Infrastructure", status: "ACTIVE", goal: 500000, raised: 312000, isHighlight: true },
  { id: "2", title: "Scholarship for Underprivileged Students", description: "Support merit-based scholarships for students who can't afford tuition.", image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=600", category: "Scholarship", status: "ACTIVE", goal: 800000, raised: 645000, isHighlight: false },
  { id: "3", title: "Annual Sports Meet 2027", description: "Fund equipment, prizes, and logistics for next year's inter-faculty sports meet.", image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=600", category: "Events", status: "UPCOMING", goal: 150000, raised: 0, isHighlight: false },
  { id: "4", title: "Flood Relief Drive 2025", description: "Emergency support for families affected by the 2025 monsoon floods.", image: "https://images.unsplash.com/photo-1509099836639-18ba1795216d?w=600", category: "Relief", status: "COMPLETED", goal: 300000, raised: 300000, isHighlight: false },
];

export type NewCampaignInput = Omit<Campaign, "id" | "raised" | "isHighlight">;

export function getCampaignById(id: string): Campaign | undefined {
  return mockCampaigns.find((c) => c.id === id);
}

export function createCampaign(input: NewCampaignInput): Campaign {
  const campaign: Campaign = { id: crypto.randomUUID(), raised: 0, isHighlight: false, ...input };
  mockCampaigns.unshift(campaign);
  return campaign;
}

export function updateCampaign(id: string, input: Partial<NewCampaignInput>): Campaign | undefined {
  const campaign = mockCampaigns.find((c) => c.id === id);
  if (!campaign) return undefined;
  Object.assign(campaign, input);
  return campaign;
}

export function deleteCampaign(id: string) {
  const idx = mockCampaigns.findIndex((c) => c.id === id);
  if (idx !== -1) mockCampaigns.splice(idx, 1);
}

export function setCampaignHighlight(id: string, isHighlight: boolean) {
  const campaign = mockCampaigns.find((c) => c.id === id);
  if (campaign) campaign.isHighlight = isHighlight;
}