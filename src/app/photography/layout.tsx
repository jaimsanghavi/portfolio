import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Photography",
  description: "Photography by Jai M Sanghavi — moments captured beyond product management.",
};

export default function PhotographyLayout({ children }: { children: React.ReactNode }) {
  return children;
}
