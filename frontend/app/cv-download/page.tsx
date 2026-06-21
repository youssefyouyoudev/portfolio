import Link from "next/link";
import { Download } from "lucide-react";
import { CvDownloadButton } from "@/components/cv-download-button";

export const metadata = {
  title: "Download CV",
  description: "Download the CV of Youssef Youyou, Junior Full-Stack Web Developer.",
};

export default function CvDownload() {
  return (
    <main className="grid min-h-screen place-items-center bg-[#020817] px-4 text-white">
      <section className="max-w-xl rounded-[2rem] border border-white/10 bg-white/[0.04] p-8 text-center">
        <Download className="mx-auto text-cyan-300" size={42} />
        <h1 className="mt-5 text-4xl font-black">Download CV</h1>
        <p className="mt-4 text-slate-300">This button can call the Laravel `/api/cv-download` endpoint to track downloads, then serve the editable CV file configured in admin settings.</p>
        <CvDownloadButton />
        <div className="mt-5"><Link href="/" className="text-cyan-200">Back to portfolio</Link></div>
      </section>
    </main>
  );
}
