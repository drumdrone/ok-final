import type { Metadata } from "next";
import { PageHero, Section } from "@/components/Section";
import { ContactForm } from "@/components/ContactForm";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Kontakt",
  description:
    "OK FINAL s.r.o., ul. Nádražní 608, 564 01 Žamberk. Tel.: +420 465 612 713. IČ: 46506578, DIČ: CZ46506578.",
  alternates: { canonical: "/kontakt" },
};

const mapQuery = encodeURIComponent(
  `${site.address.street}, ${site.address.zip} ${site.address.city}`
);

export default function KontaktPage() {
  return (
    <>
      <PageHero
        eyebrow="Kontakt"
        title="Kontakt"
        lead="ul. Nádražní 608, 564 01 Žamberk. Tel.: +420 465 612 713, mobil: +420 603 534 364."
      />

      <Section>
        <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr]">
          <div className="order-2 space-y-4 lg:order-1">
            <ContactCard title="Adresa">
              <div>{site.address.street}</div>
              <div>{site.address.zip} {site.address.city}</div>
              <div>{site.address.country}</div>
            </ContactCard>

            <ContactCard title="Telefon">
              <a href={`tel:${site.contacts.phone.replace(/\s/g, "")}`} className="text-lg font-semibold text-steel-950 hover:text-accent-600">
                {site.contacts.phone}
              </a>
            </ContactCard>

            <ContactCard title="E-mail">
              <a href={`mailto:${site.contacts.email}`} className="text-lg font-semibold text-steel-950 hover:text-accent-600">
                {site.contacts.email}
              </a>
            </ContactCard>

            {site.contacts.people.map((person) => (
              <ContactCard key={person.email} title={person.role}>
                <div className="font-semibold text-steel-950">{person.name}</div>
                <div className="mt-2 space-y-1 text-sm">
                  <a href={`mailto:${person.email}`} className="block hover:text-accent-600">
                    {person.email}
                  </a>
                  <a href={`tel:${person.phone.replace(/\s/g, "")}`} className="block hover:text-accent-600">
                    {person.phone}
                  </a>
                </div>
              </ContactCard>
            ))}

            <ContactCard title="Fakturační údaje">
              <div className="text-sm">
                <div>IČ: <span className="font-medium text-steel-800">{site.company.ico}</span></div>
                <div>DIČ: <span className="font-medium text-steel-800">{site.company.dic}</span></div>
                <div className="mt-2">{site.company.court}</div>
                <a href={`mailto:${site.company.billingEmail}`} className="mt-2 block hover:text-accent-600">
                  {site.company.billingEmail}
                </a>
              </div>
            </ContactCard>
          </div>

          <div className="order-1 rounded-lg border border-steel-200 bg-white p-6 sm:p-8 lg:order-2">
            <h2 className="text-2xl font-bold">Nezávazná poptávka</h2>
            <p className="mt-2 text-steel-600">
              Pokud máte zájem o případnou spolupráci, tak nám zašlete nezávaznou poptávku a my vám dílce bezplatně naceníme.
            </p>
            <div className="mt-6">
              <ContactForm />
            </div>
          </div>
        </div>
      </Section>

      <section className="border-t border-steel-100 bg-steel-50">
        <div className="container py-12">
          <h2 className="mb-4 text-2xl font-bold">Adresa firmy</h2>
          <div className="overflow-hidden rounded-lg border border-steel-200 bg-white">
            <iframe
              title="Mapa OK FINAL s.r.o."
              src={`https://www.google.com/maps?q=${mapQuery}&output=embed`}
              className="h-[320px] w-full sm:h-[420px]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
        </div>
      </section>
    </>
  );
}

function ContactCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-lg border border-steel-200 bg-white p-5">
      <div className="text-xs font-semibold uppercase tracking-widest text-accent-600">
        {title}
      </div>
      <div className="mt-2 text-steel-800">{children}</div>
    </div>
  );
}
