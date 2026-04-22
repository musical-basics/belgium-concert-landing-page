const NAMES = [
  "Chopin",
  "Rachmaninoff",
  "Beethoven",
  "Liszt",
  "Rolling Thunder",
  "Fires of a Revolution",
  "Nightmare Moonlight",
  "Für Elise",
];

// Two-copy track so the -50% translate creates a seamless loop.
export default function ComposerMarquee() {
  return (
    <div
      className="w-full overflow-hidden border-y border-white/[0.06] bg-black/30 py-6 sm:py-8"
      aria-hidden
    >
      <div className="marquee-track flex items-center whitespace-nowrap will-change-transform">
        {[0, 1].map((dupe) => (
          <div
            key={dupe}
            className="flex items-center gap-10 sm:gap-16 px-6 sm:px-10 shrink-0"
          >
            {NAMES.map((name) => (
              <span key={`${dupe}-${name}`} className="flex items-center gap-10 sm:gap-16">
                <span className="font-serif italic text-2xl sm:text-4xl md:text-5xl text-white/45">
                  {name}
                </span>
                <span
                  className="text-[color:var(--accent)] text-lg sm:text-xl"
                  aria-hidden
                >
                  ✦
                </span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
