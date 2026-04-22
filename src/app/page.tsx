import { cookies } from "next/headers";
import { LocaleProvider } from "@/lib/i18n/context";
import { DEFAULT_LOCALE, type Locale } from "@/lib/i18n/dict";
import HomeContent from "@/components/home-content";

export default async function Home() {
  const cookieStore = await cookies();
  const cookieLocale = cookieStore.get("locale")?.value;
  const initial: Locale = cookieLocale === "en" ? "en" : DEFAULT_LOCALE;

  return (
    <LocaleProvider initial={initial}>
      <HomeContent />
    </LocaleProvider>
  );
}
