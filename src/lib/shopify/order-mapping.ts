import { STANDARD_VARIANT_ID, VIP_VARIANT_ID, LIVESTREAM_VARIANT_ID } from "@/lib/checkout";
import type { TicketOrderInsert, OrderStatus } from "@/lib/db/tickets";

export const SEAT_VARIANTS = new Set<string>([STANDARD_VARIANT_ID, VIP_VARIANT_ID]);
export const NO_SEAT_VARIANTS = new Set<string>([LIVESTREAM_VARIANT_ID]);

type ShopifyLineItem = {
  variant_id?: number | string | null;
  quantity?: number | null;
  title?: string | null;
};

type ShopifyCustomer = {
  email?: string | null;
  first_name?: string | null;
  last_name?: string | null;
};

export type ShopifyOrder = {
  id: number | string;
  name?: string | null;
  email?: string | null;
  customer?: ShopifyCustomer | null;
  customer_locale?: string | null;
  line_items?: ShopifyLineItem[] | null;
  financial_status?: string | null;
  cancelled_at?: string | null;
  refunds?: unknown[] | null;
};

function classifyStatus(order: ShopifyOrder): OrderStatus {
  if (order.cancelled_at) return "cancelled";
  if ((order.refunds ?? []).length > 0) return "refunded";
  const fs = (order.financial_status || "").toLowerCase();
  if (fs === "paid" || fs === "partially_paid") return "paid";
  if (fs === "refunded" || fs === "partially_refunded") return "refunded";
  if (fs === "voided") return "cancelled";
  return "pending";
}

function variantIdString(v: number | string | null | undefined): string | null {
  if (v === null || v === undefined) return null;
  return String(v);
}

/**
 * Map a Shopify order to a TicketOrderInsert row, or return null if the order
 * has no in-venue seat-eligible line items (e.g. livestream-only orders).
 */
export function mapShopifyOrder(order: ShopifyOrder): TicketOrderInsert | null {
  const lineItems = order.line_items ?? [];
  const seatItems = lineItems.filter((li) => {
    const v = variantIdString(li.variant_id);
    return v !== null && SEAT_VARIANTS.has(v);
  });
  if (seatItems.length === 0) return null;

  const ticketQuantity = seatItems.reduce((sum, li) => sum + (li.quantity ?? 0), 0);
  if (ticketQuantity <= 0) return null;

  // Determine ticket type. If both standard + VIP present, mark "mixed".
  const hasVip = seatItems.some((li) => variantIdString(li.variant_id) === VIP_VARIANT_ID);
  const hasStandard = seatItems.some((li) => variantIdString(li.variant_id) === STANDARD_VARIANT_ID);
  const ticketType = hasVip && hasStandard ? "mixed" : hasVip ? "vip" : "standard";
  const variantId = hasVip && !hasStandard ? VIP_VARIANT_ID : hasStandard && !hasVip ? STANDARD_VARIANT_ID : null;

  const customer = order.customer ?? {};
  const email = (customer.email ?? order.email ?? "").trim().toLowerCase();

  return {
    shopify_order_id: String(order.id),
    shopify_order_name: order.name ?? null,
    customer_first_name: customer.first_name ?? null,
    customer_last_name: customer.last_name ?? null,
    customer_email: email,
    customer_locale: order.customer_locale ?? null,
    ticket_quantity: ticketQuantity,
    ticket_type: ticketType,
    variant_id: variantId,
    order_status: classifyStatus(order),
    seat_status: "pending",
    assigned_seats: null,
    organizer_notes: null,
    assigned_by: null,
    assigned_at: null,
    emailed_at: null,
    email_error: null,
    email_dry_run: false,
    shopify_payload: order as unknown,
  };
}
