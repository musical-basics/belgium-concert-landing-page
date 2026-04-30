import { gql } from "./_client.mjs";

const PRODUCT_ID = process.argv[2] || "gid://shopify/Product/7897351421995";

function checkUserErrors(label, errs) {
  if (errs && errs.length > 0) {
    console.error(`userErrors on ${label}:`);
    console.error(JSON.stringify(errs, null, 2));
    process.exit(1);
  }
}

console.log(`publishing ${PRODUCT_ID} ...\n`);

console.log("=== STEP 1: list publications (sales channels) ===");
const pubs = await gql(
  `query { publications(first: 30) { nodes { id name } } }`
);
console.log(JSON.stringify(pubs.publications.nodes, null, 2));

const onlineStore = pubs.publications.nodes.find((p) => p.name === "Online Store");
if (!onlineStore) {
  console.error("ERROR: Online Store publication not found.");
  process.exit(1);
}
console.log(`\nOnline Store publication: ${onlineStore.id}`);

console.log("\n=== STEP 2: publishablePublish ===");
const pub = await gql(
  `mutation($id: ID!, $input: [PublicationInput!]!) {
    publishablePublish(id: $id, input: $input) {
      publishable {
        ... on Product { id title status }
      }
      userErrors { field message }
    }
  }`,
  {
    id: PRODUCT_ID,
    input: [{ publicationId: onlineStore.id }],
  }
);
checkUserErrors("publishablePublish", pub.publishablePublish.userErrors);
console.log("published:", JSON.stringify(pub.publishablePublish.publishable, null, 2));

console.log("\n=== STEP 3: verify ===");
const v = await gql(
  `query($id: ID!) {
    product(id: $id) {
      id title status
      resourcePublicationsCount { count }
      resourcePublications(first: 20) {
        nodes { isPublished publication { id name } publishDate }
      }
    }
  }`,
  { id: PRODUCT_ID }
);
console.log(JSON.stringify(v.product, null, 2));

console.log("\n=== ✅ DONE ===");
