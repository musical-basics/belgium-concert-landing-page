import { gql } from "./_client.mjs";

const EU_MARKET_ID = "gid://shopify/Market/10924720171";
const BELGIUM_MARKET_ID = "gid://shopify/Market/111020867627";
const OLD_EU_CATALOG_ID = "gid://shopify/MarketCatalog/11000840235";
const OUR_CATALOG_ID = "gid://shopify/MarketCatalog/159716507691";

function checkUserErrors(label, errs) {
  if (errs && errs.length > 0) {
    console.error(`userErrors on ${label}:`);
    console.error(JSON.stringify(errs, null, 2));
    process.exit(1);
  }
}

console.log("=== STEP 1: move our catalog from Belgium → EU market ===");
const step1 = await gql(
  `mutation($catalogId: ID!, $add: CatalogContextInput, $remove: CatalogContextInput) {
    catalogContextUpdate(catalogId: $catalogId, contextsToAdd: $add, contextsToRemove: $remove) {
      catalog {
        id title status
        ... on MarketCatalog { markets(first: 10) { nodes { handle name } } }
      }
      userErrors { field message code }
    }
  }`,
  {
    catalogId: OUR_CATALOG_ID,
    add: { marketIds: [EU_MARKET_ID] },
    remove: { marketIds: [BELGIUM_MARKET_ID] },
  }
);
checkUserErrors("catalogContextUpdate", step1.catalogContextUpdate.userErrors);
console.log("our catalog now bound to:", JSON.stringify(step1.catalogContextUpdate.catalog, null, 2));

console.log("\n=== STEP 2: archive old EU USD catalog (keep only ours active) ===");
const step2 = await gql(
  `mutation($id: ID!, $input: CatalogUpdateInput!) {
    catalogUpdate(id: $id, input: $input) {
      catalog { id title status }
      userErrors { field message code }
    }
  }`,
  {
    id: OLD_EU_CATALOG_ID,
    input: { status: "ARCHIVED" },
  }
);
checkUserErrors("catalogUpdate-archive", step2.catalogUpdate.userErrors);
console.log("archived old EU catalog:", JSON.stringify(step2.catalogUpdate.catalog, null, 2));

console.log("\n=== STATE AFTER ===");
const after = await gql(`query {
  eu: market(id: "${EU_MARKET_ID}") {
    handle
    catalogs(first: 10) { nodes { id title status priceList { currency fixedPricesCount } } }
  }
  belgium: market(id: "${BELGIUM_MARKET_ID}") {
    handle
    catalogs(first: 10) { nodes { id title status priceList { currency fixedPricesCount } } }
  }
}`);
console.log("EU market:", JSON.stringify(after.eu, null, 2));
console.log("Belgium market:", JSON.stringify(after.belgium, null, 2));

const count = await gql(`{ productsCount { count } }`);
console.log(`\nproductsCount: ${count.productsCount.count} (baseline 163)`);
