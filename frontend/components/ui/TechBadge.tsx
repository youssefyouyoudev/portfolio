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
      initial={reduceMotion ? false : { opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay }}
      whileHover={reduceMotion ? undefined : { y: -5, borderColor: "rgba(34,211,238,.55)" }}
      className="group rounded-2xl border border-cyan-400/18 bg-white/[0.05] px-4 py-3 text-center text-sm font-semibold text-slate-100 shadow-lg shadow-slate-950/20 backdrop-blur-xl"
    >
      <span className="bg-gradient-to-r from-white to-cyan-200 bg-clip-text text-transparent">{children}</span>
    </motion.div>
  );
}
