import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageHero, Section } from "@/components/Section";
import { about, milestones, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "O firmě",
  description:
    "Rodinná firma OK FINAL s.r.o. byla založena v roce 1992 jako specializovaný výrobce schodišť a ocelových konstrukcí. Dnes se věnuje strojnímu obrábění.",
  alternates: { canonical: "/o-firme" },
};

export default function OFirmePage() {
  const paragraphs = about.paragraphs;

  return (
    <>
      <PageHero
        eyebrow={about.hero.eyebrow}
        title={about.hero.title}
        lead={about.hero.lead}
      />

      <Section tight>
        <div className="grid items-start gap-10 lg:grid-cols-[1.2fr_1fr]">
          <div className="space-y-6 text-lg leading-relaxed text-steel-700">
            {paragraphs.map((p) => (
              <p key={p.slice(0, 40)}>{p}</p>
            ))}
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-steel-100">
            <Image
              src={site.assets.workshop}
              alt={about.workshopAlt}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 40vw"
            />
          </div>
        </div>
      </Section>

      <Section className="bg-steel-50">
        <h2 className="mb-10 text-3xl font-bold sm:text-4xl">
          {about.milestonesTitle}
        </h2>
        <ol className="relative space-y-8 border-l-2 border-steel-200 pl-6">
          {milestones.map((m) => (
            <li key={m.year} className="relative">
              <span className="absolute -left-[33px] top-1 flex h-5 w-5 items-center justify-center rounded-full bg-accent-500 ring-4 ring-steel-50" />
              <div className="eyebrow">{m.year}</div>
              <div className="mt-1 text-lg text-steel-800">{m.text}</div>
            </li>
          ))}
        </ol>
      </Section>

      <Section tight>
        <div className="rounded-lg border border-steel-200 bg-white p-8 text-center">
          <h2 className="text-2xl font-bold">{about.cta.title}</h2>
          <p className="mx-auto mt-3 max-w-xl text-steel-600">{about.cta.lead}</p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link href={about.cta.primary.href} className="btn btn-primary btn-arrow">
              {about.cta.primary.label}
            </Link>
            <Link href={about.cta.secondary.href} className="btn btn-ghost">
              {about.cta.secondary.label}
            </Link>
          </div>
        </div>
      </Section>
    </>
  );
}
