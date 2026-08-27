import { NextResponse } from "next/server";
import { removePhotoFromHighlight } from "@/lib/campaigns/highlights-db";

export async function DELETE(_req: Request, { params }: { params: { campaignId: string; index: string } }) {
  const highlight = await removePhotoFromHighlight(params.campaignId, Number(params.index));
  if (!highlight) return NextResponse.json({ error: "Highlight not found." }, { status: 404 });
  return NextResponse.json(highlight);
}