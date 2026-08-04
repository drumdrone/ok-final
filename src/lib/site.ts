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
  },
];
