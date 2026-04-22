"use client";

import { useEffect, useState } from "react";
import { useLocale } from "@/lib/i18n/context";

// June 11, 2026 19:30 CEST (UTC+2 in June) → 17:30 UTC
const TARGET_MS = Date.UTC(2026, 5, 11, 17, 30, 0);

type Parts = { days: number; hours: number; mins: number; secs: number };

function compute(): Parts {
  const now = Date.now();
  const diff = Math.max(0, TARGET_MS - now);
  const days = Math.floor(diff / 86_400_000);
  const hours = Math.floor((diff % 86_400_000) / 3_600_000);
  const mins = Math.floor((diff % 3_600_000) / 60_000);
  const secs = Math.floor((diff % 60_000) / 1000);
  return { days, hours, mins, secs };
}

function pad(n: number) {
  return n.toString().padStart(2, "0");
}

export default function Countdown() {
  const { t } = useLocale();
  const [parts, setParts] = useState<Parts | null>(null);

  useEffect(() => {
    setParts(compute());
    const id = setInterval(() => setParts(compute()), 1000);
    return () => clearInterval(id);
  }, []);

  const labels = t.home2.hero.countdown;
  const shown: Parts = parts ?? { days: 0, hours: 0, mins: 0, secs: 0 };

  const Cell = ({ n, label }: { n: number; label: string }) => (
    <div className="flex flex-col items-center">
      <span
        className="font-display text-4xl sm:text-5xl md:text-6xl font-semibold text-white tabular-nums tracking-tight"
        aria-hidden={parts === null}
      >
        {pad(n)}
      </span>
      <span className="text-[10px] sm:text-[11px] text-[color:var(--muted)]/80 uppercase tracking-[0.3em] mt-2">
        {label}
      </span>
    </div>
  );

  const Sep = () => (
    <span className="font-display text-3xl sm:text-5xl md:text-6xl font-semibold text-white/20 leading-none">
      :
    </span>
  );

  return (
    <div
      className="flex items-start gap-3 sm:gap-6 justify-center"
      role="timer"
      aria-label="Countdown to concert"
    >
      <Cell n={shown.days} label={labels.days} />
      <Sep />
      <Cell n={shown.hours} label={labels.hours} />
      <Sep />
      <Cell n={shown.mins} label={labels.mins} />
      <span className="hidden sm:inline-flex">
        <Sep />
      </span>
      <span className="hidden sm:flex">
        <Cell n={shown.secs} label={labels.secs} />
      </span>
    </div>
  );
}
