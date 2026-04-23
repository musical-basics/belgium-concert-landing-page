import { gql } from "./_client.mjs";

const ACTIVE_CATALOG_ID = "gid://shopify/MarketCatalog/159716507691";
const ACTIVE_PRICE_LIST_ID = "gid://shopify/PriceList/18476171307";
const ARCHIVED_EU_CATALOG_ID = "gid://shopify/MarketCatalog/11000840235";
const ORPHANED_USD_PRICE_LIST_ID = "gid://shopify/PriceList/18473549867";
const BELGIUM_MARKET_ID = "gid://shopify/Market/111020867627";

function checkUserErrors(label, errs) {
  if (errs && errs.length > 0) {
    console.error(`userErrors on ${label}:`);
    console.error(JSON.stringify(errs, null, 2));
    process.exit(1);
  }
}

const before = await gql(`{ productsCount { count } }`);
console.log(`baseline productsCount: ${before.productsCount.count}\n`);

console.log("=== RENAME 1: catalog title ===");
const r1 = await gql(
  `mutation($id: ID!, $input: CatalogUpdateInput!) {
    catalogUpdate(id: $id, input: $input) {
      catalog { id title status }
      userErrors { field message code }
    }
  }`,
  { id: ACTIVE_CATALOG_ID, input: { title: "EU EUR Catalog" } }
);
checkUserErrors("catalogUpdate rename", r1.catalogUpdate.userErrors);
console.log("renamed:", JSON.stringify(r1.catalogUpdate.catalog, null, 2));

console.log("\n=== RENAME 2: price list name ===");
const r2 = await gql(
  `mutation($id: ID!, $input: PriceListUpdateInput!) {
    priceListUpdate(id: $id, input: $input) {
      priceList { id name currency }
      userErrors { field message code }
    }
  }`,
  { id: ACTIVE_PRICE_LIST_ID, input: { name: "EU EUR Fixed Prices" } }
);
checkUserErrors("priceListUpdate rename", r2.priceListUpdate.userErrors);
console.log("renamed:", JSON.stringify(r2.priceListUpdate.priceList, null, 2));

console.log("\n=== DELETE 1: archived EU catalog (+ dependent price list) ===");
const r3 = await gql(
  `mutation($id: ID!, $dep: Boolean) {
    catalogDelete(id: $id, deleteDependentResources: $dep) {
      deletedId
      userErrors { field message code }
    }
  }`,
  { id: ARCHIVED_EU_CATALOG_ID, dep: true }
);
checkUserErrors("catalogDelete archived", r3.catalogDelete.userErrors);
console.log("deleted catalog id:", r3.catalogDelete.deletedId);

console.log("\n=== DELETE 2: old USD price list (in case dependent cleanup missed it) ===");
const r4 = await gql(
  `mutation($id: ID!) {
    priceListDelete(id: $id) {
      deletedId
      userErrors { field message code }
    }
  }`,
  { id: ORPHANED_USD_PRICE_LIST_ID }
);
// If the catalogDelete cascade already removed it, this may return userErrors — tolerate it
if (r4.priceListDelete.userErrors.length > 0) {
  console.log("priceListDelete userErrors (likely already removed by cascade):");
  console.log(JSON.stringify(r4.priceListDelete.userErrors, null, 2));
} else {
  console.log("deleted price list id:", r4.priceListDelete.deletedId);
}

console.log("\n=== DELETE 3: empty Belgium market ===");
const r5 = await gql(
  `mutation($id: ID!) {
    marketDelete(id: $id) {
      deletedId
      userErrors { field message code }
    }
  }`,
  { id: BELGIUM_MARKET_ID }
);
checkUserErrors("marketDelete Belgium", r5.marketDelete.userErrors);
console.log("deleted market id:", r5.marketDelete.deletedId);

const after = await gql(`{ productsCount { count } }`);
console.log(`\n=== HEALTH CHECK ===`);
console.log(`productsCount before: ${before.productsCount.count}`);
console.log(`productsCount after:  ${after.productsCount.count}`);
if (before.productsCount.count !== after.productsCount.count) {
  console.error("MISMATCH");
  process.exit(1);
}
console.log("OK — productsCount unchanged.");

console.log("\n=== VERIFY EU market final state ===");
const v = await gql(
  `query {
    market(id: "gid://shopify/Market/10924720171") {
      handle name
      catalogs(first: 10) { nodes { id title status priceList { id name currency fixedPricesCount } } }
    }
  }`
);
console.log(JSON.stringify(v.market, null, 2));

console.log("\n=== DONE ===");
