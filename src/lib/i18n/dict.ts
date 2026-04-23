export type Locale = "nl" | "en";

export const LOCALES: Locale[] = ["nl", "en"];
export const DEFAULT_LOCALE: Locale = "nl";

const en = {
  nav: {
    eyebrow: "Zaventem '26",
    tickets: "Tickets",
  },
  hero: {
    livePill: "Live in Belgium",
    credibility: "1.2M on YouTube",
    title: "Lionel Yu, Classical Piano and EDM, June 11, 2026",
    tagline:
      "Classical piano, rebuilt with the energy of EDM. One night only, June 11 in Zaventem.",
    ctaButton: "Get Tickets",
    scarcity: "Limited seats available",
    imageCaption: "Lionel performing at Carnegie Hall, New York",
    facts: {
      date: { label: "Date", value: "Thursday, June 11, 2026" },
      time: { label: "Time", value: "19:30 CEST" },
      venue: { label: "Venue", value: "Theaterzaal Maupertuis, CC De Factorij" },
      location: { label: "Location", value: "Zaventem, Belgium" },
    },
  },
  about: {
    heading: "About the Concert",
    body:
      "Pianist and composer Lionel Yu builds his arrangements from scratch — classical architecture, EDM dynamics — not crossover with a beat dropped on top. With 1.2 million YouTube subscribers and performances at venues like Carnegie Hall, he brings the show to Zaventem on June 11.",
    partnershipLabel: "Partnership",
    partnership:
      "In partnership with Lions Club Zaventem National Airport Erasmus and CC De Factorij.",
  },
  social: {
    heading: "Proof",
    tiles: {
      youtube: { value: "1.2M", label: "YouTube subscribers" },
      carnegie: { value: "Carnegie Hall", label: "New York debut" },
      nightmare: { value: "50M+ views", label: "Nightmare arrangement series" },
    },
  },
  program: {
    heading: "Program",
    narrative:
      "An evening that opens with *Chopin* and *Rachmaninoff*, builds through reimagined *Beethoven* and *Liszt* — including selections from the *Nightmare* arrangement series (Moonlight, Für Elise) — and peaks in original compositions like *Rolling Thunder* and *Fires of a Revolution*.",
    runtime: "~90 min incl. intermission",
  },
  video: {
    kicker: "Video",
    heading: "See Lionel Yu live in motion",
    body:
      "Watch the performance preview before choosing your tickets — a quick look at the classical-to-EDM shift you'll see live on June 11.",
    playLabel: "Play preview",
    watchMore: "Watch full performances on YouTube",
  },
  venue: {
    linkText: "Directions, parking & accessibility — CC De Factorij",
  },
  questions: {
    prompt: "Questions?",
    email: "support@musicalbasics.com",
  },
  tickets: {
    kicker: "Secure your seat",
    heading: "Get Tickets",
    priceLine: "From €29 · VIP €59",
    standard: {
      title: "Standard",
      price: "€29",
      features: ["Reserved seating", "Full concert"],
      cta: "Get Tickets",
    },
    vip: {
      title: "VIP",
      price: "€59",
      badge: "VIP Experience",
      features: [
        "Reserved seating",
        "Meet & greet with Lionel after the show",
        "Post-concert refreshments",
      ],
      cta: "Buy VIP",
    },
    quantity: "Quantity",
    maxPerOrder: "Max 5 per order",
  },
  email: {
    kicker: "Not ready to book?",
    heading: "Leave your email for updates",
    body:
      "We'll send you performance previews and a final reminder before the concert. One-tap unsubscribe.",
    emailPlaceholder: "you@example.com",
    namePlaceholder: "First name",
    consent:
      "I consent to receive email updates about this concert. I can unsubscribe any time.",
    submit: "Subscribe",
    successTitle: "You're on the list.",
    successBody: "Check your inbox for a confirmation email.",
    errorTitle: "Something went wrong.",
    errorBody: "Please try again in a moment, or email us directly.",
  },
  footer: {
    rights: "All rights reserved.",
    location: "Location: Zaventem, Belgium",
  },
  toggle: {
    switchTo: "Switch to",
  },
  home2: {
    hero: {
      headlinePre: "One night.",
      headlineEm: "Classical piano",
      headlineMid: ", rebuilt with the",
      headlinePost: "energy of EDM",
      headlineEnd: ".",
      subLine: "June 11, 2026 — Zaventem, Belgium",
      primaryCta: "Get Tickets",
      secondaryCta: "Watch Trailer",
      scroll: "Scroll",
      countdown: {
        days: "Days",
        hours: "Hours",
        mins: "Mins",
        secs: "Secs",
      },
      meta: {
        date: { label: "Date", value: "June 11, 2026" },
        time: { label: "Time", value: "19:30 CEST" },
        venue: { label: "Venue", value: "Theaterzaal Maupertuis" },
        location: { label: "Location", value: "Zaventem, BE" },
      },
    },
    trophy: {
      subs: {
        value: "1.2M+",
        title: "Subscribers",
        body: "A global audience captivated by a new era of piano arrangement across YouTube.",
      },
      carnegie: {
        value: "Carnegie Hall",
        title: "Debut Completed",
        body: "Proven on one of the most hallowed stages in classical music.",
      },
      views: {
        value: "50M+",
        title: 'Views on the "Nightmare" series',
        body: "The viral series that redefined classical boundaries, bringing symphonic metal energy to solo piano.",
      },
    },
    program: {
      kicker: "The Program",
      subtitle: "A journey across three cinematic acts.",
      act1: {
        eyebrow: "Act One",
        title: "Foundations",
        mood: "The classical roots. Deeply emotional, pure acoustic mastery.",
        pieces: ["Fantaisie Impromptu — Chopin", "Winter Wind Etude — Chopin"],
      },
      act2: {
        eyebrow: "Act Two",
        title: "Reimagined",
        mood: "Familiar melodies shattered and rebuilt. The crossover begins.",
        pieces: [
          "Prelude in C♯ Minor (Reimagined) — Rachmaninov",
          "Moonlight Sonata Nightmare — Beethoven",
          "Für Elise Nightmare — Beethoven",
          "Torrent Etude Nightmare — Chopin",
          "La Campanella Nightmare — Liszt",
          "Four Seasons Nightmare — Vivaldi",
        ],
      },
      act3: {
        eyebrow: "Act Three",
        title: "Originals",
        mood: "The climactic finale — hyper-speed original compositions.",
        pieces: [
          "Rolling Thunder",
          "Fires of a Revolution",
          "Colors of the Soul",
          "Fight for Freedom",
          "Courage",
          "Dreams of a Violin",
          "Beethoven Virus",
          "Gallop",
        ],
      },
      runtime: "~90 min incl. intermission",
    },
    vip: {
      pill: "Extremely Limited",
      titlePre: "The VIP",
      titleEm: "Experience",
      subtitle: "Go beyond the performance. A premium allocation for true patrons.",
      seat: {
        title: "Reserved Premium Seating",
        body: "The absolute best acoustics and sightlines in Theaterzaal Maupertuis.",
      },
      meet: {
        title: "Private Meet & Greet",
        body: "Exclusive post-show interaction and photo opportunity with Lionel.",
      },
      drinks: {
        title: "Post-Concert Reception",
        body: "Complimentary refreshments and decompression with fellow VIPs.",
      },
      cta: "Reserve VIP Access",
    },
    video: {
      caption: "Experience the intensity of the Nightmare series live.",
      fullCatalog: "Watch full catalog",
    },
    tickets: {
      heading: "Secure your seat",
      subtitle: "One night only in Belgium. Capacity is strictly limited.",
    },
    stickyCta: {
      fromLabel: "Starting from",
      fromPrice: "€29",
      button: "Get Tickets",
    },
  },
};

export type Dict = typeof en;

// TODO: NL native review (Luc) — every NL string below is Claude-generated Dutch.
// Flag for Flemish-native review (Luc Ghijselinck) before production launch.
// Grep: `TODO: NL native review (Luc)` — banners mark each section below.
const nl: Dict = {
  // TODO: NL native review (Luc) — nav
  nav: {
    eyebrow: "Zaventem '26",
    tickets: "Tickets",
  },
  // TODO: NL native review (Luc) — hero
  hero: {
    livePill: "Live in België",
    credibility: "1,2M op YouTube",
    title: "Lionel Yu, klassiek piano en EDM, 11 juni 2026",
    tagline:
      "Klassieke piano, heropgebouwd met de energie van EDM. Eén avond, 11 juni in Zaventem.",
    ctaButton: "Tickets kopen",
    scarcity: "Beperkt aantal plaatsen",
    imageCaption: "Lionel performt in Carnegie Hall, New York",
    facts: {
      date: { label: "Datum", value: "Donderdag 11 juni 2026" },
      time: { label: "Aanvang", value: "19:30 CEST" },
      venue: { label: "Zaal", value: "Theaterzaal Maupertuis, CC De Factorij" },
      location: { label: "Locatie", value: "Zaventem, België" },
    },
  },
  // TODO: NL native review (Luc) — about
  about: {
    heading: "Over het concert",
    body:
      "Pianist en componist Lionel Yu bouwt zijn arrangementen van nul af op — klassieke architectuur, EDM-dynamiek — niet zomaar klassiek met een beat eronder. Met 1,2 miljoen volgers op YouTube en optredens in zalen als Carnegie Hall brengt hij zijn show op 11 juni naar Zaventem.",
    partnershipLabel: "Partnerschap",
    partnership:
      "In samenwerking met Lions Club Zaventem National Airport Erasmus en CC De Factorij.",
  },
  // TODO: NL native review (Luc) — social
  social: {
    heading: "Bewijs",
    tiles: {
      youtube: { value: "1,2M", label: "Abonnees op YouTube" },
      carnegie: { value: "Carnegie Hall", label: "New York debuut" },
      nightmare: { value: "50M+ views", label: "Nightmare-arrangementreeks" },
    },
  },
  // TODO: NL native review (Luc) — program
  program: {
    heading: "Programma",
    narrative:
      "Een avond die opent met *Chopin* en *Rachmaninov*, doorbouwt met herwerkte stukken van *Beethoven* en *Liszt* — waaronder selecties uit de *Nightmare*-arrangementreeks (Moonlight, Für Elise) — en zijn climax vindt in originele composities zoals *Rolling Thunder* en *Fires of a Revolution*.",
    runtime: "~90 min incl. pauze",
  },
  // TODO: NL native review (Luc) — video
  video: {
    kicker: "Video",
    heading: "Zie Lionel Yu live in beeld",
    body:
      "Bekijk een preview van Lionel's performancestijl — een korte blik op de klassiek-naar-EDM shift die je live ziet op 11 juni.",
    playLabel: "Preview afspelen",
    watchMore: "Bekijk volledige optredens op YouTube",
  },
  // TODO: NL native review (Luc) — venue
  venue: {
    linkText: "Bereikbaarheid, parkeren & toegankelijkheid — CC De Factorij",
  },
  // TODO: NL native review (Luc) — questions
  questions: {
    prompt: "Vragen?",
    email: "support@musicalbasics.com",
  },
  // TODO: NL native review (Luc) — tickets
  tickets: {
    kicker: "Reserveer je stoel",
    heading: "Tickets kopen",
    priceLine: "Vanaf €29 · VIP €59",
    standard: {
      title: "Standaard",
      price: "€29",
      features: ["Vaste plaats", "Volledig concert"],
      cta: "Tickets kopen",
    },
    vip: {
      title: "VIP",
      price: "€59",
      badge: "VIP-ervaring",
      features: [
        "Vaste plaats",
        "Meet & greet met Lionel na het concert",
        "Drankje na afloop",
      ],
      cta: "VIP kopen",
    },
    quantity: "Aantal",
    maxPerOrder: "Max 5 per bestelling",
  },
  // TODO: NL native review (Luc) — email capture
  email: {
    kicker: "Niet klaar om te boeken?",
    heading: "Laat je e-mail achter voor updates",
    body:
      "We sturen je performance previews en een laatste herinnering voor het concert. Afmelden kan met één klik.",
    emailPlaceholder: "jouw@voorbeeld.be",
    namePlaceholder: "Voornaam",
    consent:
      "Ik ga akkoord met het ontvangen van e-mailupdates over dit concert. Ik kan me op elk moment afmelden.",
    submit: "Inschrijven",
    successTitle: "Je staat op de lijst.",
    successBody: "Check je inbox voor een bevestigingsmail.",
    errorTitle: "Er ging iets mis.",
    errorBody: "Probeer het zo opnieuw, of mail ons direct.",
  },
  // TODO: NL native review (Luc) — footer
  footer: {
    rights: "Alle rechten voorbehouden.",
    location: "Locatie: Zaventem, België",
  },
  // TODO: NL native review (Luc) — toggle
  toggle: {
    switchTo: "Wissel naar",
  },
  // TODO: NL native review (Luc) — home2 (alt cinematic landing)
  home2: {
    hero: {
      headlinePre: "Eén avond.",
      headlineEm: "Klassieke piano",
      headlineMid: ", heropgebouwd met de",
      headlinePost: "energie van EDM",
      headlineEnd: ".",
      subLine: "11 juni 2026 — Zaventem, België",
      primaryCta: "Tickets kopen",
      secondaryCta: "Preview bekijken",
      scroll: "Scroll",
      countdown: {
        days: "Dagen",
        hours: "Uren",
        mins: "Min",
        secs: "Sec",
      },
      meta: {
        date: { label: "Datum", value: "11 juni 2026" },
        time: { label: "Aanvang", value: "19:30 CEST" },
        venue: { label: "Zaal", value: "Theaterzaal Maupertuis" },
        location: { label: "Locatie", value: "Zaventem, BE" },
      },
    },
    trophy: {
      subs: {
        value: "1,2M+",
        title: "Abonnees",
        body: "Een wereldwijd publiek voor een nieuw tijdperk van piano-arrangementen op YouTube.",
      },
      carnegie: {
        value: "Carnegie Hall",
        title: "Debuut gespeeld",
        body: "Gevalideerd in de meest prestigieuze zalen van de klassieke muziek.",
      },
      views: {
        value: "50M+ views",
        title: 'Op de "Nightmare"-reeks',
        body: "De virale reeks die de grenzen van klassiek hertekent — symfonische metalenergie op solopiano.",
      },
    },
    program: {
      kicker: "Het Programma",
      subtitle: "Een reis in drie cinematische bedrijven.",
      act1: {
        eyebrow: "Bedrijf Één",
        title: "Fundamenten",
        mood: "De klassieke wortels. Diep emotioneel, pure akoestische beheersing.",
        pieces: ["Fantaisie Impromptu — Chopin", "Winter Wind Etude — Chopin"],
      },
      act2: {
        eyebrow: "Bedrijf Twee",
        title: "Herwerkt",
        mood: "Vertrouwde melodieën verbrijzeld en heropgebouwd. De crossover begint.",
        pieces: [
          "Prelude in C♯ Minor (Reimagined) — Rachmaninov",
          "Moonlight Sonata Nightmare — Beethoven",
          "Für Elise Nightmare — Beethoven",
          "Torrent Etude Nightmare — Chopin",
          "La Campanella Nightmare — Liszt",
          "Four Seasons Nightmare — Vivaldi",
        ],
      },
      act3: {
        eyebrow: "Bedrijf Drie",
        title: "Originelen",
        mood: "De climax — originele composities op volle snelheid.",
        pieces: [
          "Rolling Thunder",
          "Fires of a Revolution",
          "Colors of the Soul",
          "Fight for Freedom",
          "Courage",
          "Dreams of a Violin",
          "Beethoven Virus",
          "Gallop",
        ],
      },
      runtime: "~90 min incl. pauze",
    },
    vip: {
      pill: "Zeer beperkt",
      titlePre: "De VIP",
      titleEm: "Ervaring",
      subtitle: "Meer dan een voorstelling. Een premium allocatie voor echte liefhebbers.",
      seat: {
        title: "Premium voorbehouden zitplaats",
        body: "De beste akoestiek en zichtlijnen in de Theaterzaal Maupertuis.",
      },
      meet: {
        title: "Privé Meet & Greet",
        body: "Exclusief contact en fotomoment met Lionel na de show.",
      },
      drinks: {
        title: "Receptie na het concert",
        body: "Gratis versnaperingen en napraten met mede-VIP's.",
      },
      cta: "VIP reserveren",
    },
    video: {
      caption: 'Beleef de intensiteit van de "Nightmare"-reeks live.',
      fullCatalog: "Bekijk de volledige catalogus",
    },
    tickets: {
      heading: "Reserveer je stoel",
      subtitle: "Eén avond in België. Beperkt aantal plaatsen.",
    },
    stickyCta: {
      fromLabel: "Vanaf",
      fromPrice: "€29",
      button: "Tickets",
    },
  },
};

export const dict: Record<Locale, Dict> = { en, nl };
