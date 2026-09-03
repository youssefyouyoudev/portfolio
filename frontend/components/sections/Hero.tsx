"use client";

import Image from "next/image";
import { ArrowUpRight, CheckCircle2, Download, MapPin, Sparkles } from "lucide-react";
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";
import { GradientButton } from "@/components/ui/GradientButton";
import { TechBadge } from "@/components/ui/TechBadge";
import { profile } from "@/lib/data";

const floatingBadges = [
  { label: "Laravel", className: "left-0 top-[10%]", delay: 0 },
  { label: "React", className: "right-[8%] top-[6%]", delay: 0.35 },
  { label: "Next.js", className: "left-[8%] top-[42%]", delay: 0.7 },
  { label: "APIs", className: "right-0 top-[39%]", delay: 1.05 },
  { label: "Dashboards", className: "left-[16%] bottom-[15%]", delay: 1.4 },
  { label: "Automation", className: "right-[12%] bottom-[17%]", delay: 1.75 },
  { label: "Vite", className: "left-[34%] top-0", delay: 2.1 },
  { label: "Linux", className: "right-[34%] bottom-0", delay: 2.45 },
  { label: "MySQL", className: "left-[2%] bottom-[36%]", delay: 2.8 },
  { label: "Git", className: "right-[24%] top-[28%]", delay: 3.15 },
  { label: "Cloud", className: "left-[38%] bottom-[8%]", delay: 3.5 },
  { label: "API", className: "right-[2%] bottom-[40%]", delay: 3.85 },
];

const heroTech = ["Laravel", "React", "Next.js", "MySQL", "REST APIs", "Vue", "Nginx", "Excel/VBA"];
const trustItems = ["Nador-based", "Morocco-ready", "Remote-friendly", "Production systems"];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0 },
};

function FloatingBadge({ label, className, delay }: { label: string; className: string; delay: number }) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className={`absolute hidden sm:block ${className}`}
      initial={false}
      animate={reduceMotion ? { opacity: 1 } : { y: [0, -16, 0], rotate: [-1, 2, -1], opacity: 1 }}
      transition={reduceMotion ? { duration: 0.2 } : { duration: 5.8, repeat: Infinity, ease: "easeInOut", delay }}
    >
      <div className="rounded-3xl border border-white/70 bg-white/76 px-4 py-2 text-sm font-black text-slate-900 shadow-[0_18px_45px_rgba(108,99,255,.16),inset_0_1px_0_rgba(255,255,255,.75)] backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.08] dark:text-white">
        {label}
      </div>
    </motion.div>
  );
}

export function Hero() {
  const reduceMotion = useReducedMotion();
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { stiffness: 90, damping: 22 });
  const smoothY = useSpring(mouseY, { stiffness: 90, damping: 22 });
  const imageX = useTransform(smoothX, [-1, 1], [-18, 18]);
  const imageY = useTransform(smoothY, [-1, 1], [-14, 14]);
  const cardRotateX = useTransform(smoothY, [-1, 1], [3, -3]);
  const cardRotateY = useTransform(smoothX, [-1, 1], [-4, 4]);

  return (
    <section
      id="hero"
      onMouseMove={(event) => {
        if (reduceMotion) return;
        const rect = event.currentTarget.getBoundingClientRect();
        mouseX.set(((event.clientX - rect.left) / rect.width - 0.5) * 2);
        mouseY.set(((event.clientY - rect.top) / rect.height - 0.5) * 2);
      }}
      onMouseLeave={() => {
        mouseX.set(0);
        mouseY.set(0);
      }}
      className="relative isolate min-h-[calc(100vh-72px)] overflow-hidden bg-[#FAFAFC] dark:bg-[#0F172A]"
    >
      <motion.div
        aria-hidden="true"
        className="absolute -left-28 top-20 -z-10 h-80 w-80 rounded-full bg-[#6C63FF]/22 blur-3xl"
        animate={reduceMotion ? undefined : { x: [0, 28, 0], y: [0, -18, 0], scale: [1, 1.08, 1] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden="true"
        className="absolute -right-24 top-24 -z-10 h-96 w-96 rounded-full bg-[#F43F8E]/18 blur-3xl"
        animate={reduceMotion ? undefined : { x: [0, -26, 0], y: [0, 22, 0], scale: [1, 1.1, 1] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
      />
      <motion.div
        aria-hidden="true"
        className="absolute bottom-0 left-1/3 -z-10 h-72 w-72 rounded-full bg-[#8B5CF6]/16 blur-3xl"
        animate={reduceMotion ? undefined : { x: [0, 22, 0], y: [0, -18, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
      />

      <div className="mx-auto grid min-h-[calc(100vh-72px)] max-w-7xl items-center gap-12 px-4 py-16 sm:py-20 lg:grid-cols-[0.92fr_1.08fr] xl:gap-16">
        <motion.div initial="hidden" animate="show" transition={{ staggerChildren: 0.08 }} className="relative z-10 min-w-0">
          <motion.div
            variants={fadeUp}
            transition={{ duration: 0.55 }}
            className="inline-flex max-w-full items-center gap-2 rounded-full border border-white/70 bg-white/76 px-4 py-2 text-sm font-bold text-[#6C63FF] shadow-[0_16px_45px_rgba(108,99,255,.12)] backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.08] dark:text-violet-100"
          >
            <span className="h-2 w-2 shrink-0 rounded-full bg-emerald-400 shadow-[0_0_18px_rgba(16,185,129,.8)]" />
            <span className="truncate sm:whitespace-normal">{profile.availability}</span>
          </motion.div>

          <motion.p variants={fadeUp} transition={{ duration: 0.6 }} className="mt-8 text-sm font-black uppercase tracking-[0.24em] text-[#8B5CF6] dark:text-violet-200">
            {profile.name}
          </motion.p>

          <motion.h1 variants={fadeUp} transition={{ duration: 0.6 }} className="mt-4 max-w-5xl text-5xl font-black leading-[0.94] tracking-tight text-[#111827] dark:text-white sm:text-6xl lg:text-7xl xl:text-[5.25rem]">
            <span className="block">Je conçois des sites, SaaS</span>
            <span className="block premium-gradient-text">et outils métier qui font avancer votre entreprise.</span>
          </motion.h1>

          <motion.div variants={fadeUp} transition={{ duration: 0.6 }} className="mt-5 h-10 overflow-hidden text-2xl font-black tracking-tight text-slate-800 dark:text-slate-100 sm:text-3xl">
            <motion.div
              animate={reduceMotion ? undefined : { y: ["0%", "-25%", "-50%", "-75%", "0%"] }}
              transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
            >
              {["Laravel Developer", "React & Next.js Builder", "Dashboard & API Builder", "Workflow Automation"].map((role) => (
                <div key={role} className="h-10">
                  {role}
                </div>
              ))}
            </motion.div>
          </motion.div>

          <motion.p variants={fadeUp} transition={{ duration: 0.6 }} className="mt-5 max-w-2xl text-base leading-8 text-slate-700 dark:text-slate-300 sm:text-lg">
            {profile.description}
          </motion.p>

          <motion.div variants={fadeUp} transition={{ duration: 0.6 }} className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <GradientButton href="#projects" className="w-full sm:w-auto">
              Voir mes réalisations <ArrowUpRight size={18} />
            </GradientButton>
            <GradientButton href="#contact" variant="secondary" className="w-full sm:w-auto">
              Démarrer mon projet <Sparkles size={17} />
            </GradientButton>
            <GradientButton href="/cv-download" variant="link" className="w-full sm:w-auto">
              <Download size={17} /> CV
            </GradientButton>
            <GradientButton href="/pricing" variant="link" className="w-full sm:w-auto">
              Voir les tarifs <ArrowUpRight size={17} />
            </GradientButton>
          </motion.div>

          <motion.div variants={fadeUp} transition={{ duration: 0.6 }} className="mt-5 flex flex-wrap gap-2 text-sm text-slate-600 dark:text-slate-400">
            {trustItems.map((item) => (
              <span key={item} className="inline-flex items-center gap-1.5 rounded-full border border-white/70 bg-white/70 px-3 py-1.5 shadow-sm backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.06]">
                <CheckCircle2 size={14} className="text-[#6C63FF] dark:text-violet-200" />
                {item}
              </span>
            ))}
          </motion.div>

          <motion.div variants={fadeUp} transition={{ duration: 0.6 }} className="mt-7 flex max-w-full flex-wrap gap-4 text-sm text-slate-600 dark:text-slate-400">
            <span className="inline-flex items-center gap-2">
              <MapPin size={16} className="text-[#F43F8E]" />
              {profile.location}
            </span>
          </motion.div>

          <motion.div variants={fadeUp} transition={{ duration: 0.6 }} className="mt-8 grid max-w-2xl grid-cols-2 gap-3 sm:grid-cols-4">
            {heroTech.slice(0, 8).map((item, index) => (
              <TechBadge key={item} delay={0.5 + index * 0.05}>
                {item}
              </TechBadge>
            ))}
          </motion.div>
        </motion.div>

        <motion.div style={reduceMotion ? undefined : { rotateX: cardRotateX, rotateY: cardRotateY }} className="relative z-10 mx-auto w-full max-w-[720px] [transform-style:preserve-3d]">
          <div className="absolute inset-8 rounded-[3rem] bg-gradient-to-br from-[#6C63FF]/24 via-[#8B5CF6]/18 to-[#F43F8E]/24 blur-3xl" />
          <motion.div
            style={reduceMotion ? undefined : { x: imageX, y: imageY }}
            animate={reduceMotion ? undefined : { y: [0, -10, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="relative overflow-hidden rounded-[2.5rem] border border-white/70 bg-white/55 p-3 shadow-[0_30px_100px_rgba(108,99,255,.22),inset_0_1px_0_rgba(255,255,255,.8)] backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.06]"
          >
            <div className="relative aspect-[1.12/1] overflow-hidden rounded-[2rem] bg-gradient-to-br from-[#6C63FF] via-[#5361ee] to-[#8B5CF6]">
              <Image
                src="/images/hero-character.png"
                alt="3D clay developer illustration working on a laptop"
                fill
                priority
                sizes="(min-width: 1024px) 48vw, 92vw"
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_18%,rgba(255,255,255,.2),transparent_30%)]" />
            </div>
          </motion.div>

          {floatingBadges.map((badge) => (
            <FloatingBadge key={badge.label} {...badge} />
          ))}

          <motion.div
            className="absolute -bottom-6 left-1/2 hidden w-[84%] -translate-x-1/2 rounded-[2rem] border border-white/70 bg-white/80 p-4 shadow-[0_24px_70px_rgba(17,24,39,.14)] backdrop-blur-2xl dark:border-white/10 dark:bg-[#0F172A]/78 sm:block"
            animate={reduceMotion ? undefined : { y: [0, -8, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.35 }}
          >
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.2em] text-[#8B5CF6] dark:text-violet-200">Now building</p>
                <p className="mt-1 text-sm font-bold text-slate-800 dark:text-white">Laravel APIs, Next.js interfaces, dashboards, and automation systems.</p>
              </div>
              <div className="rounded-full bg-gradient-to-r from-[#6C63FF] to-[#F43F8E] px-4 py-2 text-xs font-black text-white shadow-lg shadow-pink-500/20">
                Production-ready
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
