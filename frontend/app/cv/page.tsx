import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Download, GitBranch, Network } from "lucide-react";
import { profile, projects, skills, experiences } from "@/lib/data";

export const metadata: Metadata = {
  title: "CV | Youssef Youyou Laravel, React & Next.js Developer",
  description: "CV summary for Youssef Youyou, a Senior Full-Stack Web Developer from Nador, Morocco focused on Laravel, React, Next.js, dashboards, SaaS and automation.",
  alternates: { canonical: "/cv" },
  openGraph: { title: "CV | Youssef Youyou", description: "Senior Full-Stack Web Developer from Nador, Morocco.", url: "/cv", images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Youssef Youyou CV page" }] },
  twitter: { card: "summary_large_image", title: "CV | Youssef Youyou", description: "Laravel, React and Next.js full-stack developer CV." },
};

export default function CvPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-slate-50 px-4 py-10 text-slate-950 dark:bg-[#020617] dark:text-white">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_15%_4%,rgba(14,165,233,.14),transparent_30%),linear-gradient(180deg,#f8fafc,#eef6ff_46%,#f8fafc)] dark:bg-[radial-gradient(circle_at_15%_4%,rgba(34,211,238,.12),transparent_30%),linear-gradient(180deg,#020617,#061826_46%,#020617)]" />
      <div className="relative mx-auto max-w-6xl">
        <Link href="/" className="inline-flex items-center gap-2 rounded-full text-sm font-bold text-sky-700 dark:text-cyan-200">
          <ArrowLeft size={16} /> Back home
        </Link>

        <section className="mt-8 rounded-[2rem] border border-sky-200/75 bg-white/88 p-6 shadow-2xl shadow-sky-100/80 backdrop-blur-xl dark:border-cyan-400/15 dark:bg-slate-900/58 md:p-10">
          <p className="text-xs font-black uppercase tracking-[0.28em] text-sky-700 dark:text-cyan-300">CV and hiring summary</p>
          <h1 className="mt-4 text-balance text-4xl font-black tracking-tight md:text-6xl">{profile.name}</h1>
          <p className="mt-4 text-2xl font-bold text-sky-700 dark:text-cyan-200">{profile.title} from {profile.location}</p>
          <p className="mt-6 max-w-4xl text-lg leading-8 text-slate-700 dark:text-slate-300">{profile.description}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/cv-download" className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-sky-500 to-cyan-300 px-5 py-3 text-sm font-black text-white shadow-lg shadow-cyan-500/20">
              <Download size={17} /> Download CV
            </Link>
            <a href={profile.github} className="inline-flex items-center justify-center gap-2 rounded-full border border-sky-200/80 bg-white/75 px-5 py-3 text-sm font-bold text-slate-800 dark:border-white/10 dark:bg-white/[0.04] dark:text-slate-100">
              <GitBranch size={17} /> GitHub
            </a>
            <a href={profile.linkedin} className="inline-flex items-center justify-center gap-2 rounded-full border border-sky-200/80 bg-white/75 px-5 py-3 text-sm font-bold text-slate-800 dark:border-white/10 dark:bg-white/[0.04] dark:text-slate-100">
              <Network size={17} /> LinkedIn
            </a>
          </div>
        </section>

        <section className="mt-8 grid gap-6 lg:grid-cols-2">
          <article className="rounded-3xl border border-sky-200/75 bg-white/88 p-6 shadow-xl shadow-sky-100/70 dark:border-white/10 dark:bg-white/[0.045]">
            <h2 className="text-2xl font-black">Tech stack</h2>
            <div className="mt-5 flex flex-wrap gap-2">
              {Object.values(skills).flat().slice(0, 24).map((skill) => <span key={skill} className="rounded-full border border-sky-200/80 bg-sky-50 px-3 py-1 text-xs font-bold text-slate-700 dark:border-white/10 dark:bg-white/[0.05] dark:text-slate-200">{skill}</span>)}
            </div>
          </article>
          <article className="rounded-3xl border border-sky-200/75 bg-white/88 p-6 shadow-xl shadow-sky-100/70 dark:border-white/10 dark:bg-white/[0.045]">
            <h2 className="text-2xl font-black">Strongest projects</h2>
            <div className="mt-5 grid gap-3">
              {projects.slice(0, 4).map((project) => <Link key={project.slug} href={project.caseStudyUrl} className="rounded-2xl border border-sky-200/80 bg-sky-50/85 p-4 text-sm font-bold text-slate-700 dark:border-cyan-400/15 dark:bg-cyan-300/[0.055] dark:text-slate-200">{project.title}</Link>)}
            </div>
          </article>
        </section>

        <section className="mt-8 rounded-3xl border border-sky-200/75 bg-white/88 p-6 shadow-xl shadow-sky-100/70 dark:border-white/10 dark:bg-white/[0.045] md:p-8">
          <h2 className="text-2xl font-black">Experience timeline</h2>
          <div className="mt-6 grid gap-4">
            {experiences.map((experience) => (
              <article key={`${experience.role}-${experience.date}`} className="rounded-2xl border border-sky-200/80 bg-sky-50/85 p-5 dark:border-cyan-400/15 dark:bg-cyan-300/[0.055]">
                <h3 className="font-black">{experience.role}</h3>
                <p className="mt-1 text-sm font-semibold text-sky-700 dark:text-cyan-200">{experience.company} - {experience.date}</p>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{experience.location}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-8 rounded-[2rem] border border-sky-300/50 bg-gradient-to-br from-sky-50 via-white to-cyan-50 p-6 text-center shadow-2xl shadow-sky-100/80 dark:border-cyan-300/20 dark:from-cyan-300/10 dark:via-slate-900/60 dark:to-slate-950 md:p-10">
          <h2 className="text-3xl font-black">Hiring for Laravel, React, Next.js or dashboards?</h2>
          <Link href="/hire-laravel-react-developer" className="mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-cyan-300 px-6 py-3 text-sm font-bold text-slate-950 transition hover:bg-white">
            Hire Me <ArrowRight size={16} />
          </Link>
        </section>
      </div>
    </main>
  );
}
