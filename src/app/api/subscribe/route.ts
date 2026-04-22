import { NextResponse } from "next/server";

const UPSTREAM =
  process.env.EMAIL_SERVICE_URL ||
  "https://email.dreamplaypianos.com/api/webhooks/subscribe";
const UPSTREAM_TOKEN = process.env.EMAIL_SERVICE_TOKEN;
const WORKSPACE = process.env.EMAIL_SERVICE_WORKSPACE || "concert_marketing";
const TAG = process.env.EMAIL_SERVICE_TAG || "belgium-concert-2026";

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

  const payload = {
    email,
    first_name: firstName,
    tags: [TAG],
    workspace: WORKSPACE,
    gdpr_consent: true,
  };

  try {
    const upstream = await fetch(UPSTREAM, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        ...(UPSTREAM_TOKEN ? { authorization: `Bearer ${UPSTREAM_TOKEN}` } : {}),
      },
      body: JSON.stringify(payload),
    });

    if (!upstream.ok) {
      const text = await upstream.text().catch(() => "");
      console.error("subscribe upstream failed", upstream.status, text);
      return NextResponse.json({ error: "upstream_failed" }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("subscribe upstream error", err);
    return NextResponse.json({ error: "upstream_error" }, { status: 502 });
  }
}
