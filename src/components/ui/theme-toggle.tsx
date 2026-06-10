"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  // eslint-disable-next-line react-hooks/set-state-in-effect -- canonical next-themes hydration guard; runs once on mount only
  useEffect(() => setMounted(true), []);
  const dark = mounted && resolvedTheme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(dark ? "light" : "dark")}
      className="font-mono text-[11px] tracking-[0.2em] text-graphite hover:text-accent transition-colors"
      aria-label={dark ? "Blueprint theme active — switch to paper" : "Paper theme active — switch to blueprint"}
    >
      {dark ? "● BLUEPRINT" : "○ PAPER"}
    </button>
  );
}
