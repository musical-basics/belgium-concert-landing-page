import { NextResponse } from "next/server";
import { verifyShopifyWebhook } from "@/lib/shopify/verify-webhook";
import { mapShopifyOrder, type ShopifyOrder } from "@/lib/shopify/order-mapping";
import { upsertTicketOrder, getTicketOrderByShopifyId, recordEvent } from "@/lib/db/tickets";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function POST(req: Request) {
  const raw = await req.text();
  const hmac = req.headers.get("x-shopify-hmac-sha256");
  const topic = req.headers.get("x-shopify-topic") || "unknown";

  if (!verifyShopifyWebhook(raw, hmac)) {
    console.warn("[shopify-webhook] signature failed", { topic, hasHmac: Boolean(hmac) });
    return new NextResponse("invalid signature", { status: 401 });
  }

  let order: ShopifyOrder;
  try {
    order = JSON.parse(raw);
  } catch {
    return new NextResponse("invalid json", { status: 400 });
  }

  const mapped = mapShopifyOrder(order);
  if (!mapped) {
    // No seat-eligible line items (e.g. livestream-only). Acknowledge so Shopify stops retrying.
    return NextResponse.json({ ok: true, skipped: "no_seat_items" });
  }

  try {
    const existing = await getTicketOrderByShopifyId(mapped.shopify_order_id);
    const isNew = !existing;

    // Don't clobber organizer fields on a re-fire (e.g. orders/paid after orders/create).
    const patch: Partial<typeof mapped> = isNew
      ? mapped
      : {
          order_status: mapped.order_status,
          shopify_order_name: mapped.shopify_order_name,
          shopify_payload: mapped.shopify_payload,
          // Refresh customer info in case it was missing on the first event
          customer_first_name: existing!.customer_first_name ?? mapped.customer_first_name,
          customer_last_name: existing!.customer_last_name ?? mapped.customer_last_name,
          customer_email: existing!.customer_email || mapped.customer_email,
          customer_locale: existing!.customer_locale ?? mapped.customer_locale,
          ticket_quantity: mapped.ticket_quantity,
          ticket_type: mapped.ticket_type,
          variant_id: mapped.variant_id,
        };

    const row = await upsertTicketOrder({ ...patch, shopify_order_id: mapped.shopify_order_id });

    await recordEvent({
      ticket_order_id: row.id,
      event_type: isNew ? "created" : `webhook:${topic}`,
      actor: "shopify_webhook",
      payload: { topic, order_status: row.order_status },
    });

    return NextResponse.json({ ok: true, id: row.id, isNew });
  } catch (e) {
    console.error("[shopify-webhook] handler failed", e);
    return new NextResponse("server error", { status: 500 });
  }
}
