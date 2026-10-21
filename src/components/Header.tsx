import Link from "next/link";
import { site } from "@/lib/site";
import { LangSwitcher } from "./LangSwitcher";
import { NavLinks } from "./NavLinks";
import { HeaderCta } from "./HeaderCta";

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
        <NavLinks variant="desktop" />
        <div className="flex items-center gap-3">
          <LangSwitcher />
          <HeaderCta />
        </div>
      </div>
      <MobileNav />
    </header>
  );
}

function MobileNav() {
  return (
    <div className="border-t border-steel-100 lg:hidden">
      <NavLinks variant="mobile" />
    </div>
  );
}
