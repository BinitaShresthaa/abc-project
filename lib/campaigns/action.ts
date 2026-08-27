"use server";

import { revalidatePath } from "next/cache";
import { createDonation } from "./donations-db";

// Campaign/Highlight CRUD moved to /api/campaigns and /api/highlights,
// called via fetch from the dashboard — the dashboard has no real routes
// for redirect()/revalidatePath() to target anymore.

export async function createDonationAction(input: { campaignSlug: string; amount: number; paymentMethod: string }) {
  const donation = await createDonation(input);
  revalidatePath("/campaigns");
  revalidatePath(`/campaigns/${input.campaignSlug}`);
  return donation;
}