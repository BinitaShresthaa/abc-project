import { NextResponse } from "next/server";
import { getAllHighlights, createHighlight } from "@/lib/campaigns/highlights-db";

export async function GET() {
  return NextResponse.json(await getAllHighlights());
}

export async function POST(req: Request) {
  const body = await req.json();
  if (!body?.campaignId) return NextResponse.json({ error: "campaignId is required." }, { status: 400 });
  return NextResponse.json(await createHighlight(String(body.campaignId)), { status: 201 });
}