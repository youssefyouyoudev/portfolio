import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BadgeCheck } from "lucide-react";
import { JsonLd } from "@/components/seo/JsonLd";
import { profile } from "@/lib/data";
import { pageMetadata, siteUrl } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "About Youssef Youyou",
  description: "Learn about Youssef Youyou, a full-stack developer in Morocco building Laravel, React, Next.js, SaaS, dashboard and automation solutions.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 text-slate-950 dark:bg-[#020617] dark:text-white">
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
          { "@type": "ListItem", position: 2, name: "About", item: `${siteUrl}/about` },
        ],
      }} />
      <div className="mx-auto max-w-5xl">
        <Link href="/" className="text-sm font-bold text-sky-700 dark:text-cyan-200">← Home</Link>
        <section className="mt-8 rounded-[2rem] border border-sky-200/75 bg-white/90 p-7 shadow-2xl shadow-sky-100/70 dark:border-cyan-400/15 dark:bg-slate-900/60 dark:shadow-none md:p-12">
          <p className="text-xs font-black uppercase tracking-[0.28em] text-sky-700 dark:text-cyan-300">About</p>
          <h1 className="mt-4 text-4xl font-black tracking-tight md:text-6xl">Full-stack development grounded in real business needs</h1>
          <p className="mt-6 text-lg leading-8 text-slate-700 dark:text-slate-300">{profile.description}</p>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {[
              ["Backend", "Laravel APIs, authentication, business logic and MySQL data models."],
              ["Frontend", "React and Next.js interfaces for websites, products and dashboards."],
              ["Delivery", "Technical SEO, deployment, security-minded configuration and automation."],
            ].map(([title, text]) => (
              <article key={title} className="rounded-3xl border border-sky-200/75 bg-sky-50/80 p-5 dark:border-white/10 dark:bg-white/[0.04]">
                <BadgeCheck className="text-sky-600 dark:text-cyan-300" />
                <h2 className="mt-4 text-xl font-black">{title}</h2>
                <p className="mt-2 text-sm leading-7 text-slate-600 dark:text-slate-300">{text}</p>
              </article>
            ))}
          </div>
          <Link href="/contact" className="mt-8 inline-flex items-center gap-2 rounded-full bg-cyan-300 px-6 py-3 font-black text-slate-950">
            Discuss a project <ArrowRight size={17} />
          </Link>
        </section>
      </div>
    </main>
  );
}

