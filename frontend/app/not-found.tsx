import Link from "next/link";
import { FolderKanban, Home, Mail } from "lucide-react";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

export default function NotFound() {
  return (
    <main className="min-h-screen overflow-hidden bg-slate-50 px-4 py-10 text-slate-950 dark:bg-[#020617] dark:text-white">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_15%_4%,rgba(14,165,233,.14),transparent_30%),radial-gradient(circle_at_85%_10%,rgba(8,145,178,.12),transparent_34%),linear-gradient(180deg,#f8fafc,#eef6ff_46%,#f8fafc)] dark:bg-[radial-gradient(circle_at_15%_4%,rgba(34,211,238,.12),transparent_30%),radial-gradient(circle_at_85%_10%,rgba(14,165,233,.14),transparent_34%),linear-gradient(180deg,#020617,#061826_46%,#020617)]" />
      <div className="relative mx-auto max-w-5xl">
        <header className="flex items-center justify-between rounded-3xl border border-sky-200/70 bg-white/78 p-3 shadow-xl shadow-sky-100/70 backdrop-blur-2xl dark:border-cyan-400/10 dark:bg-slate-950/70 dark:shadow-none">
          <Link href="/" className="rounded-2xl px-2 py-1 outline-none focus-visible:ring-2 focus-visible:ring-cyan-300">
            <span className="block text-sm font-black text-slate-950 dark:text-white">Youssef <span className="text-sky-600 dark:text-cyan-300">Youyou</span></span>
            <span className="block text-xs text-slate-500 dark:text-slate-400">Senior Full-Stack Web Developer</span>
          </Link>
          <ThemeToggle />
        </header>

        <section className="mt-16 rounded-[2rem] border border-sky-200/75 bg-white/88 p-8 text-center shadow-2xl shadow-sky-100/80 backdrop-blur-xl dark:border-cyan-400/15 dark:bg-slate-900/58 dark:shadow-slate-950/30 md:p-12">
          <p className="text-xs font-black uppercase tracking-[0.3em] text-sky-700 dark:text-cyan-300">404</p>
          <h1 className="mt-4 text-balance text-4xl font-black tracking-tight md:text-6xl">Page not found</h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-700 dark:text-slate-300">
            This page may have moved, but you can still explore my services, projects or contact me about a Laravel, React, Next.js, dashboard or business automation project.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link href="/" className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-sky-500 to-cyan-300 px-5 text-sm font-black text-white shadow-lg shadow-cyan-500/20 transition hover:-translate-y-0.5">
              <Home size={16} /> Go Home
            </Link>
            <Link href="/projects" className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-sky-200/80 bg-white/75 px-5 text-sm font-bold text-slate-800 transition hover:border-sky-400/50 hover:text-sky-700 dark:border-white/10 dark:bg-white/[0.04] dark:text-slate-100 dark:hover:border-cyan-300/35">
              <FolderKanban size={16} /> View Projects
            </Link>
            <Link href="/contact" className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-sky-200/80 bg-white/75 px-5 text-sm font-bold text-slate-800 transition hover:border-sky-400/50 hover:text-sky-700 dark:border-white/10 dark:bg-white/[0.04] dark:text-slate-100 dark:hover:border-cyan-300/35">
              <Mail size={16} /> Contact Me
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
