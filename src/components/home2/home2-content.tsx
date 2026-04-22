"use client";

import Image from "next/image";
import {
  ArrowUpRight,
  ChevronDown,
  Play,
  Ticket,
  Users,
  Award,
  Flame,
  Star,
  Sparkles,
  MapPin,
  Mail,
  Disc,
} from "lucide-react";
import TicketSelector from "@/components/ticket-selector";
import YouTubeFacade from "@/components/youtube-facade";
import EmailCapture from "@/components/email-capture";
import LocaleToggle from "@/components/locale-toggle";
import { useLocale } from "@/lib/i18n/context";
import { YouTubeGlyph } from "@/components/home2/youtube-glyph";
import Countdown from "@/components/home2/countdown";
import ComposerMarquee from "@/components/home2/composer-marquee";
import StickyCta from "@/components/home2/sticky-cta";

const VENUE_URL =
  "https://www.ccdefactorij.be/nl/programma/lionel-yu-klassieke-piano-en-edm/7132/";
const YOUTUBE_VIDEO_ID = "nQfrxcxZ45s";
const YOUTUBE_CHANNEL = "https://www.youtube.com/@MusicalBasics";
const CONTACT_EMAIL = "support@musicalbasics.com";

export default function Home2Content() {
  const { t } = useLocale();

  return (
    <div className="min-h-screen bg-[color:var(--bg)] text-white antialiased selection:bg-[color:var(--accent)] selection:text-[#0a0d14] overflow-x-hidden">
      {/* Film grain overlay */}
      <div aria-hidden className="film-grain" />

      {/* Ambient nav */}
      <nav className="fixed top-0 inset-x-0 z-50 px-4 sm:px-8 py-4 flex items-center justify-between bg-[#0a0d14]/60 backdrop-blur-xl border-b border-white/[0.06]">
        <div className="flex items-center gap-2">
          <span className="font-display text-sm font-semibold tracking-[0.25em] uppercase text-white">
            Lionel Yu
          </span>
          <span className="hidden sm:inline-block w-1 h-1 rounded-full bg-white/40" />
          <span className="hidden sm:inline-block text-[11px] font-medium tracking-wide text-white/60">
            {t.nav.eyebrow}
          </span>
        </div>
        <div className="flex items-center gap-3">
          <div className="hidden sm:block">
            <LocaleToggle />
          </div>
          <a
            href="#tickets"
            className="group inline-flex items-center gap-2 rounded-full bg-[color:var(--accent)] px-4 py-2 text-[12px] font-semibold tracking-wider uppercase text-[#0a0d14] transition-transform hover:-translate-y-0.5"
          >
            {t.nav.tickets}
            <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>
      </nav>

      <main>
        {/* ============== HERO ============== */}
        <header className="relative isolate min-h-[100svh] flex flex-col">
          {/* Background image + gradient wash */}
          <div className="absolute inset-0 -z-10">
            <Image
              src="/images/og-concert.jpg"
              alt="Lionel Yu performing live"
              fill
              priority
              className="object-cover object-center opacity-55"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#0a0d14]/55 via-[#0a0d14]/60 to-[#0a0d14]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_28%,rgba(216,179,93,0.22),transparent_55%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_85%_15%,rgba(113,141,255,0.14),transparent_40%)]" />
          </div>

          {/* Mobile-only locale toggle in hero */}
          <div className="sm:hidden absolute top-[72px] right-4 z-10">
            <LocaleToggle />
          </div>

          {/* Hero content */}
          <div className="flex-1 flex flex-col items-center justify-center text-center px-4 sm:px-8 pt-28 sm:pt-32 pb-24">
            {/* Credibility pill */}
            <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 backdrop-blur-sm px-4 py-1.5 animate-in fade-in slide-in-from-bottom-2 duration-700">
              <YouTubeGlyph className="w-4 h-4 text-[#FF0000]" />
              <span className="text-[11px] font-sans font-medium text-[color:var(--muted)] uppercase tracking-[0.2em]">
                {t.hero.credibility}
              </span>
            </div>

            {/* Headline */}
            <h1 className="font-display uppercase max-w-5xl text-balance tracking-[-0.02em] leading-[0.95] text-white text-[44px] sm:text-[72px] md:text-[92px] lg:text-[108px] animate-in fade-in slide-in-from-bottom-3 duration-1000">
              {t.home2.hero.headlinePre}
              <br className="hidden md:block" />{" "}
              <span className="font-serif italic normal-case text-[color:var(--accent)] text-glow">
                {t.home2.hero.headlineEm}
              </span>
              {t.home2.hero.headlineMid}
              <br className="hidden lg:block" />{" "}
              <span className="bg-gradient-to-r from-white via-white to-[color:var(--muted)] bg-clip-text text-transparent">
                {t.home2.hero.headlinePost}
              </span>
              {t.home2.hero.headlineEnd}
            </h1>

            <p className="mt-8 text-[14px] sm:text-base font-medium text-[color:var(--muted)] tracking-[0.1em] uppercase animate-in fade-in duration-1000 delay-200">
              {t.home2.hero.subLine}
            </p>

            {/* Countdown */}
            <div className="mt-10 animate-in fade-in slide-in-from-bottom-2 duration-1000 delay-300">
              <Countdown />
            </div>

            {/* CTAs */}
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 w-full max-w-md sm:max-w-none animate-in fade-in duration-1000 delay-500">
              <a
                href="#tickets"
                className="group relative w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-[color:var(--accent)] px-9 py-4 text-[13px] font-semibold uppercase tracking-[0.2em] text-[#0a0d14] overflow-hidden transition-all hover:scale-[1.03] hover:shadow-[0_0_40px_rgba(216,179,93,0.45)]"
              >
                <span className="relative z-10 inline-flex items-center gap-2">
                  {t.home2.hero.primaryCta}
                  <Ticket className="w-4 h-4 transition-transform group-hover:rotate-12" />
                </span>
              </a>
              <a
                href="#video-preview"
                className="group flex items-center gap-3 text-white hover:text-[color:var(--accent)] transition-colors text-[12px] uppercase tracking-[0.25em] font-sans"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-full border border-white/25 group-hover:border-[color:var(--accent)] transition-colors">
                  <Play className="w-4 h-4 fill-current ml-0.5" />
                </span>
                {t.home2.hero.secondaryCta}
              </a>
            </div>
          </div>

          {/* Scroll cue */}
          <div className="hidden md:flex absolute left-6 bottom-[22%] flex-col items-center gap-3 text-[10px] uppercase tracking-[0.35em] text-white/50">
            <span className="[writing-mode:vertical-rl] rotate-180">
              {t.home2.hero.scroll}
            </span>
            <ChevronDown className="w-3.5 h-3.5 animate-bounce-soft" aria-hidden />
          </div>

          {/* Metadata strip (film credits) */}
          <div className="relative z-10 border-t border-white/[0.08] bg-[#0a0d14]/50 backdrop-blur-md">
            <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-y-5 md:divide-x md:divide-white/[0.08] px-4 sm:px-8 py-6">
              {(["date", "time", "venue", "location"] as const).map((key) => {
                const item = t.home2.hero.meta[key];
                return (
                  <div key={key} className="px-0 md:px-6 first:md:pl-0 last:md:pr-0">
                    <p className="text-[10px] text-[color:var(--muted)] uppercase tracking-[0.25em] mb-1.5">
                      {item.label}
                    </p>
                    <p className="font-display text-sm sm:text-base font-semibold text-white uppercase tracking-wider">
                      {item.value}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </header>

        {/* ============== TROPHY CASE ============== */}
        <section className="relative py-20 sm:py-28 bg-[#0d111c] border-y border-white/[0.05]">
          <div className="max-w-7xl mx-auto px-4 sm:px-8 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            <TrophyCard
              icon={<Users className="w-8 h-8 text-white/25" strokeWidth={1} />}
              value={t.home2.trophy.subs.value}
              title={t.home2.trophy.subs.title}
              body={t.home2.trophy.subs.body}
              accent="gold"
            />
            <TrophyCard
              icon={<Award className="w-8 h-8 text-white/25" strokeWidth={1} />}
              value={t.home2.trophy.carnegie.value}
              valueClass="text-[28px] sm:text-[36px] leading-[1.05]"
              title={t.home2.trophy.carnegie.title}
              body={t.home2.trophy.carnegie.body}
              accent="glow"
            />
            <TrophyCard
              icon={<Flame className="w-8 h-8 text-white/25" strokeWidth={1} />}
              value={t.home2.trophy.views.value}
              title={t.home2.trophy.views.title}
              body={t.home2.trophy.views.body}
              accent="plain"
            />
          </div>
        </section>

        {/* ============== COMPOSER MARQUEE ============== */}
        <ComposerMarquee />

        {/* ============== PROGRAM (3 ACTS) ============== */}
        <section className="relative py-24 sm:py-32 bg-[color:var(--bg)]">
          <div className="max-w-5xl mx-auto px-4 sm:px-8">
            <div className="text-center mb-16 sm:mb-24">
              <h2 className="font-display text-4xl sm:text-6xl md:text-7xl text-white uppercase tracking-tight mb-4">
                {t.home2.program.kicker}
              </h2>
              <p className="font-serif italic text-lg sm:text-xl text-[color:var(--muted)]">
                {t.home2.program.subtitle}
              </p>
              <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.25em] text-[color:var(--muted)]">
                {t.home2.program.runtime}
              </div>
            </div>

            <div className="relative">
              {/* Vertical thread */}
              <div
                aria-hidden
                className="hidden sm:block absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 bg-gradient-to-b from-white/0 via-white/15 to-white/0"
              />
              <div className="space-y-16 sm:space-y-24">
                <ActPanel
                  numeral="I"
                  align="left"
                  accent="gold"
                  eyebrow={t.home2.program.act1.eyebrow}
                  title={t.home2.program.act1.title}
                  mood={t.home2.program.act1.mood}
                  pieces={t.home2.program.act1.pieces}
                />
                <ActPanel
                  numeral="II"
                  align="right"
                  accent="ash"
                  eyebrow={t.home2.program.act2.eyebrow}
                  title={t.home2.program.act2.title}
                  mood={t.home2.program.act2.mood}
                  pieces={t.home2.program.act2.pieces}
                />
                <ActPanel
                  numeral="III"
                  align="left"
                  accent="gold"
                  eyebrow={t.home2.program.act3.eyebrow}
                  title={t.home2.program.act3.title}
                  mood={t.home2.program.act3.mood}
                  pieces={t.home2.program.act3.pieces}
                />
              </div>
            </div>
          </div>
        </section>

        {/* ============== VIDEO ============== */}
        <section
          id="video-preview"
          className="relative py-24 bg-[#0d111c] border-y border-white/[0.05]"
        >
          <div className="max-w-6xl mx-auto px-4 sm:px-8">
            <div className="relative aspect-video w-full overflow-hidden rounded-sm border border-white/10 bg-black shadow-[0_30px_100px_-20px_rgba(0,0,0,0.8)]">
              <YouTubeFacade
                videoId={YOUTUBE_VIDEO_ID}
                title={t.video.heading}
                playLabel={t.video.playLabel}
              />
              {/* Letterbox overlay bars */}
              <div
                aria-hidden
                className="pointer-events-none absolute top-0 inset-x-0 h-10 bg-gradient-to-b from-black/80 to-transparent"
              />
              <div
                aria-hidden
                className="pointer-events-none absolute bottom-0 inset-x-0 h-10 bg-gradient-to-t from-black/80 to-transparent"
              />
            </div>
            <div className="mt-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <p className="font-serif italic text-[color:var(--muted)] text-lg">
                {t.home2.video.caption}
              </p>
              <a
                href={YOUTUBE_CHANNEL}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2 text-[11px] uppercase tracking-[0.25em] text-white/70 hover:text-white transition-colors"
              >
                <YouTubeGlyph className="w-5 h-5 text-[#FF0000]" />
                {t.home2.video.fullCatalog}
                <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </div>
          </div>
        </section>

        {/* ============== VIP EXPERIENCE MOMENT ============== */}
        <section className="relative overflow-hidden py-24 sm:py-28 bg-[color:var(--bg)]">
          <div
            aria-hidden
            className="absolute -top-20 -left-20 w-[28rem] h-[28rem] bg-[color:var(--accent)]/10 blur-[120px] rounded-full pointer-events-none"
          />
          <div
            aria-hidden
            className="absolute -bottom-32 -right-20 w-[32rem] h-[32rem] bg-[#7289ff]/10 blur-[120px] rounded-full pointer-events-none"
          />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-8">
            <div className="relative max-w-2xl ml-0 md:ml-12 rounded-2xl border border-[color:var(--accent)]/35 bg-[#0b0e16]/80 backdrop-blur-xl p-8 sm:p-12 shadow-[0_0_60px_-20px_rgba(216,179,93,0.35)]">
              <div
                aria-hidden
                className="absolute -top-16 -left-16 w-48 h-48 bg-[color:var(--accent)]/25 blur-[70px] rounded-full pointer-events-none"
              />
              <div className="inline-flex items-center gap-1.5 rounded-full border border-[color:var(--accent)]/50 px-3 py-1 text-[10px] uppercase tracking-[0.25em] text-[color:var(--accent)] mb-6">
                <Sparkles className="w-3 h-3" />
                {t.home2.vip.pill}
              </div>

              <h2 className="font-display text-4xl sm:text-6xl uppercase leading-[0.95] tracking-tight text-white mb-4">
                {t.home2.vip.titlePre}
                <br />
                <span className="font-serif italic normal-case text-[color:var(--accent)] text-glow">
                  {t.home2.vip.titleEm}
                </span>
              </h2>
              <p className="font-serif italic text-lg sm:text-xl text-[color:var(--muted)] mb-10 max-w-lg">
                {t.home2.vip.subtitle}
              </p>

              <ul className="space-y-5 mb-10">
                <VipBullet
                  icon={<Star className="w-5 h-5 text-[color:var(--accent)]" strokeWidth={1.5} />}
                  title={t.home2.vip.seat.title}
                  body={t.home2.vip.seat.body}
                />
                <VipBullet
                  icon={<Users className="w-5 h-5 text-[color:var(--accent)]" strokeWidth={1.5} />}
                  title={t.home2.vip.meet.title}
                  body={t.home2.vip.meet.body}
                />
                <VipBullet
                  icon={<Disc className="w-5 h-5 text-[color:var(--accent)]" strokeWidth={1.5} />}
                  title={t.home2.vip.drinks.title}
                  body={t.home2.vip.drinks.body}
                />
              </ul>

              <a
                href="#tickets"
                className="group inline-flex items-center gap-2 rounded-full border border-[color:var(--accent)] bg-transparent px-8 py-4 text-[12px] font-semibold uppercase tracking-[0.25em] text-[color:var(--accent)] transition-colors hover:bg-[color:var(--accent)] hover:text-[#0a0d14]"
              >
                {t.home2.vip.cta}
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </div>
          </div>
        </section>

        {/* ============== TICKETS ============== */}
        <section
          id="tickets"
          className="relative py-24 sm:py-32 bg-[#0d111c] border-t border-white/[0.05]"
        >
          <div className="max-w-4xl mx-auto px-4 sm:px-8">
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="font-display text-4xl sm:text-6xl md:text-7xl text-white uppercase tracking-tight mb-4 text-balance">
                {t.home2.tickets.heading}
              </h2>
              <p className="font-serif italic text-lg sm:text-xl text-[color:var(--muted)] max-w-xl mx-auto">
                {t.home2.tickets.subtitle}
              </p>
            </div>

            {/* Decorative backdrop for ticket grid */}
            <div className="relative">
              <div
                aria-hidden
                className="absolute inset-0 bg-[color:var(--accent)]/[0.06] blur-[100px] pointer-events-none"
              />
              <div className="relative">
                <TicketSelector />
              </div>
            </div>
          </div>
        </section>

        {/* ============== EMAIL + LINKS ============== */}
        <section className="relative py-20 bg-[color:var(--bg)]">
          <div className="max-w-7xl mx-auto px-4 sm:px-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-7">
              {/* Wrap the light EmailCapture in a tinted container so it sits cleanly on dark. */}
              <div className="rounded-[24px] bg-white/[0.04] border border-white/10 p-1">
                <EmailCapture />
              </div>
            </div>
            <div className="lg:col-span-5 space-y-3">
              <a
                href={VENUE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-4 text-[14px] font-medium text-white hover:bg-white/[0.06] transition-colors"
              >
                <MapPin className="w-5 h-5 text-[color:var(--muted)] shrink-0" />
                <span className="flex-1">{t.venue.linkText}</span>
                <ArrowUpRight className="w-4 h-4 text-[color:var(--muted)] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="group flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-4 text-[14px] font-medium text-white hover:bg-white/[0.06] transition-colors"
              >
                <Mail className="w-5 h-5 text-[color:var(--muted)] shrink-0" />
                <span className="flex-1">
                  <span className="font-semibold">{t.questions.prompt}</span>{" "}
                  <span className="text-[color:var(--muted)]">{CONTACT_EMAIL}</span>
                </span>
                <ArrowUpRight className="w-4 h-4 text-[color:var(--muted)] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* ============== FOOTER ============== */}
      <footer className="border-t border-white/[0.06] bg-[color:var(--bg)] py-10 sm:py-12 pb-24 sm:pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <p className="font-display text-base tracking-[0.3em] uppercase text-white/60 mb-2">
              Lionel Yu
            </p>
            <p className="text-xs text-[color:var(--muted)] max-w-sm">
              {t.about.partnership}
            </p>
          </div>
          <div className="flex flex-col md:items-end gap-2 text-[11px] uppercase tracking-[0.2em] text-white/40">
            <p>© 2026 Musical Basics. {t.footer.rights}</p>
            <p>{t.footer.location}</p>
          </div>
        </div>
      </footer>

      {/* ============== STICKY MOBILE CTA ============== */}
      <StickyCta />
    </div>
  );
}

/* ---------- Local helpers ---------- */

function TrophyCard({
  icon,
  value,
  valueClass,
  title,
  body,
  accent,
}: {
  icon: React.ReactNode;
  value: string;
  valueClass?: string;
  title: string;
  body: string;
  accent: "gold" | "glow" | "plain";
}) {
  return (
    <div className="relative overflow-hidden rounded-xl border border-white/[0.06] bg-[#0a0d14]/70 p-8">
      {accent === "glow" && (
        <div
          aria-hidden
          className="absolute top-0 right-0 w-40 h-40 bg-[color:var(--accent)]/10 blur-[60px] rounded-full"
        />
      )}
      <div className="relative mb-6">{icon}</div>
      <h3
        className={[
          "font-display font-semibold tracking-tight mb-2 uppercase",
          valueClass ?? "text-[46px] sm:text-[56px] leading-none",
          accent === "gold" ? "text-[color:var(--accent)]" : "text-white",
        ].join(" ")}
      >
        {value}
      </h3>
      <p className="font-serif italic text-lg text-white/90 mb-2">{title}</p>
      <p className="text-sm text-[color:var(--muted)] leading-relaxed">{body}</p>
    </div>
  );
}

function ActPanel({
  numeral,
  align,
  accent,
  eyebrow,
  title,
  mood,
  pieces,
}: {
  numeral: string;
  align: "left" | "right";
  accent: "gold" | "ash";
  eyebrow: string;
  title: string;
  mood: string;
  pieces: readonly string[];
}) {
  const dotColor =
    accent === "gold"
      ? "bg-[color:var(--accent)] shadow-[0_0_18px_#d8b35d]"
      : "bg-[color:var(--muted)]";

  return (
    <div
      className={[
        "relative grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-16 items-center",
      ].join(" ")}
    >
      {/* Marker */}
      <span
        aria-hidden
        className={[
          "hidden sm:block absolute left-1/2 top-3 -translate-x-1/2 w-3 h-3 rounded-full",
          dotColor,
        ].join(" ")}
      />

      {/* Text column */}
      <div
        className={[
          "relative",
          align === "right" ? "sm:order-2 sm:pl-12" : "sm:pr-12",
          align === "left" ? "sm:text-right" : "sm:text-left",
        ].join(" ")}
      >
        <span
          aria-hidden
          className={[
            "absolute font-display font-semibold text-white/[0.05] select-none leading-none",
            "text-[120px] sm:text-[160px] md:text-[180px] -top-6 sm:-top-10",
            align === "right" ? "sm:-left-4" : "sm:-right-4",
          ].join(" ")}
        >
          {numeral}
        </span>
        <div className="relative">
          <p
            className={[
              "font-display text-[11px] tracking-[0.35em] uppercase mb-3",
              accent === "gold"
                ? "text-[color:var(--accent)]"
                : "text-[color:var(--muted)]",
            ].join(" ")}
          >
            {eyebrow}
          </p>
          <h3 className="font-serif italic text-3xl sm:text-4xl md:text-5xl text-white mb-4 leading-tight">
            {title}
          </h3>
          <p className="text-[color:var(--muted)] text-[15px] leading-relaxed mb-6 max-w-md sm:ml-auto">
            {mood}
          </p>
          <ul
            className={[
              "space-y-2 font-serif italic text-lg text-white/85",
              align === "left"
                ? "sm:text-right"
                : "sm:text-left",
            ].join(" ")}
          >
            {pieces.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* Visual column (typography-forward, no stock photo) */}
      <div
        className={[
          "relative aspect-[4/5] sm:aspect-auto sm:h-[280px] md:h-[340px]",
          align === "right" ? "sm:order-1" : "",
        ].join(" ")}
      >
        <div
          aria-hidden
          className="absolute inset-0 rounded-lg border border-white/[0.08] bg-gradient-to-br from-white/[0.04] to-transparent overflow-hidden"
        >
          <div
            className={[
              "absolute inset-0 opacity-60",
              accent === "gold"
                ? "bg-[radial-gradient(circle_at_30%_30%,rgba(216,179,93,0.22),transparent_60%)]"
                : "bg-[radial-gradient(circle_at_30%_30%,rgba(113,141,255,0.18),transparent_60%)]",
            ].join(" ")}
          />
          <div
            className="absolute inset-0 opacity-[0.07]"
            style={{
              backgroundImage:
                "repeating-linear-gradient(90deg, rgba(255,255,255,0.6) 0 1px, transparent 1px 14px)",
            }}
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="font-display font-bold text-[200px] sm:text-[220px] md:text-[260px] leading-none text-white/[0.08] select-none">
              {numeral}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

function VipBullet({
  icon,
  title,
  body,
}: {
  icon: React.ReactNode;
  title: string;
  body: string;
}) {
  return (
    <li className="flex items-start gap-4">
      <span className="mt-0.5 shrink-0">{icon}</span>
      <div>
        <p className="font-sans font-semibold text-white">{title}</p>
        <p className="text-sm text-[color:var(--muted)] leading-relaxed">{body}</p>
      </div>
    </li>
  );
}
