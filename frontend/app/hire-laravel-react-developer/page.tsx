import type { Metadata } from "next";
import { AuthorityPage } from "@/components/seo/AuthorityPage";
import { authorityPages } from "@/lib/authority-content";

const page = authorityPages["hire-laravel-react-developer"];

export const metadata: Metadata = {
  title: page.title,
  description: page.description,
  alternates: { canonical: `/${page.slug}` },
  keywords: ["Laravel React developer for hire", "full-stack developer Morocco", "remote Laravel developer", "remote React developer"],
  openGraph: { title: page.title, description: page.description, url: `/${page.slug}`, images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Hire Youssef Youyou Laravel React developer" }] },
  twitter: { card: "summary_large_image", title: page.title, description: page.description },
};

export default function HireLaravelReactDeveloperPage() {
  return <AuthorityPage page={page} />;
}
