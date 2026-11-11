"use client";

import { useActionState, useEffect, useState } from "react";
import { useFormStatus } from "react-dom";
import { deleteJob, saveJob, type JobFormState } from "./actions";

export type Job = {
  _id: string;
  slug: string;
  title: string;
  location: string;
  type: string;
  summary: string;
  body: string;
  active: boolean;
  order: number;
  locale: "cs" | "en";
};

const initialState: JobFormState = { status: "idle" };

export function JobsManager({ jobs }: { jobs: Job[] }) {
  const [adding, setAdding] = useState(false);

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-steel-950">Kariéra</h1>
          <p className="mt-2 text-steel-600">Správa otevřených pozic.</p>
        </div>
        <button
          type="button"
          onClick={() => setAdding((v) => !v)}
          className="btn btn-dark"
        >
          {adding ? "Zrušit" : "Přidat pozici"}
        </button>
      </div>

      {adding ? (
        <div className="mt-6">
          <JobForm
            nextOrder={jobs.length}
            onDone={() => setAdding(false)}
            submitLabel="Vytvořit pozici"
          />
        </div>
      ) : null}

      <div className="mt-8 space-y-4">
        {jobs.length === 0 ? (
          <div className="rounded-lg border border-dashed border-steel-300 bg-white p-10 text-center">
            <p className="text-steel-600">
              Zatím žádná pozice. Přidejte první přes „Přidat pozici".
            </p>
          </div>
        ) : (
          jobs.map((job) => <JobRow key={job._id} job={job} />)
        )}
      </div>
    </div>
  );
}

function JobRow({ job }: { job: Job }) {
  const [editing, setEditing] = useState(false);

  return (
    <div className="rounded-lg border border-steel-200 bg-white p-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-semibold text-steel-950">{job.title}</span>
            <span
              className={`rounded-full border px-2 py-1 text-xs font-medium ${
                job.active
                  ? "border-accent-500/30 bg-accent-500/10 text-accent-700"
                  : "border-steel-300 bg-steel-50 text-steel-500"
              }`}
            >
              {job.active ? "Aktivní" : "Skrytá"}
            </span>
            <span className="text-xs text-steel-400">
              {job.locale.toUpperCase()} · pořadí {job.order}
            </span>
          </div>
          <div className="mt-1 text-sm text-steel-500">
            {[job.location, job.type].filter(Boolean).join(" · ")}
          </div>
          {job.summary ? (
            <p className="mt-2 max-w-2xl text-sm text-steel-600">{job.summary}</p>
          ) : null}
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setEditing((v) => !v)}
            className="rounded-md border border-steel-300 px-4 py-2 text-sm text-steel-700 hover:bg-steel-50"
          >
            {editing ? "Zavřít" : "Upravit"}
          </button>
          <form action={deleteJob}>
            <input type="hidden" name="id" value={job._id} />
            <DeleteButton title={job.title} />
          </form>
        </div>
      </div>

      {editing ? (
        <div className="mt-6 border-t border-steel-100 pt-6">
          <JobForm
            job={job}
            onDone={() => setEditing(false)}
            submitLabel="Uložit změny"
          />
        </div>
      ) : null}
    </div>
  );
}

function JobForm({
  job,
  nextOrder,
  onDone,
  submitLabel,
}: {
  job?: Job;
  nextOrder?: number;
  onDone: () => void;
  submitLabel: string;
}) {
  const [state, formAction] = useActionState(saveJob, initialState);

  useEffect(() => {
    if (state.status === "ok") onDone();
  }, [state.status, onDone]);

  return (
    <form action={formAction} className="space-y-4">
      {job ? <input type="hidden" name="id" value={job._id} /> : null}

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Název pozice *">
          <input
            name="title"
            required
            defaultValue={job?.title ?? ""}
            className="field-input"
          />
        </Field>
        <Field label="Slug (volitelné — doplní se z názvu)">
          <input
            name="slug"
            defaultValue={job?.slug ?? ""}
            placeholder="napr-cnc-operator"
            className="field-input"
          />
        </Field>
        <Field label="Lokalita">
          <input
            name="location"
            defaultValue={job?.location ?? ""}
            placeholder="Žamberk"
            className="field-input"
          />
        </Field>
        <Field label="Úvazek / typ">
          <input
            name="type"
            defaultValue={job?.type ?? ""}
            placeholder="Plný úvazek"
            className="field-input"
          />
        </Field>
      </div>

      <Field label="Krátký popis (zobrazí se na webu)">
        <textarea
          name="summary"
          rows={2}
          defaultValue={job?.summary ?? ""}
          className="field-input"
        />
      </Field>

      <Field label="Celý text pozice">
        <textarea
          name="body"
          rows={5}
          defaultValue={job?.body ?? ""}
          className="field-input"
        />
      </Field>

      <div className="grid items-end gap-4 sm:grid-cols-3">
        <Field label="Pořadí">
          <input
            name="order"
            type="number"
            defaultValue={job?.order ?? nextOrder ?? 0}
            className="field-input"
          />
        </Field>
        <Field label="Jazyk">
          <select
            name="locale"
            defaultValue={job?.locale ?? "cs"}
            className="field-input"
          >
            <option value="cs">Čeština</option>
            <option value="en">Angličtina</option>
          </select>
        </Field>
        <label className="flex items-center gap-2 pb-2 text-sm text-steel-700">
          <input
            type="checkbox"
            name="active"
            defaultChecked={job?.active ?? true}
            className="h-4 w-4 rounded border-steel-300"
          />
          Aktivní (viditelná na webu)
        </label>
      </div>

      {state.status === "error" ? (
        <div className="rounded-md border border-red-200 bg-red-50 px-4 py-2 text-sm text-red-700">
          {state.message ?? "Něco se nepovedlo."}
        </div>
      ) : null}

      <div className="flex gap-2">
        <SubmitButton label={submitLabel} />
        <button
          type="button"
          onClick={onDone}
          className="rounded-md border border-steel-300 px-4 py-2 text-sm text-steel-700 hover:bg-steel-50"
        >
          Zrušit
        </button>
      </div>
    </form>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="field-label">{label}</span>
      {children}
    </label>
  );
}

function SubmitButton({ label }: { label: string }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="btn btn-dark disabled:cursor-not-allowed disabled:opacity-60"
    >
      {pending ? "Ukládám…" : label}
    </button>
  );
}

function DeleteButton({ title }: { title: string }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      onClick={(e) => {
        if (!confirm(`Smazat pozici „${title}"?`)) e.preventDefault();
      }}
      className="rounded-md border border-red-200 px-4 py-2 text-sm text-red-600 hover:bg-red-50 disabled:opacity-60"
    >
      {pending ? "Mažu…" : "Smazat"}
    </button>
  );
}
