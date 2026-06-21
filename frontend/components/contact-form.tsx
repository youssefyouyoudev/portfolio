"use client";

import { useState } from "react";
import { Send } from "lucide-react";

const projectTypes = ["B2B website", "B2C website", "SaaS", "Admin dashboard", "E-commerce", "API integration", "Internal tool", "Digital archiving", "Automation", "Other"];
const budgets = ["Small project", "Medium project", "Large project", "Not sure yet"];

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
    } catch {
      setStatus("error");
    }
  }

  return (
    <form action={submit} className="grid gap-4 rounded-2xl border border-white/10 bg-white/[0.04] p-5 shadow-[0_24px_80px_rgba(2,8,23,.35)]">
      <div className="rounded-2xl border border-cyan-300/15 bg-cyan-300/[0.06] p-4">
        <h3 className="font-bold text-cyan-100">Request a practical project estimate</h3>
        <p className="mt-2 text-sm text-slate-300">Share enough context to understand the business goal, not just the technology list.</p>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <label className="grid gap-2 text-sm font-medium text-slate-200">Name<input required name="name" placeholder="Your name" className="field" /></label>
        <label className="grid gap-2 text-sm font-medium text-slate-200">Email<input required type="email" name="email" placeholder="you@company.com" className="field" /></label>
      </div>
      <label className="grid gap-2 text-sm font-medium text-slate-200">Company or project name<input name="company" placeholder="Optional, but useful for B2B projects" className="field" /></label>
      <div className="grid gap-4 md:grid-cols-2">
        <label className="grid gap-2 text-sm font-medium text-slate-200">Project type<select required name="project_type" className="field">{projectTypes.map((item) => <option key={item}>{item}</option>)}</select></label>
        <label className="grid gap-2 text-sm font-medium text-slate-200">Budget range<select required name="budget_range" className="field">{budgets.map((item) => <option key={item}>{item}</option>)}</select></label>
      </div>
      <label className="grid gap-2 text-sm font-medium text-slate-200">Project context<textarea required minLength={20} name="message" placeholder="What are you trying to improve? What exists today? Which users, dashboards, APIs, workflows or deployment needs matter most?" className="field min-h-40" /></label>
      <button disabled={status === "loading"} className="inline-flex items-center justify-center gap-2 rounded-full bg-cyan-300 px-5 py-3 font-bold text-slate-950 transition hover:bg-white disabled:opacity-60">
        <Send size={18} /> {status === "loading" ? "Sending..." : "Send project request"}
      </button>
      <p className="text-xs text-slate-500">Protected by Laravel validation and rate limiting. No spammy newsletter tricks.</p>
      {status === "success" && <p className="rounded-xl border border-emerald-300/30 bg-emerald-300/10 p-3 text-sm text-emerald-100">Message sent. I will review the business goal, scope and technical path before replying.</p>}
      {status === "error" && <p className="rounded-xl border border-rose-300/30 bg-rose-300/10 p-3 text-sm text-rose-100">Could not send yet. Check the API URL or try again later.</p>}
    </form>
  );
}
