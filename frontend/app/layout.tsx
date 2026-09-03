import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import { GoogleAnalytics } from "@next/third-parties/google";
import { AnalyticsEvents } from "@/components/analytics/AnalyticsEvents";
import { ChatWidget } from "@/components/chatbot/ChatWidget";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { JsonLd } from "@/components/seo/JsonLd";
import { profile } from "@/lib/data";
import { siteUrl } from "@/lib/site";
import "./globals.css";

const googleVerification = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION;
const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
const plausibleDomain = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Full-Stack Developer in Morocco | Laravel, React & Next.js",
    // Individual routes provide already-branded absolute titles where needed.
    template: "%s",
  },
  description:
    "Youssef Youyou builds Laravel, React and Next.js business systems: APIs, dashboards, SaaS foundations and workflow automation for Morocco and remote clients.",
  applicationName: "Youssef Youyou Portfolio",
  authors: [{ name: "Youssef Youyou", url: siteUrl }],
  creator: "Youssef Youyou",
  publisher: "Youssef Youyou",
  category: "technology",
  keywords: [
    "Youssef Youyou",
    "Laravel developer Morocco",
    "React developer Morocco",
    "Next.js developer Morocco",
    "Full-stack developer Morocco",
    "Senior full-stack developer",
    "Senior web developer Morocco",
    "Dashboard developer",
    "API integration developer",
    "SaaS developer Morocco",
    "Business website developer",
    "Senior web developer Marrakech",
    "Laravel React portfolio",
    "B2B web developer",
    "B2C web developer",
    "admin dashboard developer",
    "API integration developer",
    "Nador developer",
    "Marrakech developer",
    "web developer in Nador",
    "Laravel developer Nador",
    "freelance web developer Nador",
    "website development Nador",
    "business automation Nador",
    "remote Laravel developer",
    "React dashboard developer",
  ],
  alternates: { canonical: siteUrl },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    title: "Full-Stack Developer in Morocco | Laravel, React & Next.js",
    description:
      "Youssef Youyou builds Laravel, React and Next.js business systems: APIs, dashboards, SaaS foundations and workflow automation for Morocco and remote clients.",
    siteName: "Youssef Youyou Portfolio",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Youssef Youyou senior full stack developer portfolio" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Full-Stack Developer in Morocco | Laravel, React & Next.js",
    description:
      "Youssef Youyou builds Laravel, React and Next.js business systems: APIs, dashboards, SaaS foundations and workflow automation for Morocco and remote clients.",
    images: ["/opengraph-image"],
  },
  ...(googleVerification ? { verification: { google: googleVerification } } : {}),
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">
        {plausibleDomain ? <Script defer data-domain={plausibleDomain} src="https://plausible.io/js/script.js" strategy="afterInteractive" /> : null}
        <JsonLd data={[
          {
            "@context": "https://schema.org",
            "@type": "Person",
            "@id": `${siteUrl}/#person`,
            name: "Youssef Youyou",
            jobTitle: "Full-Stack Developer",
            email: profile.email,
            url: siteUrl,
            address: { "@type": "PostalAddress", addressLocality: "Nador", addressCountry: "MA" },
            sameAs: [profile.github, profile.linkedin].filter(Boolean),
            knowsLanguage: ["English", "French", "Arabic"],
            knowsAbout: ["Laravel development", "React development", "Next.js development", "SaaS development", "Admin dashboard development", "Business automation", "Business website development", "API development", "Server deployment and technical SEO"],
          },
          {
            "@context": "https://schema.org",
            "@type": "ProfessionalService",
            "@id": `${siteUrl}/#business`,
            name: "Youssef Youyou",
            url: siteUrl,
            founder: { "@id": `${siteUrl}/#person` },
            areaServed: ["Morocco", "Nador", "Marrakech", "Casablanca", "Rabat", "Tangier", "Oujda", "Fez", "Agadir"],
            sameAs: [profile.github, profile.linkedin].filter(Boolean),
          },
          {
            "@context": "https://schema.org",
            "@type": "WebSite",
            "@id": `${siteUrl}/#website`,
            name: "Youssef Youyou",
            url: siteUrl,
            inLanguage: ["en", "fr", "ar"],
            publisher: { "@id": `${siteUrl}/#person` },
          },
        ]} />
        <ThemeProvider>
          {children}
          <ChatWidget />
        </ThemeProvider>
        <AnalyticsEvents />
        {gaId ? <GoogleAnalytics gaId={gaId} /> : null}
      </body>
    </html>
  );
}
