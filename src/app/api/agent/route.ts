export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const DOCS = `# Belgium Concert — Seat Assignment Agent API

Base URL: \`https://belgium.musicalbasics.com\`

## Auth
All data and action endpoints require:
\`\`\`
Authorization: Bearer <AGENT_API_SECRET>
\`\`\`
The docs endpoint (\`GET /api/agent\`) is public.

## Endpoints

### GET /api/agent
Returns this markdown. Public.

### GET /api/agent/status
Returns counts of seat-assignment records by status.
\`\`\`json
{ "counts": { "pending": 3, "assigned": 1, "emailed": 12, "error": 0, "cancelled": 0 } }
\`\`\`

### GET /api/agent/seat-assignments?status=<status>
Returns ticket order records, optionally filtered. \`status\` is one of:
\`pending | assigned | emailed | error | cancelled\`. Omit to return all.

### POST /api/agent/seat-assignments/:id/email-preview
Returns the exact email subject + text + html that would be sent if the organizer
clicked "Save & Email Customer" right now. Does not send.

## Status meanings
- **pending**: Shopify order received; Luc has not entered seats yet.
- **assigned**: Seats saved; customer not yet emailed.
- **emailed**: Customer email confirmed sent (or dry-run).
- **error**: Last send attempt failed; see \`email_error\`.
- **cancelled**: Underlying Shopify order was cancelled or refunded.

## Safety rules
- This API is **read-only / preview** by default. There is no agent endpoint to actually send a customer email — that is a deliberate manual step in the organizer UI.
- Webhook ingestion is idempotent on \`shopify_order_id\`.
- Customer emails respect \`EMAIL_DRY_RUN=true\` (set in non-prod).
`;

export async function GET(): Promise<Response> {
  return new Response(DOCS, {
    headers: { "Content-Type": "text/markdown; charset=utf-8" },
  });
}
