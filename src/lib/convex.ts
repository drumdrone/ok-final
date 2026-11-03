import { ConvexHttpClient } from "convex/browser";

/**
 * Jediný HTTP client pro server-side Next.js volání do Convexu.
 * Vrací null, pokud není nastavené `NEXT_PUBLIC_CONVEX_URL` — kód
 * volající tuto funkci by měl mít fallback (viz /api/contact).
 */
let cached: ConvexHttpClient | null | undefined;

/** Normalizace URL — ConvexHttpClient si sám přidává cesty jako
 *  `/api/query`, takže trailing slash v NEXT_PUBLIC_CONVEX_URL by
 *  způsobil `//api/query` a HTTP 404. Ořízneme ho defenzivně. */
function normalizedConvexUrl(): string | undefined {
  const raw = process.env.NEXT_PUBLIC_CONVEX_URL?.trim();
  return raw ? raw.replace(/\/+$/, "") : undefined;
}

export function convexClient(): ConvexHttpClient | null {
  if (cached !== undefined) return cached;
  const url = normalizedConvexUrl();
  cached = url ? new ConvexHttpClient(url) : null;
  return cached;
}

export const convexEnabled = () => !!normalizedConvexUrl();
