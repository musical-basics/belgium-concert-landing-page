"use client";

import { useEffect, useState } from "react";
import { Ticket, Sparkles, Minus, Plus } from "lucide-react";
import {
  STANDARD_VARIANT_ID,
  VIP_VARIANT_ID,
  VIP_SOLD_OUT,
  DEFAULT_UTM,
  readUTMFromLocation,
  buildCheckoutUrl,
  type UTMParams,
} from "@/lib/checkout";
import { useLocale } from "@/lib/i18n/context";
import { trackBeginCheckout } from "@/components/analytics";

const MIN_QTY = 1;
const MAX_QTY = 5;

type TierId = "standard" | "vip";
type TierConfig = { id: TierId; variantId: string };

const tierConfigs: TierConfig[] = [
  { id: "standard", variantId: STANDARD_VARIANT_ID },
  { id: "vip", variantId: VIP_VARIANT_ID },
];

export default function TicketSelector() {
  const { t } = useLocale();
  const [quantities, setQuantities] = useState<Record<TierId, number>>({
    standard: 1,
    vip: 1,
  });
  const [utm, setUtm] = useState<UTMParams>(DEFAULT_UTM);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setUtm(readUTMFromLocation(window.location.search));
    }
  }, []);

  return (
    <div className="flex flex-col items-center gap-5 w-full max-w-3xl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
      {tierConfigs.map((cfg) => {
        const qty = quantities[cfg.id];
        const tierCopy = cfg.id === "vip" ? t.tickets.vip : t.tickets.standard;
        const isVip = cfg.id === "vip";
        const isSoldOut = isVip && VIP_SOLD_OUT;
        const href = buildCheckoutUrl({
          variantId: cfg.variantId,
          quantity: qty,
          utm: { ...utm, content: cfg.id },
        });

        return (
          <div
            key={cfg.id}
            className={[
              "relative flex flex-col rounded-[24px] p-6 sm:p-7 text-left transition-all",
              isVip
                ? "bg-gradient-to-br from-[#1a1e2c] to-[#0d0f17] ring-1 ring-white/15"
                : "bg-[#1a1e2c]/70 ring-1 ring-white/10",
              isSoldOut ? "opacity-70" : "",
            ].join(" ")}
          >
            {isVip && !isSoldOut && (
              <span className="absolute -top-3 left-6 flex items-center gap-1.5 rounded-full bg-white text-[#121622] text-[10px] font-semibold uppercase tracking-widest px-3 py-1">
                <Sparkles className="w-3 h-3" />
                {t.tickets.vip.badge}
              </span>
            )}
            {isSoldOut && (
              <span className="absolute -top-3 left-6 flex items-center gap-1.5 rounded-full bg-[#7f1d1d] text-white text-[10px] font-semibold uppercase tracking-widest px-3 py-1">
                Sold Out
              </span>
            )}

            <div className="flex items-baseline justify-between mb-4">
              <h3 className="text-[22px] font-medium text-white tracking-tight">
                {tierCopy.title}
              </h3>
              <span className="text-[28px] font-medium text-white tracking-tight">
                {tierCopy.price}
              </span>
            </div>

            <ul className="space-y-2 mb-6">
              {tierCopy.features.map((feat) => (
                <li key={feat} className="text-[13px] leading-[1.5]">
                  <span className="text-[#B9C1D1]">— {feat}</span>
                </li>
              ))}
            </ul>

            {isSoldOut ? (
              <div className="mt-auto flex flex-col items-center gap-2 py-4">
                <div className="w-full text-center font-semibold text-[15px] px-6 py-4 rounded-[999px] border border-white/15 bg-white/5 text-white/70 uppercase tracking-widest">
                  Sold Out
                </div>
              </div>
            ) : (
            <div className="mt-auto space-y-3">
              <label
                htmlFor={`quantity-${cfg.id}`}
                className="block text-[#B9C1D1]/70 text-[10px] font-semibold uppercase tracking-widest"
              >
                {t.tickets.quantity}
              </label>
              <div
                id={`quantity-${cfg.id}`}
                className="flex items-center justify-between rounded-[12px] border border-white/10 bg-[#0F1117] px-2 py-1.5"
              >
                <button
                  type="button"
                  aria-label="Decrease quantity"
                  disabled={qty <= MIN_QTY}
                  onClick={() =>
                    setQuantities((prev) => ({
                      ...prev,
                      [cfg.id]: Math.max(MIN_QTY, prev[cfg.id] - 1),
                    }))
                  }
                  className="flex h-9 w-9 items-center justify-center rounded-full text-[#F4F4F2] transition-colors hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-transparent"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span
                  aria-live="polite"
                  className="flex-1 text-center text-[16px] font-medium text-[#F4F4F2] tabular-nums"
                >
                  {qty}
                </span>
                <button
                  type="button"
                  aria-label="Increase quantity"
                  disabled={qty >= MAX_QTY}
                  onClick={() =>
                    setQuantities((prev) => ({
                      ...prev,
                      [cfg.id]: Math.min(MAX_QTY, prev[cfg.id] + 1),
                    }))
                  }
                  className="flex h-9 w-9 items-center justify-center rounded-full text-[#F4F4F2] transition-colors hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-transparent"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              <a
                href={href}
                onClick={() =>
                  trackBeginCheckout({
                    variantId: cfg.variantId,
                    quantity: qty,
                    tier: cfg.id,
                    utm: { ...utm, content: cfg.id },
                  })
                }
                className={[
                  "group relative w-full font-semibold text-[15px] px-6 py-4 rounded-[999px] flex items-center justify-center gap-2 transition-all hover:-translate-y-0.5",
                  isVip
                    ? "bg-white text-[#121622] ring-1 ring-white/40 shadow-2xl shadow-black/40"
                    : "bg-[color:var(--accent)] text-[#0a0d14] ring-1 ring-[color:var(--accent)]/40 shadow-2xl shadow-black/40 hover:shadow-[0_0_30px_rgba(216,179,93,0.35)]",
                ].join(" ")}
              >
                <span className="relative z-10 flex items-center gap-2">
                  {tierCopy.cta}
                  <Ticket className="w-4 h-4 transition-transform group-hover:rotate-12" />
                </span>
              </a>
              {/* Trust line */}
              <p className="text-center text-[10px] text-[#B9C1D1]/50 uppercase tracking-widest flex items-center justify-center gap-1.5">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-3 h-3">
                  <path fillRule="evenodd" d="M8 1a3.5 3.5 0 0 0-3.5 3.5V7A1.5 1.5 0 0 0 3 8.5v5A1.5 1.5 0 0 0 4.5 15h7a1.5 1.5 0 0 0 1.5-1.5v-5A1.5 1.5 0 0 0 11.5 7V4.5A3.5 3.5 0 0 0 8 1Zm2 6V4.5a2 2 0 1 0-4 0V7h4Z" clipRule="evenodd" />
                </svg>
                {t.home2.tickets.trustLine}
              </p>
            </div>
            )}
          </div>
        );
      })}
      </div>
      <p className="text-[11px] text-[#B9C1D1]/60 uppercase tracking-widest">
        {t.tickets.maxPerOrder}
      </p>
      <p className="text-[12px] text-[#B9C1D1]/50 mt-1">
        {t.home2.tickets.refundPolicy}
      </p>
    </div>
  );
}
