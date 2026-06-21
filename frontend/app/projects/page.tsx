import Link from "next/link";
import type { Metadata } from "next";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { projects } from "@/lib/data";

export const metadata: Metadata = {
  title: "Projects",
  description: "Business-focused Laravel, React/Next.js, dashboard, API, SaaS, e-commerce and automation project case studies by Youssef Youyou.",
  alternates: { canonical: "/projects" },
};

export default function ProjectsPage() {
  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 text-slate-950 dark:bg-[#020617] dark:text-white">
      <div className="mx-auto max-w-7xl">
        <Link href="/#projects" className="inline-flex items-center gap-2 rounded-full text-sm font-bold text-sky-700 dark:text-cyan-200">
          <ArrowLeft size={16} /> Back to homepage
        </Link>
        <section className="mt-10 max-w-4xl">
          <p className="text-xs font-black uppercase tracking-[0.3em] text-sky-700 dark:text-cyan-300">Project Proof</p>
          <h1 className="mt-4 text-4xl font-black tracking-tight md:text-6xl">Production-minded case studies</h1>
          <p className="mt-5 text-lg leading-8 text-slate-700 dark:text-slate-300">
            Practical project examples focused on business problems, technical structure, dashboards, APIs, deployment and workflow improvement.
          </p>
        </section>
        <section className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {projects.map((project) => (
            <article
              key={project.slug}
              className="group rounded-3xl border border-sky-200/75 bg-white/85 p-5 shadow-2xl shadow-sky-100/80 transition hover:-translate-y-1 hover:border-sky-400/50 dark:border-cyan-400/15 dark:bg-slate-900/60 dark:shadow-slate-950/30 dark:hover:border-cyan-300/35"
            >
              <div className="rounded-2xl border border-sky-200/75 bg-sky-50 p-4 dark:border-white/10 dark:bg-white/[0.04]">
                <div className="flex items-center gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-rose-400" />
                  <span className="h-2.5 w-2.5 rounded-full bg-amber-300" />
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-300" />
                </div>
                <div className="mt-5 h-28 rounded-xl bg-gradient-to-br from-sky-500/40 via-cyan-300/30 to-blue-600/20" />
              </div>
              <p className="mt-5 text-xs font-black uppercase tracking-[0.16em] text-sky-700 dark:text-cyan-300">{project.category}</p>
              <h2 className="mt-3 text-2xl font-black">{project.title}</h2>
              <p className="mt-3 text-sm leading-7 text-slate-700 dark:text-slate-300">{project.businessValue}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {project.stack.slice(0, 4).map((item) => (
                  <span key={item} className="rounded-full border border-sky-200/80 bg-sky-50 px-3 py-1 text-xs font-semibold text-slate-700 dark:border-white/10 dark:bg-white/[0.05] dark:text-slate-200">
                    {item}
                  </span>
                ))}
              </div>
              <Link href={`/projects/${project.slug}`} className="mt-6 inline-flex items-center gap-2 rounded-full bg-cyan-300 px-4 py-2 text-sm font-bold text-slate-950 transition hover:bg-white">
                View case study <ExternalLink size={15} />
              </Link>
            </article>
          ))}
        </section>
      </div>
    </main>
  );
}
