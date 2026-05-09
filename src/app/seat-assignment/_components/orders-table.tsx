"use client";

import { useMemo, useState, useTransition } from "react";
import type { TicketOrder, SeatStatus } from "@/lib/db/tickets";
import { saveSeatsAction, saveAndEmailAction, logoutAction, deleteOrderAction } from "../actions";

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

export default function OrdersTable({ orders }: { orders: TicketOrder[] }) {
  const [filter, setFilter] = useState<SeatStatus | null>(null);

  const counts = useMemo(() => {
    const c: Record<SeatStatus, number> = { pending: 0, assigned: 0, emailed: 0, error: 0, cancelled: 0 };
    for (const o of orders) c[o.seat_status]++;
    return c;
  }, [orders]);

  const sorted = useMemo(() => {
    const filtered = filter ? orders.filter((o) => o.seat_status === filter) : orders;
    const order: Record<SeatStatus, number> = { pending: 0, assigned: 1, error: 2, emailed: 3, cancelled: 4 };
    return [...filtered].sort((a, b) => {
      if (order[a.seat_status] !== order[b.seat_status]) return order[a.seat_status] - order[b.seat_status];
      return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
    });
  }, [orders, filter]);

  return (
    <main style={{ minHeight: "100vh", background: "#0b0b0c", color: "#f4f4f5", fontFamily: "-apple-system,Segoe UI,Roboto,sans-serif", padding: "24px 16px 80px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <header style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 24, gap: 16 }}>
          <div>
            <h1 style={{ fontSize: 24, fontWeight: 600, margin: 0 }}>Seat Assignments</h1>
            <p style={{ color: "#a1a1aa", marginTop: 4, fontSize: 14 }}>Lionel Yu · CC De Factorij, Zaventem · 11 June 2026, 19:30</p>
          </div>
          <form action={logoutAction}>
            <button type="submit" style={{ background: "transparent", border: 0, color: "#a1a1aa", fontSize: 13, textDecoration: "underline", cursor: "pointer", padding: 0 }}>
              Sign out
            </button>
          </form>
        </header>

        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 20, alignItems: "center" }}>
          <button
            onClick={() => setFilter(null)}
            style={{
              padding: "4px 10px",
              borderRadius: 999,
              background: filter === null ? "#fff" : "#17171a",
              color: filter === null ? "#000" : "#f4f4f5",
              border: "1px solid #2a2a2e",
              fontSize: 12,
              fontWeight: filter === null ? 600 : 400,
              cursor: "pointer",
            }}
          >
            All: <strong>{orders.length}</strong>
          </button>
          {(["pending", "assigned", "emailed", "error", "cancelled"] as SeatStatus[]).map((s) => {
            const active = filter === s;
            return (
              <button
                key={s}
                onClick={() => setFilter(active ? null : s)}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                  padding: "4px 10px",
                  borderRadius: 999,
                  background: active ? STATUS_COLOR[s] : "#17171a",
                  color: active ? "#000" : "#f4f4f5",
                  border: `1px solid ${active ? STATUS_COLOR[s] : "#2a2a2e"}`,
                  fontSize: 12,
                  fontWeight: active ? 600 : 400,
                  cursor: "pointer",
                }}
              >
                <span style={{ width: 8, height: 8, borderRadius: 999, background: active ? "#000" : STATUS_COLOR[s] }} />
                {STATUS_LABEL[s]}: <strong>{counts[s]}</strong>
              </button>
            );
          })}
        </div>

        {sorted.length === 0 && (
          <div style={{ background: "#17171a", border: "1px solid #2a2a2e", borderRadius: 12, padding: 32, textAlign: "center", color: "#a1a1aa" }}>
            {filter
              ? `No orders with status "${STATUS_LABEL[filter]}". Click "All" to clear the filter.`
              : "No orders yet. They will appear here automatically when Shopify webhooks fire."}
          </div>
        )}

        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {sorted.map((o) => (
            <OrderRow key={o.id} order={o} />
          ))}
        </div>
      </div>
    </main>
  );
}

function OrderRow({ order: o }: { order: TicketOrder }) {
  const [seats, setSeats] = useState(o.assigned_seats || "");
  const [notes, setNotes] = useState(o.organizer_notes || "");
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  function buildFormData(extra?: Record<string, string>): FormData {
    const fd = new FormData();
    fd.set("seats", seats);
    fd.set("notes", notes);
    if (extra) for (const [k, v] of Object.entries(extra)) fd.set(k, v);
    return fd;
  }

  function onSave() {
    setMessage(null);
    setError(null);
    startTransition(async () => {
      const result = await saveSeatsAction(o.id, buildFormData());
      if (result.ok) setMessage("Saved.");
      else setError(result.error);
    });
  }

  function onSaveAndEmail() {
    setMessage(null);
    setError(null);
    if (!seats.trim()) {
      setError("Enter seat numbers first.");
      return;
    }
    startTransition(async () => {
      let result = await saveAndEmailAction(o.id, buildFormData());
      if (!result.ok && result.needsConfirm) {
        const ok = window.confirm(
          `This customer was already emailed. Re-send updated seats to ${o.customer_email}?`
        );
        if (!ok) {
          setError("Re-send cancelled.");
          return;
        }
        result = await saveAndEmailAction(o.id, buildFormData({ confirmResend: "true" }));
      }
      if (result.ok) {
        setMessage(result.dryRun ? "Dry-run send (no email actually sent)." : "Email sent.");
      } else {
        setError(result.error);
      }
    });
  }

  function onDelete() {
    const label = `${o.shopify_order_name || `#${o.shopify_order_id}`} — ${o.customer_email}`;
    const ok = window.confirm(
      `Permanently delete this order from the dashboard?\n\n${label}\n\nThis only removes it from the seat-assignment dashboard. The Shopify order itself is NOT touched.`
    );
    if (!ok) return;
    setMessage(null);
    setError(null);
    startTransition(async () => {
      const result = await deleteOrderAction(o.id);
      if (!result.ok) setError(result.error);
      // On success the page revalidates and this row will disappear.
    });
  }

  return (
    <div style={{ background: "#17171a", border: "1px solid #2a2a2e", borderRadius: 12, padding: 16 }}>
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
            value={seats}
            onChange={(e) => setSeats(e.target.value)}
            placeholder="e.g. Row D seats 34, 35"
            style={{ width: "100%", padding: "8px 10px", borderRadius: 8, border: "1px solid #3f3f46", background: "#0b0b0c", color: "#fff", fontSize: 14 }}
          />
        </div>
        <div>
          <label style={{ display: "block", fontSize: 12, color: "#a1a1aa", marginBottom: 4 }}>Notes (internal)</label>
          <input
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
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
      {message && <div style={{ marginTop: 10, color: "#86efac", fontSize: 12 }}>{message}</div>}
      {error && <div style={{ marginTop: 10, color: "#fca5a5", fontSize: 12 }}>{error}</div>}

      <div style={{ display: "flex", gap: 8, marginTop: 12, alignItems: "center" }}>
        <button
          onClick={onSaveAndEmail}
          disabled={pending}
          style={{ padding: "8px 14px", borderRadius: 8, border: 0, background: "#fff", color: "#000", fontWeight: 600, fontSize: 13, cursor: pending ? "wait" : "pointer", opacity: pending ? 0.6 : 1 }}
        >
          {pending ? "Working…" : "Save & Email Customer"}
        </button>
        <button
          onClick={onSave}
          disabled={pending}
          style={{ padding: "8px 14px", borderRadius: 8, border: "1px solid #3f3f46", background: "transparent", color: "#fff", fontSize: 13, cursor: pending ? "wait" : "pointer", opacity: pending ? 0.6 : 1 }}
        >
          Save Without Email
        </button>
        <button
          onClick={onDelete}
          disabled={pending}
          title="Remove this order from the dashboard (does NOT affect Shopify)"
          style={{ marginLeft: "auto", padding: "8px 12px", borderRadius: 8, border: "1px solid #3f1d1d", background: "transparent", color: "#fca5a5", fontSize: 12, cursor: pending ? "wait" : "pointer", opacity: pending ? 0.6 : 1 }}
        >
          Delete
        </button>
      </div>
    </div>
  );
}
