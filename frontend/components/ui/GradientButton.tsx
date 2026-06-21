"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

type GradientButtonProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "link";
  className?: string;
};

export function GradientButton({ href, children, variant = "primary", className = "" }: GradientButtonProps) {
  const reduceMotion = useReducedMotion();
  const base =
    "inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-bold outline-none transition focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-50 dark:focus-visible:ring-cyan-300 dark:focus-visible:ring-offset-[#020617]";
  const styles = {
    primary:
      "bg-gradient-to-r from-blue-600 via-sky-500 to-cyan-400 text-white shadow-[0_16px_45px_rgba(14,165,233,.28)] ring-1 ring-cyan-200/30 hover:shadow-cyan-400/40",
    secondary:
      "border border-sky-200/80 bg-white/75 text-slate-800 shadow-lg shadow-sky-100/70 backdrop-blur-xl hover:border-sky-400/60 hover:bg-sky-50 dark:border-cyan-400/22 dark:bg-white/[0.065] dark:text-slate-100 dark:shadow-slate-950/20 dark:hover:border-cyan-300/55 dark:hover:bg-cyan-300/10",
    link: "px-1 text-sky-700 hover:text-slate-950 dark:text-cyan-200 dark:hover:text-white",
  };

  return (
    <motion.a
      href={href}
      whileHover={reduceMotion ? undefined : { y: -2, scale: 1.015 }}
      whileTap={reduceMotion ? undefined : { scale: 0.98 }}
      className={`${base} ${styles[variant]} ${className}`}
    >
      {children}
    </motion.a>
  );
}
