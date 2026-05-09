import { NextResponse } from "next/server";
import { checkAgentBearer, unauthorized } from "@/lib/agent/auth";
import { getTicketOrder } from "@/lib/db/tickets";
import { renderHtml, renderSubject, renderText } from "@/lib/email/seat-email-template";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function POST(req: Request, ctx: { params: Promise<{ id: string }> }) {
  if (!checkAgentBearer(req)) return unauthorized();
  const { id } = await ctx.params;
  const order = await getTicketOrder(id);
  if (!order) return NextResponse.json({ error: "not_found" }, { status: 404 });

  const seats = order.assigned_seats || "(none assigned yet)";
  const vars = {
    firstName: order.customer_first_name,
    assignedSeats: seats,
    orderName: order.shopify_order_name,
  };
  return NextResponse.json({
    to: order.customer_email,
    bcc: process.env.SEAT_EMAIL_BCC || null,
    from: process.env.SEAT_EMAIL_FROM || process.env.RESEND_FROM_EMAIL || null,
    subject: renderSubject(),
    text: renderText(vars),
    html: renderHtml(vars),
    dryRun: (process.env.EMAIL_DRY_RUN || "").toLowerCase() === "true",
  });
}
