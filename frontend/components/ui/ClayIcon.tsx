import type { LucideIcon } from "lucide-react";

type ClayIconProps = {
  icon: LucideIcon;
  label?: string;
  className?: string;
  size?: "sm" | "md" | "lg";
  tone?: "primary" | "accent" | "violet" | "mint" | "amber";
};

const sizes = {
  sm: "h-11 w-11 rounded-2xl",
  md: "h-14 w-14 rounded-3xl",
  lg: "h-20 w-20 rounded-[1.75rem]",
};

const tones = {
  primary: "from-[#6C63FF] via-[#8B5CF6] to-[#F43F8E]",
  accent: "from-[#F43F8E] via-[#fb7185] to-[#fb923c]",
  violet: "from-[#8B5CF6] via-[#6C63FF] to-[#60a5fa]",
  mint: "from-[#22c55e] via-[#14b8a6] to-[#38bdf8]",
  amber: "from-[#f59e0b] via-[#fb7185] to-[#8B5CF6]",
};

export function ClayIcon({ icon: Icon, label, className = "", size = "md", tone = "primary" }: ClayIconProps) {
  return (
    <span
      aria-label={label}
      className={`relative inline-grid shrink-0 place-items-center ${sizes[size]} bg-gradient-to-br ${tones[tone]} text-white shadow-[inset_0_1px_0_rgba(255,255,255,.55),inset_0_-18px_28px_rgba(17,24,39,.18),0_22px_46px_rgba(108,99,255,.24)] ring-1 ring-white/45 transition duration-300 group-hover:-translate-y-1 group-hover:rotate-3 group-hover:scale-105 ${className}`}
    >
      <span className="absolute inset-x-2 top-1.5 h-1/3 rounded-full bg-white/30 blur-[1px]" />
      <Icon className="relative z-10 drop-shadow-[0_6px_8px_rgba(17,24,39,.22)]" size={size === "lg" ? 34 : size === "sm" ? 19 : 24} aria-hidden="true" />
    </span>
  );
}
