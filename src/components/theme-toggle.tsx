"use client";

import { useTheme } from "next-themes";
import { Sun, Moon01 } from "@untitledui/icons";
import { Button } from "@/components/base/buttons/button";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      color="secondary"
      size="sm"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="w-9 h-9 p-0 relative"
    >
      <Sun className="h-4 w-4 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon01 className="h-4 w-4 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
