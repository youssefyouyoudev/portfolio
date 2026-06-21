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
  ExternalLink,
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
import { Hero } from "@/components/sections/Hero";
import {
  blogPosts,
  certifications,
  education,
  experiences,
  languages,
  profile,
  projects,
  services,
  skills,
  stats,
  timeline,
} from "@/lib/data";

const SkillChart = dynamic(() => import("@/components/charts").then((mod) => mod.SkillChart), {
  ssr: false,
  loading: () => <div className="h-80 rounded-3xl border border-cyan-400/15 bg-slate-900/45" />,
});

const serviceIcons = [Server, Code2, LayoutDashboard, Network, Rocket, Globe2, Workflow, Search, Database, ShieldCheck];

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
      <p className="text-xs font-black uppercase tracking-[0.32em] text-cyan-300">{eyebrow}</p>
      <h2 className="mt-4 text-balance text-3xl font-black tracking-tight text-slate-50 md:text-5xl">{title}</h2>
      {text && <p className="mt-5 text-pretty text-base leading-8 text-slate-400 md:text-lg">{text}</p>}
    </Reveal>
  );
}

function PremiumCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={`group relative overflow-hidden rounded-3xl border border-cyan-400/15 bg-slate-900/55 shadow-2xl shadow-slate-950/25 backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-cyan-300/35 hover:bg-slate-900/70 hover:shadow-cyan-500/10 ${className}`}
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-300/60 to-transparent opacity-70" />
      <div className="pointer-events-none absolute -right-16 -top-16 h-32 w-32 rounded-full bg-cyan-400/10 blur-3xl opacity-0 transition group-hover:opacity-100" />
      {children}
    </div>
  );
}

function ProjectMockup({ title }: { title: string }) {
  return (
    <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-cyan-400/15 bg-[#020617] p-3">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_18%,rgba(34,211,238,.18),transparent_35%),linear-gradient(135deg,rgba(14,165,233,.14),rgba(2,6,23,.9))]" />
      <div className="relative flex h-full flex-col rounded-xl border border-white/10 bg-slate-950/70 p-3">
        <div className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-rose-400/80" />
          <span className="h-2 w-2 rounded-full bg-amber-300/80" />
          <span className="h-2 w-2 rounded-full bg-emerald-300/80" />
          <span className="ml-3 text-[10px] text-slate-500">{title.toLowerCase().replaceAll(" ", "-")}.app</span>
        </div>
        <div className="mt-5 grid flex-1 grid-cols-[0.7fr_1fr] gap-3">
          <div className="space-y-2">
            <div className="h-3 rounded-full bg-cyan-300/70" />
            <div className="h-3 w-3/4 rounded-full bg-sky-400/35" />
            <div className="mt-4 grid gap-2">
              <div className="h-10 rounded-xl border border-white/10 bg-white/[0.04]" />
              <div className="h-10 rounded-xl border border-white/10 bg-white/[0.04]" />
            </div>
          </div>
          <div className="rounded-2xl border border-cyan-400/10 bg-cyan-300/[0.05] p-3">
            <div className="h-20 rounded-xl bg-gradient-to-r from-sky-500/40 to-cyan-300/30" />
            <div className="mt-3 grid grid-cols-3 gap-2">
              <div className="h-8 rounded-lg bg-white/[0.06]" />
              <div className="h-8 rounded-lg bg-white/[0.06]" />
              <div className="h-8 rounded-lg bg-white/[0.06]" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function PortfolioShell() {
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
    <main className="min-h-screen overflow-hidden bg-[#020617] text-slate-100">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_18%_8%,rgba(34,211,238,.14),transparent_30%),radial-gradient(circle_at_82%_0%,rgba(14,165,233,.14),transparent_34%),linear-gradient(180deg,#020617,#061826_42%,#020617)]" />
      <Navbar />
      <Hero />

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
                <p className="text-xs font-black uppercase tracking-[0.2em] text-cyan-300">{stat.tone}</p>
                <div className="mt-5 flex items-end gap-3">
                  <span className="text-5xl font-black tracking-tight text-white">{stat.value}</span>
                  <span className="mb-2 h-1.5 flex-1 rounded-full bg-slate-800">
                    <span className="block h-1.5 rounded-full bg-gradient-to-r from-sky-500 to-cyan-300" style={{ width: `${76 + index * 6}%` }} />
                  </span>
                </div>
                <h3 className="mt-5 text-lg font-bold text-slate-50">{stat.label}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-400">{stat.detail}</p>
              </PremiumCard>
            </Reveal>
          ))}
        </div>
        <div className="mt-6 grid gap-6 lg:grid-cols-[1.1fr_.9fr]">
          <Reveal>
            <PremiumCard className="p-4 md:p-6">
              <div className="mb-5 flex items-center justify-between gap-4">
                <div>
                  <h3 className="text-xl font-bold text-white">Skill focus distribution</h3>
                  <p className="mt-1 text-sm text-slate-400">Practical strengths based on CV/project experience.</p>
                </div>
                <Sparkles className="hidden text-cyan-300 sm:block" />
              </div>
              <SkillChart />
            </PremiumCard>
          </Reveal>
          <Reveal>
            <PremiumCard className="p-6">
              <h3 className="text-xl font-bold text-white">Career timeline</h3>
              <div className="mt-6 space-y-5">
                {timeline.map((item) => (
                  <div key={`${item.year}-${item.event}`} className="relative pl-8">
                    <span className="absolute left-0 top-1.5 h-3 w-3 rounded-full bg-cyan-300 shadow-[0_0_20px_rgba(34,211,238,.8)]" />
                    <span className="absolute left-1.5 top-5 h-[calc(100%+1rem)] w-px bg-cyan-300/20 last:hidden" />
                    <p className="text-sm font-black text-cyan-200">{item.year}</p>
                    <p className="mt-1 text-sm leading-6 text-slate-300">{item.event}</p>
                  </div>
                ))}
              </div>
            </PremiumCard>
          </Reveal>
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
                    <span className="grid h-12 w-12 place-items-center rounded-2xl border border-cyan-400/20 bg-cyan-300/10 text-cyan-200 shadow-lg shadow-cyan-500/10">
                      <Icon size={22} />
                    </span>
                    <span className="rounded-full border border-white/10 bg-white/[0.05] px-3 py-1 text-xs font-bold text-cyan-100">{service.tag}</span>
                  </div>
                  <h3 className="mt-6 text-xl font-black text-white">{service.title}</h3>
                  <p className="mt-3 flex-1 text-sm leading-7 text-slate-400">{service.description}</p>
                  <a href="#contact" className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-cyan-200 transition group-hover:translate-x-1">
                    Request this service <ArrowRight size={16} />
                  </a>
                </PremiumCard>
              </Reveal>
            );
          })}
        </div>
      </section>

      <section id="about" className="relative mx-auto grid max-w-7xl gap-6 px-4 py-16 md:py-24 lg:grid-cols-[1.05fr_.95fr]">
        <Reveal>
          <PremiumCard className="p-7 md:p-8">
            <p className="text-xs font-black uppercase tracking-[0.3em] text-cyan-300">About</p>
            <h2 className="mt-4 text-3xl font-black tracking-tight text-white md:text-5xl">Practical developer with business-process context</h2>
            <p className="mt-6 leading-8 text-slate-300">
              I am Youssef Youyou, a Full-Stack Web Developer from Nador, Morocco. I focus on Laravel, React/Next.js, Vue.js, REST APIs, MySQL, dashboards, SaaS concepts, e-commerce systems and process digitalization.
            </p>
            <p className="mt-4 leading-8 text-slate-300">
              My background combines freelance web projects, remote React.js work with MediaTechly in London, and current administrative digitalization and IT support. That mix helps me build systems that are useful, maintainable and realistic for teams.
            </p>
          </PremiumCard>
        </Reveal>
        <div className="grid gap-5 sm:grid-cols-2">
          {[
            ["Practical problem solving", "I start from the workflow and user need, then choose the simplest reliable technical path."],
            ["Clean development", "Readable structure, reusable components, clear API contracts and maintainable database logic."],
            ["Business-focused solutions", "Dashboards, portals, SaaS tools and automation that support real operations."],
            ["Deployment mindset", "Nginx, Linux, production builds, SEO basics and environment separation."],
          ].map(([title, text]) => (
            <Reveal key={title}>
              <PremiumCard className="h-full p-6">
                <BadgeCheck className="text-cyan-300" />
                <h3 className="mt-4 font-bold text-white">{title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-400">{text}</p>
              </PremiumCard>
            </Reveal>
          ))}
        </div>
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
                <h3 className="font-black text-cyan-100">{category}</h3>
                <div className="mt-5 flex flex-wrap gap-2">
                  {items.map((skill) => (
                    <span key={skill} className="rounded-full border border-white/10 bg-white/[0.05] px-3 py-1.5 text-sm text-slate-200">
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
        <div className="grid gap-5 lg:grid-cols-3">
          {[
            ["Filament Admin", "Editable projects, posts, skills, services, settings and tracked messages.", LayoutDashboard],
            ["Laravel REST API", "Resources, Form Requests, Policies, Sanctum, rate limits and clean endpoints.", Server],
            ["Next.js Frontend", "Responsive pages, charts, motion, JSON-LD, sitemap and optimized visuals.", Code2],
          ].map(([title, text, Icon]) => {
            const CardIcon = Icon as typeof LayoutDashboard;
            return (
              <Reveal key={String(title)}>
                <PremiumCard className="p-6">
                  <CardIcon className="text-cyan-300" />
                  <h3 className="mt-5 text-xl font-black text-white">{String(title)}</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-400">{String(text)}</p>
                </PremiumCard>
              </Reveal>
            );
          })}
        </div>
      </section>

      <section id="projects" className="relative mx-auto max-w-7xl px-4 py-16 md:py-24">
        <SectionTitle
          eyebrow="Projects"
          title="Product-style case studies, not simple thumbnails"
          text="Each project is framed around a business problem, the technical structure and the practical value it creates."
        />
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {projects.map((project) => (
            <Reveal key={project.slug}>
              <PremiumCard className="h-full p-5">
                <ProjectMockup title={project.title} />
                <p className="mt-5 text-xs font-black uppercase tracking-[0.18em] text-cyan-300">{project.category}</p>
                <h3 className="mt-3 text-2xl font-black text-white">{project.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-300">{project.businessProblem}</p>
                <div className="mt-4 rounded-2xl border border-cyan-300/15 bg-cyan-300/[0.06] p-4 text-sm leading-7 text-cyan-50">
                  <span className="font-bold text-cyan-200">Business value: </span>
                  {project.businessValue}
                </div>
                <div className="mt-5 flex flex-wrap gap-2">
                  {project.stack.slice(0, 4).map((tag) => (
                    <span key={tag} className="rounded-full border border-white/10 bg-white/[0.05] px-3 py-1 text-xs text-slate-200">{tag}</span>
                  ))}
                </div>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Link href={`/projects/${project.slug}`} className="inline-flex items-center gap-2 rounded-full bg-cyan-300 px-4 py-2 text-sm font-bold text-slate-950 transition hover:bg-white">
                    Case study <ExternalLink size={15} />
                  </Link>
                  <a href="#contact" className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-sm font-bold text-slate-200 transition hover:border-cyan-300/40 hover:text-cyan-100">
                    Similar project
                  </a>
                </div>
              </PremiumCard>
            </Reveal>
          ))}
        </div>
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
                        <h3 className="text-xl font-black text-white">{experience.role}</h3>
                        {experience.company && <p className="mt-1 font-semibold text-cyan-200">{experience.company}</p>}
                      </div>
                      <span className="inline-flex items-center gap-2 rounded-full border border-cyan-400/15 bg-cyan-300/10 px-3 py-1 text-xs font-bold text-cyan-100">
                        <CalendarDays size={14} /> {experience.date}
                      </span>
                    </div>
                    <p className="mt-2 text-sm text-slate-400">{experience.location}</p>
                    <ul className="mt-5 grid gap-2 text-sm leading-6 text-slate-300">
                      {experience.points.map((point) => (
                        <li key={point} className="flex gap-2">
                          <CheckCircle2 className="mt-0.5 shrink-0 text-cyan-300" size={16} />
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

      <section className="relative mx-auto grid max-w-7xl gap-5 px-4 py-16 md:grid-cols-3 md:py-24">
        {[
          ["Education", education.map((item) => item.join(" - "))],
          ["Certifications", certifications],
          ["Languages", languages],
        ].map(([title, items]) => (
          <Reveal key={String(title)}>
            <PremiumCard className="h-full p-6">
              <h2 className="text-xl font-black text-cyan-100">{String(title)}</h2>
              {(items as string[]).map((item) => (
                <p key={item} className="mt-4 text-sm leading-7 text-slate-300">{item}</p>
              ))}
            </PremiumCard>
          </Reveal>
        ))}
      </section>

      <section id="blog" className="relative mx-auto max-w-7xl px-4 py-16 md:py-24">
        <SectionTitle
          eyebrow="Blog"
          title="Technical writing that supports trust"
          text="Article ideas that can become SEO assets and show how I think about dashboards, APIs, Filament, deployment and digitalization."
        />
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-5">
          {blogPosts.map((post) => (
            <Reveal key={post.slug}>
              <PremiumCard className="h-full p-5">
                <BookOpenText className="text-cyan-300" size={20} />
                <h3 className="mt-4 font-black text-white">{post.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-400">{post.excerpt}</p>
                <Link className="mt-5 inline-flex text-sm font-bold text-cyan-200" href={`/blog/${post.slug}`}>
                  Read draft
                </Link>
              </PremiumCard>
            </Reveal>
          ))}
        </div>
      </section>

      <section id="contact" className="relative mx-auto grid max-w-7xl gap-8 px-4 py-16 md:py-24 lg:grid-cols-[.9fr_1.1fr]">
        <Reveal>
          <p className="text-xs font-black uppercase tracking-[0.3em] text-cyan-300">Contact</p>
          <h2 className="mt-4 text-4xl font-black tracking-tight text-white md:text-5xl">Ready to build a website, dashboard, API or internal tool?</h2>
          <p className="mt-6 text-lg leading-8 text-slate-300">
            Let’s turn your idea into a clean, scalable and production-ready solution. Send the business goal, current problem and ideal timeline.
          </p>
          <div className="mt-8 grid gap-3">
            {[
              "Best fit: Laravel APIs, React/Next.js frontends, admin dashboards and internal tools.",
              "Available for Marrakech, Morocco, remote, freelance, B2B/B2C and pre-hiring internship opportunities.",
              "Realistic scope, clean implementation and production-minded delivery.",
            ].map((item) => (
              <PremiumCard key={item} className="flex gap-3 p-4 text-sm leading-6 text-slate-300">
                <BadgeCheck className="mt-0.5 shrink-0 text-cyan-300" size={16} />
                <span>{item}</span>
              </PremiumCard>
            ))}
          </div>
          <div className="mt-8 grid gap-3 text-sm text-slate-300 sm:grid-cols-2">
            <a className="inline-flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] p-4 transition hover:border-cyan-300/30 hover:text-cyan-100" href={`mailto:${profile.email}`}>
              <Mail className="text-cyan-300" /> Email
            </a>
            <a className="inline-flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] p-4 transition hover:border-cyan-300/30 hover:text-cyan-100" href="https://wa.me/212600000000">
              <Send className="text-cyan-300" /> WhatsApp
            </a>
            <a className="inline-flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] p-4 transition hover:border-cyan-300/30 hover:text-cyan-100" href={profile.github}>
              <GitBranch className="text-cyan-300" /> GitHub
            </a>
            <a className="inline-flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] p-4 transition hover:border-cyan-300/30 hover:text-cyan-100" href={profile.linkedin}>
              <Network className="text-cyan-300" /> LinkedIn
            </a>
          </div>
        </Reveal>
        <Reveal>
          <ContactForm />
        </Reveal>
      </section>

      <footer className="relative border-t border-cyan-400/10 bg-gradient-to-b from-[#020617] to-[#061826] px-4 py-12">
        <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-[1.2fr_.8fr_.8fr_.8fr]">
          <div>
            <h2 className="text-2xl font-black text-white">Youssef <span className="text-cyan-300">Youyou</span></h2>
            <p className="mt-3 max-w-sm text-sm leading-7 text-slate-400">
              Full-Stack Web Developer building Laravel, React/Next.js, APIs, dashboards and production-ready web platforms.
            </p>
            <a href={`mailto:${profile.email}`} className="mt-4 inline-flex text-sm font-bold text-cyan-200">{profile.email}</a>
          </div>
          <div>
            <h3 className="font-bold text-white">Quick links</h3>
            <div className="mt-4 grid gap-3 text-sm text-slate-400">
              {["Services", "Projects", "Experience", "Blog", "Contact"].map((item) => (
                <a key={item} href={`#${item.toLowerCase()}`} className="hover:text-cyan-200">{item}</a>
              ))}
            </div>
          </div>
          <div>
            <h3 className="font-bold text-white">Services</h3>
            <div className="mt-4 grid gap-3 text-sm text-slate-400">
              {["Laravel APIs", "React/Next.js", "Dashboards", "Deployment"].map((item) => (
                <a key={item} href="#services" className="hover:text-cyan-200">{item}</a>
              ))}
            </div>
          </div>
          <div>
            <h3 className="font-bold text-white">Actions</h3>
            <div className="mt-4 grid gap-3 text-sm text-slate-400">
              <a href="/cv-download" className="inline-flex items-center gap-2 hover:text-cyan-200"><Download size={15} /> Download CV</a>
              <a href="#contact" className="inline-flex items-center gap-2 hover:text-cyan-200"><Send size={15} /> Contact</a>
              <a href="#" className="hover:text-cyan-200">Back to top</a>
            </div>
          </div>
        </div>
        <div className="mx-auto mt-10 flex max-w-7xl flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-6 text-sm text-slate-500">
          <span>© 2026 Youssef Youyou. All rights reserved.</span>
          <span>youssefyouyou.com</span>
        </div>
      </footer>
    </main>
  );
}
