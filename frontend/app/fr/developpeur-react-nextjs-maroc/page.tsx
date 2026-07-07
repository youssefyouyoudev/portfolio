import type { Metadata } from "next";
import { AuthorityPage } from "@/components/seo/AuthorityPage";
import { authorityPages } from "@/lib/authority-content";

const page = authorityPages["fr/developpeur-react-nextjs-maroc"];

export const metadata: Metadata = {
  title: page.title,
  description: page.description,
  alternates: { canonical: `/${page.slug}`, languages: { en: "/services/react-nextjs-developer-morocco", fr: `/${page.slug}` } },
  openGraph: { title: page.title, description: page.description, url: `/${page.slug}`, images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Développeur React Next.js au Maroc" }] },
  twitter: { card: "summary_large_image", title: page.title, description: page.description },
};

export default function DeveloppeurReactNextjsMarocPage() {
  return <AuthorityPage page={page} />;
}
