import { NextResponse } from "next/server";
import { deleteHighlight } from "@/lib/campaigns/highlights-db";

export async function DELETE(_req: Request, { params }: { params: { campaignId: string } }) {
  await deleteHighlight(params.campaignId);
  return NextResponse.json({ ok: true });
}