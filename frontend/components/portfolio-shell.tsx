"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { Activity, Archive, ArrowRight, BadgeCheck, BriefcaseBusiness, Cable, Cloud, Code2, Database, Download, ExternalLink, GitBranch, Globe2, LayoutDashboard, Lock, Mail, Moon, Network, Search, Send, Server, Sparkles, Workflow } from "lucide-react";
import { ContactForm } from "@/components/contact-form";
import { Navbar } from "@/components/layout/Navbar";
import { Reveal } from "@/components/motion-primitives";
import { Hero } from "@/components/sections/Hero";
import { blogPosts, certifications, education, experiences, languages, profile, projects, services, skills, stats, timeline } from "@/lib/data";

const SkillChart = dynamic(() => import("@/components/charts").then((mod) => mod.SkillChart), {
  ssr: false,
  loading: () => <div className="h-80 rounded-2xl border border-white/10 bg-white/[0.04]" />,
});

const icons = [Globe2, Sparkles, LayoutDashboard, BriefcaseBusiness, Cable, Server, Code2, Database, Search, Cloud, Archive, Workflow];

function SectionTitle({ eyebrow, title, text }: { eyebrow: string; title: string; text?: string }) {
  return (
    <Reveal className="mx-auto mb-10 max-w-4xl text-center">
      <p className="text-sm font-bold uppercase tracking-[0.24em] text-cyan-300">{eyebrow}</p>
      <h2 className="mt-3 text-3xl font-bold text-white md:text-5xl">{title}</h2>
      {text && <p className="mt-4 text-pretty text-slate-300">{text}</p>}
    </Reveal>
  );
}

export default function PortfolioShell() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#020817] text-white">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(34,211,238,.18),transparent_34%),radial-gradient(circle_at_80%_0%,rgba(59,130,246,.18),transparent_32%),linear-gradient(180deg,#020817,#071226_45%,#020817)]" />
      <Navbar />
      <Hero />

      <section id="stats" className="relative mx-auto max-w-7xl px-4 py-20">
        <SectionTitle eyebrow="Real Stats" title="A realistic picture of where I can deliver value" text="No inflated claims. These are CV-based signals for recruiters and clients evaluating practical full-stack readiness." />
        <div className="grid gap-4 md:grid-cols-4">
          {stats.map((stat, index) => (
            <Reveal key={stat.label} className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-5">
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-cyan-300 to-blue-500" style={{ opacity: 0.45 + index * 0.12 }} />
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-cyan-300">{stat.tone}</p>
              <div className="mt-3 text-5xl font-black text-white">{stat.value}</div>
              <h3 className="mt-3 font-bold">{stat.label}</h3>
              <p className="mt-2 text-sm text-slate-400">{stat.detail}</p>
            </Reveal>
          ))}
        </div>
        <div className="mt-6 grid gap-6 lg:grid-cols-[1.2fr_.8fr]">
          <Reveal><SkillChart /></Reveal>
          <Reveal className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
            <h3 className="mb-5 text-xl font-bold">Timeline</h3>
            <div className="space-y-4">{timeline.map((item) => <div key={`${item.year}-${item.event}`} className="flex gap-4"><span className="text-cyan-300">{item.year}</span><p className="text-sm text-slate-300">{item.event}</p></div>)}</div>
          </Reveal>
        </div>
      </section>

      <section id="services" className="relative mx-auto max-w-7xl px-4 py-20">
        <SectionTitle eyebrow="Services" title="Web solutions for businesses, startups & digital projects" />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => {
            const Icon = icons[index % icons.length];
            return (
              <Reveal key={service.title} className="group rounded-2xl border border-white/10 bg-white/[0.04] p-5 transition hover:-translate-y-1 hover:border-cyan-300/40 hover:bg-cyan-300/[0.06]">
                <Icon className="text-cyan-300" />
                <div className="mt-4 flex items-center justify-between gap-3">
                  <h3 className="font-bold">{service.title}</h3>
                  <span className="rounded-full bg-white/10 px-2 py-1 text-xs text-cyan-100">{service.tag}</span>
                </div>
                <p className="mt-3 text-sm text-slate-400">{service.description}</p>
                <a href="#contact" className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-cyan-200">Request this service <ArrowRight size={16} /></a>
              </Reveal>
            );
          })}
        </div>
      </section>

      <section id="about" className="relative mx-auto grid max-w-7xl gap-8 px-4 py-20 lg:grid-cols-[.8fr_1.2fr]">
        <Reveal className="rounded-2xl border border-white/10 bg-white/[0.04] p-6">
          <Moon className="text-cyan-300" />
          <h2 className="mt-4 text-3xl font-bold">About Youssef</h2>
          <p className="mt-4 leading-8 text-slate-300">I am Youssef Youyou, a Junior Full-Stack Web Developer from Nador, Morocco. I specialize in Laravel, React.js, Next.js, Vue.js, REST APIs, MySQL, dashboards, web applications, SaaS concepts, e-commerce systems and process digitalization.</p>
          <p className="mt-4 leading-8 text-slate-300">I have freelance experience from 2019 to 2023, remote React.js experience with MediaTechly in London, and current experience in administrative digitalization and IT support. I build practical, clean, scalable and production-ready solutions with focus on usability, maintainability, SEO and deployment.</p>
        </Reveal>
        <Reveal className="grid gap-4 md:grid-cols-3">
          {[
            ["B2B", "Dashboards, internal tools, SaaS platforms, admin panels, client portals and automation systems for companies."],
            ["B2C", "E-commerce websites, service websites, content platforms, media websites and user-friendly customer experiences."],
            ["Internal Digitalization", "Excel/VBA automation, archiving tools, simple web apps and digital workflows for admin teams."],
          ].map(([title, text]) => <div key={title} className="rounded-2xl border border-white/10 bg-white/[0.04] p-5"><h3 className="text-xl font-bold text-cyan-200">{title}</h3><p className="mt-3 text-sm text-slate-400">{text}</p></div>)}
        </Reveal>
      </section>

      <section id="skills" className="relative mx-auto max-w-7xl px-4 py-20">
        <SectionTitle eyebrow="Skills" title="Full-stack, deployment and digitalization toolkit" />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {Object.entries(skills).map(([category, items]) => (
            <Reveal key={category} className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
              <h3 className="font-bold text-cyan-200">{category}</h3>
              <div className="mt-4 flex flex-wrap gap-2">{items.map((skill) => <span key={skill} className="rounded-full bg-white/10 px-3 py-1 text-sm text-slate-200">{skill}</span>)}</div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="relative mx-auto max-w-7xl px-4 py-20">
        <SectionTitle eyebrow="Architecture Preview" title="API-driven portfolio that feels like a SaaS product" text="Animated API flow, dashboard preview, admin-editable content and deploy-ready backend structure." />
        <Reveal className="grid gap-4 rounded-[2rem] border border-white/10 bg-white/[0.04] p-5 lg:grid-cols-3">
          {["Filament Admin", "Laravel REST API", "Next.js Frontend"].map((item, index) => <div key={item} className="rounded-2xl border border-cyan-300/20 bg-slate-950/70 p-5"><Activity className="text-cyan-300" /><h3 className="mt-4 font-bold">{item}</h3><p className="mt-2 text-sm text-slate-400">{["Editable projects, posts, skills, services, settings and tracked messages.", "Resources, Form Requests, Policies, Sanctum, rate limits and clean endpoints.", "Responsive pages, charts, motion, JSON-LD, sitemap and optimized 3D."][index]}</p></div>)}
        </Reveal>
      </section>

      <section id="projects" className="relative mx-auto max-w-7xl px-4 py-20">
        <SectionTitle eyebrow="Projects" title="Case studies framed around business problems" text="Each project highlights the workflow problem, technical structure and practical value instead of pretending to have fake enterprise metrics." />
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <Reveal key={project.slug} className="group rounded-2xl border border-white/10 bg-white/[0.04] p-5 transition hover:-translate-y-1 hover:border-cyan-300/40">
              <div className="aspect-video rounded-xl border border-white/10 bg-[linear-gradient(135deg,rgba(34,211,238,.18),rgba(15,23,42,.9)),repeating-linear-gradient(90deg,rgba(255,255,255,.08)_0_1px,transparent_1px_42px)] p-4">
                <div className="h-full rounded-lg border border-white/10 bg-slate-950/65 p-3">
                  <div className="flex gap-1">{[1, 2, 3].map((dot) => <span key={dot} className="h-2 w-2 rounded-full bg-cyan-300/70" />)}</div>
                  <div className="mt-8 h-3 rounded bg-cyan-300/60" /><div className="mt-3 h-3 w-2/3 rounded bg-blue-300/40" />
                </div>
              </div>
              <p className="mt-5 text-xs uppercase tracking-[0.18em] text-cyan-300">{project.category}</p>
              <h3 className="mt-2 text-xl font-bold">{project.title}</h3>
              <p className="mt-3 text-sm text-slate-300">{project.businessProblem}</p>
              <div className="mt-4 rounded-xl border border-cyan-300/15 bg-cyan-300/[0.06] p-3 text-sm text-cyan-50">
                <span className="font-bold text-cyan-200">Business value: </span>{project.businessValue}
              </div>
              <div className="mt-4 flex flex-wrap gap-2">{project.stack.slice(0, 4).map((tag) => <span key={tag} className="rounded-full bg-white/10 px-2 py-1 text-xs">{tag}</span>)}</div>
              <Link href={`/projects/${project.slug}`} className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-cyan-200">Case study <ExternalLink size={15} /></Link>
            </Reveal>
          ))}
        </div>
      </section>

      <section id="experience" className="relative mx-auto max-w-5xl px-4 py-20">
        <SectionTitle eyebrow="Experience" title="Timeline of practical delivery" />
        <div className="space-y-5">
          {experiences.map((experience) => (
            <Reveal key={experience.role} className="rounded-2xl border border-white/10 bg-white/[0.04] p-6">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div><h3 className="text-xl font-bold">{experience.role}</h3><p className="mt-1 text-cyan-200">{experience.company}</p></div>
                <p className="text-sm text-slate-400">{experience.date} - {experience.location}</p>
              </div>
              <ul className="mt-5 grid gap-2 text-sm text-slate-300">{experience.points.map((point) => <li key={point} className="flex gap-2"><BadgeCheck className="mt-0.5 shrink-0 text-cyan-300" size={16} />{point}</li>)}</ul>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="relative mx-auto grid max-w-7xl gap-5 px-4 py-20 md:grid-cols-3">
        <Reveal className="rounded-2xl border border-white/10 bg-white/[0.04] p-5"><h2 className="text-xl font-bold text-cyan-200">Education</h2>{education.map((item) => <p key={item[0]} className="mt-4 text-sm text-slate-300">{item.join(" - ")}</p>)}</Reveal>
        <Reveal className="rounded-2xl border border-white/10 bg-white/[0.04] p-5"><h2 className="text-xl font-bold text-cyan-200">Certifications</h2>{certifications.map((item) => <p key={item} className="mt-4 text-sm text-slate-300">{item}</p>)}</Reveal>
        <Reveal className="rounded-2xl border border-white/10 bg-white/[0.04] p-5"><h2 className="text-xl font-bold text-cyan-200">Languages</h2>{languages.map((item) => <p key={item} className="mt-4 text-sm text-slate-300">{item}</p>)}</Reveal>
      </section>

      <section id="blog" className="relative mx-auto max-w-7xl px-4 py-20">
        <SectionTitle eyebrow="Blog" title="Technical writing ideas" />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">{blogPosts.map((post) => <Reveal key={post.slug} className="rounded-2xl border border-white/10 bg-white/[0.04] p-5"><h3 className="font-bold">{post.title}</h3><p className="mt-3 text-sm text-slate-400">{post.excerpt}</p><Link className="mt-4 inline-flex text-sm font-bold text-cyan-200" href={`/blog/${post.slug}`}>Read draft</Link></Reveal>)}</div>
      </section>

      <section id="contact" className="relative mx-auto grid max-w-7xl gap-8 px-4 py-20 lg:grid-cols-[.9fr_1.1fr]">
        <Reveal>
          <p className="text-sm font-bold uppercase tracking-[0.24em] text-cyan-300">Contact</p>
          <h2 className="mt-3 text-4xl font-black">Have a dashboard, portal, API or workflow to build?</h2>
          <p className="mt-5 text-slate-300">Send the business goal, current problem and ideal timeline. You will get a practical response focused on scope, structure, risks and next steps.</p>
          <div className="mt-6 grid gap-3">
            {["Best fit: Laravel APIs, React/Next.js frontends, admin dashboards and internal tools.", "Available for Marrakech, Morocco, remote, freelance, B2B/B2C and pre-hiring internship opportunities.", "Realistic junior-friendly positioning: honest scope, clean implementation and strong learning speed."].map((item) => (
              <div key={item} className="flex gap-3 rounded-2xl border border-white/10 bg-white/[0.04] p-3 text-sm text-slate-300">
                <BadgeCheck className="mt-0.5 shrink-0 text-cyan-300" size={16} />
                <span>{item}</span>
              </div>
            ))}
          </div>
          <div className="mt-7 grid gap-3 text-sm text-slate-300">
            <a className="flex items-center gap-3" href={`mailto:${profile.email}`}><Mail className="text-cyan-300" /> {profile.email}</a>
            <a className="flex items-center gap-3" href={profile.github}><GitBranch className="text-cyan-300" /> github.com/youssefyouyoudev</a>
            <a className="flex items-center gap-3" href={profile.linkedin}><Network className="text-cyan-300" /> linkedin.com/in/youssefyouyoudev</a>
          </div>
        </Reveal>
        <Reveal><ContactForm /></Reveal>
      </section>

      <footer className="relative border-t border-white/10 px-4 py-8 text-center text-sm text-slate-400">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-4">
          <span>© 2026 Youssef Youyou</span>
          <a href="/cv-download" className="inline-flex items-center gap-2 text-cyan-200"><Download size={15} /> Download CV</a>
          <a href="/admin" className="inline-flex items-center gap-2 text-cyan-200"><Lock size={15} /> Admin Login</a>
          <a href="#contact" className="inline-flex items-center gap-2 text-cyan-200"><Send size={15} /> Contact</a>
        </div>
      </footer>
    </main>
  );
}
