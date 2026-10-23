import type { Metadata } from "next";
import { PageHero, Section } from "@/components/Section";
import { JsonLd } from "@/components/JsonLd";
import { faqJsonLd } from "@/lib/schema";
import { enContent } from "@/lib/site";

export const metadata: Metadata = {
  title: enContent.pages.faq.metaTitle,
  description: enContent.pages.faq.metaDescription,
  alternates: { canonical: "/en/faq" },
};

export default function EnFaqPage() {
  const t = enContent.pages.faq;
  const faqItems = enContent.faqItems;
  const items = faqItems.map((item) => ({ q: item.q, a: item.a }));

  return (
    <>
      <PageHero eyebrow={t.heroEyebrow} title={t.heroTitle} lead={t.heroLead} />
      <Section tight>
        <dl className="divide-y divide-steel-200 border-y border-steel-200">
          {faqItems.map((item) => (
            <div key={item.q} className="grid gap-4 py-6 md:grid-cols-[1fr_2fr]">
              <dt className="text-lg font-bold text-steel-950">{item.q}</dt>
              <dd className="text-steel-700">{item.a}</dd>
            </div>
          ))}
        </dl>
      </Section>
      <JsonLd data={faqJsonLd(items)} />
    </>
  );
}
