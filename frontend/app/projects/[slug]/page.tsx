import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, BadgeCheck, BriefcaseBusiness, ChevronRight, Database, ExternalLink, GitBranch, Layers, Server, Sparkles, Target } from "lucide-react";
import { ProjectCTA, ProjectDetailPage, ProjectGallery } from "@/components/projects/ProjectDetailPage";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { getProject, getProjects } from "@/lib/api";
import { projects as fallbackProjects } from "@/lib/data";
import { canonicalProjectSlug, getDisplayProjects, type PortfolioProject } from "@/lib/project-content";
import { servicePages } from "@/lib/service-content";
import { brandedTitle } from "@/lib/site";

export function generateStaticParams() {
  const params = getDisplayProjects(fallbackProjects).map((project) => ({ slug: project.slug }));
  return [...params, { slug: "ecommerce-client-portal-systems" }];
}

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

function architectureCards(project: PortfolioProject) {
  const stackText = project.stack.join(", ");
  const dataLayer = project.slug === "erplus"
    ? "MySQL data model organized around company-scoped business modules and their operational records."
    : project.slug === "rifitv"
      ? "Laravel-managed football, channel and category content supporting discovery, schedules and player-facing routes."
      : project.slug === "digital-archiving-system"
        ? "Structured document metadata, categories, filters and record status designed for internal administrative lookup."
        : project.slug === "excel-vba-automation-tools"
          ? "Structured workbook tables supporting controlled inputs, calculations, filters and report outputs."
          : project.slug === "portfolio-admin-system"
            ? "MySQL CMS records for projects, media, posts, services, messages and CV download events."
            : "The concept data model is documented as a design exercise; no public implementation is claimed.";

  return [
    {
      title: "Frontend",
      text: stackText.includes("React")
        ? "React interface with dashboard-focused screens, reusable UI patterns and responsive layouts."
        : stackText.includes("Vue")
          ? "Vue.js interface layer for practical document/workflow access and responsive admin screens."
          : stackText.includes("Excel")
            ? "Excel forms, dashboards and report views structured around repeatable user inputs."
            : "Laravel Blade/Vite interface with responsive content views and user-friendly navigation.",
      icon: Layers,
    },
    {
      title: "Backend / Logic",
      text: stackText.includes("Excel")
        ? "VBA automation logic for calculations, filters, report generation and recurring workflows."
        : "Laravel/PHP business logic organized around clear modules, validation and maintainable workflows.",
      icon: Server,
    },
    {
      title: "Database",
      text: dataLayer,
      icon: Database,
    },
    {
      title: "Admin / Automation",
      text: "Admin-facing flows, tracking views, reports or automation patterns designed to reduce manual follow-up.",
      icon: BriefcaseBusiness,
    },
    {
      title: "Deployment",
      text: stackText.includes("Nginx") || stackText.includes("Cloudflare")
        ? "Production-aware setup with Nginx, build paths, caching and delivery considerations."
        : "Structured for practical delivery, maintenance and future production hardening.",
      icon: Sparkles,
    },
  ];
}

function relatedServiceLinks(project: PortfolioProject) {
  const text = `${project.title} ${project.category} ${project.stack.join(" ")} ${project.features.join(" ")}`.toLowerCase();
  const slugs = new Set<string>();

  if (text.includes("laravel")) slugs.add("laravel-developer-morocco");
  if (text.includes("react") || text.includes("next")) slugs.add("react-nextjs-developer-morocco");
  if (text.includes("dashboard") || text.includes("admin") || text.includes("hr") || text.includes("inventory")) slugs.add("admin-dashboard-development");
  if (text.includes("saas")) slugs.add("saas-development-morocco");
  if (text.includes("automation") || text.includes("archiving") || text.includes("excel")) slugs.add("business-automation-morocco");
  if (text.includes("e-commerce") || text.includes("client portal") || text.includes("website")) slugs.add("freelance-web-developer-morocco");
  if (!slugs.size) slugs.add("freelance-web-developer-morocco");

  return Array.from(slugs)
    .slice(0, 4)
    .map((serviceSlug) => servicePages.find((service) => service.slug === serviceSlug))
    .filter(Boolean);
}

function relatedBlogLinks(project: PortfolioProject) {
  const text = `${project.title} ${project.category} ${project.stack.join(" ")} ${project.features.join(" ")}`.toLowerCase();
  const links = new Map<string, string>();

  if (text.includes("laravel") || text.includes("api")) links.set("Laravel API + React Dashboard Architecture", "/blog/laravel-api-react-dashboard-architecture");
  if (text.includes("dashboard") || text.includes("admin")) links.set("Build Admin Dashboards with Laravel and React", "/blog/build-admin-dashboard-laravel-react");
  if (text.includes("vite") || text.includes("deployment") || text.includes("nginx")) links.set("Deploy Laravel and Next.js on Ubuntu", "/blog/deploy-laravel-nextjs-ubuntu-nginx-pm2");
  if (text.includes("seo")) links.set("SEO Checklist for Laravel and Next.js", "/blog/seo-checklist-laravel-nextjs");
  if (text.includes("automation") || text.includes("excel") || text.includes("archiving")) links.set("From Excel Automation to Web Applications", "/blog/business-automation-from-excel-to-web-app");
  if (text.includes("saas")) links.set("Laravel SaaS Project Structure", "/blog/laravel-saas-project-structure");
  if (!links.size) links.set("Cloudflare, Nginx and Laravel Deployment Errors", "/blog/cloudflare-nginx-laravel-deployment-errors");

  return Array.from(links.entries()).slice(0, 4);
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProject(canonicalProjectSlug(slug));
  const title = project?.seoTitle ?? (project ? `${project.title} Case Study | Youssef Youyou Portfolio` : "Project Case Study");
  const description = project?.seoDescription ?? project?.shortDescription ?? project?.businessValue;

  return {
    title: { absolute: brandedTitle(title) },
    description,
    alternates: { canonical: project ? `/projects/${project.slug}` : "/projects" },
    openGraph: project
      ? {
          title: brandedTitle(title),
          description,
          url: `/projects/${project.slug}`,
          type: "article",
          images: project.image
            ? [
                {
                  url: project.image,
                  width: 1600,
                  height: 1200,
                  alt: project.imageAlt ?? `${project.title} project showcase`,
                },
              ]
            : undefined,
        }
      : undefined,
    twitter: project
      ? {
          card: "summary_large_image",
          title,
          description,
          images: project.image ? [project.image] : undefined,
        }
      : undefined,
  };
}

export default async function ProjectCaseStudy({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = await getProject(canonicalProjectSlug(slug));
  if (!project) notFound();

  const allProjects = await getProjects();
  const currentIndex = allProjects.findIndex((item) => item.slug === project.slug);
  const previousProject = allProjects[(currentIndex - 1 + allProjects.length) % allProjects.length];
  const nextProject = allProjects[(currentIndex + 1) % allProjects.length];
  const relatedServices = relatedServiceLinks(project);
  const relatedBlogs = relatedBlogLinks(project);
  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": project.categoryGroup === "SaaS" || project.categoryGroup === "Dashboard" ? "SoftwareApplication" : "CreativeWork",
      name: project.title,
      url: `https://www.youssefyouyou.com/projects/${project.slug}`,
      image: project.image ? `https://www.youssefyouyou.com${project.image}` : undefined,
      description: project.seoDescription ?? project.shortDescription,
      creator: {
        "@type": "Person",
        name: "Youssef Youyou",
        url: "https://www.youssefyouyou.com",
        jobTitle: "Senior Full-Stack Web Developer",
      },
      keywords: project.stack.join(", "),
      genre: project.category,
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://www.youssefyouyou.com" },
        { "@type": "ListItem", position: 2, name: "Projects", item: "https://www.youssefyouyou.com/projects" },
        { "@type": "ListItem", position: 3, name: project.title, item: `https://www.youssefyouyou.com/projects/${project.slug}` },
      ],
    },
  ];

  return (
    <ProjectDetailPage structuredData={structuredData}>
        <header className="mb-8 flex flex-wrap items-center justify-between gap-3 rounded-3xl border border-sky-200/70 bg-white/78 p-3 shadow-xl shadow-sky-100/70 backdrop-blur-2xl dark:border-cyan-400/10 dark:bg-slate-950/70 dark:shadow-none">
          <Link href="/" className="rounded-2xl px-2 py-1 outline-none focus-visible:ring-2 focus-visible:ring-cyan-300">
            <span className="block text-sm font-black text-slate-950 dark:text-white">Youssef <span className="text-sky-600 dark:text-cyan-300">Youyou</span></span>
            <span className="block text-xs text-slate-500 dark:text-slate-400">Full-stack project proof</span>
          </Link>
          <div className="flex flex-wrap items-center gap-2">
            <Link href="/projects" className="inline-flex items-center gap-2 rounded-full border border-sky-200/80 bg-white/75 px-4 py-2 text-sm font-bold text-slate-700 transition hover:border-sky-400/50 hover:text-sky-700 dark:border-white/10 dark:bg-white/[0.04] dark:text-slate-200 dark:hover:border-cyan-300/35 dark:hover:text-cyan-100">
              <ArrowLeft size={16} /> Projects
            </Link>
            <Link href="/contact" className="hidden rounded-full bg-cyan-300 px-4 py-2 text-sm font-bold text-slate-950 transition hover:bg-white sm:inline-flex">
              Contact
            </Link>
            <ThemeToggle />
          </div>
        </header>

        <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 text-sm font-semibold text-slate-600 dark:text-slate-400">
          <Link href="/" className="hover:text-sky-700 dark:hover:text-cyan-200">Home</Link>
          <ChevronRight size={15} />
          <Link href="/projects" className="hover:text-sky-700 dark:hover:text-cyan-200">Projects</Link>
          <ChevronRight size={15} />
          <span className="text-slate-950 dark:text-white">{project.title}</span>
        </nav>

        <section className="mt-8 grid gap-8 rounded-[2rem] border border-sky-200/75 bg-white/88 p-5 shadow-2xl shadow-sky-100/80 backdrop-blur-xl dark:border-cyan-400/15 dark:bg-slate-900/58 dark:shadow-slate-950/30 md:p-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.24em] text-sky-700 dark:text-cyan-300">{project.category}</p>
            <h1 className="mt-4 text-balance text-4xl font-black tracking-tight md:text-6xl">{project.title}</h1>
            <p className="mt-3 text-base font-bold text-sky-700 dark:text-cyan-200">{project.subtitle}</p>
            <p className="mt-5 text-pretty text-lg leading-8 text-slate-700 dark:text-slate-300">{project.shortDescription}</p>
            <div className="mt-6 flex flex-wrap gap-2">
              {[project.status, project.categoryGroup, project.technicalDifficulty].map((item) => (
                <span key={item} className="rounded-full border border-sky-200/80 bg-sky-50 px-3 py-1.5 text-xs font-black uppercase tracking-[0.14em] text-sky-700 dark:border-cyan-300/15 dark:bg-cyan-300/10 dark:text-cyan-100">
                  {item}
                </span>
              ))}
            </div>
            <div className="mt-5 grid gap-2 rounded-2xl border border-sky-200/80 bg-white/78 p-4 text-xs font-bold text-slate-700 dark:border-white/10 dark:bg-white/[0.04] dark:text-slate-300 sm:grid-cols-3">
              <span>Status: <strong className="text-sky-700 dark:text-cyan-200">{project.status}</strong></span>
              <span>Demo: <strong className="text-sky-700 dark:text-cyan-200">{project.demoLabel}</strong></span>
              <span>Code: <strong className="text-sky-700 dark:text-cyan-200">{project.codeLabel}</strong></span>
            </div>
            <div className="mt-6 flex flex-wrap gap-2">
              {project.stack.map((item) => (
                <span key={item} className="rounded-full border border-sky-200/80 bg-sky-50 px-3 py-1 text-sm font-semibold text-slate-700 dark:border-white/10 dark:bg-cyan-300/10 dark:text-cyan-100">
                  {item}
                </span>
              ))}
            </div>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/projects" className="inline-flex items-center justify-center gap-2 rounded-full border border-sky-200/80 bg-white/75 px-5 py-3 text-sm font-bold text-slate-800 transition hover:border-sky-400/50 hover:text-sky-700 dark:border-white/10 dark:bg-white/[0.04] dark:text-slate-100 dark:hover:border-cyan-300/35 dark:hover:text-cyan-100">
                <ArrowLeft size={16} /> Back to projects
              </Link>
              {project.liveUrl ? (
                <a href={project.liveUrl} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-2 rounded-full border border-sky-200/80 bg-white/75 px-5 py-3 text-sm font-bold text-slate-800 transition hover:border-sky-400/50 hover:text-sky-700 dark:border-white/10 dark:bg-white/[0.04] dark:text-slate-100 dark:hover:border-cyan-300/35 dark:hover:text-cyan-100">
                  Live demo <ExternalLink size={16} />
                </a>
              ) : null}
              {project.slug === "erplus" ? (
                <a href="https://erplus.ma" target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-2 rounded-full border border-sky-200/80 bg-white/75 px-5 py-3 text-sm font-bold text-slate-800 transition hover:border-sky-400/50 hover:text-sky-700 dark:border-white/10 dark:bg-white/[0.04] dark:text-slate-100 dark:hover:border-cyan-300/35 dark:hover:text-cyan-100">
                  Open ERPlus <ExternalLink size={16} />
                </a>
              ) : null}
              {project.githubUrl ? (
                <a href={project.githubUrl} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-2 rounded-full border border-sky-200/80 bg-white/75 px-5 py-3 text-sm font-bold text-slate-800 transition hover:border-sky-400/50 hover:text-sky-700 dark:border-white/10 dark:bg-white/[0.04] dark:text-slate-100 dark:hover:border-cyan-300/35 dark:hover:text-cyan-100">
                  GitHub <GitBranch size={16} />
                </a>
              ) : null}
              <Link href="/contact" className="inline-flex items-center justify-center gap-2 rounded-full bg-cyan-300 px-5 py-3 text-sm font-bold text-slate-950 transition hover:bg-white">
                Contact me for similar project <ArrowRight size={16} />
              </Link>
            </div>
          </div>

          <div className="relative aspect-[16/10] overflow-hidden rounded-3xl border border-sky-200/80 bg-sky-50 shadow-2xl shadow-sky-200/80 dark:border-cyan-400/20 dark:bg-slate-950 dark:shadow-cyan-500/10">
            {project.image ? (
              <Image
                src={project.image}
                alt={project.imageAlt ?? `${project.title} project showcase`}
                fill
                priority
                sizes="(min-width: 1024px) 54vw, 94vw"
                className="object-cover"
              />
            ) : (
              <div className="grid h-full place-items-center p-6 text-center">
                <p className="text-3xl font-black">{project.title}</p>
              </div>
            )}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/30 via-transparent to-transparent dark:from-slate-950/50" />
            <span className="absolute left-4 top-4 rounded-full border border-white/15 bg-slate-950/70 px-3 py-1 text-[11px] font-black uppercase tracking-[0.14em] text-cyan-100 shadow-lg backdrop-blur-md">
              Case-study visual
            </span>
          </div>
        </section>

        <section className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {[
            ["Business problem", project.businessProblem, Target],
            ["Solution", project.solution, Sparkles],
            ["My role", project.myRole, BriefcaseBusiness],
            ["Built for", project.builtFor, Layers],
          ].map(([title, text, Icon]) => {
            const CardIcon = Icon as typeof Target;
            return (
              <article key={String(title)} className="rounded-3xl border border-sky-200/75 bg-white/88 p-6 shadow-xl shadow-sky-100/70 dark:border-white/10 dark:bg-white/[0.045] dark:shadow-none">
                <CardIcon className="text-sky-600 dark:text-cyan-300" />
                <h2 className="mt-4 text-lg font-black text-slate-950 dark:text-white">{String(title)}</h2>
                <p className="mt-3 text-sm leading-7 text-slate-700 dark:text-slate-300">{String(text)}</p>
              </article>
            );
          })}
        </section>

        <section className="mt-8 grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <article className="rounded-3xl border border-sky-200/75 bg-white/88 p-6 shadow-xl shadow-sky-100/70 dark:border-white/10 dark:bg-white/[0.045] dark:shadow-none md:p-8">
            <p className="text-xs font-black uppercase tracking-[0.22em] text-sky-700 dark:text-cyan-300">What I built</p>
            <h2 className="mt-3 text-2xl font-black">Personal contribution</h2>
            <ul className="mt-6 grid gap-3 text-sm text-slate-700 dark:text-slate-300">
              {project.whatIBuilt.map((item) => (
                <li key={item} className="flex gap-2">
                  <BadgeCheck className="mt-0.5 shrink-0 text-sky-600 dark:text-cyan-300" size={16} />
                  {item}
                </li>
              ))}
            </ul>
          </article>

          <article className="rounded-3xl border border-sky-200/75 bg-white/88 p-6 shadow-xl shadow-sky-100/70 dark:border-white/10 dark:bg-white/[0.045] dark:shadow-none md:p-8">
            <p className="text-xs font-black uppercase tracking-[0.22em] text-sky-700 dark:text-cyan-300">Features</p>
            <h2 className="mt-3 text-2xl font-black">What the system includes</h2>
            <ul className="mt-6 grid gap-3 text-sm text-slate-700 dark:text-slate-300 sm:grid-cols-2">
              {project.features.map((item) => (
                <li key={item} className="flex gap-2">
                  <BadgeCheck className="mt-0.5 shrink-0 text-sky-600 dark:text-cyan-300" size={16} />
                  {item}
                </li>
              ))}
            </ul>
          </article>

          <article className="rounded-3xl border border-sky-200/75 bg-white/88 p-6 shadow-xl shadow-sky-100/70 dark:border-white/10 dark:bg-white/[0.045] dark:shadow-none md:p-8 lg:col-span-2">
            <p className="text-xs font-black uppercase tracking-[0.22em] text-sky-700 dark:text-cyan-300">Architecture / Stack</p>
            <h2 className="mt-3 text-2xl font-black">How it is structured</h2>
            <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
              {architectureCards(project).map((card) => {
                const CardIcon = card.icon;
                return (
                  <div key={card.title} className="rounded-2xl border border-sky-200/80 bg-sky-50/85 p-4 dark:border-cyan-400/15 dark:bg-cyan-300/[0.055]">
                    <CardIcon className="text-sky-600 dark:text-cyan-300" size={19} />
                    <h3 className="mt-3 font-black text-slate-950 dark:text-white">{card.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-slate-700 dark:text-slate-300">{card.text}</p>
                  </div>
                );
              })}
            </div>
          </article>

          <article className="rounded-3xl border border-sky-200/75 bg-white/88 p-6 shadow-xl shadow-sky-100/70 dark:border-white/10 dark:bg-white/[0.045] dark:shadow-none md:p-8 lg:col-span-2">
            <p className="text-xs font-black uppercase tracking-[0.22em] text-sky-700 dark:text-cyan-300">Modules / Data Model</p>
            <h2 className="mt-3 text-2xl font-black">Database and feature explanation</h2>
            <p className="mt-5 text-sm leading-7 text-slate-700 dark:text-slate-300">
              The project is explained around the same parts a production system needs: core entities, user-facing flows, admin-facing controls, reporting or content areas, and the deployment layer. Where a project is a concept, the structure is presented honestly as planned architecture rather than fake production usage.
            </p>
            <div className="mt-6 grid gap-3 md:grid-cols-2">
              {(project.deliverables ?? project.features).slice(0, 6).map((item) => (
                <div key={item} className="rounded-2xl border border-sky-200/80 bg-sky-50/85 p-4 text-sm leading-7 text-slate-700 dark:border-cyan-400/15 dark:bg-cyan-300/[0.055] dark:text-slate-300">
                  <BadgeCheck className="mb-3 text-sky-600 dark:text-cyan-300" size={17} />
                  {item}
                </div>
              ))}
            </div>
          </article>

          <article className="rounded-3xl border border-sky-200/75 bg-white/88 p-6 shadow-xl shadow-sky-100/70 dark:border-white/10 dark:bg-white/[0.045] dark:shadow-none md:p-8 lg:col-span-2">
            <p className="text-xs font-black uppercase tracking-[0.22em] text-sky-700 dark:text-cyan-300">Specific Technical Work</p>
            <h2 className="mt-3 text-2xl font-black">What makes this project specific</h2>
            <p className="mt-5 text-sm leading-7 text-slate-700 dark:text-slate-300">{project.specificLine}</p>
          </article>
        </section>

        <ProjectGallery project={project} />

        <section className="mt-8 grid gap-6 lg:grid-cols-3">
          <article className="rounded-3xl border border-sky-200/75 bg-white/88 p-6 shadow-xl shadow-sky-100/70 dark:border-white/10 dark:bg-white/[0.045] dark:shadow-none md:p-8">
            <h2 className="text-2xl font-black">Technical challenges solved</h2>
            <ul className="mt-5 grid gap-3 text-sm text-slate-700 dark:text-slate-300">
              {project.problems.map((item) => (
                <li key={item} className="flex gap-2">
                  <BadgeCheck className="mt-0.5 shrink-0 text-sky-600 dark:text-cyan-300" size={16} />
                  {item}
                </li>
              ))}
            </ul>
          </article>

          <article className="rounded-3xl border border-sky-200/75 bg-white/88 p-6 shadow-xl shadow-sky-100/70 dark:border-white/10 dark:bg-white/[0.045] dark:shadow-none md:p-8">
            <h2 className="text-2xl font-black">Business value</h2>
            <p className="mt-5 text-sm leading-7 text-slate-700 dark:text-slate-300">{project.businessValue}</p>
            <p className="mt-4 text-sm leading-7 text-slate-700 dark:text-slate-300">{project.impact}</p>
          </article>

          <article className="rounded-3xl border border-sky-200/75 bg-white/88 p-6 shadow-xl shadow-sky-100/70 dark:border-white/10 dark:bg-white/[0.045] dark:shadow-none md:p-8">
            <h2 className="text-2xl font-black">What I learned</h2>
            <p className="mt-5 text-sm leading-7 text-slate-700 dark:text-slate-300">{project.learned}</p>
            <div className="mt-5 rounded-2xl border border-sky-200/80 bg-sky-50 p-4 text-sm leading-7 text-slate-700 dark:border-cyan-300/15 dark:bg-cyan-300/[0.06] dark:text-cyan-50">
              <span className="font-bold text-sky-700 dark:text-cyan-200">Recruiter signal: </span>
              {project.recruiterSignal}
            </div>
          </article>
        </section>

        <section className="mt-8 rounded-3xl border border-sky-200/75 bg-white/88 p-6 shadow-xl shadow-sky-100/70 dark:border-white/10 dark:bg-white/[0.045] dark:shadow-none md:p-8">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-sky-700 dark:text-cyan-300">Next improvements</p>
          <h2 className="mt-3 text-2xl font-black">How I would improve this next</h2>
          <div className="mt-6 grid gap-3 md:grid-cols-3">
            {project.nextImprovements.map((item) => (
              <div key={item} className="rounded-2xl border border-sky-200/80 bg-sky-50/85 p-4 text-sm leading-7 text-slate-700 dark:border-cyan-400/15 dark:bg-cyan-300/[0.055] dark:text-slate-300">
                <BadgeCheck className="mb-3 text-sky-600 dark:text-cyan-300" size={17} />
                {item}
              </div>
            ))}
          </div>
        </section>

        <section className="mt-8 rounded-3xl border border-sky-200/75 bg-white/88 p-6 shadow-xl shadow-sky-100/70 dark:border-white/10 dark:bg-white/[0.045] dark:shadow-none md:p-8">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-sky-700 dark:text-cyan-300">Related Services</p>
          <h2 className="mt-3 text-2xl font-black">Services connected to this project</h2>
          <div className="mt-6 grid gap-3 md:grid-cols-2">
            {relatedServices.map((service) => (
              <Link key={service!.slug} href={`/services/${service!.slug}`} className="inline-flex items-center justify-between gap-3 rounded-2xl border border-sky-200/80 bg-sky-50/85 p-4 text-sm font-bold text-slate-800 transition hover:border-sky-400/50 hover:text-sky-700 dark:border-cyan-400/15 dark:bg-cyan-300/[0.055] dark:text-slate-100 dark:hover:text-cyan-100">
                {service!.h1}
                <ArrowRight size={15} />
              </Link>
            ))}
          </div>
        </section>

        <section className="mt-8 rounded-3xl border border-sky-200/75 bg-white/88 p-6 shadow-xl shadow-sky-100/70 dark:border-white/10 dark:bg-white/[0.045] dark:shadow-none md:p-8">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-sky-700 dark:text-cyan-300">Related Technical Articles</p>
          <h2 className="mt-3 text-2xl font-black">Technical writing connected to this case study</h2>
          <div className="mt-6 grid gap-3 md:grid-cols-2">
            {relatedBlogs.map(([label, href]) => (
              <Link key={href} href={href} className="inline-flex items-center justify-between gap-3 rounded-2xl border border-sky-200/80 bg-sky-50/85 p-4 text-sm font-bold text-slate-800 transition hover:border-sky-400/50 hover:text-sky-700 dark:border-cyan-400/15 dark:bg-cyan-300/[0.055] dark:text-slate-100 dark:hover:text-cyan-100">
                {label}
                <ArrowRight size={15} />
              </Link>
            ))}
          </div>
        </section>

        <section className="mt-8 grid gap-4 md:grid-cols-2">
          <Link href={`/projects/${previousProject.slug}`} className="group rounded-3xl border border-sky-200/75 bg-white/88 p-5 shadow-xl shadow-sky-100/70 transition hover:-translate-y-1 hover:border-sky-400/50 dark:border-white/10 dark:bg-white/[0.045] dark:shadow-none dark:hover:border-cyan-300/35">
            <p className="text-sm font-bold text-sky-700 dark:text-cyan-200">Previous project</p>
            <h2 className="mt-2 text-xl font-black">{previousProject.title}</h2>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">{previousProject.category}</p>
          </Link>
          <Link href={`/projects/${nextProject.slug}`} className="group rounded-3xl border border-sky-200/75 bg-white/88 p-5 text-left shadow-xl shadow-sky-100/70 transition hover:-translate-y-1 hover:border-sky-400/50 dark:border-white/10 dark:bg-white/[0.045] dark:shadow-none dark:hover:border-cyan-300/35 md:text-right">
            <p className="text-sm font-bold text-sky-700 dark:text-cyan-200">Next project</p>
            <h2 className="mt-2 text-xl font-black">{nextProject.title}</h2>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">{nextProject.category}</p>
          </Link>
        </section>

        <ProjectCTA />
    </ProjectDetailPage>
  );
}
