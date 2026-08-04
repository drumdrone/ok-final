import type { Metadata } from "next";
import { PageHero, Section, SectionHeader } from "@/components/Section";

export const metadata: Metadata = {
  title: "Certifikáty",
  description:
    "Certifikace svářečů podle ČSN EN ISO 9606-1 a další doklady kvality výroby OK FINAL s.r.o.",
  alternates: { canonical: "/certifikaty" },
};

const certificates = [
  {
    title: "ČSN EN ISO 9606-1",
    body:
      "Zkouška svářečů — tavné svařování ocelí. Platné osvědčení pro všechny aktivní svářeče v podniku.",
    tag: "Svařování",
  },
  {
    title: "Metoda 135 / 138 (MIG/MAG)",
    body:
      "Certifikované obloukové svařování tavící se elektrodou v ochranné atmosféře plynu — pro ocel i nerez.",
    tag: "Svařování",
  },
  {
    title: "Metoda 141 (TIG)",
    body:
      "Obloukové svařování netavící se wolframovou elektrodou v ochranné atmosféře plynu — pro nerez, hliník a přesné spoje.",
    tag: "Svařování",
  },
  {
    title: "Metoda 111 (elektroda)",
    body:
      "Obloukové svařování obalenou elektrodou — pro konstrukční ocel a montáže v terénu.",
    tag: "Svařování",
  },
  {
    title: "Kalibrace měřidel",
    body:
      "Pravidelná kalibrace posuvných měřidel, mikrometrů a měřicích přístrojů akreditovanou laboratoří.",
    tag: "Metrologie",
  },
  {
    title: "Kontrolní protokoly",
    body:
      "Na vyžádání dodáváme protokoly o měření rozměrů a jakosti pro každou dávku.",
    tag: "Kvalita",
  },
];

export default function CertifikatyPage() {
  return (
    <>
      <PageHero
        eyebrow="Certifikáty"
        title="Doklady kvality naší práce"
        lead="Kvalitu neslibujeme — dokládáme ji. Naše svářeče pravidelně certifikujeme a měřidla necháváme kalibrovat akreditovanou laboratoří."
      />
      <Section>
        <SectionHeader
          eyebrow="Přehled"
          title="Certifikáty a osvědčení"
          lead="Kopie dokladů dodáváme na vyžádání s každou zakázkou."
        />
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
