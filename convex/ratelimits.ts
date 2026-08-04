import { mutation } from "./_generated/server";
import { v } from "convex/values";

const WINDOW_MS = 60 * 60 * 1000; // 1 hodina
const MAX_PER_WINDOW = 3;

/**
 * Vrátí { ok: boolean, remaining: number }. Volá se před vytvořením
 * poptávky. Key je typicky IP adresa nebo jiný identifikátor odesilatele.
 */
export const check = mutation({
  args: { key: v.string() },
  handler: async (ctx, { key }) => {
    const now = Date.now();
    const existing = await ctx.db
      .query("rateLimits")
      .withIndex("by_key", (q) => q.eq("key", key))
      .first();

    if (!existing) {
      await ctx.db.insert("rateLimits", { key, count: 1, windowStart: now });
      return { ok: true, remaining: MAX_PER_WINDOW - 1 };
    }

    // Reset okna, pokud vypršelo
    if (now - existing.windowStart > WINDOW_MS) {
      await ctx.db.patch(existing._id, { count: 1, windowStart: now });
      return { ok: true, remaining: MAX_PER_WINDOW - 1 };
    }

    if (existing.count >= MAX_PER_WINDOW) {
      return { ok: false, remaining: 0 };
    }

    await ctx.db.patch(existing._id, { count: existing.count + 1 });
    return { ok: true, remaining: MAX_PER_WINDOW - existing.count - 1 };
  },
});
