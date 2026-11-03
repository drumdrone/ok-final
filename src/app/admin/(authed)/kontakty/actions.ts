"use server";

import { revalidatePath } from "next/cache";
import { isAuthenticated } from "@/lib/auth";
import { convexClient } from "@/lib/convex";
import { site } from "@/lib/site";

export type ContactFormState = {
  status: "idle" | "ok" | "error";
  message?: string;
};

async function convexApi() {
  const { api } = await import("../../../../../convex/_generated/api");
  return api;
}

function revalidateContacts() {
  revalidatePath("/admin/kontakty");
  revalidatePath("/kontakt");
}

/** Prázdné stringy vynecháme — pole jsou v Convexu optional. */
function optional(formData: FormData, name: string): string | undefined {
  const v = String(formData.get(name) ?? "").trim();
  return v === "" ? undefined : v;
}

export async function saveContact(
  _prev: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  if (!(await isAuthenticated())) {
    return { status: "error", message: "Neautorizováno." };
  }

  const cvx = convexClient();
  if (!cvx) {
    return { status: "error", message: "Convex není napojený." };
  }

  const name = optional(formData, "name");
  if (!name) {
    return { status: "error", message: "Jméno je povinné." };
  }

  const rawId = String(formData.get("id") ?? "").trim();
  const orderRaw = Number(formData.get("order"));

  const args = {
    ...(rawId ? { id: rawId as unknown as never } : {}),
    key: optional(formData, "key") ?? name,
    name,
    role: optional(formData, "role"),
    phone: optional(formData, "phone"),
    email: optional(formData, "email"),
    address: optional(formData, "address"),
    order: Number.isFinite(orderRaw) ? orderRaw : 0,
    locale: (String(formData.get("locale") ?? "cs") === "en" ? "en" : "cs") as
      | "cs"
      | "en",
  };

  try {
    const api = await convexApi();
    await cvx.mutation(api.contacts.upsert, args);
  } catch {
    return { status: "error", message: "Uložení selhalo." };
  }

  revalidateContacts();
  return { status: "ok" };
}

export async function deleteContact(formData: FormData): Promise<void> {
  if (!(await isAuthenticated())) return;

  const cvx = convexClient();
  if (!cvx) return;

  const id = String(formData.get("id") ?? "").trim();
  if (!id) return;

  try {
    const api = await convexApi();
    await cvx.mutation(api.contacts.remove, { id });
  } catch {
    return;
  }

  revalidateContacts();
}

/** Naplní tabulku contacts lidmi ze site.ts — jen když je prázdná. */
export async function seedContacts(): Promise<void> {
  if (!(await isAuthenticated())) return;

  const cvx = convexClient();
  if (!cvx) return;

  try {
    const api = await convexApi();
    const existing = (await cvx.query(api.contacts.list, { locale: "cs" })) as
      | unknown[]
      | null;
    if (existing && existing.length > 0) return;

    await Promise.all(
      site.contacts.people.map((person, i) =>
        cvx.mutation(api.contacts.upsert, {
          key: person.email,
          name: person.name,
          role: person.role,
          phone: person.phone,
          email: person.email,
          order: i,
          locale: "cs" as const,
        }),
      ),
    );
  } catch {
    return;
  }

  revalidateContacts();
}
