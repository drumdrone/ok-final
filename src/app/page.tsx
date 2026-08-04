import Link from "next/link";
import { Section, SectionHeader } from "@/components/Section";
import { Reveal } from "@/components/Reveal";
import { JsonLd } from "@/components/JsonLd";
import { localBusinessJsonLd } from "@/lib/schema";
import { services, site } from "@/lib/site";

const stats = [
  { value: "33", unit: "let", label: "na trhu" },
  { value: "500+", unit: "", label: "dokončených zakázek ročně" },
  { value: "IT6", unit: "", label: "nejvyšší dosahovaná tolerance" },
  { value: "24 h", unit: "", label: "odezva na poptávku" },
];

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-steel-950 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(249,115,22,0.18),transparent_60%)]" />
        <div className="container relative grid gap-10 py-20 lg:grid-cols-[1.4fr_1fr] lg:py-28">
          <div>
            <div className="eyebrow mb-4">Přesné strojírenství · Žamberk</div>
            <h1 className="font-display text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
              Kovové dílce podle vaší{" "}
              <span className="text-accent-500">výkresové dokumentace</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-steel-200">
              Přesné soustružení, ruční svařování a kompletace. Kusová i sériová
              výroba pro strojírenství, energetiku a průmyslovou automatizaci.
              Odezva na poptávku do 24 hodin.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/kontakt" className="btn btn-primary">
                Nezávazná poptávka
              </Link>
              <Link href="/nase-sluzby" className="btn btn-onDark">
                Naše služby
              </Link>
            </div>
            <dl className="mt-12 grid grid-cols-2 gap-6 border-t border-steel-800 pt-8 sm:grid-cols-4">
              {stats.map((s) => (
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
            <div className="relative ml-auto h-full max-w-md">
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-steel-800 via-steel-900 to-steel-950 shadow-2xl" />
              <svg
                className="absolute inset-0 h-full w-full opacity-40"
                viewBox="0 0 300 400"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <defs>
                  <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                    <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#526a87" strokeWidth="0.5" />
                  </pattern>
                </defs>
                <rect width="300" height="400" fill="url(#grid)" />
                <circle cx="150" cy="200" r="80" fill="none" stroke="#f97316" strokeWidth="1.5" />
                <circle cx="150" cy="200" r="40" fill="none" stroke="#f97316" strokeWidth="1.5" />
                <line x1="70" y1="200" x2="230" y2="200" stroke="#f97316" strokeWidth="0.5" strokeDasharray="4 4" />
                <line x1="150" y1="120" x2="150" y2="280" stroke="#f97316" strokeWidth="0.5" strokeDasharray="4 4" />
              </svg>
              <div className="absolute -bottom-6 -left-6 rounded-lg border border-steel-700 bg-steel-900 px-6 py-4 shadow-xl">
                <div className="text-xs uppercase tracking-wider text-steel-400">
                  Kontaktní osoba
                </div>
                <div className="mt-1 font-semibold text-white">
                  {site.contacts.contactPerson.name}
                </div>
                <div className="text-sm text-steel-300">
                  {site.contacts.contactPerson.phone}
                </div>
              </div>
              <div className="absolute -right-4 top-8 rounded-lg border border-accent-500/40 bg-accent-500/10 px-4 py-3 text-sm text-accent-400 backdrop-blur">
                ČSN EN ISO 9606-1
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <Section>
        <SectionHeader
          eyebrow="Co pro vás uděláme"
          title="Tři služby, jeden dodavatel"
          lead="Od výkresu k hotovému výrobku bez potřeby přeprodávat práci dalším dílnám."
        />
        <div className="grid gap-6 md:grid-cols-3">
          {services.map((s, i) => (
            <Reveal key={s.slug} delay={i * 80}>
              <Link
                href={`/nase-sluzby#${s.slug}`}
                className="group relative flex h-full flex-col rounded-lg border border-steel-200 bg-white p-8 transition-shadow hover:shadow-lg"
              >
                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded bg-steel-950 font-display text-lg font-bold text-accent-500">
                  0{i + 1}
                </div>
                <h3 className="text-xl font-bold">{s.title}</h3>
                <p className="mt-3 flex-1 text-steel-600">{s.short}</p>
                <div className="mt-6 text-sm font-semibold text-accent-600 group-hover:underline">
                  Detail služby →
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Experience */}
      <section className="bg-steel-950 py-20 text-white">
        <div className="container grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:items-center">
          <div>
            <div className="font-display text-7xl font-bold text-accent-500 sm:text-8xl">
              33
            </div>
            <div className="mt-2 text-xl text-steel-300">let řemeslné praxe</div>
          </div>
          <div>
            <h2 className="text-3xl font-bold text-white sm:text-4xl">
              Rodinná dílna, která rozumí strojařině
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-steel-300">
              OK FINAL byla založena v roce {site.company.founded}. Za tři dekády
              jsme dodali statisíce dílců pro tuzemské živnostníky, střední
              strojírenské podniky i zahraniční klienty. Držíme si kompaktní tým
              a osobní přístup — s vaší poptávkou nekomunikujete s callcentrem,
              ale přímo s technologem.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/o-firme" className="btn btn-primary">
                O firmě
              </Link>
              <Link href="/certifikaty" className="btn btn-onDark">
                Certifikáty
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Segments */}
      <Section>
        <SectionHeader
          eyebrow="Pro koho pracujeme"
          title="Živnostníci i mezinárodní firmy"
          lead="Škála zákazníků od jednotlivců po výrobní závody z Německa a Rakouska."
        />
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-lg border border-steel-200 bg-white p-8">
            <SegmentIcon variant="craft" />
            <h3 className="mt-4 text-xl font-bold">Živnostníci a malé dílny</h3>
            <p className="mt-3 text-steel-600">
              Kusové zakázky, prototypy, náhradní díly. Vyrobíme i jeden kus
              podle vašeho výkresu nebo poškozeného originálu.
            </p>
          </div>
          <div className="rounded-lg border border-steel-200 bg-white p-8">
            <SegmentIcon variant="factory" />
            <h3 className="mt-4 text-xl font-bold">Zahraniční výrobci</h3>
            <p className="mt-3 text-steel-600">
              Střední série pro exportní zákazníky. Rámcové smlouvy, pravidelné
              dodávky, jednotná kvalita, komunikace v angličtině a němčině.
            </p>
          </div>
        </div>
      </Section>

      {/* CTA */}
      <section className="bg-accent-500 py-16 text-white">
        <div className="container flex flex-col items-center justify-between gap-6 text-center md:flex-row md:text-left">
          <div>
            <h2 className="text-2xl font-bold sm:text-3xl">
              Máte výkres? Ozvěte se, ať vidíme, jestli to spolu vyrobíme.
            </h2>
            <p className="mt-2 text-white/90">
              Odpovídáme do 24 hodin. Konzultace a odhad ceny zdarma.
            </p>
          </div>
          <Link
            href="/kontakt"
            className="btn bg-white text-accent-600 hover:bg-steel-50"
          >
            Sjednat schůzku
          </Link>
        </div>
      </section>

      <JsonLd data={localBusinessJsonLd} />
    </>
  );
}

function SegmentIcon({ variant }: { variant: "craft" | "factory" }) {
  const stroke = "#f97316";
  if (variant === "craft") {
    return (
      <svg width="40" height="40" viewBox="0 0 40 40" aria-hidden="true">
        <path d="M8 32 L20 8 L32 32 Z" fill="none" stroke={stroke} strokeWidth="1.6" strokeLinejoin="round" />
        <circle cx="20" cy="24" r="3" fill={stroke} />
      </svg>
    );
  }
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" aria-hidden="true">
      <path d="M4 32 V16 L14 22 V16 L24 22 V16 L34 22 V32 Z" fill="none" stroke={stroke} strokeWidth="1.6" strokeLinejoin="round" />
      <rect x="10" y="26" width="3" height="4" fill={stroke} />
      <rect x="20" y="26" width="3" height="4" fill={stroke} />
      <rect x="30" y="26" width="3" height="4" fill={stroke} />
    </svg>
  );
}
