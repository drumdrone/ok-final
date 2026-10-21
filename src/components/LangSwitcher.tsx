"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function LangSwitcher() {
  const pathname = usePathname() || "/";
  const isEn = pathname === "/en" || pathname.startsWith("/en/");
  const czHref = "/";
  const enHref = "/en";

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
