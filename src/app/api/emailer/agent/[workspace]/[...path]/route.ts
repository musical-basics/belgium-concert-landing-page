import {
  createEmailAgentHandler,
  type EmailAgentRouteContext,
} from "@dreamplay/emailer/agent-server";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const handler = createEmailAgentHandler({
  allowedWorkspaces: ["concert_marketing"],
});

export const GET = (request: Request, context: EmailAgentRouteContext) =>
  handler(request, context);
export const POST = (request: Request, context: EmailAgentRouteContext) =>
  handler(request, context);
export const PATCH = (request: Request, context: EmailAgentRouteContext) =>
  handler(request, context);
export const DELETE = (request: Request, context: EmailAgentRouteContext) =>
  handler(request, context);
