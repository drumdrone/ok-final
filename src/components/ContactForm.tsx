"use client";

import { useState } from "react";
import { ArrowButton } from "./ArrowButton";

type State = "idle" | "sending" | "ok" | "err";

const ACCEPT = ".pdf,.dwg,.dxf,.step,.stp,.iges,.igs,image/*";
const MAX_MB = 20;

export function ContactForm() {
  const [state, setState] = useState<State>("idle");
  const [error, setError] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);

    const form = e.currentTarget;
    const data = new FormData(form);

    const email = String(data.get("email") ?? "").trim();
    const phone = String(data.get("phone") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();
    const gdpr = data.get("gdpr");
    const file = data.get("file") as File | null;

    if (!email && !phone) {
      setError("Vyplňte prosím alespoň e-mail nebo telefon, ať máme jak reagovat.");
      return;
    }
    if (message.length < 20) {
      setError("Napište nám prosím pár vět (alespoň 20 znaků), abychom rozuměli poptávce.");
      return;
    }
    if (!gdpr) {
      setError("Bez souhlasu se zpracováním osobních údajů poptávku bohužel neodešleme.");
      return;
    }
    if (file && file.size > MAX_MB * 1024 * 1024) {
      setError(`Soubor je moc velký (limit ${MAX_MB} MB). Pošlete výkres přímo na e-mail.`);
      return;
    }

    setState("sending");
    try {
      const res = await fetch("/api/contact", { method: "POST", body: data });
      if (!res.ok) throw new Error(await res.text().catch(() => "Server error"));
      setState("ok");
      form.reset();
      setFileName(null);
    } catch (err) {
      setState("err");
      setError(
        err instanceof Error
          ? err.message
          : "Nepodařilo se odeslat. Zkuste to prosím znovu, nebo napište přímo na info@okfinal.cz."
      );
    }
  }

  if (state === "ok") {
    return (
      <div className="rounded-lg border border-accent-500/40 bg-accent-500/5 p-8 text-center">
        <h3 className="text-xl font-bold text-steel-950">Poptávka odeslána</h3>
        <p className="mt-3 text-steel-700">
          Dílce vám bezplatně naceníme. Potvrzení jsme poslali i na váš e-mail.
        </p>
        <button
          type="button"
          onClick={() => setState("idle")}
          className="btn btn-ghost mt-6"
        >
          Odeslat další
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Jméno" name="name" placeholder="Jan Novák" required />
        <Field label="Firma" name="company" placeholder="Nepovinné" />
        <Field label="E-mail" name="email" type="email" placeholder="jan@firma.cz" />
        <Field label="Telefon" name="phone" type="tel" placeholder="+420 …" />
      </div>

      <div>
        <label className="field-label" htmlFor="message">
          Popis poptávky <span className="text-accent-600">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          className="field-input"
          placeholder="Materiál, tolerance, množství, termín, případně další požadavky."
        />
      </div>

      <div>
        <label className="field-label" htmlFor="file">
          Výkres (PDF, DWG, DXF, STEP · do {MAX_MB} MB)
        </label>
        <input
          id="file"
          name="file"
          type="file"
          accept={ACCEPT}
          onChange={(e) => setFileName(e.currentTarget.files?.[0]?.name ?? null)}
          className="block w-full text-sm text-steel-700 file:mr-4 file:rounded-md file:border-0 file:bg-steel-900 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white hover:file:bg-steel-800"
        />
        {fileName ? (
          <p className="mt-2 text-xs text-steel-500">Přiloženo: {fileName}</p>
        ) : null}
      </div>

      <label className="flex items-start gap-3 text-sm text-steel-700">
        <input
          type="checkbox"
          name="gdpr"
          required
          className="mt-0.5 h-4 w-4 rounded border-steel-300 text-accent-500 focus:ring-accent-500"
        />
        <span>
          Souhlasím se zpracováním osobních údajů za účelem vyřízení poptávky.{" "}
          <span className="text-accent-600">*</span>
        </span>
      </label>

      {error ? (
        <div
          role="alert"
          className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
        >
          {error}
        </div>
      ) : null}

      <div className="flex flex-wrap items-center gap-4">
        <ArrowButton
          type="submit"
          variant="light"
          disabled={state === "sending"}
        >
          {state === "sending" ? "Odesílám…" : "Odeslat poptávku"}
        </ArrowButton>
        <span className="text-xs text-steel-500">
          Dílce vám bezplatně naceníme.
        </span>
      </div>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  placeholder,
  required = false,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="field-label" htmlFor={name}>
        {label}
        {required ? <span className="text-accent-600"> *</span> : null}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        className="field-input"
        autoComplete={autoCompleteFor(name)}
      />
    </div>
  );
}

function autoCompleteFor(name: string) {
  switch (name) {
    case "name": return "name";
    case "company": return "organization";
    case "email": return "email";
    case "phone": return "tel";
    default: return undefined;
  }
}
