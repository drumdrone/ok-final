import { convexClient } from "@/lib/convex";

type Row = {
  _id: string;
  _creationTime: number;
  name?: string;
  company?: string;
  email?: string;
  phone?: string;
  message: string;
  status: "new" | "read" | "archived";
  createdAt: number;
};

async function loadInquiries(): Promise<Row[] | null> {
  const cvx = convexClient();
  if (!cvx) return null;
  try {
    const { api } = await import("../../../../../convex/_generated/api");
    return await cvx.query(api.inquiries.list, {});
  } catch {
    return null;
  }
}

const statusLabels: Record<Row["status"], string> = {
  new: "Nová",
  read: "Přečtená",
  archived: "Archiv",
};

const statusStyle: Record<Row["status"], string> = {
  new: "bg-accent-500/10 text-accent-700 border-accent-500/30",
  read: "bg-steel-100 text-steel-700 border-steel-300",
  archived: "bg-steel-50 text-steel-500 border-steel-200",
};

export default async function PoptavkyPage() {
  const rows = await loadInquiries();

  if (!rows) {
    return (
      <div>
        <h1 className="text-2xl font-bold text-steel-950">Poptávky</h1>
        <div className="mt-8 rounded-lg border border-dashed border-steel-300 bg-white p-10 text-center">
          <h2 className="text-lg font-semibold text-steel-950">
            Convex zatím není napojený
          </h2>
          <p className="mx-auto mt-2 max-w-md text-sm text-steel-600">
            Nastavte <code className="rounded bg-steel-50 px-1.5 py-0.5 text-xs">NEXT_PUBLIC_CONVEX_URL</code>{" "}
            a spusťte <code className="rounded bg-steel-50 px-1.5 py-0.5 text-xs">npx convex dev</code>.
            Pak se sem začnou objevovat odeslané poptávky.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-baseline justify-between">
        <h1 className="text-2xl font-bold text-steel-950">Poptávky</h1>
        <div className="text-sm text-steel-500">{rows.length} celkem</div>
      </div>

      {rows.length === 0 ? (
        <div className="mt-8 rounded-lg border border-dashed border-steel-300 bg-white p-10 text-center">
          <p className="text-steel-600">Zatím žádná poptávka nebyla odeslána.</p>
        </div>
      ) : (
        <ul className="mt-6 space-y-3">
          {rows.map((r) => (
            <li key={r._id} className="rounded-lg border border-steel-200 bg-white p-5">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <div className="font-semibold text-steel-950">
                    {r.name ?? "(bez jména)"}
                    {r.company ? <span className="ml-2 text-steel-500">· {r.company}</span> : null}
                  </div>
                  <div className="mt-1 space-x-3 text-sm text-steel-600">
                    {r.email ? <a href={`mailto:${r.email}`} className="hover:text-accent-600">{r.email}</a> : null}
                    {r.phone ? <a href={`tel:${r.phone}`} className="hover:text-accent-600">{r.phone}</a> : null}
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`rounded-full border px-2.5 py-0.5 text-xs font-medium ${statusStyle[r.status]}`}>
                    {statusLabels[r.status]}
                  </span>
                  <span className="text-xs text-steel-500 tabular-nums">
                    {new Date(r.createdAt).toLocaleString("cs-CZ")}
                  </span>
                </div>
              </div>
              <p className="mt-3 whitespace-pre-wrap text-sm text-steel-700">{r.message}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
