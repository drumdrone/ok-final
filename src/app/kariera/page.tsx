import type { Metadata } from "next";
import { ArrowButton } from "@/components/ArrowButton";
import { PageHero, Section } from "@/components/Section";
import { convexClient } from "@/lib/convex";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Kariéra",
  description:
    "Kariéra v OK FINAL s.r.o., ul. Nádražní 608, 564 01 Žamberk. Tel.: +420 603 534 364.",
  alternates: { canonical: "/kariera" },
};

// Fallback, když ještě není Convex.
const fallbackJobs: Array<{
  title: string; location: string; type: string; body: string;
}> = [];

type Job = { title: string; location: string; type: string; body: string };

async function loadJobs(): Promise<Job[]> {
  const cvx = convexClient();
  if (!cvx) return fallbackJobs;
  try {
    const { api } = await import("../../../convex/_generated/api");
    const rows = (await cvx.query(api.jobs.listActive, { locale: "cs" })) as Array<{
      title: string; location: string; type: string; summary: string;
    }>;
    return rows.map((j) => ({
      title: j.title,
      location: j.location,
      type: j.type,
      body: j.summary,
    }));
  } catch {
    return fallbackJobs;
  }
}

export default async function KarieraPage() {
  const jobs = await loadJobs();
  return (
    <>
      <PageHero
        eyebrow="Kariéra"
        title="Kariéra"
        lead="OK FINAL s.r.o., ul. Nádražní 608, 564 01 Žamberk. Tel.: +420 603 534 364."
      />

      <Section tight>
        {jobs.length === 0 ? (
          <div className="rounded-lg border border-steel-200 bg-white p-10 text-center">
            <h2 className="text-2xl font-bold">Adresa a telefony</h2>
            <p className="mx-auto mt-3 max-w-xl text-steel-600">
              OK FINAL s.r.o., ul. Nádražní 608, 564 01 Žamberk. IČ: 46506578,
              DIČ: CZ46506578. Tel.: +420 603 534 364.
            </p>
            <ArrowButton href="tel:+420603534364" variant="light" className="mt-6">
              Zavolat +420 603 534 364
            </ArrowButton>
          </div>
        ) : (
          <ul className="space-y-4">
            {jobs.map((j) => (
              <li
                key={j.title}
                className="rounded-lg border border-steel-200 bg-white p-6"
              >
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-bold">{j.title}</h3>
                    <div className="mt-1 text-sm text-steel-500">
                      {j.location} · {j.type}
                    </div>
                  </div>
                  <ArrowButton
                    href={`mailto:${site.contacts.career}?subject=${encodeURIComponent(j.title)}`}
                    variant="small"
                  >
                    Reagovat
                  </ArrowButton>
                </div>
                <p className="mt-4 text-steel-700">{j.body}</p>
              </li>
            ))}
          </ul>
        )}
      </Section>
    </>
  );
}
