import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import { ChatWidget } from "@/components/chatbot/ChatWidget";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.youssefyouyou.com";
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
    default: "Youssef Youyou | Senior Laravel & React Full-Stack Developer in Nador, Morocco",
    template: "%s | Youssef Youyou",
  },
  description:
    "Senior Full-Stack Developer from Nador, Morocco building Laravel APIs, React/Next.js interfaces, SaaS platforms, admin dashboards, business automation tools and SEO-friendly websites.",
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
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    title: "Youssef Youyou | Senior Full-Stack Developer from Nador, Morocco",
    description:
      "Laravel, React, Next.js, SaaS platforms, dashboards, APIs, business automation and production-ready web development.",
    siteName: "Youssef Youyou Portfolio",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Youssef Youyou senior full stack developer portfolio" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Youssef Youyou | Senior Full-Stack Developer from Nador, Morocco",
    description:
      "Laravel, React, Next.js, SaaS platforms, dashboards, APIs, business automation and production-ready web development.",
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
        {gaId ? (
          <>
            <Script src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} strategy="afterInteractive" />
            <Script id="ga-init" strategy="afterInteractive">
              {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${gaId}');`}
            </Script>
          </>
        ) : null}
        {plausibleDomain ? <Script defer data-domain={plausibleDomain} src="https://plausible.io/js/script.js" strategy="afterInteractive" /> : null}
        <script
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              {
                "@context": "https://schema.org",
                "@type": "Person",
                name: "Youssef Youyou",
                jobTitle: "Senior Full-Stack Web Developer",
                description: "Senior Full-Stack Web Developer based in Morocco focused on Laravel APIs, React/Next.js interfaces, dashboards, SaaS platforms, deployment, Cloudflare, Nginx, business automation and SEO-friendly websites.",
                email: "contact@youssefyouyou.com",
                url: siteUrl,
                sameAs: ["https://github.com/youssefyouyoudev", "https://linkedin.com/in/youssefyouyoudev"],
                address: { "@type": "PostalAddress", addressLocality: "Nador", addressCountry: "MA" },
                homeLocation: { "@type": "Place", name: "Nador, Morocco" },
                knowsAbout: ["Laravel", "PHP", "React", "Next.js", "JavaScript", "TypeScript", "MySQL", "REST APIs", "dashboards", "SaaS", "SEO", "Nginx", "Cloudflare", "deployment", "business automation"],
              },
              {
                "@context": "https://schema.org",
                "@type": "WebSite",
                name: "Youssef Youyou Portfolio",
                url: siteUrl,
              },
              {
                "@context": "https://schema.org",
                "@type": "ProfilePage",
                name: "Youssef Youyou Senior Full-Stack Web Developer Portfolio",
                url: siteUrl,
                about: {
                  "@type": "Person",
                  name: "Youssef Youyou",
                  jobTitle: "Senior Full-Stack Web Developer",
                  url: siteUrl,
                },
                description: "Portfolio profile for Youssef Youyou, a Senior Full-Stack Web Developer based in Morocco.",
              },
            ]),
          }}
        />
        <ThemeProvider>
          {children}
          <ChatWidget />
        </ThemeProvider>
      </body>
    </html>
  );
}
