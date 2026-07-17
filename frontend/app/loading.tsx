import Image from "next/image";

export default function Loading() {
  return (
    <main className="grid min-h-screen place-items-center bg-[#FAFAFC] px-4 text-[#111827] dark:bg-[#0F172A] dark:text-white">
      <div className="relative text-center">
        <div className="absolute inset-0 -z-10 rounded-full bg-[#6C63FF]/25 blur-3xl" />
        <div className="mx-auto grid h-24 w-24 place-items-center overflow-hidden rounded-[2rem] border border-white/70 bg-white/78 shadow-[0_24px_70px_rgba(108,99,255,.22),inset_0_1px_0_rgba(255,255,255,.8)] backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.08]">
          <Image src="/images/logo.png" alt="" width={72} height={72} className="scale-[1.55]" priority />
        </div>
        <p className="mt-6 text-sm font-black uppercase tracking-[0.28em] text-[#8B5CF6] dark:text-violet-200">Loading portfolio</p>
        <div className="mx-auto mt-4 h-2 w-64 overflow-hidden rounded-full bg-slate-200/80 dark:bg-white/10">
          <div className="h-full w-2/3 animate-pulse rounded-full bg-gradient-to-r from-[#6C63FF] via-[#8B5CF6] to-[#F43F8E]" />
        </div>
      </div>
    </main>
  );
}
