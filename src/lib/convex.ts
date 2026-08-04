import { ConvexHttpClient } from "convex/browser";

/**
 * Jediný HTTP client pro server-side Next.js volání do Convexu.
 * Vrací null, pokud není nastavené `NEXT_PUBLIC_CONVEX_URL` — kód
 * volající tuto funkci by měl mít fallback (viz /api/contact).
 */
let cached: ConvexHttpClient | null | undefined;

export function convexClient(): ConvexHttpClient | null {
  if (cached !== undefined) return cached;
  const url = process.env.NEXT_PUBLIC_CONVEX_URL;
  cached = url ? new ConvexHttpClient(url) : null;
  return cached;
}

export const convexEnabled = () => !!process.env.NEXT_PUBLIC_CONVEX_URL;
