import type { MetadataRoute } from "next";
import { getBlogPosts, getProjects } from "@/lib/api";
import { authorityPageSlugs } from "@/lib/authority-content";
import { locationPageSlugs } from "@/lib/location-content";
import { servicePageSlugs } from "@/lib/service-content";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = "https://www.youssefyouyou.com";
  const [projects, blogPosts] = await Promise.all([getProjects(), getBlogPosts()]);

  return [
    { url: base, lastModified: new Date(), priority: 1 },
    { url: `${base}/projects`, lastModified: new Date(), priority: 0.85 },
    { url: `${base}/blog`, lastModified: new Date(), priority: 0.7 },
    { url: `${base}/contact`, lastModified: new Date(), priority: 0.8 },
    { url: `${base}/cv`, lastModified: new Date(), priority: 0.72 },
    { url: `${base}/cv-download`, lastModified: new Date(), priority: 0.7 },
    ...authorityPageSlugs.map((slug) => ({ url: `${base}/${slug}`, lastModified: new Date(), priority: slug.includes("/") ? 0.68 : 0.78 })),
    ...servicePageSlugs.map((slug) => ({ url: `${base}/services/${slug}`, lastModified: new Date(), priority: 0.82 })),
    ...locationPageSlugs.map((slug) => ({ url: `${base}/locations/${slug}`, lastModified: new Date(), priority: 0.74 })),
    ...projects.map((project) => ({ url: `${base}/projects/${project.slug}`, lastModified: new Date(), priority: 0.8 })),
    ...blogPosts.map((post) => ({ url: `${base}/blog/${post.slug}`, lastModified: new Date(), priority: 0.6 })),
  ];
}
