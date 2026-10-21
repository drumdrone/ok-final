"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function HeaderCta() {
  const pathname = usePathname() || "/";
  const isEn = pathname === "/en" || pathname.startsWith("/en/");
  const href = isEn ? "/en/contact" : "/kontakt";
  const label = isEn ? "Request a quote" : "Poptávka";

  return (
    <Link href={href} className="btn btn-primary hidden lg:inline-flex">
      {label}
    </Link>
  );
}
