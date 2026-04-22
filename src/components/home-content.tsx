"use client";

import Image from "next/image";
import { ArrowDownRight, Info, Music, Ticket, MapPin, Mail } from "lucide-react";
import TicketSelector from "@/components/ticket-selector";
import YouTubeFacade from "@/components/youtube-facade";
import EmailCapture from "@/components/email-capture";
import LocaleToggle from "@/components/locale-toggle";
import { useLocale } from "@/lib/i18n/context";
import { renderEmphasis } from "@/lib/i18n/utils";

const VENUE_URL =
  "https://www.ccdefactorij.be/nl/programma/lionel-yu-klassieke-piano-en-edm/7132/";
const YOUTUBE_VIDEO_ID = "nQfrxcxZ45s";

function YouTubeGlyph({ className = "w-3.5 h-3.5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={className} fill="currentColor">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  );
}

export default function HomeContent() {
  const { t } = useLocale();

  return (
    <div className="bg-[#F4F4F2] text-[#121622] selection:bg-[#121622] selection:text-white min-h-screen flex flex-col font-sans antialiased">
      <nav className="fixed top-0 w-full z-50 bg-[#F4F4F2]/85 backdrop-blur-xl border-b border-[#B9C1D1]/40 px-6 py-4 flex justify-between items-center transition-all duration-300">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold tracking-widest uppercase text-[#20242F]">Lionel Yu</span>
          <span className="w-1 h-1 rounded-full bg-[#20242F]/50"></span>
          <span className="text-xs font-medium tracking-wide text-[#20242F]/70">{t.nav.eyebrow}</span>
        </div>
        <div className="flex items-center gap-4">
          <LocaleToggle />
          <a href="#tickets" className="group hidden sm:flex items-center gap-2 text-sm font-medium hover:text-[#20242F] transition-colors">
            {t.nav.tickets}
            <ArrowDownRight className="w-4 h-4 transition-transform group-hover:translate-y-[2px] group-hover:translate-x-[2px]" />
          </a>
        </div>
      </nav>

      <main className="flex-grow pt-[80px]">
        {/* HERO */}
        <section className="max-w-[1800px] mx-auto px-4 sm:px-8 border-x border-[#B9C1D1]/20 min-h-[85vh] flex flex-col">
          <div className="grid grid-cols-1 lg:grid-cols-12 flex-grow">
            <div className="lg:col-span-7 flex flex-col justify-between pt-16 pb-8 lg:pr-16 relative z-10 animate-in fade-in slide-in-from-bottom-6 duration-1000">
              <div className="inline-flex items-center gap-3 mb-8">
                <div className="flex h-6 items-center rounded-full border border-[#121622] px-3 text-[11px] font-semibold uppercase tracking-widest text-[#121622]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#121622] mr-2 animate-pulse"></span>
                  {t.hero.livePill}
                </div>
              </div>

              <div className="mb-12 space-y-6">
                <div>
                  <div className="inline-flex items-center gap-2 rounded-full bg-[#121622] text-white px-3 py-1.5 mb-4">
                    <YouTubeGlyph className="w-3.5 h-3.5 text-[#FF0000]" />
                    <span className="text-[11px] font-semibold tracking-wide">{t.hero.credibility}</span>
                  </div>
                  <h1 className="text-[40px] md:text-[64px] font-medium leading-[0.95] tracking-[-0.03em] text-[#121622] mb-4">
                    {t.hero.title}
                  </h1>
                  <p className="text-[18px] leading-[1.6] text-[#3D404A] max-w-2xl">
                    {t.hero.tagline}
                  </p>
                </div>

                <div className="pt-2 flex flex-col items-start gap-2">
                  <a
                    href="#tickets"
                    className="group inline-flex items-center gap-3 bg-[#121622] text-white font-semibold text-[15px] px-7 py-4 rounded-[999px] ring-1 ring-white/10 shadow-2xl shadow-black/20 hover:-translate-y-0.5 transition-all"
                  >
                    {t.hero.ctaButton}
                    <Ticket className="w-4 h-4 transition-transform group-hover:rotate-12" />
                  </a>
                  <p className="text-[12px] text-[#3D404A]/80">{t.hero.scarcity}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-px bg-[#B9C1D1]/30 border border-[#B9C1D1]/30 mt-auto">
                {(["date", "time", "venue", "location"] as const).map((key) => {
                  const fact = t.hero.facts[key];
                  return (
                    <div key={key} className="bg-[#F4F4F2] p-6 sm:p-8 flex flex-col justify-center">
                      <span className="text-[10px] font-semibold uppercase tracking-widest text-[#3D404A] mb-2">{fact.label}</span>
                      <span className="text-[16px] font-medium text-[#121622] leading-tight">{fact.value}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="lg:col-span-5 relative py-8 lg:py-16 animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-300">
              {/* TODO: A/B test against a high-energy performance shot once asset is available. */}
              <div className="relative w-full h-[60vh] lg:h-[80vh] rounded-[24px] overflow-hidden shadow-2xl shadow-[#121622]/10 border border-[#B9C1D1]/20 group">
                <Image
                  src="/images/hero.png"
                  alt={t.hero.imageCaption}
                  fill
                  className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  priority
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#121622]/80 via-[#121622]/30 to-transparent p-4 sm:p-5">
                  <p className="text-[11px] sm:text-[12px] font-medium text-white/90 tracking-wide">
                    {t.hero.imageCaption}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="w-full h-px bg-[#B9C1D1]/30"></div>

        {/* ABOUT + PROGRAM */}
        <section className="max-w-[1800px] mx-auto px-4 sm:px-8 border-x border-[#B9C1D1]/20 py-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">
            <div className="lg:col-span-5 lg:pr-12 lg:border-r lg:border-[#B9C1D1]/30 space-y-8">
              <div>
                <h2 className="text-[23.2px] leading-[1.2] font-medium tracking-tight text-[#121622] mb-6 flex items-center gap-3">
                  <Info className="w-6 h-6 text-[#3D404A]" />
                  {t.about.heading}
                </h2>
                <p className="text-[18px] leading-[1.7] text-[#3D404A]">
                  {t.about.body}
                </p>
              </div>

              <div className="border-t border-[#B9C1D1]/30 pt-8">
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#3D404A] mb-3">
                  {t.about.partnershipLabel}
                </p>
                <p className="text-[15px] leading-[1.6] text-[#3D404A]">
                  {t.about.partnership}
                </p>
              </div>
            </div>

            <div className="lg:col-span-7 lg:pl-4 space-y-8">
              <div>
                <h2 className="text-[23.2px] leading-[1.2] font-medium tracking-tight text-[#121622] mb-6 flex items-center gap-3">
                  <Music className="w-6 h-6 text-[#3D404A]" />
                  {t.program.heading}
                </h2>
                <p className="text-[20px] leading-[1.6] text-[#121622] font-light">
                  {renderEmphasis(t.program.narrative)}
                </p>
                <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-[#B9C1D1]/60 px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-[#3D404A]">
                  {t.program.runtime}
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="w-full h-px bg-[#B9C1D1]/30"></div>

        {/* SOCIAL PROOF STRIP */}
        <section className="max-w-[1800px] mx-auto px-4 sm:px-8 border-x border-[#B9C1D1]/20 py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[#B9C1D1]/30 border border-[#B9C1D1]/30">
            <div className="bg-[#F4F4F2] p-8 flex flex-col items-start gap-2">
              <YouTubeGlyph className="w-6 h-6 text-[#FF0000]" />
              <span className="text-[36px] leading-none font-medium text-[#121622] tracking-tight">
                {t.social.tiles.youtube.value}
              </span>
              <span className="text-[13px] text-[#3D404A]">{t.social.tiles.youtube.label}</span>
            </div>
            <div className="bg-[#F4F4F2] p-8 flex flex-col items-start gap-2">
              <span className="text-[10px] font-semibold uppercase tracking-widest text-[#3D404A]">Venue</span>
              <span className="text-[36px] leading-none font-medium text-[#121622] tracking-tight">
                {t.social.tiles.carnegie.value}
              </span>
              <span className="text-[13px] text-[#3D404A]">{t.social.tiles.carnegie.label}</span>
            </div>
            <div className="bg-[#F4F4F2] p-8 flex flex-col items-start gap-2">
              <span className="text-[10px] font-semibold uppercase tracking-widest text-[#3D404A]">Series</span>
              <span className="text-[36px] leading-none font-medium text-[#121622] tracking-tight">
                {t.social.tiles.nightmare.value}
              </span>
              <span className="text-[13px] text-[#3D404A]">{t.social.tiles.nightmare.label}</span>
            </div>
          </div>
        </section>

        <div className="w-full h-px bg-[#B9C1D1]/30"></div>

        {/* VIDEO */}
        <section className="max-w-[1800px] mx-auto px-4 sm:px-8 border-x border-[#B9C1D1]/20 py-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-4">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#3D404A] mb-3">{t.video.kicker}</p>
              <h2 className="text-[34px] md:text-[48px] font-medium leading-[1] tracking-[-0.03em] text-[#121622] mb-6">
                {t.video.heading}
              </h2>
              <p className="text-[18px] leading-[1.7] text-[#3D404A] max-w-xl mb-4">
                {t.video.body}
              </p>
              <a
                href="https://www.youtube.com/@MusicalBasics"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-[14px] font-medium text-[#121622] border-b border-[#121622]/40 hover:border-[#121622] transition-colors"
              >
                <YouTubeGlyph className="w-4 h-4 text-[#FF0000]" />
                {t.video.watchMore}
              </a>
            </div>
            <div className="lg:col-span-8">
              <div className="relative w-full overflow-hidden rounded-[24px] border border-[#B9C1D1]/20 shadow-2xl shadow-[#121622]/10 bg-black aspect-video">
                <YouTubeFacade
                  videoId={YOUTUBE_VIDEO_ID}
                  title={t.video.heading}
                  playLabel={t.video.playLabel}
                />
              </div>
            </div>
          </div>
        </section>

        <div className="w-full h-px bg-[#B9C1D1]/30"></div>

        {/* TICKETS */}
        <section id="tickets" className="max-w-[1800px] mx-auto px-4 sm:px-8 border-x border-[#B9C1D1]/20 bg-[#121622] min-h-[60vh] flex flex-col items-center justify-center relative overflow-hidden group py-24">
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none flex items-center justify-center">
            <div className="w-[80vw] h-[80vw] border-[1px] border-white rounded-full group-hover:scale-110 transition-transform duration-1000 ease-in-out"></div>
          </div>

          <div className="relative z-10 flex flex-col items-center max-w-4xl px-4 w-full">
            <span className="text-[#B9C1D1]/70 uppercase tracking-[0.2em] text-sm mb-4 block text-center">
              {t.tickets.kicker}
            </span>
            <h2 className="text-[42px] sm:text-[58px] font-medium tracking-tight text-white mb-4 text-center">
              {t.tickets.heading}
            </h2>
            <p className="text-[#B9C1D1] text-base sm:text-lg leading-[1.7] mb-10 text-center">
              {t.tickets.priceLine}
            </p>
            <TicketSelector />
          </div>
        </section>

        <div className="w-full h-px bg-[#B9C1D1]/30"></div>

        {/* EMAIL CAPTURE + VENUE/QUESTIONS */}
        <section className="max-w-[1800px] mx-auto px-4 sm:px-8 border-x border-[#B9C1D1]/20 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-7">
              <EmailCapture />
            </div>
            <div className="lg:col-span-5 space-y-4 lg:pt-2">
              <a
                href={VENUE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3 rounded-[16px] border border-[#B9C1D1]/40 bg-white/40 px-5 py-4 text-[14px] font-medium text-[#121622] hover:bg-white/80 transition-colors"
              >
                <MapPin className="w-5 h-5 text-[#3D404A] shrink-0" />
                <span className="flex-1">{t.venue.linkText}</span>
                <ArrowDownRight className="w-4 h-4 text-[#3D404A] -rotate-90 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
              <a
                href={`mailto:${t.questions.email}`}
                className="group flex items-center gap-3 rounded-[16px] border border-[#B9C1D1]/40 bg-white/40 px-5 py-4 text-[14px] font-medium text-[#121622] hover:bg-white/80 transition-colors"
              >
                <Mail className="w-5 h-5 text-[#3D404A] shrink-0" />
                <span className="flex-1">
                  <span className="font-semibold">{t.questions.prompt}</span>{" "}
                  <span className="text-[#3D404A]">{t.questions.email}</span>
                </span>
                <ArrowDownRight className="w-4 h-4 text-[#3D404A] -rotate-90 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="w-full border-t border-[#B9C1D1]/20 bg-[#F4F4F2] py-6 px-8 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 text-xs text-[#3D404A]/60">
        <p>© 2026 Lionel Yu Live. {t.footer.rights}</p>
        <p>{t.footer.location}</p>
      </footer>
    </div>
  );
}
