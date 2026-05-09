import { createHmac, timingSafeEqual, randomBytes } from "node:crypto";

const COOKIE_NAME = "organizer_session";
const COOKIE_MAX_AGE = 60 * 60 * 12; // 12h

export const ORGANIZER_COOKIE = COOKIE_NAME;
export const ORGANIZER_COOKIE_MAX_AGE = COOKIE_MAX_AGE;

function secret(): string {
  const s = process.env.ORGANIZER_SESSION_SECRET;
  if (!s || s.length < 16) throw new Error("ORGANIZER_SESSION_SECRET is missing or too short");
  return s;
}

export function checkOrganizerPassword(input: string): boolean {
  const expected = process.env.ORGANIZER_PASSWORD;
  if (!expected) return false;
  const a = Buffer.from(input);
  const b = Buffer.from(expected);
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}

export function signSession(actor: string = "luc"): string {
  const issuedAt = Date.now();
  const nonce = randomBytes(8).toString("hex");
  const payload = `${actor}.${issuedAt}.${nonce}`;
  const sig = createHmac("sha256", secret()).update(payload).digest("hex");
  return `${payload}.${sig}`;
}

export function verifySession(token: string | undefined | null): { actor: string } | null {
  if (!token) return null;
  const parts = token.split(".");
  if (parts.length !== 4) return null;
  const [actor, issuedAtStr, nonce, sig] = parts;
  const payload = `${actor}.${issuedAtStr}.${nonce}`;
  const expected = createHmac("sha256", secret()).update(payload).digest("hex");
  const a = Buffer.from(sig);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !timingSafeEqual(a, b)) return null;
  const issuedAt = Number(issuedAtStr);
  if (!Number.isFinite(issuedAt)) return null;
  if (Date.now() - issuedAt > COOKIE_MAX_AGE * 1000) return null;
  return { actor };
}
