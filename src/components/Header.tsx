import Link from "next/link";
import { nav, site } from "@/lib/site";
import { LangSwitcher } from "./LangSwitcher";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-steel-100 bg-white/90 backdrop-blur">
      <div className="container flex h-16 items-center justify-between gap-6">
        <Link href="/" className="flex items-center gap-2" aria-label={site.name}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={site.assets.logo}
            alt={site.shortName}
            width={160}
            height={28}
            className="h-8 w-auto"
          />
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
        <div className="flex items-center gap-3">
          <LangSwitcher />
          <Link
            href="/kontakt"
            className="btn btn-primary hidden lg:inline-flex"
          >
            Poptávka
          </Link>
        </div>
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
