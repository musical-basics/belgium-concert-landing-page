import Image from "next/image";
import { ArrowDownRight, Info, Music } from "lucide-react";
import TicketSelector from "@/components/ticket-selector";

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
                  <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#3D404A] mb-3">Nederlands</p>
                  <h1 className="text-[40px] md:text-[64px] font-medium leading-[0.95] tracking-[-0.03em] text-[#121622] mb-4">
                    Lionel Yu, klassiek piano en EDM, 11 juni 2026
                  </h1>
                  <p className="text-[18px] leading-[1.6] text-[#3D404A] max-w-2xl">
                    Een avond waarop klassieke grootmeesters en elektronische muziek samenkomen. Live in Zaventem op 11 juni.
                  </p>
                </div>

                <div className="border-t border-[#B9C1D1]/30 pt-6">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#3D404A] mb-3">English</p>
                  <h2 className="text-[34px] md:text-[52px] font-medium leading-[1] tracking-[-0.03em] text-[#121622] mb-4">
                    Lionel Yu, Classical Piano and EDM, June 11, 2026
                  </h2>
                  <p className="text-[18px] leading-[1.6] text-[#3D404A] max-w-2xl">
                    Where classical masterworks meet electronic music. One extraordinary night, live in Zaventem on June 11.
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
              <div className="relative w-full h-[60vh] lg:h-[80vh] rounded-[24px] overflow-hidden shadow-2xl shadow-[#121622]/10 border border-[#B9C1D1]/20 group">
                <Image
                  src="/images/hero.png"
                  alt="Lionel Yu Carnegie Hall Performance"
                  fill
                  className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                />
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
                  Pianist en componist Lionel Yu combineert klassieke pianomuziek met elektronische muziek en EDM tot iets wat je nog nooit hebt gezien. Met 1,2 miljoen volgers op YouTube en optredens in prestigieuze zalen wereldwijd brengt hij op 11 juni zijn bijzondere show naar Zaventem, in samenwerking met Lions Club Zaventem National Airport Erasmus.
                </p>
              </div>

              <div className="border-t border-[#B9C1D1]/30 pt-8">
                <h3 className="text-[23.2px] leading-[1.2] font-medium tracking-tight text-[#121622] mb-6">About the Concert</h3>
                <p className="text-[18px] leading-[1.7] text-[#3D404A]">
                  Pianist and composer Lionel Yu has built 1.2 million YouTube followers by making classical music feel electric. On June 11, he brings that high-energy blend of classical piano, EDM, and original composition to Zaventem, in partnership with Lions Club Zaventem National Airport Erasmus.
                </p>
              </div>
            </div>

            <div className="lg:col-span-7 lg:pl-4 space-y-8">
              <div>
                <h2 className="text-[23.2px] leading-[1.2] font-medium tracking-tight text-[#121622] mb-8 flex items-center gap-3">
                  <Music className="w-6 h-6 text-[#3D404A]" />
                  Programmahoogtepunten
                </h2>
                <ul className="space-y-6">
                  <li className="flex items-start group">
                    <span className="text-[#121622] mr-4 mt-1 opacity-50 group-hover:opacity-100 transition-opacity">—</span>
                    <span className="text-[20px] text-[#121622] font-light">Herwerkte klassiekers van Chopin, Rachmaninov, Beethoven, Liszt en Vivaldi</span>
                  </li>
                  <li className="flex items-start group">
                    <span className="text-[#121622] mr-4 mt-1 opacity-50 group-hover:opacity-100 transition-opacity">—</span>
                    <span className="text-[20px] text-[#121622] font-light">Originele composities zoals <em className="font-serif italic font-medium">Rolling Thunder</em>, <em className="font-serif italic font-medium">Fires of a Revolution</em> en <em className="font-serif italic font-medium">Courage</em></span>
                  </li>
                  <li className="flex items-start group">
                    <span className="text-[#121622] mr-4 mt-1 opacity-50 group-hover:opacity-100 transition-opacity">—</span>
                    <span className="text-[20px] text-[#121622] font-light">Een unieke kruisbestuiving van concertzaal en dansvloer</span>
                  </li>
                </ul>
              </div>

              <div className="border-t border-[#B9C1D1]/30 pt-8">
                <h3 className="text-[23.2px] leading-[1.2] font-medium tracking-tight text-[#121622] mb-8">Program Highlights</h3>
                <ul className="space-y-6">
                  <li className="flex items-start group">
                    <span className="text-[#121622] mr-4 mt-1 opacity-50 group-hover:opacity-100 transition-opacity">—</span>
                    <span className="text-[20px] text-[#121622] font-light">Reimagined classics by Chopin, Rachmaninoff, Beethoven, Liszt, and Vivaldi</span>
                  </li>
                  <li className="flex items-start group">
                    <span className="text-[#121622] mr-4 mt-1 opacity-50 group-hover:opacity-100 transition-opacity">—</span>
                    <span className="text-[20px] text-[#121622] font-light">Original compositions including <em className="font-serif italic font-medium">Rolling Thunder</em>, <em className="font-serif italic font-medium">Fires of a Revolution</em>, and <em className="font-serif italic font-medium">Courage</em></span>
                  </li>
                  <li className="flex items-start group">
                    <span className="text-[#121622] mr-4 mt-1 opacity-50 group-hover:opacity-100 transition-opacity">—</span>
                    <span className="text-[20px] text-[#121622] font-light">A concert experience that belongs in a hall and on a dance floor at the same time</span>
                  </li>
                </ul>
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

          <div className="relative z-10 text-center flex flex-col items-center max-w-3xl px-4">
            <span className="text-[#B9C1D1]/70 uppercase tracking-[0.2em] text-sm mb-4 block">Reserveer je stoel / Secure your seat</span>
            <h2 className="text-[42px] sm:text-[58px] font-medium tracking-tight text-white mb-6">
              Tickets kopen / Get Tickets
            </h2>
            <p className="text-[#B9C1D1] text-base sm:text-lg leading-[1.7] mb-8">
              Vanaf €15. Standaardtickets €29. VIP-tickets €59 met drankje na afloop en ontmoeting met de artiest. From €15. Standard tickets €29. VIP tickets €59 include post-concert refreshments and an artist meet-and-greet.
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
