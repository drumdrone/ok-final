import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageHero, Section } from "@/components/Section";
import { JsonLd } from "@/components/JsonLd";
import { servicesJsonLd } from "@/lib/schema";
import { services } from "@/lib/site";

export const metadata: Metadata = {
  title: "Naše služby",
  description:
    "Soustružení na CNC dlouhotočných automatech od průměru 2 mm do 26 mm, ruční svařování a montážní práce.",
  alternates: { canonical: "/nase-sluzby" },
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Naše služby"
        title="Soustružení, ruční svařování a montážní práce"
        lead="Práci provádíme na CNC dlouhotočných automatech a jsme schopni obrábět dílce od průměru 2 mm do průměru 26 mm."
      />

      <Section>
        <div className="space-y-16">
          {services.map((s, i) => (
            <article
              key={s.slug}
              id={s.slug}
              className="grid gap-8 border-t border-steel-200 pt-12 lg:grid-cols-[1fr_2fr] lg:gap-16"
            >
              <div>
                <div className="relative mb-6 aspect-[4/3] overflow-hidden rounded-lg bg-steel-100">
                  <Image
                    src={s.image}
                    alt={s.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 33vw"
                  />
                </div>
                <div className="font-display text-6xl font-bold text-accent-500">
                  0{i + 1}
                </div>
                <h2 className="mt-4 text-3xl font-bold">{s.title}</h2>
                <p className="mt-3 text-lg text-steel-600">{s.short}</p>
              </div>
              <div>
                <p className="text-lg leading-relaxed text-steel-700">
                  {s.body}
                </p>
                <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                  {s.bullets.map((b, bulletIndex) => (
                    <li key={`${s.slug}-${bulletIndex}`} className="flex items-start gap-3">
                      <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-accent-500" />
                      <span className="text-steel-700">{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </Section>

      <section className="bg-steel-950 py-16 text-white">
        <div className="container flex flex-col items-center justify-between gap-6 text-center md:flex-row md:text-left">
          <div>
            <h2 className="text-2xl font-bold sm:text-3xl">
              Sjednejte si schůzku s námi ještě dnes
            </h2>
            <p className="mt-2 text-steel-300">
              Pokud máte zájem o případnou spolupráci, tak nám zašlete nezávaznou poptávku a my vám dílce bezplatně naceníme.
            </p>
          </div>
          <Link href="/kontakt" className="btn btn-primary">
            Kontaktovat
          </Link>
        </div>
      </section>

      {servicesJsonLd.map((data, i) => (
        <JsonLd key={i} data={data} />
      ))}
    </>
  );
}
