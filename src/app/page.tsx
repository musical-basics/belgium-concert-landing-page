import Image from "next/image";
import { ArrowDownRight, Info, Music, Ticket } from "lucide-react";
import TicketSelector from "@/components/ticket-selector";

function YouTubeGlyph({ className = "w-3.5 h-3.5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={className} fill="currentColor">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  );
}

export default function Home() {
  return (
    <div className="bg-[#F4F4F2] text-[#121622] selection:bg-[#121622] selection:text-white min-h-screen flex flex-col font-sans antialiased">
      <nav className="fixed top-0 w-full z-50 bg-[#F4F4F2]/85 backdrop-blur-xl border-b border-[#B9C1D1]/40 px-6 py-4 flex justify-between items-center transition-all duration-300">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold tracking-widest uppercase text-[#20242F]">Lionel Yu</span>
          <span className="w-1 h-1 rounded-full bg-[#20242F]/50"></span>
          <span className="text-xs font-medium tracking-wide text-[#20242F]/70">Zaventem '26'</span>
        </div>
        <a href="#tickets" className="group flex items-center gap-2 text-sm font-medium hover:text-[#20242F] transition-colors">
          Tickets / Tickets
          <ArrowDownRight className="w-4 h-4 transition-transform group-hover:translate-y-[2px] group-hover:translate-x-[2px]" />
        </a>
      </nav>

      <main className="flex-grow pt-[80px]">
        <section className="max-w-[1800px] mx-auto px-4 sm:px-8 border-x border-[#B9C1D1]/20 min-h-[85vh] flex flex-col">
          <div className="grid grid-cols-1 lg:grid-cols-12 flex-grow">
            <div className="lg:col-span-7 flex flex-col justify-between pt-16 pb-8 lg:pr-16 relative z-10 animate-in fade-in slide-in-from-bottom-6 duration-1000">
              <div className="inline-flex items-center gap-3 mb-8">
                <div className="flex h-6 items-center rounded-full border border-[#121622] px-3 text-[11px] font-semibold uppercase tracking-widest text-[#121622]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#121622] mr-2 animate-pulse"></span>
                  Live in België / Live in Belgium
                </div>
              </div>

              <div className="mb-12 space-y-6">
                <div>
                  <div className="inline-flex items-center gap-2 rounded-full bg-[#121622] text-white px-3 py-1.5 mb-4">
                    <YouTubeGlyph className="w-3.5 h-3.5 text-[#FF0000]" />
                    <span className="text-[11px] font-semibold tracking-wide">1,2M op YouTube</span>
                  </div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#3D404A] mb-3">Nederlands</p>
                  <h1 className="text-[40px] md:text-[64px] font-medium leading-[0.95] tracking-[-0.03em] text-[#121622] mb-4">
                    Lionel Yu, klassiek piano en EDM, 11 juni 2026
                  </h1>
                  <p className="text-[18px] leading-[1.6] text-[#3D404A] max-w-2xl">
                    Een avond waarop klassieke grootmeesters en elektronische muziek samenkomen. Live in Zaventem op 11 juni.
                  </p>
                </div>

                <div className="border-t border-[#B9C1D1]/30 pt-6">
                  <div className="inline-flex items-center gap-2 rounded-full bg-[#121622] text-white px-3 py-1.5 mb-4">
                    <YouTubeGlyph className="w-3.5 h-3.5 text-[#FF0000]" />
                    <span className="text-[11px] font-semibold tracking-wide">1.2M on YouTube</span>
                  </div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#3D404A] mb-3">English</p>
                  <h2 className="text-[34px] md:text-[52px] font-medium leading-[1] tracking-[-0.03em] text-[#121622] mb-4">
                    Lionel Yu, Classical Piano and EDM, June 11, 2026
                  </h2>
                  <p className="text-[18px] leading-[1.6] text-[#3D404A] max-w-2xl">
                    Classical piano, rebuilt with the energy of EDM. One night only, June 11 in Zaventem.
                  </p>
                </div>

                <div className="pt-4 flex flex-col items-start gap-2">
                  <a
                    href="#tickets"
                    className="group inline-flex items-center gap-3 bg-[#121622] text-white font-semibold text-[15px] px-7 py-4 rounded-[999px] ring-1 ring-white/10 shadow-2xl shadow-black/20 hover:-translate-y-0.5 transition-all"
                  >
                    Tickets kopen / Get Tickets
                    <Ticket className="w-4 h-4 transition-transform group-hover:rotate-12" />
                  </a>
                  <p className="text-[12px] text-[#3D404A]/80">
                    Beperkt aantal plaatsen · Limited seats available
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-px bg-[#B9C1D1]/30 border border-[#B9C1D1]/30 mt-auto">
                <div className="bg-[#F4F4F2] p-6 sm:p-8 flex flex-col justify-center">
                  <span className="text-[10px] font-semibold uppercase tracking-widest text-[#3D404A] mb-2">Datum / Date</span>
                  <span className="text-[16px] font-medium text-[#121622] leading-tight">Donderdag 11 juni 2026 / Thursday, June 11, 2026</span>
                </div>
                <div className="bg-[#F4F4F2] p-6 sm:p-8 flex flex-col justify-center">
                  <span className="text-[10px] font-semibold uppercase tracking-widest text-[#3D404A] mb-2">Aanvang / Time</span>
                  <span className="text-[16px] font-medium text-[#121622] leading-tight">19:30 CEST</span>
                </div>
                <div className="bg-[#F4F4F2] p-6 sm:p-8 flex flex-col justify-center">
                  <span className="text-[10px] font-semibold uppercase tracking-widest text-[#3D404A] mb-2">Zaal / Venue</span>
                  <span className="text-[16px] font-medium text-[#121622] leading-tight">Theaterzaal Maupertuis,<br />CC De Factorij</span>
                </div>
                <div className="bg-[#F4F4F2] p-6 sm:p-8 flex flex-col justify-center">
                  <span className="text-[10px] font-semibold uppercase tracking-widest text-[#3D404A] mb-2">Locatie / Location</span>
                  <span className="text-[16px] font-medium text-[#121622] leading-tight">Zaventem, België / Belgium</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 relative py-8 lg:py-16 animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-300">
              {/* TODO: A/B test against a high-energy performance shot once asset is available. */}
              <div className="relative w-full h-[60vh] lg:h-[80vh] rounded-[24px] overflow-hidden shadow-2xl shadow-[#121622]/10 border border-[#B9C1D1]/20 group">
                <Image
                  src="/images/hero.png"
                  alt="Lionel Yu performing at Carnegie Hall, New York"
                  fill
                  className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  priority
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#121622]/80 via-[#121622]/30 to-transparent p-4 sm:p-5">
                  <p className="text-[11px] sm:text-[12px] font-medium text-white/90 tracking-wide">
                    Lionel performt in Carnegie Hall, New York / Lionel performing at Carnegie Hall, New York
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="w-full h-px bg-[#B9C1D1]/30"></div>

        <section className="max-w-[1800px] mx-auto px-4 sm:px-8 border-x border-[#B9C1D1]/20 py-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">
            <div className="lg:col-span-5 lg:pr-12 lg:border-r lg:border-[#B9C1D1]/30 space-y-8">
              <div>
                <h2 className="text-[23.2px] leading-[1.2] font-medium tracking-tight text-[#121622] mb-6 flex items-center gap-3">
                  <Info className="w-6 h-6 text-[#3D404A]" />
                  Over het concert
                </h2>
                <p className="text-[18px] leading-[1.7] text-[#3D404A]">
                  Pianist en componist Lionel Yu bouwt zijn arrangementen van nul af op — klassieke architectuur, EDM-dynamiek — niet zomaar klassiek met een beat eronder. Met 1,2 miljoen volgers op YouTube en optredens in zalen als Carnegie Hall brengt hij zijn show op 11 juni naar Zaventem.
                </p>
              </div>

              <div className="border-t border-[#B9C1D1]/30 pt-8">
                <h3 className="text-[23.2px] leading-[1.2] font-medium tracking-tight text-[#121622] mb-6">About the Concert</h3>
                <p className="text-[18px] leading-[1.7] text-[#3D404A]">
                  Pianist and composer Lionel Yu builds his arrangements from scratch — classical architecture, EDM dynamics — not crossover with a beat dropped on top. With 1.2 million YouTube subscribers and performances at venues like Carnegie Hall, he brings the show to Zaventem on June 11.
                </p>
              </div>

              <div className="border-t border-[#B9C1D1]/30 pt-8">
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#3D404A] mb-3">Partnership</p>
                <p className="text-[15px] leading-[1.6] text-[#3D404A]">
                  In samenwerking met Lions Club Zaventem National Airport Erasmus en CC De Factorij.
                </p>
                <p className="text-[15px] leading-[1.6] text-[#3D404A]/70 mt-1">
                  In partnership with Lions Club Zaventem National Airport Erasmus and CC De Factorij.
                </p>
              </div>
            </div>

            <div className="lg:col-span-7 lg:pl-4 space-y-8">
              <div>
                <h2 className="text-[23.2px] leading-[1.2] font-medium tracking-tight text-[#121622] mb-6 flex items-center gap-3">
                  <Music className="w-6 h-6 text-[#3D404A]" />
                  Programma
                </h2>
                <p className="text-[20px] leading-[1.6] text-[#121622] font-light">
                  Een avond die opent met <em className="font-serif italic font-medium">Chopin</em> en <em className="font-serif italic font-medium">Rachmaninov</em>, doorbouwt met herwerkte stukken van <em className="font-serif italic font-medium">Beethoven</em> en <em className="font-serif italic font-medium">Liszt</em> — waaronder selecties uit de <em className="font-serif italic font-medium">Nightmare</em>-arrangementreeks (Moonlight, Für Elise) — en zijn climax vindt in originele composities zoals <em className="font-serif italic font-medium">Rolling Thunder</em> en <em className="font-serif italic font-medium">Fires of a Revolution</em>.
                </p>
                <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-[#B9C1D1]/60 px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-[#3D404A]">
                  ~90 min incl. pauze
                </div>
              </div>

              <div className="border-t border-[#B9C1D1]/30 pt-8">
                <h3 className="text-[23.2px] leading-[1.2] font-medium tracking-tight text-[#121622] mb-6">Program</h3>
                <p className="text-[20px] leading-[1.6] text-[#121622] font-light">
                  An evening that opens with <em className="font-serif italic font-medium">Chopin</em> and <em className="font-serif italic font-medium">Rachmaninoff</em>, builds through reimagined <em className="font-serif italic font-medium">Beethoven</em> and <em className="font-serif italic font-medium">Liszt</em> — including selections from the <em className="font-serif italic font-medium">Nightmare</em> arrangement series (Moonlight, Für Elise) — and peaks in original compositions like <em className="font-serif italic font-medium">Rolling Thunder</em> and <em className="font-serif italic font-medium">Fires of a Revolution</em>.
                </p>
                <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-[#B9C1D1]/60 px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-[#3D404A]">
                  ~90 min incl. intermission
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="w-full h-px bg-[#B9C1D1]/30"></div>

        <section className="max-w-[1800px] mx-auto px-4 sm:px-8 border-x border-[#B9C1D1]/20 py-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-4">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#3D404A] mb-3">Video / Video</p>
              <h2 className="text-[34px] md:text-[48px] font-medium leading-[1] tracking-[-0.03em] text-[#121622] mb-6">
                See Lionel Yu live in motion
              </h2>
              <p className="text-[18px] leading-[1.7] text-[#3D404A] max-w-xl">
                Bekijk een preview van Lionel Yu&apos;s performance stijl, waarin klassieke piano, originele composities en moderne energie samenkomen. Watch the performance preview before choosing your tickets.
              </p>
            </div>
            <div className="lg:col-span-8">
              <div className="relative w-full overflow-hidden rounded-[24px] border border-[#B9C1D1]/20 shadow-2xl shadow-[#121622]/10 bg-black aspect-video">
                <iframe
                  className="absolute inset-0 h-full w-full"
                  src="https://www.youtube.com/embed/nQfrxcxZ45s"
                  title="Lionel Yu performance video"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                />
              </div>
            </div>
          </div>
        </section>

        <div className="w-full h-px bg-[#B9C1D1]/30"></div>

        <section id="tickets" className="max-w-[1800px] mx-auto px-4 sm:px-8 border-x border-[#B9C1D1]/20 bg-[#121622] aspect-[21/9] min-h-[40vh] flex flex-col items-center justify-center relative overflow-hidden group py-24">
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none flex items-center justify-center">
            <div className="w-[80vw] h-[80vw] border-[1px] border-white rounded-full group-hover:scale-110 transition-transform duration-1000 ease-in-out"></div>
          </div>

          <div className="relative z-10 flex flex-col items-center max-w-4xl px-4 w-full">
            <span className="text-[#B9C1D1]/70 uppercase tracking-[0.2em] text-sm mb-4 block text-center">Reserveer je stoel / Secure your seat</span>
            <h2 className="text-[42px] sm:text-[58px] font-medium tracking-tight text-white mb-4 text-center">
              Tickets kopen / Get Tickets
            </h2>
            <p className="text-[#B9C1D1] text-base sm:text-lg leading-[1.7] mb-10 text-center">
              Vanaf €29 · VIP €59
            </p>
            <TicketSelector />
          </div>
        </section>
      </main>

      <footer className="w-full border-t border-[#B9C1D1]/20 bg-[#F4F4F2] py-6 px-8 flex justify-between items-center text-xs text-[#3D404A]/60">
        <p>© 2026 Lionel Yu Live. Alle rechten voorbehouden. / All rights reserved.</p>
        <p>Locatie / Location: Zaventem, België / Belgium</p>
      </footer>
    </div>
  );
}
