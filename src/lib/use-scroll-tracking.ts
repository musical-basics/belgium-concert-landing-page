"use client";

import { useEffect, useRef } from "react";
import { track } from "@vercel/analytics";

/**
 * Tracks scroll depth milestones (25%, 50%, 75%, 100%) and fires Vercel +
 * GA4 events once per session. Also exposes an IntersectionObserver-based
 * tracker for named sections (e.g. "tickets", "vip").
 */

const MILESTONES = [25, 50, 75, 100] as const;

export function useScrollDepthTracking() {
  const fired = useRef(new Set<number>());

  useEffect(() => {
    function onScroll() {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight <= 0) return;

      const pct = Math.round((scrollTop / docHeight) * 100);
      for (const milestone of MILESTONES) {
        if (pct >= milestone && !fired.current.has(milestone)) {
          fired.current.add(milestone);
          track("scroll_depth", { depth: milestone });
          window.gtag?.("event", "scroll_depth", {
            depth_threshold: milestone,
          });
        }
      }
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
}

/**
 * Fires a one-time event when the given element scrolls into the viewport.
 * Useful for tracking ticket section visibility, VIP section views, etc.
 */
export function useSectionViewTracking(
  sectionId: string,
  eventName: string,
  extraProps?: Record<string, string | number>,
) {
  const hasFired = useRef(false);

  useEffect(() => {
    const el = document.getElementById(sectionId);
    if (!el || hasFired.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasFired.current) {
          hasFired.current = true;
          track(eventName, extraProps);

          // GA4
          window.gtag?.("event", eventName, extraProps);

          // Meta Pixel — ViewContent for ticket section
          if (eventName === "ticket_section_viewed") {
            window.fbq?.("track", "ViewContent", {
              content_name: "ticket_section",
              content_type: "product_group",
              currency: "EUR",
            });
          }

          // TikTok
          if (eventName === "ticket_section_viewed") {
            window.ttq?.track("ViewContent", {
              content_type: "product_group",
            });
          }

          observer.disconnect();
        }
      },
      { threshold: 0.3 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [sectionId, eventName, extraProps]);
}
