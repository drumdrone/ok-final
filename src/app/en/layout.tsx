import type { Metadata } from "next";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: {
    default: `${site.name} — Precision metalworks, Czech Republic`,
    template: `%s | ${site.name}`,
  },
  description:
    "Precision turning, manual welding and assembly to engineering drawings. Family workshop in Žamberk, Czech Republic. 33 years of practice, ISO 9001.",
  alternates: {
    canonical: "/en",
    languages: {
      "cs-CZ": "/",
      "en": "/en",
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: `${site.url}/en`,
    siteName: site.name,
    title: `${site.name} — Precision metalworks, Czech Republic`,
    description:
      "Precision turning, manual welding and assembly to engineering drawings. ISO 9001 certified.",
    images: [
      {
        url: site.assets.hero,
        width: 1200,
        height: 630,
        alt: site.name,
      },
    ],
  },
};

export default function EnLayout({ children }: { children: React.ReactNode }) {
  // Note: we don't re-wrap <html> here — Next merges with root layout.
  // The root <html lang="cs"> is overridden with suppressHydrationWarning via
  // the client-side effect in the page, or we leave it be — language is signalled
  // through the hreflang alternate above and the content itself.
  return <>{children}</>;
}
