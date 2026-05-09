import { timingSafeEqual } from "node:crypto";

export function checkAgentBearer(req: Request): boolean {
  const expected = process.env.AGENT_API_SECRET;
  if (!expected) return false;
  const header = req.headers.get("authorization") || req.headers.get("Authorization");
  if (!header) return false;
  const [scheme, token] = header.split(" ");
  if ((scheme || "").toLowerCase() !== "bearer" || !token) return false;
  const a = Buffer.from(token);
  const b = Buffer.from(expected);
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}

export function unauthorized(): Response {
  return new Response(JSON.stringify({ error: "unauthorized" }), {
    status: 401,
    headers: { "Content-Type": "application/json", "WWW-Authenticate": "Bearer" },
  });
}
