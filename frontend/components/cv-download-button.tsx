"use client";

import { useState } from "react";
import { trackEvent } from "@/lib/analytics";

export function CvDownloadButton() {
  const [loading, setLoading] = useState(false);

  async function download() {
    setLoading(true);
    let url = "/cv/youssef-youyou-cv.pdf";
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL ?? "https://api.youssefyouyou.com"}/api/cv-download`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ source: "portfolio-cv-page" }),
      });
      if (response.ok) {
        const data = (await response.json()) as { download_url?: string };
        url = data.download_url ?? url;
      }
    } finally {
      setLoading(false);
      trackEvent("cv_download", { source: "portfolio-cv-page" });
      window.location.href = url;
    }
  }

  return (
    <button onClick={download} disabled={loading} className="mt-6 inline-flex rounded-full bg-cyan-300 px-5 py-3 font-bold text-slate-950 transition hover:bg-white disabled:opacity-60">
      {loading ? "Tracking download..." : "Download PDF"}
    </button>
  );
}
