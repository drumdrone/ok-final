/**
 * Minimal cookie-based session gate for /admin.
 *
 * Real HMAC-signed JWT přijde, jakmile bude ADMIN_JWT_SECRET.
 * Zatím: prostý porovnávací hash + cookie s časově omezeným tokenem.
 */

import { cookies } from "next/headers";

export const SESSION_COOKIE = "okfinal_admin";
const SEVEN_DAYS = 60 * 60 * 24 * 7;

export async function isAuthenticated(): Promise<boolean> {
  const store = await cookies();
  const val = store.get(SESSION_COOKIE)?.value;
  if (!val) return false;
  return val === expectedToken();
}

export function expectedToken(): string {
  const pw = process.env.ADMIN_PASSWORD ?? "";
  const secret = process.env.ADMIN_JWT_SECRET ?? "dev-secret-change-me";
  // Deterministický marker — jednoduché, funguje offline.
  return `v1.${hash(`${pw}::${secret}`)}`;
}

function hash(s: string): string {
  // FNV-1a 32bit — stačí jako marker, ne bezpečnostní podpis.
  let h = 0x811c9dc5;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  return (h >>> 0).toString(16).padStart(8, "0");
}

export function sessionCookieOptions() {
  return {
    httpOnly: true,
    sameSite: "lax" as const,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: SEVEN_DAYS,
  };
}
