import { NextResponse } from "next/server";
import { subscribeToEmailerDatabase } from "@dreamplay/emailer/server";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const WORKSPACE = "concert_marketing" as const;
const DEFAULT_TAGS = ["belgium-concert-2026"];

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && email.length <= 254;
}

export async function POST(req: Request) {
  let body: {
    email?: string;
    first_name?: string;
    gdpr_consent?: boolean;
    honeypot?: string;
  };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid_body" }, { status: 400 });
  }

  if (body.honeypot) {
    return NextResponse.json({ ok: true });
  }

  const email = (body.email || "").trim().toLowerCase();
  const firstName = (body.first_name || "").trim().slice(0, 80);

  if (!isValidEmail(email)) {
    return NextResponse.json({ error: "invalid_email" }, { status: 400 });
  }
  if (!body.gdpr_consent) {
    return NextResponse.json({ error: "consent_required" }, { status: 400 });
  }

  const result = await subscribeToEmailerDatabase({
    email,
    first_name: firstName,
    tags: DEFAULT_TAGS,
    workspace: WORKSPACE,
    gdpr_consent: true,
  });

  if (!result.success) {
    console.error("subscribe failed", result.error);
    return NextResponse.json(
      { error: result.error || "subscribe_failed" },
      { status: result.status ?? 502 }
    );
  }

  return NextResponse.json({ ok: true, id: result.id });
}
