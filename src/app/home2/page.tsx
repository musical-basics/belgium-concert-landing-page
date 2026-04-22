import type { Metadata } from "next";
import { cookies } from "next/headers";
import { LocaleProvider } from "@/lib/i18n/context";
import { DEFAULT_LOCALE, type Locale } from "@/lib/i18n/dict";
import HomeContent from "@/components/home-content";

export const metadata: Metadata = {
  title: "Lionel Yu Live · Zaventem · 11 juni 2026 (editorial)",
  description:
    "Alternate editorial landing for Lionel Yu Live — June 11, 2026 in Zaventem.",
  robots: { index: false, follow: false }, // A/B alt route — keep out of search
};

export default async function Home2Page() {
  const cookieStore = await cookies();
  const cookieLocale = cookieStore.get("locale")?.value;
  const initial: Locale = cookieLocale === "en" ? "en" : DEFAULT_LOCALE;

  return (
    <LocaleProvider initial={initial}>
      <HomeContent />
    </LocaleProvider>
  );
}
