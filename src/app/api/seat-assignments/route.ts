import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { ORGANIZER_COOKIE, verifySession } from "@/lib/auth/organizer";
import { listTicketOrders, type SeatStatus } from "@/lib/db/tickets";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const VALID_STATUSES: SeatStatus[] = ["pending", "assigned", "emailed", "error", "cancelled"];

export async function GET(req: Request) {
  const cookieStore = await cookies();
  if (!verifySession(cookieStore.get(ORGANIZER_COOKIE)?.value)) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  const url = new URL(req.url);
  const statusParam = url.searchParams.get("status");
  const status = VALID_STATUSES.includes(statusParam as SeatStatus) ? (statusParam as SeatStatus) : undefined;
  const rows = await listTicketOrders(status ? { status } : undefined);
  return NextResponse.json({ orders: rows });
}
