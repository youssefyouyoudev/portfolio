"use client";

import { useEffect, useRef, useState } from "react";
import { GitBranch, Mail, Network, Send } from "lucide-react";
import { trackEvent } from "@/lib/analytics";
import { profile } from "@/lib/data";

const projectTypes = ["B2B website", "B2C website", "SaaS", "Admin dashboard", "E-commerce", "API integration", "Internal tool", "Digital archiving", "Automation", "Other"];
const budgets = ["Small project", "Medium project", "Large project", "Not sure yet"];
const timelines = ["As soon as possible", "This month", "1-3 months", "Flexible / planning phase"];
const contactMethods = ["Email", "WhatsApp on request", "Google Meet", "Phone call if needed"];
const draftKey = "youssef-contact-form-draft";

type ContactControl = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;

function FieldLabel({ children, required = false }: { children: React.ReactNode; required?: boolean }) {
  return (
    <span>
      {children} <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">{required ? "(required)" : "(optional)"}</span>
    </span>
  );
}

export function ContactForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [messageLength, setMessageLength] = useState(0);

  useEffect(() => {
    const form = formRef.current;
    if (!form) return;

    try {
      const saved = localStorage.getItem(draftKey);
      if (!saved) return;
      const draft = JSON.parse(saved) as Record<string, string>;
      Array.from(form.elements).forEach((element) => {
        const control = element as ContactControl;
        if (!control.name || control.name === "website" || !(control.name in draft)) return;
        control.value = draft[control.name] ?? "";
      });
      setMessageLength(String(draft.message ?? "").length);
    } catch {
      localStorage.removeItem(draftKey);
    }
  }, []);

  function saveDraft() {
    const form = formRef.current;
    if (!form) return;
    const body = Object.fromEntries(new FormData(form).entries()) as Record<string, FormDataEntryValue>;
    delete body.website;
    const message = String(body.message ?? "");
    setMessageLength(message.length);
    localStorage.setItem(draftKey, JSON.stringify(body));
  }

  async function submit(formData: FormData) {
    setStatus("loading");
    try {
      const body = Object.fromEntries(formData.entries());
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL ?? "https://api.youssefyouyou.com"}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(body),
      });

      if (response.ok) {
        setStatus("success");
        localStorage.removeItem(draftKey);
        formRef.current?.reset();
        setMessageLength(0);
        trackEvent("contact_form_submit", { project_type: String(body.project_type ?? "unknown") });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <form
      ref={formRef}
      action={submit}
      onChange={saveDraft}
      className="grid gap-5 rounded-3xl border border-sky-200/70 bg-white/90 p-5 shadow-[0_24px_80px_rgba(14,165,233,.14)] backdrop-blur-xl dark:border-cyan-400/15 dark:bg-slate-900/65 dark:shadow-[0_24px_80px_rgba(2,8,23,.38)] md:p-7"
    >
      <div className="rounded-2xl border border-sky-200/70 bg-sky-50/80 p-4 dark:border-cyan-300/15 dark:bg-cyan-300/[0.06]">
        <h3 className="font-bold text-slate-950 dark:text-cyan-100">Request a practical project estimate</h3>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">Tell me the business problem, not only the technology. I reply with realistic scope, no spam and a project-focused next step.</p>
      </div>

      <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />

      <fieldset className="grid gap-4 rounded-2xl border border-sky-200/70 p-4 dark:border-white/10">
        <legend className="px-2 text-xs font-black uppercase tracking-[0.24em] text-sky-700 dark:text-cyan-300">1. Contact info</legend>
        <div className="grid gap-4 md:grid-cols-2">
          <label className="grid gap-2 text-sm font-medium text-slate-700 dark:text-slate-200"><FieldLabel required>Name</FieldLabel><input required name="name" placeholder="Your name" className="field min-h-11" /></label>
          <label className="grid gap-2 text-sm font-medium text-slate-700 dark:text-slate-200"><FieldLabel required>Email</FieldLabel><input required type="email" name="email" placeholder="you@company.com" className="field min-h-11" /></label>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <label className="grid gap-2 text-sm font-medium text-slate-700 dark:text-slate-200"><FieldLabel>Company or project name</FieldLabel><input name="company" placeholder="Useful for B2B projects" className="field min-h-11" /></label>
          <label className="grid gap-2 text-sm font-medium text-slate-700 dark:text-slate-200"><FieldLabel>Country / city</FieldLabel><input name="country_city" placeholder="Example: Nador, Morocco" className="field min-h-11" /></label>
        </div>
      </fieldset>

      <fieldset className="grid gap-4 rounded-2xl border border-sky-200/70 p-4 dark:border-white/10">
        <legend className="px-2 text-xs font-black uppercase tracking-[0.24em] text-sky-700 dark:text-cyan-300">2. Project need</legend>
        <label className="grid gap-2 text-sm font-medium text-slate-700 dark:text-slate-200"><FieldLabel required>Business goal</FieldLabel><input required name="business_goal" placeholder="Example: replace manual tracking with a dashboard" className="field min-h-11" /></label>
        <label className="grid gap-2 text-sm font-medium text-slate-700 dark:text-slate-200"><FieldLabel>Current problem</FieldLabel><input name="current_problem" placeholder="Example: reports are manual, documents are hard to find, users need roles" className="field min-h-11" /></label>
        <div className="grid gap-4 md:grid-cols-2">
          <label className="grid gap-2 text-sm font-medium text-slate-700 dark:text-slate-200"><FieldLabel required>Project type</FieldLabel><select required name="project_type" className="field min-h-11">{projectTypes.map((item) => <option key={item}>{item}</option>)}</select></label>
          <label className="grid gap-2 text-sm font-medium text-slate-700 dark:text-slate-200"><FieldLabel required>Budget range</FieldLabel><select required name="budget_range" className="field min-h-11">{budgets.map((item) => <option key={item}>{item}</option>)}</select></label>
        </div>
      </fieldset>

      <fieldset className="grid gap-4 rounded-2xl border border-sky-200/70 p-4 dark:border-white/10">
        <legend className="px-2 text-xs font-black uppercase tracking-[0.24em] text-sky-700 dark:text-cyan-300">3. Scope and timeline</legend>
        <div className="grid gap-4 md:grid-cols-2">
          <label className="grid gap-2 text-sm font-medium text-slate-700 dark:text-slate-200"><FieldLabel>Timeline</FieldLabel><select name="timeline" className="field min-h-11">{timelines.map((item) => <option key={item}>{item}</option>)}</select></label>
          <label className="grid gap-2 text-sm font-medium text-slate-700 dark:text-slate-200"><FieldLabel>Preferred contact method</FieldLabel><select name="preferred_contact_method" className="field min-h-11">{contactMethods.map((item) => <option key={item}>{item}</option>)}</select></label>
        </div>
        <label className="grid gap-2 text-sm font-medium text-slate-700 dark:text-slate-200">
          <FieldLabel required>Project context</FieldLabel>
          <textarea required minLength={20} name="message" placeholder="What should the project improve? What exists today? Which users, dashboards, APIs, workflows or deployment needs matter most?" className="field min-h-40" />
          <span className="text-right text-xs text-slate-500 dark:text-slate-400">{messageLength}/1200 characters</span>
        </label>
      </fieldset>

      <button disabled={status === "loading"} className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-blue-600 via-sky-500 to-cyan-300 px-5 py-3.5 font-black text-white shadow-lg shadow-cyan-500/20 outline-none transition hover:-translate-y-0.5 hover:shadow-cyan-400/40 focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2 focus-visible:ring-offset-white disabled:cursor-not-allowed disabled:opacity-60 dark:focus-visible:ring-cyan-300 dark:focus-visible:ring-offset-slate-950">
        <Send size={18} /> {status === "loading" ? "Sending..." : "Send message"}
      </button>

      <p className="text-xs text-slate-500 dark:text-slate-500">Protected by Laravel validation and rate limiting. No spam, realistic scope, remote/freelance available. Drafts are saved locally in this browser until submission.</p>
      {status === "success" && <p className="rounded-xl border border-emerald-300/50 bg-emerald-50 p-3 text-sm font-medium text-emerald-800 dark:border-emerald-300/30 dark:bg-emerald-300/10 dark:text-emerald-100">Message sent. I&apos;ll review your business goal and reply with a realistic next step.</p>}
      {status === "error" && <p className="rounded-xl border border-rose-300/50 bg-rose-50 p-3 text-sm font-medium text-rose-800 dark:border-rose-300/30 dark:bg-rose-300/10 dark:text-rose-100">Something went wrong. Please try again or contact me by email.</p>}

      <div className="grid gap-3 border-t border-sky-200/70 pt-4 text-sm dark:border-white/10 sm:grid-cols-2">
        {[
          [Mail, "Email", `mailto:${profile.email}`],
          [Send, "WhatsApp on request", `mailto:${profile.email}?subject=WhatsApp%20contact%20request`],
          [Network, "LinkedIn", profile.linkedin],
          [GitBranch, "GitHub", profile.github],
        ].map(([Icon, label, href]) => {
          const FallbackIcon = Icon as typeof Mail;
          return (
            <a key={String(label)} href={String(href)} className="inline-flex min-h-11 items-center gap-2 rounded-2xl border border-sky-200/80 bg-white/75 px-4 font-bold text-slate-700 transition hover:border-sky-400/50 hover:text-sky-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 dark:border-white/10 dark:bg-white/[0.04] dark:text-slate-200 dark:hover:border-cyan-300/35 dark:hover:text-cyan-100">
              <FallbackIcon size={16} className="text-sky-600 dark:text-cyan-300" /> {String(label)}
            </a>
          );
        })}
      </div>
    </form>
  );
}
