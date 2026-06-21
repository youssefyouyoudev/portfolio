"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { GradientButton } from "@/components/ui/GradientButton";

const navLinks = [
  { label: "Services", href: "#services" },
  { label: "Work", href: "#stats" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Blog", href: "#blog" },
  { label: "Contact", href: "#contact" },
];

export function Navbar() {
  const reduceMotion = useReducedMotion();
  const [open, setOpen] = useState(false);

  return (
    <motion.header
      initial={reduceMotion ? false : { opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: "easeOut" }}
      className="sticky top-0 z-50 border-b border-cyan-400/10 bg-[#020617]/76 backdrop-blur-2xl"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3">
        <Link href="/" className="flex items-center gap-3 rounded-2xl outline-none focus-visible:ring-2 focus-visible:ring-cyan-300">
          <span className="relative grid h-11 w-11 place-items-center overflow-hidden rounded-2xl border border-cyan-400/25 bg-white shadow-lg shadow-cyan-500/15">
            <Image src="/images/logo.png" alt="Youssef Youyou logo" fill sizes="44px" className="scale-[1.85] object-cover object-[50%_42%]" priority />
          </span>
          <span className="hidden leading-tight sm:block">
            <span className="block text-sm font-black text-white">Youssef <span className="text-cyan-300">Youyou</span></span>
            <span className="block text-[11px] text-slate-400">youssefyouyou.com</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 rounded-full border border-white/10 bg-white/[0.035] px-2 py-1 lg:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="group relative rounded-full px-3 py-2 text-sm font-medium text-slate-300 outline-none transition hover:text-white focus-visible:ring-2 focus-visible:ring-cyan-300"
            >
              {link.label}
              <span className="absolute inset-x-3 -bottom-0.5 h-px scale-x-0 bg-cyan-300 shadow-[0_0_14px_rgba(34,211,238,.8)] transition group-hover:scale-x-100" />
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a href="/admin" className="hidden rounded-full px-3 py-2 text-sm text-slate-400 transition hover:text-cyan-200 md:inline-flex">
            Admin
          </a>
          <GradientButton href="#contact" className="hidden min-h-10 rounded-full px-4 py-2.5 sm:inline-flex">
            Hire Me
          </GradientButton>
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-label={open ? "Close navigation menu" : "Open navigation menu"}
            className="grid h-10 w-10 place-items-center rounded-full border border-cyan-400/15 bg-white/[0.05] text-slate-100 outline-none transition hover:border-cyan-300/40 focus-visible:ring-2 focus-visible:ring-cyan-300 lg:hidden"
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
            className="border-t border-cyan-400/10 bg-[#020617]/95 px-4 py-4 backdrop-blur-2xl lg:hidden"
          >
            <nav className="mx-auto grid max-w-7xl gap-2">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="rounded-2xl border border-white/10 bg-white/[0.035] px-4 py-3 text-sm font-semibold text-slate-200 transition hover:border-cyan-300/30 hover:text-cyan-100"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#contact"
                onClick={() => setOpen(false)}
                className="mt-2 rounded-2xl bg-gradient-to-r from-blue-600 via-sky-500 to-cyan-400 px-4 py-3 text-center text-sm font-black text-white"
              >
                Hire Me
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
