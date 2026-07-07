"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  BookOpenText,
  CalendarDays,
  CheckCircle2,
  Code2,
  Database,
  Download,
  GitBranch,
  Globe2,
  LayoutDashboard,
  Mail,
  Network,
  Rocket,
  Search,
  Send,
  Server,
  ShieldCheck,
  Sparkles,
  Workflow,
} from "lucide-react";
import { ContactForm } from "@/components/contact-form";
import { Navbar } from "@/components/layout/Navbar";
import { Reveal } from "@/components/motion-primitives";
import { ProjectsSection } from "@/components/projects/ProjectExplorer";
import { Hero } from "@/components/sections/Hero";
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
import { getDisplayProjects } from "@/lib/project-content";
import { trackEvent } from "@/lib/analytics";

type PortfolioShellProps = {
  content?: {
    profile?: typeof fallbackProfile;
    projects?: typeof fallbackProjects;
    services?: typeof fallbackServices;
    skills?: Record<string, string[]>;
    experiences?: typeof fallbackExperiences;
    blogPosts?: typeof fallbackBlogPosts;
    stats?: typeof fallbackStats;
    timeline?: typeof fallbackTimeline;
  };
};

const SkillChart = dynamic(() => import("@/components/charts").then((mod) => mod.SkillChart), {
  ssr: false,
  loading: () => <div className="h-80 rounded-3xl border border-sky-200/70 bg-white/70 dark:border-cyan-400/15 dark:bg-slate-900/45" />,
});

const serviceIcons = [Server, Code2, LayoutDashboard, Network, Rocket, Globe2, Workflow, Search, Database, ShieldCheck];

const servicePageByTitle: Record<string, string> = {
  "Laravel backend development": "/services/laravel-developer-morocco",
  "React/Next.js frontend development": "/services/react-nextjs-developer-morocco",
  "Admin dashboards": "/services/admin-dashboard-development",
  "SaaS platforms": "/services/saas-development-morocco",
  "Internal management systems": "/services/business-automation-morocco",
  "IT support and process digitalization": "/services/business-automation-morocco",
  "Business websites": "/services/freelance-web-developer-morocco",
  "SEO technical optimization": "/services/freelance-web-developer-morocco",
  "API integrations": "/services/laravel-developer-morocco",
  "E-commerce websites": "/services/freelance-web-developer-morocco",
};

const practicalCapabilities = [
  {
    title: "Full-Stack Web Development",
    text: "Production-minded web platforms with Laravel APIs, modern frontend interfaces and database-backed features.",
    icon: Code2,
    items: ["Laravel backend", "React/Next.js frontend", "Vue.js interfaces", "REST APIs", "MySQL database structure", "Authentication", "Admin dashboards", "Responsive UI"],
  },
  {
    title: "Business Systems & Dashboards",
    text: "Internal tools that help teams manage people, inventory, clients, reporting and recurring workflows.",
    icon: LayoutDashboard,
    items: ["HR dashboards", "Inventory modules", "Client portals", "Admin panels", "Reporting interfaces", "SaaS-style structures", "Roles and permissions", "Workflow management"],
  },
  {
    title: "Deployment, SEO & Production",
    text: "The practical release layer: server setup, technical SEO, performance improvements and safer production configuration.",
    icon: Rocket,
    items: ["Ubuntu/Linux", "Nginx", "Git deployment", "Cloudflare", "Production builds", "Performance optimization", "Technical SEO", "Secure configuration"],
  },
  {
    title: "Digitalization & Automation",
    text: "Workflow improvements for teams moving from manual files and repetitive tasks toward cleaner digital processes.",
    icon: Workflow,
    items: ["Digital archiving", "Excel/VBA automation", "Document tracking", "Repetitive task reduction", "Internal workflow improvement", "IT support", "Business process improvement"],
  },
];

function SectionTitle({
  eyebrow,
  title,
  text,
  align = "center",
}: {
  eyebrow: string;
  title: string;
  text?: string;
  align?: "center" | "left";
}) {
  return (
    <Reveal className={`mb-12 max-w-4xl ${align === "center" ? "mx-auto text-center" : ""}`}>
      <p className="text-xs font-black uppercase tracking-[0.32em] text-sky-700 dark:text-cyan-300">{eyebrow}</p>
      <h2 className="mt-4 text-balance text-3xl font-black tracking-tight text-slate-950 dark:text-slate-50 md:text-5xl">{title}</h2>
      {text && <p className="mt-5 text-pretty text-base leading-8 text-slate-700 dark:text-slate-300 md:text-lg">{text}</p>}
    </Reveal>
  );
}

function PremiumCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={`group relative overflow-hidden rounded-3xl border border-sky-200/70 bg-white/85 shadow-2xl shadow-sky-100/80 backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-sky-400/45 hover:bg-white hover:shadow-sky-200/80 dark:border-cyan-400/15 dark:bg-slate-900/55 dark:shadow-slate-950/25 dark:hover:border-cyan-300/35 dark:hover:bg-slate-900/70 dark:hover:shadow-cyan-500/10 ${className}`}
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-sky-400/55 to-transparent opacity-70 dark:via-cyan-300/60" />
      <div className="pointer-events-none absolute -right-16 -top-16 h-32 w-32 rounded-full bg-sky-300/20 blur-3xl opacity-0 transition group-hover:opacity-100 dark:bg-cyan-400/10" />
      {children}
    </div>
  );
}

export default function PortfolioShell({ content }: PortfolioShellProps) {
  const profile = content?.profile ?? fallbackProfile;
  const projects = content?.projects ?? fallbackProjects;
  const services = content?.services ?? fallbackServices;
  const skills = content?.skills ?? fallbackSkills;
  const experiences = content?.experiences ?? fallbackExperiences;
  const blogPosts = content?.blogPosts ?? fallbackBlogPosts;
  const stats = content?.stats ?? fallbackStats;
  const timeline = content?.timeline ?? fallbackTimeline;
  const displayProjects = getDisplayProjects(projects);

  const highlightedServices = services.filter((service) =>
    [
      "Laravel backend development",
      "React/Next.js frontend development",
      "Admin dashboards",
      "API integrations",
      "SaaS platforms",
      "E-commerce websites",
      "Internal management systems",
      "SEO technical optimization",
      "IT support and process digitalization",
    ].includes(service.title),
  );

  return (
    <main className="min-h-screen overflow-hidden bg-slate-50 text-slate-950 dark:bg-[#020617] dark:text-slate-100">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_18%_8%,rgba(14,165,233,.14),transparent_30%),radial-gradient(circle_at_82%_0%,rgba(8,145,178,.12),transparent_34%),linear-gradient(180deg,#f8fafc,#eef6ff_42%,#f8fafc)] dark:bg-[radial-gradient(circle_at_18%_8%,rgba(34,211,238,.14),transparent_30%),radial-gradient(circle_at_82%_0%,rgba(14,165,233,.14),transparent_34%),linear-gradient(180deg,#020617,#061826_42%,#020617)]" />
      <Navbar />
      <Hero />

      <section id="proof" className="relative mx-auto max-w-7xl px-4 py-16 md:py-24">
        <SectionTitle
          eyebrow="Proof"
          title="Proof That I Can Build Real Systems"
          text="A practical proof layer for local Nador businesses, Morocco-wide clients and remote teams: production deployment thinking, Laravel APIs, dashboard workflows, automation experience and real case studies without inflated claims."
        />
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {[
            ["Production deployments", "Laravel/Next.js production builds, environment separation, cache clearing, Nginx and Cloudflare troubleshooting.", Rocket],
            ["Laravel APIs", "REST endpoints, validation, resources, authentication, policies and clean contracts for frontend dashboards.", Server],
            ["Admin dashboards", "CRUD systems, roles, reporting views, HR/inventory modules and admin-facing workflows.", LayoutDashboard],
            ["Business automation", "Excel/VBA replacement paths, document tracking, digital archiving and internal process digitalization.", Workflow],
            ["SEO structure", "Metadata, canonical URLs, sitemap, robots, JSON-LD, image alt text and internal linking.", Search],
            ["MySQL database design", "Relational data modeling for users, content, documents, inventory, HR records, portals and reports.", Database],
          ].map(([title, text, Icon]) => {
            const ProofIcon = Icon as typeof Rocket;
            return (
              <Reveal key={String(title)}>
                <PremiumCard className="h-full p-6">
                  <ProofIcon className="text-sky-600 dark:text-cyan-300" />
                  <h3 className="mt-4 text-xl font-black text-slate-950 dark:text-white">{String(title)}</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">{String(text)}</p>
                </PremiumCard>
              </Reveal>
            );
          })}
        </div>
      </section>

      <section id="stats" className="relative mx-auto max-w-7xl px-4 py-16 md:py-24">
        <SectionTitle
          eyebrow="Real Stats"
          title="Credible proof, realistic positioning"
          text="No exaggerated numbers. Just the practical signals recruiters and clients need: real project history, dashboard/API focus, deployment exposure and business-process experience."
        />
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat, index) => (
            <Reveal key={stat.label}>
              <PremiumCard className="h-full p-6">
                <p className="text-xs font-black uppercase tracking-[0.2em] text-sky-700 dark:text-cyan-300">{stat.tone}</p>
                <div className="mt-5 flex items-end gap-3">
                  <span className="text-5xl font-black tracking-tight text-slate-950 dark:text-white">{stat.value}</span>
                  <span className="mb-2 h-1.5 flex-1 rounded-full bg-sky-100 dark:bg-slate-800">
                    <span className="block h-1.5 rounded-full bg-gradient-to-r from-sky-500 to-cyan-300" style={{ width: `${76 + index * 6}%` }} />
                  </span>
                </div>
                <h3 className="mt-5 text-lg font-bold text-slate-950 dark:text-slate-50">{stat.label}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">{stat.detail}</p>
              </PremiumCard>
            </Reveal>
          ))}
        </div>
        <div className="mt-6 grid gap-6 lg:grid-cols-[1.1fr_.9fr]">
          <Reveal>
            <PremiumCard className="p-4 md:p-6">
              <div className="mb-5 flex items-center justify-between gap-4">
                <div>
                  <h3 className="text-xl font-bold text-slate-950 dark:text-white">Skill focus distribution</h3>
                  <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">Practical strengths based on CV/project experience.</p>
                </div>
                <Sparkles className="hidden text-cyan-300 sm:block" />
              </div>
              <SkillChart />
            </PremiumCard>
          </Reveal>
          <Reveal>
            <PremiumCard className="p-6">
              <h3 className="text-xl font-bold text-slate-950 dark:text-white">Career timeline</h3>
              <div className="mt-6 space-y-5">
                {timeline.map((item) => (
                  <div key={`${item.year}-${item.event}`} className="relative pl-8">
                    <span className="absolute left-0 top-1.5 h-3 w-3 rounded-full bg-cyan-300 shadow-[0_0_20px_rgba(34,211,238,.8)]" />
                    <span className="absolute left-1.5 top-5 h-[calc(100%+1rem)] w-px bg-cyan-300/20 last:hidden" />
                    <p className="text-sm font-black text-sky-700 dark:text-cyan-200">{item.year}</p>
                    <p className="mt-1 text-sm leading-6 text-slate-700 dark:text-slate-300">{item.event}</p>
                  </div>
                ))}
              </div>
            </PremiumCard>
          </Reveal>
        </div>
      </section>

      <section id="why-youssef" className="relative mx-auto max-w-7xl px-4 py-16 md:py-24">
        <SectionTitle
          eyebrow="Personal Brand"
          title="Why choose Youssef Youyou?"
          text="The positioning is proof-based: business-focused full-stack development, Laravel/React production stack, real dashboard and automation experience, and a Nador-based profile available across Morocco and remotely."
        />
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {[
            ["Business-focused developer", "I start from workflows, users and business goals before deciding the technical shape."],
            ["Laravel/React production stack", "Laravel APIs, React/Next.js interfaces, MySQL data models and production deployment practices."],
            ["Real admin/dashboard experience", "Case studies include dashboards, CMS control, HR/inventory direction, content systems and reporting flows."],
            ["Automation background", "Administrative digitalization and Excel/VBA automation experience help me spot practical improvements."],
            ["SEO and deployment mindset", "The site itself demonstrates metadata, schema, sitemap, robots, Open Graph and deployment readiness."],
            ["Based in Nador, available remote", "Focused on Nador first, Morocco authority next, and remote Laravel/React projects internationally."],
          ].map(([title, text]) => (
            <Reveal key={title}>
              <PremiumCard className="h-full p-6">
                <BadgeCheck className="text-sky-600 dark:text-cyan-300" />
                <h3 className="mt-4 text-xl font-black text-slate-950 dark:text-white">{title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">{text}</p>
              </PremiumCard>
            </Reveal>
          ))}
        </div>
      </section>

      <section id="services" className="relative mx-auto max-w-7xl px-4 py-16 md:py-24">
        <SectionTitle
          eyebrow="Services"
          title="Full-stack solutions for real business needs"
          text="From websites and dashboards to APIs and internal tools, I build practical systems that help businesses work better."
        />
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {highlightedServices.map((service, index) => {
            const Icon = serviceIcons[index % serviceIcons.length];
            return (
              <Reveal key={service.title}>
                <PremiumCard className="flex h-full flex-col p-6">
                  <div className="flex items-start justify-between gap-4">
                    <span className="grid h-12 w-12 place-items-center rounded-2xl border border-sky-200/80 bg-sky-50 text-sky-700 shadow-lg shadow-sky-200/60 dark:border-cyan-400/20 dark:bg-cyan-300/10 dark:text-cyan-200 dark:shadow-cyan-500/10">
                      <Icon size={22} />
                    </span>
                    <span className="rounded-full border border-sky-200/70 bg-sky-50 px-3 py-1 text-xs font-bold text-sky-700 dark:border-white/10 dark:bg-white/[0.05] dark:text-cyan-100">{service.tag}</span>
                  </div>
                  <h3 className="mt-6 text-xl font-black text-slate-950 dark:text-white">{service.title}</h3>
                  <p className="mt-3 flex-1 text-sm leading-7 text-slate-600 dark:text-slate-300">{service.description}</p>
                  <Link href={servicePageByTitle[service.title] ?? "/contact"} onClick={() => trackEvent("service_page_cta_click", { service: service.title })} className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-sky-700 transition group-hover:translate-x-1 dark:text-cyan-200">
                    View service <ArrowRight size={16} />
                  </Link>
                </PremiumCard>
              </Reveal>
            );
          })}
        </div>
      </section>

      <section id="build-for-you" className="relative mx-auto max-w-7xl px-4 py-16 md:py-24">
        <SectionTitle
          eyebrow="Practical Examples"
          title="What I can build for you"
          text="Clear examples for businesses that need websites, dashboards, internal tools or automation systems."
        />
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {[
            ["Business website with admin panel", "A professional website with editable services, projects, messages and SEO fields.", "Laravel + Next.js", "/services/web-developer-nador"],
            ["Booking or reservation platform", "A structured booking flow for appointments, local services, rooms or business availability.", "Laravel + React", "/contact"],
            ["HR dashboard", "Employee records, payroll direction, roles, reports and admin workflow screens.", "Laravel API + React", "/services/admin-dashboard-development"],
            ["Inventory management system", "Products, stock movement, filters, alerts, reporting and role-based access.", "Laravel + MySQL", "/services/admin-dashboard-development"],
            ["Client portal", "A secure area for clients to view documents, project status, requests and updates.", "Laravel + Next.js", "/services/freelance-web-developer-morocco"],
            ["SaaS MVP", "A focused multi-user product foundation with accounts, modules, dashboards and API structure.", "Laravel + React", "/services/saas-development-morocco"],
            ["Laravel REST API", "Clean endpoints, validation, resources, policies, auth and database-backed business logic.", "Laravel + MySQL", "/services/laravel-developer-morocco"],
            ["React/Next.js dashboard", "Responsive tables, filters, forms, cards, analytics and admin UI states.", "React + Next.js", "/services/react-nextjs-developer-morocco"],
            ["Excel/VBA replacement web app", "Move repeated spreadsheet workflows into forms, dashboards, reports and permissions.", "Laravel + React", "/services/business-automation-nador"],
            ["SEO-ready landing page", "A focused page with metadata, schema, internal links, contact CTA and fast responsive layout.", "Next.js + SEO", "/services/website-development-nador"],
          ].map(([title, description, stack, href]) => (
            <Reveal key={title}>
              <PremiumCard className="flex h-full flex-col p-5">
                <h3 className="text-lg font-black text-slate-950 dark:text-white">{title}</h3>
                <p className="mt-3 flex-1 text-sm leading-7 text-slate-600 dark:text-slate-300">{description}</p>
                <span className="mt-4 rounded-full border border-sky-200/80 bg-sky-50 px-3 py-1 text-xs font-bold text-sky-700 dark:border-cyan-300/15 dark:bg-cyan-300/10 dark:text-cyan-100">{stack}</span>
                <Link href={href} className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-sky-700 dark:text-cyan-200">
                  Open path <ArrowRight size={15} />
                </Link>
              </PremiumCard>
            </Reveal>
          ))}
        </div>
      </section>

      <section id="about" className="relative mx-auto grid max-w-7xl gap-6 px-4 py-16 md:py-24 lg:grid-cols-[1.05fr_.95fr]">
        <Reveal>
          <PremiumCard className="p-7 md:p-8">
            <p className="text-xs font-black uppercase tracking-[0.3em] text-sky-700 dark:text-cyan-300">About</p>
            <h2 className="mt-4 text-3xl font-black tracking-tight text-slate-950 dark:text-white md:text-5xl">Practical developer with business-process context</h2>
            <p className="mt-6 leading-8 text-slate-700 dark:text-slate-300">
              I am Youssef Youyou, a Senior Full-Stack Web Developer from Nador, Morocco. I focus on Laravel, React/Next.js, Vue.js, REST APIs, MySQL, dashboards, SaaS platforms, e-commerce systems and process digitalization.
            </p>
            <p className="mt-4 leading-8 text-slate-700 dark:text-slate-300">
              My background combines freelance web projects, remote React.js work with MediaTechly in London, and current administrative digitalization and IT support. That mix helps me build systems that are useful, maintainable and realistic for teams.
            </p>
          </PremiumCard>
        </Reveal>
        <div className="grid gap-5 sm:grid-cols-2">
          {[
            ["Practical problem solving", "I start from the workflow and user need, then choose the simplest reliable technical path."],
            ["Clean development", "Readable structure, reusable components, clear API contracts and maintainable database logic."],
            ["Business-focused solutions", "Dashboards, portals, SaaS tools and automation that support real operations."],
            ["Deployment mindset", "Nginx, Linux, production builds, technical SEO and environment separation."],
          ].map(([title, text]) => (
            <Reveal key={title}>
              <PremiumCard className="h-full p-6">
                <BadgeCheck className="text-sky-600 dark:text-cyan-300" />
                <h3 className="mt-4 font-bold text-slate-950 dark:text-white">{title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">{text}</p>
              </PremiumCard>
            </Reveal>
          ))}
        </div>
      </section>

      <section id="nador-trust" className="relative mx-auto max-w-7xl px-4 py-16 md:py-24">
        <Reveal>
          <PremiumCard className="grid gap-8 p-7 md:p-8 lg:grid-cols-[1fr_.9fr] lg:items-center">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.3em] text-sky-700 dark:text-cyan-300">Human Trust</p>
              <h2 className="mt-4 text-3xl font-black tracking-tight text-slate-950 dark:text-white md:text-5xl">Based in Nador, building for Morocco and remote clients</h2>
              <p className="mt-6 leading-8 text-slate-700 dark:text-slate-300">
                I am Youssef Youyou, a full-stack developer from Nador, Morocco. My work combines Laravel/React development, administrative digitalization experience, automation thinking and production deployment practice. I focus on practical systems that solve real workflow problems, not only beautiful interfaces.
              </p>
            </div>
            <div className="grid gap-3">
              {[
                "Based in Nador, Morocco",
                "Available for freelance and remote projects",
                "Comfortable with business dashboards and internal tools",
                "Experience with administrative workflows and digitalization",
                "Focused on clean delivery and realistic scope",
              ].map((item) => (
                <div key={item} className="flex gap-3 rounded-2xl border border-sky-200/80 bg-sky-50/85 p-4 text-sm font-semibold text-slate-700 dark:border-cyan-400/15 dark:bg-cyan-300/[0.055] dark:text-slate-200">
                  <BadgeCheck className="mt-0.5 shrink-0 text-sky-600 dark:text-cyan-300" size={16} />
                  {item}
                </div>
              ))}
            </div>
          </PremiumCard>
        </Reveal>
      </section>

      <section id="skills" className="relative mx-auto max-w-7xl px-4 py-16 md:py-24">
        <SectionTitle
          eyebrow="Skills"
          title="Focused stack, practical supporting tools"
          text="A credible full-stack toolkit for Laravel backends, React/Next.js interfaces, dashboards, APIs, databases and deployment."
        />
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {Object.entries(skills).map(([category, items]) => (
            <Reveal key={category}>
              <PremiumCard className="h-full p-6">
                <h3 className="font-black text-sky-800 dark:text-cyan-100">{category}</h3>
                <div className="mt-5 flex flex-wrap gap-2">
                  {items.map((skill) => (
                    <span key={skill} className="rounded-full border border-sky-200/75 bg-sky-50 px-3 py-1.5 text-sm font-medium text-slate-700 dark:border-white/10 dark:bg-white/[0.05] dark:text-slate-200">
                      {skill}
                    </span>
                  ))}
                </div>
              </PremiumCard>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="relative mx-auto max-w-7xl px-4 py-16 md:py-24">
        <SectionTitle
          eyebrow="Architecture Preview"
          title="API-driven structure with admin-editable content"
          text="The portfolio itself demonstrates the kind of structure clients need: editable content, clean endpoints, tracked actions, SEO routes and deployment-ready configuration."
        />
        <Reveal>
          <PremiumCard className="p-5 md:p-8">
            <div className="grid gap-4 lg:grid-cols-4">
              {[
                ["Next.js Frontend", "SEO pages, fast UI, contact form and motion layer.", Code2],
                ["Laravel REST API", "Resources, Form Requests, rate limits and clean endpoints.", Server],
                ["MySQL Database", "Projects, skills, posts, messages and CV download events.", Database],
                ["Content Admin", "Editable portfolio content, messages, settings and dashboard widgets.", LayoutDashboard],
              ].map(([title, text, Icon], index) => {
                const CardIcon = Icon as typeof LayoutDashboard;
                return (
                  <div key={String(title)} className="relative">
                    {index < 3 && (
                      <span className="absolute -right-4 top-1/2 z-10 hidden h-px w-8 bg-gradient-to-r from-sky-400 to-cyan-300 lg:block" />
                    )}
                    <div className="h-full rounded-2xl border border-sky-200/75 bg-sky-50/80 p-5 shadow-lg shadow-sky-100/70 dark:border-cyan-400/15 dark:bg-slate-950/50 dark:shadow-none">
                      <span className="grid h-11 w-11 place-items-center rounded-2xl bg-white text-sky-700 shadow-sm dark:bg-cyan-300/10 dark:text-cyan-200">
                        <CardIcon size={21} />
                      </span>
                      <h3 className="mt-5 text-lg font-black text-slate-950 dark:text-white">{String(title)}</h3>
                      <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">{String(text)}</p>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {[
                ["Projects API", "Case study content and stack data."],
                ["Contact API", "Validated project inquiries with rate limits."],
                ["Content Dashboard", "Editable portfolio content and message review workflow."],
                ["CV Download Tracking", "Download events prepared for admin reporting."],
              ].map(([title, text]) => (
                <div
                  key={title}
                  className="rounded-2xl border border-sky-200/75 bg-white/75 p-4 dark:border-white/10 dark:bg-white/[0.04]"
                >
                  <p className="text-sm font-black text-sky-800 dark:text-cyan-100">{title}</p>
                  <p className="mt-2 text-xs leading-5 text-slate-600 dark:text-slate-400">{text}</p>
                </div>
              ))}
            </div>
          </PremiumCard>
        </Reveal>
      </section>

      <section id="projects" className="relative mx-auto max-w-7xl px-4 py-16 md:py-24">
        <SectionTitle
          eyebrow="Selected Work"
          title="Projects built to solve real business problems"
          text="A selection of platforms, dashboards, automation tools and web systems built with Laravel, React, Next.js, APIs and deployment-ready architecture."
        />
        <ProjectsSection projects={displayProjects} />
      </section>

      <section id="experience" className="relative mx-auto max-w-6xl px-4 py-16 md:py-24">
        <SectionTitle
          eyebrow="Experience"
          title="Practical delivery across freelance, remote and internal digitalization"
          text="A timeline that connects development work with real operational support and workflow improvement."
        />
        <div className="relative mx-auto max-w-4xl">
          <div className="absolute left-4 top-0 hidden h-full w-px bg-gradient-to-b from-cyan-300/60 via-cyan-300/20 to-transparent md:block" />
          <div className="space-y-6">
            {experiences.map((experience) => (
              <Reveal key={experience.role}>
                <div className="relative md:pl-12">
                  <span className="absolute left-[11px] top-8 hidden h-3 w-3 rounded-full bg-cyan-300 shadow-[0_0_20px_rgba(34,211,238,.9)] md:block" />
                  <PremiumCard className="p-6">
                    <div className="flex flex-wrap items-start justify-between gap-4">
                      <div>
                        <h3 className="text-xl font-black text-slate-950 dark:text-white">{experience.role}</h3>
                        {experience.company && <p className="mt-1 font-semibold text-sky-700 dark:text-cyan-200">{experience.company}</p>}
                      </div>
                      <span className="inline-flex items-center gap-2 rounded-full border border-sky-200/80 bg-sky-50 px-3 py-1 text-xs font-bold text-sky-700 dark:border-cyan-400/15 dark:bg-cyan-300/10 dark:text-cyan-100">
                        <CalendarDays size={14} /> {experience.date}
                      </span>
                    </div>
                    <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">{experience.location}</p>
                    <ul className="mt-5 grid gap-2 text-sm leading-6 text-slate-700 dark:text-slate-300">
                      {experience.points.map((point) => (
                        <li key={point} className="flex gap-2">
                          <CheckCircle2 className="mt-0.5 shrink-0 text-sky-600 dark:text-cyan-300" size={16} />
                          {point}
                        </li>
                      ))}
                    </ul>
                  </PremiumCard>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="capabilities" className="relative mx-auto max-w-7xl px-4 py-16 md:py-24">
        <SectionTitle
          eyebrow="Practical Capabilities"
          title="Skills, tools & practical capabilities"
          text="A focused set of technologies and practical skills I use to build business websites, dashboards, APIs, internal tools and production-ready web platforms."
        />
        <div className="grid gap-5 lg:grid-cols-2">
          {practicalCapabilities.map((capability) => {
            const Icon = capability.icon;
            return (
              <Reveal key={capability.title}>
                <PremiumCard className="h-full p-6 md:p-7">
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <span className="grid h-13 w-13 place-items-center rounded-2xl border border-sky-200/80 bg-sky-50 text-sky-700 shadow-lg shadow-sky-100/70 dark:border-cyan-400/20 dark:bg-cyan-300/10 dark:text-cyan-200 dark:shadow-cyan-500/10">
                      <Icon size={24} />
                    </span>
                    <span className="rounded-full border border-sky-200/80 bg-white/80 px-3 py-1 text-xs font-black uppercase tracking-[0.16em] text-sky-700 dark:border-white/10 dark:bg-white/[0.05] dark:text-cyan-100">
                      Deliverables
                    </span>
                  </div>
                  <h3 className="mt-6 text-2xl font-black text-slate-950 dark:text-white">{capability.title}</h3>
                  <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600 dark:text-slate-300">{capability.text}</p>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {capability.items.map((item) => (
                      <span
                        key={item}
                        className="rounded-full border border-sky-200/80 bg-sky-50 px-3 py-1.5 text-xs font-semibold text-slate-700 dark:border-white/10 dark:bg-white/[0.05] dark:text-slate-200"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </PremiumCard>
              </Reveal>
            );
          })}
        </div>
      </section>

      <section id="blog" className="relative mx-auto max-w-7xl px-4 py-16 md:py-24">
        <SectionTitle
          eyebrow="Technical Notes"
          title="Technical writing that supports trust"
          text="Practical articles about Laravel, React, Next.js, dashboards, SaaS structure, deployment, Vite production fixes, SEO and business automation."
        />
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {blogPosts.map((post) => (
            <Reveal key={post.slug}>
              <PremiumCard className="h-full p-5">
                <div className="flex items-center justify-between gap-3">
                  <BookOpenText className="text-sky-600 dark:text-cyan-300" size={20} />
                  <span className="rounded-full border border-sky-200/75 bg-sky-50 px-3 py-1 text-[11px] font-black uppercase tracking-[0.14em] text-sky-700 dark:border-white/10 dark:bg-white/[0.05] dark:text-cyan-100">
                    {post.category}
                  </span>
                </div>
                <h3 className="mt-4 font-black text-slate-950 dark:text-white">{post.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">{post.excerpt}</p>
                <Link className="mt-5 inline-flex text-sm font-bold text-sky-700 dark:text-cyan-200" href={`/blog/${post.slug}`}>
                  Read article
                </Link>
              </PremiumCard>
            </Reveal>
          ))}
        </div>
      </section>

      <section id="references" className="relative mx-auto max-w-7xl px-4 py-16 md:py-24">
        <SectionTitle
          eyebrow="References"
          title="References & Feedback"
          text="Client trust matters, and it should be handled honestly. Public testimonials will only appear here when permission is clear."
        />
        <Reveal>
          <PremiumCard className="mx-auto max-w-3xl p-8 text-center">
            <BadgeCheck className="mx-auto text-sky-600 dark:text-cyan-300" />
            <h3 className="mt-4 text-2xl font-black text-slate-950 dark:text-white">Real testimonials will be added after client permission.</h3>
            <p className="mt-4 text-sm leading-7 text-slate-600 dark:text-slate-300">
              Until then, the portfolio relies on case studies, technical writing, project structure, deployment notes and visible proof sections instead of invented reviews.
            </p>
          </PremiumCard>
        </Reveal>
      </section>

      <section id="contact" className="relative mx-auto grid max-w-7xl gap-8 px-4 py-16 md:py-24 lg:grid-cols-[.9fr_1.1fr]">
        <Reveal>
          <p className="text-xs font-black uppercase tracking-[0.3em] text-sky-700 dark:text-cyan-300">Contact</p>
          <h2 className="mt-4 text-4xl font-black tracking-tight text-slate-950 dark:text-white md:text-5xl">Need a Laravel, React or Next.js developer for your business platform?</h2>
          <p className="mt-6 text-lg leading-8 text-slate-700 dark:text-slate-300">
            Send me your business goal, current problem and ideal timeline. I will help turn it into a realistic technical scope.
          </p>
          <div className="mt-8 grid gap-3">
            {[
              "Best fit: Laravel APIs, React/Next.js frontends, admin dashboards and internal tools.",
              "Available for freelance, remote and business web projects in Morocco and internationally.",
              "Realistic scope, clean implementation and production-minded delivery.",
            ].map((item) => (
              <PremiumCard key={item} className="flex gap-3 p-4 text-sm leading-6 text-slate-700 dark:text-slate-300">
                <BadgeCheck className="mt-0.5 shrink-0 text-sky-600 dark:text-cyan-300" size={16} />
                <span>{item}</span>
              </PremiumCard>
            ))}
          </div>
          <div className="mt-8 grid gap-3 text-sm text-slate-700 dark:text-slate-300 sm:grid-cols-2">
            {[
              [Mail, "Email", `mailto:${profile.email}`],
              [Send, "WhatsApp on request", `mailto:${profile.email}?subject=WhatsApp%20contact%20request`],
              [GitBranch, "GitHub", profile.github],
              [Network, "LinkedIn", profile.linkedin],
            ].map(([Icon, label, href]) => {
              const ContactIcon = Icon as typeof Mail;
              return (
                <a
                  key={String(label)}
                  onClick={() => String(label) === "GitHub" || String(label) === "LinkedIn" ? trackEvent("external_profile_click", { profile: String(label) }) : undefined}
                  className="inline-flex items-center gap-3 rounded-2xl border border-sky-200/80 bg-white/75 p-4 font-semibold shadow-lg shadow-sky-100/60 transition hover:border-sky-400/50 hover:text-sky-700 dark:border-white/10 dark:bg-white/[0.04] dark:shadow-none dark:hover:border-cyan-300/30 dark:hover:text-cyan-100"
                  href={String(href)}
                >
                  <ContactIcon className="text-sky-600 dark:text-cyan-300" /> {String(label)}
                </a>
              );
            })}
          </div>
        </Reveal>
        <Reveal>
          <ContactForm />
        </Reveal>
      </section>

      <footer className="relative border-t border-sky-200/80 bg-gradient-to-b from-white to-sky-50 px-4 py-12 dark:border-cyan-400/10 dark:from-[#020617] dark:to-[#061826]">
        <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-[1.2fr_.8fr_.8fr_.8fr]">
          <div>
            <h2 className="text-2xl font-black text-slate-950 dark:text-white">Youssef <span className="text-sky-600 dark:text-cyan-300">Youyou</span></h2>
            <p className="mt-3 max-w-sm text-sm leading-7 text-slate-600 dark:text-slate-400">
              Senior Full-Stack Web Developer building Laravel, React/Next.js, APIs, dashboards and production-ready web platforms.
            </p>
            <a href={`mailto:${profile.email}`} className="mt-4 inline-flex text-sm font-bold text-sky-700 dark:text-cyan-200">{profile.email}</a>
          </div>
          <div>
            <h3 className="font-bold text-slate-950 dark:text-white">Quick links</h3>
            <div className="mt-4 grid gap-3 text-sm text-slate-600 dark:text-slate-400">
              <a href="/#services" className="hover:text-sky-700 dark:hover:text-cyan-200">Services</a>
              <a href="/projects" className="hover:text-sky-700 dark:hover:text-cyan-200">Projects</a>
              <a href="/#experience" className="hover:text-sky-700 dark:hover:text-cyan-200">Experience</a>
              <a href="/blog" className="hover:text-sky-700 dark:hover:text-cyan-200">Blog/Technical Notes</a>
              <a href="/contact" className="hover:text-sky-700 dark:hover:text-cyan-200">Contact</a>
              <a href="/work-with-me" className="hover:text-sky-700 dark:hover:text-cyan-200">Work With Me</a>
              <a href="/nador-full-stack-developer" className="hover:text-sky-700 dark:hover:text-cyan-200">Full-Stack Developer in Nador</a>
              <a href="/morocco-full-stack-developer" className="hover:text-sky-700 dark:hover:text-cyan-200">Full-Stack Developer Morocco</a>
              <a href={profile.github} className="hover:text-sky-700 dark:hover:text-cyan-200">GitHub</a>
              <a href={profile.linkedin} className="hover:text-sky-700 dark:hover:text-cyan-200">LinkedIn</a>
            </div>
          </div>
          <div>
            <h3 className="font-bold text-slate-950 dark:text-white">Services</h3>
            <div className="mt-4 grid gap-3 text-sm text-slate-600 dark:text-slate-400">
              <a href="/services/laravel-developer-morocco" className="hover:text-sky-700 dark:hover:text-cyan-200">Laravel APIs</a>
              <a href="/services/react-nextjs-developer-morocco" className="hover:text-sky-700 dark:hover:text-cyan-200">React/Next.js</a>
              <a href="/services/admin-dashboard-development" className="hover:text-sky-700 dark:hover:text-cyan-200">Dashboards</a>
              <a href="/services/saas-development-morocco" className="hover:text-sky-700 dark:hover:text-cyan-200">SaaS Platforms</a>
              <a href="/services/web-developer-nador" className="hover:text-sky-700 dark:hover:text-cyan-200">Web Developer in Nador</a>
              <a href="/services/laravel-developer-nador" className="hover:text-sky-700 dark:hover:text-cyan-200">Laravel Developer Nador</a>
              <a href="/services/business-automation-morocco" className="hover:text-sky-700 dark:hover:text-cyan-200">Business Automation Morocco</a>
            </div>
          </div>
          <div>
            <h3 className="font-bold text-slate-950 dark:text-white">Actions</h3>
            <div className="mt-4 grid gap-3 text-sm text-slate-600 dark:text-slate-400">
              <a href="/cv-download" className="inline-flex items-center gap-2 hover:text-sky-700 dark:hover:text-cyan-200"><Download size={15} /> Download CV</a>
              <a href="#contact" className="inline-flex items-center gap-2 hover:text-sky-700 dark:hover:text-cyan-200"><Send size={15} /> Contact</a>
              <a href="#" className="hover:text-sky-700 dark:hover:text-cyan-200">Back to top</a>
            </div>
          </div>
        </div>
        <div className="mx-auto mt-10 flex max-w-7xl flex-wrap items-center justify-between gap-3 border-t border-sky-200/80 pt-6 text-sm text-slate-500 dark:border-white/10">
          <span>Copyright 2026 Youssef Youyou. All rights reserved.</span>
          <span>youssefyouyou.com</span>
        </div>
      </footer>
    </main>
  );
}
