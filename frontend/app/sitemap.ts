import type { MetadataRoute } from "next";
import { blogPosts, projects } from "@/lib/data";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://youssefyouyou.com";
  return [
    { url: base, lastModified: new Date(), priority: 1 },
    { url: `${base}/cv-download`, lastModified: new Date(), priority: 0.7 },
    ...projects.map((project) => ({ url: `${base}/projects/${project.slug}`, lastModified: new Date(), priority: 0.8 })),
    ...blogPosts.map((post) => ({ url: `${base}/blog/${post.slug}`, lastModified: new Date(), priority: 0.6 })),
  ];
}
