import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowRight, CalendarDays, ClipboardCheck, ShieldCheck } from "lucide-react";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { jawbiqStartDate, jawbiqTargetDate, jawbiqWeeks } from "@/lib/jawbiq-roadmap";

export const metadata: Metadata = {
  title: "JAWBIQ — 56-Day SaaS Build & Delivery Roadmap | Youssef Youyou",
  description: "The proposed 56-day roadmap for JAWBIQ, a Moroccan AI WhatsApp receptionist SaaS: Meta Cloud API, Laravel, Next.js, Ollama, security, pilots and delivery.",
  alternates: { canonical: "/projects/jawbiq/roadmap" },
};

function dayDate(day: number) {
  const date = new Date(jawbiqStartDate + "T12:00:00Z");
  date.setUTCDate(date.getUTCDate() + day - 1);
  return date.toLocaleDateString("en-GB", { timeZone: "UTC", day: "numeric", month: "short" });
}

export default function JawbiqRoadmapPage() {
  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 text-slate-950 dark:bg-[#020617] dark:text-white">
      <div className="mx-auto max-w-6xl">
        <header className="flex flex-wrap items-center justify-between gap-3 rounded-3xl border border-emerald-200/70 bg-white p-4 dark:border-teal-400/15 dark:bg-slate-900">
          <Link href="/projects/jawbiq" className="inline-flex items-center gap-2 text-sm font-bold text-slate-700 hover:text-emerald-700 dark:text-slate-200">
            <ArrowLeft size={16} /> Back to JAWBIQ case study
          </Link>
          <ThemeToggle />
        </header>

        <section className="mt-8 rounded-[2rem] border border-emerald-200 bg-gradient-to-br from-emerald-50 to-white p-6 dark:border-teal-300/20 dark:from-[#092c30] dark:to-[#061522] md:p-10">
          <span className="inline-flex rounded-full border border-emerald-300 px-3 py-1 text-xs font-black uppercase tracking-[.16em] text-emerald-800 dark:text-emerald-200">
            Planning document · Not launched
          </span>
          <h1 className="mt-5 text-4xl font-black tracking-tight md:text-6xl">
            JAWB<span className="text-emerald-600 dark:text-teal-300">IQ</span> — 56-day development roadmap
          </h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-700 dark:text-slate-300">
            An end-to-end development plan for a business-focused AI WhatsApp receptionist, built with Laravel, Next.js, local Ollama AI and Meta’s official Cloud API.
          </p>
          <div className="mt-7 grid gap-3 sm:grid-cols-3">
            <div className="rounded-2xl bg-white/80 p-4 dark:bg-white/[.06]"><CalendarDays className="mb-2 text-emerald-600 dark:text-teal-300" size={22}/><p className="text-xs font-bold uppercase tracking-wide text-slate-500 dark:text-slate-400">Target window</p><p className="mt-1 font-black">16 Nov 2026 – 10 Jan 2027</p></div>
            <div className="rounded-2xl bg-white/80 p-4 dark:bg-white/[.06]"><ClipboardCheck className="mb-2 text-emerald-600 dark:text-teal-300" size={22}/><p className="text-xs font-bold uppercase tracking-wide text-slate-500 dark:text-slate-400">Work breakdown</p><p className="mt-1 font-black">8 weeks · 56 daily tasks</p></div>
            <div className="rounded-2xl bg-white/80 p-4 dark:bg-white/[.06]"><ShieldCheck className="mb-2 text-emerald-600 dark:text-teal-300" size={22}/><p className="text-xs font-bold uppercase tracking-wide text-slate-500 dark:text-slate-400">Release condition</p><p className="mt-1 font-black">Security, pilot and QA sign-off</p></div>
          </div>
          <p className="mt-5 text-sm text-slate-600 dark:text-slate-300">
            Proposed targets, not completed work. Delivery depends on Meta onboarding, the testing outcome and pilot acceptance.
            The timeline contains calendar days, including weekends. Actual status must be updated only with evidence.
          </p>
        </section>

        <section aria-label="Weekly development tasks" className="mt-8 space-y-7">
          {jawbiqWeeks.map((week, weekIndex) => (
            <article key={week.title} className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-slate-900/75 md:p-8">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="text-xs font-black uppercase tracking-[.18em] text-emerald-700 dark:text-teal-300">Week {weekIndex + 1} · Days {weekIndex * 7 + 1}–{weekIndex * 7 + 7}</p>
                  <h2 className="mt-2 text-2xl font-black">{week.title}</h2>
                  <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600 dark:text-slate-300">{week.goal}</p>
                </div>
                <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-bold text-amber-800 dark:bg-amber-400/10 dark:text-amber-100">Planned</span>
              </div>
              <ol className="mt-6 grid gap-3 md:grid-cols-2">
                {week.days.map((task, index) => {
                  const day = weekIndex * 7 + index + 1;
                  return (
                    <li key={day} className="rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-white/10 dark:bg-white/[.04]">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <span className="text-xs font-black uppercase tracking-[.12em] text-emerald-700 dark:text-teal-300">Day {day}</span>
                        <time dateTime={new Date(Date.parse(jawbiqStartDate + "T12:00:00Z") + (day - 1) * 86400000).toISOString().slice(0, 10)} className="text-xs text-slate-500 dark:text-slate-400">{dayDate(day)}</time>
                      </div>
                      <h3 className="mt-2 text-base font-black">{task.title}</h3>
                      <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">{task.acceptance}</p>
                    </li>
                  );
                })}
              </ol>
            </article>
          ))}
        </section>

        <section className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 dark:border-white/10 dark:bg-slate-900 md:p-8">
          <h2 className="text-2xl font-black">Definition of done</h2>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-7 text-slate-700 dark:text-slate-300">
            <li>Official Meta webhook signatures and message deduplication pass automated tests.</li>
            <li>Company-scoped authentication, knowledge, messages and staff access pass cross-tenant tests.</li>
            <li>Human handoff, multilingual FAQ replies, usage controls and billing reconciliation are demonstrated.</li>
            <li>Backups, monitoring, consent, retention, documentation and rollback procedures are verified.</li>
            <li>Three pilot configurations and a written release acceptance record are delivered.</li>
          </ul>
          <p className="mt-4 text-xs text-slate-500 dark:text-slate-400">Start: {jawbiqStartDate}. Target: {jawbiqTargetDate}. No public customer or performance claims are made by this plan.</p>
          <Link href="/projects/jawbiq" className="mt-6 inline-flex items-center gap-2 font-bold text-emerald-700 hover:underline dark:text-teal-300">
            View the project concept <ArrowRight size={17}/>
          </Link>
        </section>
      </div>
    </main>
  );
}
