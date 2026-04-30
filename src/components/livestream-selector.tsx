"use client";

import { useEffect, useState } from "react";
import { Play, ArrowRight, Video } from "lucide-react";
import {
  DEFAULT_UTM,
  readUTMFromLocation,
  buildCheckoutUrl,
  LIVESTREAM_VARIANT_ID,
  type UTMParams,
} from "@/lib/checkout";
import { useLocale } from "@/lib/i18n/context";
import { trackBeginCheckout } from "@/components/analytics";


export default function LivestreamSelector() {
  const { t } = useLocale();
  const [utm, setUtm] = useState<UTMParams>(DEFAULT_UTM);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setUtm(readUTMFromLocation(window.location.search));
    }
  }, []);

  const checkoutUrl = buildCheckoutUrl({
    variantId: LIVESTREAM_VARIANT_ID,
    quantity: 1,
    utm: { ...utm, content: "livestream" },
  });

  return (
    <div className="relative group overflow-hidden rounded-2xl border border-white/10 bg-[#161b2a]/50 backdrop-blur-sm p-8 sm:p-10 text-center transition-all hover:border-[color:var(--accent)]/30 hover:bg-[#161b2a]/80 shadow-2xl">
      {/* Decorative background glow */}
      <div className="absolute -top-24 -right-24 w-48 h-48 bg-[color:var(--accent)]/10 blur-[80px] rounded-full group-hover:bg-[color:var(--accent)]/20 transition-colors" />
      
      <div className="relative z-10 flex flex-col items-center">
        <div className="w-14 h-14 rounded-full bg-[color:var(--accent)]/10 border border-[color:var(--accent)]/20 flex items-center justify-center mb-6 text-[color:var(--accent)]">
          <Video className="w-6 h-6" />
        </div>

        <p className="font-display text-[11px] tracking-[0.35em] uppercase text-[color:var(--accent)] mb-3">
          {t.livestream.eyebrow}
        </p>
        
        <h3 className="font-display text-3xl sm:text-4xl text-white uppercase tracking-tight mb-4">
          {t.livestream.heading}
        </h3>
        
        <p className="text-[color:var(--muted)] text-base sm:text-lg mb-8 max-w-md mx-auto leading-relaxed">
          {t.livestream.body}
        </p>

        <a
          href={checkoutUrl}
          onClick={() =>
            trackBeginCheckout({
              variantId: LIVESTREAM_VARIANT_ID,
              quantity: 1,
              tier: "livestream",
              utm: { ...utm, content: "livestream" },
            })
          }
          className="group relative inline-flex items-center gap-3 bg-white text-[#0a0d14] font-semibold px-10 py-4 rounded-full text-[15px] transition-all hover:-translate-y-0.5 hover:shadow-[0_0_30px_rgba(255,255,255,0.2)]"
        >
          <span className="relative z-10 flex items-center gap-2">
            {t.livestream.cta}
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </span>
        </a>

        {/* Pricing tag for emphasis */}
        <div className="mt-6 flex items-center justify-center gap-3">
          <span className="text-[color:var(--muted)] line-through text-sm opacity-50">
            {t.livestream.priceOrig}
          </span>
          <span className="bg-[color:var(--accent)]/10 text-[color:var(--accent)] px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border border-[color:var(--accent)]/20">
            Special Offer
          </span>
        </div>
      </div>
    </div>
  );
}
