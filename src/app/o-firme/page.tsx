import type { Metadata } from "next";
import Link from "next/link";
import { PageHero, Section } from "@/components/Section";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "O firmě",
  description:
    "OK FINAL s.r.o. — rodinná strojírenská dílna z Žamberku. 33 let přesného soustružení, svařování a kompletace kovů.",
  alternates: { canonical: "/o-firme" },
};

const milestones = [
  { year: "1992", text: "Založení firmy — první soustružnická dílna v Žamberku." },
  { year: "2001", text: "Rozšíření o svařovnu a certifikaci svářečů." },
  { year: "2010", text: "Instalace prvního CNC soustruhu, zvýšení kapacity." },
  { year: "2018", text: "Rozšíření provozu, spolupráce se zahraničními klienty." },
  { year: "2026", text: "Přes 33 let nepřetržité výroby a 500+ zakázek ročně." },
];

export default function OFirmePage() {
  return (
    <>
      <PageHero
        eyebrow="O firmě"
        title="Rodinná dílna s třemi desetiletími praxe"
        lead="Přesné soustružení, svařování a kompletace kovových dílců. OK FINAL s.r.o. sídlí v Žamberku a od roku 1992 dodává zákazníkům po celé České republice i do zahraničí."
      />

      <Section tight>
        <div className="space-y-6 text-lg leading-relaxed text-steel-700">
          <p>
            OK FINAL s.r.o. byla založena v roce {site.company.founded} jako
            malá soustružnická dílna. Za tři desetiletí jsme vyrostli
            v spolehlivého dodavatele přesných kovových dílců pro tuzemské
            i zahraniční strojírenské firmy — a přesto jsme si zachovali osobní
            přístup, jaký velké závody nedokáží nabídnout.
          </p>
          <p>
            Naše silná stránka je flexibilita. Vyrábíme kusově i sériově — od
            jednoho prototypu po několik stovek shodných dílů. Zpracováváme
            konstrukční ocel, nerez, mosaz, hliník i barevné kovy. Držíme
            tolerance IT6 – IT9 a všechny svařovací práce provádí certifikovaní
            svářeči podle ČSN EN ISO 9606-1.
          </p>
          <p>
            Věříme, že strojařině se dá rozumět jen v dialogu — proto s vámi
            komunikuje přímo technolog, ne obchodník. Přijmeme výkres v PDF,
            DWG i papírově, poradíme s materiálem a technologií a do 24 hodin
            odešleme nabídku.
          </p>
        </div>
      </Section>

      <Section className="bg-steel-50">
        <h2 className="mb-10 text-3xl font-bold sm:text-4xl">
          Milníky, kterými jsme prošli
        </h2>
        <ol className="relative space-y-8 border-l-2 border-steel-200 pl-6">
          {milestones.map((m) => (
            <li key={m.year} className="relative">
              <span className="absolute -left-[33px] top-1 flex h-5 w-5 items-center justify-center rounded-full bg-accent-500 ring-4 ring-steel-50" />
              <div className="text-sm font-semibold uppercase tracking-widest text-accent-600">
                {m.year}
              </div>
              <div className="mt-1 text-lg text-steel-800">{m.text}</div>
            </li>
          ))}
        </ol>
      </Section>

      <Section tight>
        <div className="rounded-lg border border-steel-200 bg-white p-8 text-center">
          <h2 className="text-2xl font-bold">Chcete vidět, co umíme?</h2>
          <p className="mx-auto mt-3 max-w-xl text-steel-600">
            Přijeďte se podívat na provoz nebo nám pošlete výkres. Nezávazně
            probereme, jak dílec vyrobit.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link href="/kontakt" className="btn btn-primary">
              Nezávazná poptávka
            </Link>
            <Link href="/nase-sluzby" className="btn btn-ghost">
              Naše služby
            </Link>
          </div>
        </div>
      </Section>
    </>
  );
}
