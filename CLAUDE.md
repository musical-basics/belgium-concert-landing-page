# Git — Commit and push after EVERY code change

**Commit and push in the same turn as any change that affects the live site.** This repo deploys to Vercel on push — uncommitted changes don't exist to users. Don't batch multiple unrelated edits hoping to commit later; commit each logical change and push immediately.

- Any edit to `src/`, `public/`, `next.config.*`, `package.json`, env schema, routes, components, styles, or copy → commit + push in the same turn.
- Scripts or docs that don't affect the live site can be batched, but still push by end of session.
- Never leave a code change uncommitted across a user interaction when the user is waiting to see it live.
- `git push origin main` follows every `git commit`. Together, not separated.

If you're unsure whether something is "live-affecting," default to committing and pushing.

---

# Shopify Admin API — Safety Constraints

These rules apply to every Shopify operation performed in this repo. They are non-negotiable and apply across all sessions. Read this file before any Shopify API call.

## Scope

- Token stored in `.env.local` as `SHOPIFY_ADMIN_API_TOKEN` and `SHOPIFY_STORE_DOMAIN`.
- Token scopes are limited to: `read_products`, `write_products`, `read_markets`, `write_markets`, `read_inventory`, `write_inventory`. No other scopes are granted.
- Do NOT request or suggest additional scopes without explicit user approval.

## Operation rules

1. **Never call delete mutations.** This includes `productDelete`, `productVariantDelete`, `inventoryItemDelete`, `metafieldDelete`, or any other mutation with deletion semantics. If a task appears to require deletion, STOP and ask the user in chat.

2. **Never run bulk operations across the catalog.** No `bulkOperationRunQuery` with unfiltered product queries that mutate. No loops over all products. All writes must target specific, explicitly-named variant IDs.

3. **Allowlist of modifiable variant IDs** (update this list as needed, with user approval):
   - Standard ticket variant: `43946996957227`
   - VIP ticket variant: `43962297974827`
   - Do not modify any variant outside this allowlist without user approval in chat.

4. **First operation in any session must be a read-only check.** Call `shop { name primaryDomain { url } }` and print the result. Do not proceed to any write until the user confirms auth looks correct.

5. **Before any write operation:**
   - Call `productsCount` and log the number.
   - Read the current state of the target variant and log it.
   - Print the exact mutation and parameters you are about to run.
   - For the first 3 writes in any session, wait for explicit user "go" before executing.
   - After write executes, read the variant again and log the diff (before → after).

6. **After all writes in a session are complete:**
   - Call `productsCount` again. Confirm the number is unchanged from the start-of-session count.
   - Log a summary of all changes made.

7. **If any mutation returns a non-empty `userErrors` array:** STOP. Show the full error to the user. Do not retry with modified parameters without user approval.

8. **Backup before first write in any session.** Export the full product catalog as JSON to `/backups/shopify-products-[ISO-timestamp].json`. Confirm the file exists and is >0 bytes before any write. Use cursor-based pagination to get all products.

## Things that require chat approval (not autonomous)

- Adding any new scope to the token
- Modifying any variant not in the allowlist above
- Creating any new product
- Deleting anything (even if technically allowed by the scope)
- Running any operation that touches more than the allowlisted variants
- Any operation on orders, customers, discounts, or shipping

## End of session

- When Belgium concert work is complete, remind the user to rotate/delete the custom app in Shopify admin.
