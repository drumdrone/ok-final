export const site = {
  name: "OK FINAL s.r.o.",
  shortName: "OK FINAL",
  tagline: "Přesné práce v oblasti soustružení a svařování kovů",
  description:
    "Firma OK FINAL s.r.o. provádí přesné práce v oblasti soustružení a svařování kovů. Jsme vybaveni moderními stroji, které zajišťují požadovanou přesnost a opakovatelnost výroby.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://okfinal.cz",
  locale: "cs_CZ",
  address: {
    street: "Nádražní 608",
    city: "Žamberk",
    zip: "564 01",
    country: "Česká republika",
    countryCode: "CZ",
    lat: 50.086,
    lng: 16.469,
  },
  contacts: {
    phone: "+420 465 612 713",
    email: "info@okfinal.cz",
    contactPerson: {
      name: "Ing. Jiří Divíšek",
      role: "Výkonný ředitel – jednatel",
      email: "jiri.divisek@okfinal.cz",
      phone: "+420 603 534 364",
    },
    career: "kariera@okfinal.cz",
  },
  company: {
    ico: "60934484",
    dic: "CZ60934484",
    founded: 1992,
  },
  hours: [
    { day: "Pondělí – Pátek", value: "7:00 – 15:30" },
    { day: "Sobota – Neděle", value: "Zavřeno" },
  ],
  social: {
    // doplnit až klient řekne
  },
  assets: {
    logo: "/brand/logo.jpg",
    logoMark: "/brand/logo-mark.jpg",
    hero: "/images/hero1_res.jpg",
    workshop: "/images/workshop.jpg",
    machine: "/images/manurhin.jpg",
    cert: "/images/cert1.png",
  },
} as const;

export const nav = [
  { href: "/", label: "Úvod" },
  { href: "/o-firme", label: "O firmě" },
  { href: "/nase-sluzby", label: "Naše služby" },
  { href: "/certifikaty", label: "Certifikáty" },
  { href: "/kariera", label: "Kariéra" },
  { href: "/faq", label: "FAQ" },
  { href: "/kontakt", label: "Kontakt" },
] as const;

export type ServiceKey = "soustruzeni" | "svarovani" | "montaz";

export const services: Array<{
  slug: ServiceKey;
  title: string;
  short: string;
  body: string;
  bullets: string[];
  image: string;
}> = [
  {
    slug: "soustruzeni",
    title: "Soustružení",
    short: "CNC dlouhotočné automaty, dílce od průměru 2 mm do průměru 26 mm.",
    body:
      "Práci provádíme na CNC dlouhotočných automatech a jsme schopni obrábět dílce od průměru 2 mm do průměru 26 mm.",
    bullets: [
      "Dlouhotočný automat Manurhin K´MX 413, rok výroby 2010",
      "Dlouhotočný automat Manurhin K´MX 413, rok výroby 2010",
      "Dlouhotočný automat Manurhin K´MX 413, rok výroby 2014",
      "Dlouhotočný automat Manurhin K´MX 413, rok výroby 2014",
      "Dlouhotočný automat Hanwha XE26, rok výroby 2016",
      "Dlouhotočný automat Manurhin K´MX 413, rok výroby 2018",
      "Dlouhotočný automat Manurhin K´MX 413, rok výroby 2021",
      "Dlouhotočný automat Manurhin K´MX 413, rok výroby 2021",
      "Dlouhotočný automat Manurhin K´MX 413, rok výroby 2024",
    ],
    image: "/images/manurhin.jpg",
  },
  {
    slug: "svarovani",
    title: "Ruční svařování",
    short: "Dvě pracoviště CO2, jedno pracoviště TIG, kondenzátorové a bodové svařování.",
    body:
      "Firma disponuje dvěma pracovišti pro ruční svařování metodou CO2, jedním pracovištěm pro metodu TIG, kondenzátorovým svařováním a bodovým svařováním.",
    bullets: [
      "Dvě pracoviště pro ruční svařování metodou CO2",
      "Jedno pracoviště pro metodu TIG",
      "Kondenzátorové svařování",
      "Bodové svařování",
    ],
    image: "/images/svarec.jpg",
  },
  {
    slug: "montaz",
    title: "Montážní práce",
    short: "Výroba a montáž mechanických výrobků a pohyblivých částí robotů.",
    body:
      "Jednak zajišťujeme výrobu a montáž různých mechanických výrobků jako jsou zámky a různé zástrče dveřních systémů. Dále také výrobu a montáž pohyblivých částí robotů na různé průmyslové využití, například zavádění příze do spřádacích jednotek textilních strojů.",
    bullets: [
      "Zámky a různé zástrče dveřních systémů",
      "Pohyblivé části robotů na různé průmyslové využití",
      "Zavádění příze do spřádacích jednotek textilních strojů",
    ],
    image: "/images/kolo.jpg",
  },
];

/** Homepage copy — single source of truth */
export const home = {
  hero: {
    eyebrow: "OK FINAL s.r.o.",
    titleBefore: "Dílce vyrobené v tolerancích podle výrobní dokumentace",
    titleAccent: "v krátkém časovém období",
    lead: "Promluvte si s našimi specialisty.",
    ctaPrimary: { href: "/kontakt", label: "Kontaktovat" },
    ctaSecondary: { href: "tel:+420603534364", label: "Zavolejte nám na 603 534 364" },
    machineAlt: "Dlouhotočný automat Manurhin K´MX 413",
    contactLabel: "Výkonný ředitel – jednatel",
    badge: "33 let",
  },
  stats: [
    { value: "33", unit: "let", label: "zkušeností a praxe v oboru" },
  ],
  services: {
    eyebrow: "Naše služby",
    title: "Soustružení, ruční svařování a montážní práce",
    lead:
      "Naši pracovníci jsou profesionálové, kteří dokážou vyřešit složité technické problémy, a tím pádem uspokojit široké spektrum zákazníků od malých živnostníků až k požadavkům nadnárodních společností.",
    detailLink: "Naše služby →",
  },
  experience: {
    years: "33",
    yearsLabel: "let zkušeností a praxe v oboru",
    title: "Vsadili jsme na moderní technologie",
    body:
      "Firma OK FINAL s.r.o. provádí přesné práce v oblasti soustružení a svařování kovů. Jsme vybaveni moderními stroji, které zajišťují požadovanou přesnost a opakovatelnost výroby.",
    ctaPrimary: { href: "/o-firme", label: "O firmě" },
    ctaSecondary: { href: "/certifikaty", label: "Certifikáty" },
  },
  segments: {
    eyebrow: "Kdo jsou naši zákazníci",
    title: "Živnostníci a české firmy, zahraniční firmy",
    lead:
      "Naši zákazníci nás vyhledávají především z důvodu nízkých prodejních cen a rychlosti dodávek. O kvalitě není třeba mluvit, protože v našem oboru podnikání je kvalita na prvním místě a expedice vadných výrobků se prostě neomlouvá.",
    items: [
      {
        title: "Živnostníci a české firmy",
        body: "Od malých živnostníků.",
        icon: "/images/service-1.png",
      },
      {
        title: "Zahraniční firmy",
        body: "Až k požadavkům nadnárodních společností.",
        icon: "/images/service-2.png",
      },
    ],
  },
  cta: {
    title: "Sjednejte si schůzku s námi ještě dnes",
    lead:
      "Pokud máte zájem o případnou spolupráci, tak nám zašlete nezávaznou poptávku a my vám dílce bezplatně naceníme.",
    button: { href: "/kontakt", label: "Kontaktovat" },
  },
} as const;

export const faqItems = [
  {
    q: "Jaké tolerance zvládáte?",
    a: "U soustružení běžně držíme IT7 – IT9, u přesných dílců s dokončovací operací dosahujeme až IT6. Konkrétní tolerance vždy potvrdíme podle výkresu a použitého materiálu.",
  },
  {
    q: "Vyrábíte i kusové zakázky?",
    a: "Ano — kusová výroba a prototypy tvoří významnou část naší produkce. Nemáme minimální množství, vyrobíme i jeden kus podle výkresu nebo poškozeného originálu.",
  },
  {
    q: "Jaké materiály zpracováváte?",
    a: "Konstrukční ocel, nerez (304, 316), mosaz, hliník i barevné kovy. U speciálních materiálů (titan, žáropevné oceli) se domluvíme podle konkrétního požadavku.",
  },
  {
    q: "Jaké svařovací metody používáte?",
    a: "MIG/MAG (135/138), TIG (141) a obalenou elektrodou (111). Zvládáme svařování oceli, nerezu i hliníku.",
  },
  {
    q: "Máte certifikované svářeče?",
    a: "Ano, všichni aktivní svářeči drží platné osvědčení podle ČSN EN ISO 9606-1 pro konkrétní kombinace metoda / materiál / poloha. Kopie certifikátů dodáme na vyžádání.",
  },
  {
    q: "Jak dlouho trvá výroba typické zakázky?",
    a: "Menší kusovky zpravidla 1 – 2 týdny od potvrzení objednávky, střední série 3 – 5 týdnů. Přesný termín potvrdíme s nabídkou podle aktuální vytíženosti dílny.",
  },
  {
    q: "V jaké formě přijímáte výkresovou dokumentaci?",
    a: "Ideálně PDF nebo DWG/DXF. Přijmeme i papírový výkres — načteme si ho a potvrdíme, že je čitelný. Model 3D (STEP, IGES) uvítáme u složitějších dílců.",
  },
  {
    q: "Zajišťujete i povrchové úpravy?",
    a: "Ano, ve spolupráci s ověřenými partnery zajišťujeme zinkování, lakování, moření, pasivaci a další úpravy. Předáváme dílce úpravci a přebíráme zpět, klient řeší jen nás.",
  },
  {
    q: "Dodáváte do zahraničí?",
    a: "Pravidelně dodáváme do Německa a Rakouska. Komunikace v angličtině nebo němčině, doprava po dohodě.",
  },
  {
    q: "Jak se dostaneme k nabídce?",
    a: "Nejrychlejší je poslat výkres přes formulář na stránce Kontakt nebo e-mailem na info@okfinal.cz. Odpovídáme do 24 hodin s cenou a termínem.",
  },
] as const;

export const certificates = [
  {
    title: "ČSN EN ISO 9606-1",
    body:
      "Zkouška svářečů — tavné svařování ocelí. Platné osvědčení pro všechny aktivní svářeče v podniku.",
    tag: "Svařování",
  },
  {
    title: "Metoda 135 / 138 (MIG/MAG)",
    body:
      "Certifikované obloukové svařování tavící se elektrodou v ochranné atmosféře plynu — pro ocel i nerez.",
    tag: "Svařování",
  },
  {
    title: "Metoda 141 (TIG)",
    body:
      "Obloukové svařování netavící se wolframovou elektrodou v ochranné atmosféře plynu — pro nerez, hliník a přesné spoje.",
    tag: "Svařování",
  },
  {
    title: "Metoda 111 (elektroda)",
    body:
      "Obloukové svařování obalenou elektrodou — pro konstrukční ocel a montáže v terénu.",
    tag: "Svařování",
  },
  {
    title: "Kalibrace měřidel",
    body:
      "Pravidelná kalibrace posuvných měřidel, mikrometrů a měřicích přístrojů akreditovanou laboratoří.",
    tag: "Metrologie",
  },
  {
    title: "Kontrolní protokoly",
    body:
      "Na vyžádání dodáváme protokoly o měření rozměrů a jakosti pro každou dávku.",
    tag: "Kvalita",
  },
] as const;

export const milestones = [
  { year: "1992", text: "Založení jako specializovaný výrobce schodišť a ocelových konstrukcí." },
  {
    year: "Později",
    text: "Rozdělení na OK FINAL s.r.o. Žamberk (výroba a montáž) a Schody OK s.r.o. Dobřichovice (konstrukce, design a statika).",
  },
  {
    year: "2008",
    text: "Výměna generací. Nová generace jednatelů se vydala směrem strojního obrábění.",
  },
  { year: "2011", text: "K 1.1. 2011 OK FINAL s.r.o. ukončil výrobu schodišť." },
] as const;

export const about = {
  hero: {
    eyebrow: "O firmě",
    title: "Od výrobce schodišť ke specializovanému kovoobrábění",
    lead:
      "Rodinná firma OK FINAL s.r.o. byla založena v roce 1992 jako specializovaný výrobce schodišť a ocelových konstrukcí.",
  },
  paragraphs: [
    "Jejím cílem vždy bylo nabídnout kompletní servis od konzultací přes zaměření stavebního prostoru, navržení řešení, výroby, povrchové ochrany, dopravy a montáže.",
    "Postupem času v rámci užší specializace a zlepšení služeb pro zákazníky byla původní firma rozdělena na dva samostatné celky, kde firma OK FINAL s.r.o. Žamberk se specializovala na výrobu a montáž a nově vzniklá firma Schody OK s.r.o. Dobřichovice na část zaměřenou na konstrukci včetně designu a statiky.",
    "V roce 2008 došlo vzhledem k pokročilému věku zakladatelů firmy k výměně generací a nová generace jednatelů se vydala směrem strojního obrábění. K 1.1. 2011 OK FINAL s.r.o. ukončil výrobu schodišť.",
  ],
  workshopAlt: "Výroba OK FINAL s.r.o.",
  milestonesTitle: "Od roku 1992",
  cta: {
    title: "Sjednejte si schůzku s námi ještě dnes",
    lead:
      "Pokud máte zájem o případnou spolupráci, tak nám zašlete nezávaznou poptávku a my vám dílce bezplatně naceníme.",
    primary: { href: "/kontakt", label: "Kontaktovat" },
    secondary: { href: "/nase-sluzby", label: "Naše služby" },
  },
} as const;
