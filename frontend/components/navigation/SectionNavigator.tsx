"use client";

import { useEffect, useState } from "react";

const sections = [
  ["hero", "Hero"],
  ["proof", "Proof"],
  ["services", "Services"],
  ["build-for-you", "Build"],
  ["about", "About"],
  ["skills", "Skills"],
  ["projects", "Projects"],
  ["pricing", "Pricing"],
  ["blog", "Notes"],
  ["contact", "Contact"],
] as const;

export function SectionNavigator() {
  const [active, setActive] = useState<(typeof sections)[number][0]>("hero");

  useEffect(() => {
    const observed = sections
      .map(([id]) => document.getElementById(id))
      .filter((section): section is HTMLElement => Boolean(section));

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) setActive(visible.target.id as (typeof sections)[number][0]);
      },
      { rootMargin: "-24% 0px -58% 0px", threshold: [0.12, 0.25, 0.45] },
    );

    observed.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <nav aria-label="Homepage section navigation" className="fixed right-5 top-1/2 z-30 hidden -translate-y-1/2 xl:block">
      <div className="rounded-full border border-cyan-300/15 bg-slate-950/70 p-2 shadow-2xl shadow-slate-950/30 backdrop-blur-xl">
        <div className="grid gap-2">
          {sections.map(([id, label]) => (
            <button
              key={id}
              type="button"
              aria-label={`Go to ${label} section`}
              aria-current={active === id ? "true" : undefined}
              title={label}
              onClick={() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" })}
              className={`group relative h-3 w-3 rounded-full border transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 ${
                active === id
                  ? "border-cyan-200 bg-cyan-300 shadow-[0_0_18px_rgba(34,211,238,.8)]"
                  : "border-white/20 bg-white/20 hover:border-cyan-300/70 hover:bg-cyan-300/55"
              }`}
            >
              <span className="pointer-events-none absolute right-5 top-1/2 -translate-y-1/2 rounded-full border border-cyan-300/15 bg-slate-950/90 px-2.5 py-1 text-xs font-bold text-cyan-50 opacity-0 shadow-xl transition group-hover:opacity-100">
                {label}
              </span>
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}
