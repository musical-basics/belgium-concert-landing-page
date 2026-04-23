import { gql } from "./_client.mjs";

const typeName = process.argv[2] || "PriceListCreateInput";
const data = await gql(
  `query($name: String!) {
    __type(name: $name) {
      name
      kind
      inputFields {
        name
        type {
          name
          kind
          ofType { name kind ofType { name kind } }
        }
      }
    }
  }`,
  { name: typeName }
);

console.log(JSON.stringify(data.__type, null, 2));
