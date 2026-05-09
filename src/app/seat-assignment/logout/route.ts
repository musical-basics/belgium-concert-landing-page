import { NextResponse } from "next/server";
import { ORGANIZER_COOKIE } from "@/lib/auth/organizer";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function POST() {
  const res = NextResponse.redirect(new URL("/seat-assignment/login", process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"));
  res.cookies.set(ORGANIZER_COOKIE, "", { path: "/", maxAge: 0 });
  return res;
}

export async function GET() {
  return POST();
}
