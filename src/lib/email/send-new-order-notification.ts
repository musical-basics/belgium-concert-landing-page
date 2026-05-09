// Internal notification email — sent to organizers when a new Belgium concert
// order arrives via Shopify webhook. Different from the customer-facing seat
// email; this one tells Lionel/Luc "a new order needs seats assigned".

export type NewOrderVars = {
  orderName: string | null;
  customerFirstName: string | null;
  customerLastName: string | null;
  customerEmail: string;
  ticketQuantity: number;
  ticketType: string | null;
};

function renderSubject(v: NewOrderVars): string {
  const name = `${(v.customerFirstName || "").trim()} ${(v.customerLastName || "").trim()}`.trim() || v.customerEmail;
  return `New Belgium ticket order: ${v.orderName || "(no #)"} — ${v.ticketQuantity}× ${v.ticketType || "ticket"} — ${name}`;
}

function renderText(v: NewOrderVars): string {
  const name = `${(v.customerFirstName || "").trim()} ${(v.customerLastName || "").trim()}`.trim() || "(no name)";
  return [
    `A new Belgium concert ticket order has arrived.`,
    ``,
    `Order:    ${v.orderName || "(no #)"}`,
    `Customer: ${name}`,
    `Email:    ${v.customerEmail}`,
    `Tickets:  ${v.ticketQuantity}× ${v.ticketType || "ticket"}`,
    ``,
    `Assign seats and email the customer here:`,
    `https://belgium.musicalbasics.com/seat-assignment`,
  ].join("\n");
}

function renderHtml(v: NewOrderVars): string {
  const name = escapeHtml(`${(v.customerFirstName || "").trim()} ${(v.customerLastName || "").trim()}`.trim() || "(no name)");
  return `<!doctype html>
<html><body style="font-family:-apple-system,Segoe UI,Roboto,sans-serif;color:#111;max-width:520px;margin:0 auto;padding:24px;line-height:1.5">
  <p>A new Belgium concert ticket order has arrived.</p>
  <table style="border-collapse:collapse;margin:16px 0;font-size:14px">
    <tr><td style="padding:4px 12px 4px 0;color:#666">Order</td><td style="padding:4px 0"><strong>${escapeHtml(v.orderName || "(no #)")}</strong></td></tr>
    <tr><td style="padding:4px 12px 4px 0;color:#666">Customer</td><td style="padding:4px 0">${name}</td></tr>
    <tr><td style="padding:4px 12px 4px 0;color:#666">Email</td><td style="padding:4px 0">${escapeHtml(v.customerEmail)}</td></tr>
    <tr><td style="padding:4px 12px 4px 0;color:#666">Tickets</td><td style="padding:4px 0">${v.ticketQuantity}× ${escapeHtml(v.ticketType || "ticket")}</td></tr>
  </table>
  <p><a href="https://belgium.musicalbasics.com/seat-assignment" style="display:inline-block;background:#111;color:#fff;padding:10px 18px;border-radius:8px;text-decoration:none;font-weight:600">Assign seats →</a></p>
</body></html>`;
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export type NotifyResult =
  | { ok: true; id: string | null; skipped?: false }
  | { ok: true; skipped: true }
  | { ok: false; error: string };

export async function sendNewOrderNotification(vars: NewOrderVars): Promise<NotifyResult> {
  const recipientsRaw = process.env.SEAT_NEW_ORDER_NOTIFY;
  if (!recipientsRaw || !recipientsRaw.trim()) {
    return { ok: true, skipped: true };
  }
  const to = recipientsRaw.split(",").map((s) => s.trim()).filter(Boolean);
  if (to.length === 0) return { ok: true, skipped: true };

  const dryRun = (process.env.EMAIL_DRY_RUN || "").toLowerCase() === "true";
  const from = process.env.SEAT_EMAIL_FROM || process.env.RESEND_FROM_EMAIL;
  if (!from) return { ok: false, error: "missing RESEND_FROM_EMAIL" };

  const subject = renderSubject(vars);
  const html = renderHtml(vars);
  const text = renderText(vars);

  if (dryRun) {
    console.log("[new-order-notify DRY RUN]", { to, from, subject });
    return { ok: true, id: null };
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return { ok: false, error: "missing RESEND_API_KEY" };

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ from, to, subject, html, text }),
    });
    const json = (await res.json().catch(() => ({}))) as { id?: string; message?: string; name?: string };
    if (!res.ok) {
      return { ok: false, error: json.message || json.name || `resend ${res.status}` };
    }
    return { ok: true, id: json.id ?? null };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : String(e) };
  }
}
