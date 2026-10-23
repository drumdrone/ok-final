"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { nav, enNav } from "@/lib/site";

export function NavLinks() {
  const pathname = usePathname() || "/";
  const isEn = pathname === "/en" || pathname.startsWith("/en/");
  const items = isEn ? enNav : nav;

  return (
    <nav
      className="hidden items-center gap-1 lg:flex"
      aria-label={isEn ? "Main" : "Hlavní"}
    >
      {items.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className="rounded-md px-3 py-2 text-sm font-medium text-steel-700 transition-colors hover:bg-steel-50 hover:text-steel-950"
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
}
