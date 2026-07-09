"use client";

import { useEffect } from "react";
import { analyticsEvents, trackEvent } from "@/lib/analytics";

function eventForLink(link: HTMLAnchorElement) {
  const href = link.getAttribute("href") ?? "";
  const label = (link.textContent ?? "").trim().toLowerCase();

  if (/wa\.me|whatsapp/i.test(href) || label.includes("whatsapp")) return analyticsEvents.whatsappClick;
  if (href.startsWith("mailto:")) return analyticsEvents.emailClick;
  if (/\/cv-download|\.pdf(?:$|\?)/i.test(href) || label.includes("download cv")) return analyticsEvents.cvDownload;
  if (/\/projects(?:\/|$)|#projects/.test(href)) return analyticsEvents.projectClick;
  if (/\/hire-|\/work-with-me|#contact|\/contact(?:$|\?)/.test(href)) return analyticsEvents.hireCtaClick;
  if (/calendly|calendar|booking|book-a-call/i.test(href + label)) return analyticsEvents.bookingCallClick;
  return null;
}

export function AnalyticsEvents() {
  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;
      const link = target.closest("a");
      if (!(link instanceof HTMLAnchorElement)) return;

      const eventName = link.dataset.analyticsEvent ?? eventForLink(link);
      if (!eventName) return;

      trackEvent(eventName, {
        link_url: link.href,
        link_text: (link.textContent ?? "").trim().slice(0, 100),
      });
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  return null;
}
