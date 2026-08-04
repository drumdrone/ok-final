import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const list = query({
  args: { locale: v.optional(v.union(v.literal("cs"), v.literal("en"))) },
  handler: async (ctx, { locale = "cs" }) => {
    return await ctx.db
      .query("contacts")
      .withIndex("by_locale_order", (q) => q.eq("locale", locale))
      .collect();
  },
});

export const upsert = mutation({
  args: {
    id: v.optional(v.id("contacts")),
    key: v.string(),
    name: v.optional(v.string()),
    role: v.optional(v.string()),
    phone: v.optional(v.string()),
    email: v.optional(v.string()),
    address: v.optional(v.string()),
    order: v.number(),
    locale: v.union(v.literal("cs"), v.literal("en")),
  },
  handler: async (ctx, { id, ...data }) => {
    if (id) {
      await ctx.db.patch(id, data);
      return id;
    }
    return await ctx.db.insert("contacts", data);
  },
});
