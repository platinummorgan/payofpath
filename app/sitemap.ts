// app/sitemap.ts
import type { MetadataRoute } from "next";

const BASE = (process.env.BASE_URL ?? "https://payofpath.com").replace(/\/+$/,"");

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return [
    { url: `${BASE}/`,        lastModified: now },
    { url: `${BASE}/privacy`, lastModified: now },
    { url: `${BASE}/terms`,   lastModified: now },
    { url: `${BASE}/contact`, lastModified: now },
  ];
}
