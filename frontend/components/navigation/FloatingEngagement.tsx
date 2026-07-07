"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import type { Transition } from "framer-motion";
import { ArrowRight, BriefcaseBusiness, FolderKanban, Mail } from "lucide-react";
import { trackEvent } from "@/lib/analytics";

function useFloatingVisibility() {
  const [visible, setVisible] = useState(false);
  const [contactVisible, setContactVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 500);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const contact = document.getElementById("contact");
    if (!contact) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setContactVisible(entry.isIntersecting && entry.intersectionRatio > 0.18);
      },
      { threshold: [0, 0.18, 0.35] },
    );

    observer.observe(contact);
    return () => observer.disconnect();
  }, []);

  return visible && !contactVisible;
}

export function FloatingEngagement() {
  const shouldReduceMotion = useReducedMotion();
  const show = useFloatingVisibility();
  const transition: Transition = shouldReduceMotion ? { duration: 0 } : { duration: 0.22, ease: [0.16, 1, 0.3, 1] };

  return (
    <>
      <AnimatePresence>
        {show ? (
          <motion.div
            initial={{ opacity: 0, y: 18, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 18, scale: 0.98 }}
            transition={transition}
            className="fixed bottom-6 right-6 z-40 hidden max-w-[calc(100vw-3rem)] rounded-full border border-cyan-300/25 bg-slate-950/88 p-1.5 shadow-[0_20px_70px_rgba(34,211,238,.22)] backdrop-blur-xl md:flex"
          >
            <Link
              href="/work-with-me"
              aria-label="Request a project estimate"
              onClick={() => trackEvent("service_page_cta_click", { source: "floating_request_estimate" })}
              className="inline-flex min-h-11 items-center gap-2 rounded-full bg-gradient-to-r from-sky-500 to-cyan-300 px-5 text-sm font-black text-white shadow-lg shadow-cyan-500/20 transition hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
            >
              <BriefcaseBusiness size={17} /> Request Estimate
            </Link>
            <Link
              href="/#projects"
              aria-label="View portfolio case studies"
              onClick={() => trackEvent("project_case_study_click", { source: "floating_view_work" })}
              className="inline-flex min-h-11 items-center gap-2 rounded-full px-4 text-sm font-bold text-cyan-100 transition hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
            >
              View Work <ArrowRight size={16} />
            </Link>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <AnimatePresence>
        {show ? (
          <motion.nav
            aria-label="Quick project actions"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 18 }}
            transition={transition}
            className="fixed inset-x-3 bottom-3 z-40 rounded-3xl border border-cyan-300/20 bg-slate-950/92 p-2 shadow-[0_20px_70px_rgba(2,8,23,.55)] backdrop-blur-xl md:hidden"
            style={{ paddingBottom: "calc(0.5rem + env(safe-area-inset-bottom))" }}
          >
            <div className="grid grid-cols-3 gap-2">
              {[
                ["Start Project", "/work-with-me", BriefcaseBusiness, "mobile_start_project"],
                ["View Work", "/#projects", FolderKanban, "mobile_view_work"],
                ["Contact", "/#contact", Mail, "mobile_contact"],
              ].map(([label, href, Icon, eventName]) => {
                const ActionIcon = Icon as typeof BriefcaseBusiness;
                return (
                  <Link
                    key={String(label)}
                    href={String(href)}
                    aria-label={String(label)}
                    onClick={() => trackEvent("service_page_cta_click", { source: String(eventName) })}
                    className="inline-flex min-h-11 flex-col items-center justify-center gap-1 rounded-2xl border border-white/10 bg-white/[0.06] px-2 text-center text-[11px] font-black text-cyan-50 transition hover:border-cyan-300/35 hover:bg-cyan-300/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
                  >
                    <ActionIcon size={16} aria-hidden="true" />
                    {String(label)}
                  </Link>
                );
              })}
            </div>
          </motion.nav>
        ) : null}
      </AnimatePresence>
    </>
  );
}
