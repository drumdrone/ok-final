import { NextResponse } from "next/server";
import { convexClient } from "@/lib/convex";

/**
 * POST /api/contact
 *
 * Přijme FormData z ContactForm, zvaliduje, ověří Turnstile (pokud je
 * nastavený), odešle e-mail přes Resend a — pokud je Convex plně
 * nasazený — zároveň uloží poptávku do DB pro admin.
 *
 * Doručení e-mailu je primární (RESEND_API_KEY). Convex je volitelná
 * druhá vrstva: pokud ještě není inicializovaný nebo mutace selže,
 * uživatel to nepozná — pouze se vynechá záznam v adminu.
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
  const name = String(form.get("name") ?? "").trim();
  const company = String(form.get("company") ?? "").trim();
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
  let turnstileOk = !turnstileSecret;
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

  // ── E-mail přes Resend (primární doručení) ─────────────────────
  const resendKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM ?? "noreply@okfinal.cz";
  const to = process.env.RESEND_TO_INQUIRIES ?? "info@okfinal.cz";
  let emailSent = false;

  if (resendKey) {
    const subject = `Nová poptávka: ${name || company || email || phone || "bez jména"}`;
    const bodyLines = [
      name && `Jméno: ${name}`,
      company && `Firma: ${company}`,
      email && `E-mail: ${email}`,
      phone && `Telefon: ${phone}`,
      `IP: ${ip}`,
      "",
      "Popis:",
      message,
    ]
      .filter(Boolean)
      .join("\n");

    try {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${resendKey}`,
        },
        body: JSON.stringify({
          from,
          to: [to],
          reply_to: email ? [email] : undefined,
          subject,
          text: bodyLines,
        }),
      });
      if (!res.ok) {
        const errBody = await res.text();
        console.error("[contact] Resend failed", res.status, errBody);
      } else {
        emailSent = true;
      }
    } catch (err) {
      console.error("[contact] Resend request threw", err);
    }
  } else {
    console.warn(
      "[contact] RESEND_API_KEY missing — inquiry not delivered by e-mail",
      { name, company, email, phone, ip, messageLength: message.length }
    );
  }

  // ── Convex (volitelná DB vrstva pro admin) ─────────────────────
  // Nefatální: pokud projekt ještě není inicializovaný nebo mutace
  // selže, uživatel to nepozná a e-mail přesto dojde.
  const cvx = convexClient();
  if (cvx) {
    try {
      const { api } = await import("../../../../convex/_generated/api");
      const rl = await cvx.mutation(api.ratelimits.check, { key: `ip:${ip}` });
      if (!rl.ok) {
        return NextResponse.json(
          { ok: false, error: "Příliš mnoho pokusů. Zkuste to prosím za hodinu." },
          { status: 429 }
        );
      }

      const file = form.get("file") as File | null;
      let fileId: string | undefined;
      if (file && file.size > 0) {
        const uploadUrl = await cvx.mutation(api.inquiries.generateUploadUrl, {});
        const uploadRes = await fetch(uploadUrl, {
          method: "POST",
          headers: { "Content-Type": file.type },
          body: file,
        });
        if (uploadRes.ok) {
          const { storageId } = (await uploadRes.json()) as { storageId: string };
          fileId = storageId;
        }
      }

      await cvx.mutation(api.inquiries.create, {
        name: name || undefined,
        company: company || undefined,
        email: email || undefined,
        phone: phone || undefined,
        message,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        fileId: fileId as any,
        turnstileOk,
        ip,
      });
    } catch (err) {
      // Convex ještě nebyl deployed / mutace selhala — nevadí, e-mail
      // je naše primární doručení.
      console.warn("[contact] Convex path skipped:", (err as Error)?.message);
    }
  }

  // ── Response ───────────────────────────────────────────────────
  // Pokud máme Resend a mail prošel: ok. Pokud Resend není
  // nakonfigurován: logujeme a vracíme ok (poptávka je v server logu,
  // doručení e-mailu je operations task). Pokud Resend byl nastavený
  // ale selhal: user by měl vědět.
  if (resendKey && !emailSent) {
    return NextResponse.json(
      {
        ok: false,
        error:
          "Odeslání se nepodařilo. Napište prosím přímo na info@okfinal.cz nebo zavolejte +420 465 612 713.",
      },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true });
}
