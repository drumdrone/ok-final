"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { enNav, nav, site } from "@/lib/site";

export function Footer() {
  const pathname = usePathname() || "/";
  const isEn = pathname === "/en" || pathname.startsWith("/en/");
  const items = isEn ? enNav : nav;
  const year = new Date().getFullYear();
  const phoneHref = "tel:" + site.contacts.phone.replace(/\s/g, "");

  const t = isEn
    ? {
        tagline: "Precision turning and welding of metals.",
        contact: "Contact",
        sitemap: "Sitemap",
        home: "/en",
      }
    : {
        tagline: `${site.tagline}.`,
        contact: "Kontakt",
        sitemap: "Mapa webu",
        home: "/",
      };

  return (
    <footer className="okf-footer bg-[#141619] pt-20 text-zinc-400">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 pb-16 lg:grid-cols-12 lg:px-8">
        <div className="lg:col-span-5">
          <Link href={t.home} className="flex items-center" aria-label={site.name}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={site.assets.logoOnDark}
              alt={site.shortName}
              width={218}
              height={38}
              className="h-8 w-auto"
            />
          </Link>
          <p className="mt-5 max-w-xs text-sm leading-relaxed">{t.tagline}</p>
        </div>

        <div className="lg:col-span-3">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white">
            {t.contact}
          </p>
          <address className="mt-5 space-y-2 text-sm not-italic">
            <p>{site.address.street}</p>
            <p>
              {site.address.zip} {site.address.city}
            </p>
            <p className="pt-3">
              <a href={phoneHref} className="transition hover:text-white">
                {site.contacts.phone}
              </a>
            </p>
            <p>
              <a
                href={`mailto:${site.contacts.email}`}
                className="transition hover:text-white"
              >
                {site.contacts.email}
              </a>
            </p>
          </address>
        </div>

        <div className="lg:col-span-4">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white">
            {t.sitemap}
          </p>
          <ul className="mt-5 grid grid-cols-2 gap-y-2 text-sm">
            {items.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="transition hover:text-white">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-5 py-6 text-xs sm:flex-row sm:items-center sm:justify-between lg:px-8">
          <p>
            © {year} {site.name} · IČ {site.company.ico} · DIČ {site.company.dic}
          </p>
          <Link href="/admin" className="transition hover:text-white">
            Admin
          </Link>
        </div>
      </div>
    </footer>
  );
}
