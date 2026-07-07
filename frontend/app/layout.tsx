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
    default: "Youssef Youyou | Senior Laravel & React Full-Stack Web Developer in Morocco",
    template: "%s | Youssef Youyou",
  },
  description:
    "Senior Full-Stack Web Developer based in Morocco. I build Laravel APIs, React/Next.js interfaces, SaaS platforms, dashboards, business automation tools, and SEO-friendly websites.",
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
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://youssefyouyou.com",
    title: "Youssef Youyou | Senior Laravel & React Full-Stack Web Developer in Morocco",
    description:
      "Senior Full-Stack Web Developer based in Morocco. I build Laravel APIs, React/Next.js interfaces, SaaS platforms, dashboards, business automation tools, and SEO-friendly websites.",
    siteName: "Youssef Youyou Portfolio",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Youssef Youyou senior full stack developer portfolio" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Youssef Youyou | Senior Laravel & React Full-Stack Web Developer in Morocco",
    description:
      "Senior Full-Stack Web Developer based in Morocco. I build Laravel APIs, React/Next.js interfaces, SaaS platforms, dashboards, business automation tools, and SEO-friendly websites.",
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
                jobTitle: "Senior Full-Stack Web Developer",
                description: "Senior Full-Stack Web Developer based in Morocco focused on Laravel APIs, React/Next.js interfaces, dashboards, SaaS platforms, deployment, Cloudflare, Nginx, business automation and SEO-friendly websites.",
                email: "contact@youssefyouyou.com",
                url: "https://youssefyouyou.com",
                sameAs: ["https://github.com/youssefyouyoudev", "https://linkedin.com/in/youssefyouyoudev"],
                address: { "@type": "PostalAddress", addressLocality: "Nador", addressCountry: "MA" },
                knowsAbout: ["Laravel", "PHP", "React", "Next.js", "JavaScript", "TypeScript", "MySQL", "REST APIs", "dashboards", "SaaS", "SEO", "Nginx", "Cloudflare", "deployment", "business automation"],
              },
              {
                "@context": "https://schema.org",
                "@type": "WebSite",
                name: "Youssef Youyou Portfolio",
                url: "https://youssefyouyou.com",
              },
              {
                "@context": "https://schema.org",
                "@type": "ProfilePage",
                name: "Youssef Youyou Senior Full-Stack Web Developer Portfolio",
                url: "https://youssefyouyou.com",
                about: {
                  "@type": "Person",
                  name: "Youssef Youyou",
                  jobTitle: "Senior Full-Stack Web Developer",
                  url: "https://youssefyouyou.com",
                },
                description: "Portfolio profile for Youssef Youyou, a Senior Full-Stack Web Developer based in Morocco.",
              },
            ]),
          }}
        />
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
