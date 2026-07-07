import Link from "next/link";
import type { Metadata } from "next";
import { ArrowLeft, BadgeCheck, Mail, Send } from "lucide-react";
import { ContactForm } from "@/components/contact-form";
import { profile } from "@/lib/data";

export const metadata: Metadata = {
  title: "Contact Youssef Youyou | Senior Full-Stack Web Developer",
  description: "Contact Youssef Youyou for Laravel APIs, React/Next.js interfaces, admin dashboards, SaaS platforms, business automation and SEO-friendly websites.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 text-slate-950 dark:bg-[#020617] dark:text-white">
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <section>
          <Link href="/#contact" className="inline-flex items-center gap-2 rounded-full text-sm font-bold text-sky-700 dark:text-cyan-200">
            <ArrowLeft size={16} /> Back to homepage
          </Link>
          <p className="mt-10 text-xs font-black uppercase tracking-[0.3em] text-sky-700 dark:text-cyan-300">Contact</p>
          <h1 className="mt-4 text-4xl font-black tracking-tight md:text-6xl">Ready to build a website, dashboard, API or internal tool?</h1>
          <p className="mt-6 text-lg leading-8 text-slate-700 dark:text-slate-300">
            Let&apos;s turn your idea into a clean, scalable and production-ready solution.
          </p>
          <div className="mt-8 grid gap-3">
            {[
              "Good fit for Laravel APIs, React/Next.js frontends, admin dashboards and internal tools.",
              "Available for freelance, remote and business web projects in Morocco and internationally.",
              "Practical scope, clear communication and production-minded delivery.",
            ].map((item) => (
              <div key={item} className="flex gap-3 rounded-2xl border border-sky-200/80 bg-white/85 p-4 text-sm leading-6 text-slate-700 dark:border-white/10 dark:bg-white/[0.04] dark:text-slate-300">
                <BadgeCheck className="mt-0.5 shrink-0 text-sky-600 dark:text-cyan-300" size={16} />
                <span>{item}</span>
              </div>
            ))}
          </div>
          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            <a href={`mailto:${profile.email}`} className="inline-flex items-center gap-3 rounded-2xl border border-sky-200/80 bg-white/85 p-4 font-semibold text-slate-700 shadow-lg shadow-sky-100/60 transition hover:text-sky-700 dark:border-white/10 dark:bg-white/[0.04] dark:text-slate-300 dark:shadow-none dark:hover:text-cyan-100">
              <Mail className="text-sky-600 dark:text-cyan-300" /> Email
            </a>
            <a href={`mailto:${profile.email}?subject=WhatsApp%20contact%20request`} className="inline-flex items-center gap-3 rounded-2xl border border-sky-200/80 bg-white/85 p-4 font-semibold text-slate-700 shadow-lg shadow-sky-100/60 transition hover:text-sky-700 dark:border-white/10 dark:bg-white/[0.04] dark:text-slate-300 dark:shadow-none dark:hover:text-cyan-100">
              <Send className="text-sky-600 dark:text-cyan-300" /> WhatsApp on request
            </a>
          </div>
        </section>
        <ContactForm />
      </div>
    </main>
  );
}
