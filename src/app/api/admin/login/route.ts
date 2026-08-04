import { NextResponse } from "next/server";
import { expectedToken, SESSION_COOKIE, sessionCookieOptions } from "@/lib/auth";

export async function POST(req: Request) {
  const form = await req.formData();
  const password = String(form.get("password") ?? "");
  const next = String(form.get("next") ?? "/admin");

  const expected = process.env.ADMIN_PASSWORD;
  if (!expected || password !== expected) {
    const url = new URL(`/admin/login?error=1&next=${encodeURIComponent(next)}`, req.url);
    return NextResponse.redirect(url, 303);
  }

  const res = NextResponse.redirect(new URL(next, req.url), 303);
  res.cookies.set(SESSION_COOKIE, expectedToken(), sessionCookieOptions());
  return res;
}
