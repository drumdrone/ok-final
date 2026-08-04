"use node";

import { internalAction } from "./_generated/server";
import { v } from "convex/values";
import { internal } from "./_generated/api";

/**
 * Pošle e-mail s poptávkou přes Resend API na info@okfinal.cz +
 * potvrzení odesilateli. Volá se ze scheduleru z inquiries.create.
 */
export const sendInquiryMail = internalAction({
  args: { inquiryId: v.id("inquiries") },
  handler: async (ctx, { inquiryId }) => {
    const inquiry = await ctx.runQuery(internal.inquiries.get, { id: inquiryId });
    if (!inquiry) return;

    const apiKey = process.env.RESEND_API_KEY;
    const from = process.env.RESEND_FROM ?? "noreply@okfinal.cz";
    const to = process.env.RESEND_TO_INQUIRIES ?? "info@okfinal.cz";

    if (!apiKey) {
      console.warn("[email] RESEND_API_KEY missing, skipping send");
      return;
    }

    const subject = `Nová poptávka: ${inquiry.name ?? "bez jména"}`;
    const bodyLines = [
      inquiry.name && `Jméno: ${inquiry.name}`,
      inquiry.company && `Firma: ${inquiry.company}`,
      inquiry.email && `E-mail: ${inquiry.email}`,
      inquiry.phone && `Telefon: ${inquiry.phone}`,
      "",
      "Popis:",
      inquiry.message,
    ].filter(Boolean).join("\n");

    // Interní kopie na info@
    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: inquiry.email ? [inquiry.email] : undefined,
        subject,
        text: bodyLines,
      }),
    });

    // Potvrzení odesilateli
    if (inquiry.email) {
      await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          from,
          to: [inquiry.email],
          subject: "Vaše poptávka — OK FINAL s.r.o.",
          text: [
            `Dobrý den${inquiry.name ? ` ${inquiry.name}` : ""},`,
            "",
            "děkujeme za poptávku. Ozveme se do 24 hodin s cenou a termínem.",
            "",
            "Pro shrnutí posíláme text vaší zprávy:",
            "",
            inquiry.message,
            "",
            "S pozdravem,",
            "OK FINAL s.r.o.",
            "Nádražní 608, 564 01 Žamberk",
          ].join("\n"),
        }),
      });
    }
  },
});
