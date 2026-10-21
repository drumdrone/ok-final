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
    people: [
      {
        name: "Ing. Jiří Divíšek",
        role: "Výkonný ředitel – jednatel",
        phone: "+420 603 534 364",
        email: "jiri.divisek@okfinal.cz",
      },
      {
        name: "Pavel Divíšek",
        role: "Jednatel",
        phone: "+420 603 894 310",
        email: "pavel.divisek@okfinal.cz",
      },
      {
        name: "Michael Čammr",
        role: "Mistr výroby",
        phone: "+420 603 754 599",
        email: "michael.cammr@okfinal.cz",
      },
      {
        name: "Jana Dostálková",
        role: "Kontrola jakosti",
        phone: "+420 731 442 810",
        email: "jana.dostalkova@okfinal.cz",
      },
      {
        name: "Marie Grimová",
        role: "Zásobování",
        phone: "+420 731 443 452",
        email: "marie.grimova@okfinal.cz",
      },
      {
        name: "Kateřina Čammrová",
        role: "Administrativní pracovnice-účetní",
        phone: "+420 465 612 713",
        email: "katerina.cammrova@okfinal.cz",
      },
    ],
    career: "info@okfinal.cz",
  },
  company: {
    ico: "46506578",
    dic: "CZ46506578",
    founded: 1992,
    court: "OR-C/2017 – Krajský soud Hradec Králové",
    billingEmail: "uctarna@okfinal.cz",
  },
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
    image: "/images/foto-soustruzeni.png",
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
    image: "/images/foto-svarovani.png",
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
    image: "/images/foto-montaz.png",
  },
];

/** English navigation — mirror of CZ nav structure. */
export const enNav = [
  { href: "/en", label: "Home" },
  { href: "/en/about", label: "About" },
  { href: "/en/services", label: "Services" },
  { href: "/en/certificates", label: "Certificates" },
  { href: "/en/careers", label: "Careers" },
  { href: "/en/faq", label: "FAQ" },
  { href: "/en/contact", label: "Contact" },
] as const;

/** Full English translation of all page content — mirrors the CZ exports
 *  (home, about, services, faqItems, certificates, milestones). */
export const enContent = {
  home: {
    hero: {
      eyebrow: "OK FINAL s.r.o.",
      titleBefore: "Parts machined to drawing tolerances",
      titleAccent: "within short lead times",
      lead: "Talk to our specialists.",
      ctaPrimary: { href: "/en/contact", label: "Get in touch" },
      ctaSecondary: { href: "tel:+420603534364", label: "Call us at +420 603 534 364" },
      machineAlt: "Swiss-type CNC lathe Manurhin K´MX 413",
      contactLabel: "Executive director — managing partner",
      badge: "33 years",
    },
    stats: [
      { value: "33", unit: "years", label: "of experience in the field" },
    ],
    services: {
      eyebrow: "Our services",
      title: "Turning, manual welding and assembly",
      lead:
        "Our team of professionals solves complex technical challenges — serving customers from small sole traders to the demanding requirements of multinational companies.",
      detailLink: "Our services →",
    },
    experience: {
      years: "33",
      yearsLabel: "years of experience in the field",
      title: "We rely on modern technology",
      body:
        "OK FINAL s.r.o. provides precision work in the field of turning and welding of metals. We are equipped with modern machines that ensure the required precision and repeatability of production.",
      ctaPrimary: { href: "/en/about", label: "About us" },
      ctaSecondary: { href: "/en/certificates", label: "Certificates" },
    },
    segments: {
      eyebrow: "Who are our customers",
      title: "Czech sole traders and companies, international customers",
      lead:
        "Our customers choose us primarily for competitive prices and fast delivery. Quality goes without saying — in our line of business there is simply no excuse for shipping defective parts.",
      items: [
        {
          title: "Sole traders and Czech companies",
          body: "From small sole traders.",
          icon: "/images/service-1.png",
        },
        {
          title: "International companies",
          body: "Up to the demands of multinational corporations.",
          icon: "/images/service-2.png",
        },
      ],
    },
    cta: {
      title: "Schedule a meeting with us today",
      lead:
        "If you are interested in cooperation, send us a non-binding inquiry and we will provide a free quote for your parts.",
      button: { href: "/en/contact", label: "Get in touch" },
    },
  },
  services: [
    {
      slug: "turning",
      title: "Turning",
      short: "Swiss-type CNC lathes, parts from Ø 2 mm up to Ø 26 mm.",
      body:
        "We work on Swiss-type CNC lathes and are able to machine parts from Ø 2 mm up to Ø 26 mm.",
      bullets: [
        "Swiss-type CNC lathe Manurhin K´MX 413, year 2010",
        "Swiss-type CNC lathe Manurhin K´MX 413, year 2010",
        "Swiss-type CNC lathe Manurhin K´MX 413, year 2014",
        "Swiss-type CNC lathe Manurhin K´MX 413, year 2014",
        "Swiss-type CNC lathe Hanwha XE26, year 2016",
        "Swiss-type CNC lathe Manurhin K´MX 413, year 2018",
        "Swiss-type CNC lathe Manurhin K´MX 413, year 2021",
        "Swiss-type CNC lathe Manurhin K´MX 413, year 2021",
        "Swiss-type CNC lathe Manurhin K´MX 413, year 2024",
      ],
      image: "/images/foto-soustruzeni.png",
    },
    {
      slug: "welding",
      title: "Manual welding",
      short: "Two CO2 welding stations, one TIG station, capacitor and spot welding.",
      body:
        "The company operates two manual CO2 welding stations, one TIG welding station, capacitor welding and spot welding.",
      bullets: [
        "Two stations for manual CO2 welding",
        "One station for TIG welding",
        "Capacitor welding",
        "Spot welding",
      ],
      image: "/images/foto-svarovani.png",
    },
    {
      slug: "assembly",
      title: "Assembly work",
      short: "Manufacturing and assembly of mechanical products and robot moving parts.",
      body:
        "We cover both the manufacturing and assembly of mechanical products such as locks and various door-system latches, as well as the manufacturing and assembly of moving parts of robots for various industrial uses — for example, feeding yarn into the spinning units of textile machines.",
      bullets: [
        "Locks and various door-system latches",
        "Moving parts of robots for various industrial uses",
        "Feeding yarn into the spinning units of textile machines",
      ],
      image: "/images/foto-montaz.png",
    },
  ],
  about: {
    hero: {
      eyebrow: "About the company",
      title: "From staircase manufacturer to specialised metal machining",
      lead:
        "The family company OK FINAL s.r.o. was founded in 1992 as a specialised manufacturer of staircases and steel structures.",
    },
    paragraphs: [
      "Its goal has always been to offer complete service — from consultation, measuring the building space, designing the solution, through manufacturing, surface protection, transport and installation.",
      "Over time, through specialisation and improved customer service, the original company was split into two separate entities: OK FINAL s.r.o. Žamberk specialised in manufacturing and assembly, and the newly founded Schody OK s.r.o. Dobřichovice focused on design, aesthetics and structural engineering.",
      "In 2008, due to the age of the company founders, there was a generational change and the new generation of managing partners moved towards machine machining. On 1 January 2011, OK FINAL s.r.o. ended staircase manufacturing.",
    ],
    workshopAlt: "OK FINAL s.r.o. production floor",
    milestonesTitle: "Since 1992",
    cta: {
      title: "Schedule a meeting with us today",
      lead:
        "If you are interested in cooperation, send us a non-binding inquiry and we will provide a free quote for your parts.",
      primary: { href: "/en/contact", label: "Get in touch" },
      secondary: { href: "/en/services", label: "Our services" },
    },
  },
  milestones: [
    { year: "1992", text: "Founded as a specialised manufacturer of staircases and steel structures." },
    {
      year: "Later",
      text: "Split into OK FINAL s.r.o. Žamberk (manufacturing and assembly) and Schody OK s.r.o. Dobřichovice (design, aesthetics and structural engineering).",
    },
    {
      year: "2008",
      text: "Generational change. The new generation of managing partners moved towards machine machining.",
    },
    { year: "2011", text: "On 1 January 2011 OK FINAL s.r.o. ended staircase manufacturing." },
  ],
  certificates: [
    {
      title: "ČSN EN ISO 9001:2016",
      body:
        "Quality management system for engineering and locksmithing production and machine machining on CNC lathes. Certificate No. QMS-5039/2023, STAVCERT Praha. Valid from 15 July 2023 until 14 July 2026. First certification: July 2011.",
      tag: "Quality",
    },
    {
      title: "ISO 9001:2015",
      body:
        "English version of the same certificate. Scope: machine industry production and locksmithery, machine machining CNC lathes. Certificate No. QMS-5039/2023, valid 15 July 2023 – 14 July 2026.",
      tag: "EN",
    },
  ],
  faqItems: [
    {
      q: "What tolerances can you achieve?",
      a: "In turning we routinely hold IT7 – IT9; for precision parts with a finishing operation we achieve down to IT6. The specific tolerance is always confirmed based on the drawing and material.",
    },
    {
      q: "Do you also take one-off orders?",
      a: "Yes — one-off production and prototypes are a significant part of our output. We have no minimum order quantity; we will make a single part from your drawing or from a damaged original.",
    },
    {
      q: "What materials do you work with?",
      a: "Structural steel, stainless (304, 316), brass, aluminium and non-ferrous metals. For special materials (titanium, heat-resistant steels) we agree on the specific requirement.",
    },
    {
      q: "What welding methods do you use?",
      a: "MIG/MAG (135/138), TIG (141) and SMAW (111). We weld steel, stainless and aluminium.",
    },
    {
      q: "Are your welders certified?",
      a: "Yes — all active welders hold a valid certificate under ČSN EN ISO 9606-1 for the relevant method/material/position combinations. Copies of certificates are supplied on request.",
    },
    {
      q: "How long does a typical order take?",
      a: "Smaller one-off batches typically 1 – 2 weeks from order confirmation, medium series 3 – 5 weeks. The exact lead time is confirmed with the quote based on current workshop load.",
    },
    {
      q: "In what format do you accept drawings?",
      a: "Ideally PDF or DWG/DXF. We also accept paper drawings — we will scan them and confirm legibility. A 3D model (STEP, IGES) is welcome for more complex parts.",
    },
    {
      q: "Do you provide surface treatments?",
      a: "Yes, in cooperation with verified partners we arrange zinc plating, powder coating, pickling, passivation and other treatments. We hand parts to the treatment partner and collect them back — the customer deals only with us.",
    },
    {
      q: "Do you ship abroad?",
      a: "We regularly supply customers in Germany and Austria. Communication in English or German; shipping by agreement.",
    },
    {
      q: "How do we get a quote?",
      a: "The fastest way is to send a drawing via the contact form or by e-mail to info@okfinal.cz. We respond within 24 hours with a price and lead time.",
    },
  ],
  pages: {
    about: {
      metaTitle: "About",
      metaDescription:
        "The family company OK FINAL s.r.o. was founded in 1992 as a specialised manufacturer of staircases and steel structures. Today it focuses on machine machining.",
    },
    services: {
      metaTitle: "Our services",
      metaDescription:
        "Turning on Swiss-type CNC lathes from Ø 2 mm up to Ø 26 mm, manual welding and assembly work.",
      heroEyebrow: "Our services",
      heroTitle: "Turning, manual welding and assembly work",
      heroLead:
        "We work on Swiss-type CNC lathes and are able to machine parts from Ø 2 mm up to Ø 26 mm.",
      ctaTitle: "Schedule a meeting with us today",
      ctaLead:
        "If you are interested in cooperation, send us a non-binding inquiry and we will provide a free quote for your parts.",
      ctaButton: "Get in touch",
    },
    certificates: {
      metaTitle: "Certificates",
      metaDescription:
        "Quality management system of OK FINAL s.r.o. under ČSN EN ISO 9001:2016. Certificate No. QMS-5039/2023, STAVCERT Praha.",
      heroEyebrow: "Certificates",
      heroTitle: "Quality management system",
      heroLead:
        "An established and maintained quality management system for engineering and locksmithing production and machine machining on CNC lathes. ČSN EN ISO 9001:2016, certificate No. QMS-5039/2023.",
      sectionEyebrow: "STAVCERT",
      sectionTitle: "ČSN EN ISO 9001:2016",
      sectionLead: "Valid from 15 July 2023 until 14 July 2026. First certification: July 2011.",
      certAlt: "ISO 9001:2015 certificate for OK FINAL s.r.o.",
      downloadCs: "Download certificate (Czech)",
      downloadEn: "Download certificate (English)",
    },
    careers: {
      metaTitle: "Careers",
      metaDescription:
        "Careers at OK FINAL s.r.o., Nádražní 608, 564 01 Žamberk, Czech Republic. Phone: +420 465 612 713.",
      heroEyebrow: "Careers",
      heroTitle: "Careers",
      heroLead:
        "OK FINAL s.r.o., Nádražní 608, 564 01 Žamberk, Czech Republic. Phone: +420 465 612 713, mobile: +420 603 534 364.",
      emptyTitle: "Address and phones",
      emptyBody:
        "OK FINAL s.r.o., Nádražní 608, 564 01 Žamberk, Czech Republic. Company ID (IČ): 46506578, VAT ID (DIČ): CZ46506578. Phone: +420 465 612 713, mobile: +420 603 534 364.",
      emptyCta: "Call +420 465 612 713",
      respond: "Apply",
    },
    contact: {
      metaTitle: "Contact",
      metaDescription:
        "OK FINAL s.r.o., Nádražní 608, 564 01 Žamberk, Czech Republic. Phone: +420 465 612 713. Company ID: 46506578, VAT ID: CZ46506578.",
      heroEyebrow: "Contact",
      heroTitle: "Contact",
      heroLead:
        "Nádražní 608, 564 01 Žamberk, Czech Republic. Phone: +420 465 612 713, mobile: +420 603 534 364.",
      cardAddress: "Address",
      cardPhone: "Phone",
      cardEmail: "E-mail",
      cardBilling: "Billing information",
      formTitle: "Non-binding inquiry",
      formLead:
        "If you are interested in cooperation, send us a non-binding inquiry and we will provide a free quote for your parts.",
      mapTitle: "Company address",
    },
    faq: {
      metaTitle: "Frequently Asked Questions (FAQ)",
      metaDescription:
        "Answers to the most common questions about precision turning, welding and assembly. Tolerances, materials, drawing formats, lead times.",
      heroEyebrow: "Frequently Asked Questions",
      heroTitle: "Questions we hear most often",
      heroLead:
        "Practical answers from our daily work. Didn't find your question? Let us know.",
    },
  },
} as const;

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
    title: "ČSN EN ISO 9001:2016",
    body:
      "Systém managementu kvality pro strojírenskou a zámečnickou výrobu a strojní obrábění na CNC soustruzích. Certifikát č. QMS-5039/2023, STAVCERT Praha. Platnost od 15. 7. 2023 do 14. 7. 2026. První certifikace: červenec 2011.",
    tag: "Kvalita",
  },
  {
    title: "ISO 9001:2015",
    body:
      "Anglické znění téhož certifikátu. Rozsah: machine industry production and locksmithery, machine machining CNC lathes. Certificate No. QMS-5039/2023, platnost 15. 7. 2023 – 14. 7. 2026.",
    tag: "EN",
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
