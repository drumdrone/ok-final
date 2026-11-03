"use client";

import { useActionState, useEffect, useState } from "react";
import { useFormStatus } from "react-dom";
import {
  deleteContact,
  saveContact,
  type ContactFormState,
} from "./actions";

export type Contact = {
  _id: string;
  key: string;
  name?: string;
  role?: string;
  phone?: string;
  email?: string;
  address?: string;
  order: number;
  locale: "cs" | "en";
};

const initialState: ContactFormState = { status: "idle" };

export function ContactsManager({ contacts }: { contacts: Contact[] }) {
  const [adding, setAdding] = useState(false);

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-steel-950">Kontaktní osoby</h1>
          <p className="mt-2 text-steel-600">
            Tým zobrazený na stránce <code className="rounded bg-steel-100 px-1.5 py-0.5 text-xs">/kontakt</code>.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setAdding((v) => !v)}
          className="btn btn-dark"
        >
          {adding ? "Zrušit" : "Přidat osobu"}
        </button>
      </div>

      {adding ? (
        <div className="mt-6">
          <ContactForm
            nextOrder={contacts.length}
            onDone={() => setAdding(false)}
            submitLabel="Přidat osobu"
          />
        </div>
      ) : null}

      <div className="mt-8 space-y-3">
        {contacts.length === 0 ? (
          <div className="rounded-lg border border-dashed border-steel-300 bg-white p-10 text-center">
            <p className="text-steel-600">
              Zatím žádná osoba. Přidejte první přes „Přidat osobu".
            </p>
          </div>
        ) : (
          contacts.map((c) => <ContactRow key={c._id} contact={c} />)
        )}
      </div>
    </div>
  );
}

function ContactRow({ contact }: { contact: Contact }) {
  const [editing, setEditing] = useState(false);

  return (
    <div className="rounded-lg border border-steel-200 bg-white p-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-semibold text-steel-950">
              {contact.name ?? contact.key}
            </span>
            <span className="text-xs text-steel-400">pořadí {contact.order}</span>
          </div>
          {contact.role ? (
            <div className="mt-0.5 text-sm text-steel-600">{contact.role}</div>
          ) : null}
          <div className="mt-1 space-x-3 text-sm text-steel-500">
            {contact.email ? <span>{contact.email}</span> : null}
            {contact.phone ? <span>{contact.phone}</span> : null}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setEditing((v) => !v)}
            className="rounded-md border border-steel-300 px-3 py-1.5 text-sm text-steel-700 hover:bg-steel-50"
          >
            {editing ? "Zavřít" : "Upravit"}
          </button>
          <form action={deleteContact}>
            <input type="hidden" name="id" value={contact._id} />
            <DeleteButton name={contact.name ?? contact.key} />
          </form>
        </div>
      </div>

      {editing ? (
        <div className="mt-5 border-t border-steel-100 pt-5">
          <ContactForm
            contact={contact}
            onDone={() => setEditing(false)}
            submitLabel="Uložit změny"
          />
        </div>
      ) : null}
    </div>
  );
}

function ContactForm({
  contact,
  nextOrder,
  onDone,
  submitLabel,
}: {
  contact?: Contact;
  nextOrder?: number;
  onDone: () => void;
  submitLabel: string;
}) {
  const [state, formAction] = useActionState(saveContact, initialState);

  useEffect(() => {
    if (state.status === "ok") onDone();
  }, [state.status, onDone]);

  return (
    <form action={formAction} className="space-y-4">
      {contact ? <input type="hidden" name="id" value={contact._id} /> : null}
      {contact ? <input type="hidden" name="key" value={contact.key} /> : null}

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Jméno *">
          <input
            name="name"
            required
            defaultValue={contact?.name ?? ""}
            className="field-input"
          />
        </Field>
        <Field label="Role / pozice">
          <input
            name="role"
            defaultValue={contact?.role ?? ""}
            placeholder="Mistr výroby"
            className="field-input"
          />
        </Field>
        <Field label="E-mail">
          <input
            name="email"
            type="email"
            defaultValue={contact?.email ?? ""}
            className="field-input"
          />
        </Field>
        <Field label="Telefon">
          <input
            name="phone"
            defaultValue={contact?.phone ?? ""}
            className="field-input"
          />
        </Field>
      </div>

      <div className="grid items-end gap-4 sm:grid-cols-2">
        <Field label="Pořadí">
          <input
            name="order"
            type="number"
            defaultValue={contact?.order ?? nextOrder ?? 0}
            className="field-input"
          />
        </Field>
        <Field label="Jazyk">
          <select
            name="locale"
            defaultValue={contact?.locale ?? "cs"}
            className="field-input"
          >
            <option value="cs">Čeština</option>
            <option value="en">Angličtina</option>
          </select>
        </Field>
      </div>

      {state.status === "error" ? (
        <div className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
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

function DeleteButton({ name }: { name: string }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      onClick={(e) => {
        if (!confirm(`Smazat kontakt „${name}"?`)) e.preventDefault();
      }}
      className="rounded-md border border-red-200 px-3 py-1.5 text-sm text-red-600 hover:bg-red-50 disabled:opacity-60"
    >
      {pending ? "Mažu…" : "Smazat"}
    </button>
  );
}
