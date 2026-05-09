import { NextResponse } from "next/server";
import { checkAgentBearer, unauthorized } from "@/lib/agent/auth";
import { listTicketOrders, type SeatStatus } from "@/lib/db/tickets";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const VALID: SeatStatus[] = ["pending", "assigned", "emailed", "error", "cancelled"];

export async function GET(req: Request) {
  if (!checkAgentBearer(req)) return unauthorized();
  const url = new URL(req.url);
  const statusParam = url.searchParams.get("status");
  const status = VALID.includes(statusParam as SeatStatus) ? (statusParam as SeatStatus) : undefined;
  const rows = await listTicketOrders(status ? { status } : undefined);
  // Strip raw shopify payload from agent responses to keep them lean.
  const slim = rows.map(({ shopify_payload: _, ...rest }) => rest);
  return NextResponse.json({ orders: slim });
}
