import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { isAuthenticated } from "@/lib/auth";

export const metadata: Metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
};

const adminNav = [
  { href: "/admin", label: "Přehled" },
  { href: "/admin/poptavky", label: "Poptávky" },
  { href: "/admin/kariera", label: "Kariéra" },
  { href: "/admin/kontakty", label: "Kontakty" },
];

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const authed = await isAuthenticated();
  if (!authed) redirect("/admin/login");

  return (
    <div className="min-h-screen bg-steel-50">
      <header className="border-b border-steel-200 bg-white">
        <div className="container flex h-14 items-center justify-between">
          <div className="flex items-center gap-6">
            <Link href="/admin" className="font-display font-bold text-steel-950">
              OK FINAL · Admin
            </Link>
            <nav className="flex gap-1">
              {adminNav.map((n) => (
                <Link
                  key={n.href}
                  href={n.href}
                  className="rounded-md px-3 py-1.5 text-sm text-steel-700 hover:bg-steel-50 hover:text-steel-950"
                >
                  {n.label}
                </Link>
              ))}
            </nav>
          </div>
          <form action="/api/admin/logout" method="post">
            <button className="text-sm text-steel-500 hover:text-steel-900">
              Odhlásit
            </button>
          </form>
        </div>
      </header>
      <div className="container py-10">{children}</div>
    </div>
  );
}
