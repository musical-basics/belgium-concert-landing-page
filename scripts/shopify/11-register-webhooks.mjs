// Register Shopify webhooks for the seat-assignment workflow.
//
// Usage:
//   node --env-file=.env.local scripts/shopify/11-register-webhooks.mjs
//
// Required env (already in .env.local):
//   SHOPIFY_STORE_DOMAIN, SHOPIFY_ADMIN_API_TOKEN, SHOPIFY_API_VERSION
//
// Optional env:
//   WEBHOOK_CALLBACK_BASE_URL  defaults to https://belgium.musicalbasics.com
//
// After running, copy the printed `SHOPIFY_WEBHOOK_SECRET` into .env.local
// (and Vercel env vars). The same secret is reused for all topics.

import { gql, SHOP_DOMAIN } from "./_client.mjs";

const BASE = process.env.WEBHOOK_CALLBACK_BASE_URL || "https://belgium.musicalbasics.com";
const CALLBACK = `${BASE}/api/webhooks/shopify/orders`;

const TOPICS = ["ORDERS_CREATE", "ORDERS_PAID", "ORDERS_CANCELLED", "REFUNDS_CREATE"];

console.log(`store:    ${SHOP_DOMAIN}`);
console.log(`callback: ${CALLBACK}`);
console.log(`topics:   ${TOPICS.join(", ")}\n`);

// 1. List existing subscriptions so we can avoid duplicates.
const existing = await gql(`{
  webhookSubscriptions(first: 100) {
    edges { node { id topic callbackUrl: endpoint { __typename ... on WebhookHttpEndpoint { callbackUrl } } } }
  }
}`);

const have = new Map();
for (const edge of existing.webhookSubscriptions.edges) {
  const cb = edge.node.callbackUrl?.callbackUrl;
  if (cb === CALLBACK) have.set(edge.node.topic, edge.node.id);
}

// 2. Create any missing ones.
for (const topic of TOPICS) {
  if (have.has(topic)) {
    console.log(`✓ ${topic} already registered (${have.get(topic)})`);
    continue;
  }
  const res = await gql(
    `mutation create($topic: WebhookSubscriptionTopic!, $sub: WebhookSubscriptionInput!) {
      webhookSubscriptionCreate(topic: $topic, webhookSubscription: $sub) {
        webhookSubscription { id topic }
        userErrors { field message }
      }
    }`,
    {
      topic,
      sub: { callbackUrl: CALLBACK, format: "JSON" },
    }
  );
  const out = res.webhookSubscriptionCreate;
  if (out.userErrors.length > 0) {
    console.error(`✗ ${topic} failed:`, out.userErrors);
    process.exit(1);
  }
  console.log(`+ ${topic} registered (${out.webhookSubscription.id})`);
}

// 3. Print the shared webhook secret. Shopify sets this once per app/store
//    in Settings → Notifications → Webhooks ("Webhook signing secret").
console.log("\nNext steps:");
console.log("1. Visit Shopify admin → Settings → Notifications → Webhooks.");
console.log("   Copy the 'Webhook signing secret' (single value, shared by all topics).");
console.log("2. Set SHOPIFY_WEBHOOK_SECRET=<that value> in .env.local AND in Vercel env vars.");
console.log("3. Redeploy (push any change to main) so Vercel picks up the new env var.");
