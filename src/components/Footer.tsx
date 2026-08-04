import Link from "next/link";
import { nav, site } from "@/lib/site";

export function Footer() {
  const year = new Date().getFullYear();
  const phoneHref = "tel:" + site.contacts.phone.replace(/\s/g, "");
  return (
    <footer className="border-t border-steel-800 bg-steel-950 text-steel-200">
      <div className="container grid gap-10 py-14 md:grid-cols-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded bg-accent-500 font-display text-sm font-bold text-white">
              OK
            </span>
            <span className="font-display text-lg font-bold tracking-tight text-white">
              {site.name}
            </span>
          </div>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-steel-300">
            {site.tagline}. Kusová i sériová výroba pro tuzemské i zahraniční klienty.
          </p>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-widest text-white">
            Kontakt
          </h3>
          <address className="mt-4 space-y-2 text-sm not-italic text-steel-300">
            <div>{site.address.street}</div>
            <div>{site.address.zip} {site.address.city}</div>
            <div className="pt-2">
              <a href={phoneHref} className="hover:text-white">
                {site.contacts.phone}
              </a>
            </div>
            <div>
              <a href={`mailto:${site.contacts.email}`} className="hover:text-white">
                {site.contacts.email}
              </a>
            </div>
          </address>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-widest text-white">
            Mapa webu
          </h3>
          <ul className="mt-4 grid grid-cols-2 gap-y-2 text-sm">
            {nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-steel-300 hover:text-white">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-steel-800">
        <div className="container flex flex-col items-center justify-between gap-2 py-6 text-xs text-steel-400 md:flex-row">
          <div>
            © {year} {site.name} · IČ {site.company.ico} · DIČ {site.company.dic}
          </div>
          <div>
            <Link href="/admin" className="hover:text-steel-200">Admin</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
