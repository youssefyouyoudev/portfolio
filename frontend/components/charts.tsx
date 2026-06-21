"use client";

import { useEffect, useRef, useState } from "react";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { useTheme } from "next-themes";
import { skillDistribution } from "@/lib/data";

export function SkillChart() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [ready, setReady] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const frame = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;

    const observer = new ResizeObserver(([entry]) => {
      setReady(entry.contentRect.width > 24 && entry.contentRect.height > 24);
    });

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const isDark = mounted ? resolvedTheme !== "light" : true;
  const axisColor = isDark ? "#bae6fd" : "#334155";
  const mutedAxisColor = isDark ? "#94a3b8" : "#64748b";
  const gridColor = isDark ? "rgba(255,255,255,.08)" : "rgba(2,132,199,.14)";
  const tooltipBackground = isDark ? "#020617" : "#ffffff";
  const tooltipText = isDark ? "#f8fafc" : "#0f172a";

  return (
    <div ref={containerRef} className="h-80 min-h-80 min-w-0 rounded-2xl border border-sky-200/75 bg-white/80 p-4 dark:border-white/10 dark:bg-white/[0.04]">
      {ready ? (
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={skillDistribution}>
            <CartesianGrid stroke={gridColor} vertical={false} />
            <XAxis dataKey="name" tick={{ fill: axisColor, fontSize: 11, fontWeight: 600 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: mutedAxisColor, fontSize: 11 }} axisLine={false} tickLine={false} domain={[0, 100]} />
            <Tooltip
              cursor={{ fill: isDark ? "rgba(34,211,238,.08)" : "rgba(14,165,233,.1)" }}
              contentStyle={{
                background: tooltipBackground,
                border: `1px solid ${isDark ? "rgba(255,255,255,.12)" : "rgba(2,132,199,.18)"}`,
                borderRadius: 12,
                color: tooltipText,
                boxShadow: isDark ? "0 18px 40px rgba(2,6,23,.45)" : "0 18px 40px rgba(14,165,233,.14)",
              }}
              labelStyle={{ color: tooltipText, fontWeight: 700 }}
            />
            <Bar dataKey="value" fill="#22d3ee" radius={[10, 10, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      ) : (
        <div className="h-full rounded-xl bg-gradient-to-br from-sky-100 to-white dark:from-white/[0.06] dark:to-transparent" />
      )}
    </div>
  );
}
