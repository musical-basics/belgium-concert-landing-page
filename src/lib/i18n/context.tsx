"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import { dict, type Locale, type Dict } from "./dict";

type Ctx = {
  locale: Locale;
  setLocale: (l: Locale) => void;
  t: Dict;
};

const LocaleContext = createContext<Ctx | null>(null);

export function LocaleProvider({
  initial,
  children,
}: {
  initial: Locale;
  children: ReactNode;
}) {
  const [locale, setLocaleState] = useState<Locale>(initial);
  const setLocale = (l: Locale) => {
    setLocaleState(l);
    if (typeof document !== "undefined") {
      document.cookie = `locale=${l}; path=/; max-age=31536000; samesite=lax`;
      document.documentElement.setAttribute("lang", l);
    }
  };
  return (
    <LocaleContext.Provider value={{ locale, setLocale, t: dict[locale] }}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale(): Ctx {
  const ctx = useContext(LocaleContext);
  if (!ctx) throw new Error("useLocale must be used within LocaleProvider");
  return ctx;
}
