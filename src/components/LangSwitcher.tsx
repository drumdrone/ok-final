"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

// Mirror map CZ → EN slugs.
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

export function LangSwitcher() {
  const pathname = usePathname() || "/";
  const isEn = pathname === "/en" || pathname.startsWith("/en/");

  const czHref = isEn ? EN_TO_CZ[pathname] || "/" : "/";
  const enHref = isEn ? "/en" : CZ_TO_EN[pathname] || "/en";

  return (
    <div
      className="inline-flex items-center overflow-hidden rounded-md border border-steel-200 text-xs font-semibold"
      aria-label="Jazyk / Language"
    >
      <Link
        href={czHref}
        aria-current={isEn ? undefined : "page"}
        className={
          "px-2.5 py-1.5 transition-colors " +
          (isEn
            ? "text-steel-500 hover:bg-steel-50 hover:text-steel-900"
            : "bg-steel-900 text-white")
        }
      >
        CZ
      </Link>
      <Link
        href={enHref}
        aria-current={isEn ? "page" : undefined}
        className={
          "px-2.5 py-1.5 transition-colors " +
          (isEn
            ? "bg-steel-900 text-white"
            : "text-steel-500 hover:bg-steel-50 hover:text-steel-900")
        }
      >
        EN
      </Link>
    </div>
  );
}
