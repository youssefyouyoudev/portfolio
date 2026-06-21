import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { blogPosts } from "@/lib/data";

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

type BlogPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: BlogPageProps) {
  const { slug } = await params;
  const post = blogPosts.find((item) => item.slug === slug);
  return { title: post?.title, description: post?.excerpt };
}

export default async function BlogPost({ params }: BlogPageProps) {
  const { slug } = await params;
  const post = blogPosts.find((item) => item.slug === slug);
  if (!post) notFound();

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 text-slate-950 dark:bg-[#020617] dark:text-white">
      <article className="mx-auto max-w-3xl rounded-[2rem] border border-sky-200/75 bg-white/85 p-6 shadow-2xl shadow-sky-100/80 dark:border-white/10 dark:bg-white/[0.04] dark:shadow-slate-950/30 md:p-10">
        <Link href="/#blog" className="inline-flex items-center gap-2 text-sm font-bold text-sky-700 dark:text-cyan-200"><ArrowLeft size={16} /> Back to technical notes</Link>
        <p className="mt-10 text-sm font-black uppercase tracking-[0.24em] text-sky-700 dark:text-cyan-300">{post.category}</p>
        <h1 className="mt-4 text-4xl font-black">{post.title}</h1>
        <p className="mt-5 leading-8 text-slate-700 dark:text-slate-300">{post.excerpt}</p>
        <div className="mt-8 rounded-2xl border border-sky-200/75 bg-sky-50 p-5 dark:border-white/10 dark:bg-white/[0.04]">
          <h2 className="text-xl font-bold text-sky-800 dark:text-cyan-100">Key points</h2>
          <ul className="mt-4 grid gap-3 text-sm leading-7 text-slate-700 dark:text-slate-300">
            {post.points.map((point) => (
              <li key={point} className="border-l-2 border-sky-400 pl-3 dark:border-cyan-300">{point}</li>
            ))}
          </ul>
        </div>
        <p className="mt-8 leading-8 text-slate-700 dark:text-slate-300">
          This is intentionally concise: the goal is to show practical thinking without pretending to publish long expert guides before the content is fully expanded.
        </p>
      </article>
    </main>
  );
}
