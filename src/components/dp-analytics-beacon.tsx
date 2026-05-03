"use client";

import { useEffect, useRef } from "react";
import { createBusinessAnalytics } from "@dreamplay/analytics/client";

const PAGEVIEW_FIRED_KEY = "dp_first_page_view_fired";

const analytics = createBusinessAnalytics({
  business: "concert",
  brand: "belgium-concert",
  offer: "belgium-2026",
  endpoint: "/api/track",
  sourceRepo: "belgium-concert-landing-page",
  defaultMetadata: {
    site: "musicalbasics",
  },
});

export default function DpAnalyticsBeacon() {
  const startedAtRef = useRef<number>(0);
  const leaveSentRef = useRef(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    startedAtRef.current = Date.now();
    leaveSentRef.current = false;

    // Fire pageview once per session (not per route push, since this page is
    // a single-route landing). Avoids double-firing on hot reload in dev.
    // Event name "pageview" + "page_leave" matches the convention used by
    // dreamplay-analytics' stats-v2 dashboard.
    const alreadyFired = window.sessionStorage.getItem(PAGEVIEW_FIRED_KEY);
    if (!alreadyFired) {
      void analytics.trackPageview();
      try {
        window.sessionStorage.setItem(PAGEVIEW_FIRED_KEY, "1");
      } catch {
        // ignore
      }
    }

    const handleSessionEnd = () => {
      if (leaveSentRef.current) return;
      leaveSentRef.current = true;
      void analytics.trackPageLeave({ startedAt: startedAtRef.current });
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden") {
        handleSessionEnd();
      }
    };

    window.addEventListener("pagehide", handleSessionEnd);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      window.removeEventListener("pagehide", handleSessionEnd);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  return null;
}
