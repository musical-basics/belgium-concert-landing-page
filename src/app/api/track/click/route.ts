import { createEmailClickTrackingHandler } from "@dreamplay/emailer/tracking-server";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export const GET = createEmailClickTrackingHandler();
