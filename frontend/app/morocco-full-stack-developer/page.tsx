import type { Metadata } from "next";
import { AuthorityPage } from "@/components/seo/AuthorityPage";
import { authorityPages } from "@/lib/authority-content";

const page = authorityPages["morocco-full-stack-developer"];

export const metadata: Metadata = {
  title: page.title,
  description: page.description,
  alternates: { canonical: `/${page.slug}` },
  openGraph: { title: page.title, description: page.description, url: `/${page.slug}`, images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Youssef Youyou full stack developer in Morocco" }] },
  twitter: { card: "summary_large_image", title: page.title, description: page.description },
};

export default function MoroccoFullStackDeveloperPage() {
  return <AuthorityPage page={page} />;
}
