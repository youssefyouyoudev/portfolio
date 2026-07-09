import type { Metadata } from "next";
import { profile } from "@/lib/data";

export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? profile.website).replace(/\/$/, "");
export const defaultOgImage = "/opengraph-image";

export function brandedTitle(title: string) {
  return title.includes("Youssef Youyou") ? title : `${title} | Youssef Youyou`;
}

export function absoluteUrl(path = "/") {
  return new URL(path, `${siteUrl}/`).toString();
}

export function pageMetadata({
  title,
  description,
  path,
  image = defaultOgImage,
  noIndex = false,
}: {
  title: string;
  description: string;
  path: string;
  image?: string;
  noIndex?: boolean;
}): Metadata {
  return {
    title: { absolute: brandedTitle(title) },
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      title: brandedTitle(title),
      description,
      url: path,
      siteName: "Youssef Youyou",
      images: [{ url: image, width: 1200, height: 630, alt: `${title} – Youssef Youyou` }],
    },
    twitter: {
      card: "summary_large_image",
      title: brandedTitle(title),
      description,
      images: [image],
    },
    ...(noIndex ? { robots: { index: false, follow: false } } : {}),
  };
}
