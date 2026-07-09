import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { JsonLd } from "@/components/seo/JsonLd";
import { servicePages } from "@/lib/service-content";
import { pageMetadata, siteUrl } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Web Development Services",
  description: "Laravel, React, Next.js, SaaS MVP, admin dashboard, API, automation, business website and deployment services from Morocco.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 text-slate-950 dark:bg-[#020617] dark:text-white">
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
          { "@type": "ListItem", position: 2, name: "Services", item: `${siteUrl}/services` },
        ],
      }} />
      <div className="mx-auto max-w-7xl">
        <Link href="/" className="text-sm font-bold text-sky-700 dark:text-cyan-200">← Home</Link>
        <header className="mt-8 max-w-4xl">
          <p className="text-xs font-black uppercase tracking-[0.28em] text-sky-700 dark:text-cyan-300">Services</p>
          <h1 className="mt-4 text-4xl font-black tracking-tight md:text-6xl">Full-stack web development for products and business systems</h1>
          <p className="mt-5 text-lg leading-8 text-slate-700 dark:text-slate-300">Choose a focused service page for Laravel, React, Next.js, dashboards, SaaS, automation, APIs, websites or production delivery.</p>
        </header>
        <section className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {servicePages.map((service) => (
            <article key={service.slug} className="rounded-3xl border border-sky-200/75 bg-white/90 p-6 shadow-xl shadow-sky-100/60 dark:border-white/10 dark:bg-white/[0.045] dark:shadow-none">
              <h2 className="text-xl font-black">{service.h1}</h2>
              <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">{service.metaDescription}</p>
              <Link href={`/services/${service.slug}`} className="mt-5 inline-flex items-center gap-2 font-bold text-sky-700 dark:text-cyan-200">
                View service <ArrowRight size={15} />
              </Link>
            </article>
          ))}
        </section>
      </div>
    </main>
  );
}

