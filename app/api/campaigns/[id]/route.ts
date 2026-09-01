import { NextResponse } from "next/server";
import { getCampaignById, updateCampaign, deleteCampaign } from "@/lib/campaigns/campaigns-db";
import { fileToDataUrl } from "@/lib/campaigns/file-to-data-url-server";
import { getCurrentUser } from "@/lib/auth";
import type { CampaignStatus } from "@/lib/campaigns/types";

function canManageCampaigns(user: { role: { name: string } } | null): boolean {
  return !!user && (user.role.name === "admin" || user.role.name === "campus_admin");
}

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const user = await getCurrentUser();
  if (!canManageCampaigns(user)) return NextResponse.json({ error: "Only admins can edit campaigns." }, { status: 403 });

  const formData = await req.formData();
  const existing = await getCampaignById(id);
  if (!existing) return NextResponse.json({ error: "Campaign not found." }, { status: 404 });

  const imageFile = formData.get("image");
  const image = imageFile instanceof File && imageFile.size > 0 ? await fileToDataUrl(imageFile) : existing.image;

  try {
    const campaign = await updateCampaign(id, {
      title: String(formData.get("title") || existing.title),
      faculty: String(formData.get("faculty") || existing.faculty),
      status: (formData.get("status") as CampaignStatus) || existing.status,
      description: String(formData.get("description") || existing.description),
      detailedDescription: (formData.get("detailedDescription") as string) || existing.detailedDescription,
      whyMatters: (formData.get("whyMatters") as string) || existing.whyMatters,
      launchDate: (formData.get("launchDate") as string) || existing.launchDate,
      image,
    });
    return NextResponse.json(campaign);
  } catch (err) {
    return NextResponse.json({ error: err instanceof Error ? err.message : "Failed to update campaign." }, { status: 400 });
  }
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const user = await getCurrentUser();
  if (!canManageCampaigns(user)) return NextResponse.json({ error: "Only admins can delete campaigns." }, { status: 403 });

  await deleteCampaign(id);
  return NextResponse.json({ ok: true });
}