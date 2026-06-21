import type { ComponentPropsWithoutRef, ReactNode } from "react";

type GlassCardProps = ComponentPropsWithoutRef<"div"> & {
  children: ReactNode;
};

export function GlassCard({ children, className = "", ...props }: GlassCardProps) {
  return (
    <div
      className={`border border-sky-200/70 bg-white/85 shadow-2xl shadow-sky-100/80 backdrop-blur-xl dark:border-cyan-400/20 dark:bg-slate-950/45 dark:shadow-cyan-500/10 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
