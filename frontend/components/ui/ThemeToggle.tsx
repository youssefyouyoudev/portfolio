"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const frame = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  const isDark = resolvedTheme !== "light";

  return (
    <button
      type="button"
      aria-label={mounted ? `Switch to ${isDark ? "light" : "dark"} mode` : "Toggle theme"}
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="relative grid h-10 w-10 place-items-center overflow-hidden rounded-full border border-sky-300/30 bg-white/75 text-slate-700 shadow-lg shadow-sky-200/50 outline-none backdrop-blur-xl transition hover:border-sky-400/60 focus-visible:ring-2 focus-visible:ring-sky-400 dark:border-cyan-400/15 dark:bg-white/[0.06] dark:text-slate-100 dark:shadow-cyan-950/20 dark:hover:border-cyan-300/40 dark:focus-visible:ring-cyan-300"
    >
      <span className="absolute inset-0 bg-gradient-to-br from-sky-100/80 to-cyan-100/50 opacity-100 dark:from-cyan-300/10 dark:to-blue-500/10" />
      {mounted ? (
        <motion.span
          key={isDark ? "moon" : "sun"}
          initial={{ rotate: -40, opacity: 0, scale: 0.75 }}
          animate={{ rotate: 0, opacity: 1, scale: 1 }}
          transition={{ duration: 0.22 }}
          className="relative"
        >
          {isDark ? <Moon size={18} /> : <Sun size={18} />}
        </motion.span>
      ) : (
        <span className="relative h-4 w-4 rounded-full bg-slate-300 dark:bg-slate-600" />
      )}
    </button>
  );
}
