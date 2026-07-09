import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BadgeCheck, Rocket } from "lucide-react";
import { JsonLd } from "@/components/seo/JsonLd";
import type { PortfolioProject } from "@/lib/project-content";

export function ProjectDetailPage({
  children,
  structuredData,
}: {
  children: React.ReactNode;
  structuredData: unknown;
}) {
  return (
    <main className="min-h-screen overflow-hidden bg-slate-50 px-4 py-10 text-slate-950 dark:bg-[#020617] dark:text-white">
      <JsonLd data={structuredData} />
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_18%_2%,rgba(14,165,233,.14),transparent_30%),radial-gradient(circle_at_86%_8%,rgba(8,145,178,.12),transparent_34%),linear-gradient(180deg,#f8fafc,#eef6ff_42%,#f8fafc)] dark:bg-[radial-gradient(circle_at_18%_2%,rgba(34,211,238,.12),transparent_30%),radial-gradient(circle_at_86%_8%,rgba(14,165,233,.14),transparent_34%),linear-gradient(180deg,#020617,#061826_42%,#020617)]" />
      <div className="relative mx-auto max-w-7xl">{children}</div>
    </main>
  );
}

export function ProjectGallery({ project }: { project: PortfolioProject }) {
  const images = (project.gallery.length ? project.gallery : [project.image]).filter(Boolean);
  const placeholderCount = Math.max(0, 4 - images.length);

  return (
    <section className="mt-8 rounded-3xl border border-sky-200/75 bg-white/88 p-6 shadow-xl shadow-sky-100/70 dark:border-white/10 dark:bg-white/[0.045] dark:shadow-none md:p-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.22em] text-sky-700 dark:text-cyan-300">Screenshots & product views</p>
          <h2 className="mt-3 text-2xl font-black">Real screenshots will be added here after final visual review.</h2>
        </div>
        <span className="rounded-full border border-sky-200/80 bg-sky-50 px-3 py-1 text-xs font-black uppercase tracking-[0.14em] text-sky-700 dark:border-cyan-300/15 dark:bg-cyan-300/10 dark:text-cyan-100">
          {images.length + placeholderCount || 1} visual
        </span>
      </div>
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {images.map((image, index) => (
          <div key={`${image}-${index}`} className="relative aspect-[16/10] overflow-hidden rounded-3xl border border-sky-200/80 bg-sky-50 dark:border-cyan-400/15 dark:bg-slate-950">
            <Image
              src={image}
              alt={`${project.title} screenshot ${index + 1}`}
              fill
              sizes="(min-width: 1024px) 45vw, 92vw"
              className="object-cover"
            />
          </div>
        ))}
        {Array.from({ length: placeholderCount }).map((_, index) => (
          <div key={`placeholder-${index}`} className="grid aspect-[16/10] place-items-center rounded-3xl border border-dashed border-sky-300/80 bg-sky-50 p-6 text-center dark:border-cyan-400/25 dark:bg-slate-950">
            <Rocket className="text-sky-600 dark:text-cyan-300" />
            <p className="mt-4 text-lg font-black text-slate-950 dark:text-white">Screenshot coming soon</p>
            <p className="mt-2 max-w-sm text-sm leading-7 text-slate-700 dark:text-slate-300">
              Placeholder reserved for a real {project.title} interface screenshot.
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

export function ProjectCTA() {
  return (
    <section className="mt-8 rounded-[2rem] border border-sky-300/50 bg-gradient-to-br from-sky-50 to-white p-6 text-center shadow-2xl shadow-sky-100/80 dark:border-cyan-300/20 dark:from-cyan-300/10 dark:to-slate-900/60 dark:shadow-cyan-500/10 md:p-10">
      <h2 className="text-balance text-3xl font-black md:text-4xl">Need a similar website, dashboard, API or internal tool?</h2>
      <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-slate-700 dark:text-slate-300">
        Share your business problem, workflow and ideal timeline. I will help shape it into a practical, clean and production-minded solution.
      </p>
      <Link href="/contact" className="mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-cyan-300 px-6 py-3 text-sm font-bold text-slate-950 transition hover:bg-white">
        Contact me <ArrowRight size={16} />
      </Link>
    </section>
  );
}

export function ProjectList({ items }: { items: string[] }) {
  return (
    <ul className="mt-5 grid gap-3 text-sm text-slate-700 dark:text-slate-300">
      {items.map((item) => (
        <li key={item} className="flex gap-2">
          <BadgeCheck className="mt-0.5 shrink-0 text-sky-600 dark:text-cyan-300" size={16} />
          {item}
        </li>
      ))}
    </ul>
  );
}
