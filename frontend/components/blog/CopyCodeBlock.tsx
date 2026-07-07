"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";

export function CopyCodeBlock({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);

  async function copyCode() {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  }

  return (
    <div className="relative mt-5 overflow-hidden rounded-2xl border border-sky-200/75 bg-slate-950 dark:border-cyan-300/15">
      <button
        type="button"
        onClick={copyCode}
        className="absolute right-3 top-3 inline-flex min-h-9 items-center gap-2 rounded-full border border-white/10 bg-white/10 px-3 text-xs font-black text-cyan-100 transition hover:bg-cyan-300/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
        aria-label="Copy code block"
      >
        {copied ? <Check size={14} /> : <Copy size={14} />}
        {copied ? "Copied" : "Copy"}
      </button>
      <pre className="overflow-x-auto p-5 pr-24 text-sm leading-7 text-cyan-100">
        <code>{code}</code>
      </pre>
    </div>
  );
}
