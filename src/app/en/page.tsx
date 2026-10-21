import Image from "next/image";
import Link from "next/link";
import { HomeHero } from "@/components/HomeHero";
import { Section, SectionHeader } from "@/components/Section";
import { Reveal } from "@/components/Reveal";
import { JsonLd } from "@/components/JsonLd";
import { localBusinessJsonLd } from "@/lib/schema";
import { enContent, site } from "@/lib/site";

const home = enContent.home;
const services = enContent.services;

export default function EnHomePage() {
  const experienceBody = home.experience.body;

  return (
    <>
      <HomeHero
        hero={home.hero}
        image={site.assets.hero}
        contactName={site.contacts.contactPerson.name}
        contactPhone={site.contacts.contactPerson.phone}
        contactHref={home.hero.ctaSecondary.href}
      />

      {/* Services */}
      <Section>
        <SectionHeader
          eyebrow={home.services.eyebrow}
          title={home.services.title}
          lead={home.services.lead}
        />
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {services.map((s) => (
            <Reveal key={s.slug}>
              <article className="group h-full rounded-lg border border-steel-200 bg-white p-6 transition-shadow hover:shadow-md">
                <div className="relative mb-4 aspect-[4/3] overflow-hidden rounded-md bg-steel-100">
                  <Image
                    src={s.image}
                    alt={s.title}
                    fill
                    className="object-cover transition-transform group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <h3 className="text-xl font-bold">{s.title}</h3>
                <p className="mt-2 text-sm text-steel-600">{s.short}</p>
                <Link
                  href={`/en/services#${s.slug}`}
                  className="mt-4 inline-flex text-sm font-semibold text-accent-600 hover:text-accent-700"
                >
                  {home.services.detailLink}
                </Link>
              </article>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Experience band */}
      <section className="bg-steel-950 py-20 text-white">
        <div className="container grid gap-10 lg:grid-cols-[1fr_1.5fr] lg:items-center">
          <div className="text-center lg:text-left">
            <div className="font-display text-7xl font-bold text-accent-500 sm:text-8xl">
              {home.experience.years}
            </div>
            <div className="mt-2 text-sm uppercase tracking-widest text-steel-400">
              {home.experience.yearsLabel}
            </div>
          </div>
          <div>
            <h2 className="font-display text-3xl font-bold sm:text-4xl">
              {home.experience.title}
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-steel-300">
              {experienceBody}
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href={home.experience.ctaPrimary.href} className="btn btn-primary">
                {home.experience.ctaPrimary.label}
              </Link>
              <Link href={home.experience.ctaSecondary.href} className="btn btn-onDark">
                {home.experience.ctaSecondary.label}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Segments */}
      <Section>
        <SectionHeader
          eyebrow={home.segments.eyebrow}
          title={home.segments.title}
          lead={home.segments.lead}
        />
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {home.segments.items.map((seg) => (
            <article key={seg.title} className="rounded-lg border border-steel-200 bg-white p-6">
              <div className="relative mb-4 h-14 w-14 overflow-hidden">
                <Image src={seg.icon} alt="" fill className="object-contain" sizes="56px" />
              </div>
              <h3 className="text-xl font-bold">{seg.title}</h3>
              <p className="mt-2 text-steel-600">{seg.body}</p>
            </article>
          ))}
        </div>
      </Section>

      {/* CTA */}
      <section className="bg-accent-500 py-12 text-white">
        <div className="container flex flex-col items-center justify-between gap-4 text-center md:flex-row md:text-left">
          <div>
            <h2 className="text-2xl font-bold sm:text-3xl">{home.cta.title}</h2>
            <p className="mt-1 text-sm text-white/90">{home.cta.lead}</p>
          </div>
          <Link href={home.cta.button.href} className="btn btn-onAccent btn-arrow">
            {home.cta.button.label}
          </Link>
        </div>
      </section>

      <JsonLd data={localBusinessJsonLd} />
    </>
  );
}
