import { gql, SHOP_DOMAIN, API_VERSION } from "./_client.mjs";

const data = await gql(`{
  shop {
    name
    primaryDomain { url }
    currencyCode
  }
}`);

console.log(`api version: ${API_VERSION}`);
console.log(`store domain: ${SHOP_DOMAIN}`);
console.log(`shop name:    ${data.shop.name}`);
console.log(`primary url:  ${data.shop.primaryDomain.url}`);
console.log(`currency:     ${data.shop.currencyCode}`);
console.log(`\nconnected.`);
