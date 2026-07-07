import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, BadgeCheck, HelpCircle, Layers, Rocket, Wrench } from "lucide-react";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { getRelatedProjects, getServicePage, servicePageSlugs, servicePages } from "@/lib/service-content";

type ServicePageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return servicePageSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = getServicePage(slug);

  return {
    title: service?.title ?? "Service",
    description: service?.metaDescription,
    alternates: { canonical: service ? `/services/${service.slug}` : "/services" },
    openGraph: service
      ? {
          title: service.title,
          description: service.metaDescription,
          url: `/services/${service.slug}`,
          type: "website",
          images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Youssef Youyou senior full stack developer portfolio" }],
        }
      : undefined,
    twitter: service
      ? {
          card: "summary_large_image",
          title: service.title,
          description: service.metaDescription,
        }
      : undefined,
  };
}

function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`rounded-3xl border border-sky-200/75 bg-white/88 p-6 shadow-xl shadow-sky-100/70 dark:border-white/10 dark:bg-white/[0.045] dark:shadow-none md:p-8 ${className}`}>
      {children}
    </div>
  );
}

function relatedBlogLinks(slug: string) {
  const defaults: [string, string][] = [
    ["Laravel API + React Dashboard Architecture", "/blog/laravel-api-react-dashboard-architecture"],
    ["SEO Checklist for Laravel and Next.js", "/blog/seo-checklist-laravel-nextjs"],
  ];
  const map: Record<string, [string, string][]> = {
    "web-developer-nador": [["SEO Checklist for Laravel and Next.js", "/blog/seo-checklist-laravel-nextjs"], ["From Excel Automation to Web Applications", "/blog/business-automation-from-excel-to-web-app"]],
    "laravel-developer-nador": [["Laravel API + React Dashboard Architecture", "/blog/laravel-api-react-dashboard-architecture"], ["Common Cloudflare, Nginx and Laravel Deployment Errors", "/blog/cloudflare-nginx-laravel-deployment-errors"]],
    "business-automation-nador": [["From Excel Automation to Web Applications", "/blog/business-automation-from-excel-to-web-app"], ["How I Build Admin Dashboards with Laravel and React", "/blog/build-admin-dashboard-laravel-react"]],
    "admin-dashboard-development": [["How I Build Admin Dashboards with Laravel and React", "/blog/build-admin-dashboard-laravel-react"], ["Laravel API + React Dashboard Architecture", "/blog/laravel-api-react-dashboard-architecture"]],
    "saas-development-morocco": [["Laravel SaaS Project Structure", "/blog/laravel-saas-project-structure"], ["Laravel API + React Dashboard Architecture", "/blog/laravel-api-react-dashboard-architecture"]],
    "business-automation-morocco": [["From Excel Automation to Web Applications", "/blog/business-automation-from-excel-to-web-app"], ["How I Build Admin Dashboards with Laravel and React", "/blog/build-admin-dashboard-laravel-react"]],
    "react-nextjs-developer-morocco": [["SEO Checklist for Laravel and Next.js", "/blog/seo-checklist-laravel-nextjs"], ["How to Fix Vite Assets Not Loading in Laravel Production", "/blog/fix-vite-assets-production-laravel"]],
    "laravel-developer-morocco": [["Laravel API + React Dashboard Architecture", "/blog/laravel-api-react-dashboard-architecture"], ["Deploy Laravel and Next.js on Ubuntu", "/blog/deploy-laravel-nextjs-ubuntu-nginx-pm2"]],
  };

  return map[slug] ?? defaults;
}

export default async function ServiceDetailPage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = getServicePage(slug);
  if (!service) notFound();

  const relatedProjects = getRelatedProjects(service.relatedProjectSlugs);
  const relatedServices = service.relatedServiceSlugs
    .map((relatedSlug) => servicePages.find((item) => item.slug === relatedSlug))
    .filter(Boolean);
  const relatedBlogs = relatedBlogLinks(service.slug);
  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: service.h1,
      serviceType: service.focus,
      url: `https://www.youssefyouyou.com/services/${service.slug}`,
      areaServed: ["Morocco", "Nador", "Marrakech", "Remote"],
      provider: {
        "@type": "Person",
        name: "Youssef Youyou",
        jobTitle: "Senior Full-Stack Web Developer",
        url: "https://www.youssefyouyou.com",
      },
      description: service.metaDescription,
      knowsAbout: service.technologies,
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: service.faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: { "@type": "Answer", text: faq.answer },
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://www.youssefyouyou.com" },
        { "@type": "ListItem", position: 2, name: "Services", item: "https://www.youssefyouyou.com/#services" },
        { "@type": "ListItem", position: 3, name: service.h1, item: `https://www.youssefyouyou.com/services/${service.slug}` },
      ],
    },
  ];

  return (
    <main className="min-h-screen overflow-hidden bg-slate-50 px-4 py-10 text-slate-950 dark:bg-[#020617] dark:text-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_15%_4%,rgba(14,165,233,.14),transparent_30%),radial-gradient(circle_at_85%_10%,rgba(8,145,178,.12),transparent_34%),linear-gradient(180deg,#f8fafc,#eef6ff_46%,#f8fafc)] dark:bg-[radial-gradient(circle_at_15%_4%,rgba(34,211,238,.12),transparent_30%),radial-gradient(circle_at_85%_10%,rgba(14,165,233,.14),transparent_34%),linear-gradient(180deg,#020617,#061826_46%,#020617)]" />
      <div className="relative mx-auto max-w-7xl">
        <header className="flex flex-wrap items-center justify-between gap-3 rounded-3xl border border-sky-200/70 bg-white/78 p-3 shadow-xl shadow-sky-100/70 backdrop-blur-2xl dark:border-cyan-400/10 dark:bg-slate-950/70 dark:shadow-none">
          <Link href="/" className="rounded-2xl px-2 py-1 outline-none focus-visible:ring-2 focus-visible:ring-cyan-300">
            <span className="block text-sm font-black text-slate-950 dark:text-white">
              Youssef <span className="text-sky-600 dark:text-cyan-300">Youyou</span>
            </span>
            <span className="block text-xs text-slate-500 dark:text-slate-400">Senior Full-Stack Web Developer</span>
          </Link>
          <div className="flex flex-wrap items-center gap-2">
            <Link href="/#services" className="inline-flex items-center gap-2 rounded-full border border-sky-200/80 bg-white/75 px-4 py-2 text-sm font-bold text-slate-700 transition hover:border-sky-400/50 hover:text-sky-700 dark:border-white/10 dark:bg-white/[0.04] dark:text-slate-200 dark:hover:border-cyan-300/35 dark:hover:text-cyan-100">
              <ArrowLeft size={16} /> Services
            </Link>
            <Link href="/contact" className="hidden rounded-full bg-cyan-300 px-4 py-2 text-sm font-bold text-slate-950 transition hover:bg-white sm:inline-flex">
              Contact
            </Link>
            <ThemeToggle />
          </div>
        </header>

        <nav aria-label="Breadcrumb" className="mt-8 flex flex-wrap items-center gap-2 text-sm font-semibold text-slate-600 dark:text-slate-400">
          <Link href="/" className="hover:text-sky-700 dark:hover:text-cyan-200">Home</Link>
          <span>/</span>
          <Link href="/#services" className="hover:text-sky-700 dark:hover:text-cyan-200">Services</Link>
          <span>/</span>
          <span className="text-slate-950 dark:text-white">{service.h1}</span>
        </nav>

        <div className="sticky top-3 z-20 mt-6 hidden items-center justify-between gap-4 rounded-full border border-sky-200/75 bg-white/82 p-2 shadow-xl shadow-sky-100/70 backdrop-blur-2xl dark:border-cyan-400/15 dark:bg-slate-950/76 dark:shadow-none lg:flex">
          <nav aria-label="Service table of contents" className="flex flex-wrap items-center gap-1 text-sm font-bold text-slate-700 dark:text-slate-300">
            {[
              ["#service-details", "Details"],
              ["#service-fit", "Fit"],
              ["#related-proof", "Proof"],
              ["#faq", "FAQ"],
            ].map(([href, label]) => (
              <a key={href} href={href} className="rounded-full px-4 py-2 transition hover:bg-sky-50 hover:text-sky-700 dark:hover:bg-white/10 dark:hover:text-cyan-100">
                {label}
              </a>
            ))}
          </nav>
          <Link href="/work-with-me" className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-sky-500 to-cyan-300 px-5 py-2.5 text-sm font-black text-white shadow-lg shadow-cyan-500/20 transition hover:-translate-y-0.5">
            Request estimate <ArrowRight size={15} />
          </Link>
        </div>

        <nav aria-label="Service page guide" className="mt-6 grid gap-2 rounded-3xl border border-sky-200/75 bg-white/82 p-3 text-sm font-bold text-slate-700 shadow-xl shadow-sky-100/70 backdrop-blur-2xl dark:border-cyan-400/15 dark:bg-slate-950/76 dark:text-slate-300 dark:shadow-none sm:grid-cols-4 lg:hidden">
          {[
            ["#service-details", "Details"],
            ["#service-fit", "Fit"],
            ["#related-proof", "Proof"],
            ["#faq", "FAQ"],
          ].map(([href, label]) => (
            <a key={href} href={href} className="rounded-2xl border border-sky-200/70 bg-sky-50 px-4 py-3 text-center transition hover:border-sky-400/50 hover:text-sky-700 dark:border-white/10 dark:bg-white/[0.04] dark:hover:border-cyan-300/35 dark:hover:text-cyan-100">
              {label}
            </a>
          ))}
        </nav>

        <section className="mt-8 grid gap-8 rounded-[2rem] border border-sky-200/75 bg-white/88 p-6 shadow-2xl shadow-sky-100/80 backdrop-blur-xl dark:border-cyan-400/15 dark:bg-slate-900/58 dark:shadow-slate-950/30 md:p-10 lg:grid-cols-[1.05fr_.95fr] lg:items-center">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.28em] text-sky-700 dark:text-cyan-300">Service</p>
            <h1 className="mt-4 text-balance text-4xl font-black tracking-tight md:text-6xl">{service.h1}</h1>
            <p className="mt-5 text-pretty text-lg leading-8 text-slate-700 dark:text-slate-300">{service.intro}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/contact" className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-sky-500 to-cyan-300 px-5 py-3 text-sm font-black text-white shadow-lg shadow-cyan-500/20 transition hover:-translate-y-0.5">
                Start a project <ArrowRight size={16} />
              </Link>
              <Link href="/projects" className="inline-flex items-center justify-center gap-2 rounded-full border border-sky-200/80 bg-white/75 px-5 py-3 text-sm font-bold text-slate-800 transition hover:border-sky-400/50 hover:text-sky-700 dark:border-white/10 dark:bg-white/[0.04] dark:text-slate-100 dark:hover:border-cyan-300/35 dark:hover:text-cyan-100">
                View my work
              </Link>
            </div>
          </div>
          <Card>
            <p className="text-xs font-black uppercase tracking-[0.24em] text-sky-700 dark:text-cyan-300">Focus</p>
            <p className="mt-4 text-2xl font-black text-slate-950 dark:text-white">{service.focus}</p>
            <div className="mt-6 flex flex-wrap gap-2">
              {service.technologies.map((tech) => (
                <span key={tech} className="rounded-full border border-sky-200/80 bg-sky-50 px-3 py-1 text-sm font-semibold text-slate-700 dark:border-white/10 dark:bg-cyan-300/10 dark:text-cyan-100">
                  {tech}
                </span>
              ))}
            </div>
          </Card>
        </section>

        <section id="service-details" className="mt-8 grid scroll-mt-28 gap-6 lg:grid-cols-3">
          <Card>
            <Wrench className="text-sky-600 dark:text-cyan-300" />
            <h2 className="mt-4 text-2xl font-black">Service details</h2>
            <ul className="mt-5 grid gap-3 text-sm leading-7 text-slate-700 dark:text-slate-300">
              {service.details.map((item) => (
                <li key={item} className="flex gap-2"><BadgeCheck className="mt-0.5 shrink-0 text-sky-600 dark:text-cyan-300" size={16} />{item}</li>
              ))}
            </ul>
          </Card>
          <Card>
            <Layers className="text-sky-600 dark:text-cyan-300" />
            <h2 className="mt-4 text-2xl font-black">Process</h2>
            <ol className="mt-5 grid gap-3 text-sm leading-7 text-slate-700 dark:text-slate-300">
              {service.process.map((item, index) => (
                <li key={item} className="flex gap-3">
                  <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-cyan-300 text-xs font-black text-slate-950">{index + 1}</span>
                  {item}
                </li>
              ))}
            </ol>
          </Card>
          <Card>
            <Rocket className="text-sky-600 dark:text-cyan-300" />
            <h2 className="mt-4 text-2xl font-black">Benefits</h2>
            <ul className="mt-5 grid gap-3 text-sm leading-7 text-slate-700 dark:text-slate-300">
              {service.benefits.map((item) => (
                <li key={item} className="flex gap-2"><BadgeCheck className="mt-0.5 shrink-0 text-sky-600 dark:text-cyan-300" size={16} />{item}</li>
              ))}
            </ul>
          </Card>
        </section>

        <section id="service-fit" className="mt-8 grid scroll-mt-28 gap-6 lg:grid-cols-2">
          <Card>
            <p className="text-xs font-black uppercase tracking-[0.24em] text-sky-700 dark:text-cyan-300">Who This Is For</p>
            <h2 className="mt-3 text-2xl font-black">Business fit and use cases</h2>
            <p className="mt-5 text-sm leading-7 text-slate-700 dark:text-slate-300">
              This service is for businesses that need a practical web system, not vague decoration. It fits local Nador businesses, Morocco-wide companies, remote teams, founders and operations teams that need cleaner workflows, better visibility, stronger SEO structure, secure access or a maintainable platform.
            </p>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {["Local business website", "Admin dashboard", "Laravel API", "React/Next.js interface", "SaaS MVP", "Business automation"].map((item) => (
                <span key={item} className="rounded-2xl border border-sky-200/80 bg-sky-50/85 p-3 text-sm font-bold text-slate-700 dark:border-cyan-400/15 dark:bg-cyan-300/[0.055] dark:text-slate-200">{item}</span>
              ))}
            </div>
          </Card>
          <Card>
            <p className="text-xs font-black uppercase tracking-[0.24em] text-sky-700 dark:text-cyan-300">SEO Positioning</p>
            <h2 className="mt-3 text-2xl font-black">Nador, Morocco and remote visibility</h2>
            <p className="mt-5 text-sm leading-7 text-slate-700 dark:text-slate-300">
              The content strategy is three-level: Nador-first local visibility, Morocco-wide authority for Laravel, React, SaaS and dashboards, then international credibility for remote Laravel API, React dashboard and Next.js SEO website projects. The wording stays natural and avoids keyword stuffing.
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {["Nador", "Morocco", "Marrakech", "Casablanca", "Rabat", "Tangier", "Remote"].map((item) => (
                <span key={item} className="rounded-full border border-sky-200/80 bg-sky-50 px-3 py-1 text-xs font-black uppercase tracking-[0.12em] text-sky-700 dark:border-white/10 dark:bg-white/[0.05] dark:text-cyan-100">{item}</span>
              ))}
            </div>
          </Card>
        </section>

        <section id="related-proof" className="mt-8 grid scroll-mt-28 gap-6 lg:grid-cols-[1.05fr_.95fr]">
          <Card>
            <p className="text-xs font-black uppercase tracking-[0.24em] text-sky-700 dark:text-cyan-300">Related Projects</p>
            <h2 className="mt-3 text-2xl font-black">Relevant project proof</h2>
            <div className="mt-6 grid gap-3">
              {relatedProjects.map((project) => (
                <Link key={project!.slug} href={`/projects/${project!.slug}`} className="rounded-2xl border border-sky-200/80 bg-sky-50/85 p-4 transition hover:border-sky-400/50 dark:border-cyan-400/15 dark:bg-cyan-300/[0.055]">
                  <h3 className="font-black text-slate-950 dark:text-white">{project!.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-700 dark:text-slate-300">{project!.shortDescription}</p>
                </Link>
              ))}
            </div>
          </Card>
          <Card>
            <p className="text-xs font-black uppercase tracking-[0.24em] text-sky-700 dark:text-cyan-300">Related Services</p>
            <h2 className="mt-3 text-2xl font-black">Useful next pages</h2>
            <div className="mt-6 grid gap-3">
              {relatedServices.map((related) => (
                <Link key={related!.slug} href={`/services/${related!.slug}`} className="inline-flex items-center justify-between gap-3 rounded-2xl border border-sky-200/80 bg-sky-50/85 p-4 text-sm font-bold text-slate-800 transition hover:border-sky-400/50 hover:text-sky-700 dark:border-cyan-400/15 dark:bg-cyan-300/[0.055] dark:text-slate-100 dark:hover:text-cyan-100">
                  {related!.h1}
                  <ArrowRight size={15} />
                </Link>
              ))}
            </div>
          </Card>
        </section>

        <section id="faq" className="mt-8 scroll-mt-28 rounded-3xl border border-sky-200/75 bg-white/88 p-6 shadow-xl shadow-sky-100/70 dark:border-white/10 dark:bg-white/[0.045] dark:shadow-none md:p-8">
          <p className="text-xs font-black uppercase tracking-[0.24em] text-sky-700 dark:text-cyan-300">Related Blog Articles</p>
          <h2 className="mt-3 text-2xl font-black">Technical articles connected to this service</h2>
          <div className="mt-6 grid gap-3 md:grid-cols-2">
            {relatedBlogs.map(([label, href]) => (
              <Link key={href} href={href} className="inline-flex items-center justify-between gap-3 rounded-2xl border border-sky-200/80 bg-sky-50/85 p-4 text-sm font-bold text-slate-800 transition hover:border-sky-400/50 hover:text-sky-700 dark:border-cyan-400/15 dark:bg-cyan-300/[0.055] dark:text-slate-100 dark:hover:text-cyan-100">
                {label}
                <ArrowRight size={15} />
              </Link>
            ))}
          </div>
        </section>

        <section className="mt-8 rounded-3xl border border-sky-200/75 bg-white/88 p-6 shadow-xl shadow-sky-100/70 dark:border-white/10 dark:bg-white/[0.045] dark:shadow-none md:p-8">
          <p className="text-xs font-black uppercase tracking-[0.24em] text-sky-700 dark:text-cyan-300">FAQ</p>
          <h2 className="mt-3 text-2xl font-black">Common questions</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {service.faqs.map((faq) => (
              <details key={faq.question} className="group rounded-2xl border border-sky-200/80 bg-sky-50/85 p-5 dark:border-cyan-400/15 dark:bg-cyan-300/[0.055]">
                <summary className="flex cursor-pointer list-none items-start gap-3 font-black text-slate-950 outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 dark:text-white">
                  <HelpCircle className="mt-0.5 shrink-0 text-sky-600 dark:text-cyan-300" size={18} />
                  <span className="flex-1">{faq.question}</span>
                  <span className="text-sky-700 transition group-open:rotate-90 dark:text-cyan-200">+</span>
                </summary>
                <p className="mt-3 pl-8 text-sm leading-7 text-slate-700 dark:text-slate-300">{faq.answer}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="mt-8 rounded-[2rem] border border-sky-300/50 bg-gradient-to-br from-sky-50 via-white to-cyan-50 p-6 text-center shadow-2xl shadow-sky-100/80 dark:border-cyan-300/20 dark:from-cyan-300/10 dark:via-slate-900/60 dark:to-slate-950 dark:shadow-cyan-500/10 md:p-10">
          <h2 className="text-balance text-3xl font-black md:text-4xl">Need a Laravel, React or Next.js developer for your business platform?</h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-slate-700 dark:text-slate-300">
            Send the workflow, business goal and ideal timeline. I will help shape it into a practical, production-ready web solution.
          </p>
          <Link href="/contact" className="mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-cyan-300 px-6 py-3 text-sm font-bold text-slate-950 transition hover:bg-white">
            Let&apos;s build it <ArrowRight size={16} />
          </Link>
        </section>
      </div>
    </main>
  );
}
