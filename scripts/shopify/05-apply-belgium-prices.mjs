import { gql } from "./_client.mjs";
import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const state = JSON.parse(
  readFileSync(join(process.cwd(), "backups", "market-state.json"), "utf8")
);
const belgium = state.candidates.find((m) => m.handle === "belgium");
if (!belgium) {
  console.error("ERROR: Belgium market not in state.");
  process.exit(1);
}

const STANDARD = state.standardVariantGid;
const VIP = state.vipVariantGid;
const ALLOWLIST = new Set([STANDARD, VIP]);

const before = await gql(`{ productsCount { count } }`);
const beforeCount = before.productsCount.count;
console.log(`baseline productsCount: ${beforeCount}\n`);

function checkUserErrors(label, errs) {
  if (errs && errs.length > 0) {
    console.error(`userErrors on ${label}:`);
    console.error(JSON.stringify(errs, null, 2));
    console.error("STOPPING per CLAUDE.md rule 7.");
    process.exit(1);
  }
}

console.log("=== WRITE 1: priceListCreate (EUR, no catalog yet) ===");
const create = await gql(
  `mutation($input: PriceListCreateInput!) {
    priceListCreate(input: $input) {
      priceList { id name currency }
      userErrors { field message code }
    }
  }`,
  {
    input: {
      name: "Belgium EUR Fixed Prices",
      currency: "EUR",
      parent: { adjustment: { type: "PERCENTAGE_DECREASE", value: 0.0 } },
    },
  }
);
checkUserErrors("priceListCreate", create.priceListCreate.userErrors);
const priceListId = create.priceListCreate.priceList.id;
console.log(`SUCCESS: ${priceListId} (${create.priceListCreate.priceList.currency})\n`);

console.log("=== WRITE 2: catalogCreate (binds price list to Belgium market) ===");
const catRes = await gql(
  `mutation($input: CatalogCreateInput!) {
    catalogCreate(input: $input) {
      catalog { id title status ... on MarketCatalog { markets(first: 10) { nodes { handle } } } }
      userErrors { field message code }
    }
  }`,
  {
    input: {
      title: "Belgium EUR Catalog",
      status: "ACTIVE",
      context: { marketIds: [belgium.id] },
      priceListId,
    },
  }
);
checkUserErrors("catalogCreate", catRes.catalogCreate.userErrors);
const catalogId = catRes.catalogCreate.catalog.id;
console.log(`SUCCESS: ${catalogId} title="${catRes.catalogCreate.catalog.title}" status=${catRes.catalogCreate.catalog.status}`);
console.log(`bound to markets: ${catRes.catalogCreate.catalog.markets?.nodes.map((n) => n.handle).join(",") || "(inspected via priceListId linkage)"}\n`);

async function setFixedPrice(variantId, amount, label) {
  if (!ALLOWLIST.has(variantId)) {
    console.error(`ABORT: variant ${variantId} not in allowlist`);
    process.exit(1);
  }

  const beforeQ = await gql(
    `query($id: ID!) {
      priceList(id: $id) {
        prices(first: 250) {
          nodes { variant { id } price { amount currencyCode } }
        }
      }
    }`,
    { id: priceListId }
  );
  const existing = beforeQ.priceList.prices.nodes.find((p) => p.variant.id === variantId);
  console.log(`  before: ${existing ? `${existing.price.amount} ${existing.price.currencyCode}` : "not in list (FX-derived)"}`);

  const res = await gql(
    `mutation($priceListId: ID!, $prices: [PriceListPriceInput!]!) {
      priceListFixedPricesAdd(priceListId: $priceListId, prices: $prices) {
        prices { variant { id } price { amount currencyCode } }
        userErrors { field message code }
      }
    }`,
    {
      priceListId,
      prices: [{ variantId, price: { amount, currencyCode: "EUR" } }],
    }
  );
  checkUserErrors(label, res.priceListFixedPricesAdd.userErrors);
  const added = res.priceListFixedPricesAdd.prices.find((p) => p.variant.id === variantId);
  console.log(`  after:  ${added.price.amount} ${added.price.currencyCode}`);

  const verify = await gql(
    `query($id: ID!) {
      priceList(id: $id) {
        prices(first: 250) {
          nodes { variant { id } price { amount currencyCode } }
        }
      }
    }`,
    { id: priceListId }
  );
  const persisted = verify.priceList.prices.nodes.find((p) => p.variant.id === variantId);
  if (!persisted || persisted.price.amount !== amount) {
    console.error(`VERIFICATION FAILED: expected ${amount} EUR, got ${JSON.stringify(persisted)}`);
    process.exit(1);
  }
  console.log(`  verified by re-read: ${persisted.price.amount} ${persisted.price.currencyCode}`);
}

console.log("=== WRITE 3: Standard variant → €29.00 ===");
console.log(`variant: ${STANDARD}`);
await setFixedPrice(STANDARD, "29.00", "standard");

console.log("\n=== WRITE 4: VIP variant → €59.00 ===");
console.log(`variant: ${VIP}`);
await setFixedPrice(VIP, "59.00", "vip");

const after = await gql(`{ productsCount { count } }`);
const afterCount = after.productsCount.count;
console.log(`\n=== HEALTH CHECK ===`);
console.log(`productsCount before: ${beforeCount}`);
console.log(`productsCount after:  ${afterCount}`);
if (beforeCount !== afterCount) {
  console.error("MISMATCH");
  process.exit(1);
}
console.log("OK — productsCount unchanged.");

const summary = {
  completedAt: new Date().toISOString(),
  market: { handle: belgium.handle, id: belgium.id, regions: belgium.regions },
  priceListId,
  catalogId,
  writes: [
    { n: 1, op: "priceListCreate", id: priceListId },
    { n: 2, op: "catalogCreate", id: catalogId },
    { n: 3, op: "fixedPrice.standard", variantId: STANDARD, amount: "29.00 EUR" },
    { n: 4, op: "fixedPrice.vip", variantId: VIP, amount: "59.00 EUR" },
  ],
  productsCount: { before: beforeCount, after: afterCount },
};
const ts = new Date().toISOString().replace(/[:.]/g, "-");
writeFileSync(join(process.cwd(), "backups", `apply-summary-${ts}.json`), JSON.stringify(summary, null, 2));

console.log("\n=== DONE ===");
console.log("belgium customers now see: standard €29.00, vip €59.00 (fixed, no FX).");
console.log("all other markets unchanged.");
