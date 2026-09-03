import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { brandedTitle } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: brandedTitle("Services & starting prices | Youssef Youyou") },
  description: "Starting prices for landing pages, local business websites, dashboards, SaaS MVPs and SEO/GEO growth by Youssef Youyou in Nador, Morocco.",
  alternates: { canonical: "/pricing" },
};

const offers = [
  ["Landing SEO Starter", "1,000 DH", "A fast, clear landing page designed to convert.", ["One responsive page, up to 5–6 sections", "WhatsApp CTA and contact form", "Titles, headings, local SEO, schema and social sharing", "Image and basic performance optimisation", "Deployment and two revision rounds"]],
  ["Pack Présence Locale", "2,500 DH", "A compact, polished web presence for local businesses.", ["Premium landing or compact business site", "Services, contact and WhatsApp flow", "Local SEO, schema, analytics and Search Console setup", "Conversion CTA and deployment"]],
  ["Site Business", "4,500 DH", "A professional website with a clear content and lead-generation structure.", ["Up to five scoped pages", "Custom responsive interface", "Services, about, contact and FAQ", "SEO foundation, structured data, analytics and deployment"]],
  ["Dashboard & Outil Métier", "5,000 DH+", "A scoped internal application for real operational workflows.", ["Authentication, forms and database-backed records", "Admin dashboard, reports and business logic", "Final quote depends on modules, roles and integrations"]],
  ["SaaS MVP", "15,000 DH+", "A focused first version of a multi-user software product.", ["Authentication, database, users/roles and admin", "Laravel API with React/Next.js interface", "Core product workflow and deployment", "Billing, mobile apps and complex integrations are separately scoped"]],
  ["SEO & GEO Growth", "1,500 DH/month+", "Ongoing technical and content improvement for visibility.", ["Search Console monitoring and technical fixes", "Internal linking and service-page improvements", "GEO-friendly content refinement", "One to two substantial improvements per month depending on scope"]],
];

export default function PricingPage() {
  return <main className="min-h-screen bg-slate-50 px-4 py-16 text-slate-950 dark:bg-slate-950 dark:text-white"><div className="mx-auto max-w-7xl"><p className="text-sm font-black uppercase tracking-[.2em] text-violet-600">Services & starting prices</p><h1 className="mt-4 max-w-3xl text-4xl font-black tracking-tight md:text-6xl">Clear starting points for serious web work.</h1><p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600 dark:text-slate-300">Each project is scoped before a final quote. Prices are starting points, not one-size-fits-all promises.</p><div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">{offers.map((offer) => <article key={offer[0] as string} className="rounded-[2rem] border border-violet-200 bg-white p-6 shadow-xl shadow-violet-100/60 dark:border-white/10 dark:bg-white/[.04] dark:shadow-none"><h2 className="text-2xl font-black">{offer[0] as string}</h2><p className="mt-3 text-3xl font-black text-violet-600 dark:text-violet-200">À partir de {offer[1] as string}</p><p className="mt-4 text-sm leading-7 text-slate-600 dark:text-slate-300">{offer[2] as string}</p><ul className="mt-5 grid gap-3 text-sm leading-6 text-slate-700 dark:text-slate-200">{(offer[3] as string[]).map((item) => <li key={item} className="flex gap-2"><CheckCircle2 className="mt-0.5 shrink-0 text-violet-600" size={16}/>{item}</li>)}</ul></article>)}</div><div className="mt-10 rounded-[2rem] bg-violet-600 p-8 text-white"><h2 className="text-3xl font-black">Need a scoped estimate?</h2><p className="mt-3 max-w-2xl leading-7 text-violet-100">Tell me the goal, current workflow, budget range and timeline. I’ll recommend the smallest useful scope first.</p><Link href="/contact" className="mt-6 inline-flex rounded-full bg-white px-5 py-3 font-bold text-violet-700">Start a project</Link></div></div></main>;
}
