import { gql } from "./_client.mjs";

const EU_PRICE_LIST_ID = "gid://shopify/PriceList/18476171307";

function checkUserErrors(label, errs) {
  if (errs && errs.length > 0) {
    console.error(`userErrors on ${label}:`);
    console.error(JSON.stringify(errs, null, 2));
    process.exit(1);
  }
}

const before = await gql(`{ productsCount { count } }`);
console.log(`baseline productsCount: ${before.productsCount.count}\n`);

console.log("=== STEP 1: productCreate ===");
const createRes = await gql(
  `mutation($input: ProductInput!) {
    productCreate(input: $input) {
      product {
        id
        title
        status
        vendor
        productType
        variants(first: 10) {
          nodes {
            id
            title
            price
            compareAtPrice
            inventoryPolicy
            taxable
            inventoryItem { id requiresShipping tracked }
          }
        }
      }
      userErrors { field message }
    }
  }`,
  {
    input: {
      title: "Lionel Yu: Belgium Concert Livestream (June 11, 2026)",
      descriptionHtml:
        "<strong>Exclusive Livestream Access</strong><br>Stream the full concert from Zaventem, Belgium. Featuring classical masterpieces and EDM-inspired energy.<br><br>• 7-Day Replay Access Included<br>• High-Quality Audio/Video",
      vendor: "MusicalBasics",
      productType: "Livestream",
      status: "ACTIVE",
      productOptions: [
        { name: "Edition", values: [{ name: "Email List Exclusive" }] },
      ],
    },
  }
);
checkUserErrors("productCreate", createRes.productCreate.userErrors);
const product = createRes.productCreate.product;
const defaultVariant = product.variants.nodes[0];
console.log(`product:  ${product.id}`);
console.log(`title:    ${product.title}`);
console.log(`variant:  ${defaultVariant.id}`);
console.log(`current price: ${defaultVariant.price} / compareAt: ${defaultVariant.compareAtPrice}`);

console.log("\n=== STEP 2: productVariantsBulkUpdate (price/compareAt/shipping/tax/inventory) ===");
const updateRes = await gql(
  `mutation($productId: ID!, $variants: [ProductVariantsBulkInput!]!) {
    productVariantsBulkUpdate(productId: $productId, variants: $variants) {
      productVariants {
        id
        price
        compareAtPrice
        inventoryPolicy
        taxable
        inventoryItem { requiresShipping tracked }
      }
      userErrors { field message }
    }
  }`,
  {
    productId: product.id,
    variants: [
      {
        id: defaultVariant.id,
        price: "5.00",
        compareAtPrice: "15.00",
        taxable: false,
        inventoryPolicy: "CONTINUE",
        inventoryItem: {
          requiresShipping: false,
          tracked: false,
        },
      },
    ],
  }
);
checkUserErrors("productVariantsBulkUpdate", updateRes.productVariantsBulkUpdate.userErrors);
const updatedVariant = updateRes.productVariantsBulkUpdate.productVariants[0];
console.log("after update:");
console.log(JSON.stringify(updatedVariant, null, 2));

console.log("\n=== STEP 3: add €5.00 fixed price for EU customers ===");
const eurRes = await gql(
  `mutation($priceListId: ID!, $prices: [PriceListPriceInput!]!) {
    priceListFixedPricesAdd(priceListId: $priceListId, prices: $prices) {
      prices { variant { id } price { amount currencyCode } }
      userErrors { field message }
    }
  }`,
  {
    priceListId: EU_PRICE_LIST_ID,
    prices: [
      { variantId: defaultVariant.id, price: { amount: "5.00", currencyCode: "EUR" } },
    ],
  }
);
checkUserErrors("priceListFixedPricesAdd EU livestream", eurRes.priceListFixedPricesAdd.userErrors);
console.log("EU fixed price added:", JSON.stringify(eurRes.priceListFixedPricesAdd.prices, null, 2));

console.log("\n=== STEP 4: verify ===");
const verifyRes = await gql(
  `query($id: ID!) {
    productVariant(id: $id) {
      id
      title
      price
      compareAtPrice
      taxable
      inventoryPolicy
      inventoryItem { requiresShipping tracked }
      product { id title status }
    }
  }`,
  { id: defaultVariant.id }
);
const v = verifyRes.productVariant;
console.log(JSON.stringify(v, null, 2));

const after = await gql(`{ productsCount { count } }`);
console.log(`\n=== HEALTH CHECK ===`);
console.log(`productsCount: ${before.productsCount.count} → ${after.productsCount.count} (+1 expected)`);
if (after.productsCount.count !== before.productsCount.count + 1) {
  console.error("UNEXPECTED productsCount delta — investigate.");
  process.exit(1);
}

const numericVariantId = defaultVariant.id.split("/").pop();
const numericProductId = product.id.split("/").pop();

console.log("\n=== ✅ SUCCESS ===");
console.log(`PRODUCT_ID:  ${numericProductId}`);
console.log(`VARIANT_ID:  ${numericVariantId}    ← plug into LIVESTREAM_VARIANT_ID`);
console.log(`base price:  $5.00 USD (compare-at $15.00)`);
console.log(`EU price:    €5.00 EUR (fixed, no FX) for customers routed to EU market`);
console.log(`shipping:    not required (digital)`);
console.log(`tax:         not taxable`);
console.log(`inventory:   not tracked, can oversell`);
