import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { cookies } from "next/headers";
import Analytics from "@/components/analytics";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const SITE_URL = "https://belgium.musicalbasics.com";
const OG_IMAGE = "/images/og-concert.jpg";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Lionel Yu Live · Zaventem · 11 juni 2026 | Belgium Concert",
  description:
    "Klassieke piano ontmoet EDM. Lionel Yu (1,2M op YouTube) live in Zaventem op 11 juni 2026. Classical piano meets EDM — one night only, June 11 in Zaventem.",
  openGraph: {
    type: "website",
    title: "Lionel Yu Live · Belgium · June 11, 2026",
    description:
      "Klassieke piano ontmoet EDM. Live in Zaventem op 11 juni 2026. Classical piano meets EDM — one night only.",
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "Lionel Yu Live · Belgium · June 11, 2026",
      },
    ],
    locale: "nl_BE",
    alternateLocale: ["en_US"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Lionel Yu Live · Belgium · June 11, 2026",
    description: "Classical piano meets EDM. One night only, June 11 in Zaventem.",
    images: [OG_IMAGE],
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const lang = cookieStore.get("locale")?.value === "en" ? "en" : "nl";

  return (
    <html
      lang={lang}
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased scroll-smooth`}
    >
      <body className="min-h-full flex flex-col">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
