import { convexClient } from "@/lib/convex";
import { api } from "../../../../../convex/_generated/api";
import { JobsManager, type Job } from "./JobsManager";

// DEBUG: dočasně vracíme i konkrétní chybu, ať vidíme, co přesně padá.
let lastError = "";

async function loadJobs(): Promise<Job[] | null> {
  lastError = "";
  const cvx = convexClient();
  if (!cvx) {
    lastError = `convexClient() je null — NEXT_PUBLIC_CONVEX_URL za runtime = ${JSON.stringify(process.env.NEXT_PUBLIC_CONVEX_URL)}`;
    return null;
  }
  try {
    return (await cvx.query(api.jobs.listAll, {})) as Job[];
  } catch (e) {
    lastError = `${(e as Error)?.name ?? "Error"}: ${(e as Error)?.message ?? String(e)} · URL=${JSON.stringify(process.env.NEXT_PUBLIC_CONVEX_URL)}`;
    return null;
  }
}

export default async function KarieraAdminPage() {
  const jobs = await loadJobs();

  if (!jobs) {
    return (
      <div>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-steel-950">Kariéra</h1>
            <p className="mt-2 text-steel-600">Správa otevřených pozic.</p>
          </div>
          <button
            disabled
            className="btn btn-dark disabled:cursor-not-allowed disabled:opacity-60"
          >
            Přidat pozici
          </button>
        </div>

        {lastError ? (
          <div className="mt-6 rounded-lg border border-red-300 bg-red-50 p-4 text-left font-mono text-xs text-red-800">
            <strong>DEBUG:</strong> {lastError}
          </div>
        ) : null}

        <div className="mt-8 rounded-lg border border-dashed border-steel-300 bg-white p-10 text-center">
          <h2 className="text-lg font-semibold text-steel-950">
            Convex zatím není napojený
          </h2>
          <p className="mx-auto mt-2 max-w-md text-sm text-steel-600">
            Nastavte{" "}
            <code className="rounded bg-steel-50 px-1.5 py-0.5 text-xs">
              NEXT_PUBLIC_CONVEX_URL
            </code>{" "}
            a spusťte{" "}
            <code className="rounded bg-steel-50 px-1.5 py-0.5 text-xs">
              npx convex dev
            </code>
            . Pak zde půjde spravovat pozice (tabulka{" "}
            <code className="rounded bg-steel-50 px-1.5 py-0.5 text-xs">jobs</code>
            ) a veřejná stránka{" "}
            <code className="rounded bg-steel-50 px-1.5 py-0.5 text-xs">/kariera</code>{" "}
            je začne zobrazovat.
          </p>
        </div>
      </div>
    );
  }

  return <JobsManager jobs={jobs} />;
}
