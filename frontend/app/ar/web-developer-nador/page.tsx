import type { Metadata } from "next";
import { AuthorityPage } from "@/components/seo/AuthorityPage";
import { authorityPages } from "@/lib/authority-content";

const page = authorityPages["ar/web-developer-nador"];

export const metadata: Metadata = {
  title: page.title,
  description: page.description,
  alternates: { canonical: `/${page.slug}`, languages: { en: "/services/web-developer-nador", ar: `/${page.slug}` } },
  openGraph: { title: page.title, description: page.description, url: `/${page.slug}`, images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "مطور ويب Full-Stack في الناظور والمغرب" }] },
  twitter: { card: "summary_large_image", title: page.title, description: page.description },
};

export default function ArabicWebDeveloperNadorPage() {
  return <AuthorityPage page={page} />;
}
