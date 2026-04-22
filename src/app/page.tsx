import { cookies } from "next/headers";
import { LocaleProvider } from "@/lib/i18n/context";
import { DEFAULT_LOCALE, type Locale } from "@/lib/i18n/dict";
import Home2Content from "@/components/home2/home2-content";
import "./home2/home2.css";

export default async function Home() {
  const cookieStore = await cookies();
  const cookieLocale = cookieStore.get("locale")?.value;
  const initial: Locale = cookieLocale === "en" ? "en" : DEFAULT_LOCALE;

  return (
    <LocaleProvider initial={initial}>
      <Home2Content />
    </LocaleProvider>
  );
}
