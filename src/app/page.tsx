import Image from "next/image";
import { ArrowDownRight, Info, Music, Ticket } from "lucide-react";

export default function Home() {
  return (
    <div className="bg-[#F4F4F2] text-[#121622] selection:bg-[#121622] selection:text-white min-h-screen flex flex-col font-sans antialiased">
      <nav className="fixed top-0 w-full z-50 bg-[#F4F4F2]/85 backdrop-blur-xl border-b border-[#B9C1D1]/40 px-6 py-4 flex justify-between items-center transition-all duration-300">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold tracking-widest uppercase text-[#20242F]">Lionel Yu</span>
          <span className="w-1 h-1 rounded-full bg-[#20242F]/50"></span>
          <span className="text-xs font-medium tracking-wide text-[#20242F]/70">Zaventem '26</span>
        </div>
        <a href="#tickets" className="group flex items-center gap-2 text-sm font-medium hover:text-[#20242F] transition-colors">
          Get Tickets
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
                  Live in Belgium
                </div>
              </div>

              <div className="mb-12">
                <h1 className="text-[48px] md:text-[72px] font-medium leading-[0.95] tracking-[-0.03em] text-[#121622] mb-6">
                  Lionel Yu Live in<br className="hidden md:block" />Belgium, June<br className="hidden md:block" />11, 2026
                </h1>
                <p className="text-[18.88px] leading-[1.6] text-[#3D404A] max-w-xl pr-4">
                  Classical piano, reimagined Nightmare arrangements, and original music, live in Zaventem on June 11.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-px bg-[#B9C1D1]/30 border border-[#B9C1D1]/30 mt-auto">
                <div className="bg-[#F4F4F2] p-6 sm:p-8 flex flex-col justify-center">
                  <span className="text-[10px] font-semibold uppercase tracking-widest text-[#3D404A] mb-2">Date</span>
                  <span className="text-[16px] font-medium text-[#121622] leading-tight">Thursday, June 11, 2026</span>
                </div>
                <div className="bg-[#F4F4F2] p-6 sm:p-8 flex flex-col justify-center">
                  <span className="text-[10px] font-semibold uppercase tracking-widest text-[#3D404A] mb-2">Time</span>
                  <span className="text-[16px] font-medium text-[#121622] leading-tight">19:30 CEST</span>
                </div>
                <div className="bg-[#F4F4F2] p-6 sm:p-8 flex flex-col justify-center">
                  <span className="text-[10px] font-semibold uppercase tracking-widest text-[#3D404A] mb-2">Venue</span>
                  <span className="text-[16px] font-medium text-[#121622] leading-tight">Theaterzaal Maupertuis,<br />CC De Factorij</span>
                </div>
                <div className="bg-[#F4F4F2] p-6 sm:p-8 flex flex-col justify-center">
                  <span className="text-[10px] font-semibold uppercase tracking-widest text-[#3D404A] mb-2">Location</span>
                  <span className="text-[16px] font-medium text-[#121622] leading-tight">Zaventem, Belgium</span>
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
            <div className="lg:col-span-5 lg:pr-12 lg:border-r lg:border-[#B9C1D1]/30">
              <h2 className="text-[23.2px] leading-[1.2] font-medium tracking-tight text-[#121622] mb-6 flex items-center gap-3">
                <Info className="w-6 h-6 text-[#3D404A]" />
                About the Concert
              </h2>
              <p className="text-[18.88px] leading-[1.6] text-[#3D404A]">
                Join Lionel Yu in Zaventem for a live concert that brings together classical piano, reimagined Nightmare arrangements, and original music in one night.
              </p>
            </div>

            <div className="lg:col-span-7 lg:pl-4">
              <h2 className="text-[23.2px] leading-[1.2] font-medium tracking-tight text-[#121622] mb-8 flex items-center gap-3">
                <Music className="w-6 h-6 text-[#3D404A]" />
                Program Highlights
              </h2>
              <ul className="space-y-6">
                <li className="flex items-start group">
                  <span className="text-[#121622] mr-4 mt-1 opacity-50 group-hover:opacity-100 transition-opacity">—</span>
                  <span className="text-[20px] text-[#121622] font-light">Chopin and other classical piano repertoire</span>
                </li>
                <li className="flex items-start group">
                  <span className="text-[#121622] mr-4 mt-1 opacity-50 group-hover:opacity-100 transition-opacity">—</span>
                  <span className="text-[20px] text-[#121622] font-light">Reimagined Beethoven, Vivaldi, Liszt, and Rachmaninoff</span>
                </li>
                <li className="flex items-start group">
                  <span className="text-[#121622] mr-4 mt-1 opacity-50 group-hover:opacity-100 transition-opacity">—</span>
                  <span className="text-[20px] text-[#121622] font-light">Original works including <em className="font-serif italic font-medium">Rolling Thunder</em>, <em className="font-serif italic font-medium">Colors of the Soul</em>, and <em className="font-serif italic font-medium">Beethoven Virus</em></span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        <div className="w-full h-px bg-[#B9C1D1]/30"></div>

        <section id="tickets" className="max-w-[1800px] mx-auto px-4 sm:px-8 border-x border-[#B9C1D1]/20 bg-[#121622] aspect-[21/9] min-h-[40vh] flex flex-col items-center justify-center relative overflow-hidden group py-24">
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none flex items-center justify-center">
            <div className="w-[80vw] h-[80vw] border-[1px] border-white rounded-full group-hover:scale-110 transition-transform duration-1000 ease-in-out"></div>
          </div>

          <div className="relative z-10 text-center flex flex-col items-center">
            <span className="text-[#B9C1D1]/70 uppercase tracking-[0.2em] text-sm mb-4 block">Secure your seat</span>
            <h2 className="text-[48px] sm:text-[64px] font-medium tracking-tight text-white mb-8">
              Get Tickets
            </h2>
            <div className="flex flex-col items-center gap-4">
              <a
                href="https://musicalbasics.com/cart/43946996957227:1"
                className="bg-[#111111] text-[#F4F4F2] font-medium text-[16px] px-10 py-5 rounded-[999px] flex items-center gap-3 transition-transform hover:-translate-y-1 ring-1 ring-white/10 hover:ring-white/30 shadow-xl shadow-black/20"
              >
                Get Tickets
                <Ticket className="w-5 h-5" />
              </a>
              <p className="text-[#B9C1D1]/50 text-sm mt-4 font-light">A live evening performance in Zaventem, Belgium.</p>
            </div>
          </div>
        </section>
      </main>

      <footer className="w-full border-t border-[#B9C1D1]/20 bg-[#F4F4F2] py-6 px-8 flex justify-between items-center text-xs text-[#3D404A]/60">
        <p>&copy; 2026 Lionel Yu Live. All rights reserved.</p>
        <p>Location: Zaventem, Belgium</p>
      </footer>
    </div>
  );
}
