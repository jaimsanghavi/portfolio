import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "UI Components Showcase - Untitled UI + Next.js",
  description:
    "A curated set of Untitled UI building blocks (buttons, badges, inputs, sliders) themed with Tailwind and Next.js.",
  alternates: { canonical: "/showcase" },
  openGraph: {
    title: "UI Components Showcase - Untitled UI + Next.js",
    description:
      "A curated set of Untitled UI building blocks (buttons, badges, inputs, sliders) themed with Tailwind and Next.js.",
    url: "/showcase",
  },
  twitter: {
    title: "UI Components Showcase - Untitled UI + Next.js",
    description:
      "A curated set of Untitled UI building blocks (buttons, badges, inputs, sliders) themed with Tailwind and Next.js.",
    card: "summary_large_image",
  },
};

export default function ShowcaseLayout({ children }: { children: React.ReactNode }) {
  return children;
}
