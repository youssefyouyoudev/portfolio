import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, BadgeCheck } from "lucide-react";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { getBlogPost, legacyBlogSlugs } from "@/lib/api";
import { blogPosts } from "@/lib/data";

export function generateStaticParams() {
  return [...blogPosts.map((post) => ({ slug: post.slug })), ...legacyBlogSlugs.map((slug) => ({ slug }))];
}

type BlogPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: BlogPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPost(slug);

  return {
    title: post?.title ?? "Technical Note",
    description: post?.excerpt,
    alternates: { canonical: post ? `/blog/${post.slug}` : "/blog" },
    openGraph: post
      ? {
          title: `${post.title} | Youssef Youyou`,
          description: post.excerpt,
          url: `/blog/${post.slug}`,
          type: "article",
        }
      : undefined,
    twitter: post
      ? {
          card: "summary",
          title: `${post.title} | Youssef Youyou`,
          description: post.excerpt,
        }
      : undefined,
  };
}

export default async function BlogPost({ params }: BlogPageProps) {
  const { slug } = await params;
  const post = await getBlogPost(slug);
  if (!post) notFound();

  return (
    <main className="min-h-screen overflow-hidden bg-slate-50 px-4 py-10 text-slate-950 dark:bg-[#020617] dark:text-white">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_15%_4%,rgba(14,165,233,.14),transparent_30%),radial-gradient(circle_at_85%_10%,rgba(8,145,178,.12),transparent_34%),linear-gradient(180deg,#f8fafc,#eef6ff_46%,#f8fafc)] dark:bg-[radial-gradient(circle_at_15%_4%,rgba(34,211,238,.12),transparent_30%),radial-gradient(circle_at_85%_10%,rgba(14,165,233,.14),transparent_34%),linear-gradient(180deg,#020617,#061826_46%,#020617)]" />
      <div className="relative mx-auto max-w-4xl">
        <header className="mb-8 flex flex-wrap items-center justify-between gap-3 rounded-3xl border border-sky-200/70 bg-white/78 p-3 shadow-xl shadow-sky-100/70 backdrop-blur-2xl dark:border-cyan-400/10 dark:bg-slate-950/70 dark:shadow-none">
          <Link href="/" className="rounded-2xl px-2 py-1 outline-none focus-visible:ring-2 focus-visible:ring-cyan-300">
            <span className="block text-sm font-black text-slate-950 dark:text-white">Youssef <span className="text-sky-600 dark:text-cyan-300">Youyou</span></span>
            <span className="block text-xs text-slate-500 dark:text-slate-400">Technical note</span>
          </Link>
          <div className="flex flex-wrap items-center gap-2">
            <Link href="/blog" className="inline-flex items-center gap-2 rounded-full border border-sky-200/80 bg-white/75 px-4 py-2 text-sm font-bold text-slate-700 transition hover:border-sky-400/50 hover:text-sky-700 dark:border-white/10 dark:bg-white/[0.04] dark:text-slate-200 dark:hover:border-cyan-300/35 dark:hover:text-cyan-100">
              <ArrowLeft size={16} /> Notes
            </Link>
            <ThemeToggle />
          </div>
        </header>

        <article className="rounded-[2rem] border border-sky-200/75 bg-white/90 p-6 shadow-2xl shadow-sky-100/80 backdrop-blur-xl dark:border-cyan-400/15 dark:bg-slate-900/60 dark:shadow-slate-950/30 md:p-10">
          <p className="text-sm font-black uppercase tracking-[0.24em] text-sky-700 dark:text-cyan-300">{post.category}</p>
          <h1 className="mt-4 text-balance text-4xl font-black tracking-tight md:text-5xl">{post.title}</h1>
          <p className="mt-5 text-lg leading-8 text-slate-700 dark:text-slate-300">{post.excerpt}</p>
          <div className="mt-8 rounded-2xl border border-sky-200/75 bg-sky-50 p-5 dark:border-cyan-300/15 dark:bg-cyan-300/[0.06]">
            <h2 className="text-xl font-bold text-sky-800 dark:text-cyan-100">Key points</h2>
            <ul className="mt-4 grid gap-3 text-sm leading-7 text-slate-700 dark:text-slate-300">
              {post.points.map((point) => (
                <li key={point} className="flex gap-2">
                  <BadgeCheck className="mt-0.5 shrink-0 text-sky-600 dark:text-cyan-300" size={16} />
                  {point}
                </li>
              ))}
            </ul>
          </div>
          <p className="mt-8 leading-8 text-slate-700 dark:text-slate-300">
            This note is intentionally concise: the goal is to show practical thinking without pretending to publish long expert guides before the content is fully expanded.
          </p>
        </article>
      </div>
    </main>
  );
}
