import type { Metadata } from "next";
import { AuthorityPage } from "@/components/seo/AuthorityPage";
import { authorityPages } from "@/lib/authority-content";

const page = authorityPages["work-with-me"];

export const metadata: Metadata = {
  title: page.title,
  description: page.description,
  alternates: { canonical: `/${page.slug}` },
  openGraph: { title: page.title, description: page.description, url: `/${page.slug}`, images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Work with Youssef Youyou Laravel React SaaS developer" }] },
  twitter: { card: "summary_large_image", title: page.title, description: page.description },
};

export default function WorkWithMePage() {
  return <AuthorityPage page={page} />;
}
