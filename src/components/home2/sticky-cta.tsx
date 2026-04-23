"use client";

import { useEffect, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { track } from "@vercel/analytics";
import { useLocale } from "@/lib/i18n/context";

export default function StickyCta() {
  const { t } = useLocale();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={[
        "fixed inset-x-0 bottom-0 z-40 sm:hidden",
        "transform transition-transform duration-500 ease-out will-change-transform",
        visible ? "translate-y-0" : "translate-y-full",
      ].join(" ")}
      aria-hidden={!visible}
    >
      <div
        className="mx-3 mb-3 flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-[#0b0e16]/95 backdrop-blur-xl px-4 py-3 shadow-[0_-10px_40px_rgba(0,0,0,0.6)]"
      >
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
          onClick={() => track("cta_click", { location: "sticky" })}
          className="group inline-flex items-center gap-2 rounded-full bg-[color:var(--accent)] px-5 py-3 text-[13px] font-semibold tracking-wide text-[#0a0d14] active:scale-95 transition-transform"
        >
          {t.home2.stickyCta.button}
          <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </a>
      </div>
    </div>
  );
}
