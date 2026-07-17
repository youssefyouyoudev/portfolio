"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

type TechBadgeProps = {
  children: ReactNode;
  delay?: number;
};

export function TechBadge({ children, delay = 0 }: TechBadgeProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={false}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay }}
      whileHover={reduceMotion ? undefined : { y: -7, rotate: -1.5, scale: 1.04, borderColor: "rgba(139,92,246,.45)" }}
      className="group relative overflow-hidden rounded-3xl border border-white/70 bg-white/72 px-4 py-3 text-center text-sm font-black text-slate-800 shadow-[0_18px_42px_rgba(108,99,255,.12),inset_0_1px_0_rgba(255,255,255,.78)] backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.065] dark:text-slate-100 dark:shadow-slate-950/20"
    >
      <span className="absolute inset-x-4 top-0 h-px bg-gradient-to-r from-transparent via-[#F43F8E]/60 to-transparent" />
      <span className="relative bg-gradient-to-r from-slate-950 via-[#6C63FF] to-[#F43F8E] bg-clip-text text-transparent dark:from-white dark:via-violet-200 dark:to-pink-200">{children}</span>
    </motion.div>
  );
}
