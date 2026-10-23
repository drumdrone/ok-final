import Image from "next/image";
import Link from "next/link";
import { HomeMotion } from "@/components/HomeMotion";
import { JsonLd } from "@/components/JsonLd";
import { localBusinessJsonLd } from "@/lib/schema";
import { enContent, services, site } from "@/lib/site";

const home = enContent.home;

const marqueeItems = [
  "Manufactured to drawing",
  "Short lead times",
  "Output inspection",
  "5-year warranty",
] as const;

export default function EnHomePage() {
  const director = site.contacts.contactPerson;

  return (
    <>
      <HomeMotion />

      {/* 01 — Hero */}
      <section className="relative overflow-hidden bg-[#141619] pb-20 pt-14 text-white lg:pb-28 lg:pt-20">
        <div className="okf-grid pointer-events-none absolute inset-0" />
        <div className="pointer-events-none absolute -left-40 top-1/3 h-96 w-96 rounded-full bg-red-700/20 blur-3xl" />
        <div className="relative mx-auto grid max-w-7xl gap-14 px-5 lg:grid-cols-12 lg:gap-10 lg:px-8">
          <div className="flex flex-col justify-center lg:col-span-6">
            <div className="okf-reveal inline-flex w-fit items-center gap-2.5 rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 text-xs text-zinc-300">
              <span className="relative flex h-2 w-2">
                <span className="okf-pulse absolute inset-0 rounded-full bg-red-500" />
                <span className="relative h-2 w-2 rounded-full bg-red-500" />
              </span>
              <span>{home.hero.badge}</span>
            </div>
            <h1 className="okf-reveal mt-8 font-display text-5xl font-semibold leading-[1.02] tracking-tight sm:text-6xl xl:text-7xl">
              <span className="block">Well planned.</span>
              <span className="block text-zinc-500">Precisely</span>
              <span className="block">
                finished<span className="text-red-500">.</span>
              </span>
            </h1>
            <div className="okf-reveal mt-8 max-w-md space-y-3 text-base leading-relaxed text-zinc-400">
              <p className="text-zinc-200">{home.hero.detail}</p>
              <p>
                Every project deserves a clear plan, careful execution and a
                result that lasts.
              </p>
            </div>
            <div className="okf-reveal mt-10 flex flex-wrap items-center gap-4">
              <Link
                href="#services"
                className="group inline-flex items-center gap-3 rounded-full bg-white py-2 pl-5 pr-2 text-sm font-semibold text-zinc-900 transition duration-200 hover:bg-zinc-200 active:scale-[0.97]"
              >
                <span>Discover what we do</span>
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
              </Link>
              <a
                href={`tel:${site.contacts.phone.replace(/\s/g, "")}`}
                className="text-sm text-zinc-400 underline decoration-white/20 underline-offset-4 transition hover:text-white"
              >
                {site.contacts.phone}
              </a>
            </div>
            <dl className="okf-reveal mt-14 grid max-w-lg grid-cols-3 border-t border-white/10 pt-8">
              <div>
                <dt className="text-[11px] uppercase tracking-[0.2em] text-zinc-500">
                  Projects
                </dt>
                <dd className="mt-2 font-display text-3xl font-semibold sm:text-4xl">
                  <span className="okf-count" data-count={340} data-suffix="+">
                    340+
                  </span>
                </dd>
              </div>
              <div className="border-l border-white/10 pl-5">
                <dt className="text-[11px] uppercase tracking-[0.2em] text-zinc-500">
                  Years
                </dt>
                <dd className="mt-2 font-display text-3xl font-semibold sm:text-4xl">
                  <span className="okf-count" data-count={35} data-suffix="">
                    35
                  </span>
                </dd>
              </div>
              <div className="border-l border-white/10 pl-5">
                <dt className="text-[11px] uppercase tracking-[0.2em] text-zinc-500">
                  Warranty
                </dt>
                <dd className="mt-2 font-display text-3xl font-semibold sm:text-4xl">
                  <span className="okf-count" data-count={5} data-suffix=" years">
                    5 years
                  </span>
                </dd>
              </div>
            </dl>
          </div>
          <div className="lg:col-span-6 [perspective:1400px]">
            <div className="okf-tilt relative aspect-[4/5] overflow-hidden rounded-[28px] border border-white/10 shadow-2xl shadow-black/60 lg:aspect-auto lg:h-full lg:min-h-[620px]">
              <Image
                src={site.assets.hero}
                alt={home.hero.machineAlt}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 46vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#141619] via-[#141619]/20 to-transparent" />
              <div className="okf-tilt-glare pointer-events-none absolute inset-0" />
              <div className="absolute left-5 top-5 rounded-full border border-white/15 bg-black/30 px-3 py-1 font-mono text-[11px] tracking-widest text-zinc-200 backdrop-blur-md">
                TOL ±0.01 MM
              </div>
              <div className="absolute inset-x-5 bottom-5 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <div className="rounded-2xl border border-white/15 bg-white/10 p-5 backdrop-blur-xl">
                  <p className="text-[10px] uppercase tracking-[0.2em] text-zinc-300">
                    {home.hero.contactLabel}
                  </p>
                  <p className="mt-2 font-display text-lg font-semibold">
                    {director.name}
                  </p>
                  <a
                    href={`tel:${director.phone.replace(/\s/g, "")}`}
                    className="mt-1 block text-sm text-zinc-300 transition hover:text-white"
                  >
                    {director.phone}
                  </a>
                </div>
                <p className="max-w-[14rem] text-sm leading-relaxed text-zinc-300">
                  Turning, welding and assembly under one roof in Žamberk.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 02 — Services */}
      <section
        id="services"
        className="relative overflow-hidden bg-[#f3f2ef] py-24 lg:py-32"
      >
        <div className="okf-grid-light pointer-events-none absolute inset-x-0 top-0 h-96" />
        <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
            <div className="okf-reveal lg:col-span-7">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-red-600">
                {home.services.eyebrow}
              </p>
              <h2 className="mt-4 font-display text-4xl font-semibold leading-tight tracking-tight text-zinc-900 sm:text-5xl">
                {home.services.title}
              </h2>
            </div>
            <p className="okf-reveal text-base leading-relaxed text-zinc-600 lg:col-span-5">
              {home.services.lead}
            </p>
          </div>

          <div className="mt-16 grid gap-5 lg:grid-cols-12">
            <Link
              href="/en/services#turning"
              className="okf-reveal group relative min-h-[440px] overflow-hidden rounded-[28px] bg-zinc-900 text-white shadow-xl shadow-zinc-900/20 lg:col-span-7 lg:row-span-2"
            >
              <Image
                src={site.assets.machine}
                alt="Turning on Swiss-type CNC lathes"
                fill
                sizes="(max-width: 1024px) 100vw, 58vw"
                className="object-cover opacity-70 transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent" />
              <div className="relative flex h-full flex-col justify-between p-8 lg:p-10">
                <span className="font-mono text-xs tracking-widest text-zinc-300">
                  01 / TURNING
                </span>
                <div>
                  <h3 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
                    Turning to tolerances
                  </h3>
                  <p className="mt-4 max-w-md leading-relaxed text-zinc-300">
                    Rotary parts exactly to drawing — from prototype to repeat
                    series production with dimensional inspection.
                  </p>
                  <ul className="mt-6 flex flex-wrap gap-2 text-xs text-zinc-200">
                    <li className="rounded-full border border-white/20 bg-white/5 px-3 py-1 backdrop-blur">
                      One-off
                    </li>
                    <li className="rounded-full border border-white/20 bg-white/5 px-3 py-1 backdrop-blur">
                      Series
                    </li>
                    <li className="rounded-full border border-white/20 bg-white/5 px-3 py-1 backdrop-blur">
                      Steel, stainless, aluminium
                    </li>
                  </ul>
                </div>
              </div>
            </Link>

            <Link
              href="/en/services#welding"
              className="okf-reveal group relative overflow-hidden rounded-[28px] border border-zinc-200 bg-white p-8 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-zinc-900/10 lg:col-span-5"
            >
              <div className="flex items-start justify-between">
                <span className="font-mono text-xs tracking-widest text-zinc-400">
                  02 / WELDING
                </span>
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-600 text-white shadow-lg shadow-red-600/30">
                  <svg
                    className="h-6 w-6"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    aria-hidden="true"
                  >
                    <path d="M13 2 4 14h7l-1 8 9-12h-7l1-8Z" />
                  </svg>
                </span>
              </div>
              <h3 className="mt-10 font-display text-2xl font-semibold tracking-tight text-zinc-900">
                Manual welding
              </h3>
              <p className="mt-3 leading-relaxed text-zinc-600">
                Weldments and structures with clean joints that hold their shape
                under load. Every weld passes a visual inspection.
              </p>
            </Link>

            <Link
              href="/en/services#assembly"
              className="okf-reveal group relative overflow-hidden rounded-[28px] bg-[#1b1d21] p-8 text-white shadow-lg shadow-zinc-900/20 transition duration-300 hover:-translate-y-1 lg:col-span-5"
            >
              <div className="flex items-start justify-between">
                <span className="font-mono text-xs tracking-widest text-zinc-500">
                  03 / ASSEMBLY
                </span>
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/15 bg-white/5">
                  <svg
                    className="h-6 w-6"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    aria-hidden="true"
                  >
                    <path d="M14.7 6.3a4 4 0 0 0-5.4 5.4L3 18l3 3 6.3-6.3a4 4 0 0 0 5.4-5.4l-2.5 2.5-2.4-.6-.6-2.4 2.5-2.5Z" />
                  </svg>
                </span>
              </div>
              <h3 className="mt-10 font-display text-2xl font-semibold tracking-tight">
                Assembly work
              </h3>
              <p className="mt-3 leading-relaxed text-zinc-400">
                Sub-assembly completion and final assembly, so you receive a
                finished unit ready to use.
              </p>
            </Link>
          </div>

          <div className="mt-16 overflow-hidden border-y border-zinc-300/70 py-5">
            <div className="okf-marquee flex w-max gap-12 whitespace-nowrap font-display text-xl font-medium text-zinc-400">
              {[...marqueeItems, ...marqueeItems].map((item, i) => (
                <span key={i} className="flex items-center gap-12">
                  <span>{item}</span>
                  <span className="text-red-600">/</span>
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 03 — Experience / technology */}
      <section className="relative overflow-hidden bg-[#141619] py-24 text-white lg:py-32">
        <div className="absolute inset-0 overflow-hidden">
          <Image
            src={site.assets.workshop}
            alt=""
            fill
            sizes="100vw"
            className="okf-zoom object-cover opacity-25"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#141619] via-[#141619]/85 to-[#141619]/60" />
        </div>
        <div className="relative mx-auto grid max-w-7xl gap-12 px-5 lg:grid-cols-12 lg:items-center lg:px-8">
          <div className="okf-reveal lg:col-span-5">
            <p className="font-display text-[8rem] font-bold leading-none tracking-tighter sm:text-[11rem]">
              <span className="okf-count text-red-500" data-count={35} data-suffix="">
                35
              </span>
            </p>
            <p className="mt-2 text-lg text-zinc-400">{home.experience.yearsLabel}</p>
            <p className="okf-outline mt-6 hidden font-display text-6xl font-bold tracking-tight lg:block">
              1991 — 2026
            </p>
          </div>
          <div className="okf-reveal lg:col-span-6 lg:col-start-7">
            <h2 className="font-display text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
              {home.experience.title}
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-zinc-300">
              {home.experience.body}
            </p>
            <div className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10">
              <div className="bg-[#141619]/80 p-5 backdrop-blur">
                <p className="font-display text-2xl font-semibold">Precision</p>
                <p className="mt-1 text-sm text-zinc-400">
                  Parts within the required tolerances
                </p>
              </div>
              <div className="bg-[#141619]/80 p-5 backdrop-blur">
                <p className="font-display text-2xl font-semibold">Repeatability</p>
                <p className="mt-1 text-sm text-zinc-400">
                  The same quality in every series
                </p>
              </div>
            </div>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                href={home.experience.ctaPrimary.href}
                className="group inline-flex items-center gap-3 rounded-full bg-white py-2 pl-5 pr-2 text-sm font-semibold text-zinc-900 transition duration-200 hover:bg-zinc-200 active:scale-[0.97]"
              >
                <span>{home.experience.ctaPrimary.label}</span>
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
              </Link>
              <Link
                href={home.experience.ctaSecondary.href}
                className="inline-flex items-center rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white transition duration-200 hover:border-white/50 hover:bg-white/5 active:scale-[0.97]"
              >
                {home.experience.ctaSecondary.label}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 04 — Customers / segments */}
      <section className="bg-[#f3f2ef] py-24 lg:py-32">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 lg:grid-cols-12 lg:px-8">
          <div className="okf-reveal lg:col-span-5">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-red-600">
              {home.segments.eyebrow}
            </p>
            <h2 className="mt-4 font-display text-4xl font-semibold leading-tight tracking-tight text-zinc-900 sm:text-5xl">
              {home.segments.title}
            </h2>
            <div className="relative mt-10 overflow-hidden rounded-[24px]">
              <Image
                src={services[0].image}
                alt="Turned parts and tooling in the metal workshop"
                width={1000}
                height={750}
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="aspect-[4/3] w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/60 to-transparent" />
            </div>
          </div>
          <div className="flex flex-col justify-end lg:col-span-6 lg:col-start-7">
            <blockquote className="okf-reveal border-l-2 border-red-600 pl-6">
              <p className="font-display text-2xl font-medium leading-snug tracking-tight text-zinc-800 sm:text-3xl">
                Quality goes without saying — in our line of business quality
                comes first and there is simply no excuse for shipping defective
                parts.
              </p>
            </blockquote>
            <p className="okf-reveal mt-8 leading-relaxed text-zinc-600">
              Our customers choose us primarily for competitive prices and fast
              delivery.
            </p>
            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              <div className="okf-reveal rounded-[24px] border border-zinc-200 bg-white p-7 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-zinc-900/10">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-zinc-900 text-white">
                  <svg
                    className="h-6 w-6"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    aria-hidden="true"
                  >
                    <path d="M3 21h18M5 21V9l7-5 7 5v12M9 21v-6h6v6" />
                  </svg>
                </span>
                <h3 className="mt-8 font-display text-xl font-semibold text-zinc-900">
                  {home.segments.items[0].title}
                </h3>
                <p className="mt-2 text-sm text-zinc-600">
                  {home.segments.items[0].body}
                </p>
              </div>
              <div className="okf-reveal rounded-[24px] bg-zinc-900 p-7 text-white shadow-lg shadow-zinc-900/20 transition duration-300 hover:-translate-y-1 sm:mt-10">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-600 text-white">
                  <svg
                    className="h-6 w-6"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    aria-hidden="true"
                  >
                    <circle cx={12} cy={12} r={9} />
                    <path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" />
                  </svg>
                </span>
                <h3 className="mt-8 font-display text-xl font-semibold">
                  {home.segments.items[1].title}
                </h3>
                <p className="mt-2 text-sm text-zinc-400">
                  {home.segments.items[1].body}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 05 — CTA */}
      <section id="contact" className="bg-[#f3f2ef] px-5 pb-24 lg:px-8 lg:pb-32">
        <div className="okf-reveal relative mx-auto max-w-7xl overflow-hidden rounded-[32px] bg-gradient-to-br from-red-600 via-red-700 to-red-800 px-7 py-14 text-white shadow-2xl shadow-red-900/30 sm:px-12 lg:py-20">
          <div className="okf-grid pointer-events-none absolute inset-0 opacity-60" />
          <div className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-white/10 blur-3xl" />
          <div className="relative grid gap-10 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-8">
              <h2 className="font-display text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
                {home.cta.title}
              </h2>
              <p className="mt-5 max-w-2xl text-lg leading-relaxed text-red-100">
                {home.cta.lead}
              </p>
            </div>
            <div className="flex flex-col gap-3 lg:col-span-4 lg:items-end">
              <Link
                href={home.cta.button.href}
                className="group inline-flex w-fit items-center gap-3 rounded-full bg-white py-2 pl-6 pr-2 text-sm font-semibold text-zinc-900 shadow-lg shadow-red-950/30 transition duration-200 hover:bg-zinc-100 active:scale-[0.97]"
              >
                <span>{home.cta.button.label}</span>
                <svg
                  className="h-9 w-9 rounded-full bg-red-600 p-2.5 text-white transition-transform duration-300 group-hover:rotate-45"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  aria-hidden="true"
                >
                  <path d="M7 17 17 7M9 7h8v8" />
                </svg>
              </Link>
              <a
                href={`tel:${site.contacts.phone.replace(/\s/g, "")}`}
                className="text-sm text-red-100 transition hover:text-white"
              >
                or call {site.contacts.phone}
              </a>
            </div>
          </div>
        </div>
      </section>

      <JsonLd data={localBusinessJsonLd} />
    </>
  );
}
