import { gql } from "./_client.mjs";
import { writeFileSync } from "node:fs";
import { join } from "node:path";

const count = await gql(`{ productsCount { count } }`);
console.log(`productsCount: ${count.productsCount.count}`);

const all = [];
let cursor = null;
let page = 0;
while (true) {
  page++;
  const data = await gql(
    `query($cursor: String) {
      products(first: 50, after: $cursor) {
        pageInfo { hasNextPage endCursor }
        nodes {
          id
          title
          handle
          status
          variants(first: 100) {
            nodes {
              id
              title
              price
              compareAtPrice
              sku
              inventoryItem { id }
            }
          }
        }
      }
    }`,
    { cursor }
  );
  const { nodes, pageInfo } = data.products;
  all.push(...nodes);
  console.log(`page ${page}: +${nodes.length} products (total ${all.length})`);
  if (!pageInfo.hasNextPage) break;
  cursor = pageInfo.endCursor;
}

const ts = new Date().toISOString().replace(/[:.]/g, "-");
const outPath = join(process.cwd(), "backups", `shopify-products-${ts}.json`);
const payload = {
  exportedAt: new Date().toISOString(),
  productsCount: count.productsCount.count,
  products: all,
};
writeFileSync(outPath, JSON.stringify(payload, null, 2));

writeFileSync(
  join(process.cwd(), "backups", `shopify-products-${ts}.count.txt`),
  String(count.productsCount.count)
);

const standardId = "gid://shopify/ProductVariant/43946996957227";
const vipId = "gid://shopify/ProductVariant/43962297974827";
const flatVariants = all.flatMap((p) =>
  p.variants.nodes.map((v) => ({ productTitle: p.title, ...v }))
);
const std = flatVariants.find((v) => v.id === standardId);
const vip = flatVariants.find((v) => v.id === vipId);

console.log(`\nbackup written: ${outPath}`);
console.log(`\nallowlisted variants in backup:`);
console.log(`  standard ${standardId}: ${std ? `"${std.productTitle}" / price=${std.price}` : "NOT FOUND"}`);
console.log(`  vip      ${vipId}: ${vip ? `"${vip.productTitle}" / price=${vip.price}` : "NOT FOUND"}`);

if (!std || !vip) {
  console.error("\nERROR: one or both allowlisted variants missing from catalog");
  process.exit(1);
}
