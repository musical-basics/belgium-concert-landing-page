import { gql } from "./_client.mjs";
import { writeFileSync } from "node:fs";
import { join } from "node:path";

const STANDARD_GID = "gid://shopify/ProductVariant/43946996957227";
const VIP_GID = "gid://shopify/ProductVariant/43962297974827";

const marketsData = await gql(`{
  markets(first: 50) {
    nodes {
      id
      name
      handle
      enabled
      primary
      regions(first: 50) {
        nodes {
          ... on MarketRegionCountry { code name }
        }
      }
      catalogs(first: 20) {
        nodes {
          id
          status
          priceList {
            id
            name
            currency
            fixedPricesCount
          }
        }
      }
    }
  }
}`);

console.log("=== MARKETS ===\n");
const candidates = [];
for (const m of marketsData.markets.nodes) {
  const regions = m.regions.nodes.map((r) => r.code).filter(Boolean);
  console.log(`[${m.handle}] ${m.name}${m.primary ? " (PRIMARY)" : ""} enabled=${m.enabled}`);
  console.log(`  id: ${m.id}`);
  console.log(`  regions: ${regions.join(", ") || "(none)"}`);
  for (const cat of m.catalogs.nodes) {
    const pl = cat.priceList;
    console.log(`  catalog ${cat.id} status=${cat.status}`);
    if (pl) {
      console.log(`    priceList: ${pl.id} name="${pl.name}" currency=${pl.currency} fixedPrices=${pl.fixedPricesCount}`);
    }
  }
  const coversBelgium = regions.includes("BE");
  const hasEurPriceList = m.catalogs.nodes.some((c) => c.priceList?.currency === "EUR");
  if (coversBelgium || m.handle === "belgium" || hasEurPriceList) {
    candidates.push(m);
  }
  console.log();
}

console.log("=== BELGIUM-RELEVANT CANDIDATES ===\n");
if (candidates.length === 0) {
  console.log("no market covers Belgium (BE) and no EUR price list found.");
} else {
  for (const m of candidates) {
    console.log(`- [${m.handle}] ${m.name}`);
    for (const cat of m.catalogs.nodes) {
      if (cat.priceList) {
        console.log(`    catalog=${cat.id} priceList=${cat.priceList.id} (${cat.priceList.currency})`);
      }
    }
  }
}

const eurCandidates = candidates
  .flatMap((m) =>
    m.catalogs.nodes
      .filter((c) => c.priceList?.currency === "EUR")
      .map((c) => ({ market: m, catalog: c, priceList: c.priceList }))
  );

console.log("\n=== EUR PRICE LISTS ON BELGIUM-COVERING MARKETS ===\n");
if (eurCandidates.length === 0) {
  console.log("none. will need to create one OR attach one to the Belgium-covering market.");
} else {
  for (const c of eurCandidates) {
    console.log(`  priceList=${c.priceList.id} name="${c.priceList.name}" market=[${c.market.handle}]`);
  }
}

console.log("\n=== CURRENT FIXED PRICES FOR ALLOWLISTED VARIANTS ===\n");
for (const ec of eurCandidates) {
  const res = await gql(
    `query($id: ID!) {
      priceList(id: $id) {
        id
        name
        prices(first: 250) {
          nodes {
            variant { id }
            price { amount currencyCode }
            compareAtPrice { amount currencyCode }
          }
        }
      }
    }`,
    { id: ec.priceList.id }
  );
  const prices = res.priceList.prices.nodes;
  const std = prices.find((p) => p.variant.id === STANDARD_GID);
  const vip = prices.find((p) => p.variant.id === VIP_GID);
  console.log(`priceList "${ec.priceList.name}" (${ec.priceList.id}):`);
  console.log(`  standard: ${std ? `${std.price.amount} ${std.price.currencyCode} (FIXED)` : "not in list — FX conversion applies"}`);
  console.log(`  vip:      ${vip ? `${vip.price.amount} ${vip.price.currencyCode} (FIXED)` : "not in list — FX conversion applies"}`);
}

const state = {
  inspectedAt: new Date().toISOString(),
  standardVariantGid: STANDARD_GID,
  vipVariantGid: VIP_GID,
  candidates: candidates.map((m) => ({
    handle: m.handle,
    name: m.name,
    id: m.id,
    regions: m.regions.nodes.map((r) => r.code).filter(Boolean),
    catalogs: m.catalogs.nodes.map((c) => ({
      id: c.id,
      status: c.status,
      priceList: c.priceList,
    })),
  })),
  eurPriceLists: eurCandidates.map((c) => ({
    marketHandle: c.market.handle,
    priceListId: c.priceList.id,
    priceListName: c.priceList.name,
  })),
};
writeFileSync(
  join(process.cwd(), "backups", "market-state.json"),
  JSON.stringify(state, null, 2)
);
console.log(`\nstate written to backups/market-state.json for 04 to consume.`);
