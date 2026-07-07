import {
  blogPosts as fallbackBlogPosts,
  experiences as fallbackExperiences,
  profile as fallbackProfile,
  projects as fallbackProjects,
  services as fallbackServices,
  skills as fallbackSkills,
  stats as fallbackStats,
  timeline as fallbackTimeline,
} from "@/lib/data";
import { canonicalProjectSlug, getDisplayProjects, getProjectFromCollection } from "@/lib/project-content";

const apiBase = process.env.NEXT_PUBLIC_API_URL ?? "https://api.youssefyouyou.com";

type ApiCollection<T> = { data?: T[] } | T[];
type NextFetchInit = RequestInit & { next?: { revalidate?: number } };
type FallbackProject = (typeof fallbackProjects)[number];
type FallbackBlogPost = (typeof fallbackBlogPosts)[number];

const projectImageBySlug: Record<string, string> = {
  rifitv: "/images/projects/rifitv-showcase.png",
  erplus: "/images/projects/erplus-showcase.png",
  "digital-archiving-system": "/images/projects/digital-archiving-showcase.png",
  "social-media-management-saas": "/images/projects/social-media-saas-showcase.png",
  "ecommerce-client-portal": "/images/projects/ecommerce-client-portal-showcase.png",
  "ecommerce-client-portal-systems": "/images/projects/ecommerce-client-portal-showcase.png",
  "excel-vba-automation-tools": "/images/projects/excel-vba-automation-showcase.png",
};

const blogSlugAliases: Record<string, string> = {
  "why-businesses-need-internal-digitalization": "business-automation-from-excel-to-web-app",
  "api-integration-best-practices": "laravel-api-react-dashboard-architecture",
  "building-admin-panels-with-laravel-and-filament": "build-admin-dashboard-laravel-react",
  "how-i-build-laravel-and-react-dashboards": "laravel-api-react-dashboard-architecture",
  "from-excel-automation-to-web-applications": "business-automation-from-excel-to-web-app",
  "practical-api-structure-for-admin-dashboards": "laravel-api-react-dashboard-architecture",
  "why-small-businesses-need-internal-dashboards": "build-admin-dashboard-laravel-react",
  "deploying-laravel-and-nextjs-on-ubuntu": "deploy-laravel-nextjs-ubuntu-nginx-pm2",
  "deploy-laravel-nextjs-ubuntu-nginx-pm2-ssl": "deploy-laravel-nextjs-ubuntu-nginx-pm2",
  "laravel-api-react-dashboard-architecture-business-platforms": "laravel-api-react-dashboard-architecture",
  "fix-vite-build-assets-not-loading-production": "fix-vite-assets-production-laravel",
  "seo-checklist-laravel-nextjs-websites": "seo-checklist-laravel-nextjs",
  "building-admin-dashboards-laravel-react-role-permissions": "build-admin-dashboard-laravel-react",
  "structure-saas-projects-laravel-api-react-frontend": "laravel-saas-project-structure",
};

export const legacyBlogSlugs = Object.keys(blogSlugAliases);

function canonicalBlogSlug(slug: string) {
  return blogSlugAliases[slug] ?? slug;
}

async function fetchJson<T>(path: string, init?: NextFetchInit): Promise<T | null> {
  try {
    const response = await fetch(`${apiBase}${path}`, {
      ...init,
      next: { revalidate: 300, ...(init?.next ?? {}) },
      headers: { Accept: "application/json", ...(init?.headers ?? {}) },
    });

    if (!response.ok) {
      return null;
    }

    return (await response.json()) as T;
  } catch {
    return null;
  }
}

function collection<T>(payload: ApiCollection<T> | null): T[] {
  if (!payload) return [];
  return Array.isArray(payload) ? payload : payload.data ?? [];
}

function normalizeProject(project: any): FallbackProject {
  const slug = canonicalProjectSlug(project.slug);
  const rawImage = project.image ?? project.cover_image ?? "";
  const image = rawImage && !rawImage.endsWith(".jpg") ? rawImage : projectImageBySlug[slug] ?? rawImage;

  return {
    ...project,
    title: project.title,
    slug,
    category: project.category,
    subtitle: project.subtitle ?? project.category,
    shortDescription: project.shortDescription ?? project.summary ?? project.short_description ?? "",
    businessProblem: project.businessProblem ?? project.case_study?.business_problem ?? "",
    solution: project.solution ?? project.case_study?.solution ?? "",
    myRole: project.myRole ?? project.my_role ?? project.case_study?.role ?? "",
    targetUsers: project.targetUsers ?? project.case_study?.target_users ?? "",
    stack: project.stack ?? project.techStack ?? [],
    features: project.features ?? project.keyFeatures ?? [],
    problems: project.problems ?? project.problems_solved ?? project.challengesSolved ?? [],
    businessValue: project.businessValue ?? project.business_value ?? "",
    impact: project.impact ?? project.case_study?.impact ?? project.business_value ?? "",
    learned: project.learned ?? project.case_study?.learned ?? "",
    recruiterSignal: project.recruiterSignal ?? project.case_study?.recruiter_signal ?? "",
    image,
    imageAlt: project.imageAlt ?? `${project.title} project preview`,
    caseStudyUrl: `/projects/${slug}`,
    seoTitle: project.seoTitle ?? project.seo_title,
    seoDescription: project.seoDescription ?? project.seo_description,
    ogImage: project.ogImage ?? project.og_image,
  };
}

function normalizeBlogPost(post: any): FallbackBlogPost {
  const points = Array.isArray(post.points) ? post.points : extractPoints(post.content);
  const slug = canonicalBlogSlug(post.slug);

  return {
    ...post,
    title: post.title,
    slug,
    category: post.category ?? "Technical Notes",
    excerpt: post.excerpt ?? post.summary ?? "",
    points,
    content: post.content,
    sections: post.sections ?? [],
    checklist: post.checklist ?? points,
    relatedProjects: post.relatedProjects ?? post.related_projects ?? [],
    relatedServices: post.relatedServices ?? post.related_services ?? [],
    seoTitle: post.seo_title ?? post.meta_title ?? post.title,
    seoDescription: post.seo_description ?? post.meta_description ?? post.excerpt,
    ogImage: post.og_image ?? post.featured_image,
  };
}

function extractPoints(content?: string): string[] {
  if (!content) return [];
  return content
    .split(/\n+/)
    .map((line) => line.replace(/^[-*]\s*/, "").trim())
    .filter(Boolean)
    .slice(0, 4);
}

export async function getHomeContent() {
  const [profile, projectsPayload, servicesPayload, skillsPayload, experiencesPayload, blogPayload, statsPayload] = await Promise.all([
    fetchJson<typeof fallbackProfile>("/api/profile"),
    fetchJson<ApiCollection<any>>("/api/projects/featured"),
    fetchJson<ApiCollection<any>>("/api/services"),
    fetchJson<Record<string, string[]> | ApiCollection<any>>("/api/skills"),
    fetchJson<ApiCollection<any>>("/api/experiences"),
    fetchJson<ApiCollection<any>>("/api/blog"),
    fetchJson<ApiCollection<any>>("/api/stats"),
  ]);

  const rawProjects = collection(projectsPayload);
  const apiProjects = rawProjects.length ? getDisplayProjects(rawProjects.map(normalizeProject)) : [];
  const apiServices = collection(servicesPayload).map((service: any) => ({
    title: service.title,
    slug: service.slug,
    description: service.description,
    tag: service.audience_tag ?? service.tag ?? "B2B/B2C",
  }));
  const apiBlogPosts = collection(blogPayload).map(normalizeBlogPost);

  return {
    profile: profile ?? fallbackProfile,
    projects: apiProjects.length ? apiProjects : getDisplayProjects(fallbackProjects),
    services: apiServices.length ? apiServices : fallbackServices,
    skills: normalizeSkills(skillsPayload) ?? fallbackSkills,
    experiences: collection(experiencesPayload).length ? collection(experiencesPayload).map(normalizeExperience) : fallbackExperiences,
    blogPosts: apiBlogPosts.length ? apiBlogPosts : fallbackBlogPosts,
    stats: collection(statsPayload).filter((item: any) => item.type !== "chart" && item.type !== "timeline").length
      ? collection(statsPayload).filter((item: any) => item.type !== "chart" && item.type !== "timeline").map((item: any) => ({
          value: item.value,
          label: item.label,
          detail: item.description,
          tone: item.type ?? "Proof",
        }))
      : fallbackStats,
    timeline: extractTimeline(collection(statsPayload)) ?? fallbackTimeline,
  };
}

export async function getProjects() {
  const payload = await fetchJson<ApiCollection<any>>("/api/projects");
  const rawProjects = collection(payload);
  const apiProjects = rawProjects.length ? getDisplayProjects(rawProjects.map(normalizeProject)) : [];
  return apiProjects.length ? apiProjects : getDisplayProjects(fallbackProjects);
}

export async function getProject(slug: string) {
  const canonical = canonicalProjectSlug(slug);
  const payload = await fetchJson<any>(`/api/projects/${slug}`);
  const canonicalPayload = payload ? null : await fetchJson<any>(`/api/projects/${canonical}`);
  const projectPayload = payload ?? canonicalPayload;
  if (projectPayload?.data || projectPayload?.slug) {
    return getProjectFromCollection([normalizeProject(projectPayload.data ?? projectPayload)], canonical);
  }
  return getProjectFromCollection(fallbackProjects, canonical);
}

export async function getBlogPosts() {
  const payload = await fetchJson<ApiCollection<any>>("/api/blog");
  const apiPosts = collection(payload).map(normalizeBlogPost);
  const merged = new Map(fallbackBlogPosts.map((post) => [post.slug, post]));
  for (const post of apiPosts) {
    if (!merged.has(post.slug)) {
      merged.set(post.slug, post);
    }
  }
  return Array.from(merged.values());
}

export async function getBlogPost(slug: string) {
  const canonical = canonicalBlogSlug(slug);
  const fallback = fallbackBlogPosts.find((post) => post.slug === canonical);
  if (fallback) return fallback;
  const payload = await fetchJson<any>(`/api/blog/${slug}`);
  const canonicalPayload = payload ? null : await fetchJson<any>(`/api/blog/${canonical}`);
  const postPayload = payload ?? canonicalPayload;
  if (postPayload?.data || postPayload?.slug) return normalizeBlogPost(postPayload.data ?? postPayload);
  return null;
}

function normalizeSkills(payload: Record<string, string[]> | ApiCollection<any> | null) {
  if (!payload) return null;
  if (!Array.isArray(payload) && !("data" in payload)) {
    const grouped: Record<string, string[]> = {};
    for (const [category, items] of Object.entries(payload)) {
      grouped[category] = Array.isArray(items) ? items.map((item: any) => item.name ?? item) : [];
    }
    return grouped;
  }
  const grouped: Record<string, string[]> = {};
  for (const item of collection(payload as ApiCollection<any>)) {
    grouped[item.category] ??= [];
    grouped[item.category].push(item.name);
  }
  return grouped;
}

function normalizeExperience(item: any) {
  return {
    role: item.role,
    company: item.company,
    date: item.date_range ?? [item.start_date, item.end_date].filter(Boolean).join(" - "),
    location: item.location,
    points: item.description ?? [],
  };
}

function extractTimeline(stats: any[]) {
  const timeline = stats.find((item) => item.type === "timeline")?.payload;
  return Array.isArray(timeline) ? timeline : null;
}
