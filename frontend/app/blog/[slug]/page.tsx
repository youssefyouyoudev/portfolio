import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { blogPosts } from "@/lib/data";

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const post = blogPosts.find((item) => item.slug === params.slug);
  return { title: post?.title, description: post?.excerpt };
}

export default function BlogPost({ params }: { params: { slug: string } }) {
  const post = blogPosts.find((item) => item.slug === params.slug);
  if (!post) notFound();

  return (
    <main className="min-h-screen bg-[#020817] px-4 py-10 text-white">
      <article className="mx-auto max-w-3xl rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 md:p-10">
        <Link href="/#blog" className="inline-flex items-center gap-2 text-cyan-200"><ArrowLeft size={16} /> Back to blog</Link>
        <p className="mt-10 text-sm uppercase tracking-[0.24em] text-cyan-300">Draft article</p>
        <h1 className="mt-4 text-4xl font-black">{post.title}</h1>
        <p className="mt-5 leading-8 text-slate-300">{post.excerpt}</p>
        <div className="mt-8 space-y-5 text-slate-300">
          <p>This article is ready to be expanded from real notes: business problem, technical decisions, implementation details, deployment considerations and measurable lessons learned.</p>
          <p>Keeping blog content close to actual work supports SEO while showing recruiters and clients how you think through production systems.</p>
        </div>
      </article>
    </main>
  );
}
