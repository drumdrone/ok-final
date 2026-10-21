import type { MetadataRoute } from "next";
import { nav, enNav } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "https://okfinal.cz";
  const now = new Date();
  const cs = nav.map((item) => ({
    url: `${base}${item.href === "/" ? "" : item.href}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: item.href === "/" ? 1 : 0.7,
  }));
  const en = enNav.map((item) => ({
    url: `${base}${item.href}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: item.href === "/en" ? 0.7 : 0.5,
  }));
  return [...cs, ...en];
}
