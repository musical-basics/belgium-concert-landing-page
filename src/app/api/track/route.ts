import {
  createBusinessAnalyticsTrackHandler,
  createBusinessAnalyticsTrackOptionsHandler,
} from "@dreamplay/analytics/track-server";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const options = {
  supabaseUrl: (process.env.ANALYTICS_SUPABASE_URL ?? process.env.NEXT_PUBLIC_SUPABASE_URL)!,
  supabaseServiceRoleKey: (
    process.env.ANALYTICS_SUPABASE_SERVICE_ROLE_KEY ??
    process.env.SUPABASE_SERVICE_ROLE_KEY
  )!,
  emailSupabaseUrl: process.env.EMAIL_SUPABASE_URL,
  emailSupabaseServiceRoleKey: process.env.EMAIL_SUPABASE_SERVICE_KEY,
  business: "concert" as const,
  cors: {
    allowedOrigins: [
      "https://belgium.musicalbasics.com",
      "https://www.belgium.musicalbasics.com",
    ] as string[],
    allowVercelPreviews: true,
    allowLocalhost: true,
  },
};

export const POST = createBusinessAnalyticsTrackHandler(options);
export const OPTIONS = createBusinessAnalyticsTrackOptionsHandler(options);
