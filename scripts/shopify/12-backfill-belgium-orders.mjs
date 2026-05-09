// Backfill existing Belgium-concert orders (placed BEFORE webhooks were set up)
// into the concert_tickets.ticket_orders table.
//
// Usage:
//   node --env-file=.env.local scripts/shopify/12-backfill-belgium-orders.mjs           # dry-run
//   node --env-file=.env.local scripts/shopify/12-backfill-belgium-orders.mjs --apply   # actually push
//
// Strategy: replay each matching order as a signed webhook POST to the prod
// endpoint. Re-uses all the existing handler logic; idempotent on shopify_order_id.

import crypto from "node:crypto";

const APPLY = process.argv.includes("--apply");
const STANDARD = "43946996957227";
const VIP = "43962297974827";
const ALLOWED = new Set([STANDARD, VIP]);

const domain = process.env.SHOPIFY_STORE_DOMAIN;
const token = process.env.SHOPIFY_ADMIN_API_TOKEN;
const version = process.env.SHOPIFY_API_VERSION || "2025-10";
const webhookSecret = process.env.SHOPIFY_WEBHOOK_SECRET;
const webhookUrl =
  process.env.WEBHOOK_BACKFILL_URL ||
  "https://belgium.musicalbasics.com/api/webhooks/shopify/orders";

if (!domain || !token || !webhookSecret) {
  console.error(
    "missing env: SHOPIFY_STORE_DOMAIN / SHOPIFY_ADMIN_API_TOKEN / SHOPIFY_WEBHOOK_SECRET"
  );
  process.exit(1);
}

console.log(`mode:       ${APPLY ? "APPLY" : "DRY-RUN"}`);
console.log(`store:      ${domain}`);
console.log(`webhook:    ${webhookUrl}`);
console.log(`variants:   STANDARD=${STANDARD}, VIP=${VIP}`);
console.log("");

// 1. Fetch recent orders via REST.
const url = `https://${domain}/admin/api/${version}/orders.json?status=any&limit=250&fields=id,name,email,customer,customer_locale,line_items,financial_status,cancelled_at,refunds,created_at`;
const res = await fetch(url, {
  headers: { "X-Shopify-Access-Token": token, "Content-Type": "application/json" },
});
if (!res.ok) {
  console.error(`shopify ${res.status}: ${await res.text()}`);
  process.exit(1);
}
const { orders } = await res.json();
console.log(`fetched ${orders.length} orders from Shopify\n`);

// 2. Filter to those containing Belgium concert variants.
const matching = orders.filter((o) =>
  (o.line_items || []).some((li) => ALLOWED.has(String(li.variant_id)))
);
console.log(`${matching.length} contain a Belgium concert variant:\n`);

for (const o of matching) {
  const items = (o.line_items || [])
    .filter((li) => ALLOWED.has(String(li.variant_id)))
    .map((li) => `${li.quantity}× ${li.title}`)
    .join(", ");
  const customer = o.customer || {};
  const name = `${customer.first_name || ""} ${customer.last_name || ""}`.trim();
  console.log(
    `  ${o.name.padEnd(8)}  ${(name || "(no name)").padEnd(28)}  ${(o.email || customer.email || "(no email)").padEnd(36)}  [${items}]  status=${o.financial_status}`
  );
}

if (!APPLY) {
  console.log("\n(dry-run only — re-run with --apply to backfill)");
  process.exit(0);
}

// 3. Replay each as a signed webhook.
console.log("\n--- replaying as webhooks ---");
let okCount = 0;
let failCount = 0;
for (const order of matching) {
  const body = JSON.stringify(order);
  const hmac = crypto.createHmac("sha256", webhookSecret).update(body, "utf8").digest("base64");
  const r = await fetch(webhookUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Hmac-Sha256": hmac,
      "X-Shopify-Topic": "orders/create",
    },
    body,
  });
  const json = await r.json().catch(() => ({}));
  if (r.ok) {
    console.log(`  ✓ ${order.name} → ${json.isNew ? "new row" : "updated"}  id=${json.id || "(skipped)"}`);
    okCount++;
  } else {
    console.log(`  ✗ ${order.name} → HTTP ${r.status}  ${JSON.stringify(json)}`);
    failCount++;
  }
}
console.log(`\ndone: ${okCount} ok, ${failCount} failed`);
