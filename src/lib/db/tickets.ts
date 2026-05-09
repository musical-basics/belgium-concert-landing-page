// Thin Supabase REST client for the concert_tickets schema (analytics project).
// Uses PostgREST directly — no @supabase/supabase-js dependency needed.

const SCHEMA = "concert_tickets";

function env() {
  const url = process.env.ANALYTICS_SUPABASE_URL ?? process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key =
    process.env.ANALYTICS_SUPABASE_SERVICE_ROLE_KEY ??
    process.env.SUPABASE_SERVICE_ROLE_KEY ??
    process.env.SUPABASE_SERVICE_KEY;
  if (!url || !key) throw new Error("missing analytics Supabase env vars");
  return { url, key };
}

function headers(write = false): HeadersInit {
  const { key } = env();
  const h: Record<string, string> = {
    apikey: key,
    Authorization: `Bearer ${key}`,
    "Accept-Profile": SCHEMA,
    "Content-Type": "application/json",
  };
  if (write) {
    h["Content-Profile"] = SCHEMA;
    h["Prefer"] = "return=representation";
  }
  return h;
}

export type SeatStatus = "pending" | "assigned" | "emailed" | "error" | "cancelled";
export type OrderStatus = "pending" | "paid" | "cancelled" | "refunded";

export type TicketOrder = {
  id: string;
  shopify_order_id: string;
  shopify_order_name: string | null;
  customer_first_name: string | null;
  customer_last_name: string | null;
  customer_email: string;
  customer_locale: string | null;
  ticket_quantity: number;
  ticket_type: string | null;
  variant_id: string | null;
  order_status: OrderStatus;
  seat_status: SeatStatus;
  assigned_seats: string | null;
  organizer_notes: string | null;
  assigned_by: string | null;
  assigned_at: string | null;
  emailed_at: string | null;
  email_error: string | null;
  email_dry_run: boolean;
  shopify_payload: unknown;
  created_at: string;
  updated_at: string;
};

export type TicketOrderInsert = Omit<TicketOrder, "id" | "created_at" | "updated_at">;

async function call<T>(path: string, init: RequestInit, write = false): Promise<T> {
  const { url } = env();
  const res = await fetch(`${url}/rest/v1/${path}`, {
    ...init,
    headers: { ...headers(write), ...(init.headers || {}) },
    cache: "no-store",
  });
  const text = await res.text();
  if (!res.ok) {
    throw new Error(`supabase ${res.status}: ${text}`);
  }
  return text ? (JSON.parse(text) as T) : (undefined as T);
}

export async function listTicketOrders(opts?: { status?: SeatStatus }): Promise<TicketOrder[]> {
  const params = new URLSearchParams({ select: "*", order: "created_at.desc" });
  if (opts?.status) params.set("seat_status", `eq.${opts.status}`);
  return call<TicketOrder[]>(`ticket_orders?${params.toString()}`, { method: "GET" });
}

export async function getTicketOrder(id: string): Promise<TicketOrder | null> {
  const params = new URLSearchParams({ select: "*", id: `eq.${id}`, limit: "1" });
  const rows = await call<TicketOrder[]>(`ticket_orders?${params.toString()}`, { method: "GET" });
  return rows[0] ?? null;
}

export async function getTicketOrderByShopifyId(shopifyOrderId: string): Promise<TicketOrder | null> {
  const params = new URLSearchParams({
    select: "*",
    shopify_order_id: `eq.${shopifyOrderId}`,
    limit: "1",
  });
  const rows = await call<TicketOrder[]>(`ticket_orders?${params.toString()}`, { method: "GET" });
  return rows[0] ?? null;
}

export async function upsertTicketOrder(row: Partial<TicketOrderInsert> & { shopify_order_id: string }): Promise<TicketOrder> {
  const rows = await call<TicketOrder[]>(
    `ticket_orders?on_conflict=shopify_order_id`,
    {
      method: "POST",
      headers: { Prefer: "resolution=merge-duplicates,return=representation" },
      body: JSON.stringify(row),
    },
    true
  );
  return rows[0];
}

export async function updateTicketOrder(id: string, patch: Partial<TicketOrder>): Promise<TicketOrder> {
  const params = new URLSearchParams({ id: `eq.${id}` });
  const rows = await call<TicketOrder[]>(
    `ticket_orders?${params.toString()}`,
    { method: "PATCH", body: JSON.stringify(patch) },
    true
  );
  if (!rows[0]) throw new Error(`ticket_order ${id} not found`);
  return rows[0];
}

export type TicketEvent = {
  ticket_order_id: string;
  event_type: string;
  actor?: string | null;
  payload?: unknown;
};

export async function recordEvent(evt: TicketEvent): Promise<void> {
  await call(`ticket_order_events`, { method: "POST", body: JSON.stringify(evt) }, true);
}

export async function statusCounts(): Promise<Record<SeatStatus, number>> {
  const all = await listTicketOrders();
  const counts: Record<SeatStatus, number> = {
    pending: 0,
    assigned: 0,
    emailed: 0,
    error: 0,
    cancelled: 0,
  };
  for (const row of all) counts[row.seat_status]++;
  return counts;
}
