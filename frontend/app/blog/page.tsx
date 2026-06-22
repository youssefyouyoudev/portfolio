import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowRight, BookOpenText } from "lucide-react";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { getBlogPosts } from "@/lib/api";

export const metadata: Metadata = {
  title: "Technical Notes",
  description: "Short practical notes by Youssef Youyou about dashboards, APIs, automation, Laravel, React and production-minded web development.",
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "Technical Notes | Youssef Youyou",
    description: "Practical notes about dashboards, APIs, automation and production-minded web development.",
    url: "/blog",
  },
  twitter: {
    card: "summary",
    title: "Technical Notes | Youssef Youyou",
    description: "Practical notes about dashboards, APIs, automation and production-minded web development.",
  },
};

export default async function BlogPage() {
  const blogPosts = await getBlogPosts();

  return (
    <main className="min-h-screen overflow-hidden bg-slate-50 px-4 py-10 text-slate-950 dark:bg-[#020617] dark:text-white">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_15%_4%,rgba(14,165,233,.14),transparent_30%),radial-gradient(circle_at_85%_10%,rgba(8,145,178,.12),transparent_34%),linear-gradient(180deg,#f8fafc,#eef6ff_46%,#f8fafc)] dark:bg-[radial-gradient(circle_at_15%_4%,rgba(34,211,238,.12),transparent_30%),radial-gradient(circle_at_85%_10%,rgba(14,165,233,.14),transparent_34%),linear-gradient(180deg,#020617,#061826_46%,#020617)]" />
      <div className="relative mx-auto max-w-7xl">
        <header className="flex flex-wrap items-center justify-between gap-3 rounded-3xl border border-sky-200/70 bg-white/78 p-3 shadow-xl shadow-sky-100/70 backdrop-blur-2xl dark:border-cyan-400/10 dark:bg-slate-950/70 dark:shadow-none">
          <Link href="/" className="rounded-2xl px-2 py-1 outline-none focus-visible:ring-2 focus-visible:ring-cyan-300">
            <span className="block text-sm font-black text-slate-950 dark:text-white">Youssef <span className="text-sky-600 dark:text-cyan-300">Youyou</span></span>
            <span className="block text-xs text-slate-500 dark:text-slate-400">Technical notes</span>
          </Link>
          <div className="flex flex-wrap items-center gap-2">
            <Link href="/#blog" className="inline-flex items-center gap-2 rounded-full border border-sky-200/80 bg-white/75 px-4 py-2 text-sm font-bold text-slate-700 transition hover:border-sky-400/50 hover:text-sky-700 dark:border-white/10 dark:bg-white/[0.04] dark:text-slate-200 dark:hover:border-cyan-300/35 dark:hover:text-cyan-100">
              <ArrowLeft size={16} /> Homepage
            </Link>
            <ThemeToggle />
          </div>
        </header>

        <section className="mt-10 max-w-4xl">
          <p className="text-xs font-black uppercase tracking-[0.3em] text-sky-700 dark:text-cyan-300">Technical Notes</p>
          <h1 className="mt-4 text-balance text-4xl font-black tracking-tight md:text-6xl">Technical writing that supports trust</h1>
          <p className="mt-5 text-pretty text-lg leading-8 text-slate-700 dark:text-slate-300">
            Short practical notes about dashboards, APIs, automation and production-minded web development.
          </p>
        </section>

        <section className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {blogPosts.map((post) => (
            <article
              key={post.slug}
              className="group rounded-3xl border border-sky-200/70 bg-white/90 p-6 shadow-2xl shadow-sky-100/80 backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-sky-400/50 dark:border-cyan-400/15 dark:bg-slate-900/60 dark:shadow-slate-950/30 dark:hover:border-cyan-300/35"
            >
              <div className="flex items-center justify-between gap-4">
                <BookOpenText className="text-sky-600 dark:text-cyan-300" size={22} />
                <span className="rounded-full border border-sky-200/75 bg-sky-50 px-3 py-1 text-[11px] font-black uppercase tracking-[0.14em] text-sky-700 dark:border-white/10 dark:bg-white/[0.05] dark:text-cyan-100">
                  {post.category}
                </span>
              </div>
              <h2 className="mt-5 text-2xl font-black text-slate-950 dark:text-white">{post.title}</h2>
              <p className="mt-3 text-sm leading-7 text-slate-700 dark:text-slate-300">{post.excerpt}</p>
              <Link href={`/blog/${post.slug}`} className="mt-6 inline-flex items-center gap-2 rounded-full bg-cyan-300 px-4 py-2 text-sm font-bold text-slate-950 transition hover:bg-white">
                Read note <ArrowRight size={15} />
              </Link>
            </article>
          ))}
        </section>
      </div>
    </main>
  );
}
