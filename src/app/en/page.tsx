import Image from "next/image";
import Link from "next/link";
import { en, site } from "@/lib/site";

export default function EnLandingPage() {
  const mapQuery = encodeURIComponent(
    `${site.address.street}, ${site.address.zip} ${site.address.city}`
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
        </div>
        <div className="container relative grid gap-10 py-20 lg:grid-cols-[1.4fr_1fr] lg:py-28">
          <div>
            <div className="eyebrow mb-4">{en.hero.eyebrow}</div>
            <h1 className="font-display text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
              {en.hero.titleBefore}{" "}
              <span className="text-accent-500">{en.hero.titleAccent}</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-steel-200">
              {en.hero.lead}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href={en.hero.ctaPrimary.href} className="btn btn-primary">
                {en.hero.ctaPrimary.label}
              </Link>
              <Link href={en.hero.ctaSecondary.href} className="btn btn-onDark">
                {en.hero.ctaSecondary.label}
              </Link>
            </div>
            <dl className="mt-12 grid grid-cols-2 gap-6 border-t border-steel-800 pt-8 sm:grid-cols-4">
              {en.stats.map((s) => (
                <div key={s.label}>
                  <dt className="sr-only">{s.label}</dt>
                  <dd className="font-display text-3xl font-bold text-white sm:text-4xl">
                    {s.value}
                    {s.unit && (
                      <span className="ml-1 text-base font-medium text-steel-300">
                        {s.unit}
                      </span>
                    )}
                  </dd>
                  <dd className="mt-1 text-xs uppercase tracking-wider text-steel-400">
                    {s.label}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* Intro */}
      <section className="section bg-white">
        <div className="container-tight">
          <h2 className="font-display text-3xl font-bold text-steel-950 sm:text-4xl">
            {en.intro.title}
          </h2>
          <p className="mt-6 max-w-prose text-lg leading-relaxed text-steel-700">
            {en.intro.body}
          </p>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="section bg-steel-50">
        <div className="container">
          <div className="eyebrow">{en.services.eyebrow}</div>
          <h2 className="mt-2 font-display text-3xl font-bold text-steel-950 sm:text-4xl">
            {en.services.title}
          </h2>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {en.services.items.map((s) => (
              <article
                key={s.title}
                className="rounded-lg border border-steel-100 bg-white p-6 shadow-sm"
              >
                <h3 className="font-display text-xl font-semibold text-steel-950">
                  {s.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-steel-700">
                  {s.body}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Quality */}
      <section className="section bg-white">
        <div className="container-tight">
          <div className="eyebrow">{en.quality.eyebrow}</div>
          <h2 className="mt-2 font-display text-3xl font-bold text-steel-950 sm:text-4xl">
            {en.quality.title}
          </h2>
          <p className="mt-6 max-w-prose text-lg leading-relaxed text-steel-700">
            {en.quality.body}
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href={site.assets.certPdfEn}
              className="btn btn-ghost"
              target="_blank"
              rel="noopener noreferrer"
            >
              {en.quality.downloadEn} (PDF)
            </a>
            <a
              href={site.assets.certPdfCs}
              className="btn btn-ghost"
              target="_blank"
              rel="noopener noreferrer"
            >
              {en.quality.downloadCs} (PDF)
            </a>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="section bg-steel-950 text-white">
        <div className="container-tight">
          <div className="eyebrow">{en.contact.eyebrow}</div>
          <h2 className="mt-2 font-display text-3xl font-bold text-white sm:text-4xl">
            {en.contact.title}
          </h2>
          <p className="mt-6 text-lg text-steel-200">{en.contact.lead}</p>

          <div className="mt-10 grid gap-8 md:grid-cols-2">
            <div>
              <div className="text-xs uppercase tracking-widest text-steel-400">
                {en.contact.emailLabel}
              </div>
              <a
                href={`mailto:${en.contact.emailAddress}`}
                className="mt-2 block text-lg font-semibold text-accent-500 hover:text-white"
              >
                {en.contact.emailAddress}
              </a>

              <div className="mt-6 text-xs uppercase tracking-widest text-steel-400">
                {en.contact.phoneLabel}
              </div>
              <a
                href={`tel:${site.contacts.phone.replace(/\s/g, "")}`}
                className="mt-2 block text-lg font-semibold text-white hover:text-accent-500"
              >
                {site.contacts.phone}
              </a>

              <div className="mt-6 text-xs uppercase tracking-widest text-steel-400">
                {en.contact.addressLabel}
              </div>
              <address className="mt-2 not-italic text-steel-200">
                {site.name}
                <br />
                {site.address.street}
                <br />
                {site.address.zip} {site.address.city}
                <br />
                {site.address.country}
              </address>

              <p className="mt-6 text-sm text-steel-300">
                {en.contact.languagesNote}
              </p>
            </div>
            <div className="overflow-hidden rounded-lg border border-steel-800">
              <iframe
                title="OK Final location on map"
                src={`https://www.google.com/maps?q=${mapQuery}&output=embed`}
                width="100%"
                height="320"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          <p className="mt-12 text-sm text-steel-400">{en.contact.note}</p>

          <div className="mt-6">
            <Link href="/" className="text-sm text-steel-300 hover:text-white">
              {en.footerBack}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
