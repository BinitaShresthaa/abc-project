import { NextResponse } from "next/server";
import { addPhotoToHighlight } from "@/lib/campaigns/highlights-db";
import { fileToDataUrl } from "@/lib/campaigns/file-to-data-url-server";

export async function POST(req: Request, { params }: { params: Promise<{ campaignId: string }> }) {
  const { campaignId } = await params;
  const formData = await req.formData();
  const file = formData.get("image");
  if (!(file instanceof File) || file.size === 0) {
    return NextResponse.json({ error: "No photo provided." }, { status: 400 });
  }
  const highlight = await addPhotoToHighlight(campaignId, await fileToDataUrl(file));
  if (!highlight) return NextResponse.json({ error: "Highlight not found." }, { status: 404 });
  return NextResponse.json(highlight);
}