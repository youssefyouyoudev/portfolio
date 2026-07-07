import Link from "next/link";
import { ArrowLeft, ArrowRight, BadgeCheck, HelpCircle } from "lucide-react";
import { ContactForm } from "@/components/contact-form";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import type { AuthorityPageContent } from "@/lib/authority-content";

export function AuthorityPage({ page }: { page: AuthorityPageContent }) {
  const url = `https://youssefyouyou.com/${page.slug}`;
  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: page.title,
      description: page.description,
      url,
      inLanguage: page.locale ?? "en",
      about: {
        "@type": "Person",
        name: "Youssef Youyou",
        jobTitle: "Senior Full-Stack Web Developer",
        url: "https://youssefyouyou.com",
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: page.faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: { "@type": "Answer", text: faq.answer },
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://youssefyouyou.com" },
        { "@type": "ListItem", position: 2, name: page.h1, item: url },
      ],
    },
  ];

  return (
    <main className="min-h-screen overflow-hidden bg-slate-50 px-4 py-10 text-slate-950 dark:bg-[#020617] dark:text-white" dir={page.locale === "ar" ? "rtl" : "ltr"}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_15%_4%,rgba(14,165,233,.14),transparent_30%),radial-gradient(circle_at_85%_10%,rgba(8,145,178,.12),transparent_34%),linear-gradient(180deg,#f8fafc,#eef6ff_46%,#f8fafc)] dark:bg-[radial-gradient(circle_at_15%_4%,rgba(34,211,238,.12),transparent_30%),radial-gradient(circle_at_85%_10%,rgba(14,165,233,.14),transparent_34%),linear-gradient(180deg,#020617,#061826_46%,#020617)]" />
      <div className="relative mx-auto max-w-7xl">
        <header className="flex flex-wrap items-center justify-between gap-3 rounded-3xl border border-sky-200/70 bg-white/78 p-3 shadow-xl shadow-sky-100/70 backdrop-blur-2xl dark:border-cyan-400/10 dark:bg-slate-950/70 dark:shadow-none">
          <Link href="/" className="rounded-2xl px-2 py-1 outline-none focus-visible:ring-2 focus-visible:ring-cyan-300">
            <span className="block text-sm font-black text-slate-950 dark:text-white">Youssef <span className="text-sky-600 dark:text-cyan-300">Youyou</span></span>
            <span className="block text-xs text-slate-500 dark:text-slate-400">Senior Full-Stack Web Developer</span>
          </Link>
          <div className="flex flex-wrap items-center gap-2">
            <Link href="/" className="inline-flex items-center gap-2 rounded-full border border-sky-200/80 bg-white/75 px-4 py-2 text-sm font-bold text-slate-700 transition hover:border-sky-400/50 hover:text-sky-700 dark:border-white/10 dark:bg-white/[0.04] dark:text-slate-200 dark:hover:border-cyan-300/35 dark:hover:text-cyan-100">
              <ArrowLeft size={16} /> Home
            </Link>
            <ThemeToggle />
          </div>
        </header>

        <section className="mt-10 grid gap-8 rounded-[2rem] border border-sky-200/75 bg-white/88 p-6 shadow-2xl shadow-sky-100/80 backdrop-blur-xl dark:border-cyan-400/15 dark:bg-slate-900/58 dark:shadow-slate-950/30 md:p-10 lg:grid-cols-[1.05fr_.95fr] lg:items-center">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.28em] text-sky-700 dark:text-cyan-300">{page.eyebrow}</p>
            <h1 className="mt-4 text-balance text-4xl font-black tracking-tight md:text-6xl">{page.h1}</h1>
            <p className="mt-6 text-pretty text-lg leading-8 text-slate-700 dark:text-slate-300">{page.intro}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/contact" className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-sky-500 to-cyan-300 px-5 py-3 text-sm font-black text-white shadow-lg shadow-cyan-500/20 transition hover:-translate-y-0.5">
                Start a Project <ArrowRight size={16} />
              </Link>
              <Link href="/projects" className="inline-flex items-center justify-center gap-2 rounded-full border border-sky-200/80 bg-white/75 px-5 py-3 text-sm font-bold text-slate-800 transition hover:border-sky-400/50 hover:text-sky-700 dark:border-white/10 dark:bg-white/[0.04] dark:text-slate-100 dark:hover:border-cyan-300/35 dark:hover:text-cyan-100">
                View Case Studies
              </Link>
            </div>
          </div>
          <div className="rounded-3xl border border-sky-200/75 bg-sky-50/85 p-6 dark:border-cyan-400/15 dark:bg-cyan-300/[0.055] md:p-8">
            <p className="text-xs font-black uppercase tracking-[0.24em] text-sky-700 dark:text-cyan-300">Positioning</p>
            <p className="mt-4 text-2xl font-black text-slate-950 dark:text-white">Laravel, React, Next.js, SaaS platforms, dashboards, APIs, business automation, SEO and production deployment.</p>
          </div>
        </section>

        <section className="mt-8 grid gap-6 lg:grid-cols-2">
          {page.sections.map((section) => (
            <article key={section.title} className="rounded-3xl border border-sky-200/75 bg-white/88 p-6 shadow-xl shadow-sky-100/70 dark:border-white/10 dark:bg-white/[0.045] dark:shadow-none md:p-8">
              <BadgeCheck className="text-sky-600 dark:text-cyan-300" />
              <h2 className="mt-4 text-2xl font-black text-slate-950 dark:text-white">{section.title}</h2>
              <div className="mt-4 grid gap-4 text-sm leading-7 text-slate-700 dark:text-slate-300">
                {section.body.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              </div>
              {section.items ? (
                <div className="mt-5 flex flex-wrap gap-2">
                  {section.items.map((item) => (
                    <span key={item} className="rounded-full border border-sky-200/80 bg-sky-50 px-3 py-1 text-xs font-bold text-slate-700 dark:border-white/10 dark:bg-white/[0.05] dark:text-slate-200">{item}</span>
                  ))}
                </div>
              ) : null}
            </article>
          ))}
        </section>

        <section className="mt-8 rounded-3xl border border-sky-200/75 bg-white/88 p-6 shadow-xl shadow-sky-100/70 dark:border-white/10 dark:bg-white/[0.045] dark:shadow-none md:p-8">
          <p className="text-xs font-black uppercase tracking-[0.24em] text-sky-700 dark:text-cyan-300">FAQ</p>
          <h2 className="mt-3 text-2xl font-black">Frequently asked questions</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {page.faqs.map((faq) => (
              <article key={faq.question} className="rounded-2xl border border-sky-200/80 bg-sky-50/85 p-5 dark:border-cyan-400/15 dark:bg-cyan-300/[0.055]">
                <HelpCircle className="text-sky-600 dark:text-cyan-300" size={18} />
                <h3 className="mt-3 font-black text-slate-950 dark:text-white">{faq.question}</h3>
                <p className="mt-2 text-sm leading-7 text-slate-700 dark:text-slate-300">{faq.answer}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-8 grid gap-8 lg:grid-cols-[.9fr_1.1fr]">
          <div className="rounded-[2rem] border border-sky-300/50 bg-gradient-to-br from-sky-50 via-white to-cyan-50 p-6 shadow-2xl shadow-sky-100/80 dark:border-cyan-300/20 dark:from-cyan-300/10 dark:via-slate-900/60 dark:to-slate-950 dark:shadow-cyan-500/10 md:p-8">
            <h2 className="text-3xl font-black text-slate-950 dark:text-white">{page.cta}</h2>
            <p className="mt-4 text-sm leading-7 text-slate-700 dark:text-slate-300">Use the form with your city, budget range, timeline, current problem and business goal. That gives enough context for a serious technical reply.</p>
          </div>
          <ContactForm />
        </section>
      </div>
    </main>
  );
}
