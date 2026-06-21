"use client";

import { ArrowUpRight, CheckCircle2, Download, MapPin } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { FloatingDashboardVisual } from "@/components/ui/FloatingDashboardVisual";
import { GradientButton } from "@/components/ui/GradientButton";
import { TechBadge } from "@/components/ui/TechBadge";
import { profile } from "@/lib/data";

const tech = ["Laravel", "React", "Next.js", "MySQL", "Nginx", "API"];
const trustItems = ["Full-stack systems", "Admin dashboards", "SaaS tools", "Production deployment"];

const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0 },
};

export function Hero() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative isolate min-h-[calc(100vh-72px)] overflow-hidden bg-gradient-to-br from-[#020617] via-[#061826] to-[#071b2f]">
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(rgba(34,211,238,.052)_1px,transparent_1px),linear-gradient(90deg,rgba(34,211,238,.052)_1px,transparent_1px)] bg-[size:56px_56px] [mask-image:linear-gradient(to_bottom,black,transparent_88%)]" />
      <div className="absolute left-[-10%] top-16 -z-10 h-72 w-72 rounded-full bg-cyan-400/18 blur-3xl" />
      <div className="absolute right-[-8%] top-24 -z-10 h-96 w-96 rounded-full bg-blue-600/20 blur-3xl" />
      <div className="absolute bottom-0 left-1/3 -z-10 h-64 w-64 rounded-full bg-sky-400/10 blur-3xl" />

      <div className="mx-auto grid min-h-[calc(100vh-72px)] max-w-7xl items-center gap-12 px-4 py-12 sm:py-16 lg:grid-cols-[0.92fr_1.08fr] xl:gap-16">
        <motion.div
          initial={reduceMotion ? false : "hidden"}
          animate="show"
          transition={{ staggerChildren: 0.09 }}
          className="relative z-10"
        >
          <motion.div
            variants={fadeUp}
            transition={{ duration: 0.55 }}
            className="inline-flex max-w-full items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-sm font-medium text-cyan-100 shadow-lg shadow-cyan-500/10 backdrop-blur-xl"
          >
            <span className="h-2 w-2 shrink-0 rounded-full bg-emerald-300 shadow-[0_0_16px_rgba(110,231,183,.9)]" />
            <span className="truncate sm:whitespace-normal">{profile.availability}</span>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            transition={{ duration: 0.6 }}
            className="mt-7 max-w-3xl text-5xl font-black leading-[0.92] tracking-tight text-slate-50 sm:text-6xl lg:text-7xl xl:text-[5.65rem]"
          >
            Youssef{" "}
            <span className="bg-gradient-to-r from-sky-400 via-blue-500 to-cyan-300 bg-clip-text text-transparent">
              Youyou
            </span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            transition={{ duration: 0.6 }}
            className="mt-5 text-2xl font-semibold tracking-tight text-slate-200 sm:text-3xl"
          >
            {profile.title}
          </motion.p>

          <motion.p
            variants={fadeUp}
            transition={{ duration: 0.6 }}
            className="mt-5 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg"
          >
            {profile.description}
          </motion.p>

          <motion.p
            variants={fadeUp}
            transition={{ duration: 0.6 }}
            className="mt-5 text-sm font-semibold uppercase tracking-[0.16em] text-sky-300 sm:text-base sm:normal-case sm:tracking-normal"
          >
            Laravel • React/Next.js • APIs • Dashboards • Deployment • SEO
          </motion.p>

          <motion.div variants={fadeUp} transition={{ duration: 0.6 }} className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <GradientButton href="#projects" className="w-full sm:w-auto">
              View My Work <ArrowUpRight size={18} />
            </GradientButton>
            <GradientButton href="#contact" variant="secondary" className="w-full sm:w-auto">
              Contact Me
            </GradientButton>
            <GradientButton href="/cv-download" variant="link" className="hidden sm:inline-flex">
              <Download size={17} /> Download CV
            </GradientButton>
          </motion.div>

          <motion.div variants={fadeUp} transition={{ duration: 0.6 }} className="mt-4 flex flex-wrap gap-2 text-sm text-slate-400">
            {trustItems.map((item) => (
              <span key={item} className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.035] px-3 py-1">
                <CheckCircle2 size={14} className="text-cyan-300" />
                {item}
              </span>
            ))}
          </motion.div>

          <motion.div variants={fadeUp} transition={{ duration: 0.6 }} className="mt-8 grid max-w-2xl grid-cols-2 gap-3 sm:grid-cols-3">
            {tech.map((item, index) => (
              <TechBadge key={item} delay={0.5 + index * 0.05}>
                {item}
              </TechBadge>
            ))}
          </motion.div>

          <motion.div variants={fadeUp} transition={{ duration: 0.6 }} className="mt-7 flex flex-wrap gap-4 text-sm text-slate-400">
            <span className="inline-flex items-center gap-2">
              <MapPin size={16} className="text-cyan-300" />
              Nador, Morocco
            </span>
            <span>Remote • Freelance • Marrakech opportunities</span>
          </motion.div>
        </motion.div>

        <div className="relative z-10 mt-2 lg:mt-0 lg:pl-4">
          <FloatingDashboardVisual />
        </div>
      </div>
    </section>
  );
}
