import Link from "next/link";
import { Lock } from "lucide-react";

export const metadata = {
  title: "Admin Login",
  description: "Admin login entry for Youssef Youyou portfolio content management.",
};

export default function AdminLogin() {
  return (
    <main className="grid min-h-screen place-items-center bg-[#020817] px-4 text-white">
      <section className="max-w-xl rounded-[2rem] border border-white/10 bg-white/[0.04] p-8 text-center">
        <Lock className="mx-auto text-cyan-300" size={42} />
        <h1 className="mt-5 text-4xl font-black">Admin Login</h1>
        <p className="mt-4 text-slate-300">The production admin panel is designed for Filament at the Laravel API domain. Enable PHP `intl`, install Filament, then use the backend admin panel for editable content.</p>
        <a href="https://api.youssefyouyou.com/admin" className="mt-6 inline-flex rounded-full bg-cyan-300 px-5 py-3 font-bold text-slate-950">Open API Admin</a>
        <div className="mt-5"><Link href="/" className="text-cyan-200">Back to portfolio</Link></div>
      </section>
    </main>
  );
}
