"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
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
import { FloatingEngagement } from "@/components/navigation/FloatingEngagement";
import { SectionNavigator } from "@/components/navigation/SectionNavigator";
import { ProjectsSection } from "@/components/projects/ProjectExplorer";
import { Hero } from "@/components/sections/Hero";
import { ClayIcon } from "@/components/ui/ClayIcon";
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
  loading: () => <div className="h-80 rounded-3xl border border-white/70 bg-white/70 dark:border-white/10 dark:bg-white/[0.06]" />,
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
      <p className="text-xs font-black uppercase tracking-[0.32em] text-[#8B5CF6] dark:text-violet-200">{eyebrow}</p>
      <h2 className="mt-4 text-balance text-3xl font-black tracking-tight text-slate-950 dark:text-slate-50 md:text-5xl">
        <span className="premium-gradient-text">{title}</span>
      </h2>
      {text && <p className="mt-5 text-pretty text-base leading-8 text-slate-700 dark:text-slate-300 md:text-lg">{text}</p>}
    </Reveal>
  );
}

function PremiumCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={`group relative overflow-hidden rounded-3xl border border-white/70 bg-white/78 shadow-[0_22px_70px_rgba(108,99,255,.12),inset_0_1px_0_rgba(255,255,255,.82)] backdrop-blur-2xl transition duration-300 hover:-translate-y-1.5 hover:rotate-[.35deg] hover:border-[#8B5CF6]/45 hover:bg-white hover:shadow-[0_28px_90px_rgba(244,63,142,.13)] dark:border-white/10 dark:bg-white/[0.065] dark:shadow-slate-950/25 dark:hover:border-[#F43F8E]/35 dark:hover:bg-white/[0.09] ${className}`}
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#F43F8E]/55 to-transparent opacity-70" />
      <div className="pointer-events-none absolute -right-16 -top-16 h-32 w-32 rounded-full bg-[#F43F8E]/16 blur-3xl opacity-0 transition group-hover:opacity-100" />
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
    <main className="min-h-screen overflow-hidden bg-[#FAFAFC] text-[#111827] dark:bg-[#0F172A] dark:text-slate-100">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_18%_8%,rgba(108,99,255,.13),transparent_30%),radial-gradient(circle_at_82%_0%,rgba(244,63,142,.11),transparent_34%),linear-gradient(180deg,#FAFAFC,#f7f3ff_42%,#FAFAFC)] dark:bg-[radial-gradient(circle_at_18%_8%,rgba(108,99,255,.18),transparent_30%),radial-gradient(circle_at_82%_0%,rgba(244,63,142,.14),transparent_34%),linear-gradient(180deg,#0F172A,#111827_42%,#0F172A)]" />
      <Navbar />
      <Hero />
      <SectionNavigator />
      <FloatingEngagement />

      <section id="quick-path" className="relative mx-auto max-w-7xl px-4 py-16 md:py-20">
        <SectionTitle
          eyebrow="Choose Your Path"
          title="Pick the fastest way to explore"
          text="Start with the path that matches your current need: website, dashboard, full-stack delivery, proof or a project estimate."
        />
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
          {[
            ["I need a business website", "View website services", "/services/website-development-nador", Globe2],
            ["I need a dashboard or internal tool", "View dashboard work", "/services/admin-dashboard-development", LayoutDashboard],
            ["I need a Laravel/React developer", "View full-stack services", "/services/laravel-developer-morocco", Code2],
            ["I want to see proof first", "View case studies", "#projects", BadgeCheck],
            ["I want a project estimate", "Request estimate", "/work-with-me", Send],
          ].map(([title, cta, href, Icon], index) => {
            const PathIcon = Icon as typeof Globe2;
            return (
              <Reveal key={String(title)}>
                <PremiumCard className="flex h-full flex-col p-5">
                  <ClayIcon icon={PathIcon} size="sm" tone={index % 2 === 0 ? "primary" : "accent"} />
                  <h3 className="mt-4 flex-1 text-lg font-black leading-snug text-slate-950 dark:text-white">{String(title)}</h3>
                  <Link
                    href={String(href)}
                    onClick={() => trackEvent("service_page_cta_click", { source: String(title) })}
                    className="mt-5 inline-flex min-h-11 items-center gap-2 rounded-full border border-white/70 bg-white/75 px-4 text-sm font-black text-[#6C63FF] transition hover:border-[#8B5CF6]/45 hover:bg-violet-50 dark:border-white/10 dark:bg-white/[0.04] dark:text-violet-100 dark:hover:border-pink-300/35"
                  >
                    {String(cta)} <ArrowRight size={15} />
                  </Link>
                </PremiumCard>
              </Reveal>
            );
          })}
        </div>
      </section>

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
          ].map(([title, text, Icon], index) => {
            const ProofIcon = Icon as typeof Rocket;
            return (
              <Reveal key={String(title)}>
                <PremiumCard className="h-full p-6">
                  <ClayIcon icon={ProofIcon} tone={index % 2 === 0 ? "violet" : "mint"} />
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
                <p className="text-xs font-black uppercase tracking-[0.2em] text-[#8B5CF6] dark:text-violet-200">{stat.tone}</p>
                <div className="mt-5 flex items-end gap-3">
                  <span className="text-5xl font-black tracking-tight text-slate-950 dark:text-white">{stat.value}</span>
                  <span className="mb-2 h-1.5 flex-1 rounded-full bg-violet-100 dark:bg-slate-800">
                    <span className="block h-1.5 rounded-full bg-gradient-to-r from-[#6C63FF] to-[#F43F8E]" style={{ width: `${76 + index * 6}%` }} />
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
                <Sparkles className="hidden text-[#F43F8E] sm:block" />
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
                    <span className="absolute left-0 top-1.5 h-3 w-3 rounded-full bg-[#F43F8E] shadow-[0_0_20px_rgba(34,211,238,.8)]" />
                    <span className="absolute left-1.5 top-5 h-[calc(100%+1rem)] w-px bg-[#F43F8E]/20 last:hidden" />
                    <p className="text-sm font-black text-[#6C63FF] dark:text-violet-200">{item.year}</p>
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
                <ClayIcon icon={BadgeCheck} tone="primary" />
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
                    <ClayIcon icon={Icon} tone={index % 3 === 0 ? "primary" : index % 3 === 1 ? "accent" : "violet"} />
                    <span className="rounded-full border border-violet-200/60 bg-violet-50 px-3 py-1 text-xs font-bold text-[#6C63FF] dark:border-white/10 dark:bg-white/[0.05] dark:text-violet-100">{service.tag}</span>
                  </div>
                  <h3 className="mt-6 text-xl font-black text-slate-950 dark:text-white">{service.title}</h3>
                  <p className="mt-3 flex-1 text-sm leading-7 text-slate-600 dark:text-slate-300">{service.description}</p>
                  <Link href={servicePageByTitle[service.title] ?? "/contact"} onClick={() => trackEvent("service_page_cta_click", { service: service.title })} className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-[#6C63FF] transition group-hover:translate-x-1 dark:text-violet-200">
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
            ["Business website with admin panel", "local businesses, agencies, service providers", "Laravel + Next.js", "Editable pages, contact forms, SEO structure", "/services/web-developer-nador", "View Service"],
            ["Booking or reservation platform", "transport, appointments, rooms, services", "Laravel API + React", "Booking flow, admin dashboard, notifications", "/contact", "Plan This"],
            ["HR dashboard", "teams managing employees and payroll direction", "Laravel API + React", "Records, roles, reports and HR screens", "/services/admin-dashboard-development", "Build This"],
            ["Inventory management system", "stores, warehouses and internal operations", "Laravel + MySQL", "Stock movement, filters, alerts and reports", "/services/admin-dashboard-development", "Build This"],
            ["Client portal", "service providers and B2B teams", "Laravel + Next.js", "Secure client area, requests and updates", "/services/freelance-web-developer-morocco", "Explore Option"],
            ["SaaS MVP", "founders testing a focused product", "Laravel + React", "Accounts, modules, dashboard and API structure", "/services/saas-development-morocco", "Plan This"],
            ["Laravel REST API", "apps that need clean backend contracts", "Laravel + MySQL", "Endpoints, validation, auth and policies", "/services/laravel-developer-morocco", "View Service"],
            ["React/Next.js dashboard", "teams that need responsive admin screens", "React + Next.js", "Tables, filters, forms, cards and states", "/services/react-nextjs-developer-morocco", "View Service"],
            ["Excel/VBA replacement web app", "administrative teams with repeated files", "Laravel + React", "Forms, dashboards, reports and permissions", "/services/business-automation-nador", "Plan This"],
            ["SEO-ready landing page", "businesses that need focused local leads", "Next.js + SEO", "Metadata, schema, internal links and CTA", "/services/website-development-nador", "View Service"],
          ].map(([title, bestFor, stack, output, href, cta]) => (
            <Reveal key={title}>
              <PremiumCard className="flex h-full flex-col p-5">
                <h3 className="text-lg font-black text-slate-950 dark:text-white">{title}</h3>
                <div className="mt-4 grid flex-1 gap-3 text-sm leading-6 text-slate-600 dark:text-slate-300">
                  <p><span className="font-black text-slate-900 dark:text-violet-100">Best for:</span> {bestFor}</p>
                  <p><span className="font-black text-slate-900 dark:text-violet-100">Output:</span> {output}</p>
                </div>
                <span className="mt-4 rounded-full border border-violet-200/60 bg-violet-50 px-3 py-1 text-xs font-bold text-[#6C63FF] dark:border-pink-300/15 dark:bg-[#F43F8E]/10 dark:text-violet-100">Stack: {stack}</span>
                <Link href={href} className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-[#6C63FF] dark:text-violet-200">
                  {cta} <ArrowRight size={15} />
                </Link>
              </PremiumCard>
            </Reveal>
          ))}
        </div>
      </section>

      <section id="about" className="relative mx-auto grid max-w-7xl gap-6 px-4 py-16 md:py-24 lg:grid-cols-[1.05fr_.95fr]">
        <Reveal>
          <PremiumCard className="grid h-full place-items-center p-5 md:p-8">
            <div className="relative aspect-square w-full max-w-[520px]">
              <div className="absolute inset-8 rounded-full bg-gradient-to-br from-[#6C63FF]/25 to-[#F43F8E]/22 blur-3xl" />
              <Image
                src="/images/hex-badges.png"
                alt="3D clay badges representing growth, launch and contact"
                fill
                sizes="(min-width: 1024px) 42vw, 92vw"
                className="relative object-contain drop-shadow-[0_30px_45px_rgba(108,99,255,.22)]"
              />
            </div>
          </PremiumCard>
        </Reveal>
        <div className="grid gap-5">
          <Reveal>
            <PremiumCard className="p-7 md:p-8">
              <p className="text-xs font-black uppercase tracking-[0.3em] text-[#8B5CF6] dark:text-violet-200">About</p>
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
                <ClayIcon icon={BadgeCheck} tone="accent" />
                <h3 className="mt-4 font-bold text-slate-950 dark:text-white">{title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">{text}</p>
              </PremiumCard>
            </Reveal>
          ))}
          </div>
        </div>
      </section>

      <section id="nador-trust" className="relative mx-auto max-w-7xl px-4 py-16 md:py-24">
        <Reveal>
          <PremiumCard className="grid gap-8 p-7 md:p-8 lg:grid-cols-[1fr_.9fr] lg:items-center">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.3em] text-[#8B5CF6] dark:text-violet-200">Human Trust</p>
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
                <div key={item} className="flex gap-3 rounded-2xl border border-violet-200/60 bg-violet-50/85 p-4 text-sm font-semibold text-slate-700 dark:border-white/10 dark:bg-[#F43F8E]/[0.055] dark:text-slate-200">
                  <BadgeCheck className="mt-0.5 shrink-0 text-[#6C63FF] dark:text-violet-200" size={16} />
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
                <h3 className="font-black text-[#6C63FF] dark:text-violet-100">{category}</h3>
                <div className="mt-5 flex flex-wrap gap-2">
                  {items.map((skill) => (
                    <span key={skill} className="rounded-full border border-violet-200/60 bg-violet-50 px-3 py-1.5 text-sm font-medium text-slate-700 dark:border-white/10 dark:bg-white/[0.05] dark:text-slate-200">
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
                      <span className="absolute -right-4 top-1/2 z-10 hidden h-px w-8 bg-gradient-to-r from-[#6C63FF] to-[#F43F8E] lg:block" />
                    )}
                    <div className="h-full rounded-2xl border border-violet-200/60 bg-violet-50/80 p-5 shadow-lg shadow-violet-100/70 dark:border-white/10 dark:bg-slate-950/50 dark:shadow-none">
                      <ClayIcon icon={CardIcon} size="sm" tone={index % 2 === 0 ? "primary" : "mint"} />
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
                  className="rounded-2xl border border-white/70 bg-white/75 p-4 dark:border-white/10 dark:bg-white/[0.04]"
                >
                  <p className="text-sm font-black text-[#6C63FF] dark:text-violet-100">{title}</p>
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
          <div className="absolute left-4 top-0 hidden h-full w-px bg-gradient-to-b from-[#F43F8E]/60 via-[#F43F8E]/20 to-transparent md:block" />
          <div className="space-y-6">
            {experiences.map((experience) => (
              <Reveal key={experience.role}>
                <div className="relative md:pl-12">
                  <span className="absolute left-[11px] top-8 hidden h-3 w-3 rounded-full bg-[#F43F8E] shadow-[0_0_20px_rgba(34,211,238,.9)] md:block" />
                  <PremiumCard className="p-6">
                    <div className="flex flex-wrap items-start justify-between gap-4">
                      <div>
                        <h3 className="text-xl font-black text-slate-950 dark:text-white">{experience.role}</h3>
                        {experience.company && <p className="mt-1 font-semibold text-[#6C63FF] dark:text-violet-200">{experience.company}</p>}
                      </div>
                      <span className="inline-flex items-center gap-2 rounded-full border border-violet-200/60 bg-violet-50 px-3 py-1 text-xs font-bold text-[#6C63FF] dark:border-white/10 dark:bg-[#F43F8E]/10 dark:text-violet-100">
                        <CalendarDays size={14} /> {experience.date}
                      </span>
                    </div>
                    <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">{experience.location}</p>
                    <ul className="mt-5 grid gap-2 text-sm leading-6 text-slate-700 dark:text-slate-300">
                      {experience.points.map((point) => (
                        <li key={point} className="flex gap-2">
                          <CheckCircle2 className="mt-0.5 shrink-0 text-[#6C63FF] dark:text-violet-200" size={16} />
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
                    <ClayIcon icon={Icon} tone="violet" />
                    <span className="rounded-full border border-white/70 bg-white/80 px-3 py-1 text-xs font-black uppercase tracking-[0.16em] text-[#6C63FF] dark:border-white/10 dark:bg-white/[0.05] dark:text-violet-100">
                      Deliverables
                    </span>
                  </div>
                  <h3 className="mt-6 text-2xl font-black text-slate-950 dark:text-white">{capability.title}</h3>
                  <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600 dark:text-slate-300">{capability.text}</p>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {capability.items.map((item) => (
                      <span
                        key={item}
                        className="rounded-full border border-violet-200/60 bg-violet-50 px-3 py-1.5 text-xs font-semibold text-slate-700 dark:border-white/10 dark:bg-white/[0.05] dark:text-slate-200"
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
          {blogPosts.map((post, index) => (
            <Reveal key={`${post.slug}-${index}`}>
              <PremiumCard className="h-full p-5">
                <div className="flex items-center justify-between gap-3">
                <ClayIcon icon={BookOpenText} size="sm" tone="amber" />
                  <span className="rounded-full border border-violet-200/60 bg-violet-50 px-3 py-1 text-[11px] font-black uppercase tracking-[0.14em] text-[#6C63FF] dark:border-white/10 dark:bg-white/[0.05] dark:text-violet-100">
                    {post.category}
                  </span>
                </div>
                <h3 className="mt-4 font-black text-slate-950 dark:text-white">{post.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">{post.excerpt}</p>
                <Link className="mt-5 inline-flex text-sm font-bold text-[#6C63FF] dark:text-violet-200" href={`/blog/${post.slug}`}>
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
            <ClayIcon icon={BadgeCheck} className="mx-auto" tone="mint" />
            <h3 className="mt-4 text-2xl font-black text-slate-950 dark:text-white">Real testimonials will be added after client permission.</h3>
            <p className="mt-4 text-sm leading-7 text-slate-600 dark:text-slate-300">
              Until then, the portfolio relies on case studies, technical writing, project structure, deployment notes and visible proof sections instead of invented reviews.
            </p>
          </PremiumCard>
        </Reveal>
      </section>

      <section id="contact" className="relative mx-auto grid max-w-7xl gap-8 px-4 py-16 md:py-24 lg:grid-cols-[.9fr_1.1fr]">
        <Reveal>
          <p className="text-xs font-black uppercase tracking-[0.3em] text-[#8B5CF6] dark:text-violet-200">Contact</p>
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
                <BadgeCheck className="mt-0.5 shrink-0 text-[#6C63FF] dark:text-violet-200" size={16} />
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
                  className="inline-flex items-center gap-3 rounded-2xl border border-white/70 bg-white/75 p-4 font-semibold shadow-lg shadow-violet-100/60 transition hover:border-[#8B5CF6]/45 hover:text-[#6C63FF] dark:border-white/10 dark:bg-white/[0.04] dark:shadow-none dark:hover:border-pink-300/30 dark:hover:text-violet-100"
                  href={String(href)}
                >
                  <ContactIcon className="text-[#6C63FF] dark:text-violet-200" /> {String(label)}
                </a>
              );
            })}
          </div>
        </Reveal>
        <Reveal>
          <ContactForm />
        </Reveal>
      </section>

      <footer className="relative border-t border-white/70 bg-gradient-to-b from-white to-violet-50 px-4 py-12 dark:border-white/10 dark:from-[#020617] dark:to-[#061826]">
        <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-[1.2fr_.8fr_.8fr_.8fr]">
          <div>
            <h2 className="text-2xl font-black text-slate-950 dark:text-white">Youssef <span className="text-[#6C63FF] dark:text-violet-200">Youyou</span></h2>
            <p className="mt-3 max-w-sm text-sm leading-7 text-slate-600 dark:text-slate-400">
              Senior Full-Stack Web Developer building Laravel, React/Next.js, APIs, dashboards and production-ready web platforms.
            </p>
            <a href={`mailto:${profile.email}`} className="mt-4 inline-flex text-sm font-bold text-[#6C63FF] dark:text-violet-200">{profile.email}</a>
          </div>
          <div>
            <h3 className="font-bold text-slate-950 dark:text-white">Quick links</h3>
            <div className="mt-4 grid gap-3 text-sm text-slate-600 dark:text-slate-400">
              <Link href="/#services" className="hover:text-[#6C63FF] dark:hover:text-pink-200">Services</Link>
              <Link href="/projects" className="hover:text-[#6C63FF] dark:hover:text-pink-200">Projects</Link>
              <Link href="/#experience" className="hover:text-[#6C63FF] dark:hover:text-pink-200">Experience</Link>
              <Link href="/blog" className="hover:text-[#6C63FF] dark:hover:text-pink-200">Blog/Technical Notes</Link>
              <a href="/contact" className="hover:text-[#6C63FF] dark:hover:text-pink-200">Contact</a>
              <a href="/work-with-me" className="hover:text-[#6C63FF] dark:hover:text-pink-200">Work With Me</a>
              <a href="/hire-laravel-react-developer" className="hover:text-[#6C63FF] dark:hover:text-pink-200">Hire Me</a>
              <a href="/cv" className="hover:text-[#6C63FF] dark:hover:text-pink-200">CV</a>
              <a href="/nador-full-stack-developer" className="hover:text-[#6C63FF] dark:hover:text-pink-200">Full-Stack Developer in Nador</a>
              <a href="/morocco-full-stack-developer" className="hover:text-[#6C63FF] dark:hover:text-pink-200">Full-Stack Developer Morocco</a>
              <a href={profile.github} className="hover:text-[#6C63FF] dark:hover:text-pink-200">GitHub</a>
              <a href={profile.linkedin} className="hover:text-[#6C63FF] dark:hover:text-pink-200">LinkedIn</a>
            </div>
          </div>
          <div>
            <h3 className="font-bold text-slate-950 dark:text-white">Services</h3>
            <div className="mt-4 grid gap-3 text-sm text-slate-600 dark:text-slate-400">
              <Link href="/services/laravel-developer-morocco" className="hover:text-[#6C63FF] dark:hover:text-pink-200">Laravel APIs</Link>
              <Link href="/services/react-nextjs-developer-morocco" className="hover:text-[#6C63FF] dark:hover:text-pink-200">React/Next.js</Link>
              <Link href="/services/admin-dashboard-development" className="hover:text-[#6C63FF] dark:hover:text-pink-200">Dashboards</Link>
              <Link href="/services/saas-development-morocco" className="hover:text-[#6C63FF] dark:hover:text-pink-200">SaaS Platforms</Link>
              <Link href="/services/web-developer-nador" className="hover:text-[#6C63FF] dark:hover:text-pink-200">Web Developer in Nador</Link>
              <Link href="/services/laravel-developer-nador" className="hover:text-[#6C63FF] dark:hover:text-pink-200">Laravel Developer Nador</Link>
              <Link href="/services/business-automation-morocco" className="hover:text-[#6C63FF] dark:hover:text-pink-200">Business Automation Morocco</Link>
            </div>
          </div>
          <div>
            <h3 className="font-bold text-slate-950 dark:text-white">Actions</h3>
            <div className="mt-4 grid gap-3 text-sm text-slate-600 dark:text-slate-400">
              <a href="/cv-download" className="inline-flex items-center gap-2 hover:text-[#6C63FF] dark:hover:text-pink-200"><Download size={15} /> Download CV</a>
              <a href="/hire-laravel-react-developer" className="inline-flex items-center gap-2 hover:text-[#6C63FF] dark:hover:text-pink-200"><BadgeCheck size={15} /> Hire Me</a>
              <a href="#contact" className="inline-flex items-center gap-2 hover:text-[#6C63FF] dark:hover:text-pink-200"><Send size={15} /> Contact</a>
              <a href="#" className="hover:text-[#6C63FF] dark:hover:text-pink-200">Back to top</a>
            </div>
          </div>
        </div>
        <div className="mx-auto mt-10 flex max-w-7xl flex-wrap items-center justify-between gap-3 border-t border-white/70 pt-6 text-sm text-slate-500 dark:border-white/10">
          <span>Copyright 2026 Youssef Youyou. All rights reserved.</span>
          <span>youssefyouyou.com</span>
        </div>
      </footer>
    </main>
  );
}
