import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { ORGANIZER_COOKIE, verifySession } from "@/lib/auth/organizer";
import { updateTicketOrder, recordEvent, getTicketOrder } from "@/lib/db/tickets";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function PATCH(req: Request, ctx: { params: Promise<{ id: string }> }) {
  const cookieStore = await cookies();
  const session = verifySession(cookieStore.get(ORGANIZER_COOKIE)?.value);
  if (!session) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  const { id } = await ctx.params;
  let body: { assignedSeats?: string | null; organizerNotes?: string | null };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid_body" }, { status: 400 });
  }

  const before = await getTicketOrder(id);
  if (!before) return NextResponse.json({ error: "not_found" }, { status: 404 });

  const patch: Record<string, unknown> = {};
  if (body.assignedSeats !== undefined) {
    const seats = (body.assignedSeats || "").trim();
    patch.assigned_seats = seats || null;
    if (seats) {
      patch.assigned_at = new Date().toISOString();
      patch.assigned_by = session.actor;
      // Promote pending → assigned. Don't downgrade emailed/error.
      if (before.seat_status === "pending") patch.seat_status = "assigned";
    }
  }
  if (body.organizerNotes !== undefined) {
    patch.organizer_notes = (body.organizerNotes || "").trim() || null;
  }

  const updated = await updateTicketOrder(id, patch);
  await recordEvent({
    ticket_order_id: id,
    event_type: "updated",
    actor: `organizer:${session.actor}`,
    payload: { patch },
  });

  return NextResponse.json({ order: updated });
}
