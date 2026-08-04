import { site } from "@/lib/site";

export default function KontaktyAdminPage() {
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
        Aktuálně zobrazujeme hodnoty z <code className="rounded bg-steel-100 px-1.5 py-0.5 text-xs">src/lib/site.ts</code>.
        Po připojení Convexu (tabulka <code className="rounded bg-steel-100 px-1.5 py-0.5 text-xs">contacts</code>) půjde
        editovat rovnou zde.
      </p>

      <div className="mt-8 overflow-hidden rounded-lg border border-steel-200 bg-white">
        <table className="w-full text-sm">
          <thead className="bg-steel-50 text-left text-xs uppercase tracking-wider text-steel-500">
            <tr>
              <th className="px-4 py-3">Klíč</th>
              <th className="px-4 py-3">Hodnota</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-steel-100">
            {rows.map((r) => (
              <tr key={r.key}>
                <td className="w-52 px-4 py-3 font-medium text-steel-700">{r.key}</td>
                <td className="px-4 py-3 text-steel-900">{r.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
