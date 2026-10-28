"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { enNav, nav, site } from "@/lib/site";

// Mirror map CZ → EN slugs (shared with LangSwitcher logic).
const CZ_TO_EN: Record<string, string> = {
  "/": "/en",
  "/o-firme": "/en/about",
  "/nase-sluzby": "/en/services",
  "/certifikaty": "/en/certificates",
  "/kariera": "/en/careers",
  "/faq": "/en/faq",
  "/kontakt": "/en/contact",
};
const EN_TO_CZ: Record<string, string> = Object.fromEntries(
  Object.entries(CZ_TO_EN).map(([cs, en]) => [en, cs])
);

function Logo({ href }: { href: string }) {
  return (
    <Link href={href} className="flex items-center" aria-label={site.name}>
      <Image
        src={site.assets.logoOnDark}
        alt={site.shortName}
        width={962}
        height={140}
        sizes="220px"
        quality={90}
        priority
        className="h-8 w-auto"
      />
    </Link>
  );
}

function ArrowGlyph() {
  return (
    <svg
      className="h-6 w-6 rounded-full bg-white/15 p-1.5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      aria-hidden="true"
    >
      <path d="M7 17 17 7M9 7h8v8" />
    </svg>
  );
}

export function Header() {
  const pathname = usePathname() || "/";
  const isEn = pathname === "/en" || pathname.startsWith("/en/");
  const items = isEn ? enNav : nav;
  const [open, setOpen] = useState(false);

  const homeHref = isEn ? "/en" : "/";
  const contactHref = isEn ? "/en/contact" : "/kontakt";
  const ctaLabel = isEn ? "Request a quote" : "Domluvit spolupráci";
  const czHref = isEn ? EN_TO_CZ[pathname] || "/" : pathname;
  const enHref = isEn ? pathname : CZ_TO_EN[pathname] || "/en";
  const menuLabel = isEn ? "Open menu" : "Otevřít menu";

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <header className="okf-header sticky top-0 z-50 border-b border-white/10 bg-[#141619]/90 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-5 py-4 lg:px-8">
        <Logo href={homeHref} />

        <nav
          className="hidden items-center gap-7 text-sm text-zinc-300 lg:flex"
          aria-label={isEn ? "Main" : "Hlavní"}
        >
          {items.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={
                  "transition-colors duration-200 hover:text-white " +
                  (active ? "text-white" : "")
                }
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <div
            className="hidden items-center rounded-full border border-white/15 p-0.5 text-xs font-medium sm:flex"
            aria-label="Jazyk / Language"
          >
            <Link
              href={czHref}
              aria-current={isEn ? undefined : "page"}
              className={
                "rounded-full px-2.5 py-1 transition-colors " +
                (isEn
                  ? "text-zinc-400 hover:text-white"
                  : "bg-white text-zinc-900")
              }
            >
              CZ
            </Link>
            <Link
              href={enHref}
              aria-current={isEn ? "page" : undefined}
              className={
                "rounded-full px-2.5 py-1 transition-colors " +
                (isEn
                  ? "bg-white text-zinc-900"
                  : "text-zinc-400 hover:text-white")
              }
            >
              EN
            </Link>
          </div>

          <Link
            href={contactHref}
            className="hidden items-center gap-2 rounded-full bg-red-600 py-2 pl-4 pr-2 text-sm font-medium text-white shadow-lg shadow-red-900/30 transition duration-200 hover:bg-red-500 active:scale-[0.97] md:inline-flex"
          >
            <span>{ctaLabel}</span>
            <ArrowGlyph />
          </Link>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="okf-mobile-menu"
            aria-label={menuLabel}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white transition active:scale-95 lg:hidden"
          >
            <span className="flex w-5 flex-col gap-1.5" aria-hidden="true">
              <span
                className={
                  "h-0.5 w-full bg-current transition " +
                  (open ? "translate-y-2 rotate-45" : "")
                }
              />
              <span
                className={
                  "h-0.5 w-full bg-current transition " + (open ? "opacity-0" : "")
                }
              />
              <span
                className={
                  "h-0.5 w-full bg-current transition " +
                  (open ? "-translate-y-2 -rotate-45" : "")
                }
              />
            </span>
          </button>
        </div>
      </div>

      {open && (
        <div
          id="okf-mobile-menu"
          className="border-t border-white/10 bg-[#141619]/95 px-5 pb-6 pt-2 backdrop-blur-xl lg:hidden"
        >
          <ul className="flex flex-col text-base text-zinc-200">
            {items.map((item, i) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  aria-current={pathname === item.href ? "page" : undefined}
                  className={
                    "block py-3 " +
                    (i < items.length - 1 ? "border-b border-white/5 " : "") +
                    (pathname === item.href ? "text-white" : "")
                  }
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <div
            className="mt-4 grid grid-cols-2 gap-2"
            aria-label="Jazyk / Language"
          >
            <Link
              href={czHref}
              onClick={() => setOpen(false)}
              aria-current={isEn ? undefined : "page"}
              className={
                "rounded-full py-2.5 text-center text-sm font-medium transition " +
                (isEn
                  ? "border border-white/15 text-zinc-300 hover:text-white"
                  : "bg-white text-zinc-900")
              }
            >
              CZ
            </Link>
            <Link
              href={enHref}
              onClick={() => setOpen(false)}
              aria-current={isEn ? "page" : undefined}
              className={
                "rounded-full py-2.5 text-center text-sm font-medium transition " +
                (isEn
                  ? "bg-white text-zinc-900"
                  : "border border-white/15 text-zinc-300 hover:text-white")
              }
            >
              EN
            </Link>
          </div>
          <Link
            href={contactHref}
            onClick={() => setOpen(false)}
            className="mt-4 flex justify-center rounded-full bg-red-600 py-3 text-sm font-medium text-white transition hover:bg-red-500"
          >
            {ctaLabel}
          </Link>
        </div>
      )}
    </header>
  );
}
