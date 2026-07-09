import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, BadgeCheck, MapPin } from "lucide-react";
import { JsonLd } from "@/components/seo/JsonLd";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { getLocationPage, locationPageSlugs } from "@/lib/location-content";
import { brandedTitle, siteUrl } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return locationPageSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = getLocationPage(slug);
  return {
    title: { absolute: brandedTitle(page?.title ?? "Location") },
    description: page?.description,
    alternates: { canonical: page ? `/locations/${page.slug}` : "/locations" },
    openGraph: page ? { title: brandedTitle(page.title), description: page.description, url: `/locations/${page.slug}`, images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: `${page.city} web developer service page` }] } : undefined,
    twitter: page ? { card: "summary_large_image", title: brandedTitle(page.title), description: page.description, images: ["/opengraph-image"] } : undefined,
  };
}

export default async function LocationPage({ params }: Props) {
  const { slug } = await params;
  const page = getLocationPage(slug);
  if (!page) notFound();

  const url = `${siteUrl}/locations/${page.slug}`;
  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: page.h1,
      url,
      provider: { "@type": "Person", name: "Youssef Youyou", jobTitle: "Full-Stack Developer", url: siteUrl },
      areaServed: page.city,
      description: page.description,
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
        { "@type": "ListItem", position: 2, name: page.h1, item: url },
      ],
    },
  ];

  return (
    <main className="min-h-screen overflow-hidden bg-slate-50 px-4 py-10 text-slate-950 dark:bg-[#020617] dark:text-white">
      <JsonLd data={structuredData} />
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_15%_4%,rgba(14,165,233,.14),transparent_30%),linear-gradient(180deg,#f8fafc,#eef6ff_46%,#f8fafc)] dark:bg-[radial-gradient(circle_at_15%_4%,rgba(34,211,238,.12),transparent_30%),linear-gradient(180deg,#020617,#061826_46%,#020617)]" />
      <div className="relative mx-auto max-w-7xl">
        <header className="flex flex-wrap items-center justify-between gap-3 rounded-3xl border border-sky-200/70 bg-white/78 p-3 shadow-xl shadow-sky-100/70 backdrop-blur-2xl dark:border-cyan-400/10 dark:bg-slate-950/70 dark:shadow-none">
          <Link href="/" className="rounded-2xl px-2 py-1 outline-none focus-visible:ring-2 focus-visible:ring-cyan-300">
            <span className="block text-sm font-black text-slate-950 dark:text-white">Youssef <span className="text-sky-600 dark:text-cyan-300">Youyou</span></span>
            <span className="block text-xs text-slate-500 dark:text-slate-400">Senior Full-Stack Web Developer</span>
          </Link>
          <div className="flex items-center gap-2">
            <Link href="/" className="inline-flex items-center gap-2 rounded-full border border-sky-200/80 bg-white/75 px-4 py-2 text-sm font-bold text-slate-700 transition hover:border-sky-400/50 hover:text-sky-700 dark:border-white/10 dark:bg-white/[0.04] dark:text-slate-200">
              <ArrowLeft size={16} /> Home
            </Link>
            <ThemeToggle />
          </div>
        </header>

        <section className="mt-10 grid gap-8 rounded-[2rem] border border-sky-200/75 bg-white/88 p-6 shadow-2xl shadow-sky-100/80 backdrop-blur-xl dark:border-cyan-400/15 dark:bg-slate-900/58 dark:shadow-slate-950/30 md:p-10 lg:grid-cols-[1.05fr_.95fr] lg:items-center">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.28em] text-sky-700 dark:text-cyan-300">Location</p>
            <h1 className="mt-4 text-balance text-4xl font-black tracking-tight md:text-6xl">{page.h1}</h1>
            <p className="mt-6 text-lg leading-8 text-slate-700 dark:text-slate-300">{page.intro}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/work-with-me" className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-sky-500 to-cyan-300 px-5 py-3 text-sm font-black text-white shadow-lg shadow-cyan-500/20 transition hover:-translate-y-0.5">
                Request Estimate <ArrowRight size={16} />
              </Link>
              <Link href="/projects" className="inline-flex items-center justify-center gap-2 rounded-full border border-sky-200/80 bg-white/75 px-5 py-3 text-sm font-bold text-slate-800 transition hover:border-sky-400/50 hover:text-sky-700 dark:border-white/10 dark:bg-white/[0.04] dark:text-slate-100">
                View Case Studies
              </Link>
            </div>
          </div>
          <div className="rounded-3xl border border-sky-200/75 bg-sky-50/85 p-6 dark:border-cyan-400/15 dark:bg-cyan-300/[0.055] md:p-8">
            <MapPin className="text-sky-600 dark:text-cyan-300" />
            <p className="mt-4 text-2xl font-black text-slate-950 dark:text-white">Based in Nador, available for {page.city} projects through remote collaboration.</p>
          </div>
        </section>

        <section className="mt-8 grid gap-6 lg:grid-cols-2">
          <article className="rounded-3xl border border-sky-200/75 bg-white/88 p-6 shadow-xl shadow-sky-100/70 dark:border-white/10 dark:bg-white/[0.045] dark:shadow-none md:p-8">
            <BadgeCheck className="text-sky-600 dark:text-cyan-300" />
            <h2 className="mt-4 text-2xl font-black">Business types in {page.city}</h2>
            <div className="mt-5 flex flex-wrap gap-2">
              {page.businessTypes.map((item) => <span key={item} className="rounded-full border border-sky-200/80 bg-sky-50 px-3 py-1 text-xs font-bold text-slate-700 dark:border-white/10 dark:bg-white/[0.05] dark:text-slate-200">{item}</span>)}
            </div>
          </article>
          <article className="rounded-3xl border border-sky-200/75 bg-white/88 p-6 shadow-xl shadow-sky-100/70 dark:border-white/10 dark:bg-white/[0.045] dark:shadow-none md:p-8">
            <BadgeCheck className="text-sky-600 dark:text-cyan-300" />
            <h2 className="mt-4 text-2xl font-black">Useful website and software use cases</h2>
            <div className="mt-5 grid gap-3">
              {page.useCases.map((item) => <p key={item} className="rounded-2xl border border-sky-200/80 bg-sky-50/85 p-4 text-sm font-semibold text-slate-700 dark:border-cyan-400/15 dark:bg-cyan-300/[0.055] dark:text-slate-200">{item}</p>)}
            </div>
          </article>
        </section>

        <section className="mt-8 rounded-[2rem] border border-sky-300/50 bg-gradient-to-br from-sky-50 via-white to-cyan-50 p-6 text-center shadow-2xl shadow-sky-100/80 dark:border-cyan-300/20 dark:from-cyan-300/10 dark:via-slate-900/60 dark:to-slate-950 md:p-10">
          <h2 className="text-3xl font-black">Need a website, dashboard or automation system for {page.city}?</h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-slate-700 dark:text-slate-300">Send your business goal, current problem, timeline and budget range. I will help translate it into a realistic technical scope.</p>
          <Link href="/contact" className="mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-cyan-300 px-6 py-3 text-sm font-bold text-slate-950 transition hover:bg-white">Contact Me <ArrowRight size={16} /></Link>
        </section>
      </div>
    </main>
  );
}
