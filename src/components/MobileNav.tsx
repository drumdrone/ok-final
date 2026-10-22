"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowButton } from "./ArrowButton";
import { enNav, nav } from "@/lib/site";

export function MobileNav() {
  const pathname = usePathname() || "/";
  const isEn = pathname === "/en" || pathname.startsWith("/en/");
  const items = isEn ? enNav : nav;
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const closeLabel = isEn ? "Close menu" : "Zavřít menu";
  const openLabel = isEn ? "Open menu" : "Otevřít menu";

  return (
    <>
      <button
        type="button"
        className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-steel-200 text-steel-900 lg:hidden"
        aria-expanded={open}
        aria-controls="mobile-menu"
        aria-label={open ? closeLabel : openLabel}
        onClick={() => setOpen((value) => !value)}
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

      {open && (
        <>
          <button
            type="button"
            className="fixed inset-x-0 bottom-0 top-16 z-30 bg-steel-950/40 lg:hidden"
            aria-label={closeLabel}
            onClick={() => setOpen(false)}
          />
          <nav
            id="mobile-menu"
            className="absolute inset-x-0 top-full z-40 border-b border-steel-100 bg-white shadow-lg lg:hidden"
            aria-label={isEn ? "Main" : "Hlavní"}
          >
            <div className="container flex flex-col gap-1 py-3">
              {items.map((item) => {
                const active = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    onClick={() => setOpen(false)}
                    className={
                      "rounded-md px-3 py-3 text-base font-medium transition-colors " +
                      (active
                        ? "bg-steel-50 text-steel-950"
                        : "text-steel-700 hover:bg-steel-50 hover:text-steel-950")
                    }
                  >
                    {item.label}
                  </Link>
                );
              })}
              <ArrowButton
                href={isEn ? "/en/contact" : "/kontakt"}
                variant="light"
                className="mt-2"
                onClick={() => setOpen(false)}
              >
                {isEn ? "Request a quote" : "Domluvit spolupráci"}
              </ArrowButton>
            </div>
          </nav>
        </>
      )}
    </>
  );
}
