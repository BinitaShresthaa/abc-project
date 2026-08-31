import { NextResponse } from "next/server";
import { deleteHighlight } from "@/lib/campaigns/highlights-db";

export async function DELETE(_req: Request, { params }: { params: Promise<{ campaignId: string }> }) {
  const { campaignId } = await params;
  await deleteHighlight(campaignId);
  return NextResponse.json({ ok: true });
}