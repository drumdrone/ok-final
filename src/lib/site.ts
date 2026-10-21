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
    title: "Přesné soustružení",
    short: "Kusová i sériová výroba na CNC a klasických soustruzích.",
    body:
      "Nabízíme přesné soustružení kovových dílců podle výkresové dokumentace v tolerancích IT6 – IT9. Zpracováváme oceli, nerez, mosaz, hliník i barevné kovy. Kapacita od kusové výroby prototypů po střední série.",
    bullets: [
      "Průměry 5 – 250 mm, délka až 1 000 mm",
      "Materiály: konstrukční ocel, nerez, mosaz, hliník",
      "Kusová výroba i série do 500 ks",
      "Tolerance IT6 – IT9",
    ],
    image: "/images/manurhin.jpg",
  },
  {
    slug: "svarovani",
    title: "Ruční svařování",
    short: "MIG/MAG, TIG a elektroda pro ocel, nerez i hliník.",
    body:
      "Certifikované svařování metodami MIG/MAG (135/138), TIG (141) a obalenou elektrodou (111). Svářeči s platnou zkouškou podle ČSN EN ISO 9606-1. Zajišťujeme svařování konstrukcí, potrubí, tlakových nádob i nerezových výrobků.",
    bullets: [
      "MIG/MAG, TIG, elektroda",
      "Ocel, nerez, hliník",
      "Certifikovaní svářeči ČSN EN ISO 9606-1",
      "Podniková svařovna s odsáváním",
    ],
    image: "/images/svarec.jpg",
  },
  {
    slug: "montaz",
    title: "Kompletace a montáž",
    short: "Sestavování dílců, montáž celků a povrchové úpravy.",
    body:
      "Zajišťujeme finální montáž vyrobených dílů do funkčních celků, kontrolu kvality, balení a expedici. Ve spolupráci s partnery zajišťujeme také povrchové úpravy — zinkování, lakování, moření.",
    bullets: [
      "Kompletace mechanických sestav",
      "Kontrola rozměrů a funkčnosti",
      "Balení, expedice, doprava",
      "Zajištění povrchových úprav",
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
  { year: "1992", text: "Založení firmy — první soustružnická dílna v Žamberku." },
  { year: "2001", text: "Rozšíření o svařovnu a certifikaci svářečů." },
  { year: "2010", text: "Instalace prvního CNC soustruhu, zvýšení kapacity." },
  { year: "2018", text: "Rozšíření provozu, spolupráce se zahraničními klienty." },
  { year: "2026", text: "Přes 33 let nepřetržité výroby a 500+ zakázek ročně." },
] as const;

export const about = {
  hero: {
    eyebrow: "O firmě",
    title: "Rodinná dílna s třemi desetiletími praxe",
    lead:
      "Přesné soustružení, svařování a kompletace kovových dílců. OK FINAL s.r.o. sídlí v Žamberku a od roku 1992 dodává zákazníkům po celé České republice i do zahraničí.",
  },
  paragraphs: [
    "OK FINAL s.r.o. byla založena v roce {founded} jako malá soustružnická dílna. Za tři desetiletí jsme vyrostli v spolehlivého dodavatele přesných kovových dílců pro tuzemské i zahraniční strojírenské firmy — a přesto jsme si zachovali osobní přístup, jaký velké závody nedokáží nabídnout.",
    "Naše silná stránka je flexibilita. Vyrábíme kusově i sériově — od jednoho prototypu po několik stovek shodných dílů. Zpracováváme konstrukční ocel, nerez, mosaz, hliník i barevné kovy. Držíme tolerance IT6 – IT9 a všechny svařovací práce provádí certifikovaní svářeči podle ČSN EN ISO 9606-1.",
    "Věříme, že strojařině se dá rozumět jen v dialogu — proto s vámi komunikuje přímo technolog, ne obchodník. Přijmeme výkres v PDF, DWG i papírově, poradíme s materiálem a technologií a do 24 hodin odešleme nabídku.",
  ],
  workshopAlt: "Výrobní dílna OK FINAL",
  milestonesTitle: "Milníky, kterými jsme prošli",
  cta: {
    title: "Chcete vidět, co umíme?",
    lead: "Přijeďte se podívat na provoz nebo nám pošlete výkres. Nezávazně probereme, jak dílec vyrobit.",
    primary: { href: "/kontakt", label: "Nezávazná poptávka" },
    secondary: { href: "/nase-sluzby", label: "Naše služby" },
  },
} as const;
