import type { Metadata } from "next";
import { PageHero, Section } from "@/components/Section";
import { ContactForm } from "@/components/ContactForm";
import { enContent, site } from "@/lib/site";

export const metadata: Metadata = {
  title: enContent.pages.contact.metaTitle,
  description: enContent.pages.contact.metaDescription,
  alternates: { canonical: "/en/contact" },
};

const mapQuery = encodeURIComponent(
  `${site.address.street}, ${site.address.zip} ${site.address.city}`
);

export default function EnContactPage() {
  const t = enContent.pages.contact;
  return (
    <>
      <PageHero eyebrow={t.heroEyebrow} title={t.heroTitle} lead={t.heroLead} />

      <Section>
        <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr]">
          <div className="order-2 space-y-4 lg:order-1">
            <ContactCard title={t.cardAddress}>
              <div>{site.address.street}</div>
              <div>
                {site.address.zip} {site.address.city}
              </div>
              <div>Czech Republic</div>
            </ContactCard>

            <ContactCard title={t.cardPhone}>
              <a
                href={`tel:${site.contacts.phone.replace(/\s/g, "")}`}
                className="text-lg font-semibold text-steel-950 hover:text-accent-600"
              >
                {site.contacts.phone}
              </a>
            </ContactCard>

            <ContactCard title={t.cardEmail}>
              <a
                href={`mailto:${site.contacts.email}`}
                className="text-lg font-semibold text-steel-950 hover:text-accent-600"
              >
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
                  <a
                    href={`tel:${person.phone.replace(/\s/g, "")}`}
                    className="block hover:text-accent-600"
                  >
                    {person.phone}
                  </a>
                </div>
              </ContactCard>
            ))}

            <ContactCard title={t.cardBilling}>
              <div className="text-sm">
                <div>
                  Company ID (IČ):{" "}
                  <span className="font-medium text-steel-800">{site.company.ico}</span>
                </div>
                <div>
                  VAT ID (DIČ):{" "}
                  <span className="font-medium text-steel-800">{site.company.dic}</span>
                </div>
                <div className="mt-2">{site.company.court}</div>
                <a
                  href={`mailto:${site.company.billingEmail}`}
                  className="mt-2 block hover:text-accent-600"
                >
                  {site.company.billingEmail}
                </a>
              </div>
            </ContactCard>
          </div>

          <div className="order-1 rounded-lg border border-steel-200 bg-white p-6 sm:p-8 lg:order-2">
            <h2 className="text-2xl font-bold">{t.formTitle}</h2>
            <p className="mt-2 text-steel-600">{t.formLead}</p>
            <div className="mt-6">
              <ContactForm />
            </div>
          </div>
        </div>
      </Section>

      <section className="border-t border-steel-100 bg-steel-50">
        <div className="container py-12">
          <h2 className="mb-4 text-2xl font-bold">{t.mapTitle}</h2>
          <div className="overflow-hidden rounded-lg border border-steel-200 bg-white">
            <iframe
              title="OK FINAL s.r.o. map"
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
