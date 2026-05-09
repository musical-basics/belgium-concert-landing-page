"use client";

import { useMemo, useState } from "react";
import type { TicketOrder, SeatStatus } from "@/lib/db/tickets";

const STATUS_COLOR: Record<SeatStatus, string> = {
  pending: "#facc15",
  assigned: "#60a5fa",
  emailed: "#34d399",
  error: "#f87171",
  cancelled: "#a1a1aa",
};

const STATUS_LABEL: Record<SeatStatus, string> = {
  pending: "Pending",
  assigned: "Assigned",
  emailed: "Emailed",
  error: "Error",
  cancelled: "Cancelled",
};

type RowState = {
  seats: string;
  notes: string;
  saving: boolean;
  emailing: boolean;
  message: string | null;
  error: string | null;
};

function rowFrom(order: TicketOrder): RowState {
  return {
    seats: order.assigned_seats || "",
    notes: order.organizer_notes || "",
    saving: false,
    emailing: false,
    message: null,
    error: null,
  };
}

export default function OrdersTable({ initialOrders }: { initialOrders: TicketOrder[] }) {
  const [orders, setOrders] = useState<TicketOrder[]>(initialOrders);
  const [rowState, setRowState] = useState<Record<string, RowState>>(() => {
    const init: Record<string, RowState> = {};
    for (const o of initialOrders) init[o.id] = rowFrom(o);
    return init;
  });

  const sorted = useMemo(() => {
    const order: Record<SeatStatus, number> = { pending: 0, assigned: 1, error: 2, emailed: 3, cancelled: 4 };
    return [...orders].sort((a, b) => {
      if (order[a.seat_status] !== order[b.seat_status]) return order[a.seat_status] - order[b.seat_status];
      return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
    });
  }, [orders]);

  const counts = useMemo(() => {
    const c: Record<SeatStatus, number> = { pending: 0, assigned: 0, emailed: 0, error: 0, cancelled: 0 };
    for (const o of orders) c[o.seat_status]++;
    return c;
  }, [orders]);

  function patchRow(id: string, patch: Partial<RowState>) {
    setRowState((prev) => ({ ...prev, [id]: { ...prev[id], ...patch } }));
  }

  function applyOrder(updated: TicketOrder) {
    setOrders((prev) => prev.map((o) => (o.id === updated.id ? updated : o)));
    setRowState((prev) => ({
      ...prev,
      [updated.id]: { ...prev[updated.id], seats: updated.assigned_seats || "", notes: updated.organizer_notes || "" },
    }));
  }

  async function save(id: string) {
    const r = rowState[id];
    patchRow(id, { saving: true, message: null, error: null });
    try {
      const res = await fetch(`/api/seat-assignments/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ assignedSeats: r.seats, organizerNotes: r.notes }),
      });
      const json = await res.json();
      if (!res.ok) {
        patchRow(id, { error: json.error || "save failed" });
      } else {
        applyOrder(json.order);
        patchRow(id, { message: "Saved." });
      }
    } catch (e) {
      patchRow(id, { error: e instanceof Error ? e.message : String(e) });
    } finally {
      patchRow(id, { saving: false });
    }
  }

  async function saveAndEmail(id: string) {
    const order = orders.find((o) => o.id === id);
    if (!order) return;
    const r = rowState[id];
    if (!r.seats.trim()) {
      patchRow(id, { error: "Enter seat numbers first." });
      return;
    }
    if (order.seat_status === "emailed") {
      const ok = window.confirm(
        `This customer was already emailed. Re-send updated seats to ${order.customer_email}?`
      );
      if (!ok) return;
    }
    patchRow(id, { saving: true, emailing: true, message: null, error: null });
    try {
      const patch = await fetch(`/api/seat-assignments/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ assignedSeats: r.seats, organizerNotes: r.notes }),
      });
      const patchJson = await patch.json();
      if (!patch.ok) {
        patchRow(id, { error: patchJson.error || "save failed" });
        patchRow(id, { saving: false, emailing: false });
        return;
      }
      applyOrder(patchJson.order);

      const send = await fetch(`/api/seat-assignments/${id}/send-email`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ confirmResend: order.seat_status === "emailed" }),
      });
      const sendJson = await send.json();
      if (!send.ok) {
        if (sendJson.order) applyOrder(sendJson.order);
        patchRow(id, { error: sendJson.error || "send failed" });
      } else {
        applyOrder(sendJson.order);
        patchRow(id, { message: sendJson.dryRun ? "Dry-run send (no email actually sent)." : "Email sent." });
      }
    } catch (e) {
      patchRow(id, { error: e instanceof Error ? e.message : String(e) });
    } finally {
      patchRow(id, { saving: false, emailing: false });
    }
  }

  return (
    <main style={{ minHeight: "100vh", background: "#0b0b0c", color: "#f4f4f5", fontFamily: "-apple-system,Segoe UI,Roboto,sans-serif", padding: "24px 16px 80px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <header style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 24 }}>
          <div>
            <h1 style={{ fontSize: 24, fontWeight: 600, margin: 0 }}>Seat Assignments</h1>
            <p style={{ color: "#a1a1aa", marginTop: 4, fontSize: 14 }}>Lionel Yu · CC De Factorij, Zaventem · 11 June 2026, 19:30</p>
          </div>
          <a href="/seat-assignment/logout" style={{ color: "#a1a1aa", fontSize: 13, textDecoration: "underline" }}>Sign out</a>
        </header>

        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 20 }}>
          {(["pending", "assigned", "emailed", "error", "cancelled"] as SeatStatus[]).map((s) => (
            <span key={s} style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "4px 10px", borderRadius: 999, background: "#17171a", border: "1px solid #2a2a2e", fontSize: 12 }}>
              <span style={{ width: 8, height: 8, borderRadius: 999, background: STATUS_COLOR[s] }} />
              {STATUS_LABEL[s]}: <strong>{counts[s]}</strong>
            </span>
          ))}
        </div>

        {sorted.length === 0 && (
          <div style={{ background: "#17171a", border: "1px solid #2a2a2e", borderRadius: 12, padding: 32, textAlign: "center", color: "#a1a1aa" }}>
            No orders yet. They will appear here automatically when Shopify webhooks fire.
          </div>
        )}

        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {sorted.map((o) => {
            const r = rowState[o.id] ?? rowFrom(o);
            return (
              <div key={o.id} style={{ background: "#17171a", border: "1px solid #2a2a2e", borderRadius: 12, padding: 16 }}>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 12, justifyContent: "space-between", alignItems: "baseline", marginBottom: 12 }}>
                  <div>
                    <div style={{ fontSize: 16, fontWeight: 600 }}>
                      {(o.customer_first_name || "").trim()} {(o.customer_last_name || "").trim() || ""}
                      {!o.customer_first_name && !o.customer_last_name && <span style={{ color: "#a1a1aa" }}>(no name)</span>}
                    </div>
                    <div style={{ fontSize: 13, color: "#a1a1aa" }}>
                      {o.customer_email} · {o.shopify_order_name || `#${o.shopify_order_id}`} · qty {o.ticket_quantity} · {o.ticket_type || "—"}
                    </div>
                    <div style={{ fontSize: 12, color: "#71717a", marginTop: 2 }}>
                      Order {o.order_status} · created {new Date(o.created_at).toLocaleString()}
                      {o.emailed_at && ` · emailed ${new Date(o.emailed_at).toLocaleString()}`}
                      {o.email_dry_run && " (dry-run)"}
                    </div>
                  </div>
                  <span style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "4px 10px", borderRadius: 999, background: "#0b0b0c", border: `1px solid ${STATUS_COLOR[o.seat_status]}`, fontSize: 12, color: STATUS_COLOR[o.seat_status] }}>
                    <span style={{ width: 8, height: 8, borderRadius: 999, background: STATUS_COLOR[o.seat_status] }} />
                    {STATUS_LABEL[o.seat_status]}
                  </span>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                  <div>
                    <label style={{ display: "block", fontSize: 12, color: "#a1a1aa", marginBottom: 4 }}>Assigned seats</label>
                    <input
                      value={r.seats}
                      onChange={(e) => patchRow(o.id, { seats: e.target.value })}
                      placeholder="e.g. Row D seats 34, 35"
                      style={{ width: "100%", padding: "8px 10px", borderRadius: 8, border: "1px solid #3f3f46", background: "#0b0b0c", color: "#fff", fontSize: 14 }}
                    />
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: 12, color: "#a1a1aa", marginBottom: 4 }}>Notes (internal)</label>
                    <input
                      value={r.notes}
                      onChange={(e) => patchRow(o.id, { notes: e.target.value })}
                      placeholder="optional"
                      style={{ width: "100%", padding: "8px 10px", borderRadius: 8, border: "1px solid #3f3f46", background: "#0b0b0c", color: "#fff", fontSize: 14 }}
                    />
                  </div>
                </div>

                {o.email_error && (
                  <div style={{ marginTop: 10, padding: "8px 10px", background: "#3f1d1d", border: "1px solid #7f1d1d", borderRadius: 8, color: "#fecaca", fontSize: 12 }}>
                    Last email error: {o.email_error}
                  </div>
                )}
                {r.message && <div style={{ marginTop: 10, color: "#86efac", fontSize: 12 }}>{r.message}</div>}
                {r.error && <div style={{ marginTop: 10, color: "#fca5a5", fontSize: 12 }}>{r.error}</div>}

                <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
                  <button
                    onClick={() => saveAndEmail(o.id)}
                    disabled={r.saving || r.emailing}
                    style={{ padding: "8px 14px", borderRadius: 8, border: 0, background: "#fff", color: "#000", fontWeight: 600, fontSize: 13, cursor: r.saving || r.emailing ? "wait" : "pointer", opacity: r.saving || r.emailing ? 0.6 : 1 }}
                  >
                    {r.emailing ? "Sending…" : "Save & Email Customer"}
                  </button>
                  <button
                    onClick={() => save(o.id)}
                    disabled={r.saving || r.emailing}
                    style={{ padding: "8px 14px", borderRadius: 8, border: "1px solid #3f3f46", background: "transparent", color: "#fff", fontSize: 13, cursor: r.saving || r.emailing ? "wait" : "pointer", opacity: r.saving || r.emailing ? 0.6 : 1 }}
                  >
                    Save Without Email
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}
