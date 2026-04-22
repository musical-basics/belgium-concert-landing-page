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
    email: "lionel@musicalbasics.com",
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
    email: "lionel@musicalbasics.com",
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
};

export const dict: Record<Locale, Dict> = { en, nl };
