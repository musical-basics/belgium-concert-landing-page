"use client";

import { useLocale } from "@/lib/i18n/context";
import type { Locale } from "@/lib/i18n/dict";

export default function LocaleToggle() {
  const { locale, setLocale } = useLocale();

  const options: { value: Locale; label: string }[] = [
    { value: "nl", label: "NL" },
    { value: "en", label: "EN" },
  ];

  return (
    <div
      role="group"
      aria-label="Language"
      className="inline-flex items-center rounded-full border border-[#B9C1D1]/60 bg-white/60 p-0.5 backdrop-blur-sm"
    >
      {options.map((opt) => {
        const active = opt.value === locale;
        return (
          <button
            key={opt.value}
            type="button"
            aria-pressed={active}
            onClick={() => setLocale(opt.value)}
            className={[
              "rounded-full px-3 py-1 text-[11px] font-semibold tracking-widest uppercase transition-colors",
              active
                ? "bg-[#121622] text-white"
                : "text-[#20242F]/70 hover:text-[#20242F]",
            ].join(" ")}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}
