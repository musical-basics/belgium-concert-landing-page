import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { ORGANIZER_COOKIE, verifySession } from "@/lib/auth/organizer";
import { getTicketOrder, updateTicketOrder, recordEvent } from "@/lib/db/tickets";
import { sendSeatEmail } from "@/lib/email/send-seat-email";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function POST(req: Request, ctx: { params: Promise<{ id: string }> }) {
  const cookieStore = await cookies();
  const session = verifySession(cookieStore.get(ORGANIZER_COOKIE)?.value);
  if (!session) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  const { id } = await ctx.params;
  const order = await getTicketOrder(id);
  if (!order) return NextResponse.json({ error: "not_found" }, { status: 404 });

  if (!order.assigned_seats || !order.assigned_seats.trim()) {
    return NextResponse.json({ error: "seats_required" }, { status: 400 });
  }
  if (!order.customer_email) {
    return NextResponse.json({ error: "customer_email_missing" }, { status: 400 });
  }

  let body: { confirmResend?: boolean } = {};
  try {
    body = await req.json();
  } catch {
    /* empty body is fine */
  }
  if (order.seat_status === "emailed" && !body.confirmResend) {
    return NextResponse.json({ error: "already_emailed", needsConfirm: true }, { status: 409 });
  }

  const result = await sendSeatEmail({
    to: order.customer_email,
    vars: {
      firstName: order.customer_first_name,
      assignedSeats: order.assigned_seats,
      orderName: order.shopify_order_name,
    },
  });

  if (!result.ok) {
    const updated = await updateTicketOrder(id, {
      seat_status: "error",
      email_error: result.error,
    });
    await recordEvent({
      ticket_order_id: id,
      event_type: "email_failed",
      actor: `organizer:${session.actor}`,
      payload: { error: result.error },
    });
    return NextResponse.json({ ok: false, error: result.error, order: updated }, { status: 502 });
  }

  const updated = await updateTicketOrder(id, {
    seat_status: "emailed",
    emailed_at: new Date().toISOString(),
    email_error: null,
    email_dry_run: result.dryRun,
  });
  await recordEvent({
    ticket_order_id: id,
    event_type: "email_sent",
    actor: `organizer:${session.actor}`,
    payload: { dryRun: result.dryRun, providerId: result.id },
  });

  return NextResponse.json({ ok: true, dryRun: result.dryRun, order: updated });
}
