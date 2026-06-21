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
    "inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-bold outline-none transition focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#020617]";
  const styles = {
    primary:
      "bg-gradient-to-r from-blue-600 via-sky-500 to-cyan-400 text-white shadow-[0_16px_45px_rgba(14,165,233,.28)] ring-1 ring-cyan-200/30 hover:shadow-cyan-400/40",
    secondary:
      "border border-cyan-400/22 bg-white/[0.065] text-slate-100 shadow-lg shadow-slate-950/20 backdrop-blur-xl hover:border-cyan-300/55 hover:bg-cyan-300/10",
    link: "px-1 text-cyan-200 hover:text-white",
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
