import Link from "next/link";
import { nav, site } from "@/lib/site";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-steel-100 bg-white/90 backdrop-blur">
      <div className="container flex h-16 items-center justify-between gap-8">
        <Link href="/" className="flex items-center gap-2" aria-label={site.name}>
          <span className="flex h-9 w-9 items-center justify-center rounded bg-steel-900 font-display text-sm font-bold text-accent-500">
            OK
          </span>
          <span className="font-display text-base font-bold tracking-tight text-steel-950">
            OK FINAL
            <span className="ml-1 font-normal text-steel-400">s.r.o.</span>
          </span>
        </Link>
        <nav className="hidden items-center gap-1 lg:flex" aria-label="Hlavní">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-md px-3 py-2 text-sm font-medium text-steel-700 transition-colors hover:bg-steel-50 hover:text-steel-950"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <Link
          href="/kontakt"
          className="btn btn-primary hidden md:inline-flex"
        >
          Poptávka
        </Link>
      </div>
      <MobileNav />
    </header>
  );
}

function MobileNav() {
  return (
    <div className="border-t border-steel-100 lg:hidden">
      <div className="container flex gap-1 overflow-x-auto py-2" aria-label="Hlavní (mobil)">
        {nav.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="whitespace-nowrap rounded-md px-3 py-1.5 text-sm font-medium text-steel-700 hover:bg-steel-50"
          >
            {item.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
