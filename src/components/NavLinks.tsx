"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { nav, enNav } from "@/lib/site";

type Props = { variant?: "desktop" | "mobile" };

export function NavLinks({ variant = "desktop" }: Props) {
  const pathname = usePathname() || "/";
  const isEn = pathname === "/en" || pathname.startsWith("/en/");
  const items = isEn ? enNav : nav;

  if (variant === "desktop") {
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

  return (
    <div
      className="container flex gap-1 overflow-x-auto py-2"
      aria-label={isEn ? "Main (mobile)" : "Hlavní (mobil)"}
    >
      {items.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className="whitespace-nowrap rounded-md px-3 py-1.5 text-sm font-medium text-steel-700 hover:bg-steel-50"
        >
          {item.label}
        </Link>
      ))}
    </div>
  );
}
