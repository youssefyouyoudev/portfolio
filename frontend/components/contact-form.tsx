"use client";

import { useState } from "react";
import { Send } from "lucide-react";
import { trackEvent } from "@/lib/analytics";

const projectTypes = ["B2B website", "B2C website", "SaaS", "Admin dashboard", "E-commerce", "API integration", "Internal tool", "Digital archiving", "Automation", "Other"];
const budgets = ["Small project", "Medium project", "Large project", "Not sure yet"];
const timelines = ["As soon as possible", "This month", "1-3 months", "Flexible / planning phase"];
const contactMethods = ["Email", "WhatsApp on request", "Google Meet", "Phone call if needed"];

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function submit(formData: FormData) {
    setStatus("loading");
    try {
      const body = Object.fromEntries(formData.entries());
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL ?? "https://api.youssefyouyou.com"}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(body),
      });
      setStatus(response.ok ? "success" : "error");
      if (response.ok) trackEvent("contact_form_submit", { project_type: String(body.project_type ?? "unknown") });
    } catch {
      setStatus("error");
    }
  }

  return (
    <form action={submit} className="grid gap-4 rounded-3xl border border-sky-200/70 bg-white/90 p-5 shadow-[0_24px_80px_rgba(14,165,233,.14)] backdrop-blur-xl dark:border-cyan-400/15 dark:bg-slate-900/65 dark:shadow-[0_24px_80px_rgba(2,8,23,.38)] md:p-7">
      <div className="rounded-2xl border border-sky-200/70 bg-sky-50/80 p-4 dark:border-cyan-300/15 dark:bg-cyan-300/[0.06]">
        <h3 className="font-bold text-slate-950 dark:text-cyan-100">Request a practical project estimate</h3>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">Tell me the business problem, not only the technology. I reply with realistic scope, no spam and a project-focused next step.</p>
      </div>
      <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
      <div className="grid gap-4 md:grid-cols-2">
        <label className="grid gap-2 text-sm font-medium text-slate-700 dark:text-slate-200">Name<input required name="name" placeholder="Your name" className="field" /></label>
        <label className="grid gap-2 text-sm font-medium text-slate-700 dark:text-slate-200">Email<input required type="email" name="email" placeholder="you@company.com" className="field" /></label>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <label className="grid gap-2 text-sm font-medium text-slate-700 dark:text-slate-200">Company or project name<input name="company" placeholder="Optional, but useful for B2B projects" className="field" /></label>
        <label className="grid gap-2 text-sm font-medium text-slate-700 dark:text-slate-200">Country / city<input name="country_city" placeholder="Example: Nador, Morocco" className="field" /></label>
      </div>
      <label className="grid gap-2 text-sm font-medium text-slate-700 dark:text-slate-200">Business goal<input required name="business_goal" placeholder="Example: replace manual tracking with a dashboard" className="field" /></label>
      <label className="grid gap-2 text-sm font-medium text-slate-700 dark:text-slate-200">Current problem<input name="current_problem" placeholder="Example: reports are manual, documents are hard to find, users need roles" className="field" /></label>
      <div className="grid gap-4 md:grid-cols-2">
        <label className="grid gap-2 text-sm font-medium text-slate-700 dark:text-slate-200">Project type<select required name="project_type" className="field">{projectTypes.map((item) => <option key={item}>{item}</option>)}</select></label>
        <label className="grid gap-2 text-sm font-medium text-slate-700 dark:text-slate-200">Budget range<select required name="budget_range" className="field">{budgets.map((item) => <option key={item}>{item}</option>)}</select></label>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <label className="grid gap-2 text-sm font-medium text-slate-700 dark:text-slate-200">Timeline<select name="timeline" className="field">{timelines.map((item) => <option key={item}>{item}</option>)}</select></label>
        <label className="grid gap-2 text-sm font-medium text-slate-700 dark:text-slate-200">Preferred contact method<select name="preferred_contact_method" className="field">{contactMethods.map((item) => <option key={item}>{item}</option>)}</select></label>
      </div>
      <label className="grid gap-2 text-sm font-medium text-slate-700 dark:text-slate-200">Project context<textarea required minLength={20} name="message" placeholder="What should the project improve? What exists today? Which users, dashboards, APIs, workflows or deployment needs matter most?" className="field min-h-40" /></label>
      <button disabled={status === "loading"} className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-blue-600 via-sky-500 to-cyan-300 px-5 py-3.5 font-black text-white shadow-lg shadow-cyan-500/20 outline-none transition hover:-translate-y-0.5 hover:shadow-cyan-400/40 focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2 focus-visible:ring-offset-white disabled:opacity-60 dark:focus-visible:ring-cyan-300 dark:focus-visible:ring-offset-slate-950">
        <Send size={18} /> {status === "loading" ? "Sending..." : "Send message"}
      </button>
      <p className="text-xs text-slate-500 dark:text-slate-500">Protected by Laravel validation and rate limiting. No spam, realistic scope, remote/freelance available.</p>
      {status === "success" && <p className="rounded-xl border border-emerald-300/50 bg-emerald-50 p-3 text-sm font-medium text-emerald-800 dark:border-emerald-300/30 dark:bg-emerald-300/10 dark:text-emerald-100">Message sent. I will review the business goal, scope and technical path before replying.</p>}
      {status === "error" && <p className="rounded-xl border border-rose-300/50 bg-rose-50 p-3 text-sm font-medium text-rose-800 dark:border-rose-300/30 dark:bg-rose-300/10 dark:text-rose-100">Could not send yet. Check the API URL or try again later.</p>}
    </form>
  );
}
