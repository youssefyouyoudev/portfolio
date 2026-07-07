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

export default async function ServiceDetailPage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = getServicePage(slug);
  if (!service) notFound();

  const relatedProjects = getRelatedProjects(service.relatedProjectSlugs);
  const relatedServices = service.relatedServiceSlugs
    .map((relatedSlug) => servicePages.find((item) => item.slug === relatedSlug))
    .filter(Boolean);
  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: service.h1,
      serviceType: service.focus,
      url: `https://youssefyouyou.com/services/${service.slug}`,
      areaServed: ["Morocco", "Nador", "Marrakech", "Remote"],
      provider: {
        "@type": "Person",
        name: "Youssef Youyou",
        jobTitle: "Senior Full-Stack Web Developer",
        url: "https://youssefyouyou.com",
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

        <section className="mt-8 grid gap-6 lg:grid-cols-3">
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

        <section className="mt-8 grid gap-6 lg:grid-cols-[1.05fr_.95fr]">
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

        <section className="mt-8 rounded-3xl border border-sky-200/75 bg-white/88 p-6 shadow-xl shadow-sky-100/70 dark:border-white/10 dark:bg-white/[0.045] dark:shadow-none md:p-8">
          <p className="text-xs font-black uppercase tracking-[0.24em] text-sky-700 dark:text-cyan-300">FAQ</p>
          <h2 className="mt-3 text-2xl font-black">Common questions</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {service.faqs.map((faq) => (
              <article key={faq.question} className="rounded-2xl border border-sky-200/80 bg-sky-50/85 p-5 dark:border-cyan-400/15 dark:bg-cyan-300/[0.055]">
                <HelpCircle className="text-sky-600 dark:text-cyan-300" size={18} />
                <h3 className="mt-3 font-black text-slate-950 dark:text-white">{faq.question}</h3>
                <p className="mt-2 text-sm leading-7 text-slate-700 dark:text-slate-300">{faq.answer}</p>
              </article>
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
