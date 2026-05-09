import { NextRequest, NextResponse } from "next/server";
import { verifySession, ORGANIZER_COOKIE } from "@/lib/auth/organizer";

// Gate /seat-assignment/* (except /seat-assignment/login and /seat-assignment/logout).
// Runs on the Node.js runtime (configured below) so node:crypto is available
// for verifySession.
export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;
  if (
    pathname === "/seat-assignment/login" ||
    pathname === "/seat-assignment/logout" ||
    pathname.startsWith("/seat-assignment/_next") ||
    pathname.startsWith("/_next")
  ) {
    return NextResponse.next();
  }
  const token = req.cookies.get(ORGANIZER_COOKIE)?.value;
  const session = verifySession(token);
  if (!session) {
    const url = req.nextUrl.clone();
    url.pathname = "/seat-assignment/login";
    url.search = "";
    return NextResponse.redirect(url);
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/seat-assignment", "/seat-assignment/:path*"],
};
