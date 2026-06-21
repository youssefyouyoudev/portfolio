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
      whileHover={reduceMotion ? undefined : { y: -5, borderColor: "rgba(34,211,238,.55)" }}
      className="group rounded-2xl border border-sky-200/80 bg-white/75 px-4 py-3 text-center text-sm font-semibold text-slate-800 shadow-lg shadow-sky-100/70 backdrop-blur-xl dark:border-cyan-400/18 dark:bg-white/[0.05] dark:text-slate-100 dark:shadow-slate-950/20"
    >
      <span className="bg-gradient-to-r from-slate-950 to-sky-700 bg-clip-text text-transparent dark:from-white dark:to-cyan-200">{children}</span>
    </motion.div>
  );
}
