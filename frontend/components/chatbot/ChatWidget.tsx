"use client";

import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Bot, BriefcaseBusiness, ChevronDown, Loader2, MessageCircle, Send, Sparkles, X } from "lucide-react";

const apiBase = process.env.NEXT_PUBLIC_API_URL ?? "https://api.youssefyouyou.com";
const defaultWelcome = "Hi, I'm Youssef's AI assistant. I can help you explore his services, projects, skills, and contact options.";
const defaultQuickActions = ["View Services", "See Projects", "Request a Quote", "Contact Youssef", "Website Pricing", "AI Automation"];
const sessionIdKey = "youssef_chat_session_id";
const messagesKey = "youssef_chat_messages";

type ChatMessage = {
  id: string;
  role: "assistant" | "user" | "system";
  content: string;
};

type SettingsResponse = {
  enabled: boolean;
  welcome_message?: string;
  quick_actions?: string[];
};

type MessageResponse = {
  session_id: string;
  message: string;
  lead_prompt?: boolean;
};

function messageId() {
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function quickPrompt(action: string) {
  return {
    "View Services": "What services does Youssef offer? Please keep it short and include the best next link.",
    "See Projects": "Show me Youssef's strongest portfolio projects and what they prove.",
    "Contact Youssef": "How can I contact Youssef for a project?",
    "Website Pricing": "What is the estimated pricing approach for a business website?",
    "AI Automation": "Can Youssef build AI automation or business automation tools?",
  }[action] ?? action;
}

export function ChatWidget() {
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();
  const listRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(true);
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [sessionId, setSessionId] = useState(() => (typeof window !== "undefined" ? localStorage.getItem(sessionIdKey) ?? "" : ""));
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    if (typeof window === "undefined") return [{ id: "welcome", role: "assistant", content: defaultWelcome }];
    try {
      const stored = sessionStorage.getItem(messagesKey);
      return stored ? (JSON.parse(stored) as ChatMessage[]) : [{ id: "welcome", role: "assistant", content: defaultWelcome }];
    } catch {
      sessionStorage.removeItem(messagesKey);
      return [{ id: "welcome", role: "assistant", content: defaultWelcome }];
    }
  });
  const [quickActions, setQuickActions] = useState(defaultQuickActions);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [leadOpen, setLeadOpen] = useState(false);
  const [leadStatus, setLeadStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const hidden = pathname?.startsWith("/admin");
  const transition = reduceMotion ? { duration: 0 } : { duration: 0.22, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] };

  useEffect(() => {
    fetch(`${apiBase}/api/chatbot/settings`, { headers: { Accept: "application/json" } })
      .then((response) => (response.ok ? response.json() : Promise.reject()))
      .then((settings: SettingsResponse) => {
        setEnabled(settings.enabled !== false);
        if (settings.welcome_message) setMessages((current) => current.length === 1 && current[0].id === "welcome" ? [{ ...current[0], content: settings.welcome_message! }] : current);
        if (settings.quick_actions?.length) setQuickActions(settings.quick_actions);
      })
      .catch(() => {
        setEnabled(true);
      });
  }, []);

  useEffect(() => {
    sessionStorage.setItem(messagesKey, JSON.stringify(messages.slice(-30)));
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: reduceMotion ? "auto" : "smooth" });
  }, [messages, reduceMotion]);

  const canSend = useMemo(() => input.trim().length > 0 && !loading, [input, loading]);

  async function sendMessage(content: string) {
    const clean = content.trim();
    if (!clean || loading) return;

    const userMessage: ChatMessage = { id: messageId(), role: "user", content: clean };
    setMessages((current) => [...current, userMessage]);
    setInput("");
    setLoading(true);
    setError("");

    try {
      const response = await fetch(`${apiBase}/api/chatbot/message`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          message: clean,
          session_id: sessionId || undefined,
          page_url: typeof window !== "undefined" ? window.location.href : undefined,
          locale: typeof navigator !== "undefined" ? navigator.language : "en",
        }),
      });

      if (!response.ok) throw new Error("Chat request failed.");

      const payload = (await response.json()) as MessageResponse;
      localStorage.setItem(sessionIdKey, payload.session_id);
      setSessionId(payload.session_id);
      setMessages((current) => [...current, { id: messageId(), role: "assistant", content: payload.message }]);
      if (payload.lead_prompt) setLeadOpen(true);
    } catch {
      setError("I could not reach the assistant right now. You can still contact Youssef directly from /contact.");
      setMessages((current) => [
        ...current,
        {
          id: messageId(),
          role: "assistant",
          content: "Something went wrong while contacting the AI assistant. Please try again, or use the contact page for a direct reply from Youssef.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    await sendMessage(input);
  }

  async function submitLead(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLeadStatus("loading");
    const formData = new FormData(event.currentTarget);
    const body = Object.fromEntries(formData.entries());

    try {
      const response = await fetch(`${apiBase}/api/chatbot/lead`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          ...body,
          session_id: sessionId || undefined,
          source_page: typeof window !== "undefined" ? window.location.href : undefined,
        }),
      });

      if (!response.ok) throw new Error("Lead request failed.");
      const payload = await response.json();
      setLeadStatus("success");
      setLeadOpen(false);
      setMessages((current) => [...current, { id: messageId(), role: "assistant", content: payload.message ?? "Thanks. Youssef can review your project and reply with a realistic next step." }]);
      event.currentTarget.reset();
    } catch {
      setLeadStatus("error");
    }
  }

  function handleQuickAction(action: string) {
    if (action === "Request a Quote") {
      setOpen(true);
      setLeadOpen(true);
      setMessages((current) => [
        ...current,
        {
          id: messageId(),
          role: "assistant",
          content: "Great. Share your name, email or WhatsApp, project type, budget and deadline. Youssef can use that to reply with a realistic next step.",
        },
      ]);
      return;
    }

    setOpen(true);
    void sendMessage(quickPrompt(action));
  }

  if (hidden || !enabled) return null;

  return (
    <div className="fixed bottom-[calc(6rem+env(safe-area-inset-bottom))] right-4 z-50 md:bottom-24 md:right-6">
      <AnimatePresence>
        {open ? (
          <motion.section
            role="dialog"
            aria-label="Youssef Youyou AI assistant"
            initial={{ opacity: 0, y: 18, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 18, scale: 0.98 }}
            transition={transition}
            className="mb-4 flex h-[min(680px,calc(100vh-8rem))] w-[calc(100vw-2rem)] flex-col overflow-hidden rounded-[2rem] border border-sky-200/75 bg-white/94 shadow-[0_26px_100px_rgba(14,165,233,.24)] backdrop-blur-2xl dark:border-cyan-300/20 dark:bg-slate-950/94 dark:shadow-[0_26px_100px_rgba(2,8,23,.72)] sm:w-[430px]"
          >
            <header className="relative overflow-hidden border-b border-sky-200/70 bg-gradient-to-br from-sky-50 via-white to-cyan-50 p-4 dark:border-cyan-300/15 dark:from-cyan-300/12 dark:via-slate-900 dark:to-slate-950">
              <div className="absolute right-4 top-4 h-20 w-20 rounded-full bg-cyan-300/20 blur-3xl" />
              <div className="relative flex items-start justify-between gap-4">
                <div className="flex gap-3">
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-sky-500 to-cyan-300 text-white shadow-lg shadow-cyan-500/25">
                    <Bot size={23} aria-hidden="true" />
                  </span>
                  <div>
                    <p className="text-xs font-black uppercase tracking-[0.2em] text-sky-700 dark:text-cyan-300">AI assistant</p>
                    <h2 className="mt-1 text-lg font-black text-slate-950 dark:text-white">Ask about Youssef</h2>
                    <p className="mt-1 text-xs leading-5 text-slate-600 dark:text-slate-300">Services, projects, pricing direction and contact options.</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Close chatbot"
                  className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-sky-200/80 bg-white/80 text-slate-700 transition hover:border-sky-400/50 hover:text-sky-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 dark:border-white/10 dark:bg-white/[0.06] dark:text-slate-200"
                >
                  <ChevronDown size={18} />
                </button>
              </div>
            </header>

            <div ref={listRef} className="flex-1 space-y-4 overflow-y-auto px-4 py-5">
              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[85%] rounded-3xl px-4 py-3 text-sm leading-6 ${
                      message.role === "user"
                        ? "bg-gradient-to-r from-sky-500 to-cyan-300 font-semibold text-white shadow-lg shadow-cyan-500/20"
                        : "border border-sky-200/70 bg-sky-50 text-slate-700 dark:border-white/10 dark:bg-white/[0.055] dark:text-slate-200"
                    }`}
                  >
                    {message.content}
                  </div>
                </div>
              ))}

              {loading ? (
                <div className="flex justify-start">
                  <div className="inline-flex items-center gap-2 rounded-full border border-sky-200/70 bg-sky-50 px-4 py-2 text-sm font-semibold text-slate-600 dark:border-white/10 dark:bg-white/[0.055] dark:text-slate-300">
                    <Loader2 size={15} className="animate-spin text-sky-600 dark:text-cyan-300" /> Thinking...
                  </div>
                </div>
              ) : null}

              {error ? <p className="rounded-2xl border border-rose-300/45 bg-rose-50 p-3 text-xs font-semibold text-rose-800 dark:border-rose-300/25 dark:bg-rose-400/10 dark:text-rose-100">{error}</p> : null}

              {leadOpen ? (
                <form onSubmit={submitLead} className="grid gap-3 rounded-3xl border border-cyan-300/25 bg-cyan-50/70 p-4 dark:bg-cyan-300/[0.07]">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="text-sm font-black text-slate-950 dark:text-white">Request a quote</p>
                      <p className="mt-1 text-xs text-slate-600 dark:text-slate-300">This saves a lead in MySQL for Youssef to review.</p>
                    </div>
                    <button type="button" onClick={() => setLeadOpen(false)} aria-label="Close quote form" className="text-slate-500 hover:text-sky-700 dark:hover:text-cyan-100">
                      <X size={16} />
                    </button>
                  </div>
                  <input required name="name" placeholder="Your name" className="field min-h-11 text-sm" />
                  <input name="email" type="email" placeholder="Email" className="field min-h-11 text-sm" />
                  <input name="whatsapp" placeholder="WhatsApp or phone" className="field min-h-11 text-sm" />
                  <div className="grid gap-3 sm:grid-cols-2">
                    <input required name="project_type" placeholder="Project type" className="field min-h-11 text-sm" />
                    <input name="budget" placeholder="Budget range" className="field min-h-11 text-sm" />
                  </div>
                  <input name="deadline" placeholder="Deadline" className="field min-h-11 text-sm" />
                  <textarea name="notes" placeholder="Short business goal or current problem" className="field min-h-24 text-sm" />
                  <button disabled={leadStatus === "loading"} className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-sky-500 to-cyan-300 px-4 text-sm font-black text-white shadow-lg shadow-cyan-500/20 disabled:opacity-60">
                    {leadStatus === "loading" ? <Loader2 size={15} className="animate-spin" /> : <BriefcaseBusiness size={15} />} Send request
                  </button>
                  {leadStatus === "error" ? <p className="text-xs font-semibold text-rose-700 dark:text-rose-200">Could not save the lead. Please try again or use /contact.</p> : null}
                  {leadStatus === "success" ? <p className="text-xs font-semibold text-emerald-700 dark:text-emerald-200">Lead saved. Youssef can review it from the admin dashboard.</p> : null}
                </form>
              ) : null}
            </div>

            <div className="border-t border-sky-200/70 p-4 dark:border-white/10">
              <div className="mb-3 flex gap-2 overflow-x-auto pb-1">
                {quickActions.map((action) => (
                  <button
                    key={action}
                    type="button"
                    onClick={() => handleQuickAction(action)}
                    className="shrink-0 rounded-full border border-sky-200/80 bg-white px-3 py-2 text-xs font-black text-sky-700 transition hover:border-sky-400/50 hover:bg-sky-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 dark:border-white/10 dark:bg-white/[0.05] dark:text-cyan-100 dark:hover:border-cyan-300/35"
                  >
                    {action}
                  </button>
                ))}
              </div>
              <form onSubmit={submit} className="flex gap-2">
                <label className="sr-only" htmlFor="chatbot-message">Message Youssef AI assistant</label>
                <input
                  id="chatbot-message"
                  value={input}
                  onChange={(event) => setInput(event.target.value)}
                  placeholder="Ask about services, pricing or projects..."
                  className="min-h-11 flex-1 rounded-full border border-sky-200/80 bg-white px-4 text-sm font-semibold text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-sky-400 focus:ring-4 focus:ring-sky-300/15 dark:border-white/10 dark:bg-white/[0.05] dark:text-slate-100 dark:focus:border-cyan-300/45"
                />
                <button
                  type="submit"
                  disabled={!canSend}
                  aria-label="Send chatbot message"
                  className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-gradient-to-r from-sky-500 to-cyan-300 text-white shadow-lg shadow-cyan-500/20 transition hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 disabled:cursor-not-allowed disabled:opacity-55"
                >
                  <Send size={17} />
                </button>
              </form>
            </div>
          </motion.section>
        ) : null}
      </AnimatePresence>

      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-label="Open Youssef AI assistant chatbot"
        className="group relative grid h-16 w-16 place-items-center rounded-full border border-cyan-300/30 bg-slate-950 text-cyan-100 shadow-[0_20px_70px_rgba(34,211,238,.28)] transition hover:-translate-y-1 hover:border-cyan-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
      >
        <span className="absolute inset-0 rounded-full bg-cyan-300/18 opacity-0 blur-xl transition group-hover:opacity-100" />
        {open ? <X className="relative" size={24} /> : <MessageCircle className="relative" size={25} />}
        <span className="absolute -right-1 -top-1 grid h-6 w-6 place-items-center rounded-full bg-gradient-to-r from-sky-500 to-cyan-300 text-white shadow-lg shadow-cyan-500/30">
          <Sparkles size={13} />
        </span>
        <span className="absolute -left-32 top-1/2 hidden -translate-y-1/2 rounded-full border border-cyan-300/20 bg-slate-950/90 px-3 py-2 text-xs font-black text-cyan-50 opacity-0 shadow-xl backdrop-blur-xl transition group-hover:opacity-100 md:block">
          Ask Youssef&apos;s AI
        </span>
      </button>
    </div>
  );
}
