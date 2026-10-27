import type { Metadata } from "next";
import Image from "next/image";
import { PageHero, Section, SectionHeader } from "@/components/Section";
import { certificateScans, certificates } from "@/lib/site";

export const metadata: Metadata = {
  title: "Certifikáty",
  description:
    "Systém managementu kvality OK FINAL s.r.o. podle ČSN EN ISO 9001:2016. Certifikát č. QMS-5385/2026, STAVCERT Praha.",
  alternates: { canonical: "/certifikaty" },
};

export default function CertifikatyPage() {
  return (
    <>
      <PageHero
        eyebrow="Certifikáty"
        title="Systém managementu kvality"
        lead="Zavedený a udržovaný systém managementu kvality pro strojírenskou a zámečnickou výrobu a strojní obrábění na CNC soustruzích. ČSN EN ISO 9001:2016, certifikát č. QMS-5385/2026."
      />
      <Section>
        <SectionHeader
          eyebrow="STAVCERT"
          title="ČSN EN ISO 9001:2016"
          lead="Platnost od 15. 7. 2026 do 14. 7. 2029. První certifikace: červenec 2011."
        />
        <div className="mb-12 grid gap-6 md:grid-cols-3">
          {certificateScans.map((cert) => (
            <a
              key={cert.src}
              href={cert.href}
              target="_blank"
              rel="noopener noreferrer"
              className="overflow-hidden rounded-lg border border-steel-200 bg-steel-50 p-3 transition-shadow hover:shadow-lg"
            >
              <div className="relative aspect-[1298/1840]">
                <Image
                  src={cert.src}
                  alt={cert.altCs}
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
            </a>
          ))}
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {certificates.map((c) => (
            <div
              key={c.title}
              className="rounded-lg border border-steel-200 bg-white p-6"
            >
              <div className="flex items-start justify-between gap-4">
                <h3 className="text-lg font-bold">{c.title}</h3>
                <span className="rounded-full bg-accent-500/10 px-3 py-1 text-xs font-semibold text-accent-700">
                  {c.tag}
                </span>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-steel-600">
                {c.body}
              </p>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}
