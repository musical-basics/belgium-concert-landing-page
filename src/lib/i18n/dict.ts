export type Locale = "nl" | "en";

export const LOCALES: Locale[] = ["nl", "en"];
export const DEFAULT_LOCALE: Locale = "nl";

const en = {
  nav: {
    eyebrow: "Zaventem '26",
    tickets: "Tickets · €29",
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
  artist: {
    eyebrow: "About the Artist",
    heading: "Lionel Yu",
    p1: "Lionel Yu is a Chinese-American concert pianist, composer, educator, and creator known worldwide for fusing classical piano with cinematic and EDM-inspired energy. Under the name MusicalBasics, he has built a global audience of more than 1.2 million YouTube subscribers and over 200 million views with bold reimaginings of Beethoven, Chopin, Liszt, Rachmaninov, Vivaldi, and his own original works.",
    p2: "Born in Hangzhou, China and raised near Washington, D.C., Lionel trained in the classical tradition before developing a style that brings the drama, virtuosity, and emotional depth of classical music into the 21st century. He has performed at Carnegie Hall, the Kennedy Center, Barbican Hall, the Munich Residenz, and Harbourfront Centre, and has been featured by Classic FM, WNYC/NPR, and London Live.",
    p3: "A former Wall Street professional with degrees in Finance and Marketing from NYU, Lionel left his earlier career at 29 to devote himself fully to music. Today he is also the founder of Musical Basics and DreamPlay Pianos, and teaches serious students through his online piano studio.",
    p4: "His Belgium concert is a powerful meeting of tradition and innovation: classical masterpieces, original compositions, and modern electronic energy transformed into a live piano experience that feels both timeless and unmistakably new.",
    venues: "Carnegie Hall · Kennedy Center · Barbican Hall · Munich Residenz · Harbourfront Centre",
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
    kicker: "Seats are going fast",
    heading: "Get a last-chance reminder",
    body:
      "Drop your email — we'll notify you before the final seats are gone, plus send exclusive performance previews. One-tap unsubscribe.",
    emailPlaceholder: "you@example.com",
    namePlaceholder: "First name",
    consent:
      "I consent to receive email updates about this concert. I can unsubscribe any time.",
    submit: "Remind me",
    successTitle: "You're on the list.",
    successBody: "Check your inbox for a confirmation email.",
    errorTitle: "Something went wrong.",
    errorBody: "Please try again in a moment, or email us directly.",
  },
  livestream: {
    eyebrow: "CAN'T MAKE IT IN PERSON?",
    heading: "Watch the livestream",
    body: "Stream the full concert from anywhere. Normally $15 — $5 for my email list.",
    cta: "Get Livestream Access · $5",
    priceOrig: "$15",
    priceDisc: "$5",
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
      primaryCta: "Get Tickets · From €29",
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
    stage: {
      eyebrow: "On Stage",
      heading: "Before the night in Zaventem",
      captionBarbican: "Live with violinist Barbara",
      captionSpeaking: "Between the pieces",
    },
    tickets: {
      heading: "Secure your seat",
      subtitle: "One night only in Belgium. Capacity is strictly limited.",
      urgency: "Selling fast — over half sold",
      trustLine: "Secure checkout · Instant confirmation",
      refundPolicy: "Free cancellation up to 7 days before the concert.",
      socialProof: "In partnership with Lions Club Zaventem & CC De Factorij",
    },
    testimonials: {
      eyebrow: "From the audience",
      heading: "What audiences say",
      pullQuoteEyebrow: "Concertgoer reaction",
      cassandra: {
        quote:
          "My best concert. EVER. The sound… well you had to be there to experience it, from this incredible venue.",
        attribution: "Cassandra S.",
      },
      austin: {
        quote:
          "This concert was absolutely transcendental sitting in the front row. The livestream just can’t capture the magnitude of the whole concert. It was absolutely surreal.",
        attribution: "Austin G.",
      },
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
    tickets: "Tickets · €29",
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
  // TODO: NL native review (Luc) — artist bio
  artist: {
    eyebrow: "Over de artiest",
    heading: "Lionel Yu",
    p1: "Lionel Yu is een Chinees-Amerikaanse concertpianist, componist, docent en creator, wereldwijd bekend voor zijn fusie van klassieke piano met cinematische en EDM-geïnspireerde energie. Onder de naam MusicalBasics bouwde hij een wereldwijd publiek op van meer dan 1,2 miljoen YouTube-abonnees en meer dan 200 miljoen views, met gewaagde herinterpretatties van Beethoven, Chopin, Liszt, Rachmaninov, Vivaldi en eigen originele werken.",
    p2: "Geboren in Hangzhou, China en opgegroeid in de omgeving van Washington D.C., volgde Lionel een klassieke opleiding voor hij een stijl ontwikkelde die de dramatiek, virtuositeit en emotionele diepgang van klassieke muziek in de 21e eeuw brengt. Hij trad op in Carnegie Hall, the Kennedy Center, Barbican Hall, de Münchner Residenz en Harbourfront Centre, en werd uitgelicht door Classic FM, WNYC/NPR en London Live.",
    p3: "Een voormalige Wall Street-professional met diploma's in Finance en Marketing van NYU, verliet Lionel zijn eerdere carrière op zijn 29e om zich volledig aan muziek te wijden. Vandaag is hij ook de oprichter van Musical Basics en DreamPlay Pianos, en geeft hij les aan serieuze studenten via zijn online pianostudio.",
    p4: "Zijn Belgisch concert is een krachtige ontmoeting van traditie en innovatie: klassieke meesterwerken, originele composities en moderne elektronische energie, omgevormd tot een live piano-ervaring die tijdloos én onmiskenbaar eigentijds aanvoelt.",
    venues: "Carnegie Hall · Kennedy Center · Barbican Hall · München Residenz · Harbourfront Centre",
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
    kicker: "Plaatsen gaan snel",
    heading: "Ontvang een laatste herinnering",
    body:
      "Laat je e-mail achter — we verwittigen je voor de laatste plaatsen weg zijn, plus exclusieve previews van de show. Afmelden kan met één klik.",
    emailPlaceholder: "jouw@voorbeeld.be",
    namePlaceholder: "Voornaam",
    consent:
      "Ik ga akkoord met het ontvangen van e-mailupdates over dit concert. Ik kan me op elk moment afmelden.",
    submit: "Herinner mij",
    successTitle: "Je staat op de lijst.",
    successBody: "Check je inbox voor een bevestigingsmail.",
    errorTitle: "Er ging iets mis.",
    errorBody: "Probeer het zo opnieuw, of mail ons direct.",
  },
  // TODO: NL native review (Luc) — livestream
  livestream: {
    eyebrow: "KUN JE ER NIET BIJ ZIJN?",
    heading: "Bekijk de livestream",
    body: "Stream het volledige concert van overal. Normaal $15 — $5 voor mijn mailinglijst.",
    cta: "Livestream Toegang · $5",
    priceOrig: "$15",
    priceDisc: "$5",
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
      primaryCta: "Tickets kopen · Vanaf €29",
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
    // TODO: NL native review (Luc) — home2 stage
    stage: {
      eyebrow: "Op het podium",
      heading: "Voor de avond in Zaventem",
      captionBarbican: "Live met violiste Barbara",
      captionSpeaking: "Tussen de stukken door",
    },
    tickets: {
      heading: "Reserveer je stoel",
      subtitle: "Eén avond in België. Beperkt aantal plaatsen.",
      urgency: "Verkoopt snel — meer dan de helft verkocht",
      trustLine: "Veilig betalen · Directe bevestiging",
      refundPolicy: "Gratis annulering tot 7 dagen voor het concert.",
      socialProof: "In samenwerking met Lions Club Zaventem & CC De Factorij",
    },
    // TODO: NL native review (Luc) — testimonials (quotes themselves stay in
    // English; they are authentic audience reactions and should not be translated).
    testimonials: {
      eyebrow: "Uit het publiek",
      heading: "Wat het publiek zegt",
      pullQuoteEyebrow: "Reactie uit het publiek",
      cassandra: {
        quote:
          "My best concert. EVER. The sound… well you had to be there to experience it, from this incredible venue.",
        attribution: "Cassandra S.",
      },
      austin: {
        quote:
          "This concert was absolutely transcendental sitting in the front row. The livestream just can’t capture the magnitude of the whole concert. It was absolutely surreal.",
        attribution: "Austin G.",
      },
    },
    stickyCta: {
      fromLabel: "Vanaf",
      fromPrice: "€29",
      button: "Tickets",
    },
  },
};

export const dict: Record<Locale, Dict> = { en, nl };
