import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Photography - Through My Lens",
  description:
    "Personal photography by Jai M Sanghavi - moments, compositions, and stories that influence my product design perspective.",
  alternates: { canonical: "/photography" },
  openGraph: {
    title: "Photography - Through My Lens",
    description:
      "Personal photography by Jai M Sanghavi - moments, compositions, and stories that influence my product design perspective.",
    url: "/photography",
  },
  twitter: {
    title: "Photography - Through My Lens",
    description:
      "Personal photography by Jai M Sanghavi - moments, compositions, and stories that influence my product design perspective.",
    card: "summary_large_image",
  },
};

export default function PhotographyLayout({ children }: { children: React.ReactNode }) {
  return children;
}
