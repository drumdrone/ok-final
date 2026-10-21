import type { Metadata } from "next";
import { ArrowButton } from "@/components/ArrowButton";
import { PageHero, Section } from "@/components/Section";
import { convexClient } from "@/lib/convex";
import { enContent, site } from "@/lib/site";

export const metadata: Metadata = {
  title: enContent.pages.careers.metaTitle,
  description: enContent.pages.careers.metaDescription,
  alternates: { canonical: "/en/careers" },
};

type Job = { title: string; location: string; type: string; body: string };
const fallbackJobs: Job[] = [];

async function loadJobs(): Promise<Job[]> {
  const cvx = convexClient();
  if (!cvx) return fallbackJobs;
  try {
    const { api } = await import("../../../../convex/_generated/api");
    const rows = (await cvx.query(api.jobs.listActive, { locale: "en" })) as Array<{
      title: string;
      location: string;
      type: string;
      summary: string;
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

export default async function EnCareersPage() {
  const t = enContent.pages.careers;
  const jobs = await loadJobs();
  return (
    <>
      <PageHero eyebrow={t.heroEyebrow} title={t.heroTitle} lead={t.heroLead} />

      <Section tight>
        {jobs.length === 0 ? (
          <div className="rounded-lg border border-steel-200 bg-white p-10 text-center">
            <h2 className="text-2xl font-bold">{t.emptyTitle}</h2>
            <p className="mx-auto mt-3 max-w-xl text-steel-600">{t.emptyBody}</p>
            <ArrowButton href="tel:+420465612713" variant="light" className="mt-6">
              {t.emptyCta}
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
                    {t.respond}
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
