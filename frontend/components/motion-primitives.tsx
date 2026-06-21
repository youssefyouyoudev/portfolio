"use client";

import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";
import type { Variants } from "framer-motion";
import type { ReactNode } from "react";

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 18, filter: "blur(6px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.62, ease: "easeOut" } },
};

export function Reveal({ children, className = "" }: { children: ReactNode; className?: string }) {
  const reduceMotion = useReducedMotion();
  return (
    <motion.div className={className} initial={false} whileInView="show" viewport={{ once: true, margin: "-60px" }} variants={reduceMotion ? undefined : fadeUp}>
      {children}
    </motion.div>
  );
}

export function MagneticButton({ href, children, variant = "primary" }: { href: string; children: ReactNode; variant?: "primary" | "ghost" }) {
  const reduceMotion = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 180, damping: 18 });
  const springY = useSpring(y, { stiffness: 180, damping: 18 });
  const rotate = useTransform(springX, [-24, 24], [-2, 2]);

  return (
    <motion.a
      href={href}
      style={reduceMotion ? undefined : { x: springX, y: springY, rotate }}
      onMouseMove={(event) => {
        if (reduceMotion) return;
        const rect = event.currentTarget.getBoundingClientRect();
        x.set((event.clientX - rect.left - rect.width / 2) * 0.18);
        y.set((event.clientY - rect.top - rect.height / 2) * 0.18);
      }}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
      className={
        variant === "primary"
          ? "inline-flex items-center justify-center rounded-full bg-cyan-300 px-5 py-3 text-sm font-bold text-slate-950 shadow-[0_0_40px_rgba(34,211,238,.28)] transition hover:bg-white"
          : "inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-5 py-3 text-sm font-bold text-white transition hover:border-cyan-300/70 hover:bg-cyan-300/10"
      }
    >
      {children}
    </motion.a>
  );
}
