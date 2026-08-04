import Link from "next/link";

const cards = [
  { href: "/admin/poptavky", title: "Poptávky", body: "Přehled odeslaných poptávek." },
  { href: "/admin/kariera", title: "Kariéra", body: "Správa otevřených pozic." },
  { href: "/admin/kontakty", title: "Kontakty", body: "Telefony, e-maily, otevírací doba." },
];

export default function AdminHome() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-steel-950">Přehled</h1>
      <p className="mt-2 text-steel-600">
        Vyberte, s čím chcete pracovat. Reálná data přijdou, jakmile bude
        napojený Convex.
      </p>
      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {cards.map((c) => (
          <Link
            key={c.href}
            href={c.href}
            className="rounded-lg border border-steel-200 bg-white p-6 transition-shadow hover:shadow-md"
          >
            <h2 className="text-lg font-bold text-steel-950">{c.title}</h2>
            <p className="mt-2 text-sm text-steel-600">{c.body}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
