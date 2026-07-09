"use client";

import { sendGAEvent } from "@next/third-parties/google";

export const analyticsEvents = {
  contactFormSubmit: "contact_form_submit",
  whatsappClick: "whatsapp_click",
  emailClick: "email_click",
  cvDownload: "cv_download",
  projectClick: "project_click",
  hireCtaClick: "hire_cta_click",
  bookingCallClick: "booking_call_click",
} as const;

export type AnalyticsEventName =
  | (typeof analyticsEvents)[keyof typeof analyticsEvents]
  | (string & {});

export function trackEvent(name: AnalyticsEventName, props?: Record<string, string | number | boolean>) {
  if (typeof window === "undefined" || !process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID) return;

  sendGAEvent("event", name, props ?? {});

  const w = window as typeof window & {
    plausible?: (event: string, options?: { props?: Record<string, string | number | boolean> }) => void;
  };

  w.plausible?.(name, props ? { props } : undefined);
}
