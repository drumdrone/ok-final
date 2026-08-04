import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

/**
 * Konvexní schéma pro okfinal.cz.
 *
 * Aktivuje se po `npx convex dev`. Do té doby je to jen zdrojová pravda
 * datového modelu — Next kód proti ní zatím nesahá.
 */
export default defineSchema({
  contacts: defineTable({
    key: v.string(),
    name: v.optional(v.string()),
    role: v.optional(v.string()),
    phone: v.optional(v.string()),
    email: v.optional(v.string()),
    address: v.optional(v.string()),
    order: v.number(),
    locale: v.union(v.literal("cs"), v.literal("en")),
  }).index("by_locale_order", ["locale", "order"]),

  jobs: defineTable({
    slug: v.string(),
    title: v.string(),
    location: v.string(),
    type: v.string(),
    summary: v.string(),
    body: v.string(),
    active: v.boolean(),
    order: v.number(),
    locale: v.union(v.literal("cs"), v.literal("en")),
  })
    .index("by_active_order", ["active", "order"])
    .index("by_slug", ["slug"]),

  inquiries: defineTable({
    name: v.optional(v.string()),
    company: v.optional(v.string()),
    email: v.optional(v.string()),
    phone: v.optional(v.string()),
    message: v.string(),
    fileId: v.optional(v.id("_storage")),
    turnstileOk: v.boolean(),
    ip: v.optional(v.string()),
    status: v.union(
      v.literal("new"),
      v.literal("read"),
      v.literal("archived")
    ),
    createdAt: v.number(),
  }).index("by_status_created", ["status", "createdAt"]),

  rateLimits: defineTable({
    key: v.string(),
    count: v.number(),
    windowStart: v.number(),
  }).index("by_key", ["key"]),
});
