import { NextResponse } from "next/server";

/**
 * POST /api/contact
 *
 * Stub — přijme FormData, zvaliduje minimum, zaloguje na server.
 * Doplnit až budou reálné klíče:
 *   - ověření Cloudflare Turnstile tokenu (TURNSTILE_SECRET_KEY)
 *   - Convex `inquiries:create` mutation (+ upload souboru do Convex storage)
 *   - Resend odeslání e-mailu na info@okfinal.cz + potvrzení odesílateli
 *   - rate limit 3 / IP / hod (Convex counter s TTL)
 *
 * Zatím vrací 200 s krátkou zprávou, ať UI toku uvěří.
 */
export async function POST(req: Request) {
  const contentType = req.headers.get("content-type") || "";
  if (!contentType.includes("multipart/form-data") && !contentType.includes("application/x-www-form-urlencoded")) {
    return NextResponse.json({ ok: false, error: "Bad content type" }, { status: 400 });
  }

  const form = await req.formData();
  const email = String(form.get("email") ?? "").trim();
  const phone = String(form.get("phone") ?? "").trim();
  const message = String(form.get("message") ?? "").trim();
  const gdpr = form.get("gdpr");

  if (!gdpr) return NextResponse.json({ ok: false, error: "GDPR required" }, { status: 400 });
  if (!email && !phone) return NextResponse.json({ ok: false, error: "Contact required" }, { status: 400 });
  if (message.length < 20) return NextResponse.json({ ok: false, error: "Message too short" }, { status: 400 });

  const configured = Boolean(
    process.env.RESEND_API_KEY &&
      process.env.RESEND_FROM &&
      process.env.RESEND_TO_INQUIRIES
  );

  if (!configured) {
    console.warn(
      "[contact] Received inquiry but Resend/Convex not configured — logging only.",
      {
        name: form.get("name"),
        company: form.get("company"),
        email, phone,
        messageLength: message.length,
        fileName: (form.get("file") as File | null)?.name ?? null,
      }
    );
    return NextResponse.json({ ok: true, mode: "stub" });
  }

  // TODO: reálné odeslání přes Resend + zápis do Convexu.
  return NextResponse.json({ ok: true, mode: "stub" });
}
