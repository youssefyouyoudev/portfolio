"use client";

import { useEffect, useRef, useState } from "react";
import { GitBranch, Mail, Network, Send } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { ClayIcon } from "@/components/ui/ClayIcon";
import { trackEvent } from "@/lib/analytics";
import { profile } from "@/lib/data";

const projectTypes = ["Landing Page — 1,000 DH", "Local Business Presence — 2,500 DH+", "Business Website — 4,500 DH+", "Dashboard / Internal Tool — 5,000 DH+", "SaaS MVP — 15,000 DH+", "SEO/GEO — 1,500 DH/month+", "Existing Project Fix", "Other"];
const budgets = ["Up to 2,500 DH", "2,500–5,000 DH", "5,000–15,000 DH", "15,000 DH+", "Not sure yet"];
const timelines = ["As soon as possible", "This month", "1-3 months", "Flexible / planning phase"];
const contactMethods = ["Email", "WhatsApp on request", "Google Meet", "Phone call if needed"];
const contactAsOptions = ["Business owner", "Agency", "Recruiter", "Startup founder", "Developer/team", "Other"];
const engagementTypes = ["Freelance project", "Remote job", "Part-time contract", "Consultation", "Maintenance/fix", "Long-term collaboration"];
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
  const reduceMotion = useReducedMotion();
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
      queueMicrotask(() => setMessageLength(String(draft.message ?? "").length));
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
    <motion.form
      ref={formRef}
      action={submit}
      onChange={saveDraft}
      whileHover={reduceMotion ? undefined : { y: -4 }}
      className="relative grid gap-5 overflow-hidden rounded-[2.25rem] border border-white/70 bg-white/82 p-5 shadow-[0_28px_90px_rgba(108,99,255,.16),inset_0_1px_0_rgba(255,255,255,.86)] backdrop-blur-2xl dark:border-white/10 dark:bg-white/[0.07] dark:shadow-[0_24px_80px_rgba(2,8,23,.38)] md:p-7"
    >
      <div className="pointer-events-none absolute -right-20 -top-20 h-52 w-52 rounded-full bg-[#F43F8E]/18 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 left-8 h-56 w-56 rounded-full bg-[#6C63FF]/14 blur-3xl" />
      <div className="relative rounded-3xl border border-white/70 bg-gradient-to-br from-violet-50/92 to-pink-50/88 p-4 dark:border-white/10 dark:from-violet-300/[0.1] dark:to-pink-300/[0.07]">
        <ClayIcon icon={Mail} tone="accent" className="mb-4" />
        <h3 className="font-bold text-slate-950 dark:text-cyan-100">Request a practical project estimate</h3>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">Tell me the business problem, not only the technology. I reply with realistic scope, no spam and a project-focused next step.</p>
      </div>

      <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />

      <fieldset className="relative grid gap-4 rounded-3xl border border-white/70 bg-white/42 p-4 dark:border-white/10 dark:bg-white/[0.03]">
        <legend className="px-2 text-xs font-black uppercase tracking-[0.24em] text-[#8B5CF6] dark:text-violet-200">1. Contact info</legend>
        <div className="grid gap-4 md:grid-cols-2">
          <label className="grid gap-2 text-sm font-medium text-slate-700 dark:text-slate-200"><FieldLabel required>Name</FieldLabel><input required name="name" placeholder="Your name" className="field min-h-11" /></label>
          <label className="grid gap-2 text-sm font-medium text-slate-700 dark:text-slate-200"><FieldLabel required>Email</FieldLabel><input required type="email" name="email" placeholder="you@company.com" className="field min-h-11" /></label>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <label className="grid gap-2 text-sm font-medium text-slate-700 dark:text-slate-200"><FieldLabel>Company or project name</FieldLabel><input name="company" placeholder="Useful for B2B projects" className="field min-h-11" /></label>
          <label className="grid gap-2 text-sm font-medium text-slate-700 dark:text-slate-200"><FieldLabel>Country / city</FieldLabel><input name="country_city" placeholder="Example: Nador, Morocco" className="field min-h-11" /></label>
        </div>
      </fieldset>

      <fieldset className="relative grid gap-4 rounded-3xl border border-white/70 bg-white/42 p-4 dark:border-white/10 dark:bg-white/[0.03]">
        <legend className="px-2 text-xs font-black uppercase tracking-[0.24em] text-[#8B5CF6] dark:text-violet-200">2. Project need</legend>
        <label className="grid gap-2 text-sm font-medium text-slate-700 dark:text-slate-200"><FieldLabel required>Business goal</FieldLabel><input required name="business_goal" placeholder="Example: replace manual tracking with a dashboard" className="field min-h-11" /></label>
        <label className="grid gap-2 text-sm font-medium text-slate-700 dark:text-slate-200"><FieldLabel>Current problem</FieldLabel><input name="current_problem" placeholder="Example: reports are manual, documents are hard to find, users need roles" className="field min-h-11" /></label>
        <div className="grid gap-4 md:grid-cols-2">
          <label className="grid gap-2 text-sm font-medium text-slate-700 dark:text-slate-200"><FieldLabel required>Project type</FieldLabel><select required name="project_type" className="field min-h-11">{projectTypes.map((item) => <option key={item}>{item}</option>)}</select></label>
          <label className="grid gap-2 text-sm font-medium text-slate-700 dark:text-slate-200"><FieldLabel required>Budget range</FieldLabel><select required name="budget_range" className="field min-h-11">{budgets.map((item) => <option key={item}>{item}</option>)}</select></label>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <label className="grid gap-2 text-sm font-medium text-slate-700 dark:text-slate-200"><FieldLabel>I am contacting you as</FieldLabel><select name="contact_as" className="field min-h-11">{contactAsOptions.map((item) => <option key={item}>{item}</option>)}</select></label>
          <label className="grid gap-2 text-sm font-medium text-slate-700 dark:text-slate-200"><FieldLabel>Engagement type</FieldLabel><select name="engagement_type" className="field min-h-11">{engagementTypes.map((item) => <option key={item}>{item}</option>)}</select></label>
        </div>
      </fieldset>

      <fieldset className="relative grid gap-4 rounded-3xl border border-white/70 bg-white/42 p-4 dark:border-white/10 dark:bg-white/[0.03]">
        <legend className="px-2 text-xs font-black uppercase tracking-[0.24em] text-[#8B5CF6] dark:text-violet-200">3. Scope and timeline</legend>
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

      <button disabled={status === "loading"} className="relative inline-flex min-h-12 items-center justify-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-[#6C63FF] via-[#8B5CF6] to-[#F43F8E] px-5 py-3.5 font-black text-white shadow-lg shadow-violet-500/20 outline-none transition hover:-translate-y-0.5 hover:shadow-pink-400/30 focus-visible:ring-2 focus-visible:ring-[#6C63FF] focus-visible:ring-offset-2 focus-visible:ring-offset-white disabled:cursor-not-allowed disabled:opacity-60 dark:focus-visible:ring-[#F43F8E] dark:focus-visible:ring-offset-slate-950">
        <span className="absolute inset-x-0 top-0 h-px bg-white/70" />
        <Send size={18} /> {status === "loading" ? "Sending..." : "Send message"}
      </button>

      <p className="text-xs text-slate-500 dark:text-slate-500">Protected by Laravel validation and rate limiting. No spam, realistic scope, remote/freelance available. Drafts are saved locally in this browser until submission.</p>
      {status === "success" && <p className="rounded-xl border border-emerald-300/50 bg-emerald-50 p-3 text-sm font-medium text-emerald-800 dark:border-emerald-300/30 dark:bg-emerald-300/10 dark:text-emerald-100">Message sent. I&apos;ll review your business goal and reply with a realistic next step.</p>}
      {status === "error" && <p className="rounded-xl border border-rose-300/50 bg-rose-50 p-3 text-sm font-medium text-rose-800 dark:border-rose-300/30 dark:bg-rose-300/10 dark:text-rose-100">Something went wrong. Please try again or contact me by email.</p>}

      <div className="grid gap-3 border-t border-white/70 pt-4 text-sm dark:border-white/10 sm:grid-cols-2">
        {[
          [Mail, "Email", `mailto:${profile.email}`],
          [Send, "WhatsApp on request", `mailto:${profile.email}?subject=WhatsApp%20contact%20request`],
          [Network, "LinkedIn", profile.linkedin],
          [GitBranch, "GitHub", profile.github],
        ].map(([Icon, label, href]) => {
          const FallbackIcon = Icon as typeof Mail;
          return (
            <a key={String(label)} href={String(href)} className="inline-flex min-h-11 items-center gap-2 rounded-2xl border border-white/70 bg-white/75 px-4 font-bold text-slate-700 transition hover:border-[#8B5CF6]/45 hover:text-[#6C63FF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6C63FF] dark:border-white/10 dark:bg-white/[0.04] dark:text-slate-200 dark:hover:border-[#F43F8E]/35 dark:hover:text-pink-100">
              <FallbackIcon size={16} className="text-[#6C63FF] dark:text-violet-200" /> {String(label)}
            </a>
          );
        })}
      </div>
    </motion.form>
  );
}
