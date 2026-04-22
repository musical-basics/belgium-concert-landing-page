import type { Metadata } from "next";
import { cookies } from "next/headers";
import { LocaleProvider } from "@/lib/i18n/context";
import { DEFAULT_LOCALE, type Locale } from "@/lib/i18n/dict";
import Home2Content from "@/components/home2/home2-content";
import "./home2.css";

export const metadata: Metadata = {
  title: "Lionel Yu | Classical Piano & EDM — One Night in Belgium",
  description:
    "June 11, 2026 · Theaterzaal Maupertuis, Zaventem. Classical piano, rebuilt with the energy of EDM.",
  robots: { index: false, follow: false }, // A/B alt route — keep out of search until chosen
};

export default async function Home2Page() {
  const cookieStore = await cookies();
  const cookieLocale = cookieStore.get("locale")?.value;
  const initial: Locale = cookieLocale === "en" ? "en" : DEFAULT_LOCALE;

  return (
    <LocaleProvider initial={initial}>
      <Home2Content />
    </LocaleProvider>
  );
}
