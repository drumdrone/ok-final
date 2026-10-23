import Link from "next/link";
import { convexClient } from "@/lib/convex";

async function loadCounts() {
  const cvx = convexClient();
  if (!cvx) return null;
  try {
    const { api } = await import("../../../../convex/_generated/api");
    return await cvx.query(api.inquiries.counts, {});
  } catch {
    return null;
  }
}

export default async function AdminHome() {
  const counts = await loadCounts();

  const cards = [
    {
      href: "/admin/poptavky",
      title: "Poptávky",
      body: counts
        ? `${counts.new} nových, ${counts.read + counts.archived} vyřízených.`
        : "Přehled odeslaných poptávek.",
      badge: counts?.new,
    },
    { href: "/admin/kariera", title: "Kariéra", body: "Správa otevřených pozic." },
    { href: "/admin/kontakty", title: "Kontakty", body: "Telefony, e-maily, otevírací doba." },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-steel-950">Přehled</h1>
      <p className="mt-2 text-steel-600">
        {counts
          ? `Poptávky se ukládají do Convexu, e-maily odchází přes Resend.`
          : `Vyberte, s čím chcete pracovat. Reálná data přijdou, jakmile bude napojený Convex.`}
      </p>
      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {cards.map((c) => (
          <Link
            key={c.href}
            href={c.href}
            className="relative rounded-lg border border-steel-200 bg-white p-6 transition-shadow hover:shadow-md"
          >
            <h2 className="text-lg font-bold text-steel-950">{c.title}</h2>
            <p className="mt-2 text-sm text-steel-600">{c.body}</p>
            {c.badge ? (
              <span className="absolute right-4 top-4 rounded-full bg-accent-500 px-2 py-0.5 text-xs font-bold text-white">
                {c.badge}
              </span>
            ) : null}
          </Link>
        ))}
      </div>
    </div>
  );
}
