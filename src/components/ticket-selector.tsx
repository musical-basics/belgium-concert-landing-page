"use client";

import { useEffect, useState } from "react";
import { Ticket, Sparkles } from "lucide-react";
import {
  STANDARD_VARIANT_ID,
  VIP_VARIANT_ID,
  DEFAULT_UTM,
  readUTMFromLocation,
  buildCheckoutUrl,
  type UTMParams,
} from "@/lib/checkout";

const quantityOptions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

type Tier = {
  id: "standard" | "vip";
  variantId: string;
  priceLabel: string;
  titleNl: string;
  titleEn: string;
  featuresNl: string[];
  featuresEn: string[];
  highlight: boolean;
};

const tiers: Tier[] = [
  {
    id: "standard",
    variantId: STANDARD_VARIANT_ID,
    priceLabel: "€29",
    titleNl: "Standaard",
    titleEn: "Standard",
    featuresNl: ["Vaste plaats", "Volledig concert"],
    featuresEn: ["Reserved seating", "Full concert"],
    highlight: false,
  },
  {
    id: "vip",
    variantId: VIP_VARIANT_ID,
    priceLabel: "€59",
    titleNl: "VIP",
    titleEn: "VIP",
    featuresNl: [
      "Vaste plaats",
      "Meet & greet met Lionel na het concert",
      "Drankje na afloop",
    ],
    featuresEn: [
      "Reserved seating",
      "Meet & greet with Lionel after the show",
      "Post-concert refreshments",
    ],
    highlight: true,
  },
];

export default function TicketSelector() {
  const [quantities, setQuantities] = useState<Record<Tier["id"], number>>({
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
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-3xl">
      {tiers.map((tier) => {
        const qty = quantities[tier.id];
        const href = buildCheckoutUrl({
          variantId: tier.variantId,
          quantity: qty,
          utm: { ...utm, content: tier.id },
        });
        const isVip = tier.id === "vip";

        return (
          <div
            key={tier.id}
            className={[
              "relative flex flex-col rounded-[24px] p-6 sm:p-7 text-left transition-all",
              isVip
                ? "bg-gradient-to-br from-[#1a1e2c] to-[#0d0f17] ring-1 ring-white/15"
                : "bg-[#1a1e2c]/70 ring-1 ring-white/10",
            ].join(" ")}
          >
            {isVip && (
              <span className="absolute -top-3 left-6 flex items-center gap-1.5 rounded-full bg-white text-[#121622] text-[10px] font-semibold uppercase tracking-widest px-3 py-1">
                <Sparkles className="w-3 h-3" />
                VIP-ervaring / VIP Experience
              </span>
            )}

            <div className="flex items-baseline justify-between mb-4">
              <h3 className="text-[22px] font-medium text-white tracking-tight">
                {tier.titleNl} / {tier.titleEn}
              </h3>
              <span className="text-[28px] font-medium text-white tracking-tight">
                {tier.priceLabel}
              </span>
            </div>

            <ul className="space-y-2 mb-6">
              {tier.featuresNl.map((feat, i) => (
                <li key={feat} className="text-[13px] leading-[1.5]">
                  <span className="text-[#B9C1D1]">— {feat}</span>
                  <span className="text-[#B9C1D1]/50"> / {tier.featuresEn[i]}</span>
                </li>
              ))}
            </ul>

            <div className="mt-auto space-y-3">
              <label
                htmlFor={`quantity-${tier.id}`}
                className="block text-[#B9C1D1]/70 text-[10px] font-semibold uppercase tracking-widest"
              >
                Aantal / Quantity
              </label>
              <select
                id={`quantity-${tier.id}`}
                value={qty}
                className="w-full rounded-[12px] border border-white/10 bg-[#0F1117] px-4 py-3 text-[#F4F4F2] text-sm outline-none focus:border-white/30 transition-colors appearance-none cursor-pointer"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23B9C1D1'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "right 1rem center",
                  backgroundSize: "1rem",
                }}
                onChange={(e) =>
                  setQuantities((prev) => ({
                    ...prev,
                    [tier.id]: parseInt(e.target.value),
                  }))
                }
              >
                {quantityOptions.map((q) => (
                  <option key={q} value={q} className="bg-[#0F1117]">
                    {q} ticket{q > 1 ? "s" : ""} / {q} ticket{q > 1 ? "ten" : ""}
                  </option>
                ))}
              </select>

              <a
                href={href}
                className={[
                  "group relative w-full font-semibold text-[15px] px-6 py-4 rounded-[999px] flex items-center justify-center gap-2 transition-all hover:-translate-y-0.5",
                  isVip
                    ? "bg-white text-[#121622] ring-1 ring-white/40 shadow-2xl shadow-black/40"
                    : "bg-[#111111] text-[#F4F4F2] ring-1 ring-white/10 hover:ring-white/30 shadow-2xl shadow-black/40",
                ].join(" ")}
              >
                <span className="relative z-10 flex items-center gap-2">
                  {isVip ? "VIP kopen / Buy VIP" : "Tickets kopen / Get Tickets"}
                  <Ticket className="w-4 h-4 transition-transform group-hover:rotate-12" />
                </span>
              </a>
            </div>
          </div>
        );
      })}
    </div>
  );
}
