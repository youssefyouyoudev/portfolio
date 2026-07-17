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
    "relative inline-flex min-h-12 items-center justify-center gap-2 overflow-hidden rounded-full px-6 py-3 text-sm font-black outline-none transition focus-visible:ring-2 focus-visible:ring-[#6C63FF] focus-visible:ring-offset-2 focus-visible:ring-offset-[#FAFAFC] dark:focus-visible:ring-[#F43F8E] dark:focus-visible:ring-offset-[#0F172A]";
  const styles = {
    primary:
      "bg-[linear-gradient(135deg,#6C63FF,#8B5CF6,#F43F8E)] text-white shadow-[0_18px_52px_rgba(108,99,255,.34),inset_0_1px_0_rgba(255,255,255,.45)] ring-1 ring-white/35 hover:shadow-[0_24px_70px_rgba(244,63,142,.28)]",
    secondary:
      "border border-white/70 bg-white/72 text-slate-900 shadow-[0_16px_45px_rgba(108,99,255,.13)] backdrop-blur-xl hover:border-[#8B5CF6]/45 hover:bg-white dark:border-white/10 dark:bg-white/[0.07] dark:text-slate-100 dark:shadow-slate-950/20 dark:hover:border-[#F43F8E]/45 dark:hover:bg-white/[0.1]",
    link: "px-1 text-[#6C63FF] hover:text-[#F43F8E] dark:text-violet-200 dark:hover:text-pink-200",
  };

  return (
    <motion.a
      href={href}
      whileHover={reduceMotion ? undefined : { y: -2, scale: 1.015 }}
      whileTap={reduceMotion ? undefined : { scale: 0.98 }}
      className={`${base} ${styles[variant]} ${className}`}
    >
      {variant === "primary" ? <span className="absolute inset-x-0 top-0 h-px bg-white/70" /> : null}
      {children}
    </motion.a>
  );
}
