import type { ComponentPropsWithoutRef, ReactNode } from "react";

type GlassCardProps = ComponentPropsWithoutRef<"div"> & {
  children: ReactNode;
};

export function GlassCard({ children, className = "", ...props }: GlassCardProps) {
  return (
    <div
      className={`border border-cyan-400/20 bg-slate-950/45 shadow-2xl shadow-cyan-500/10 backdrop-blur-xl ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
