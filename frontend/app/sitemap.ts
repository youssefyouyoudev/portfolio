import type { MetadataRoute } from "next";
import { getBlogPosts, getProjects } from "@/lib/api";
import { authorityPageSlugs } from "@/lib/authority-content";
import { locationPageSlugs } from "@/lib/location-content";
import { servicePageSlugs } from "@/lib/service-content";
import { siteUrl } from "@/lib/site";

const contentLastModified = new Date("2026-07-09T00:00:00.000Z");

function availableDate(item: unknown) {
  if (!item || typeof item !== "object") return contentLastModified;
  const record = item as Record<string, unknown>;
  const value = record.updated_at ?? record.published_at ?? record.completed_at ?? record.created_at;
  if (typeof value !== "string") return contentLastModified;
  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? contentLastModified : parsed;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // API helpers catch network failures and return local project/blog fallbacks.
  const [projects, blogPosts] = await Promise.all([getProjects(), getBlogPosts()]);

  const staticPages: MetadataRoute.Sitemap = [
    { url: siteUrl, lastModified: contentLastModified, changeFrequency: "weekly", priority: 1 },
    { url: `${siteUrl}/about`, lastModified: contentLastModified, changeFrequency: "monthly", priority: 0.7 },
    { url: `${siteUrl}/services`, lastModified: contentLastModified, changeFrequency: "monthly", priority: 0.9 },
    { url: `${siteUrl}/projects`, lastModified: contentLastModified, changeFrequency: "weekly", priority: 0.7 },
    { url: `${siteUrl}/blog`, lastModified: contentLastModified, changeFrequency: "weekly", priority: 0.7 },
    { url: `${siteUrl}/contact`, lastModified: contentLastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: `${siteUrl}/hire-laravel-react-developer`, lastModified: contentLastModified, changeFrequency: "monthly", priority: 0.9 },
    { url: `${siteUrl}/local-web-developer-morocco`, lastModified: contentLastModified, changeFrequency: "monthly", priority: 0.9 },
    { url: `${siteUrl}/cv`, lastModified: contentLastModified, changeFrequency: "monthly", priority: 0.6 },
  ];

  return [
    ...staticPages,
    ...authorityPageSlugs
      .filter((slug) => !["hire-laravel-react-developer"].includes(slug))
      .map((slug) => ({
        url: `${siteUrl}/${slug}`,
        lastModified: contentLastModified,
        changeFrequency: "monthly" as const,
        priority: slug.includes("/") ? 0.6 : 0.8,
      })),
    ...servicePageSlugs.map((slug) => ({
      url: `${siteUrl}/services/${slug}`,
      lastModified: contentLastModified,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...locationPageSlugs.map((slug) => ({
      url: `${siteUrl}/locations/${slug}`,
      lastModified: contentLastModified,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...projects.map((project) => ({
      url: `${siteUrl}/projects/${project.slug}`,
      lastModified: availableDate(project),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...blogPosts.map((post) => ({
      url: `${siteUrl}/blog/${post.slug}`,
      lastModified: availableDate(post),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}

