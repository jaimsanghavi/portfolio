"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const dark = mounted && resolvedTheme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(dark ? "light" : "dark")}
      className="font-mono text-[11px] tracking-[0.2em] text-graphite hover:text-accent transition-colors"
      aria-label={dark ? "Switch to paper (light) theme" : "Switch to blueprint (dark) theme"}
    >
      {dark ? "● BLUEPRINT" : "○ PAPER"}
    </button>
  );
}
