import type { Metadata } from "next";
import Image from "next/image";
import { PageHero, Section, SectionHeader } from "@/components/Section";
import { certificateScans, enContent, site } from "@/lib/site";

export const metadata: Metadata = {
  title: enContent.pages.certificates.metaTitle,
  description: enContent.pages.certificates.metaDescription,
  alternates: { canonical: "/en/certificates" },
};

export default function EnCertificatesPage() {
  const t = enContent.pages.certificates;
  const certificates = enContent.certificates;
  return (
    <>
      <PageHero eyebrow={t.heroEyebrow} title={t.heroTitle} lead={t.heroLead} />
      <Section>
        <SectionHeader
          eyebrow={t.sectionEyebrow}
          title={t.sectionTitle}
          lead={t.sectionLead}
        />
        <div className="mb-12 grid gap-6 md:grid-cols-3">
          {certificateScans.map((cert) => (
            <a
              key={cert.src}
              href={cert.src}
              target="_blank"
              rel="noopener noreferrer"
              className="overflow-hidden rounded-lg border border-steel-200 bg-steel-50 p-3 transition-shadow hover:shadow-lg"
            >
              <div className="relative aspect-[2084/2740]">
                <Image
                  src={cert.src}
                  alt={cert.altEn}
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
            </a>
          ))}
        </div>
        <div className="mb-10 flex flex-wrap gap-3">
          <a
            href={site.assets.certPdfEn}
            className="btn btn-ghost"
            target="_blank"
            rel="noopener noreferrer"
          >
            {t.downloadEn} (PDF)
          </a>
          <a
            href={site.assets.certPdfCs}
            className="btn btn-ghost"
            target="_blank"
            rel="noopener noreferrer"
          >
            {t.downloadCs} (PDF)
          </a>
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
