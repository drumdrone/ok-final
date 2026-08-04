import type { Metadata } from "next";
import { PageHero, Section } from "@/components/Section";
import { JsonLd } from "@/components/JsonLd";
import { faqJsonLd } from "@/lib/schema";
import { faqItems } from "@/lib/site";

export const metadata: Metadata = {
  title: "Časté dotazy (FAQ)",
  description:
    "Odpovědi na nejčastější otázky ohledně přesného soustružení, svařování a kompletace. Tolerance, materiály, formáty výkresů, termíny.",
  alternates: { canonical: "/faq" },
};

export default function FaqPage() {
  const items = faqItems.map((item) => ({ q: item.q, a: item.a }));

  return (
    <>
      <PageHero
        eyebrow="Časté dotazy"
        title="Otázky, které nám kladete nejčastěji"
        lead="Praktické odpovědi z každodenní práce. Nenašli jste svou otázku? Napište nám."
      />
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
