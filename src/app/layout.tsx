import type { Metadata, Viewport } from "next";
import { Space_Grotesk, IBM_Plex_Mono } from "next/font/google";
import { Theme } from "@/providers/theme";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { getSiteUrl } from "@/lib/site-url";
import { cx } from "@/utils/cx";
import "./globals.css";

const grotesk = Space_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-grotesk",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
  variable: "--font-plex-mono",
});

const siteUrl = getSiteUrl();
const description =
  "CSPO® Product Manager with 6+ years building enterprise AI/ML products. Led GenAI NLP features for 50+ enterprises, delivered $20M+ ARR, and improved time-to-insight by 60%.";

export const metadata: Metadata = {
  title: {
    default: "Jai M Sanghavi — Product Manager · AI/ML & Enterprise SaaS",
    template: "%s — Jai M Sanghavi",
  },
  description,
  applicationName: "Jai M Sanghavi Portfolio",
  authors: [{ name: "Jai M Sanghavi" }],
  creator: "Jai M Sanghavi",
  category: "technology",
  keywords: ["Jai M Sanghavi", "Product Manager", "CSPO", "AI", "GenAI", "Enterprise SaaS", "Portfolio"],
  metadataBase: new URL(siteUrl),
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    title: "Jai M Sanghavi — Product Manager · AI/ML & Enterprise SaaS",
    description,
    siteName: "Jai M Sanghavi Portfolio",
    images: [{ url: "/Jai_Profile.jpeg", alt: "Jai M Sanghavi", width: 1024, height: 1024 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Jai M Sanghavi — Product Manager · AI/ML & Enterprise SaaS",
    description,
    images: ["/Jai_Profile.jpeg"],
  },
};

export const viewport: Viewport = {
  themeColor: "#C0301E",
  colorScheme: "light dark",
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Jai M Sanghavi",
  jobTitle: "Product Manager",
  url: `${siteUrl}/`,
  image: `${siteUrl}/Jai_Profile.jpeg`,
  sameAs: ["https://www.linkedin.com/in/jaimsanghavi"],
  worksFor: { "@type": "Organization", name: "Deloitte Studios (USI)" },
  alumniOf: { "@type": "CollegeOrUniversity", name: "Reva University" },
  description,
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  url: `${siteUrl}/`,
  name: "Jai M Sanghavi Portfolio",
  description: "Product Manager portfolio for Jai M Sanghavi: AI/ML, SaaS, case studies, and outcomes.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
        <script type="application/ld+json" suppressHydrationWarning dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }} />
        <script type="application/ld+json" suppressHydrationWarning dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }} />
      </head>
      <body className={cx(grotesk.variable, plexMono.variable, "antialiased")}>
        <Theme>{children}</Theme>
        <SpeedInsights />
      </body>
    </html>
  );
}
