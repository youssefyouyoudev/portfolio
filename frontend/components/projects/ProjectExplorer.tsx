"use client";

import { KeyboardEvent, MouseEvent, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  BarChart3,
  CheckCircle2,
  Code2,
  ExternalLink,
  GitBranch,
  MonitorSmartphone,
  Search,
  ShieldCheck,
  Sparkles,
  X,
} from "lucide-react";
import { PortfolioProject, projectCategories } from "@/lib/project-content";
import { trackEvent } from "@/lib/analytics";

function statusClass(status: PortfolioProject["status"]) {
  if (status === "Live") return "border-emerald-300/70 bg-emerald-50 text-emerald-700 dark:border-emerald-300/25 dark:bg-emerald-300/10 dark:text-emerald-200";
  if (status === "Engineering-qualified for staging") return "border-sky-300/70 bg-sky-50 text-sky-700 dark:border-cyan-300/25 dark:bg-cyan-300/10 dark:text-cyan-100";
  if (status === "Internal") return "border-[#F43F8E]/35 bg-pink-50 text-[#F43F8E] dark:border-pink-300/25 dark:bg-pink-300/10 dark:text-pink-100";
  if (status === "Client Project") return "border-amber-300/70 bg-amber-50 text-amber-700 dark:border-amber-300/25 dark:bg-amber-300/10 dark:text-amber-100";
  return "border-slate-300/80 bg-slate-100 text-slate-700 dark:border-white/10 dark:bg-white/[0.06] dark:text-slate-200";
}

// Kept for future non-product illustrations; private systems intentionally render no fake UI.
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function ProjectMockup({ project }: { project: PortfolioProject }) {
  return (
    <div className="relative h-full w-full overflow-hidden bg-[radial-gradient(circle_at_80%_20%,rgba(14,165,233,.24),transparent_32%),linear-gradient(135deg,#f8fafc,#e0f2fe)] p-5 dark:bg-[radial-gradient(circle_at_80%_20%,rgba(34,211,238,.2),transparent_32%),linear-gradient(135deg,#020617,#0f172a)]">
      <div className="absolute inset-x-5 top-5 flex items-center gap-1.5">
        <span className="h-2.5 w-2.5 rounded-full bg-rose-400" />
        <span className="h-2.5 w-2.5 rounded-full bg-amber-300" />
        <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
      </div>
      <div className="mt-8 grid h-[calc(100%-2rem)] grid-cols-[0.34fr_1fr] gap-4">
        <div className="rounded-2xl border border-sky-200/80 bg-white/70 p-3 dark:border-white/10 dark:bg-white/[0.05]">
          <div className="h-3 w-16 rounded-full bg-sky-300/70 dark:bg-cyan-300/40" />
          <div className="mt-5 grid gap-2">
            {[48, 66, 54, 72, 44].map((width, index) => (
              <span key={index} className="h-2 rounded-full bg-slate-300/70 dark:bg-slate-700" style={{ width: `${width}%` }} />
            ))}
          </div>
        </div>
        <div className="grid gap-3">
          <div className="rounded-2xl border border-sky-200/80 bg-white/80 p-4 shadow-lg shadow-sky-100/70 dark:border-cyan-400/15 dark:bg-slate-900/70 dark:shadow-none">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-sky-700 dark:text-cyan-300">{project.categoryGroup}</p>
            <p className="mt-2 text-xl font-black text-slate-950 dark:text-white">{project.title}</p>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {[BarChart3, ShieldCheck, Code2].map((Icon, index) => (
              <div key={index} className="rounded-2xl border border-sky-200/80 bg-white/70 p-3 dark:border-white/10 dark:bg-white/[0.05]">
                <Icon className="text-sky-600 dark:text-cyan-300" size={18} />
                <span className="mt-4 block h-2 rounded-full bg-sky-200 dark:bg-cyan-300/20" />
              </div>
            ))}
          </div>
          <div className="flex-1 rounded-2xl border border-sky-200/80 bg-white/70 p-4 dark:border-white/10 dark:bg-white/[0.05]">
            <div className="grid gap-2">
              {[85, 62, 74, 52].map((width) => (
                <span key={width} className="h-2 rounded-full bg-slate-300/70 dark:bg-slate-700" style={{ width: `${width}%` }} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function ProjectImage({ project, priority = false }: { project: PortfolioProject; priority?: boolean }) {
  return (
    <div className="relative aspect-[16/10] overflow-hidden rounded-[2rem] border border-white/70 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,.72),transparent_26%),linear-gradient(135deg,#eeeaff,#ffe4f1_48%,#eef2ff)] p-4 shadow-inner shadow-white/90 dark:border-white/10 dark:bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,.12),transparent_26%),linear-gradient(135deg,#1e1b4b,#312e81_48%,#0f172a)] dark:shadow-none">
      <div className="absolute -left-10 top-12 h-40 w-40 rounded-full bg-[#6C63FF]/25 blur-2xl" />
      <div className="absolute -right-10 bottom-6 h-48 w-48 rounded-full bg-[#F43F8E]/20 blur-2xl" />
      <div className="absolute right-8 top-8 h-16 w-16 rounded-full bg-white/40 blur-xl dark:bg-white/10" />

      <motion.div
        className="relative mx-auto mt-4 h-[78%] w-[88%] overflow-hidden rounded-[1.5rem] border border-white/75 bg-white/84 shadow-[0_26px_70px_rgba(17,24,39,.22)] transition duration-700 group-hover:scale-[1.035] dark:border-white/10 dark:bg-slate-950/80"
        whileHover={{ y: -4 }}
      >
        <div className="flex h-8 items-center gap-1.5 border-b border-slate-200/80 bg-white/86 px-4 dark:border-white/10 dark:bg-white/[0.06]">
          <span className="h-2.5 w-2.5 rounded-full bg-rose-400" />
          <span className="h-2.5 w-2.5 rounded-full bg-amber-300" />
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
          <span className="ml-2 truncate text-[11px] font-bold text-slate-400">{project.title}</span>
        </div>
        <div className="relative h-[calc(100%-2rem)]">
          {project.image ? (
            <Image
              src={project.image}
              alt={project.imageAlt ?? `${project.title} project preview`}
              fill
              priority={priority}
              loading={priority ? undefined : "lazy"}
              sizes="(min-width: 1280px) 42vw, (min-width: 768px) 48vw, 92vw"
              className="object-cover transition duration-700 group-hover:scale-[1.05]"
            />
          ) : (
            <div className="grid h-full place-items-center bg-slate-950 p-6 text-center text-slate-200">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.2em] text-cyan-200">Private product</p>
                <p className="mt-3 text-xl font-black text-white">{project.title}</p>
                <p className="mt-2 max-w-xs text-sm leading-6 text-slate-300">No public interface capture is shown for this authentication-gated system.</p>
              </div>
            </div>
          )}
        </div>
      </motion.div>

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/24 via-transparent to-white/8 dark:from-slate-950/45" />
      <div className="absolute left-3 top-3 flex flex-wrap gap-2">
        <span className={`rounded-full border px-3 py-1 text-[11px] font-black uppercase tracking-[0.12em] shadow-lg backdrop-blur-md ${statusClass(project.status)}`}>{project.status}</span>
        <span className="rounded-full border border-white/35 bg-slate-950/68 px-3 py-1 text-[11px] font-black uppercase tracking-[0.12em] text-white shadow-lg backdrop-blur-md">
          {project.technicalDifficulty}
        </span>
      </div>
      <div className="absolute bottom-4 left-5 right-5 flex flex-wrap gap-2">
        {project.stack.slice(0, 4).map((tag, index) => (
          <motion.span
            key={tag}
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 4 + index * 0.35, repeat: Infinity, ease: "easeInOut", delay: index * 0.18 }}
            className="rounded-2xl border border-white/70 bg-white/78 px-3 py-1 text-[11px] font-black text-slate-800 shadow-lg backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.08] dark:text-white"
          >
            {tag}
          </motion.span>
        ))}
      </div>
    </div>
  );
}

function ProjectQuickView({ project, onClose }: { project: PortfolioProject | null; onClose: () => void }) {
  useEffect(() => {
    if (!project) return;
    const onKeyDown = (event: globalThis.KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [onClose, project]);

  return (
    <AnimatePresence>
      {project ? (
        <motion.div
          className="fixed inset-0 z-50 flex items-end justify-center bg-slate-950/72 p-3 backdrop-blur-sm sm:items-center sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-quick-view-title"
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            onClick={(event) => event.stopPropagation()}
            className="max-h-[88vh] w-full max-w-3xl overflow-y-auto rounded-[2rem] border border-cyan-300/20 bg-white p-5 shadow-2xl shadow-cyan-500/10 dark:bg-slate-950 sm:p-7"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.24em] text-sky-700 dark:text-cyan-300">{project.categoryGroup}</p>
                <h3 id="project-quick-view-title" className="mt-3 text-3xl font-black tracking-tight text-slate-950 dark:text-white">
                  {project.title}
                </h3>
                <p className="mt-2 font-bold text-sky-700 dark:text-cyan-200">{project.subtitle}</p>
              </div>
              <button
                type="button"
                aria-label="Close quick view"
                onClick={onClose}
                className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-sky-200/80 bg-white text-slate-700 transition hover:border-sky-400/50 hover:text-sky-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 dark:border-white/10 dark:bg-white/[0.05] dark:text-slate-200"
              >
                <X size={18} />
              </button>
            </div>

            <div className="mt-5 grid gap-2 rounded-2xl border border-sky-200/80 bg-sky-50/80 p-4 text-sm font-bold text-slate-700 dark:border-white/10 dark:bg-white/[0.04] dark:text-slate-300 sm:grid-cols-3">
              <span>Status: <strong className="text-sky-700 dark:text-cyan-200">{project.status}</strong></span>
              <span>Demo: <strong className="text-sky-700 dark:text-cyan-200">{project.demoLabel}</strong></span>
              <span>Code: <strong className="text-sky-700 dark:text-cyan-200">{project.codeLabel}</strong></span>
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {[
                ["Problem solved", project.businessValue],
                ["Technical line", project.specificLine],
                ["Business value", project.results],
                ["Tech stack", project.stack.slice(0, 8).join(", ")],
              ].map(([label, text]) => (
                <div key={label} className="rounded-2xl border border-sky-200/80 bg-white/80 p-4 text-sm leading-7 text-slate-700 dark:border-white/10 dark:bg-white/[0.04] dark:text-slate-300">
                  <p className="font-black text-sky-700 dark:text-cyan-200">{label}</p>
                  <p className="mt-2">{text}</p>
                </div>
              ))}
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href={project.caseStudyUrl}
                onClick={() => trackEvent("project_case_study_click", { project: project.slug, source: "quick_view" })}
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-sky-500 to-cyan-300 px-5 text-sm font-black text-white shadow-lg shadow-cyan-500/20 transition hover:-translate-y-0.5"
              >
                Open full case study <ArrowRight size={15} />
              </Link>
              <Link
                href="/work-with-me"
                onClick={() => trackEvent("service_page_cta_click", { source: `quick_view_${project.slug}` })}
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-sky-200/80 bg-white/75 px-5 text-sm font-bold text-slate-700 transition hover:border-sky-400/50 hover:text-sky-700 dark:border-white/10 dark:bg-transparent dark:text-slate-200 dark:hover:border-cyan-300/35 dark:hover:text-cyan-100"
              >
                Contact about similar project
              </Link>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

export function ProjectCard({
  project,
  featured = false,
  priority = false,
  onQuickView,
}: {
  project: PortfolioProject;
  featured?: boolean;
  priority?: boolean;
  onQuickView?: (project: PortfolioProject) => void;
}) {
  function openCaseStudy() {
    trackEvent("project_case_study_click", { project: project.slug, source: "card" });
    window.location.href = project.caseStudyUrl;
  }

  function handleKeyDown(event: KeyboardEvent<HTMLElement>) {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openCaseStudy();
    }
  }

  function stopCardClick(event: MouseEvent<HTMLElement>) {
    event.stopPropagation();
  }

  return (
    <motion.article
      role="link"
      tabIndex={0}
      aria-label={`Open ${project.title} case study`}
      onClick={openCaseStudy}
      onKeyDown={handleKeyDown}
      whileHover={{ y: -8, rotateX: 1.5, rotateY: -1.5 }}
      transition={{ type: "spring", stiffness: 220, damping: 22 }}
      className={`group relative flex h-full cursor-pointer flex-col overflow-hidden rounded-[2.25rem] border border-white/70 bg-white/78 shadow-[0_24px_80px_rgba(108,99,255,.13),inset_0_1px_0_rgba(255,255,255,.82)] backdrop-blur-2xl transition duration-300 hover:border-[#8B5CF6]/45 hover:bg-white hover:shadow-[0_30px_100px_rgba(244,63,142,.16)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6C63FF] dark:border-white/10 dark:bg-white/[0.065] dark:shadow-slate-950/30 dark:hover:border-[#F43F8E]/35 dark:hover:bg-white/[0.09] ${featured ? "p-4 md:p-5" : "p-4"}`}
    >
      <div className="pointer-events-none absolute inset-0 rounded-[2.25rem] bg-gradient-to-br from-[#6C63FF]/0 via-[#8B5CF6]/0 to-[#F43F8E]/0 opacity-0 transition duration-500 group-hover:from-[#6C63FF]/10 group-hover:via-transparent group-hover:to-[#F43F8E]/10 group-hover:opacity-100" />
      <div className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-[#F43F8E]/70 to-transparent" />
      <ProjectImage project={project} priority={priority} />
      <div className={featured ? "p-2 pt-5 md:p-3 md:pt-6" : "p-1 pt-5"}>
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full border border-[#8B5CF6]/20 bg-violet-50 px-3 py-1 text-[11px] font-black uppercase tracking-[0.14em] text-[#6C63FF] dark:border-violet-300/15 dark:bg-violet-300/10 dark:text-violet-100">
            {project.categoryGroup}
          </span>
          {project.featured ? (
            <span className="rounded-full border border-[#F43F8E]/35 bg-pink-50 px-3 py-1 text-[11px] font-black uppercase tracking-[0.14em] text-[#F43F8E] dark:bg-pink-300/10 dark:text-pink-100">
              {project.slug === "rifitv" || project.slug === "erplus" ? "Best proof" : "Featured"}
            </span>
          ) : null}
          <span className="rounded-full border border-white/70 bg-white/80 px-3 py-1 text-[11px] font-bold text-slate-600 dark:border-white/10 dark:bg-white/[0.04] dark:text-slate-300">
            Built for: {project.builtFor.split(" ").slice(0, 5).join(" ")}...
          </span>
        </div>
        <h3 className={`${featured ? "mt-5 text-3xl" : "mt-4 text-2xl"} text-balance font-black tracking-tight text-slate-950 dark:text-white`}>{project.title}</h3>
        <p className="mt-2 text-sm font-bold text-sky-700 dark:text-cyan-200">{project.subtitle}</p>
        <p className="mt-4 text-sm leading-7 text-slate-700 dark:text-slate-300">{project.shortDescription}</p>
        <div className="mt-4 grid gap-2 rounded-3xl border border-white/70 bg-white/70 p-4 text-xs font-bold text-slate-700 dark:border-white/10 dark:bg-white/[0.04] dark:text-slate-300 sm:grid-cols-3">
          <span>Status: <strong className="text-[#6C63FF] dark:text-violet-200">{project.status}</strong></span>
          <span>Demo: <strong className="text-[#6C63FF] dark:text-violet-200">{project.demoLabel}</strong></span>
          <span>Code: <strong className="text-[#6C63FF] dark:text-violet-200">{project.codeLabel}</strong></span>
        </div>
        <div className="mt-5 rounded-3xl border border-white/70 bg-white/70 p-4 text-sm leading-7 text-slate-700 dark:border-white/10 dark:bg-white/[0.04] dark:text-slate-300">
          <span className="font-black text-[#6C63FF] dark:text-violet-200">Technical line: </span>
          {project.specificLine}
        </div>
        <div className="mt-5 rounded-3xl border border-[#F43F8E]/18 bg-pink-50/70 p-4 text-sm leading-7 text-slate-700 dark:border-pink-300/15 dark:bg-pink-300/[0.06] dark:text-pink-50">
          <span className="font-black text-[#F43F8E] dark:text-pink-200">Business value: </span>
          {project.results}
        </div>
        <div className="mt-5 grid gap-2">
          {project.features.slice(0, 3).map((feature) => (
            <p key={feature} className="flex gap-2 text-sm leading-6 text-slate-700 dark:text-slate-300">
              <CheckCircle2 className="mt-0.5 shrink-0 text-[#6C63FF] dark:text-violet-200" size={16} />
              {feature}
            </p>
          ))}
        </div>
        <div className="mt-5 flex flex-wrap gap-2">
          {project.stack.slice(0, featured ? 6 : 5).map((tag, index) => (
            <span key={tag} className="inline-flex items-center gap-2 rounded-2xl border border-white/70 bg-white px-3 py-1 text-xs font-bold text-slate-700 shadow-sm dark:border-white/10 dark:bg-white/[0.05] dark:text-slate-200">
              <span className={`h-2 w-2 rounded-full bg-gradient-to-br ${index % 2 === 0 ? "from-[#6C63FF] to-[#8B5CF6]" : "from-[#F43F8E] to-[#8B5CF6]"}`} />
              {tag}
            </span>
          ))}
        </div>
        <div className="mt-6 flex flex-wrap gap-3 transition duration-300 group-hover:-translate-y-1">
          <Link href={project.caseStudyUrl} onClick={(event) => { stopCardClick(event); trackEvent("project_case_study_click", { project: project.slug }); }} className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#6C63FF] via-[#8B5CF6] to-[#F43F8E] px-4 text-sm font-black text-white shadow-lg shadow-violet-500/20 transition hover:-translate-y-0.5 hover:shadow-pink-400/30">
            View case study <ArrowRight size={15} />
          </Link>
          <button
            type="button"
            onClick={(event) => {
              stopCardClick(event);
              onQuickView?.(project);
            }}
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-white/70 bg-white/75 px-4 text-sm font-bold text-slate-700 transition hover:border-[#8B5CF6]/45 hover:text-[#6C63FF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6C63FF] dark:border-white/10 dark:bg-transparent dark:text-slate-200 dark:hover:border-[#F43F8E]/35 dark:hover:text-pink-100"
          >
            Quick view
          </button>
          {project.liveUrl ? (
            <a href={project.liveUrl} onClick={(event) => { stopCardClick(event); trackEvent("external_project_click", { project: project.slug }); }} target="_blank" rel="noreferrer" className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-white/70 bg-white/75 px-4 text-sm font-bold text-slate-700 transition hover:border-[#8B5CF6]/45 hover:text-[#6C63FF] dark:border-white/10 dark:bg-transparent dark:text-slate-200 dark:hover:border-[#F43F8E]/35 dark:hover:text-pink-100">
              Live demo <ExternalLink size={15} />
            </a>
          ) : null}
          {project.githubUrl ? (
            <a href={project.githubUrl} onClick={stopCardClick} target="_blank" rel="noreferrer" className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-white/70 bg-white/75 px-4 text-sm font-bold text-slate-700 transition hover:border-[#8B5CF6]/45 hover:text-[#6C63FF] dark:border-white/10 dark:bg-transparent dark:text-slate-200 dark:hover:border-[#F43F8E]/35 dark:hover:text-pink-100">
              GitHub <GitBranch size={15} />
            </a>
          ) : null}
        </div>
      </div>
    </motion.article>
  );
}

export function FeaturedProjectCard({ project, priority = false, onQuickView }: { project: PortfolioProject; priority?: boolean; onQuickView?: (project: PortfolioProject) => void }) {
  return <ProjectCard project={project} featured priority={priority} onQuickView={onQuickView} />;
}

export function ProjectFilters({
  activeCategory,
  count,
  query,
  onCategoryChange,
  onQueryChange,
}: {
  activeCategory: (typeof projectCategories)[number];
  count: number;
  query: string;
  onCategoryChange: (category: (typeof projectCategories)[number]) => void;
  onQueryChange: (query: string) => void;
}) {
  return (
    <>
      <div className="mb-8 grid gap-4 lg:grid-cols-[1fr_auto] lg:items-end">
        <div className="flex flex-wrap gap-2">
          {projectCategories.map((category) => (
            <button
              key={category}
              onClick={() => onCategoryChange(category)}
              aria-pressed={activeCategory === category}
              className={`rounded-full border px-4 py-2 text-sm font-black transition ${
                activeCategory === category
                  ? "border-[#8B5CF6]/50 bg-gradient-to-r from-[#6C63FF] to-[#F43F8E] text-white shadow-lg shadow-violet-500/20"
                  : "border-white/70 bg-white/75 text-slate-700 hover:border-[#8B5CF6]/45 hover:text-[#6C63FF] dark:border-white/10 dark:bg-white/[0.05] dark:text-slate-300 dark:hover:border-[#F43F8E]/35 dark:hover:text-pink-100"
              }`}
              type="button"
            >
              {category}
            </button>
          ))}
        </div>
        <label className="relative block min-w-0 lg:w-80">
          <span className="sr-only">Search projects</span>
          <Search className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={17} />
          <input
            value={query}
            onChange={(event) => onQueryChange(event.target.value)}
            aria-label="Search projects by stack, feature or project name"
            placeholder="Search stack, feature or project"
            className="w-full rounded-full border border-white/70 bg-white/78 py-3 pl-11 pr-11 text-sm font-semibold text-slate-800 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-[#8B5CF6]/55 focus:ring-4 focus:ring-violet-300/15 dark:border-white/10 dark:bg-white/[0.06] dark:text-slate-100 dark:focus:border-[#F43F8E]/45"
          />
          {query ? (
            <button
              type="button"
              aria-label="Clear project search"
              onClick={() => onQueryChange("")}
              className="absolute right-3 top-1/2 grid h-8 w-8 -translate-y-1/2 place-items-center rounded-full text-slate-500 transition hover:bg-violet-100 hover:text-[#6C63FF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6C63FF] dark:hover:bg-white/10 dark:hover:text-pink-100"
            >
              <X size={15} />
            </button>
          ) : null}
        </label>
      </div>

      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.24em] text-[#8B5CF6] dark:text-violet-200">Proof of Work</p>
          <h3 className="mt-2 text-2xl font-black text-slate-950 dark:text-white">{activeCategory === "All" ? "All case studies" : `${activeCategory} projects`}</h3>
        </div>
        <div className="flex items-center gap-2 rounded-full border border-white/70 bg-white/70 px-4 py-2 text-sm font-bold text-slate-700 shadow-sm dark:border-white/10 dark:bg-white/[0.04] dark:text-slate-300">
          <MonitorSmartphone size={16} className="text-[#F43F8E] dark:text-pink-200" />
          {count} project{count === 1 ? "" : "s"}
        </div>
      </div>
    </>
  );
}

export function ProjectCTA() {
  return (
    <div className="mt-10 rounded-[2.25rem] border border-white/70 bg-gradient-to-br from-white/82 via-violet-50/80 to-pink-50/80 p-6 shadow-[0_26px_90px_rgba(108,99,255,.14)] backdrop-blur-2xl dark:border-white/10 dark:from-white/[0.08] dark:via-violet-300/[0.08] dark:to-pink-300/[0.06] dark:shadow-slate-950/30 md:p-10">
      <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.24em] text-[#8B5CF6] dark:text-violet-200">Have a project in mind?</p>
          <h3 className="mt-3 text-3xl font-black tracking-tight text-slate-950 dark:text-white">I can help you build a dashboard, SaaS platform, business website or custom web application.</h3>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-700 dark:text-slate-300">
            Send the business problem, current workflow and ideal timeline. I will help shape the scope into a practical Laravel, React/Next.js or automation solution.
          </p>
        </div>
        <Link href="/contact" className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#6C63FF] via-[#8B5CF6] to-[#F43F8E] px-6 py-3.5 text-sm font-black text-white shadow-lg shadow-violet-500/20 transition hover:-translate-y-0.5 hover:shadow-pink-500/20">
          Contact Me <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
}

export function ProjectsSection({ projects, mode = "home" }: { projects: PortfolioProject[]; mode?: "home" | "page" }) {
  const [activeCategory, setActiveCategory] = useState<(typeof projectCategories)[number]>("All");
  const [query, setQuery] = useState("");
  const [quickViewProject, setQuickViewProject] = useState<PortfolioProject | null>(null);

  const flagshipOrder = ["erplus", "youssef-control", "rifitv", "portfolio-admin-system", "digital-archiving-system", "excel-vba-automation-tools"];
  const featuredProjects = projects
    .filter((project) => project.featured && project.status !== "Concept")
    .sort((a, b) => flagshipOrder.indexOf(a.slug) - flagshipOrder.indexOf(b.slug))
    .slice(0, mode === "home" ? 4 : 4);
  const filteredProjects = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return projects.filter((project) => {
      const categoryMatch = activeCategory === "All" || project.categoryGroup === activeCategory;
      const queryMatch =
        !normalized ||
        [project.title, project.category, project.shortDescription, project.businessValue, project.stack.join(" "), project.features.join(" ")]
          .join(" ")
          .toLowerCase()
          .includes(normalized);
      return categoryMatch && queryMatch;
    });
  }, [activeCategory, projects, query]);

  const gridProjects = filteredProjects.filter((project) => !featuredProjects.some((featured) => featured.slug === project.slug));

  return (
    <div>
      <ProjectFilters activeCategory={activeCategory} count={filteredProjects.length} query={query} onCategoryChange={setActiveCategory} onQueryChange={setQuery} />
      <ProjectQuickView project={quickViewProject} onClose={() => setQuickViewProject(null)} />

      {mode === "home" && activeCategory === "All" && !query ? (
        <>
          <div className="mb-5 rounded-[2rem] border border-violet-200/60 bg-white/75 p-5 text-sm leading-7 text-slate-700 shadow-lg shadow-violet-100/50 dark:border-white/10 dark:bg-white/[0.04] dark:text-slate-300">
            <strong className="text-slate-950 dark:text-white">Featured systems</strong> are implemented, live or internally used work. <strong className="text-slate-950 dark:text-white">Labs / concepts</strong> remain below as clearly labelled architecture explorations.
          </div>
          <div className="mb-8 grid gap-6 xl:grid-cols-2">
            {featuredProjects.map((project, index) => (
              <FeaturedProjectCard key={project.slug} project={project} priority={index === 0} onQuickView={setQuickViewProject} />
            ))}
          </div>
        </>
      ) : null}

      {filteredProjects.length ? (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {(mode === "home" && activeCategory === "All" && !query ? gridProjects : filteredProjects).map((project, index) => (
            <ProjectCard key={project.slug} project={project} priority={mode === "page" && index === 0} onQuickView={setQuickViewProject} />
          ))}
        </div>
      ) : (
        <div className="rounded-[2rem] border border-dashed border-sky-300/70 bg-white/75 p-8 text-center text-slate-700 dark:border-cyan-300/25 dark:bg-white/[0.04] dark:text-slate-300">
          <Sparkles className="mx-auto text-sky-600 dark:text-cyan-300" />
          <p className="mt-4 font-black">No project matches that filter yet.</p>
          <p className="mt-2 text-sm">Try another category or search for Laravel, dashboard, API, media or automation.</p>
        </div>
      )}

      <ProjectCTA />
    </div>
  );
}

export { ProjectsSection as ProjectExplorer };
