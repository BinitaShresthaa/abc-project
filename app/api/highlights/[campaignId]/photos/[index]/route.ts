import { NextResponse } from "next/server";
import { removePhotoFromHighlight } from "@/lib/campaigns/highlights-db";

export async function DELETE(_req: Request, { params }: { params: Promise<{ campaignId: string; index: string }> }) {
  const { campaignId, index } = await params;
  const highlight = await removePhotoFromHighlight(campaignId, Number(index));
  if (!highlight) return NextResponse.json({ error: "Highlight not found." }, { status: 404 });
  return NextResponse.json(highlight);
}