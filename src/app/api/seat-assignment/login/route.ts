import { NextResponse } from "next/server";
import { checkOrganizerPassword, signSession, ORGANIZER_COOKIE, ORGANIZER_COOKIE_MAX_AGE } from "@/lib/auth/organizer";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function POST(req: Request) {
  let body: { password?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid_body" }, { status: 400 });
  }
  const password = (body.password || "").trim();
  if (!password || !checkOrganizerPassword(password)) {
    // brief delay to slow brute force
    await new Promise((r) => setTimeout(r, 400));
    return NextResponse.json({ error: "invalid_password" }, { status: 401 });
  }
  const token = signSession("luc");
  const res = NextResponse.json({ ok: true });
  res.cookies.set(ORGANIZER_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: ORGANIZER_COOKIE_MAX_AGE,
  });
  return res;
}
