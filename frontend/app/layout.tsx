import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://youssefyouyou.com"),
  title: {
    default: "Youssef Youyou | Laravel & React Full-Stack Web Developer in Morocco",
    template: "%s | Youssef Youyou",
  },
  description:
    "Portfolio of Youssef Youyou, a full-stack web developer from Morocco building Laravel, React/Next.js, REST API, dashboard, SaaS, automation, deployment and SEO-ready web solutions.",
  applicationName: "Youssef Youyou Portfolio",
  authors: [{ name: "Youssef Youyou", url: "https://youssefyouyou.com" }],
  creator: "Youssef Youyou",
  publisher: "Youssef Youyou",
  category: "technology",
  keywords: [
    "Youssef Youyou",
    "Laravel developer Morocco",
    "React developer Morocco",
    "Next.js developer Morocco",
    "Full-stack developer Morocco",
    "Junior full-stack developer",
    "Dashboard developer",
    "API integration developer",
    "SaaS developer Morocco",
    "Business website developer",
    "Junior web developer Marrakech",
    "Laravel React portfolio",
    "B2B web developer",
    "B2C web developer",
    "admin dashboard developer",
    "API integration developer",
    "Nador developer",
    "Marrakech developer",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://youssefyouyou.com",
    title: "Youssef Youyou | Laravel & React Full-Stack Web Developer in Morocco",
    description:
      "Full-stack web developer from Morocco building Laravel, React/Next.js, REST API, dashboard, SaaS, automation, deployment and SEO-ready web solutions.",
    siteName: "Youssef Youyou Portfolio",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Youssef Youyou full-stack web developer portfolio" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Youssef Youyou | Laravel & React Full-Stack Web Developer in Morocco",
    description:
      "Laravel, React/Next.js, REST APIs, dashboards, automation, deployment and SEO-ready web solutions.",
  },
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
        <script
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              {
                "@context": "https://schema.org",
                "@type": "Person",
                name: "Youssef Youyou",
                jobTitle: "Full-Stack Web Developer",
                description: "Full-stack web developer from Morocco focused on Laravel, React/Next.js, REST APIs, dashboards, automation, deployment and SEO-ready web solutions.",
                email: "contact@youssefyouyou.com",
                url: "https://youssefyouyou.com",
                sameAs: ["https://github.com/youssefyouyoudev", "https://linkedin.com/in/youssefyouyoudev"],
                address: { "@type": "PostalAddress", addressLocality: "Nador", addressCountry: "MA" },
              },
              {
                "@context": "https://schema.org",
                "@type": "WebSite",
                name: "Youssef Youyou Portfolio",
                url: "https://youssefyouyou.com",
              },
              {
                "@context": "https://schema.org",
                "@type": "ProfessionalService",
                name: "Youssef Youyou Full-Stack Web Development",
                url: "https://youssefyouyou.com",
                areaServed: ["Morocco", "Marrakech", "Remote"],
                serviceType: ["Laravel backend development", "React and Next.js frontend development", "API integration", "Admin dashboards", "SaaS platforms", "Deployment and SEO"],
                description: "Laravel, React/Next.js, API, dashboard, automation, deployment and SEO-ready web development services for recruiters, small businesses, agencies and remote clients.",
              },
            ]),
          }}
        />
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
