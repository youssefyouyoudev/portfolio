import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, ExternalLink } from "lucide-react";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { projects } from "@/lib/data";

export const metadata: Metadata = {
  title: "Projects & Practical Case Studies",
  description: "A collection of web platforms, dashboards, admin systems and automation tools by Youssef Youyou, focused on practical business problems.",
  alternates: { canonical: "/projects" },
  openGraph: {
    title: "Projects & Practical Case Studies | Youssef Youyou",
    description: "Web platforms, dashboards, admin systems and automation tools focused on practical business problems.",
    url: "/projects",
    images: [{ url: "/images/projects/rifitv-showcase.png", width: 1600, height: 1200, alt: "Youssef Youyou project case study showcase" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Projects & Practical Case Studies | Youssef Youyou",
    description: "Web platforms, dashboards, admin systems and automation tools focused on practical business problems.",
    images: ["/images/projects/rifitv-showcase.png"],
  },
};

export default function ProjectsPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-slate-50 px-4 py-10 text-slate-950 dark:bg-[#020617] dark:text-white">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_15%_4%,rgba(14,165,233,.14),transparent_30%),radial-gradient(circle_at_85%_10%,rgba(8,145,178,.12),transparent_34%),linear-gradient(180deg,#f8fafc,#eef6ff_46%,#f8fafc)] dark:bg-[radial-gradient(circle_at_15%_4%,rgba(34,211,238,.12),transparent_30%),radial-gradient(circle_at_85%_10%,rgba(14,165,233,.14),transparent_34%),linear-gradient(180deg,#020617,#061826_46%,#020617)]" />
      <div className="relative mx-auto max-w-7xl">
        <header className="flex flex-wrap items-center justify-between gap-3 rounded-3xl border border-sky-200/70 bg-white/78 p-3 shadow-xl shadow-sky-100/70 backdrop-blur-2xl dark:border-cyan-400/10 dark:bg-slate-950/70 dark:shadow-none">
          <Link href="/" className="rounded-2xl px-2 py-1 outline-none focus-visible:ring-2 focus-visible:ring-cyan-300">
            <span className="block text-sm font-black text-slate-950 dark:text-white">Youssef <span className="text-sky-600 dark:text-cyan-300">Youyou</span></span>
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

        <section className="mt-10 max-w-4xl">
          <p className="text-xs font-black uppercase tracking-[0.3em] text-sky-700 dark:text-cyan-300">Project Proof</p>
          <h1 className="mt-4 text-balance text-4xl font-black tracking-tight md:text-6xl">Projects & practical case studies</h1>
          <p className="mt-5 text-pretty text-lg leading-8 text-slate-700 dark:text-slate-300">
            A collection of web platforms, dashboards, admin systems and automation tools focused on practical business problems.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            {["Laravel", "React", "Dashboards", "APIs", "Automation", "Deployment"].map((chip) => (
              <span key={chip} className="rounded-full border border-sky-200/80 bg-white/75 px-3 py-1.5 text-xs font-black uppercase tracking-[0.12em] text-sky-700 dark:border-white/10 dark:bg-white/[0.05] dark:text-cyan-100">
                {chip}
              </span>
            ))}
          </div>
        </section>

        <section className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {projects.map((project, index) => (
            <article
              key={project.slug}
              className="group relative overflow-hidden rounded-3xl border border-sky-200/70 bg-white/90 p-4 shadow-2xl shadow-sky-100/80 backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-sky-400/50 hover:shadow-sky-200/80 dark:border-cyan-400/15 dark:bg-slate-900/60 dark:shadow-slate-950/30 dark:hover:border-cyan-300/35 dark:hover:shadow-cyan-500/10 md:p-5"
            >
              <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-sky-200/80 bg-sky-50 dark:border-cyan-400/15 dark:bg-slate-950">
                {project.image ? (
                  <Image
                    src={project.image}
                    alt={project.imageAlt ?? `${project.title} project showcase`}
                    fill
                    priority={index === 0}
                    loading={index === 0 ? undefined : "lazy"}
                    sizes="(min-width: 1280px) 31vw, (min-width: 768px) 48vw, 92vw"
                    className="object-cover transition duration-700 group-hover:scale-[1.035]"
                  />
                ) : (
                  <div className="grid h-full place-items-center p-6 text-center">
                    <p className="text-2xl font-black">{project.title}</p>
                  </div>
                )}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/35 via-transparent to-transparent dark:from-slate-950/55" />
                <span className="absolute left-3 top-3 rounded-full border border-white/15 bg-slate-950/70 px-3 py-1 text-[11px] font-black uppercase tracking-[0.14em] text-cyan-100 shadow-lg backdrop-blur-md">
                  Case-study visual
                </span>
              </div>

              <p className="mt-5 text-xs font-black uppercase tracking-[0.16em] text-sky-700 dark:text-cyan-300">{project.category}</p>
              <h2 className="mt-3 text-2xl font-black text-slate-950 dark:text-white">{project.title}</h2>
              <p className="mt-1 text-sm font-bold text-sky-700 dark:text-cyan-200">{project.subtitle}</p>
              <p className="mt-3 text-sm leading-7 text-slate-700 dark:text-slate-300">{project.shortDescription}</p>
              <div className="mt-4 rounded-2xl border border-sky-200/80 bg-sky-50 p-4 text-sm leading-7 text-slate-700 dark:border-cyan-300/15 dark:bg-cyan-300/[0.06] dark:text-cyan-50">
                <span className="font-bold text-sky-700 dark:text-cyan-200">Business value: </span>
                {project.businessValue}
              </div>
              <ul className="mt-4 grid gap-2 text-sm text-slate-700 dark:text-slate-300">
                {project.features.slice(0, 3).map((item) => (
                  <li key={item} className="flex gap-2">
                    <CheckCircle2 className="mt-0.5 shrink-0 text-sky-600 dark:text-cyan-300" size={15} />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-5 flex flex-wrap gap-2">
                {project.stack.slice(0, 5).map((item) => (
                  <span key={item} className="rounded-full border border-sky-200/80 bg-sky-50 px-3 py-1 text-xs font-semibold text-slate-700 dark:border-white/10 dark:bg-white/[0.05] dark:text-slate-200">
                    {item}
                  </span>
                ))}
              </div>
              <Link href={project.caseStudyUrl} className="mt-6 inline-flex items-center gap-2 rounded-full bg-cyan-300 px-4 py-2 text-sm font-bold text-slate-950 transition hover:bg-white focus:outline-none focus:ring-2 focus:ring-cyan-300 focus:ring-offset-2 focus:ring-offset-slate-950">
                View case study <ExternalLink size={15} />
              </Link>
            </article>
          ))}
        </section>

        <section className="mt-10 rounded-[2rem] border border-sky-300/50 bg-gradient-to-br from-sky-50 to-white p-6 text-center shadow-2xl shadow-sky-100/80 dark:border-cyan-300/20 dark:from-cyan-300/10 dark:to-slate-900/60 dark:shadow-cyan-500/10 md:p-10">
          <h2 className="text-balance text-3xl font-black md:text-4xl">Need a similar website, dashboard, API or internal tool?</h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-slate-700 dark:text-slate-300">
            Send the business goal, current workflow and ideal timeline. I will help shape it into a practical full-stack solution.
          </p>
          <Link href="/contact" className="mt-6 inline-flex items-center gap-2 rounded-full bg-cyan-300 px-5 py-3 text-sm font-bold text-slate-950 transition hover:bg-white">
            Contact me <ExternalLink size={15} />
          </Link>
        </section>
      </div>
    </main>
  );
}
