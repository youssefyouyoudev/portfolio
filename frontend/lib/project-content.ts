import { projects as fallbackProjects } from "@/lib/data";

export const projectCategories = ["All", "SaaS", "Dashboard", "Media", "Automation", "E-commerce", "API"] as const;

type FallbackProject = (typeof fallbackProjects)[number];
export type ProjectCategory = (typeof projectCategories)[number];
export type PortfolioProject = FallbackProject & {
  status: "Live" | "Engineering-qualified for staging" | "Internal" | "Concept" | "Client Project";
  categoryGroup: Exclude<ProjectCategory, "All">;
  featured: boolean;
  technicalDifficulty: "Focused" | "Intermediate" | "Advanced";
  builtFor: string;
  whatIBuilt: string[];
  results: string;
  gallery: string[];
  nextImprovements: string[];
  specificLine: string;
  demoLabel: "Available" | "Private" | "No public demo";
  codeLabel: "GitHub" | "Private repo" | "No public repository";
  liveUrl?: string;
  githubUrl?: string;
  showInProjects?: boolean;
};

const commerceSlug = "ecommerce-client-portal";
const commerceLegacySlugs = ["ecommerce-client-portal-systems", "e-commerce-client-portal-systems"];

const portfolioAdminProject: FallbackProject = {
  title: "Portfolio Admin System",
  slug: "portfolio-admin-system",
  category: "API / CMS / admin dashboard / portfolio control",
  subtitle: "Laravel API - Sanctum - Next.js Admin - MySQL",
  shortDescription: "A private admin system for managing portfolio content online: projects, images, technical notes, services, skills, CV files and contact messages.",
  caseStudyUrl: "/projects/portfolio-admin-system",
  image: "",
  imageAlt: "Portfolio Admin System dashboard mockup",
  seoTitle: "Portfolio Admin System Case Study | Youssef Youyou Portfolio",
  seoDescription: "Case study for a Laravel API and Next.js admin system that controls portfolio content, project case studies, media, blog posts, CV files and contact messages.",
  stack: ["Laravel", "Sanctum", "REST API", "Next.js", "TypeScript", "MySQL", "Tailwind CSS"],
  features: ["Secure admin login", "Projects and media management", "Blog/technical notes control", "Services and skills editing", "CV download tracking", "Contact message workflow", "Publish/hide content controls"],
  businessValue: "Lets the portfolio evolve online without touching code, while keeping public content controlled, structured and SEO-ready.",
  problems: ["Hardcoded content updates", "Broken project proof workflow", "Manual image handling", "No private content control", "No message management"],
  businessProblem: "A portfolio that depends on code changes for every update becomes slow to maintain and difficult to keep current for recruiters and clients.",
  solution: "A Laravel API CMS with Sanctum-protected admin endpoints and a hidden Next.js admin dashboard for editing content, uploading media and controlling publication status.",
  myRole: "Backend CMS architecture, Laravel admin API, Sanctum authentication, Next.js admin interface, public API integration and production QA.",
  targetUsers: "Portfolio owner, recruiters reviewing fresh work, and clients who need proof that content-managed systems can be built.",
  deliverables: ["Admin login", "CRUD endpoints", "Media upload", "Project/blog management", "Public API integration", "SEO-ready dynamic pages"],
  architecture: "Laravel REST API with Sanctum token auth, MySQL CMS tables, media storage, structured resources and a Next.js frontend consuming public endpoints with static fallbacks.",
  impact: "Turns the portfolio itself into a proof-of-work system: content can be maintained online, project pages stay indexable and contact messages are stored in the backend.",
  recruiterSignal: "Shows full-stack ownership across API design, authentication, admin UX, CMS data modeling, frontend integration and production build QA.",
  learned: "A polished portfolio should prove the same production thinking it promises: editable content, clear APIs, reliable routes and realistic workflows.",
};

const enhancements: Record<string, Partial<PortfolioProject>> = {
  rifitv: {
    status: "Live",
    categoryGroup: "Media",
    featured: true,
    technicalDifficulty: "Advanced",
    builtFor: "Football/media visitors who need fast channel and match navigation across mobile, desktop and TV-style screens.",
    whatIBuilt: [
      "Structured the Laravel/Blade content flow for channels, matches and SEO pages.",
      "Improved the frontend layout for responsive playback and fast browsing.",
      "Prepared ad-space and content areas so the platform can support monetization without clutter.",
      "Worked through Laravel/Vite production structure, Nginx routing, Cloudflare behavior and cache-aware deployment details.",
      "Organized football/media content so channel and match pages stay useful without relying on unsafe SEO claims.",
    ],
    results: "A clearer live football/media browsing experience with organized channels, match pages, responsive playback UX, SEO-safe content areas and production deployment awareness.",
    specificLine: "Solved Laravel/Vite/Nginx production issues and built a football-media interface with match pages, channel structure, live-style UI and SEO-safe content areas.",
    demoLabel: "Available",
    codeLabel: "Private repo",
    nextImprovements: ["Admin-controlled channel scheduling", "Cleaner analytics for popular content", "Better fallback states for stream/player pages", "Performance tracking for playback and content pages"],
    liveUrl: "https://rifitv.com",
  },
  erplus: {
    status: "Engineering-qualified for staging",
    categoryGroup: "Dashboard",
    featured: true,
    technicalDifficulty: "Advanced",
    builtFor: "Small businesses that need one internal place for HR, payroll-style workflows, inventory, permissions and reports.",
    whatIBuilt: [
      "Built a separated Laravel REST API and React/Vite dashboard architecture.",
      "Organized the product around HR, inventory, finance and collaboration workflows.",
      "Modelled the platform around company-scoped business operations rather than a generic dashboard.",
      "Worked through production build, asset-path and Nginx configuration concerns.",
    ],
    results: "A Laravel and React ERP foundation for structured company workflows. Staging qualification reflects engineering progress, not customer usage or a production release.",
    specificLine: "A Laravel REST API and React/Vite ERP dashboard organized around company-scoped HR, inventory, finance and collaboration workflows.",
    demoLabel: "Private",
    codeLabel: "Private repo",
    nextImprovements: ["Continue release-gate verification", "Expand audit visibility where needed", "Refine reporting and notification rules", "Document operational rollout boundaries"],
  },
  "digital-archiving-system": {
    status: "Internal",
    categoryGroup: "Automation",
    featured: true,
    technicalDifficulty: "Intermediate",
    builtFor: "Administrative teams handling scanned documents, verification, dossier tracking and repeat lookup requests.",
    whatIBuilt: [
      "Mapped manual archive steps into searchable digital workflow concepts.",
      "Created interface ideas for document status, categories, scan/upload and verification.",
      "Used Excel/VBA logic where quick automation was more practical than a full web module.",
    ],
    results: "Internal administrative digitalization work centered on document organization, metadata, filtering and repeatable tracking. No public demo is available because the workflow is confidential.",
    specificLine: "Internal administrative digitalization work using document metadata, categories, filters and repeatable archive processes.",
    demoLabel: "No public demo",
    codeLabel: "Private repo",
    nextImprovements: ["OCR-assisted search", "Role-based verification queue", "Activity history for each dossier"],
  },
  [commerceSlug]: {
    status: "Concept",
    categoryGroup: "E-commerce",
    featured: false,
    technicalDifficulty: "Intermediate",
    builtFor: "Businesses that need a product catalogue, order workflow, customer area and admin-friendly sales tracking.",
    whatIBuilt: [
      "Planned product, cart, order and client-account flows around Laravel data models.",
      "Designed admin/reporting areas for owners to manage orders and customers.",
      "Prepared a payment-ready structure without claiming a live payment integration.",
    ],
    results: "A practical commerce/client-portal blueprint for turning manual orders into a self-service customer experience.",
    specificLine: "Built commerce and portal foundations with product catalogues, orders, client areas, payment-ready structure and reporting logic.",
    demoLabel: "No public demo",
    codeLabel: "No public repository",
    nextImprovements: ["Real payment gateway integration", "Customer notifications", "Invoice/export workflow"],
  },
  "social-media-management-saas": {
    status: "Concept",
    categoryGroup: "SaaS",
    featured: false,
    technicalDifficulty: "Advanced",
    builtFor: "Agencies and small teams managing content calendars, clients, scheduled posts and simple campaign analytics.",
    whatIBuilt: [
      "Modeled SaaS-style account and workspace flows for multiple clients.",
      "Designed dashboard areas for calendar planning, scheduled posts and campaign cards.",
      "Planned roles and subscriptions-ready architecture without inventing fake production metrics.",
    ],
    results: "A believable SaaS product concept that shows dashboard design, multi-user thinking and analytics UI organization.",
    specificLine: "Planned a SaaS structure for accounts, post scheduling, analytics dashboards and multi-user workflow organization.",
    demoLabel: "No public demo",
    codeLabel: "No public repository",
    nextImprovements: ["Social API integrations", "Subscription billing module", "Approval workflow for client campaigns"],
  },
  "excel-vba-automation-tools": {
    status: "Internal",
    categoryGroup: "Automation",
    featured: false,
    technicalDifficulty: "Focused",
    builtFor: "Administrative teams that need faster forms, calculations, reports, filters and recurring tracking tables.",
    whatIBuilt: [
      "Built spreadsheet-based automation ideas around repeatable inputs and controlled outputs.",
      "Created form/report logic for reducing repetitive manual work.",
      "Connected the workflow thinking to future web dashboard possibilities.",
    ],
    results: "Practical automation that can save time quickly before a full web application is justified.",
    specificLine: "Built spreadsheet-driven automation for calculations, filters, reporting, productivity and administrative workflows.",
    demoLabel: "Private",
    codeLabel: "Private repo",
    nextImprovements: ["Move stable workflows into a web dashboard", "Add permissions and central storage", "Create export-ready reporting views"],
  },
  "portfolio-admin-system": {
    status: "Internal",
    categoryGroup: "API",
    featured: true,
    technicalDifficulty: "Advanced",
    builtFor: "A portfolio owner who needs online content control without editing code for every project, service, note or image update.",
    whatIBuilt: portfolioAdminProject.deliverables,
    results: portfolioAdminProject.impact,
    specificLine: "Private admin system for managing portfolio content, project pages, technical notes, services, skills, CV files and contact messages.",
    demoLabel: "Private",
    codeLabel: "Private repo",
    nextImprovements: ["Add richer visual editors", "Add image thumbnail generation", "Add revalidation hooks after admin updates"],
  },
};

export function canonicalProjectSlug(slug: string) {
  return commerceLegacySlugs.includes(slug) ? commerceSlug : slug;
}

function withCanonicalSlug(project: FallbackProject): FallbackProject {
  const slug = canonicalProjectSlug(project.slug);

  return {
    ...project,
    slug,
    caseStudyUrl: `/projects/${slug}`,
    seoTitle:
      slug === commerceSlug
        ? "E-commerce Client Portal Case Study | Youssef Youyou Portfolio"
        : project.seoTitle,
  };
}

export function enrichProject(project: FallbackProject): PortfolioProject {
  const canonical = withCanonicalSlug(project);
  const meta = enhancements[canonical.slug] ?? {};
  const optionalLinks = canonical as FallbackProject & { liveUrl?: string; githubUrl?: string };
  const gallery = [canonical.image, ...(meta.gallery ?? [])].filter(Boolean) as string[];

  return {
    ...canonical,
    status: meta.status ?? "Concept",
    categoryGroup: meta.categoryGroup ?? "Dashboard",
    featured: meta.featured ?? false,
    technicalDifficulty: meta.technicalDifficulty ?? "Intermediate",
    builtFor: meta.builtFor ?? canonical.targetUsers,
    whatIBuilt: meta.whatIBuilt ?? canonical.deliverables ?? canonical.features.slice(0, 4),
    results: meta.results ?? canonical.impact ?? canonical.businessValue,
    gallery,
    nextImprovements: meta.nextImprovements ?? ["Add more admin controls", "Improve reporting views", "Expand production monitoring"],
    specificLine: meta.specificLine ?? canonical.solution ?? canonical.shortDescription,
    demoLabel: meta.demoLabel ?? (meta.liveUrl || optionalLinks.liveUrl ? "Available" : "No public demo"),
    codeLabel: meta.codeLabel ?? (meta.githubUrl || optionalLinks.githubUrl ? "GitHub" : "No public repository"),
    liveUrl: meta.liveUrl ?? optionalLinks.liveUrl,
    githubUrl: meta.githubUrl ?? optionalLinks.githubUrl,
    showInProjects: meta.showInProjects ?? true,
  };
}

export function getDisplayProjects(projects: FallbackProject[]) {
  const map = new Map<string, PortfolioProject>();
  for (const project of projects) {
    const enriched = enrichProject(project);
    if (enriched.showInProjects) {
      map.set(enriched.slug, enriched);
    }
  }

  if (!map.has("portfolio-admin-system")) {
    map.set("portfolio-admin-system", enrichProject(portfolioAdminProject));
  }

  return Array.from(map.values());
}

export function getProjectFromCollection(projects: FallbackProject[], slug: string) {
  const canonical = canonicalProjectSlug(slug);
  return getDisplayProjects(projects).find((project) => project.slug === canonical) ?? null;
}
