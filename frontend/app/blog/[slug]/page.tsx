import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, BadgeCheck, ListChecks } from "lucide-react";
import { CopyCodeBlock } from "@/components/blog/CopyCodeBlock";
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
          card: "summary_large_image",
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
  const sections = "sections" in post && Array.isArray(post.sections) ? post.sections : [];
  const checklist = "checklist" in post && Array.isArray(post.checklist) ? post.checklist : post.points;
  const relatedProjects = "relatedProjects" in post && Array.isArray(post.relatedProjects) ? post.relatedProjects : [];
  const relatedServices = "relatedServices" in post && Array.isArray(post.relatedServices) ? post.relatedServices : [];
  const publishedDate = "2026-07-07";
  const updatedDate = "2026-07-07";
  const readingTime = Math.max(6, Math.ceil((sections.reduce((total, section) => total + section.body.join(" ").split(/\s+/).length, 0) + post.excerpt.split(/\s+/).length) / 180));
  const currentIndex = blogPosts.findIndex((item) => item.slug === post.slug);
  const previousPost = currentIndex > 0 ? blogPosts[currentIndex - 1] : null;
  const nextPost = currentIndex >= 0 && currentIndex < blogPosts.length - 1 ? blogPosts[currentIndex + 1] : null;
  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: post.title,
      description: post.excerpt,
      url: `https://youssefyouyou.com/blog/${post.slug}`,
      datePublished: publishedDate,
      dateModified: updatedDate,
      timeRequired: `PT${readingTime}M`,
      author: {
        "@type": "Person",
        name: "Youssef Youyou",
        jobTitle: "Senior Full-Stack Web Developer",
        url: "https://youssefyouyou.com",
      },
      publisher: {
        "@type": "Person",
        name: "Youssef Youyou",
      },
      mainEntityOfPage: `https://youssefyouyou.com/blog/${post.slug}`,
      keywords: [post.category, "Laravel", "React", "Next.js", "dashboards", "deployment", "SEO"].join(", "),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://youssefyouyou.com" },
        { "@type": "ListItem", position: 2, name: "Blog", item: "https://youssefyouyou.com/blog" },
        { "@type": "ListItem", position: 3, name: post.title, item: `https://youssefyouyou.com/blog/${post.slug}` },
      ],
    },
  ];

  return (
    <main className="min-h-screen overflow-hidden bg-slate-50 px-4 py-10 text-slate-950 dark:bg-[#020617] dark:text-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
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
          <div className="mt-5 flex flex-wrap gap-2 text-xs font-bold uppercase tracking-[0.12em] text-slate-600 dark:text-slate-400">
            <span>Published {publishedDate}</span>
            <span>Updated {updatedDate}</span>
            <span>{readingTime} min read</span>
          </div>
          <div className="mt-8 rounded-2xl border border-sky-200/75 bg-sky-50 p-5 dark:border-cyan-300/15 dark:bg-cyan-300/[0.06]">
            <h2 className="text-xl font-bold text-sky-800 dark:text-cyan-100">Table of contents</h2>
            <div className="mt-4 grid gap-2 text-sm leading-7 text-slate-700 dark:text-slate-300">
              {(sections.length ? sections : [{ heading: "Key points" }]).map((section) => (
                <a key={section.heading} href={`#${section.heading.toLowerCase().replaceAll(" ", "-")}`} className="inline-flex items-center gap-2 font-semibold hover:text-sky-700 dark:hover:text-cyan-100">
                  <ArrowRight size={14} /> {section.heading}
                </a>
              ))}
            </div>
          </div>

          {sections.length ? (
            <div className="mt-10 grid gap-8">
              {sections.map((section) => (
                <section key={section.heading} id={section.heading.toLowerCase().replaceAll(" ", "-")} className="scroll-mt-24">
                  <h2 className="text-2xl font-black text-slate-950 dark:text-white">{section.heading}</h2>
                  <div className="mt-4 grid gap-4 text-base leading-8 text-slate-700 dark:text-slate-300">
                    {section.body.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>
                  {section.code ? <CopyCodeBlock code={section.code} /> : null}
                </section>
              ))}
            </div>
          ) : (
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
          )}

          <section className="mt-10 rounded-2xl border border-sky-200/75 bg-sky-50 p-5 dark:border-cyan-300/15 dark:bg-cyan-300/[0.06]">
            <ListChecks className="text-sky-600 dark:text-cyan-300" />
            <h2 className="mt-3 text-xl font-bold text-sky-800 dark:text-cyan-100">Final checklist</h2>
            <ul className="mt-4 grid gap-3 text-sm leading-7 text-slate-700 dark:text-slate-300 sm:grid-cols-2">
              {checklist.map((item) => (
                <li key={item} className="flex gap-2">
                  <BadgeCheck className="mt-0.5 shrink-0 text-sky-600 dark:text-cyan-300" size={16} />
                  {item}
                </li>
              ))}
            </ul>
          </section>

          <section className="mt-10 grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-sky-200/75 bg-white/75 p-5 dark:border-white/10 dark:bg-white/[0.04]">
              <h2 className="text-xl font-bold text-slate-950 dark:text-white">Related projects</h2>
              <div className="mt-4 grid gap-3 text-sm font-semibold text-sky-700 dark:text-cyan-200">
                {relatedProjects.map((projectSlug) => (
                  <Link key={projectSlug} href={`/projects/${projectSlug}`}>View {projectSlug.replaceAll("-", " ")} case study</Link>
                ))}
              </div>
            </div>
            <div className="rounded-2xl border border-sky-200/75 bg-white/75 p-5 dark:border-white/10 dark:bg-white/[0.04]">
              <h2 className="text-xl font-bold text-slate-950 dark:text-white">Related services</h2>
              <div className="mt-4 grid gap-3 text-sm font-semibold text-sky-700 dark:text-cyan-200">
                {relatedServices.map((serviceSlug) => (
                  <Link key={serviceSlug} href={`/services/${serviceSlug}`}>Open {serviceSlug.replaceAll("-", " ")}</Link>
                ))}
              </div>
            </div>
          </section>

          <section className="mt-10 rounded-2xl border border-sky-300/50 bg-gradient-to-br from-sky-50 via-white to-cyan-50 p-6 dark:border-cyan-300/20 dark:from-cyan-300/10 dark:via-slate-900/60 dark:to-slate-950">
            <h2 className="text-2xl font-black text-slate-950 dark:text-white">Need help with something similar?</h2>
            <p className="mt-3 text-sm leading-7 text-slate-700 dark:text-slate-300">
              If this article matches a deployment, dashboard, Laravel API, React frontend or SEO problem in your project, send me the context and I will help turn it into a practical technical scope.
            </p>
            <Link href="/work-with-me" className="mt-5 inline-flex min-h-11 items-center gap-2 rounded-full bg-gradient-to-r from-sky-500 to-cyan-300 px-5 text-sm font-black text-white shadow-lg shadow-cyan-500/20 transition hover:-translate-y-0.5">
              Request estimate <ArrowRight size={15} />
            </Link>
          </section>

          {(previousPost || nextPost) && (
            <nav aria-label="Previous and next technical notes" className="mt-10 grid gap-4 md:grid-cols-2">
              {previousPost ? (
                <Link href={`/blog/${previousPost.slug}`} className="rounded-2xl border border-sky-200/75 bg-white/75 p-5 transition hover:border-sky-400/50 dark:border-white/10 dark:bg-white/[0.04]">
                  <span className="text-xs font-black uppercase tracking-[0.18em] text-sky-700 dark:text-cyan-300">Previous</span>
                  <span className="mt-2 block font-black text-slate-950 dark:text-white">{previousPost.title}</span>
                </Link>
              ) : <span />}
              {nextPost ? (
                <Link href={`/blog/${nextPost.slug}`} className="rounded-2xl border border-sky-200/75 bg-white/75 p-5 text-right transition hover:border-sky-400/50 dark:border-white/10 dark:bg-white/[0.04]">
                  <span className="text-xs font-black uppercase tracking-[0.18em] text-sky-700 dark:text-cyan-300">Next</span>
                  <span className="mt-2 block font-black text-slate-950 dark:text-white">{nextPost.title}</span>
                </Link>
              ) : <span />}
            </nav>
          )}
        </article>
      </div>
    </main>
  );
}
