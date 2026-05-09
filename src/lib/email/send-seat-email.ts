import { renderHtml, renderSubject, renderText, type SeatEmailVars } from "./seat-email-template";

export type SendResult =
  | { ok: true; id: string | null; dryRun: boolean }
  | { ok: false; error: string; dryRun: boolean };

function isDryRun(): boolean {
  return (process.env.EMAIL_DRY_RUN || "").toLowerCase() === "true";
}

export async function sendSeatEmail(opts: {
  to: string;
  vars: SeatEmailVars;
}): Promise<SendResult> {
  const dryRun = isDryRun();
  const from = process.env.SEAT_EMAIL_FROM || process.env.RESEND_FROM_EMAIL;
  const bcc = process.env.SEAT_EMAIL_BCC;

  if (!from) return { ok: false, error: "missing RESEND_FROM_EMAIL", dryRun };

  const subject = renderSubject();
  const html = renderHtml(opts.vars);
  const text = renderText(opts.vars);

  if (dryRun) {
    console.log("[seat-email DRY RUN]", { to: opts.to, bcc, from, subject });
    console.log(text);
    return { ok: true, id: null, dryRun: true };
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return { ok: false, error: "missing RESEND_API_KEY", dryRun };

  const body: Record<string, unknown> = {
    from,
    to: [opts.to],
    subject,
    html,
    text,
  };
  if (bcc) body.bcc = bcc.split(",").map((s) => s.trim()).filter(Boolean);

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    const json = (await res.json().catch(() => ({}))) as { id?: string; message?: string; name?: string };
    if (!res.ok) {
      return { ok: false, error: json.message || json.name || `resend ${res.status}`, dryRun: false };
    }
    return { ok: true, id: json.id ?? null, dryRun: false };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : String(e), dryRun: false };
  }
}
