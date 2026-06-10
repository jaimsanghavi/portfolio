
import type { Metadata, Viewport } from "next";
import { Outfit, Plus_Jakarta_Sans, Inter } from "next/font/google";
import { RouteProvider } from "@/providers/router-provider";
import { Theme } from "@/providers/theme";
import "@/styles/globals.css";
import { cx } from "@/utils/cx";
import { SpeedInsights } from "@vercel/speed-insights/next";

// Distinctive display font - Outfit for headlines (geometric, modern, characterful)
const outfit = Outfit({
    subsets: ["latin"],
    display: "swap",
    variable: "--font-outfit",
});

// Refined body font - Plus Jakarta Sans (clean, professional, not generic)
const plusJakarta = Plus_Jakarta_Sans({
    subsets: ["latin"],
    display: "swap",
    variable: "--font-plus-jakarta",
});

// SF Pro proxy - Inter for Apple-inspired design variant
const inter = Inter({
    subsets: ["latin"],
    display: "swap",
    variable: "--font-inter",
});

export const metadata: Metadata = {
    title: {
        default: "Jai M Sanghavi - Product Manager • AI/ML & Enterprise SaaS",
        template: "%s - Jai M Sanghavi",
    },
    description:
        "CSPO® Product Manager with 6+ years building enterprise AI/ML products. Led GenAI NLP features for 50+ enterprises, delivered $20M+ ARR, and improved time-to-insight by 60%.",
    applicationName: "Jai M Sanghavi Portfolio",
    authors: [{ name: "Jai M Sanghavi" }],
    creator: "Jai M Sanghavi",
    publisher: "Jai M Sanghavi",
    category: "technology",
    keywords: [
        "Jai M Sanghavi",
        "Product Manager",
        "CSPO",
        "AI",
        "ML",
        "GenAI",
        "NLP",
        "Enterprise SaaS",
        "Process Optimization",
        "Task Mining",
        "Edgeverve",
        "Deloitte Studios",
        "TCS",
        "Portfolio",
    ],
    metadataBase:
        typeof process !== "undefined"
            ? new URL(
                  (process.env.NEXT_PUBLIC_SITE_URL || process.env.SITE_URL || (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000")) as string
              )
            : undefined,
    alternates: {
        canonical: "/",
    },
    openGraph: {
        type: "website",
        url: "/",
        title: "Jai M Sanghavi — Product Manager • AI/ML & Enterprise SaaS",
        description:
            "CSPO® Product Manager with 6+ years building enterprise AI/ML products. Led GenAI NLP features for 50+ enterprises, delivered $20M+ ARR, and improved time-to-insight by 60%.",
        siteName: "Jai M Sanghavi Portfolio",
        images: [
            {
                url: "/Jai_Profile.jpeg",
                alt: "Jai M Sanghavi",
                width: 1024,
                height: 1024,
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Jai M Sanghavi - Product Manager • AI/ML & Enterprise SaaS",
        description:
            "CSPO® Product Manager with 6+ years building enterprise AI/ML products. Led GenAI NLP features for 50+ enterprises, delivered $20M+ ARR, and improved time-to-insight by 60%.",
        images: ["/Jai_Profile.jpeg"],
    },
};

export const viewport: Viewport = {
    themeColor: "#7f56d9",
    colorScheme: "light dark",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
                        <head>
                                <script type="application/ld+json" suppressHydrationWarning dangerouslySetInnerHTML={{ __html: JSON.stringify({
                                    "@context": "https://schema.org",
                                    "@type": "Person",
                                    "name": "Jai M Sanghavi",
                                    "jobTitle": "Product Manager",
                                    "url": "https://jaimsanghavi.com/",
                                    "image": "https://jaimsanghavi.com/Jai_Profile.jpeg",
                                    "sameAs": [
                                        "https://www.linkedin.com/in/jaimsanghavi"
                                       
                                    ],
                                    "worksFor": {
                                        "@type": "Organization",
                                        "name": "Deloitte Studios (USI)"
                                    },
                                    "alumniOf": {
                                        "@type": "CollegeOrUniversity",
                                        "name": "Reva University"
                                    },
                                    "description": "CSPO® Product Manager with 6+ years building enterprise AI/ML products. Led GenAI NLP features for 50+ enterprises, delivered $20M+ ARR, and improved time-to-insight by 60%."
                                }) }} />
                                <script type="application/ld+json" suppressHydrationWarning dangerouslySetInnerHTML={{ __html: JSON.stringify({
                                    "@context": "https://schema.org",
                                    "@type": "WebSite",
                                    "url": "https://jaimsanghavi.com/",
                                    "name": "Jai M Sanghavi Portfolio",
                                    "description": "Product Manager portfolio for Jai M Sanghavi: AI/ML, SaaS, case studies, and outcomes."
                                }) }} />
                        </head>
            <body className={cx(outfit.variable, plusJakarta.variable, inter.variable, "bg-primary antialiased")}> 
                <RouteProvider>
                    <Theme>{children}</Theme>
                </RouteProvider>
                <SpeedInsights />
            </body>
        </html>
    );
}
