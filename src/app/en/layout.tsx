import type { Metadata } from "next";
import { site } from "@/lib/site";

// Layout-level metadata applies to all /en/* pages; individual pages override
// title/description/canonical via their own generateMetadata or metadata exports.
export const metadata: Metadata = {
  title: {
    default: `${site.name} — Precision metalworks, Czech Republic`,
    template: `%s | ${site.name}`,
  },
  description:
    "Precision turning, manual welding and assembly to engineering drawings. Family workshop in Žamberk, Czech Republic. 35 years of practice, ISO 9001.",
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: site.name,
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
  // We can't re-wrap <html lang="en"> under App Router nested layouts.
  // Language is signalled via hreflang alternates in metadata and page content.
  return <>{children}</>;
}
