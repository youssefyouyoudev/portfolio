import type { MetadataRoute } from "next";
import { getBlogPosts, getProjects } from "@/lib/api";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = "https://youssefyouyou.com";
  const [projects, blogPosts] = await Promise.all([getProjects(), getBlogPosts()]);

  return [
    { url: base, lastModified: new Date(), priority: 1 },
    { url: `${base}/projects`, lastModified: new Date(), priority: 0.85 },
    { url: `${base}/blog`, lastModified: new Date(), priority: 0.7 },
    { url: `${base}/contact`, lastModified: new Date(), priority: 0.8 },
    { url: `${base}/cv-download`, lastModified: new Date(), priority: 0.7 },
    ...projects.map((project) => ({ url: `${base}/projects/${project.slug}`, lastModified: new Date(), priority: 0.8 })),
    ...blogPosts.map((post) => ({ url: `${base}/blog/${post.slug}`, lastModified: new Date(), priority: 0.6 })),
  ];
}
