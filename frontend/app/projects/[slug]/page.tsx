import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, BadgeCheck, BriefcaseBusiness, Layers, Target } from "lucide-react";
import { projects } from "@/lib/data";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const project = projects.find((item) => item.slug === params.slug);
  return {
    title: project ? `${project.title} Case Study` : "Project Case Study",
    description: project?.businessValue,
  };
}

export default function ProjectCaseStudy({ params }: { params: { slug: string } }) {
  const project = projects.find((item) => item.slug === params.slug);
  if (!project) notFound();

  const sections = [
    ["Business problem", project.businessProblem],
    ["My role", "Full-stack development, UI planning, backend/API structure, deployment preparation and practical workflow design."],
    ["Architecture overview", project.architecture],
    ["Backend/API logic", "Structured business modules, validation-first inputs, clear response contracts and production-aware routing/deployment decisions."],
    ["Database structure", "Relational data modeled around real workflow entities, with flexible fields only where content or reporting benefits from it."],
    ["Business impact", project.impact],
    ["What this proves", project.recruiterSignal],
    ["What I learned", "Production projects need clear business scope, clean structure, simple maintenance, responsive UX and reliable deployment details as much as visual polish."],
  ];

  return (
    <main className="min-h-screen bg-[#020817] px-4 py-10 text-white">
      <div className="mx-auto max-w-5xl">
        <Link href="/#projects" className="inline-flex items-center gap-2 text-cyan-200"><ArrowLeft size={16} /> Back to projects</Link>
        <section className="mt-10 rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 md:p-10">
          <p className="text-sm uppercase tracking-[0.24em] text-cyan-300">{project.category}</p>
          <h1 className="mt-4 text-4xl font-black md:text-6xl">{project.title}</h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-300">{project.businessProblem}</p>
          <div className="mt-6 flex flex-wrap gap-2">{project.stack.map((item) => <span key={item} className="rounded-full bg-cyan-300/10 px-3 py-1 text-sm text-cyan-100">{item}</span>)}</div>
        </section>
        <section className="mt-6 grid gap-4 md:grid-cols-3">
          {[
            [Target, "Goal", project.businessValue],
            [BriefcaseBusiness, "Deliverables", project.deliverables.slice(0, 3).join(", ")],
            [Layers, "Proof signal", project.recruiterSignal],
          ].map(([Icon, title, text]) => {
            const CardIcon = Icon as typeof Target;
            return (
              <div key={String(title)} className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
                <CardIcon className="text-cyan-300" />
                <h2 className="mt-4 font-bold text-cyan-100">{String(title)}</h2>
                <p className="mt-2 text-sm leading-6 text-slate-300">{String(text)}</p>
              </div>
            );
          })}
        </section>
        <section className="mt-6 grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
            <h2 className="text-xl font-bold text-cyan-200">Features</h2>
            <ul className="mt-4 grid gap-2 text-sm text-slate-300">{project.features.map((item) => <li key={item} className="flex gap-2"><BadgeCheck className="shrink-0 text-cyan-300" size={16} />{item}</li>)}</ul>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
            <h2 className="text-xl font-bold text-cyan-200">Problems solved</h2>
            <ul className="mt-4 grid gap-2 text-sm text-slate-300">{project.problems.map((item) => <li key={item} className="flex gap-2"><BadgeCheck className="shrink-0 text-cyan-300" size={16} />{item}</li>)}</ul>
          </div>
        </section>
        <section className="mt-6 rounded-2xl border border-white/10 bg-white/[0.04] p-5">
          <h2 className="text-xl font-bold text-cyan-200">Deliverables</h2>
          <ul className="mt-4 grid gap-2 text-sm text-slate-300 md:grid-cols-2">{project.deliverables.map((item) => <li key={item} className="flex gap-2"><BadgeCheck className="shrink-0 text-cyan-300" size={16} />{item}</li>)}</ul>
        </section>
        <section className="mt-6 grid gap-5">
          {sections.map(([title, text]) => <article key={title} className="rounded-2xl border border-white/10 bg-white/[0.04] p-5"><h2 className="text-xl font-bold text-cyan-200">{title}</h2><p className="mt-3 leading-7 text-slate-300">{text}</p></article>)}
        </section>
        <section className="mt-6 rounded-2xl border border-cyan-300/20 bg-cyan-300/10 p-6 text-center">
          <h2 className="text-2xl font-bold">Need a similar project?</h2>
          <Link href="/#contact" className="mt-4 inline-flex rounded-full bg-cyan-300 px-5 py-3 font-bold text-slate-950">Request this type of build</Link>
        </section>
      </div>
    </main>
  );
}
