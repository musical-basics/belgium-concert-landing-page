import { NextResponse } from "next/server";
import { checkAgentBearer, unauthorized } from "@/lib/agent/auth";
import { statusCounts } from "@/lib/db/tickets";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function GET(req: Request) {
  if (!checkAgentBearer(req)) return unauthorized();
  const counts = await statusCounts();
  return NextResponse.json({ counts });
}
