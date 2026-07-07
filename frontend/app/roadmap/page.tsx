import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { growthTasks, growthWeeks } from "@/lib/seo-growth-plan";
import { seoKeywordMap } from "@/lib/seo-keywords";

export const metadata: Metadata = {
  title: "60-Day SEO and Hiring Roadmap | Youssef Youyou",
  description: "A public-safe 60-day SEO and hiring roadmap for improving Youssef Youyou's portfolio visibility, content depth and conversion.",
  alternates: { canonical: "/roadmap" },
  robots: { index: false, follow: true },
};

export default function RoadmapPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-slate-50 px-4 py-10 text-slate-950 dark:bg-[#020617] dark:text-white">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_15%_4%,rgba(14,165,233,.14),transparent_30%),linear-gradient(180deg,#f8fafc,#eef6ff_46%,#f8fafc)] dark:bg-[radial-gradient(circle_at_15%_4%,rgba(34,211,238,.12),transparent_30%),linear-gradient(180deg,#020617,#061826_46%,#020617)]" />
      <div className="relative mx-auto max-w-7xl">
        <header className="flex flex-wrap items-center justify-between gap-3 rounded-3xl border border-sky-200/70 bg-white/78 p-3 shadow-xl shadow-sky-100/70 backdrop-blur-2xl dark:border-cyan-400/10 dark:bg-slate-950/70">
          <Link href="/" className="rounded-2xl px-2 py-1 outline-none focus-visible:ring-2 focus-visible:ring-cyan-300">
            <span className="block text-sm font-black text-slate-950 dark:text-white">Youssef <span className="text-sky-600 dark:text-cyan-300">Youyou</span></span>
            <span className="block text-xs text-slate-500 dark:text-slate-400">60-Day Growth Roadmap</span>
          </Link>
          <div className="flex items-center gap-2">
            <Link href="/" className="inline-flex items-center gap-2 rounded-full border border-sky-200/80 bg-white/75 px-4 py-2 text-sm font-bold text-slate-700 dark:border-white/10 dark:bg-white/[0.04] dark:text-slate-200">
              <ArrowLeft size={16} /> Home
            </Link>
            <ThemeToggle />
          </div>
        </header>

        <section className="mt-10 rounded-[2rem] border border-sky-200/75 bg-white/88 p-6 shadow-2xl shadow-sky-100/80 backdrop-blur-xl dark:border-cyan-400/15 dark:bg-slate-900/58 md:p-10">
          <p className="text-xs font-black uppercase tracking-[0.28em] text-sky-700 dark:text-cyan-300">Public-safe execution plan</p>
          <h1 className="mt-4 text-balance text-4xl font-black tracking-tight md:text-6xl">60-Day SEO + Hiring Growth Checklist</h1>
          <p className="mt-6 max-w-4xl text-lg leading-8 text-slate-700 dark:text-slate-300">
            This roadmap turns the portfolio into a client and hiring acquisition machine by improving technical SEO, local Nador visibility, Morocco service pages, case studies, blog authority, backlinks, LinkedIn content, conversion and Search Console iteration.
          </p>
        </section>

        <section className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {growthWeeks.map((week, index) => (
            <article key={week} className="rounded-3xl border border-sky-200/75 bg-white/88 p-5 shadow-xl shadow-sky-100/70 dark:border-white/10 dark:bg-white/[0.045]">
              <p className="text-xs font-black uppercase tracking-[0.18em] text-sky-700 dark:text-cyan-300">Week {index + 1}</p>
              <h2 className="mt-3 text-xl font-black">{week}</h2>
              <div className="mt-4 grid gap-3">
                {growthTasks.filter((task) => task.dueWeek === index + 1).map((task) => (
                  <div key={task.title} className="rounded-2xl border border-sky-200/80 bg-sky-50/80 p-4 text-sm dark:border-cyan-400/15 dark:bg-cyan-300/[0.055]">
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="mt-0.5 shrink-0 text-sky-600 dark:text-cyan-300" size={16} />
                      <div>
                        <p className="font-black">{task.title}</p>
                        <p className="mt-1 text-xs text-slate-600 dark:text-slate-300">{task.pageAffected} - {task.status} - {task.priority}</p>
                        <p className="mt-2 text-xs leading-5 text-slate-600 dark:text-slate-300">{task.expectedResult}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </article>
          ))}
        </section>

        <section className="mt-8 rounded-3xl border border-sky-200/75 bg-white/88 p-6 shadow-xl shadow-sky-100/70 dark:border-white/10 dark:bg-white/[0.045] md:p-8">
          <h2 className="text-2xl font-black">Keyword clusters and target pages</h2>
          <div className="mt-6 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            {seoKeywordMap.slice(0, 18).map((item) => (
              <Link key={item.keyword} href={item.targetPage} className="rounded-2xl border border-sky-200/80 bg-sky-50/80 p-4 transition hover:border-sky-400/50 dark:border-cyan-400/15 dark:bg-cyan-300/[0.055]">
                <p className="text-sm font-black">{item.keyword}</p>
                <p className="mt-1 text-xs text-sky-700 dark:text-cyan-200">{item.cluster}</p>
                <p className="mt-2 text-xs leading-5 text-slate-600 dark:text-slate-300">{item.intent}</p>
              </Link>
            ))}
          </div>
          <Link href="/work-with-me" className="mt-8 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-sky-500 to-cyan-300 px-5 py-3 text-sm font-black text-white shadow-lg shadow-cyan-500/20">
            Request Estimate <ArrowRight size={16} />
          </Link>
        </section>
      </div>
    </main>
  );
}
