import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { ProjectsSection } from "@/components/projects/ProjectExplorer";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { getProjects } from "@/lib/api";

export const metadata: Metadata = {
  title: "Projects Built to Solve Business Problems | Youssef Youyou",
  description:
    "Professional project case studies by Youssef Youyou: Laravel, React, Next.js, dashboards, APIs, media platforms, e-commerce, automation and portfolio admin systems.",
  alternates: { canonical: "/projects" },
  openGraph: {
    title: "Projects Built to Solve Business Problems | Youssef Youyou",
    description:
      "A professional case-study archive covering platforms, dashboards, admin systems and automation tools built with Laravel, React, Next.js and APIs.",
    url: "/projects",
    images: [{ url: "/images/projects/rifitv-showcase.png", width: 1600, height: 1200, alt: "Youssef Youyou project case study showcase" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Projects Built to Solve Business Problems | Youssef Youyou",
    description: "Laravel, React, Next.js, APIs, dashboards, media, e-commerce and automation project case studies.",
    images: ["/images/projects/rifitv-showcase.png"],
  },
};

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <main className="min-h-screen overflow-hidden bg-slate-50 px-4 py-10 text-slate-950 dark:bg-[#020617] dark:text-white">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_15%_4%,rgba(14,165,233,.14),transparent_30%),radial-gradient(circle_at_85%_10%,rgba(8,145,178,.12),transparent_34%),linear-gradient(180deg,#f8fafc,#eef6ff_46%,#f8fafc)] dark:bg-[radial-gradient(circle_at_15%_4%,rgba(34,211,238,.12),transparent_30%),radial-gradient(circle_at_85%_10%,rgba(14,165,233,.14),transparent_34%),linear-gradient(180deg,#020617,#061826_46%,#020617)]" />
      <div className="relative mx-auto max-w-7xl">
        <header className="flex flex-wrap items-center justify-between gap-3 rounded-3xl border border-sky-200/70 bg-white/78 p-3 shadow-xl shadow-sky-100/70 backdrop-blur-2xl dark:border-cyan-400/10 dark:bg-slate-950/70 dark:shadow-none">
          <Link href="/" className="rounded-2xl px-2 py-1 outline-none focus-visible:ring-2 focus-visible:ring-cyan-300">
            <span className="block text-sm font-black text-slate-950 dark:text-white">
              Youssef <span className="text-sky-600 dark:text-cyan-300">Youyou</span>
            </span>
            <span className="block text-xs text-slate-500 dark:text-slate-400">Project case studies</span>
          </Link>
          <div className="flex flex-wrap items-center gap-2">
            <Link href="/#projects" className="inline-flex items-center gap-2 rounded-full border border-sky-200/80 bg-white/75 px-4 py-2 text-sm font-bold text-slate-700 transition hover:border-sky-400/50 hover:text-sky-700 dark:border-white/10 dark:bg-white/[0.04] dark:text-slate-200 dark:hover:border-cyan-300/35 dark:hover:text-cyan-100">
              <ArrowLeft size={16} /> Homepage
            </Link>
            <Link href="/contact" className="hidden rounded-full bg-cyan-300 px-4 py-2 text-sm font-bold text-slate-950 transition hover:bg-white sm:inline-flex">
              Contact
            </Link>
            <ThemeToggle />
          </div>
        </header>

        <section className="mt-12 max-w-5xl">
          <p className="text-xs font-black uppercase tracking-[0.3em] text-sky-700 dark:text-cyan-300">Selected Work</p>
          <h1 className="mt-4 text-balance text-4xl font-black tracking-tight md:text-6xl">Projects built to solve real business problems</h1>
          <p className="mt-5 text-pretty text-lg leading-8 text-slate-700 dark:text-slate-300">
            A selection of platforms, dashboards, automation tools and web systems built with Laravel, React, Next.js, APIs and deployment-ready architecture. Each case study explains the problem, my role, the stack, the features and the practical business value.
          </p>
          <div className="mt-7 grid gap-3 sm:grid-cols-3">
            {[
              ["Proof, not decoration", "Every card highlights the problem, what I built and the value it creates."],
              ["Realistic positioning", "Clear scope, honest results and practical technical depth."],
              ["Business-focused", "Built for recruiters, B2B clients, agencies and practical teams."],
            ].map(([title, text]) => (
              <div key={title} className="rounded-3xl border border-sky-200/70 bg-white/78 p-4 shadow-lg shadow-sky-100/70 dark:border-white/10 dark:bg-white/[0.045] dark:shadow-none">
                <h2 className="font-black text-slate-950 dark:text-white">{title}</h2>
                <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">{text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-12">
          <ProjectsSection projects={projects} mode="page" />
        </section>
      </div>
    </main>
  );
}
