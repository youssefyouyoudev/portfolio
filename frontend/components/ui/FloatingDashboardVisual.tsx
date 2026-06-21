"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { Activity, Database, Gauge, Server } from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";

function FloatingCard({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className: string;
  delay?: number;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 18, scale: 0.96 }}
      animate={
        reduceMotion
          ? { opacity: 1 }
          : {
              opacity: 1,
              y: [0, -10, 0],
              scale: 1,
            }
      }
      transition={
        reduceMotion
          ? { duration: 0.3 }
          : {
              opacity: { duration: 0.5, delay },
              scale: { duration: 0.5, delay },
              y: { duration: 5, repeat: Infinity, ease: "easeInOut", delay },
            }
      }
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function FloatingDashboardVisual() {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, x: 36, scale: 0.96 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      transition={{ duration: 0.7, ease: "easeOut", delay: 0.15 }}
      className="relative mx-auto w-full max-w-[740px] overflow-visible"
    >
      <div className="absolute -inset-5 rounded-[2.5rem] bg-sky-300/35 blur-3xl dark:bg-cyan-400/18" />
      <div className="absolute -right-8 top-12 hidden h-44 w-44 rounded-full bg-cyan-300/25 blur-3xl dark:bg-blue-500/18 sm:block" />

      <GlassCard className="relative overflow-hidden rounded-[2rem] p-2 ring-1 ring-white/5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(14,165,233,.16),transparent_34%),linear-gradient(135deg,rgba(255,255,255,.72),rgba(224,242,254,.82))] dark:bg-[radial-gradient(circle_at_70%_20%,rgba(34,211,238,.2),transparent_34%),linear-gradient(135deg,rgba(15,23,42,.58),rgba(2,6,23,.9))]" />
        <div className="relative flex h-9 items-center gap-2 rounded-t-[1.45rem] border-b border-sky-200/70 bg-white/80 px-4 dark:border-white/10 dark:bg-slate-950/70">
          <span className="h-2.5 w-2.5 rounded-full bg-rose-400/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-amber-300/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-300/80" />
          <span className="ml-3 text-xs text-slate-500 dark:text-slate-400">production-dashboard.tsx</span>
        </div>
        <div className="relative aspect-[4/3] overflow-hidden rounded-b-[1.45rem] bg-[#020617] sm:aspect-[16/10]">
          <Image
            src="/images/hero-portfolio.png"
            alt="Youssef Youyou full-stack developer portfolio hero visual"
            fill
            priority
            sizes="(min-width: 1024px) 48vw, 92vw"
            quality={92}
            className="scale-[1.2] object-cover object-[70%_52%] opacity-95 saturate-125"
          />
          <div className="absolute inset-0 bg-gradient-to-l from-transparent via-[#020617]/5 to-[#020617]/46" />
          <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#020617]/88 to-transparent" />
        </div>
      </GlassCard>

      <FloatingCard delay={0.25} className="absolute -left-3 top-8 hidden w-56 md:block">
        <GlassCard className="rounded-2xl p-4 ring-1 ring-sky-300/20 dark:ring-cyan-300/10">
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
            <span>API Request</span>
            <Server size={15} className="text-cyan-300" />
          </div>
          <div className="mt-3 rounded-xl border border-sky-200/70 bg-slate-50/80 p-3 font-mono text-xs dark:border-cyan-400/15 dark:bg-[#020617]/70">
            <p className="text-sky-700 dark:text-sky-300">GET /api/projects</p>
            <p className="mt-2 text-emerald-300">200 OK</p>
          </div>
        </GlassCard>
      </FloatingCard>

      <FloatingCard delay={0.55} className="absolute -right-2 top-16 hidden w-48 lg:block">
        <GlassCard className="rounded-2xl p-4 ring-1 ring-sky-300/20 dark:ring-cyan-300/10">
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
            <span>Dashboard</span>
            <Gauge size={15} className="text-cyan-300" />
          </div>
          <p className="mt-3 text-4xl font-black text-slate-950 dark:text-white">98</p>
          <p className="text-xs text-sky-700 dark:text-cyan-200">SEO-ready score</p>
        </GlassCard>
      </FloatingCard>

      <FloatingCard delay={0.85} className="absolute -bottom-5 left-8 hidden w-64 sm:block">
        <GlassCard className="rounded-2xl p-4 ring-1 ring-sky-300/20 dark:ring-cyan-300/10">
          <div className="flex items-center gap-3">
            <Database className="text-cyan-300" size={18} />
            <div>
              <p className="text-sm font-bold text-slate-950 dark:text-white">Laravel + React + MySQL</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">Production-oriented stack</p>
            </div>
          </div>
        </GlassCard>
      </FloatingCard>

      <FloatingCard delay={1.05} className="absolute bottom-10 right-8 hidden w-44 md:block">
        <GlassCard className="rounded-2xl p-4 ring-1 ring-sky-300/20 dark:ring-cyan-300/10">
          <div className="flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300">
            <Activity size={15} className="text-emerald-300" />
            Deploy ready
          </div>
          <div className="mt-3 h-2 rounded-full bg-slate-200 dark:bg-slate-800">
            <div className="h-2 w-[86%] rounded-full bg-gradient-to-r from-sky-500 to-cyan-300" />
          </div>
        </GlassCard>
      </FloatingCard>
    </motion.div>
  );
}
