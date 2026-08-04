import type { ReactNode } from "react";

export function Section({
  children,
  className = "",
  tight = false,
  id,
}: {
  children: ReactNode;
  className?: string;
  tight?: boolean;
  id?: string;
}) {
  return (
    <section id={id} className={`section ${className}`}>
      <div className={tight ? "container-tight" : "container"}>{children}</div>
    </section>
  );
}

export function SectionHeader({
  eyebrow,
  title,
  lead,
  align = "left",
}: {
  eyebrow?: string;
  title: string;
  lead?: string;
  align?: "left" | "center";
}) {
  return (
    <div className={`mb-12 ${align === "center" ? "text-center" : ""}`}>
      {eyebrow ? <div className="eyebrow mb-3">{eyebrow}</div> : null}
      <h2 className="text-3xl font-bold sm:text-4xl">{title}</h2>
      {lead ? (
        <p
          className={`mt-4 max-w-2xl text-lg text-steel-600 ${
            align === "center" ? "mx-auto" : ""
          }`}
        >
          {lead}
        </p>
      ) : null}
    </div>
  );
}

export function PageHero({
  eyebrow,
  title,
  lead,
}: {
  eyebrow: string;
  title: string;
  lead?: string;
}) {
  return (
    <section className="border-b border-steel-100 bg-steel-50">
      <div className="container py-16 lg:py-20">
        <div className="eyebrow mb-3">{eyebrow}</div>
        <h1 className="max-w-3xl text-4xl font-bold sm:text-5xl">{title}</h1>
        {lead ? (
          <p className="mt-6 max-w-2xl text-lg text-steel-600">{lead}</p>
        ) : null}
      </div>
    </section>
  );
}
