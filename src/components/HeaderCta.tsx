"use client";

import { usePathname } from "next/navigation";
import { ArrowButton } from "./ArrowButton";

export function HeaderCta() {
  const pathname = usePathname() || "/";
  const isEn = pathname === "/en" || pathname.startsWith("/en/");
  const href = isEn ? "/en/contact" : "/kontakt";
  const label = isEn ? "Request a quote" : "Poptávka";

  return (
    <ArrowButton href={href} variant="small" className="hidden lg:inline-flex">
      {label}
    </ArrowButton>
  );
}
