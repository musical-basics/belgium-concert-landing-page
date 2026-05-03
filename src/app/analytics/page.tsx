import { AnalyticsDashboard } from "@dreamplay/analytics/dashboard";

export default function AnalyticsPage() {
  return (
    <AnalyticsDashboard
      accentLabel="Concert"
      title="Analytics"
      apiBasePath="/api/analytics"
    />
  );
}
