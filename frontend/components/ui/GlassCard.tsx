import type { ComponentPropsWithoutRef, ReactNode } from "react";

type GlassCardProps = ComponentPropsWithoutRef<"div"> & {
  children: ReactNode;
};

export function GlassCard({ children, className = "", ...props }: GlassCardProps) {
  return (
    <div
      className={`clay-surface ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
