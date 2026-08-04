import { services, site } from "./site";

const base = site.url;

export const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: site.name,
  legalName: site.name,
  url: base,
  logo: `${base}/favicon.svg`,
  description: site.description,
  address: {
    "@type": "PostalAddress",
    streetAddress: site.address.street,
    addressLocality: site.address.city,
    postalCode: site.address.zip,
    addressCountry: site.address.countryCode,
  },
  contactPoint: [
    {
      "@type": "ContactPoint",
      contactType: "sales",
      telephone: site.contacts.phone,
      email: site.contacts.email,
      areaServed: "CZ",
      availableLanguage: ["cs", "en"],
    },
  ],
  taxID: site.company.dic,
  vatID: site.company.dic,
  identifier: site.company.ico,
  foundingDate: String(site.company.founded),
};

export const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": `${base}#business`,
  name: site.name,
  image: `${base}${site.assets.hero}`,
  url: base,
  telephone: site.contacts.phone,
  email: site.contacts.email,
  priceRange: "$$",
  address: {
    "@type": "PostalAddress",
    streetAddress: site.address.street,
    addressLocality: site.address.city,
    postalCode: site.address.zip,
    addressCountry: site.address.countryCode,
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: site.address.lat,
    longitude: site.address.lng,
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "07:00",
      closes: "15:30",
    },
  ],
};

export const servicesJsonLd = services.map((s) => ({
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: s.title,
  name: s.title,
  description: s.body,
  provider: { "@id": `${base}#business` },
  areaServed: { "@type": "Country", name: "Česká republika" },
  url: `${base}/nase-sluzby#${s.slug}`,
}));

export function faqJsonLd(items: Array<{ q: string; a: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((it) => ({
      "@type": "Question",
      name: it.q,
      acceptedAnswer: { "@type": "Answer", text: it.a },
    })),
  };
}
