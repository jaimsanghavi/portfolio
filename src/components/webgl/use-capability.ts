"use client";

import { useEffect, useState } from "react";

export type RenderMode = "full" | "lite" | "static";

// Decides how much spectacle the current device/user can take.
// "static" => no WebGL canvas at all (reduced-motion or no GL support).
export function useCapability(): RenderMode | null {
  const [mode, setMode] = useState<RenderMode | null>(null);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let webgl = false;
    try {
      const c = document.createElement("canvas");
      webgl = !!(c.getContext("webgl2") || c.getContext("webgl"));
    } catch {
      webgl = false;
    }

    if (reduce || !webgl) {
      setMode("static");
      return;
    }

    const lite =
      window.matchMedia("(max-width: 767px)").matches ||
      (navigator.hardwareConcurrency || 4) < 4;
    setMode(lite ? "lite" : "full");
  }, []);

  return mode;
}
