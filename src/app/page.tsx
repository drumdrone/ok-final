import Image from "next/image";
import Link from "next/link";
import { HomeHero } from "@/components/HomeHero";
import { Section, SectionHeader } from "@/components/Section";
import { Reveal } from "@/components/Reveal";
import { JsonLd } from "@/components/JsonLd";
import { localBusinessJsonLd } from "@/lib/schema";
import { home, services, site } from "@/lib/site";

export default function HomePage() {
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
        <div className="grid gap-6 md:grid-cols-3">
          {services.map((s, i) => (
            <Reveal key={s.slug} delay={i * 80}>
              <Link
                href={`/nase-sluzby#${s.slug}`}
                className="group relative flex h-full flex-col overflow-hidden rounded-lg border border-steel-200 bg-white transition-shadow hover:shadow-lg"
              >
                <div className="relative h-44 overflow-hidden bg-steel-100">
                  <Image
                    src={s.image}
                    alt={s.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <div className="flex flex-1 flex-col p-8">
                  <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-md bg-steel-950 font-display text-sm font-bold text-accent-500">
                    0{i + 1}
                  </div>
                  <h3 className="text-xl font-bold">{s.title}</h3>
                  <p className="mt-3 flex-1 text-steel-600">{s.short}</p>
                  <div className="mt-6 text-sm font-semibold text-accent-600 group-hover:underline">
                    {home.services.detailLink}
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Experience */}
      <section className="relative overflow-hidden bg-steel-950 py-16 text-white lg:py-24">
        <div className="absolute inset-0">
          <Image
            src={site.assets.workshop}
            alt=""
            fill
            className="object-cover opacity-25"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-steel-950/80" />
        </div>
        <div className="container relative grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:items-center">
          <div>
            <div className="font-display text-7xl font-bold text-accent-500 sm:text-8xl">
              {home.experience.years}
            </div>
            <div className="mt-2 text-xl text-steel-300">
              {home.experience.yearsLabel}
            </div>
          </div>
          <div>
            <h2 className="text-3xl font-bold text-white sm:text-4xl">
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
        <div className="grid gap-6 md:grid-cols-2">
          {home.segments.items.map((item) => (
            <div
              key={item.title}
              className="rounded-lg border border-steel-200 bg-white p-8"
            >
              <div className="flex h-14 w-14 items-center justify-center overflow-hidden rounded-md bg-steel-950">
                <Image
                  src={item.icon}
                  alt=""
                  width={40}
                  height={40}
                  className="h-10 w-10 object-contain"
                />
              </div>
              <h3 className="mt-4 text-xl font-bold">{item.title}</h3>
              <p className="mt-3 text-steel-600">{item.body}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* CTA */}
      <section className="bg-accent-500 py-16 text-white">
        <div className="container flex flex-col items-center justify-between gap-6 text-center md:flex-row md:text-left">
          <div>
            <h2 className="text-2xl font-bold sm:text-3xl">{home.cta.title}</h2>
            <p className="mt-2 text-white/90">{home.cta.lead}</p>
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
