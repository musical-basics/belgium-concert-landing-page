"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Ticket } from "lucide-react";
import { track } from "@vercel/analytics";
import { useLocale } from "@/lib/i18n/context";

// Show sticky elements after the hero (~100vh) has scrolled past
const SCROLL_THRESHOLD = typeof window !== "undefined" ? window.innerHeight * 0.85 : 600;

export default function StickyCta() {
  const { t } = useLocale();
  const [visible, setVisible] = useState(false);
  // Days remaining for desktop bar mini-countdown
  const [daysLeft, setDaysLeft] = useState<number | null>(null);
  const threshold = useRef(SCROLL_THRESHOLD);

  useEffect(() => {
    // Recalculate on mount in case SSR default differs
    threshold.current = window.innerHeight * 0.85;

    const onScroll = () => setVisible(window.scrollY > threshold.current);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    // Compute days remaining
    const diff = Math.max(0, Date.UTC(2026, 5, 11, 17, 30, 0) - Date.now());
    setDaysLeft(Math.floor(diff / 86_400_000));

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* ── MOBILE: bottom pill bar ─────────────────────────────── */}
      <div
        className={[
          "fixed inset-x-0 bottom-0 z-40 sm:hidden",
          "transform transition-transform duration-500 ease-out will-change-transform",
          visible ? "translate-y-0" : "translate-y-full",
        ].join(" ")}
        aria-hidden={!visible}
      >
        <div className="mx-3 mb-3 flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-[#0b0e16]/95 backdrop-blur-xl px-4 py-3 shadow-[0_-10px_40px_rgba(0,0,0,0.6)]">
          <div className="flex flex-col">
            <span className="text-[10px] uppercase tracking-[0.2em] text-[color:var(--muted)]">
              {t.home2.stickyCta.fromLabel}
            </span>
            <span className="font-display text-lg font-semibold text-white">
              {t.home2.stickyCta.fromPrice}
            </span>
          </div>
          <a
            href="#tickets"
            onClick={() => track("cta_click", { location: "sticky_mobile" })}
            className="group inline-flex items-center gap-2 rounded-full bg-[color:var(--accent)] px-5 py-3 text-[13px] font-semibold tracking-wide text-[#0a0d14] active:scale-95 transition-transform"
          >
            {t.home2.stickyCta.button}
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>
      </div>

      {/* ── DESKTOP: slim top bar under nav ─────────────────────── */}
      <div
        className={[
          "hidden sm:block fixed inset-x-0 top-[57px] z-30",
          "transform transition-transform duration-500 ease-out will-change-transform",
          visible ? "translate-y-0" : "-translate-y-full",
        ].join(" ")}
        aria-hidden={!visible}
      >
        <div className="flex items-center justify-between gap-6 border-b border-white/[0.07] bg-[#0b0e16]/90 backdrop-blur-xl px-6 sm:px-10 py-2.5">
          {/* Left: date + price */}
          <div className="flex items-center gap-4 text-[11px] uppercase tracking-[0.2em] text-[color:var(--muted)]">
            <span>June 11, 2026 · Zaventem</span>
            <span className="hidden md:inline w-px h-3 bg-white/20" />
            {daysLeft !== null && (
              <span className="hidden md:inline">
                <span className="text-white font-semibold">{daysLeft}</span> days left
              </span>
            )}
          </div>

          {/* Right: CTA */}
          <a
            href="#tickets"
            onClick={() => track("cta_click", { location: "sticky_desktop" })}
            className="group inline-flex items-center gap-2 rounded-full bg-[color:var(--accent)] px-5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.15em] text-[#0a0d14] transition-all hover:shadow-[0_0_20px_rgba(216,179,93,0.4)] hover:-translate-y-px"
          >
            <Ticket className="w-3.5 h-3.5" />
            {t.home2.stickyCta.fromPrice} · {t.home2.stickyCta.button}
          </a>
        </div>
      </div>
    </>
  );
}
