import type { Metadata } from "next";
import { PageHero, Section } from "@/components/Section";
import { JsonLd } from "@/components/JsonLd";
import { faqJsonLd } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Časté dotazy (FAQ)",
  description:
    "Odpovědi na nejčastější otázky ohledně přesného soustružení, svařování a kompletace. Tolerance, materiály, formáty výkresů, termíny.",
  alternates: { canonical: "/faq" },
};

const faq = [
  {
    q: "Jaké tolerance zvládáte?",
    a: "U soustružení běžně držíme IT7 – IT9, u přesných dílců s dokončovací operací dosahujeme až IT6. Konkrétní tolerance vždy potvrdíme podle výkresu a použitého materiálu.",
  },
  {
    q: "Vyrábíte i kusové zakázky?",
    a: "Ano — kusová výroba a prototypy tvoří významnou část naší produkce. Nemáme minimální množství, vyrobíme i jeden kus podle výkresu nebo poškozeného originálu.",
  },
  {
    q: "Jaké materiály zpracováváte?",
    a: "Konstrukční ocel, nerez (304, 316), mosaz, hliník i barevné kovy. U speciálních materiálů (titan, žáropevné oceli) se domluvíme podle konkrétního požadavku.",
  },
  {
    q: "Jaké svařovací metody používáte?",
    a: "MIG/MAG (135/138), TIG (141) a obalenou elektrodou (111). Zvládáme svařování oceli, nerezu i hliníku.",
  },
  {
    q: "Máte certifikované svářeče?",
    a: "Ano, všichni aktivní svářeči drží platné osvědčení podle ČSN EN ISO 9606-1 pro konkrétní kombinace metoda / materiál / poloha. Kopie certifikátů dodáme na vyžádání.",
  },
  {
    q: "Jak dlouho trvá výroba typické zakázky?",
    a: "Menší kusovky zpravidla 1 – 2 týdny od potvrzení objednávky, střední série 3 – 5 týdnů. Přesný termín potvrdíme s nabídkou podle aktuální vytíženosti dílny.",
  },
  {
    q: "V jaké formě přijímáte výkresovou dokumentaci?",
    a: "Ideálně PDF nebo DWG/DXF. Přijmeme i papírový výkres — načteme si ho a potvrdíme, že je čitelný. Model 3D (STEP, IGES) uvítáme u složitějších dílců.",
  },
  {
    q: "Zajišťujete i povrchové úpravy?",
    a: "Ano, ve spolupráci s ověřenými partnery zajišťujeme zinkování, lakování, moření, pasivaci a další úpravy. Předáváme dílce úpravci a přebíráme zpět, klient řeší jen nás.",
  },
  {
    q: "Dodáváte do zahraničí?",
    a: "Pravidelně dodáváme do Německa a Rakouska. Komunikace v angličtině nebo němčině, doprava po dohodě.",
  },
  {
    q: "Jak se dostaneme k nabídce?",
    a: "Nejrychlejší je poslat výkres přes formulář na stránce Kontakt nebo e-mailem na info@okfinal.cz. Odpovídáme do 24 hodin s cenou a termínem.",
  },
];

export default function FaqPage() {
  return (
    <>
      <PageHero
        eyebrow="Časté dotazy"
        title="Otázky, které nám kladete nejčastěji"
        lead="Praktické odpovědi z každodenní práce. Nenašli jste svou otázku? Napište nám."
      />
      <Section tight>
        <dl className="divide-y divide-steel-200 border-y border-steel-200">
          {faq.map((item) => (
            <div key={item.q} className="grid gap-4 py-6 md:grid-cols-[1fr_2fr]">
              <dt className="text-lg font-bold text-steel-950">{item.q}</dt>
              <dd className="text-steel-700">{item.a}</dd>
            </div>
          ))}
        </dl>
      </Section>
      <JsonLd data={faqJsonLd(faq)} />
    </>
  );
}
