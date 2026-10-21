import Image from "next/image";
import Link from "next/link";

type HeroCopy = {
  badge: string;
  titleBefore: string;
  titleAccent: string;
  lead: string;
  ctaPrimary: { href: string; label: string };
  contactLabel: string;
  machineAlt: string;
};

export function HomeHero({
  hero,
  image,
  contactName,
  contactPhone,
  contactHref,
}: {
  hero: HeroCopy;
  image: string;
  contactName: string;
  contactPhone: string;
  contactHref: string;
}) {
  return (
    <section className="bg-steel-950 text-white lg:min-h-[calc(100vh-4rem)]">
      <div className="grid lg:min-h-[calc(100vh-4rem)] lg:grid-cols-2">
        <div className="flex flex-col justify-center px-6 py-16 sm:px-12 lg:px-16 xl:px-20">
          <p className="inline-flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-steel-300">
            <span className="h-1.5 w-1.5 rounded-full bg-white" aria-hidden="true" />
            {hero.badge}
          </p>
          <h1 className="mt-8 max-w-xl font-display text-4xl font-bold leading-[1.05] tracking-tight text-white sm:text-5xl xl:text-6xl">
            {hero.titleBefore} {hero.titleAccent}
          </h1>
          <p className="mt-6 max-w-md text-base leading-relaxed text-steel-400 sm:text-lg">
            {hero.lead}
          </p>
          <div className="mt-10 flex items-center gap-3">
            <Link
              href={hero.ctaPrimary.href}
              className="rounded-full bg-steel-800 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-steel-700"
            >
              {hero.ctaPrimary.label}
            </Link>
            <Link
              href={hero.ctaPrimary.href}
              aria-label={hero.ctaPrimary.label}
              className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-steel-950 transition-transform hover:translate-x-0.5"
            >
              <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" aria-hidden="true">
                <path
                  d="M5 15L15 5M15 5H7M15 5v8"
                  stroke="currentColor"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
          </div>
        </div>

        <div className="relative min-h-[420px] lg:min-h-0">
          <div className="absolute inset-3 overflow-hidden rounded-[28px] sm:inset-4 lg:inset-5">
            <Image
              src={image}
              alt={hero.machineAlt}
              fill
              priority
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute bottom-4 right-4 max-w-[230px] rounded-2xl bg-black/75 p-4 backdrop-blur-sm">
              <div className="text-[11px] uppercase tracking-wider text-white/60">
                {hero.contactLabel}
              </div>
              <div className="mt-2 font-semibold text-white">{contactName}</div>
              <a href={contactHref} className="mt-1 block text-sm text-white/80 hover:text-white">
                {contactPhone}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
