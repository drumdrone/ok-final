import { convexClient } from "@/lib/convex";
import { site } from "@/lib/site";
import { ContactsManager, type Contact } from "./ContactsManager";
import { seedContacts } from "./actions";

async function loadContacts(): Promise<Contact[] | null> {
  const cvx = convexClient();
  if (!cvx) return null;
  try {
    const { api } = await import("../../../../../convex/_generated/api");
    return (await cvx.query(api.contacts.list, { locale: "cs" })) as Contact[];
  } catch {
    return null;
  }
}

export default async function KontaktyAdminPage() {
  const contacts = await loadContacts();

  // Convex napojený → plná správa kontaktních osob.
  if (contacts) {
    return (
      <div>
        {contacts.length === 0 ? (
          <div className="mb-6 flex flex-wrap items-center justify-between gap-4 rounded-lg border border-steel-200 bg-white p-4">
            <p className="text-sm text-steel-600">
              Tabulka <code className="rounded bg-steel-100 px-2 py-1 text-xs">contacts</code>{" "}
              je prázdná. Můžete ji naplnit lidmi ze stávajícího{" "}
              <code className="rounded bg-steel-100 px-2 py-1 text-xs">site.ts</code>.
            </p>
            <form action={seedContacts}>
              <button className="btn btn-dark">Načíst ze site.ts</button>
            </form>
          </div>
        ) : null}
        <ContactsManager contacts={contacts} />
      </div>
    );
  }

  // Fallback bez Convexu — statická data ze site.ts (jen pro čtení).
  const rows = [
    { key: "Adresa", value: `${site.address.street}, ${site.address.zip} ${site.address.city}` },
    { key: "Telefon", value: site.contacts.phone },
    { key: "E-mail (obecný)", value: site.contacts.email },
    { key: "E-mail (kariéra)", value: site.contacts.career },
    { key: "Kontaktní osoba", value: `${site.contacts.contactPerson.name} · ${site.contacts.contactPerson.role}` },
    { key: "Osobní e-mail", value: site.contacts.contactPerson.email },
    { key: "Osobní telefon", value: site.contacts.contactPerson.phone },
    { key: "IČ", value: site.company.ico },
    { key: "DIČ", value: site.company.dic },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-steel-950">Kontakty</h1>
      <p className="mt-2 text-steel-600">
        Convex zatím není napojený — zobrazujeme hodnoty z{" "}
        <code className="rounded bg-steel-100 px-2 py-1 text-xs">src/lib/site.ts</code>{" "}
        (jen ke čtení). Po spuštění{" "}
        <code className="rounded bg-steel-100 px-2 py-1 text-xs">npx convex dev</code>{" "}
        půjde kontaktní osoby editovat rovnou zde.
      </p>

      <div className="mt-8 overflow-hidden rounded-lg border border-steel-200 bg-white">
        <table className="w-full text-sm">
          <thead className="bg-steel-50 text-left text-xs uppercase tracking-wider text-steel-500">
            <tr>
              <th className="px-4 py-4">Klíč</th>
              <th className="px-4 py-4">Hodnota</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-steel-100">
            {rows.map((r) => (
              <tr key={r.key}>
                <td className="w-52 px-4 py-4 font-medium text-steel-700">{r.key}</td>
                <td className="px-4 py-4 text-steel-900">{r.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
