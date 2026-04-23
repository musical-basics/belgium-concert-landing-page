const domain = process.env.SHOPIFY_STORE_DOMAIN;
const token = process.env.SHOPIFY_ADMIN_API_TOKEN;
const version = process.env.SHOPIFY_API_VERSION;

if (!domain || !token || !version) {
  console.error("missing env: SHOPIFY_STORE_DOMAIN / SHOPIFY_ADMIN_API_TOKEN / SHOPIFY_API_VERSION");
  console.error("run with: node --env-file=.env.local <script>");
  process.exit(1);
}

export const SHOP_DOMAIN = domain;
export const API_VERSION = version;

export async function gql(query, variables = {}) {
  const url = `https://${domain}/admin/api/${version}/graphql.json`;
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Access-Token": token,
    },
    body: JSON.stringify({ query, variables }),
  });
  const json = await res.json();
  if (!res.ok) {
    throw new Error(`HTTP ${res.status}: ${JSON.stringify(json)}`);
  }
  if (json.errors) {
    throw new Error(`GraphQL errors: ${JSON.stringify(json.errors, null, 2)}`);
  }
  return json.data;
}

export async function refreshAccessToken() {
  const clientId = process.env.SHOPIFY_CLIENT_ID;
  const clientSecret = process.env.SHOPIFY_CLIENT_SECRET;
  if (!clientId || !clientSecret) {
    throw new Error("need SHOPIFY_CLIENT_ID and SHOPIFY_CLIENT_SECRET in env to refresh token");
  }
  const res = await fetch(`https://${domain}/admin/oauth/access_token`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      client_id: clientId,
      client_secret: clientSecret,
      grant_type: "client_credentials",
    }),
  });
  const json = await res.json();
  if (!res.ok) throw new Error(`token refresh failed: ${JSON.stringify(json)}`);
  return json;
}
