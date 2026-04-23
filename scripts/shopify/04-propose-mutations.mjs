import { readFileSync } from "node:fs";
import { join } from "node:path";

const state = JSON.parse(
  readFileSync(join(process.cwd(), "backups", "market-state.json"), "utf8")
);

const belgium = state.candidates.find((m) => m.handle === "belgium");
if (!belgium) {
  console.error("ERROR: Belgium market not found in state. Re-run 03 first.");
  process.exit(1);
}

console.log("=== PROPOSED MUTATIONS (DRY RUN — NOTHING EXECUTED) ===\n");

console.log("WRITE 1 of 3: create EUR price list bound to Belgium market");
console.log("------------------------------------------------------------");
console.log(`mutation:
  priceListCreate(input: {
    name: "Belgium EUR Fixed Prices",
    currency: EUR,
    contextRule: { marketId: "${belgium.id}" },
    parent: { adjustment: { type: PERCENTAGE_DECREASE, value: 0.0 } }
  }) {
    priceList { id name currency }
    userErrors { field message code }
  }`);
console.log(`\nresulting priceList.id will be used for writes 2 and 3.\n`);

console.log("WRITE 2 of 3: set €29.00 fixed price for Standard variant");
console.log("------------------------------------------------------------");
console.log(`mutation:
  priceListFixedPricesUpdate(
    priceListId: "<priceListId from WRITE 1>",
    pricesToAdd: [{
      variantId: "${state.standardVariantGid}",
      price: { amount: "29.00", currencyCode: EUR }
    }]
  ) {
    pricesAdded { variant { id } price { amount currencyCode } }
    userErrors { field message code }
  }`);
console.log();

console.log("WRITE 3 of 3: set €59.00 fixed price for VIP variant");
console.log("------------------------------------------------------------");
console.log(`mutation:
  priceListFixedPricesUpdate(
    priceListId: "<priceListId from WRITE 1>",
    pricesToAdd: [{
      variantId: "${state.vipVariantGid}",
      price: { amount: "59.00", currencyCode: EUR }
    }]
  ) {
    pricesAdded { variant { id } price { amount currencyCode } }
    userErrors { field message code }
  }`);
console.log();

console.log("=== SUMMARY ===");
console.log(`target market:   [belgium] ${belgium.name} (${belgium.id})`);
console.log(`regions covered: ${belgium.regions.join(", ")}`);
console.log(`new price list:  "Belgium EUR Fixed Prices" in EUR`);
console.log(`standard:        USD $33.00 (base, FX-converted) → EUR €29.00 (fixed, Belgium only)`);
console.log(`vip:             USD $65.00 (base, FX-converted) → EUR €59.00 (fixed, Belgium only)`);
console.log();
console.log("all other markets (US, EU, Canada, UK, etc.) remain unchanged.");
console.log("\nno writes executed. say 'go' to apply write 1 (priceListCreate).");
