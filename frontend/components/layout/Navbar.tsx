"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { GradientButton } from "@/components/ui/GradientButton";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

const navLinks = [
  { label: "Services", href: "#services" },
  { label: "Proof", href: "#projects" },
  { label: "Projects", href: "#projects" },
  { label: "Pricing", href: "/pricing" },
  { label: "Technical Notes", href: "#blog" },
  { label: "Contact", href: "#contact" },
];

export function Navbar() {
  const reduceMotion = useReducedMotion();
  const [open, setOpen] = useState(false);

  return (
    <motion.header
      initial={false}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: "easeOut" }}
      className="sticky top-0 z-50 border-b border-white/70 bg-white/68 shadow-[0_12px_40px_rgba(108,99,255,.08)] backdrop-blur-2xl dark:border-white/10 dark:bg-[#0F172A]/72 dark:shadow-black/10"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3">
        <Link href="/" className="flex items-center gap-3 rounded-2xl outline-none focus-visible:ring-2 focus-visible:ring-cyan-300">
          <span className="relative grid h-11 w-11 place-items-center overflow-hidden rounded-3xl border border-white/70 bg-white shadow-[0_14px_32px_rgba(108,99,255,.18)] dark:border-white/10 dark:bg-white/10">
            <Image src="/images/logo.png" alt="Youssef Youyou logo" fill sizes="44px" className="scale-[1.85] object-cover object-[50%_42%]" priority />
          </span>
          <span className="hidden leading-tight sm:block">
            <span className="block text-sm font-black text-slate-950 dark:text-white">Youssef <span className="text-[#6C63FF] dark:text-violet-200">Youyou</span></span>
            <span className="block text-[11px] text-slate-500 dark:text-slate-400">youssefyouyou.com</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 rounded-full border border-white/70 bg-white/62 px-2 py-1 shadow-sm shadow-violet-100/70 dark:border-white/10 dark:bg-white/[0.05] dark:shadow-none lg:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="group relative rounded-full px-3 py-2 text-sm font-semibold text-slate-600 outline-none transition hover:bg-white/72 hover:text-[#6C63FF] focus-visible:ring-2 focus-visible:ring-[#6C63FF] dark:text-slate-300 dark:hover:bg-white/10 dark:hover:text-white dark:focus-visible:ring-[#F43F8E]"
            >
              {link.label}
              <span className="absolute inset-x-3 -bottom-0.5 h-px scale-x-0 bg-[#F43F8E] shadow-[0_0_14px_rgba(244,63,142,.45)] transition group-hover:scale-x-100 dark:bg-pink-300" />
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <GradientButton href="#contact" className="hidden min-h-10 rounded-full px-4 py-2.5 lg:inline-flex">
            Start a project
          </GradientButton>
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-label={open ? "Close navigation menu" : "Open navigation menu"}
            className="grid h-10 w-10 place-items-center rounded-full border border-white/70 bg-white/75 text-slate-700 outline-none transition hover:border-[#8B5CF6]/45 focus-visible:ring-2 focus-visible:ring-[#6C63FF] dark:border-white/10 dark:bg-white/[0.07] dark:text-slate-100 dark:hover:border-[#F43F8E]/40 dark:focus-visible:ring-[#F43F8E] lg:hidden"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -8 }}
            transition={{ duration: 0.22 }}
            className="border-t border-white/70 bg-white/95 px-4 py-4 backdrop-blur-2xl dark:border-white/10 dark:bg-[#0F172A]/95 lg:hidden"
          >
            <nav className="mx-auto grid max-w-7xl gap-2">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="rounded-3xl border border-white/70 bg-white/70 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:border-[#8B5CF6]/45 hover:text-[#6C63FF] dark:border-white/10 dark:bg-white/[0.06] dark:text-slate-200 dark:hover:border-[#F43F8E]/35 dark:hover:text-pink-100"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#contact"
                onClick={() => setOpen(false)}
                className="mt-2 rounded-3xl bg-gradient-to-r from-[#6C63FF] via-[#8B5CF6] to-[#F43F8E] px-4 py-3 text-center text-sm font-black text-white shadow-lg shadow-violet-500/20"
              >
                Start a project
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
