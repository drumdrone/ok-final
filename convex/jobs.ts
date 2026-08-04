import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const listActive = query({
  args: { locale: v.optional(v.union(v.literal("cs"), v.literal("en"))) },
  handler: async (ctx, { locale = "cs" }) => {
    return await ctx.db
      .query("jobs")
      .withIndex("by_active_order", (q) => q.eq("active", true))
      .filter((q) => q.eq(q.field("locale"), locale))
      .collect();
  },
});

export const listAll = query({
  args: {},
  handler: async (ctx) => await ctx.db.query("jobs").order("desc").collect(),
});

export const bySlug = query({
  args: { slug: v.string() },
  handler: async (ctx, { slug }) => {
    return await ctx.db
      .query("jobs")
      .withIndex("by_slug", (q) => q.eq("slug", slug))
      .first();
  },
});

export const upsert = mutation({
  args: {
    id: v.optional(v.id("jobs")),
    slug: v.string(),
    title: v.string(),
    location: v.string(),
    type: v.string(),
    summary: v.string(),
    body: v.string(),
    active: v.boolean(),
    order: v.number(),
    locale: v.union(v.literal("cs"), v.literal("en")),
  },
  handler: async (ctx, { id, ...data }) => {
    if (id) {
      await ctx.db.patch(id, data);
      return id;
    }
    return await ctx.db.insert("jobs", data);
  },
});

export const remove = mutation({
  args: { id: v.id("jobs") },
  handler: async (ctx, { id }) => {
    await ctx.db.delete(id);
  },
});
