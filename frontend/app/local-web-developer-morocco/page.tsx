import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BadgeCheck, MapPin } from "lucide-react";
import { JsonLd } from "@/components/seo/JsonLd";
import { profile } from "@/lib/data";
import { pageMetadata, siteUrl } from "@/lib/site";

const cities = ["Nador", "Marrakech", "Casablanca", "Rabat", "Tangier", "Oujda", "Fez", "Agadir"];
const services = ["Laravel development", "React development", "Next.js development", "Admin dashboards", "SaaS MVPs", "Business automation", "Business websites", "API development"];

export const metadata: Metadata = pageMetadata({
  title: "Local Web Developer in Morocco",
  description: "Full-stack web development in Morocco for Laravel, React, Next.js, dashboards, SaaS MVPs, business automation and websites, with worldwide remote delivery.",
  path: "/local-web-developer-morocco",
});

export default function LocalWebDeveloperMoroccoPage() {
  const url = `${siteUrl}/local-web-developer-morocco`;
  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 text-slate-950 dark:bg-[#020617] dark:text-white">
      <JsonLd data={[
        {
          "@context": "https://schema.org",
          "@type": "ProfessionalService",
          name: "Youssef Youyou – Full-Stack Web Development",
          url,
          email: profile.email,
          founder: { "@type": "Person", name: "Youssef Youyou", jobTitle: "Full-Stack Developer" },
          areaServed: ["Morocco", ...cities].map((name) => ({ "@type": "AdministrativeArea", name })),
          serviceType: services,
          sameAs: [profile.github, profile.linkedin].filter(Boolean),
        },
        {
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
            { "@type": "ListItem", position: 2, name: "Local Web Developer in Morocco", item: url },
          ],
        },
      ]} />
      <div className="mx-auto max-w-6xl">
        <Link href="/" className="text-sm font-bold text-sky-700 dark:text-cyan-200">← Home</Link>
        <section className="mt-8 rounded-[2rem] border border-sky-200/75 bg-white/90 p-7 shadow-2xl shadow-sky-100/70 dark:border-cyan-400/15 dark:bg-slate-900/60 dark:shadow-none md:p-12">
          <p className="text-xs font-black uppercase tracking-[0.28em] text-sky-700 dark:text-cyan-300">Morocco-wide service</p>
          <h1 className="mt-4 text-4xl font-black tracking-tight md:text-6xl">Full-stack web developer in Morocco</h1>
          <p className="mt-6 max-w-4xl text-lg leading-8 text-slate-700 dark:text-slate-300">
            I build Laravel, React and Next.js applications, business dashboards, SaaS MVPs, workflow automation, APIs and conversion-focused websites for Moroccan businesses and remote clients worldwide.
          </p>
          <div className="mt-9 grid gap-6 lg:grid-cols-2">
            <article className="rounded-3xl border border-sky-200/75 bg-sky-50/80 p-6 dark:border-white/10 dark:bg-white/[0.04]">
              <h2 className="text-2xl font-black">Development services</h2>
              <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                {services.map((service) => <li key={service} className="flex gap-2 text-sm"><BadgeCheck size={17} className="shrink-0 text-sky-600 dark:text-cyan-300" />{service}</li>)}
              </ul>
            </article>
            <article className="rounded-3xl border border-sky-200/75 bg-sky-50/80 p-6 dark:border-white/10 dark:bg-white/[0.04]">
              <h2 className="text-2xl font-black">Areas served</h2>
              <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">Available across Morocco with remote collaboration, clear scope and production-minded delivery. No storefront or physical-address claim is made.</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {cities.map((city) => <span key={city} className="inline-flex items-center gap-1 rounded-full border border-sky-200 bg-white px-3 py-1 text-sm font-bold dark:border-white/10 dark:bg-white/[0.05]"><MapPin size={13} />{city}</span>)}
              </div>
            </article>
          </div>
          <Link href="/contact" className="mt-8 inline-flex items-center gap-2 rounded-full bg-cyan-300 px-6 py-3 font-black text-slate-950">
            Contact me about your project <ArrowRight size={17} />
          </Link>
        </section>
      </div>
    </main>
  );
}
