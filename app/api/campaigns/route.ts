import { NextResponse } from "next/server";
import { getAllCampaigns, createCampaign } from "@/lib/campaigns/campaigns-db";
import { fileToDataUrl } from "@/lib/campaigns/file-to-data-url-server";
import { getCurrentUser } from "@/lib/auth";
import type { CampaignStatus } from "@/lib/campaigns/types";

export async function GET() {
  return NextResponse.json(await getAllCampaigns());
}

export async function POST(req: Request) {
  const user = await getCurrentUser();
  if (!user || (user.role.name !== "admin" && user.role.name !== "campus_admin")) {
    return NextResponse.json({ error: "Only admins can create campaigns." }, { status: 403 });
  }

  const formData = await req.formData();
  const imageFile = formData.get("image");
  if (!(imageFile instanceof File) || imageFile.size === 0) {
    return NextResponse.json({ error: "Photo is required." }, { status: 400 });
  }
  try {
    const campaign = await createCampaign({
      title: String(formData.get("title") || ""),
      faculty: String(formData.get("faculty") || ""),
      status: formData.get("status") as CampaignStatus,
      description: String(formData.get("description") || ""),
      detailedDescription: (formData.get("detailedDescription") as string) || undefined,
      whyMatters: (formData.get("whyMatters") as string) || undefined,
      launchDate: (formData.get("launchDate") as string) || undefined,
      image: await fileToDataUrl(imageFile),
    });
    return NextResponse.json(campaign, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: err instanceof Error ? err.message : "Failed to create campaign." }, { status: 400 });
  }
}