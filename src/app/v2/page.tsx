import Image from "next/image";

export default function V2Page() {
  const productUrl = "https://musicalbasics.com/products/general-ticket-zaventem-belgium-june-11?utm_source=copyToPasteBoard&utm_medium=product-links&utm_content=web";

  return (
    <main className="wrap">
      <section className="hero">
        <div>
          <div className="eyebrow">Live in Belgium</div>
          <h1>Lionel Yu Live in Belgium, June 11, 2026</h1>
          <p className="subheadline">
            Classical piano, reimagined Nightmare arrangements, and original music, live in Zaventem on June 11.
          </p>
          
          <div className="cta-row">
            <a 
              className="button" 
              href={productUrl}
              data-ticket-link="true" 
              aria-label="Get Tickets"
            >
              Get Tickets
            </a>
            <span className="context">A live evening performance in Zaventem, Belgium.</span>
          </div>

          <div className="grid-stats">
            <div className="card">
              <div className="label">Date</div>
              <div className="value">Thursday, June 11, 2026</div>
            </div>
            <div className="card">
              <div className="label">Time</div>
              <div className="value">19:30 CEST</div>
            </div>
            <div className="card">
              <div className="label">Venue</div>
              <div className="value">Theaterzaal Maupertuis, CC De Factorij</div>
            </div>
            <div className="card">
              <div className="label">Location</div>
              <div className="value">Zaventem, Belgium</div>
            </div>
          </div>
        </div>

        <div className="hero-image-container min-h-[300px]" aria-label="Hero image area">
          <Image
            src="/images/hero.png"
            alt="Lionel Yu Carnegie Hall Performance"
            fill
            className="object-cover"
            priority
          />
        </div>
      </section>

      <section className="section-box">
        <h2>Event Details</h2>
        <p>
          Join world-renowned pianist and composer Lionel Yu for an extraordinary evening of music in Belgium. 
          This performance features a curated selection of classical masterpieces, fan-favorite "Nightmare" level arrangements, 
          and debut original compositions.
        </p>
      </section>

      <section className="section-box">
        <h2>Program Highlights</h2>
        <ul>
          <li>Beethoven - Moonlight Sonata (All 3 Movements)</li>
          <li>Chopin - Nocturne in E-flat Major</li>
          <li>Original - "The Nightmare Chronicles" Suite</li>
          <li>Improvisations based on audience suggestions</li>
        </ul>
      </section>

      <section className="section-box">
        <h2>The Artist</h2>
        <p>
          Lionel Yu is a pianist and composer known for his unique blend of traditional classical music 
          and high-intensity modern arrangements. With millions of followers worldwide, his performances 
          at venues like Carnegie Hall have redefine what a piano recital can be.
        </p>
      </section>

      <div className="mt-12 text-center pb-12">
        <a 
          className="button" 
          href={productUrl}
        >
          Get Your Tickets Now
        </a>
        <p className="mt-4 text-muted text-sm">
          Limited seating available. Theaterzaal Maupertuis, CC De Factorij.
        </p>
      </div>
    </main>
  );
}
