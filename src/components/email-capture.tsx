"use client";

import { useState } from "react";
import { Mail, Check, AlertCircle } from "lucide-react";
import { useLocale } from "@/lib/i18n/context";

type Status = "idle" | "submitting" | "success" | "error";

export default function EmailCapture() {
  const { t } = useLocale();
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [consent, setConsent] = useState(false);
  const [honeypot, setHoneypot] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (status === "submitting") return;
    setStatus("submitting");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          email,
          first_name: firstName,
          gdpr_consent: consent,
          honeypot,
        }),
      });
      setStatus(res.ok ? "success" : "error");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-[24px] border border-[#B9C1D1]/40 bg-white/60 p-8 text-center">
        <div className="mx-auto mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-[#121622] text-white">
          <Check className="w-5 h-5" />
        </div>
        <h3 className="text-[20px] font-medium text-[#121622] mb-2">
          {t.email.successTitle}
        </h3>
        <p className="text-[15px] text-[#3D404A]">{t.email.successBody}</p>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="rounded-[24px] border border-[#B9C1D1]/40 bg-white/60 p-6 sm:p-8"
    >
      <div className="mb-5">
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#3D404A] mb-2">
          {t.email.kicker}
        </p>
        <h3 className="text-[22px] sm:text-[26px] font-medium text-[#121622] leading-tight mb-2">
          {t.email.heading}
        </h3>
        <p className="text-[14px] leading-[1.6] text-[#3D404A] max-w-xl">
          {t.email.body}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
        <input
          type="text"
          autoComplete="given-name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          placeholder={t.email.namePlaceholder}
          className="rounded-[12px] border border-[#B9C1D1]/60 bg-white px-4 py-3 text-[#121622] placeholder:text-[#3D404A]/50 outline-none focus:border-[#121622] transition-colors"
          required
          maxLength={80}
        />
        <input
          type="email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={t.email.emailPlaceholder}
          className="rounded-[12px] border border-[#B9C1D1]/60 bg-white px-4 py-3 text-[#121622] placeholder:text-[#3D404A]/50 outline-none focus:border-[#121622] transition-colors"
          required
          maxLength={254}
        />
      </div>

      <label className="mt-2 flex items-start gap-2 text-[13px] leading-[1.5] text-[#3D404A] cursor-pointer">
        <input
          type="checkbox"
          checked={consent}
          onChange={(e) => setConsent(e.target.checked)}
          required
          className="mt-0.5 h-4 w-4 accent-[#121622]"
        />
        <span>{t.email.consent}</span>
      </label>

      <input
        type="text"
        tabIndex={-1}
        autoComplete="off"
        value={honeypot}
        onChange={(e) => setHoneypot(e.target.value)}
        aria-hidden="true"
        className="sr-only absolute -left-[9999px]"
      />

      <div className="mt-5 flex flex-col sm:flex-row sm:items-center gap-3">
        <button
          type="submit"
          disabled={status === "submitting" || !consent}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-[#121622] text-white font-semibold text-[14px] px-6 py-3 ring-1 ring-white/10 hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:translate-y-0 disabled:cursor-not-allowed"
        >
          <Mail className="w-4 h-4" />
          {t.email.submit}
        </button>
        {status === "error" && (
          <p className="inline-flex items-center gap-2 text-[13px] text-[#a33]">
            <AlertCircle className="w-4 h-4" />
            <span>
              <strong>{t.email.errorTitle}</strong> {t.email.errorBody}
            </span>
          </p>
        )}
      </div>
    </form>
  );
}
