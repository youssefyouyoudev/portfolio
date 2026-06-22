"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import {
  Archive,
  CheckCircle2,
  Database,
  Eye,
  FileText,
  ImagePlus,
  Loader2,
  Lock,
  LogOut,
  Mail,
  Menu,
  Newspaper,
  PanelTop,
  Pencil,
  Plus,
  Save,
  Settings,
  Sparkles,
  Star,
  Trash2,
  Upload,
} from "lucide-react";

const apiBase = process.env.NEXT_PUBLIC_API_URL ?? "https://api.youssefyouyou.com";

type Resource = {
  key: string;
  label: string;
  description: string;
  icon: typeof Settings;
  template: Record<string, unknown>;
};

type ApiRecord = Record<string, unknown> & { id?: number; title?: string; name?: string; key?: string; slug?: string };

const resources: Resource[] = [
  {
    key: "settings",
    label: "Settings",
    description: "SEO, socials, contact, CV, colors and global switches.",
    icon: Settings,
    template: { key: "site.example", group: "site", value: "Editable value", label: "Example setting", sort_order: 0 },
  },
  {
    key: "hero",
    label: "Hero",
    description: "Headline, copy, badges, CTAs and hero image.",
    icon: Sparkles,
    template: {
      headline: "Youssef Youyou",
      subtitle: "Junior Full-Stack Web Developer",
      description: "I build Laravel, React/Next.js, API-driven and production-ready web platforms.",
      badges: ["Laravel", "React/Next.js", "APIs"],
      ctas: [{ label: "View My Work", url: "#projects" }],
      is_published: true,
    },
  },
  {
    key: "about",
    label: "About",
    description: "Short bio, story card, highlights and about cards.",
    icon: PanelTop,
    template: { title: "Practical developer with business-process context", short_bio: "", body: "", highlights: [], cards: [], is_published: true },
  },
  {
    key: "skills",
    label: "Skills",
    description: "Skill categories, icons, levels, visibility and ordering.",
    icon: CheckCircle2,
    template: { name: "Laravel", category: "Backend", level: 90, is_featured: true, is_visible: true, sort_order: 0 },
  },
  {
    key: "services",
    label: "Services",
    description: "Business services, feature lists, CTAs and visibility.",
    icon: Star,
    template: { title: "Laravel Backend Development", slug: "laravel-backend-development", description: "", audience_tag: "B2B/B2C", features: [], is_visible: true, sort_order: 0 },
  },
  {
    key: "projects",
    label: "Projects",
    description: "Case studies, images, stack, SEO, publishing and ordering.",
    icon: Database,
    template: {
      title: "New project",
      slug: "new-project",
      category: "Dashboard / Website",
      subtitle: "Laravel • React • MySQL",
      summary: "Short project summary.",
      business_value: "Business value without fake numbers.",
      stack: ["Laravel", "React"],
      features: [],
      problems_solved: [],
      project_type: "Personal Project",
      status: "Concept",
      is_featured: false,
      show_on_homepage: false,
      is_published: false,
      sort_order: 0,
    },
  },
  {
    key: "blog-posts",
    label: "Technical Notes",
    description: "Blog posts, SEO, categories, tags and publishing.",
    icon: Newspaper,
    template: { title: "New technical note", slug: "new-technical-note", excerpt: "", content: "", author: "Youssef Youyou", is_published: false, is_featured: false, meta_robots: "index,follow", sort_order: 0 },
  },
  {
    key: "blog-categories",
    label: "Blog Categories",
    description: "Editorial categories for technical notes.",
    icon: Archive,
    template: { name: "Dashboards", slug: "dashboards", is_visible: true, sort_order: 0 },
  },
  {
    key: "blog-tags",
    label: "Blog Tags",
    description: "Reusable tags for notes and related posts.",
    icon: Archive,
    template: { name: "Laravel", slug: "laravel" },
  },
  {
    key: "experiences",
    label: "Experience",
    description: "Roles, dates, achievements, logos and ordering.",
    icon: FileText,
    template: { company: "Company", role: "Role", location: "Nador, Morocco", description: [], technologies: [], is_current: false, is_visible: true, sort_order: 0 },
  },
  {
    key: "testimonials",
    label: "Testimonials",
    description: "Optional testimonials, ratings, avatars and visibility.",
    icon: Star,
    template: { name: "Client name", role: "Role / company", text: "", rating: 5, is_featured: false, is_visible: false, sort_order: 0 },
  },
  {
    key: "contact-messages",
    label: "Messages",
    description: "Read, archive and review contact form messages.",
    icon: Mail,
    template: {},
  },
  {
    key: "media",
    label: "Media",
    description: "Uploaded images, PDFs and files for portfolio content.",
    icon: ImagePlus,
    template: {},
  },
  {
    key: "menu-items",
    label: "Menus",
    description: "Navbar and footer menu labels, URLs and visibility.",
    icon: Menu,
    template: { label: "Projects", url: "/projects", placement: "navbar", is_external: false, open_in_new_tab: false, is_visible: true, sort_order: 0 },
  },
  {
    key: "footer-settings",
    label: "Footer",
    description: "Footer positioning, navigation and social content.",
    icon: PanelTop,
    template: { key: "main", content: { text: "Full-stack web developer building Laravel, React/Next.js, API and dashboard solutions." }, is_visible: true },
  },
];

function pretty(record: unknown) {
  return JSON.stringify(record, null, 2);
}

function titleFor(record: ApiRecord) {
  return String(record.title ?? record.name ?? record.key ?? record.slug ?? `Record #${record.id ?? "new"}`);
}

export default function AdminDashboard() {
  const [mounted, setMounted] = useState(false);
  const [token, setToken] = useState("");
  const [email, setEmail] = useState("contact@youssefyouyou.com");
  const [password, setPassword] = useState("");
  const [activeKey, setActiveKey] = useState("projects");
  const [records, setRecords] = useState<ApiRecord[]>([]);
  const [selected, setSelected] = useState<ApiRecord | null>(null);
  const [editor, setEditor] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  const activeResource = useMemo(() => resources.find((resource) => resource.key === activeKey) ?? resources[0], [activeKey]);

  useEffect(() => {
    setMounted(true);
    setToken(localStorage.getItem("portfolio_admin_token") ?? "");
  }, []);

  useEffect(() => {
    if (token && mounted) {
      void loadRecords(activeKey);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, activeKey, mounted]);

  async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
    const response = await fetch(`${apiBase}${path}`, {
      ...options,
      headers: {
        Accept: "application/json",
        ...(options.body instanceof FormData ? {} : { "Content-Type": "application/json" }),
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...(options.headers ?? {}),
      },
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: response.statusText }));
      throw new Error(error.message ?? "Request failed");
    }

    return (await response.json()) as T;
  }

  async function login(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");
    setLoading(true);
    try {
      const payload = await request<{ token: string }>("/api/admin/login", {
        method: "POST",
        body: JSON.stringify({ email, password, device_name: "Next.js Admin Dashboard" }),
      });
      localStorage.setItem("portfolio_admin_token", payload.token);
      setToken(payload.token);
      setPassword("");
      setMessage("Logged in successfully.");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Login failed.");
    } finally {
      setLoading(false);
    }
  }

  async function loadRecords(resourceKey = activeKey) {
    setLoading(true);
    setMessage("");
    try {
      const payload = await request<{ data?: ApiRecord[] } | ApiRecord[]>(`/api/admin/${resourceKey}`);
      const rows = Array.isArray(payload) ? payload : payload.data ?? [];
      setRecords(rows);
      setSelected(null);
      setEditor("");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Could not load records.");
    } finally {
      setLoading(false);
    }
  }

  function startCreate() {
    const draft = activeResource.template;
    setSelected(null);
    setEditor(pretty(draft));
  }

  function startEdit(record: ApiRecord) {
    setSelected(record);
    setEditor(pretty(record));
  }

  async function saveRecord() {
    setSaving(true);
    setMessage("");
    try {
      const parsed = JSON.parse(editor || "{}") as ApiRecord;
      const isUpdate = Boolean(selected?.id);
      await request(`/api/admin/${activeKey}${isUpdate ? `/${selected?.id}` : ""}`, {
        method: isUpdate ? "PUT" : "POST",
        body: JSON.stringify(parsed),
      });
      setMessage(isUpdate ? "Record updated." : "Record created.");
      await loadRecords(activeKey);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Could not save record.");
    } finally {
      setSaving(false);
    }
  }

  async function deleteRecord(record: ApiRecord) {
    if (!record.id || !window.confirm(`Delete ${titleFor(record)}?`)) return;
    setSaving(true);
    try {
      await request(`/api/admin/${activeKey}/${record.id}`, { method: "DELETE" });
      setMessage("Record deleted.");
      await loadRecords(activeKey);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Could not delete record.");
    } finally {
      setSaving(false);
    }
  }

  async function patchAction(record: ApiRecord, action: "publish" | "feature", value: boolean) {
    if (!record.id) return;
    setSaving(true);
    try {
      await request(`/api/admin/${activeKey}/${record.id}/${action}`, {
        method: "PATCH",
        body: JSON.stringify(action === "publish" ? { is_published: value } : { is_featured: value }),
      });
      setMessage("Status updated.");
      await loadRecords(activeKey);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Could not update status.");
    } finally {
      setSaving(false);
    }
  }

  async function markMessage(record: ApiRecord, status: "read" | "unread" | "archive") {
    if (!record.id) return;
    setSaving(true);
    try {
      await request(`/api/admin/contact-messages/${record.id}/mark`, {
        method: "PATCH",
        body: JSON.stringify({ status }),
      });
      setMessage("Message updated.");
      await loadRecords(activeKey);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Could not update message.");
    } finally {
      setSaving(false);
    }
  }

  async function uploadMedia(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const input = event.currentTarget.elements.namedItem("file") as HTMLInputElement | null;
    const file = input?.files?.[0];
    if (!file) return;

    const form = new FormData();
    form.append("file", file);
    form.append("alt_text", file.name.replace(/\.[^.]+$/, ""));
    setUploading(true);
    try {
      await request("/api/admin/media/upload", { method: "POST", body: form });
      setMessage("Media uploaded.");
      if (activeKey === "media") await loadRecords("media");
      event.currentTarget.reset();
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Upload failed.");
    } finally {
      setUploading(false);
    }
  }

  function logout() {
    localStorage.removeItem("portfolio_admin_token");
    setToken("");
    setRecords([]);
    setSelected(null);
    setEditor("");
  }

  if (!mounted) {
    return <main className="min-h-screen bg-slate-950" />;
  }

  if (!token) {
    return (
      <main className="min-h-screen bg-[radial-gradient(circle_at_top,rgba(14,165,233,.18),transparent_36%),linear-gradient(135deg,#020617,#061826)] px-4 py-16 text-white">
        <section className="mx-auto max-w-md rounded-[2rem] border border-cyan-400/15 bg-slate-950/72 p-8 shadow-2xl shadow-cyan-950/30 backdrop-blur-2xl">
          <div className="mb-8 inline-flex rounded-2xl border border-cyan-300/20 bg-cyan-300/10 p-3 text-cyan-200">
            <Lock size={24} />
          </div>
          <h1 className="text-3xl font-black tracking-tight">Portfolio Admin</h1>
          <p className="mt-3 text-sm leading-6 text-slate-300">Private CMS access for managing Youssef Youyou portfolio content, projects, notes, media and messages.</p>
          <form onSubmit={login} className="mt-8 grid gap-4">
            <label className="grid gap-2 text-sm font-bold text-slate-200">
              Email
              <input value={email} onChange={(event) => setEmail(event.target.value)} type="email" className="rounded-2xl border border-white/10 bg-white/[0.06] px-4 py-3 text-white outline-none transition focus:border-cyan-300/60 focus:ring-4 focus:ring-cyan-300/10" />
            </label>
            <label className="grid gap-2 text-sm font-bold text-slate-200">
              Password
              <input value={password} onChange={(event) => setPassword(event.target.value)} type="password" className="rounded-2xl border border-white/10 bg-white/[0.06] px-4 py-3 text-white outline-none transition focus:border-cyan-300/60 focus:ring-4 focus:ring-cyan-300/10" />
            </label>
            <button disabled={loading} className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-sky-500 to-cyan-400 px-5 py-3 font-black text-white shadow-xl shadow-cyan-500/20 transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-70">
              {loading ? <Loader2 className="animate-spin" size={18} /> : <Lock size={18} />} Sign in
            </button>
          </form>
          {message ? <p className="mt-5 rounded-2xl border border-cyan-300/15 bg-cyan-300/10 p-3 text-sm text-cyan-100">{message}</p> : null}
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 text-slate-950 dark:bg-[#020617] dark:text-white">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_10%_0%,rgba(14,165,233,.14),transparent_30%),linear-gradient(180deg,#f8fafc,#eef6ff_48%,#f8fafc)] dark:bg-[radial-gradient(circle_at_10%_0%,rgba(34,211,238,.12),transparent_30%),linear-gradient(180deg,#020617,#061826_48%,#020617)]" />
      <div className="relative mx-auto grid max-w-7xl gap-6 px-4 py-6 lg:grid-cols-[280px_1fr]">
        <aside className="rounded-[2rem] border border-sky-200/70 bg-white/85 p-4 shadow-xl shadow-sky-100/80 backdrop-blur-2xl dark:border-cyan-400/15 dark:bg-slate-950/72 dark:shadow-none lg:sticky lg:top-6 lg:h-[calc(100vh-3rem)] lg:overflow-auto">
          <div className="flex items-start justify-between gap-3 px-2 py-3">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.28em] text-sky-700 dark:text-cyan-300">CMS</p>
              <h1 className="mt-1 text-xl font-black">Portfolio Admin</h1>
            </div>
            <button onClick={logout} className="rounded-2xl border border-sky-200/80 bg-white/80 p-2 text-slate-600 transition hover:border-sky-400/50 hover:text-sky-700 dark:border-white/10 dark:bg-white/[0.04] dark:text-slate-300 dark:hover:text-cyan-100" aria-label="Log out">
              <LogOut size={18} />
            </button>
          </div>
          <nav className="mt-4 grid gap-2">
            {resources.map((resource) => {
              const Icon = resource.icon;
              const active = resource.key === activeKey;
              return (
                <button
                  key={resource.key}
                  onClick={() => setActiveKey(resource.key)}
                  className={`flex items-center gap-3 rounded-2xl px-3 py-3 text-left text-sm font-bold transition ${
                    active
                      ? "border border-sky-300/70 bg-sky-100 text-sky-900 shadow-lg shadow-sky-100 dark:border-cyan-300/30 dark:bg-cyan-300/12 dark:text-cyan-100 dark:shadow-none"
                      : "text-slate-600 hover:bg-sky-50 hover:text-sky-800 dark:text-slate-300 dark:hover:bg-white/[0.05] dark:hover:text-cyan-100"
                  }`}
                >
                  <Icon size={17} />
                  {resource.label}
                </button>
              );
            })}
          </nav>
        </aside>

        <section className="grid gap-6">
          <header className="rounded-[2rem] border border-sky-200/70 bg-white/88 p-6 shadow-xl shadow-sky-100/70 backdrop-blur-2xl dark:border-cyan-400/15 dark:bg-slate-950/70 dark:shadow-none">
            <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.28em] text-sky-700 dark:text-cyan-300">Private dashboard</p>
                <h2 className="mt-2 text-3xl font-black tracking-tight">{activeResource.label}</h2>
                <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600 dark:text-slate-300">{activeResource.description}</p>
              </div>
              <div className="flex flex-wrap gap-2">
                <button onClick={() => loadRecords(activeKey)} className="inline-flex items-center gap-2 rounded-2xl border border-sky-200/80 bg-white/75 px-4 py-2 text-sm font-black text-slate-700 transition hover:border-sky-400/50 hover:text-sky-700 dark:border-white/10 dark:bg-white/[0.04] dark:text-slate-200 dark:hover:text-cyan-100">
                  <Eye size={16} /> Refresh
                </button>
                {!["contact-messages", "media"].includes(activeKey) ? (
                  <button onClick={startCreate} className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-sky-500 to-cyan-400 px-4 py-2 text-sm font-black text-white shadow-lg shadow-cyan-500/20 transition hover:-translate-y-0.5">
                    <Plus size={16} /> New
                  </button>
                ) : null}
              </div>
            </div>
            {message ? <p className="mt-5 rounded-2xl border border-sky-200/80 bg-sky-50 p-3 text-sm font-semibold text-sky-800 dark:border-cyan-300/15 dark:bg-cyan-300/10 dark:text-cyan-100">{message}</p> : null}
          </header>

          <form onSubmit={uploadMedia} className="rounded-[1.5rem] border border-sky-200/70 bg-white/82 p-4 shadow-lg shadow-sky-100/60 backdrop-blur-xl dark:border-cyan-400/12 dark:bg-slate-900/55 dark:shadow-none">
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="font-black">Media upload</p>
                <p className="text-sm text-slate-600 dark:text-slate-400">Images, PDFs and project assets are stored through Laravel media.</p>
              </div>
              <div className="flex flex-col gap-2 sm:flex-row">
                <input name="file" type="file" className="max-w-full rounded-2xl border border-sky-200/80 bg-white px-3 py-2 text-sm dark:border-white/10 dark:bg-white/[0.04]" />
                <button disabled={uploading} className="inline-flex items-center justify-center gap-2 rounded-2xl border border-sky-300/70 bg-sky-100 px-4 py-2 text-sm font-black text-sky-800 transition hover:border-sky-400 dark:border-cyan-300/25 dark:bg-cyan-300/10 dark:text-cyan-100">
                  {uploading ? <Loader2 className="animate-spin" size={16} /> : <Upload size={16} />} Upload
                </button>
              </div>
            </div>
          </form>

          <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_minmax(420px,.82fr)]">
            <section className="rounded-[2rem] border border-sky-200/70 bg-white/88 p-4 shadow-xl shadow-sky-100/70 backdrop-blur-2xl dark:border-cyan-400/15 dark:bg-slate-950/64 dark:shadow-none">
              {loading ? (
                <div className="flex min-h-64 items-center justify-center text-slate-500 dark:text-slate-400">
                  <Loader2 className="mr-2 animate-spin" size={18} /> Loading records
                </div>
              ) : records.length ? (
                <div className="grid gap-3">
                  {records.map((record) => (
                    <article key={record.id ?? titleFor(record)} className="rounded-2xl border border-sky-200/70 bg-slate-50/80 p-4 transition hover:border-sky-400/50 hover:bg-white dark:border-white/10 dark:bg-white/[0.035] dark:hover:border-cyan-300/25 dark:hover:bg-white/[0.06]">
                      <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                        <div>
                          <h3 className="font-black">{titleFor(record)}</h3>
                          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                            ID {record.id ?? "-"} {record.slug ? ` / ${record.slug}` : ""}
                          </p>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          <button onClick={() => startEdit(record)} className="inline-flex items-center gap-1 rounded-full border border-sky-200/80 px-3 py-1.5 text-xs font-black text-sky-800 transition hover:border-sky-400 dark:border-white/10 dark:text-cyan-100" type="button">
                            <Pencil size={13} /> Edit
                          </button>
                          {["projects", "blog-posts"].includes(activeKey) ? (
                            <>
                              <button onClick={() => patchAction(record, "publish", !(record.is_published as boolean))} className="inline-flex items-center gap-1 rounded-full border border-emerald-300/60 px-3 py-1.5 text-xs font-black text-emerald-700 dark:border-emerald-300/25 dark:text-emerald-200" type="button">
                                {record.is_published ? "Unpublish" : "Publish"}
                              </button>
                              <button onClick={() => patchAction(record, "feature", !(record.is_featured as boolean))} className="inline-flex items-center gap-1 rounded-full border border-amber-300/70 px-3 py-1.5 text-xs font-black text-amber-700 dark:border-amber-300/25 dark:text-amber-200" type="button">
                                <Star size={13} /> {record.is_featured ? "Unfeature" : "Feature"}
                              </button>
                            </>
                          ) : null}
                          {activeKey === "contact-messages" ? (
                            <>
                              <button onClick={() => markMessage(record, "read")} className="rounded-full border border-sky-200/80 px-3 py-1.5 text-xs font-black text-sky-800 dark:border-white/10 dark:text-cyan-100" type="button">Read</button>
                              <button onClick={() => markMessage(record, "archive")} className="rounded-full border border-amber-300/70 px-3 py-1.5 text-xs font-black text-amber-700 dark:border-amber-300/25 dark:text-amber-200" type="button">Archive</button>
                            </>
                          ) : null}
                          <button onClick={() => deleteRecord(record)} className="inline-flex items-center gap-1 rounded-full border border-rose-300/70 px-3 py-1.5 text-xs font-black text-rose-700 transition hover:bg-rose-50 dark:border-rose-300/25 dark:text-rose-200 dark:hover:bg-rose-400/10" type="button">
                            <Trash2 size={13} /> Delete
                          </button>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              ) : (
                <div className="rounded-2xl border border-dashed border-sky-200/80 p-8 text-center text-sm text-slate-500 dark:border-white/10 dark:text-slate-400">
                  No records yet. Create one or seed the backend.
                </div>
              )}
            </section>

            <section className="rounded-[2rem] border border-sky-200/70 bg-white/88 p-5 shadow-xl shadow-sky-100/70 backdrop-blur-2xl dark:border-cyan-400/15 dark:bg-slate-950/64 dark:shadow-none">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <h3 className="font-black">{selected ? `Edit ${titleFor(selected)}` : "JSON editor"}</h3>
                  <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">Edit content safely as structured JSON. Extra fields are ignored by Laravel validation.</p>
                </div>
                <button onClick={saveRecord} disabled={!editor || saving || ["contact-messages", "media"].includes(activeKey)} className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-sky-500 to-cyan-400 px-4 py-2 text-sm font-black text-white shadow-lg shadow-cyan-500/20 transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-50" type="button">
                  {saving ? <Loader2 className="animate-spin" size={16} /> : <Save size={16} />} Save
                </button>
              </div>
              <textarea
                value={editor}
                onChange={(event) => setEditor(event.target.value)}
                placeholder="Select a record or click New."
                spellCheck={false}
                className="mt-5 min-h-[520px] w-full rounded-2xl border border-sky-200/80 bg-slate-950 px-4 py-4 font-mono text-xs leading-6 text-cyan-50 outline-none transition focus:border-cyan-300/70 focus:ring-4 focus:ring-cyan-300/10 dark:border-white/10 dark:bg-black/35"
              />
            </section>
          </div>
        </section>
      </div>
    </main>
  );
}
