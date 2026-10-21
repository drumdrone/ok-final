"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function HeaderCta() {
  const pathname = usePathname() || "/";
  const isEn = pathname === "/en" || pathname.startsWith("/en/");

  if (isEn) {
    return (
      <Link href="/en#contact" className="btn btn-primary hidden lg:inline-flex">
        Request a quote
      </Link>
    );
  }

  return (
    <Link href="/kontakt" className="btn btn-primary hidden lg:inline-flex">
      Poptávka
    </Link>
  );
}
