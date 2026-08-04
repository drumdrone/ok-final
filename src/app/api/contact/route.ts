import { NextResponse } from "next/server";
import { convexClient } from "@/lib/convex";

/**
 * POST /api/contact
 *
 * Přijme FormData z ContactForm, zvaliduje, ověří Turnstile (pokud je
 * nastavený), zkontroluje rate limit, uloží poptávku do Convexu a
 * pošle e-maily přes Resend (asynchronně scheduler z Convex mutace).
 *
 * Když Convex/Resend/Turnstile nejsou nakonfigurovány, funguje jako
 * stub — jen zaloguje na server. To umožňuje běh UI toku i před
 * plným nasazením backendu.
 */
export async function POST(req: Request) {
  const contentType = req.headers.get("content-type") || "";
  if (
    !contentType.includes("multipart/form-data") &&
    !contentType.includes("application/x-www-form-urlencoded")
  ) {
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

  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    req.headers.get("x-real-ip") ??
    "unknown";

  // ── Cloudflare Turnstile (pokud nastavený) ─────────────────────
  const turnstileSecret = process.env.TURNSTILE_SECRET_KEY;
  const turnstileToken = String(form.get("cf-turnstile-response") ?? "");
  let turnstileOk = !turnstileSecret; // když není nastavený, přeskakujeme
  if (turnstileSecret) {
    try {
      const verify = await fetch(
        "https://challenges.cloudflare.com/turnstile/v0/siteverify",
        {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: new URLSearchParams({
            secret: turnstileSecret,
            response: turnstileToken,
            remoteip: ip,
          }),
        }
      );
      const data = (await verify.json()) as { success?: boolean };
      turnstileOk = !!data.success;
    } catch {
      turnstileOk = false;
    }
    if (!turnstileOk) {
      return NextResponse.json(
        { ok: false, error: "Nepodařilo se ověřit, že nejste robot. Zkuste to znovu." },
        { status: 400 }
      );
    }
  }

  // ── Convex path ────────────────────────────────────────────────
  const cvx = convexClient();
  if (cvx) {
    try {
      // Rate limit check
      const { api } = await import("../../../../convex/_generated/api");
      const rl = await cvx.mutation(api.ratelimits.check, { key: `ip:${ip}` });
      if (!rl.ok) {
        return NextResponse.json(
          { ok: false, error: "Příliš mnoho pokusů. Zkuste to prosím za hodinu." },
          { status: 429 }
        );
      }

      // Nahrání souboru, pokud je
      const file = form.get("file") as File | null;
      let fileId: string | undefined;
      if (file && file.size > 0) {
        const uploadUrl = await cvx.mutation(api.inquiries.generateUploadUrl, {});
        const uploadRes = await fetch(uploadUrl, {
          method: "POST",
          headers: { "Content-Type": file.type },
          body: file,
        });
        if (!uploadRes.ok) throw new Error("File upload failed");
        const { storageId } = (await uploadRes.json()) as { storageId: string };
        fileId = storageId;
      }

      await cvx.mutation(api.inquiries.create, {
        name: String(form.get("name") ?? "") || undefined,
        company: String(form.get("company") ?? "") || undefined,
        email: email || undefined,
        phone: phone || undefined,
        message,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        fileId: fileId as any,
        turnstileOk,
        ip,
      });

      return NextResponse.json({ ok: true, mode: "convex" });
    } catch (err) {
      console.error("[contact] convex path failed", err);
      return NextResponse.json(
        { ok: false, error: "Nepodařilo se uložit poptávku. Napište prosím na info@okfinal.cz." },
        { status: 500 }
      );
    }
  }

  // ── Stub path (bez Convexu) ────────────────────────────────────
  console.warn("[contact] Convex not configured — logging inquiry only.", {
    name: form.get("name"),
    company: form.get("company"),
    email, phone,
    messageLength: message.length,
    fileName: (form.get("file") as File | null)?.name ?? null,
    ip,
  });
  return NextResponse.json({ ok: true, mode: "stub" });
}
