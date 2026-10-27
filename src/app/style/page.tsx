import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Style — design kit",
  robots: { index: false, follow: false },
};

/**
 * /style — showcase prvků z OK FINAL Shuffle designu, adaptovaných na
 * náš font (Manrope / font-display) a červený akcent. Slouží k výběru,
 * co použít na homepage. Není indexováno.
 */

function Label({ children }: { children: React.ReactNode }) {
  return (
    <div className="sticky top-0 z-10 border-y border-steel-200 bg-[#f3f2ef]/90 px-5 py-2 font-mono text-[11px] uppercase tracking-[0.2em] text-steel-500 backdrop-blur">
      {children}
    </div>
  );
}

export default function StylePage() {
  return (
    <div className="bg-[#f3f2ef] text-zinc-900">
      <div className="border-b border-steel-200 px-5 py-8">
        <div className="mx-auto max-w-7xl">
          <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent-600">
            Design kit · /style
          </div>
          <h1 className="font-display mt-2 text-3xl font-bold">
            Prvky k výběru pro homepage
          </h1>
          <p className="mt-2 max-w-2xl text-steel-600">
            Ze Shuffle designu, přebarveno na náš akcent a font Manrope. Projdi,
            řekni co použít — pak to nasadím na reálnou homepage.
          </p>
        </div>
      </div>

      {/* ── HERO (dark band) ────────────────────────────── */}
      <Label>01 · Hero — tmavý pás s foto kartou</Label>
      <section className="relative overflow-hidden bg-[#141619] pb-20 pt-14 text-white lg:pb-28 lg:pt-20">
        <div className="okf-grid pointer-events-none absolute inset-0" />
        <div className="pointer-events-none absolute -left-40 top-1/3 h-96 w-96 rounded-full bg-accent-700/20 blur-3xl" />
        <div className="relative mx-auto grid max-w-7xl gap-14 px-5 lg:grid-cols-12 lg:gap-10 lg:px-8">
          <div className="flex flex-col justify-center lg:col-span-6">
            <div className="inline-flex w-fit items-center gap-2.5 rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 text-xs text-zinc-300">
              <span className="relative flex h-2 w-2">
                <span className="okf-pulse absolute inset-0 rounded-full bg-emerald-400" />
                <span className="relative h-2 w-2 rounded-full bg-emerald-400" />
              </span>
              <span>Otevřeni pro nové zakázky</span>
            </div>
            <h2 className="font-display mt-8 text-5xl font-semibold leading-[1.02] tracking-tight sm:text-6xl xl:text-7xl">
              <span className="block">Dobře promyšlené.</span>
              <span className="block text-zinc-500">Precizně</span>
              <span className="block">
                dokončené<span className="text-accent-500">.</span>
              </span>
            </h2>
            <div className="mt-8 max-w-md space-y-3 text-base leading-relaxed text-zinc-400">
              <p className="text-zinc-200">
                Vyrábíme dílce v tolerancích podle výrobní dokumentace v krátkém
                časovém období.
              </p>
              <p>
                Každý projekt si zaslouží jasný plán, pečlivé provedení a výsledek,
                který obstojí v čase.
              </p>
            </div>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <a
                href="#"
                className="group inline-flex items-center gap-3 rounded-full bg-white py-2 pl-5 pr-2 text-sm font-semibold text-zinc-900 transition duration-200 hover:bg-zinc-200 active:scale-[0.97]"
              >
                <span>Objevte, co děláme</span>
                <svg
                  className="h-8 w-8 rounded-full bg-zinc-900 p-2 text-white transition-transform duration-300 group-hover:rotate-45"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  aria-hidden="true"
                >
                  <path d="M7 17 17 7M9 7h8v8" />
                </svg>
              </a>
              <a
                href="tel:+420603534364"
                className="text-sm text-zinc-400 underline decoration-white/20 underline-offset-4 transition hover:text-white"
              >
                +420 603 534 364
              </a>
            </div>
            <dl className="mt-14 w-fit border-t border-white/10 pt-8">
              <div>
                <dt className="text-[11px] uppercase tracking-[0.2em] text-zinc-500">
                  Let praxe
                </dt>
                <dd className="font-display mt-2 text-3xl font-semibold sm:text-4xl">
                  35
                </dd>
              </div>
            </dl>
          </div>
          <div className="lg:col-span-6">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[28px] border border-white/10 shadow-2xl shadow-black/60 lg:aspect-auto lg:h-full lg:min-h-[620px]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/foto-svarovani.png"
                alt="Ruční svařování v dílně"
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#141619] via-[#141619]/20 to-transparent" />
              <div className="absolute left-5 top-5 rounded-full border border-white/15 bg-black/30 px-3 py-1 font-mono text-[11px] tracking-widest text-zinc-200 backdrop-blur-md">
                TOL ±0,01 MM
              </div>
              <div className="absolute inset-x-5 bottom-5 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <div className="rounded-2xl border border-white/15 bg-white/10 p-5 backdrop-blur-xl">
                  <p className="text-[10px] uppercase tracking-[0.2em] text-zinc-300">
                    Výkonný ředitel – jednatel
                  </p>
                  <p className="font-display mt-2 text-lg font-semibold">
                    Ing. Jiří Divíšek
                  </p>
                  <a
                    href="tel:+420603534364"
                    className="mt-1 block text-sm text-zinc-300 transition hover:text-white"
                  >
                    +420 603 534 364
                  </a>
                </div>
                <p className="max-w-[14rem] text-sm leading-relaxed text-zinc-300">
                  Soustružení, svařování a montáž pod jednou střechou v Žamberku.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SLUŽBY (světlý pás, číslované karty) ───────────── */}
      <Label>02 · Služby — číslované karty 01/02/03</Label>
      <section className="relative px-5 py-20 lg:py-28">
        <div className="okf-grid-light pointer-events-none absolute inset-0" />
        <div className="relative mx-auto max-w-7xl">
          <div className="max-w-2xl">
            <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent-600">
              Naše služby
            </div>
            <h2 className="font-display mt-3 text-4xl font-semibold tracking-tight">
              Soustružení, ruční svařování a montážní práce
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-steel-600">
              Naši pracovníci jsou profesionálové, kteří dokážou vyřešit složité
              technické problémy — od malých živnostníků po nadnárodní společnosti.
            </p>
          </div>
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {/* 01 soustružení — charcoal */}
            <article className="group flex flex-col justify-between rounded-3xl bg-zinc-900 p-7 text-white transition hover:-translate-y-1">
              <div>
                <div className="font-mono text-xs tracking-widest text-zinc-500">
                  01 / SOUSTRUŽENÍ
                </div>
                <h3 className="font-display mt-4 text-2xl font-semibold">
                  Soustružení v tolerancích
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-zinc-400">
                  Rotační dílce přesně podle výrobní dokumentace — od prototypu po
                  sériovou výrobu s kontrolou rozměrů.
                </p>
              </div>
              <div className="mt-6 flex flex-wrap gap-2">
                {["Kusová výroba", "Série", "Ocel, nerez, hliník"].map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-zinc-300"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </article>
            {/* 02 svařování — red */}
            <article className="group flex flex-col justify-between rounded-3xl bg-accent-600 p-7 text-white transition hover:-translate-y-1">
              <div>
                <div className="font-mono text-xs tracking-widest text-red-100">
                  02 / SVAŘOVÁNÍ
                </div>
                <h3 className="font-display mt-4 text-2xl font-semibold">
                  Ruční svařování
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-red-100/90">
                  Svarky a konstrukce s čistými spoji, které drží tvar i pod zátěží.
                  Každý svar prochází vizuální kontrolou.
                </p>
              </div>
              <div className="mt-6 flex flex-wrap gap-2">
                {["CO2 · TIG", "Vizuální kontrola"].map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs text-white"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </article>
            {/* 03 montáž — tmavší */}
            <article className="group flex flex-col justify-between rounded-3xl bg-[#1b1d21] p-7 text-white transition hover:-translate-y-1">
              <div>
                <div className="font-mono text-xs tracking-widest text-zinc-500">
                  03 / MONTÁŽ
                </div>
                <h3 className="font-display mt-4 text-2xl font-semibold">
                  Montážní práce
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-zinc-400">
                  Kompletace podsestav a finální montáž — hotový celek připravený
                  k použití.
                </p>
              </div>
              <div className="mt-6 flex flex-wrap gap-2">
                {["Výroba dle dokumentace", "Krátké lhůty"].map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-zinc-300"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* ── SEGMENTY zákazníků ─────────────────────────────── */}
      <Label>03 · Segmenty zákazníků</Label>
      <section className="px-5 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent-600">
            Kdo jsou naši zákazníci
          </div>
          <h2 className="font-display mt-3 max-w-2xl text-4xl font-semibold tracking-tight">
            Živnostníci a české firmy, zahraniční firmy
          </h2>
          <div className="mt-10 grid gap-5 md:grid-cols-2">
            <div className="rounded-3xl bg-zinc-900 p-8 text-white">
              <h3 className="font-display text-2xl font-semibold">
                Živnostníci a české firmy
              </h3>
              <p className="mt-3 text-zinc-400">Od malých živnostníků.</p>
            </div>
            <div className="relative overflow-hidden rounded-3xl bg-zinc-900 p-8 text-white">
              <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-accent-600/30 blur-2xl" />
              <h3 className="font-display relative text-2xl font-semibold">
                Zahraniční firmy
              </h3>
              <p className="relative mt-3 text-zinc-400">
                Až k požadavkům nadnárodních společností.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA pás ─────────────────────────────────────────── */}
      <Label>04 · CTA pás</Label>
      <section className="px-5 py-16">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-[32px] bg-[#141619] p-10 text-white lg:p-16">
          <div className="relative flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-center">
            <div className="okf-grid pointer-events-none absolute inset-0" />
            <div className="relative">
              <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
                Sjednejte si schůzku s námi ještě dnes
              </h2>
              <p className="mt-3 max-w-xl text-zinc-400">
                Pošlete nám nezávaznou poptávku a my vám dílce bezplatně naceníme.
              </p>
            </div>
            <div className="relative flex flex-wrap items-center gap-4">
              <a
                href="#"
                className="inline-flex items-center gap-3 rounded-full bg-accent-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-accent-700"
              >
                Kontaktovat
              </a>
              <a
                href="tel:+420603534364"
                className="text-sm text-zinc-400 underline decoration-white/20 underline-offset-4 hover:text-white"
              >
                nebo volejte +420 603 534 364
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── Tlačítka / prvky ───────────────────────────────── */}
      <Label>05 · Tlačítka a drobné prvky</Label>
      <section className="px-5 py-16">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-5">
          <a
            href="#"
            className="group inline-flex items-center gap-3 rounded-full bg-zinc-900 py-2 pl-5 pr-2 text-sm font-semibold text-white"
          >
            <span>White orb arrow</span>
            <svg
              className="h-8 w-8 rounded-full bg-white p-2 text-zinc-900 transition-transform duration-300 group-hover:rotate-45"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <path d="M7 17 17 7M9 7h8v8" />
            </svg>
          </a>
          <a
            href="#"
            className="inline-flex items-center rounded-full bg-accent-600 px-6 py-3 text-sm font-semibold text-white hover:bg-accent-700"
          >
            Červené plné
          </a>
          <span className="inline-flex items-center gap-2 rounded-full border border-steel-300 bg-white px-4 py-2 text-xs text-steel-600">
            <span className="h-2 w-2 rounded-full bg-accent-500" /> Status pill
          </span>
          <span className="rounded-full border border-steel-300 bg-white px-3 py-1 font-mono text-[11px] tracking-widest text-steel-600">
            TOL ±0,01 MM
          </span>
        </div>
      </section>
    </div>
  );
}
