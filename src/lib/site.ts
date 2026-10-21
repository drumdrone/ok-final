export const site = {
  name: "OK FINAL s.r.o.",
  shortName: "OK FINAL",
  tagline: "Přesné soustružení a svařování kovů",
  description:
    "Ruční i CNC soustružení, svařování a kompletace kovových dílců podle výkresové dokumentace. 33 let zkušeností. Žamberk, Pardubický kraj.",
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
    phone: "+420 465 611 111",
    email: "info@okfinal.cz",
    contactPerson: {
      name: "Jiří Divíšek",
      role: "Jednatel / technolog",
      email: "jiri.divisek@okfinal.cz",
      phone: "+420 602 355 555",
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
    workshop: "/images/foto-workshop.jpg",
    machine: "/images/foto-soustruzeni.png",
    cert: "/images/cert-iso-9001.jpg",
    certPdfCs: "/docs/iso-9001-cz.pdf",
    certPdfEn: "/docs/iso-9001-en.pdf",
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
    image: "/images/foto-soustruzeni.png",
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
    image: "/images/foto-svarovani.png",
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
    image: "/images/foto-montaz.png",
  },
];

/** English landing-page copy (one-page EN variant at /en) */
export const en = {
  hero: {
    eyebrow: "Precision metalworks · Czech Republic",
    titleBefore: "Metal parts to your",
    titleAccent: "engineering drawings",
    lead:
      "Precision turning, manual welding and assembly. One-off pieces and small-to-medium batches for machinery, energy and industrial automation. Reply to any inquiry within 24 hours.",
    ctaPrimary: { href: "/en#contact", label: "Request a quote" },
    ctaSecondary: { href: "/en#services", label: "Our services" },
  },
  stats: [
    { value: "33", unit: "years", label: "on the market" },
    { value: "500+", unit: "", label: "orders per year" },
    { value: "IT6", unit: "", label: "finest tolerance" },
    { value: "24 h", unit: "", label: "response time" },
  ],
  intro: {
    title: "A family workshop that speaks engineering",
    body:
      "OK FINAL s.r.o. was founded in 1992 in Žamberk, Czech Republic. Over three decades we have delivered hundreds of thousands of parts to domestic trades, mid-size manufacturers and international clients across Germany and Austria. We keep a compact team and a personal approach — you talk to the technologist, not a call centre.",
  },
  services: {
    eyebrow: "What we do",
    title: "Three services, one supplier",
    items: [
      {
        title: "Precision turning",
        body:
          "CNC and conventional lathe work. Diameters 5–250 mm, lengths up to 1 000 mm. Carbon steel, stainless, brass, aluminium. Tolerances IT6 – IT9. Prototypes and small-to-medium batches.",
      },
      {
        title: "Manual welding",
        body:
          "MIG/MAG (135/138), TIG (141) and SMAW (111). Steel, stainless and aluminium. Welders certified to ČSN EN ISO 9606-1 for the relevant method/material/position combinations.",
      },
      {
        title: "Assembly & finishing",
        body:
          "Component kitting, assembly of mechanical units, dimensional inspection, packaging and dispatch. Surface treatments (zinc plating, powder coating, pickling) arranged through verified partners.",
      },
    ],
  },
  quality: {
    eyebrow: "Quality & certification",
    title: "ISO 9001 and certified welders",
    body:
      "We operate under ISO 9001 (both CZ and EN versions available for download) and all active welders hold valid ČSN EN ISO 9606-1 certificates. Calibration of measuring tools by an accredited laboratory. Inspection reports supplied on request for every batch.",
    downloadCs: "ISO 9001 (Czech)",
    downloadEn: "ISO 9001 (English)",
  },
  contact: {
    eyebrow: "Get in touch",
    title: "Have a drawing? Let us see if we can make it.",
    lead: "Reply within 24 hours. Consultation and price estimate free of charge.",
    emailLabel: "Send us a drawing (PDF/DWG/DXF)",
    emailAddress: "info@okfinal.cz",
    phoneLabel: "Call",
    addressLabel: "Address",
    languagesNote: "Communication in English, German or Czech.",
    note: "A full English site is in preparation. For now, the Czech version holds the full detail — technical specs, certificates and company history.",
  },
  switcherCzech: "Česká verze",
  footerBack: "← Zpět na českou verzi",
} as const;

/** Homepage copy — single source of truth */
export const home = {
  hero: {
    eyebrow: "Přesné strojírenství · Žamberk",
    titleBefore: "Kovové dílce podle vaší",
    titleAccent: "výkresové dokumentace",
    lead:
      "Přesné soustružení, ruční svařování a kompletace. Kusová i sériová výroba pro strojírenství, energetiku a průmyslovou automatizaci. Odezva na poptávku do 24 hodin.",
    ctaPrimary: { href: "/kontakt", label: "Nezávazná poptávka" },
    ctaSecondary: { href: "/nase-sluzby", label: "Naše služby" },
    machineAlt: "CNC soustruh Manurhin K'MX 413",
    contactLabel: "Kontaktní osoba",
    badge: "ČSN EN ISO 9606-1",
  },
  stats: [
    { value: "33", unit: "let", label: "na trhu" },
    { value: "500+", unit: "", label: "dokončených zakázek ročně" },
    { value: "IT6", unit: "", label: "nejvyšší dosahovaná tolerance" },
    { value: "24 h", unit: "", label: "odezva na poptávku" },
  ],
  services: {
    eyebrow: "Co pro vás uděláme",
    title: "Tři služby, jeden dodavatel",
    lead: "Od výkresu k hotovému výrobku bez potřeby přeprodávat práci dalším dílnám.",
    detailLink: "Detail služby →",
  },
  experience: {
    years: "33",
    yearsLabel: "let řemeslné praxe",
    title: "Rodinná dílna, která rozumí strojařině",
    body:
      "OK FINAL byla založena v roce {founded}. Za tři dekády jsme dodali statisíce dílců pro tuzemské živnostníky, střední strojírenské podniky i zahraniční klienty. Držíme si kompaktní tým a osobní přístup — s vaší poptávkou nekomunikujete s callcentrem, ale přímo s technologem.",
    ctaPrimary: { href: "/o-firme", label: "O firmě" },
    ctaSecondary: { href: "/certifikaty", label: "Certifikáty" },
  },
  segments: {
    eyebrow: "Pro koho pracujeme",
    title: "Živnostníci i mezinárodní firmy",
    lead: "Škála zákazníků od jednotlivců po výrobní závody z Německa a Rakouska.",
    items: [
      {
        title: "Živnostníci a malé dílny",
        body: "Kusové zakázky, prototypy, náhradní díly. Vyrobíme i jeden kus podle vašeho výkresu nebo poškozeného originálu.",
        icon: "/images/service-1.png",
      },
      {
        title: "Zahraniční výrobci",
        body: "Střední série pro exportní zákazníky. Rámcové smlouvy, pravidelné dodávky, jednotná kvalita, komunikace v angličtině a němčině.",
        icon: "/images/service-2.png",
      },
    ],
  },
  cta: {
    title: "Máte výkres? Ozvěte se, ať vidíme, jestli to spolu vyrobíme.",
    lead: "Odpovídáme do 24 hodin. Konzultace a odhad ceny zdarma.",
    button: { href: "/kontakt", label: "Sjednat schůzku" },
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
