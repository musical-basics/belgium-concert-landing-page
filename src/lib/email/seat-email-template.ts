// Bilingual seat assignment email — Dutch on top, English below.
// Hardcoded for the June 11, 2026 Zaventem concert.

export type SeatEmailVars = {
  firstName: string | null;
  assignedSeats: string;
  orderName: string | null;
};

export const EVENT_DATE_NL = "donderdag 11 juni 2026 om 19:30";
export const EVENT_DATE_EN = "Thursday, June 11, 2026 at 19:30";
export const VENUE = "Theaterzaal Maupertuis, CC De Factorij, Zaventem";
export const EVENT_INFO_URL = "https://www.ccdefactorij.be/nl/programma/lionel-yu-klassieke-piano-en-edm/7132/";
export const SUPPORT_EMAIL = "support@musicalbasics.com";

export function renderSubject(): string {
  return "Jouw stoelnummer / Your seat assignment — Lionel Yu, Zaventem";
}

export function renderText(v: SeatEmailVars): string {
  const name = (v.firstName || "").trim();
  const orderRef = v.orderName ? ` (${v.orderName})` : "";
  return [
    `Hallo ${name || "daar"},`,
    "",
    `Bedankt voor je ticketaankoop${orderRef} voor Lionel Yu — Klassieke Piano en EDM`,
    `op ${EVENT_DATE_NL} in ${VENUE}.`,
    "",
    "Jouw toegewezen stoel(en):",
    v.assignedSeats,
    "",
    "Tickets zijn beschikbaar bij de receptie op de dag van het optreden.",
    "Wij raden aan om 15 minuten op voorhand aanwezig te zijn.",
    "",
    `Voor meer informatie over het evenement: ${EVENT_INFO_URL}`,
    `Bij vragen, mail ons op ${SUPPORT_EMAIL}.`,
    "",
    "Tot snel!",
    "Het MusicalBasics Team",
    "",
    "──────────────────────────────",
    "",
    `Hi ${name || "there"},`,
    "",
    `Thank you for your ticket purchase${orderRef} for Lionel Yu — Klassieke Piano en EDM`,
    `on ${EVENT_DATE_EN} at ${VENUE}.`,
    "",
    "Your assigned seat(s):",
    v.assignedSeats,
    "",
    "Tickets will be available at the reception on the day of the venue.",
    "We recommend arriving 15 minutes early.",
    "",
    `For more information regarding the event: ${EVENT_INFO_URL}`,
    `If any questions, please email us at ${SUPPORT_EMAIL}.`,
    "",
    "See you there,",
    "The MusicalBasics Team",
  ].join("\n");
}

export function renderHtml(v: SeatEmailVars): string {
  const name = escapeHtml((v.firstName || "").trim());
  const seats = escapeHtml(v.assignedSeats);
  const orderRef = v.orderName ? ` (${escapeHtml(v.orderName)})` : "";
  return `<!doctype html>
<html><body style="font-family:-apple-system,Segoe UI,Roboto,sans-serif;color:#111;max-width:560px;margin:0 auto;padding:24px;line-height:1.5">
  <p>Hallo ${name || "daar"},</p>
  <p>Bedankt voor je ticketaankoop${orderRef} voor <strong>Lionel Yu — Klassieke Piano en EDM</strong> op ${EVENT_DATE_NL} in ${VENUE}.</p>
  <p style="background:#f4f4f5;border-left:4px solid #111;padding:12px 16px;font-size:18px"><strong>Jouw toegewezen stoel(en):</strong><br>${seats.replace(/\n/g, "<br>")}</p>
  <p>Tickets zijn beschikbaar bij de receptie op de dag van het optreden. Wij raden aan om 15 minuten op voorhand aanwezig te zijn.</p>
  <p>Voor meer informatie over het evenement: <a href="${EVENT_INFO_URL}">${EVENT_INFO_URL}</a><br>Bij vragen, mail ons op <a href="mailto:${SUPPORT_EMAIL}">${SUPPORT_EMAIL}</a>.</p>
  <p>Tot snel!<br>Het MusicalBasics Team</p>
  <hr style="border:none;border-top:1px solid #e5e5e5;margin:32px 0">
  <p>Hi ${name || "there"},</p>
  <p>Thank you for your ticket purchase${orderRef} for <strong>Lionel Yu — Klassieke Piano en EDM</strong> on ${EVENT_DATE_EN} at ${VENUE}.</p>
  <p style="background:#f4f4f5;border-left:4px solid #111;padding:12px 16px;font-size:18px"><strong>Your assigned seat(s):</strong><br>${seats.replace(/\n/g, "<br>")}</p>
  <p>Tickets will be available at the reception on the day of the venue. We recommend arriving 15 minutes early.</p>
  <p>For more information regarding the event: <a href="${EVENT_INFO_URL}">${EVENT_INFO_URL}</a><br>If any questions, please email us at <a href="mailto:${SUPPORT_EMAIL}">${SUPPORT_EMAIL}</a>.</p>
  <p>See you there,<br>The MusicalBasics Team</p>
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
