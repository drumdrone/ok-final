"use server";

import { revalidatePath } from "next/cache";
import { isAuthenticated } from "@/lib/auth";
import { convexClient } from "@/lib/convex";

export type JobFormState = {
  status: "idle" | "ok" | "error";
  message?: string;
};

/** Diakritiku pryč, mezery na pomlčky — jednoduchý slug. */
function slugify(input: string): string {
  return input
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

async function convexApi() {
  const { api } = await import("../../../../../convex/_generated/api");
  return api;
}

function revalidateJobs() {
  revalidatePath("/admin/kariera");
  revalidatePath("/kariera");
}

export async function saveJob(
  _prev: JobFormState,
  formData: FormData,
): Promise<JobFormState> {
  if (!(await isAuthenticated())) {
    return { status: "error", message: "Neautorizováno." };
  }

  const cvx = convexClient();
  if (!cvx) {
    return { status: "error", message: "Convex není napojený." };
  }

  const title = String(formData.get("title") ?? "").trim();
  if (!title) {
    return { status: "error", message: "Název pozice je povinný." };
  }

  const rawSlug = String(formData.get("slug") ?? "").trim();
  const slug = slugify(rawSlug || title);
  if (!slug) {
    return { status: "error", message: "Neplatný slug." };
  }

  const rawId = String(formData.get("id") ?? "").trim();
  const orderRaw = Number(formData.get("order"));

  const args = {
    ...(rawId ? { id: rawId as unknown as never } : {}),
    slug,
    title,
    location: String(formData.get("location") ?? "").trim(),
    type: String(formData.get("type") ?? "").trim(),
    summary: String(formData.get("summary") ?? "").trim(),
    body: String(formData.get("body") ?? "").trim(),
    active: formData.get("active") != null,
    order: Number.isFinite(orderRaw) ? orderRaw : 0,
    locale: (String(formData.get("locale") ?? "cs") === "en" ? "en" : "cs") as
      | "cs"
      | "en",
  };

  try {
    const api = await convexApi();
    await cvx.mutation(api.jobs.upsert, args);
  } catch {
    return { status: "error", message: "Uložení selhalo." };
  }

  revalidateJobs();
  return { status: "ok" };
}

export async function deleteJob(formData: FormData): Promise<void> {
  if (!(await isAuthenticated())) return;

  const cvx = convexClient();
  if (!cvx) return;

  const id = String(formData.get("id") ?? "").trim();
  if (!id) return;

  try {
    const api = await convexApi();
    await cvx.mutation(api.jobs.remove, { id });
  } catch {
    return;
  }

  revalidateJobs();
}
