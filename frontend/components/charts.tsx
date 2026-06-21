"use client";

import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { skillDistribution } from "@/lib/data";

export function SkillChart() {
  return (
    <div className="h-80 min-h-80 min-w-0 rounded-2xl border border-white/10 bg-white/[0.04] p-4">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={skillDistribution}>
          <CartesianGrid stroke="rgba(255,255,255,.08)" vertical={false} />
          <XAxis dataKey="name" tick={{ fill: "#bae6fd", fontSize: 11 }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fill: "#94a3b8", fontSize: 11 }} axisLine={false} tickLine={false} domain={[0, 100]} />
          <Tooltip cursor={{ fill: "rgba(34,211,238,.08)" }} contentStyle={{ background: "#020617", border: "1px solid rgba(255,255,255,.12)", borderRadius: 12 }} />
          <Bar dataKey="value" fill="#22d3ee" radius={[10, 10, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
