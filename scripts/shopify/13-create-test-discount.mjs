// Create a 100%-off discount code scoped to the Belgium concert variants only.
// Idempotent: if a discount with the same code already exists, prints its ID
// and exits without creating a duplicate.
//
// Usage:
//   node --env-file=.env.local scripts/shopify/13-create-test-discount.mjs

import { gql } from "./_client.mjs";

const CODE = process.env.DISCOUNT_CODE || "LIONEL100";
// 2025-10 schema dropped variant-level scoping on DiscountItemsInput. We use
// product-level instead — safe because each Belgium concert product has only
// one variant (verified via productVariant.product.totalVariants = 1).
const STANDARD_PRODUCT = "gid://shopify/Product/7886779285547"; // General Ticket: Zaventem, Belgium June 11
const VIP_PRODUCT = "gid://shopify/Product/7890280644651";      // Belgium Concert VIP Ticket - Lionel Yu Live
const USAGE_LIMIT = 10;

console.log(`code:        ${CODE}`);
console.log(`scope:       Standard + VIP Belgium concert variants only`);
console.log(`limits:      ${USAGE_LIMIT} total uses, 1 per customer`);
console.log("");

// 1. Idempotency check — does this code already exist?
const existing = await gql(
  `query($code: String!) {
    codeDiscountNodeByCode(code: $code) {
      id
      codeDiscount {
        ... on DiscountCodeBasic {
          title
          status
          codes(first: 1) { nodes { code } }
        }
      }
    }
  }`,
  { code: CODE }
);

if (existing.codeDiscountNodeByCode) {
  console.log("✓ already exists:");
  console.log(`  id:     ${existing.codeDiscountNodeByCode.id}`);
  console.log(`  title:  ${existing.codeDiscountNodeByCode.codeDiscount?.title}`);
  console.log(`  status: ${existing.codeDiscountNodeByCode.codeDiscount?.status}`);
  console.log(`\nuse code "${CODE}" at checkout: https://eu.musicalbasics.com/discount/${CODE}`);
  process.exit(0);
}

// 2. Create the discount.
const startsAt = new Date().toISOString();
const result = await gql(
  `mutation($input: DiscountCodeBasicInput!) {
    discountCodeBasicCreate(basicCodeDiscount: $input) {
      codeDiscountNode {
        id
        codeDiscount { ... on DiscountCodeBasic { title status codes(first: 1) { nodes { code } } } }
      }
      userErrors { field code message }
    }
  }`,
  {
    input: {
      title: "Belgium concert test code (100% off)",
      code: CODE,
      startsAt,
      appliesOncePerCustomer: true,
      usageLimit: USAGE_LIMIT,
      customerSelection: { all: true },
      customerGets: {
        value: { percentage: 1.0 },
        items: {
          products: {
            productsToAdd: [STANDARD_PRODUCT, VIP_PRODUCT],
          },
        },
      },
      combinesWith: {
        productDiscounts: false,
        orderDiscounts: false,
        shippingDiscounts: true,
      },
    },
  }
);

const out = result.discountCodeBasicCreate;
if (out.userErrors.length > 0) {
  console.error("✗ create failed:", JSON.stringify(out.userErrors, null, 2));
  process.exit(1);
}

console.log("✓ created:");
console.log(`  id:     ${out.codeDiscountNode.id}`);
console.log(`  title:  ${out.codeDiscountNode.codeDiscount.title}`);
console.log(`  status: ${out.codeDiscountNode.codeDiscount.status}`);
console.log(`\nuse code "${CODE}" at checkout, or share the auto-apply link:`);
console.log(`  https://eu.musicalbasics.com/discount/${CODE}`);
