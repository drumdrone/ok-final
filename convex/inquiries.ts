import { mutation, query, internalMutation } from "./_generated/server";
import { v } from "convex/values";
import { internal } from "./_generated/api";

/**
 * Vytvoří nový záznam poptávky.
 * Volá se z Next.js API route /api/contact.
 * Rate limit je řešen v samostatné funkci ratelimits.check.
 */
export const create = mutation({
  args: {
    name: v.optional(v.string()),
    company: v.optional(v.string()),
    email: v.optional(v.string()),
    phone: v.optional(v.string()),
    message: v.string(),
    fileId: v.optional(v.id("_storage")),
    turnstileOk: v.boolean(),
    ip: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    if (args.message.length < 20) throw new Error("Message too short");
    if (!args.email && !args.phone) throw new Error("Contact required");

    const id = await ctx.db.insert("inquiries", {
      ...args,
      status: "new",
      createdAt: Date.now(),
    });

    // Odeslání e-mailu je action (může volat externí služby).
    await ctx.scheduler.runAfter(0, internal.email.sendInquiryMail, { inquiryId: id });

    return id;
  },
});

export const list = query({
  args: {
    status: v.optional(
      v.union(v.literal("new"), v.literal("read"), v.literal("archived"))
    ),
  },
  handler: async (ctx, { status }) => {
    if (status) {
      return await ctx.db
        .query("inquiries")
        .withIndex("by_status_created", (q) => q.eq("status", status))
        .order("desc")
        .take(200);
    }
    return await ctx.db.query("inquiries").order("desc").take(200);
  },
});

export const setStatus = mutation({
  args: {
    id: v.id("inquiries"),
    status: v.union(v.literal("new"), v.literal("read"), v.literal("archived")),
  },
  handler: async (ctx, { id, status }) => {
    await ctx.db.patch(id, { status });
  },
});

export const get = query({
  args: { id: v.id("inquiries") },
  handler: async (ctx, { id }) => await ctx.db.get(id),
});

export const generateUploadUrl = mutation({
  args: {},
  handler: async (ctx) => await ctx.storage.generateUploadUrl(),
});

export const counts = query({
  args: {},
  handler: async (ctx) => {
    const all = await ctx.db.query("inquiries").collect();
    return {
      total: all.length,
      new: all.filter((i) => i.status === "new").length,
      read: all.filter((i) => i.status === "read").length,
      archived: all.filter((i) => i.status === "archived").length,
    };
  },
});

// Interní verze bez rate limitu, používá action při rescheduling
export const _internalCreate = internalMutation({
  args: {
    name: v.optional(v.string()),
    email: v.optional(v.string()),
    phone: v.optional(v.string()),
    message: v.string(),
    ip: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("inquiries", {
      ...args,
      turnstileOk: false,
      status: "new",
      createdAt: Date.now(),
    });
  },
});
