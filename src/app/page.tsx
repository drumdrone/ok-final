import Image from "next/image";
import Link from "next/link";
import { Section, SectionHeader } from "@/components/Section";
import { Reveal } from "@/components/Reveal";
import { JsonLd } from "@/components/JsonLd";
import { localBusinessJsonLd } from "@/lib/schema";
import { home, services, site } from "@/lib/site";

export default function HomePage() {
  const experienceBody = home.experience.body.replace(
    "{founded}",
    String(site.company.founded),
  );

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-steel-950 text-white">
        <div className="absolute inset-0">
          <Image
            src={site.assets.hero}
            alt=""
            fill
            priority
            className="object-cover object-center opacity-35"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-steel-950 via-steel-950/90 to-steel-950/55" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(200,16,46,0.25),transparent_60%)]" />
        </div>
        <div className="container relative grid gap-10 py-20 lg:grid-cols-[1.4fr_1fr] lg:py-28">
          <div>
            <div className="eyebrow mb-4">{home.hero.eyebrow}</div>
            <h1 className="font-display text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
              {home.hero.titleBefore}{" "}
              <span className="text-accent-500">{home.hero.titleAccent}</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-steel-200">
              {home.hero.lead}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href={home.hero.ctaPrimary.href} className="btn btn-primary">
                {home.hero.ctaPrimary.label}
              </Link>
              <Link href={home.hero.ctaSecondary.href} className="btn btn-onDark">
                {home.hero.ctaSecondary.label}
              </Link>
            </div>
            <dl className="mt-12 grid grid-cols-2 gap-6 border-t border-steel-800 pt-8 sm:grid-cols-4">
              {home.stats.map((s) => (
                <div key={s.label}>
                  <dt className="font-display text-3xl font-bold text-white">
                    {s.value}
                    {s.unit ? (
                      <span className="ml-1 text-lg font-normal text-steel-400">
                        {s.unit}
                      </span>
                    ) : null}
                  </dt>
                  <dd className="mt-1 text-xs uppercase tracking-wider text-steel-400">
                    {s.label}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="relative hidden lg:block">
            <div className="relative ml-auto h-full min-h-[420px] max-w-md">
              <div className="absolute inset-0 overflow-hidden rounded-lg shadow-2xl ring-1 ring-white/10">
                <Image
                  src={site.assets.machine}
                  alt={home.hero.machineAlt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 0px, 420px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-steel-950/70 via-transparent to-transparent" />
              </div>
              <div className="absolute -bottom-6 -left-6 rounded-lg border border-steel-700 bg-steel-900 px-6 py-4 shadow-xl">
                <div className="text-xs uppercase tracking-wider text-steel-400">
                  {home.hero.contactLabel}
                </div>
                <div className="mt-1 font-semibold text-white">
                  {site.contacts.contactPerson.name}
                </div>
                <div className="text-sm text-steel-300">
                  {site.contacts.contactPerson.phone}
                </div>
              </div>
              <div className="absolute -right-4 top-8 rounded-lg border border-accent-500/40 bg-accent-500/10 px-4 py-3 text-sm text-accent-400 backdrop-blur">
                {home.hero.badge}
              </div>
            </div>
          </div>
        </div>
      </section>

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
          <Link href={home.cta.button.href} className="btn btn-onAccent">
            {home.cta.button.label}
          </Link>
        </div>
      </section>

      <JsonLd data={localBusinessJsonLd} />
    </>
  );
}
